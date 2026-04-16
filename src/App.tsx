import { useState, useCallback } from 'react'
import { levels, Level, formatYear } from './data/levels'

type View = 'chapter-select' | 'level-select' | 'game'

function getCompletedLevels(): Set<number> {
  try {
    const saved = localStorage.getItem('nightwatch-completed')
    return saved ? new Set(JSON.parse(saved) as number[]) : new Set()
  } catch {
    return new Set()
  }
}

function markCompleted(levelId: number) {
  const completed = getCompletedLevels()
  completed.add(levelId)
  localStorage.setItem('nightwatch-completed', JSON.stringify([...completed]))
}

export default function App() {
  const [view, setView] = useState<View>('chapter-select')
  const [currentChapter, setCurrentChapter] = useState(1)
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null)
  const [completed] = useState<Set<number>>(getCompletedLevels)

  const goToLevelSelect = (chapter: number) => {
    setCurrentChapter(chapter)
    setView('level-select')
  }

  const goToGame = (level: Level) => {
    setCurrentLevel(level)
    setView('game')
  }

  return (
    <div className="app">
      <div className="starfield" />
      {view === 'chapter-select' && (
        <ChapterSelect onSelect={goToLevelSelect} completed={completed} />
      )}
      {view === 'level-select' && (
        <LevelSelect
          chapter={currentChapter}
          onBack={() => setView('chapter-select')}
          onSelect={goToGame}
          completed={completed}
        />
      )}
      {view === 'game' && currentLevel && (
        <GameBoard
          level={currentLevel}
          onBack={() => setView('level-select')}
          onComplete={() => {
            markCompleted(currentLevel.id)
          }}
        />
      )}
    </div>
  )
}

// ─── Chapter Select ─────────────────────────────────────────────
function ChapterSelect({
  onSelect,
  completed,
}: {
  onSelect: (chapter: number) => void
  completed: Set<number>
}) {
  const chapters = [
    { num: 1, name: '青铜时代', desc: '3 关卡' },
    { num: 2, name: '丝路风华', desc: '3 关卡' },
    { num: 3, name: '瓷韵千秋', desc: '3 关卡' },
    { num: 4, name: '翰墨丹青', desc: '3 关卡' },
    { num: 5, name: '时光之结', desc: '3 关卡' },
  ]

  return (
    <div className="chapter-select">
      <div className="chapter-select-title">夜巡 · 时光之结</div>
      <div className="chapter-grid">
        {chapters.map((ch) => {
          const chapterLevels = levels.filter(l => l.chapter === ch.num)
          const allDone = chapterLevels.every(l => completed.has(l.id))
          return (
            <div
              key={ch.num}
              className={`chapter-card${allDone ? ' completed' : ''}`}
              onClick={() => onSelect(ch.num)}
            >
              <div className="chapter-num">第 {ch.num} 章</div>
              <div className="chapter-name">{ch.name}</div>
              <div className="chapter-levels">{ch.desc}</div>
            </div>
          )
        })}
      </div>
      <div style={{ color: 'var(--text-muted)', fontSize: 12, letterSpacing: 1 }}>
        时间不是线性的 — 有时候，历史需要倒着推
      </div>
    </div>
  )
}

// ─── Level Select ───────────────────────────────────────────────
function LevelSelect({
  chapter,
  onBack,
  onSelect,
  completed,
}: {
  chapter: number
  onBack: () => void
  onSelect: (level: Level) => void
  completed: Set<number>
}) {
  const chapterLevels = levels.filter(l => l.chapter === chapter)
  const chapterInfo = chapterLevels[0]

  return (
    <div className="level-select">
      <button className="level-back" onClick={onBack}>
        ← 返回章节
      </button>
      <div className="level-chapter-title">
        第 {chapter} 章 · {chapterInfo?.chapterName}
      </div>
      <div className="level-grid">
        {chapterLevels.map((lvl) => (
          <div
            key={lvl.id}
            className={`level-card${completed.has(lvl.id) ? ' completed' : ''}`}
            onClick={() => onSelect(lvl)}
          >
            <div className="level-num">{lvl.level}</div>
            <div className="level-title">{lvl.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Game Board ─────────────────────────────────────────────────
function GameBoard({
  level,
  onBack,
  onComplete,
}: {
  level: Level
  onBack: () => void
  onComplete: () => void
}) {
  const totalSlots = level.artifacts.length
  const [placed, setPlaced] = useState<Map<number, string>>(new Map()) // slotIndex -> artifactId
  const [showContradiction, setShowContradiction] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showComplete, setShowComplete] = useState(false)
  const [placedSet, setPlacedSet] = useState<Set<string>>(new Set())

  const isPlaced = (id: string) => placedSet.has(id)

  // Check if the sequence is correct (chronological order)
  const checkOrder = useCallback(() => {
    const placedIds = Array.from(placed.values())
    const placedYears = placedIds.map(id => level.artifacts.find(a => a.id === id)!.year)
    const placedSortedYears = [...placedYears].sort((a, b) => a - b)

    return JSON.stringify(placedYears) === JSON.stringify(placedSortedYears)
  }, [placed, level])

  const handlePlaceArtifact = (artifactId: string) => {
    if (isPlaced(artifactId)) return
    if (placed.size >= totalSlots) return

    let slotIndex = -1
    for (let i = 0; i < totalSlots; i++) {
      if (!placed.has(i)) {
        slotIndex = i
        break
      }
    }
    if (slotIndex === -1) return

    const newPlaced = new Map(placed)
    newPlaced.set(slotIndex, artifactId)
    setPlaced(newPlaced)

    const newPlacedSet = new Set(placedSet)
    newPlacedSet.add(artifactId)
    setPlacedSet(newPlacedSet)

    setShowContradiction(false)

    // Check if all slots filled
    if (newPlaced.size === totalSlots) {
      setTimeout(() => {
        if (checkOrder()) {
          setShowComplete(true)
          onComplete()
        } else {
          setShowContradiction(true)
          // Remove artifacts on contradiction
          setTimeout(() => {
            setPlaced(new Map())
            setPlacedSet(new Set())
            setShowContradiction(false)
          }, 1800)
        }
      }, 300)
    }
  }

  const handleRemoveFromSlot = (slotIndex: number) => {
    const artifactId = placed.get(slotIndex)
    if (!artifactId) return
    // Can't remove anchors
    if (level.anchors.includes(artifactId)) return

    const newPlaced = new Map(placed)
    newPlaced.delete(slotIndex)
    setPlaced(newPlaced)

    const newPlacedSet = new Set(placedSet)
    newPlacedSet.delete(artifactId)
    setPlacedSet(newPlacedSet)
  }

  const handleNextLevel = () => {
    const nextLevel = levels.find(l => l.id === level.id + 1)
    if (nextLevel) {
      setPlaced(new Map())
      setPlacedSet(new Set())
      setShowComplete(false)
      setShowContradiction(false)
      setShowHint(false)
      // Update level via parent — just navigate
      window.location.hash = `level-${nextLevel.id}`
      window.location.reload()
    }
  }

  const sortedArtifacts = [...level.artifacts].sort((a, b) => a.year - b.year)

  return (
    <div className="game">
      <div className="game-header">
        <button className="game-back" onClick={onBack}>← 返回</button>
        <div className="game-info">
          <div className="game-chapter-label">第 {level.chapter} 章 · {level.chapterName}</div>
          <div className="game-level-title">{level.title}</div>
        </div>
        {level.hint && (
          <button className="game-hint-btn" onClick={() => setShowHint(!showHint)}>
            {showHint ? '收起提示' : '？提示'}
          </button>
        )}
      </div>

      {showHint && level.hint && (
        <div className="hint-box">{level.hint}</div>
      )}

      {/* Timeline */}
      <div className="timeline-section">
        <div className="timeline-label">— 时间之轴 —</div>
        <div className="timeline">
          <div className="timeline-track" />
          <div className="timeline-slots">
            {Array.from({ length: totalSlots }, (_, slotIndex) => {
              const placedArtifactId = placed.get(slotIndex)
              const artifact = placedArtifactId
                ? level.artifacts.find(a => a.id === placedArtifactId)!
                : null
              const isAnchor = artifact ? level.anchors.includes(artifact.id) : false
              return (
                <div
                  key={slotIndex}
                  className={`timeline-slot${artifact ? ' filled' : ''}${isAnchor ? ' anchor' : ''}`}
                  onClick={() => artifact && !isAnchor && handleRemoveFromSlot(slotIndex)}
                  title={artifact && !isAnchor ? '点击取回' : isAnchor ? '因果锚点' : ''}
                >
                  {artifact ? (
                    <>
                      <div className="slot-year">{formatYear(artifact.year)}</div>
                      <div className="slot-name">{artifact.name}</div>
                      {isAnchor && <div className="slot-anchor-badge">⚓ 锚点</div>}
                    </>
                  ) : (
                    <div className="slot-year" style={{ opacity: 0.3 }}>—</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Contradiction banner */}
      {showContradiction && (
        <div className="contradiction-banner">
          ⚠ 因果矛盾！年代顺序有误，时间线正在回溯…
        </div>
      )}

      {/* Artifact Pool */}
      <div className="artifact-pool-section">
        <div className="artifact-pool-label">— 文物库 —</div>
        <div className="artifact-pool">
          {sortedArtifacts.map(artifact => (
            <div
              key={artifact.id}
              className={`artifact-card${isPlaced(artifact.id) ? ' placed' : ''}`}
              onClick={() => handlePlaceArtifact(artifact.id)}
            >
              <div className="artifact-name">{artifact.name}</div>
              <div className="artifact-year">{formatYear(artifact.year)}</div>
              <div className="artifact-desc">{artifact.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Level Complete Modal */}
      {showComplete && (
        <LevelComplete
          level={level}
          onNextLevel={level.id < levels.length ? handleNextLevel : undefined}
          onReplay={() => {
            setPlaced(new Map())
            setPlacedSet(new Set())
            setShowComplete(false)
          }}
          onMenu={onBack}
        />
      )}
    </div>
  )
}

// ─── Level Complete Modal ───────────────────────────────────────
function LevelComplete({
  level,
  onNextLevel,
  onReplay,
  onMenu,
}: {
  level: Level
  onNextLevel?: () => void
  onReplay: () => void
  onMenu: () => void
}) {
  return (
    <div className="level-complete">
      <div className="level-complete-card">
        <div className="level-complete-title">时光归位</div>
        <div className="level-complete-sub">
          第 {level.chapter} 章 · {level.chapterName} · {level.title}
        </div>
        <div className="stars-display">
          <span className="star-filled">★</span>
          <span className="star-filled">★</span>
          <span className="star-filled">★</span>
        </div>
        <div style={{ color: 'var(--teal)', fontSize: 13, marginBottom: 24, fontStyle: 'italic' }}>
          「{level.artifacts.length > 0 ? level.artifacts[0].name : ''}」与「{level.artifacts[level.artifacts.length - 1]?.name ?? ''}」之间，跨越了千年时光。
        </div>
        <div className="level-complete-actions">
          <button className="btn-secondary" onClick={onReplay}>重玩本关</button>
          {onNextLevel && <button className="btn-primary" onClick={onNextLevel}>下一关</button>}
          <button className="btn-secondary" onClick={onMenu}>返回目录</button>
        </div>
      </div>
    </div>
  )
}
