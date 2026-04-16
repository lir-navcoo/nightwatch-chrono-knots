export interface Artifact {
  id: string
  name: string
  year: number
  description: string
  isAnchor?: boolean
  chapterId: number
}

export interface Level {
  id: number
  chapter: number
  chapterName: string
  level: number
  title: string
  artifacts: Artifact[]
  anchors: string[]  // artifact ids that are fixed anchors
  hint?: string
}

const CHAPTER_NAMES = [
  '青铜时代',
  '丝路风华',
  '瓷韵千秋',
  '翰墨丹青',
  '时光之结',
]

export const levels: Level[] = [
  // ─── 第一章：青铜时代（3件文物）──────────────────────────────
  {
    id: 1,
    chapter: 1,
    chapterName: CHAPTER_NAMES[0],
    level: 1,
    title: '青铜之光',
    artifacts: [
      { id: 'a1', name: '后母戊鼎', year: -1200, description: '商代青铜器，鼎中之王', chapterId: 1 },
      { id: 'a2', name: '四羊方尊', year: -1200, description: '商代礼器，铸于商朝晚期', chapterId: 1 },
      { id: 'a3', name: '越王勾践剑', year: -500, description: '春秋时期青铜剑，不锈之谜', chapterId: 1 },
    ],
    anchors: [],
    hint: '后母戊鼎与四羊方尊同为商代，请注意它们之间的细微年代差异',
  },
  {
    id: 2,
    chapter: 1,
    chapterName: CHAPTER_NAMES[0],
    level: 2,
    title: '铭文之秘',
    artifacts: [
      { id: 'b1', name: '大盂鼎', year: -1000, description: '西周早期，记录康王功绩', chapterId: 1 },
      { id: 'b2', name: '散氏盘', year: -900, description: '西周中晚期，土地契约铭文', chapterId: 1 },
      { id: 'b3', name: '虢季子白盘', year: -800, description: '西周宣王时期，草原风格', chapterId: 1 },
    ],
    anchors: [],
    hint: '三件均为西周青铜器，按早中晚期排列',
  },
  {
    id: 3,
    chapter: 1,
    chapterName: CHAPTER_NAMES[0],
    level: 3,
    title: '时光洪流',
    artifacts: [
      { id: 'c1', name: '三星堆青铜面具', year: -1200, description: '蜀地神秘文明遗存', chapterId: 1 },
      { id: 'c2', name: '曾侯乙编钟', year: -430, description: '战国早期，音乐奇迹', chapterId: 1 },
      { id: 'c3', name: '王子午鼎', year: -530, description: '春秋晚期，楚式青铜', chapterId: 1 },
    ],
    anchors: [],
    hint: '从蜀地到荆楚，跨越数百年的青铜记忆',
  },

  // ─── 第二章：丝路风华（4件文物 + 锚点干扰）────────────────────
  {
    id: 4,
    chapter: 2,
    chapterName: CHAPTER_NAMES[1],
    level: 1,
    title: '丝路起点',
    artifacts: [
      { id: 'd1', name: '鎏金铜蚕', year: -100, description: '汉代，养蚕业见证', chapterId: 2 },
      { id: 'd2', name: '五星出东方锦', year: 25, description: '汉锦，蜀地精绝', chapterId: 2 },
      { id: 'd3', name: '楼兰古城残片', year: 300, description: '魏晋，丝路遗珍', chapterId: 2 },
      { id: 'd4', name: '唐三彩骆驼', year: 700, description: '盛唐丝绸之路象征', chapterId: 2 },
    ],
    anchors: ['d2'],
    hint: '锚点五星出东方锦是东汉器物，其他文物请以它为基准推算',
  },
  {
    id: 5,
    chapter: 2,
    chapterName: CHAPTER_NAMES[1],
    level: 2,
    title: '波斯来客',
    artifacts: [
      { id: 'e1', name: '罗马玻璃碗', year: 200, description: '东汉，罗马帝国进口', chapterId: 2 },
      { id: 'e2', name: '波斯银币', year: 400, description: '南北朝，萨珊波斯', chapterId: 2 },
      { id: 'e3', name: '敦煌星图', year: 700, description: '唐代，敦煌藏经洞', chapterId: 2 },
      { id: 'e4', name: '黑石号沉船青瓷', year: 850, description: '唐代外销瓷，越窑精品', chapterId: 2 },
    ],
    anchors: ['e3'],
    hint: '敦煌星图是唐代遗存，以此为锚点向外推理',
  },
  {
    id: 6,
    chapter: 2,
    chapterName: CHAPTER_NAMES[1],
    level: 3,
    title: '敦煌余音',
    artifacts: [
      { id: 'f1', name: '敦煌帛画', year: 400, description: '北凉，佛教艺术初传', chapterId: 2 },
      { id: 'f2', name: '敦煌壁画反弹琵琶', year: 600, description: '隋代，乐舞飞天', chapterId: 2 },
      { id: 'f3', name: '敦煌文书', year: 900, description: '唐代，写经与契约', chapterId: 2 },
      { id: 'f4', name: '莫高窟第17窟藏经洞', year: 1000, description: '北宋，封闭之谜', chapterId: 2 },
    ],
    anchors: ['f2'],
    hint: '隋代的反弹琵琶是本章的锚点，向前后推算其他年代',
  },

  // ─── 第三章：瓷韵千秋（5–6件文物 + 锚点干扰）─────────────────
  {
    id: 7,
    chapter: 3,
    chapterName: CHAPTER_NAMES[2],
    level: 1,
    title: '青瓷之祖',
    artifacts: [
      { id: 'g1', name: '原始瓷青釉双系罐', year: -1500, description: '夏商之际，最早瓷器', chapterId: 3 },
      { id: 'g2', name: '东汉青瓷四系罐', year: 100, description: '东汉，成熟瓷器出现', chapterId: 3 },
      { id: 'g3', name: '越窑青釉刻花盒', year: 250, description: '三国，两晋工艺', chapterId: 3 },
      { id: 'g4', name: '秘色瓷八棱瓶', year: 870, description: '唐代，越窑巅峰', chapterId: 3 },
      { id: 'g5', name: '汝窑天青釉洗', year: 1100, description: '北宋，五大名窑之首', chapterId: 3 },
    ],
    anchors: ['g3'],
    hint: '锚点两晋青瓷盒是参考点，前后各有演进',
  },
  {
    id: 8,
    chapter: 3,
    chapterName: CHAPTER_NAMES[2],
    level: 2,
    title: '官窑风云',
    artifacts: [
      { id: 'h1', name: '官窑葵口碗', year: 1100, description: '北宋，官窑体系建立', chapterId: 3 },
      { id: 'h2', name: '钧窑玫瑰紫釉盆', year: 1150, description: '金代，入窑一色出窑万彩', chapterId: 3 },
      { id: 'h3', name: '定窑白釉孩儿枕', year: 1000, description: '北宋，宫廷珍玩', chapterId: 3 },
      { id: 'h4', name: '龙泉窑粉青釉鬲', year: 1250, description: '南宋，龙泉窑精品', chapterId: 3 },
      { id: 'h5', name: '景德镇青白釉盏', year: 1000, description: '北宋，影青瓷代表', chapterId: 3 },
      { id: 'h6', name: '建窑兔毫盏', year: 1100, description: '北宋，茶道名器', chapterId: 3 },
    ],
    anchors: ['h3', 'h5'],
    hint: '两个锚点：定窑（北宋早期）和景德镇影青瓷（北宋），都是北宋器',
  },
  {
    id: 9,
    chapter: 3,
    chapterName: CHAPTER_NAMES[2],
    level: 3,
    title: '青花纪事',
    artifacts: [
      { id: 'i1', name: '景德镇窑青花萧何追韩信', year: 1350, description: '元末，青花成熟期', chapterId: 3 },
      { id: 'i2', name: '永乐青花压手杯', year: 1405, description: '明永乐，郑和带归苏泥勃青', chapterId: 3 },
      { id: 'i3', name: '宣德青花龙纹大缸', year: 1430, description: '明宣德，青花鼎盛', chapterId: 3 },
      { id: 'i4', name: '成化斗彩鸡缸杯', year: 1480, description: '明成化，斗彩巅峰', chapterId: 3 },
      { id: 'i5', name: '万历青花五彩罐', year: 1600, description: '明万历，青花与彩瓷交融', chapterId: 3 },
    ],
    anchors: ['i2'],
    hint: '永乐青花压手杯是锚点，明代青花演变可依此推算',
  },

  // ─── 第四章：翰墨丹青（5–6件文物）─────────────────────────────
  {
    id: 10,
    chapter: 4,
    chapterName: CHAPTER_NAMES[3],
    level: 1,
    title: '顾脉千年',
    artifacts: [
      { id: 'j1', name: '顾恺之《洛神赋图》', year: 400, description: '东晋，以形写神', chapterId: 4 },
      { id: 'j2', name: '展子虔《游春图》', year: 550, description: '隋代，青绿山水开山', chapterId: 4 },
      { id: 'j3', name: '阎立本《步辇图》', year: 640, description: '唐初，历史记录画', chapterId: 4 },
      { id: 'j4', name: '韩滉《五牛图》', year: 750, description: '唐代中期，写实典范', chapterId: 4 },
      { id: 'j5', name: '顾闳中《韩熙载夜宴图》', year: 950, description: '五代南唐，人物画巨作', chapterId: 4 },
    ],
    anchors: [],
    hint: '从东晋到五代，中国人物画发展脉络清晰',
  },
  {
    id: 11,
    chapter: 4,
    chapterName: CHAPTER_NAMES[3],
    level: 2,
    title: '山水意境',
    artifacts: [
      { id: 'k1', name: '王维《雪溪图》', year: 740, description: '盛唐，文人画先驱', chapterId: 4 },
      { id: 'k2', name: '董源《潇湘图》', year: 930, description: '五代南唐，江南山水', chapterId: 4 },
      { id: 'k3', name: '巨然《秋山问道图》', year: 960, description: '北宋初，董巨并称', chapterId: 4 },
      { id: 'k4', name: '范宽《溪山行旅图》', year: 1000, description: '北宋，全景式山水', chapterId: 4 },
      { id: 'k5', name: '郭熙《早春图》', year: 1070, description: '北宋中期，三远法', chapterId: 4 },
      { id: 'k6', name: '王希孟《千里江山图》', year: 1113, description: '北宋，青绿山水巨制', chapterId: 4 },
    ],
    anchors: [],
    hint: '从王维到王希孟，青绿山水与文人画交织演进',
  },
  {
    id: 12,
    chapter: 4,
    chapterName: CHAPTER_NAMES[3],
    level: 3,
    title: '翰墨风骨',
    artifacts: [
      { id: 'l1', name: '王羲之《兰亭序》', year: 353, description: '东晋永和，书圣真迹摹本', chapterId: 4 },
      { id: 'l2', name: '欧阳询《九成宫醴泉铭》', year: 632, description: '唐楷典范，法度森严', chapterId: 4 },
      { id: 'l3', name: '颜真卿《祭侄文稿》', year: 758, description: '唐代，行书天下第二', chapterId: 4 },
      { id: 'l4', name: '柳公权《玄秘塔碑》', year: 841, description: '唐代晚期，唐楷收官', chapterId: 4 },
      { id: 'l5', name: '苏轼《黄州寒食诗帖》', year: 1080, description: '北宋，文人书法高峰', chapterId: 4 },
    ],
    anchors: [],
    hint: '书体演变：从王羲之行书到苏轼文人书风',
  },

  // ─── 第五章：时光之结（7件文物 + 多锚点）────────────────────
  {
    id: 13,
    chapter: 5,
    chapterName: CHAPTER_NAMES[4],
    level: 1,
    title: '文明交汇',
    artifacts: [
      { id: 'm1', name: '金沙太阳神鸟', year: -1200, description: '商代晚期，古蜀文明', chapterId: 5 },
      { id: 'm2', name: '秦始皇陵兵马俑', year: -210, description: '秦代，世界第八奇迹', chapterId: 5 },
      { id: 'm3', name: '龙门石窟卢舍那', year: 675, description: '唐代，佛教艺术巅峰', chapterId: 5 },
      { id: 'm4', name: '《清明上河图》', year: 1100, description: '北宋，张择端存世孤品', chapterId: 5 },
      { id: 'm5', name: '郑和七下西洋宝船', year: 1420, description: '明代，永乐盛世', chapterId: 5 },
      { id: 'm6', name: '京剧《贵妃醉酒》戏服', year: 1790, description: '清代乾隆，徽班进京', chapterId: 5 },
      { id: 'm7', name: '新中国开国大典文献', year: 1949, description: '现代，中华民族新生', chapterId: 5 },
    ],
    anchors: ['m3', 'm4'],
    hint: '两个锚点：龙门卢舍那是盛唐，《清明上河图》是北宋',
  },
  {
    id: 14,
    chapter: 5,
    chapterName: CHAPTER_NAMES[4],
    level: 2,
    title: '丝路驼铃',
    artifacts: [
      { id: 'n1', name: '安阳青铜器组合', year: -1200, description: '商代晚期，青铜高峰', chapterId: 5 },
      { id: 'n2', name: '敦煌文书经卷', year: 400, description: '东晋至北凉，佛教东传', chapterId: 5 },
      { id: 'n3', name: '唐代琉璃瓶', year: 700, description: '唐代，丝路贸易见证', chapterId: 5 },
      { id: 'n4', name: '宋代海船铁锚', year: 1100, description: '北宋，海上丝路兴起', chapterId: 5 },
      { id: 'n5', name: '元青花人物故事罐', year: 1350, description: '元代，中西贸易繁盛', chapterId: 5 },
      { id: 'n6', name: '明代宣德铜炉', year: 1430, description: '明代，文房清供', chapterId: 5 },
      { id: 'n7', name: '清代广彩瓷盘', year: 1780, description: '清代，外销瓷巅峰', chapterId: 5 },
    ],
    anchors: ['n2', 'n5'],
    hint: '两个锚点：敦煌文书（东晋）和元青花（元代），丝路历史清晰',
  },
  {
    id: 15,
    chapter: 5,
    chapterName: CHAPTER_NAMES[4],
    level: 3,
    title: '终极时间之结',
    artifacts: [
      { id: 'o1', name: '红山文化玉龙', year: -3500, description: '新石器，红山文化象征', chapterId: 5 },
      { id: 'o2', name: '二里头青铜爵', year: -1700, description: '夏代，青铜礼器之祖', chapterId: 5 },
      { id: 'o3', name: '曾侯乙编钟', year: -430, description: '战国，音乐奇迹', chapterId: 5 },
      { id: 'o4', name: '《资治通鉴》手稿', year: 1084, description: '北宋，司马光心血', chapterId: 5 },
      { id: 'o5', name: '明代《永乐大典》残页', year: 1408, description: '明代，古典百科全书', chapterId: 5 },
      { id: 'o6', name: '清代《红楼梦》程甲本', year: 1791, description: '清代，中国小说巅峰', chapterId: 5 },
      { id: 'o7', name: '民国《申报》创刊号', year: 1872, description: '近代，中国新闻业开端', chapterId: 5 },
    ],
    anchors: ['o3', 'o4'],
    hint: '两个锚点：曾侯乙编钟（战国）和《资治通鉴》（北宋），贯穿三千年文明',
  },
]

export function getChapterLevels(chapter: number): Level[] {
  return levels.filter(l => l.chapter === chapter)
}

export function formatYear(year: number): string {
  if (year < 0) return `公元前${Math.abs(year)}年`
  return `公元${year}年`
}
