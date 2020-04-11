module.exports = {
  Config: {
    Language: '简体中文'
  },
  Interface: {
    Title: '怪物猎人世界装备编辑器',
    Download: '下载离线版',
    DownloadVersion: '选择下载版本',
    Installed: '安装版',
    FreeInstallation: '免安装版',
    Portable: '便携版',
    Lang: '语言Language',
    Menu: '菜单',
    New_file: '新建',
    Open_file: '打开',
    Open_Success: '档案已打开',
    Open_Failure: '档案打开失败',
    Save_file: '保存',
    Save_Success: '保存成功',
    Save_Failure: '保存失败',
    About: '关于',
    Setting: '设定',
    Elimination_unknown_weapons: '排除未知武器',
    Raw_data_comparison: '原始数据对比',
    Binary_mode: '二进位模式',
    Dark_theme: '暗黑主题',
    Data_version: '数据版本',
    Original_file_version: '原始档案版本',
    Extract_from: '提取自',
    Current_file: '当前档案',
    Read: '已读',
    Refuse: '拒绝',
    Cancel: '取消',
    Loading: '加载中,请稍等',
    Loading_Environment: '正在加载环境,请稍后',
    Loading_Environment_info: '如果长时间无法完成加载,可点击下方已读按钮继续使用,未完成加载部分功能无法正常使用',
    Instructions: '使用说明',
    No_file_opened: '未打开文件',
    No_data: '无可用数据',
    Original: '原始',
    Old_version: '兼容模式',
    Version_update: '版本更新',
    Update_description: '更新说明',
    Old_version_save: '请勿保存兼容模式',
    Weapon: '武器',
    equipment: '装备',
    Weaponsmiscellaneous: '武器杂项',
    Oldfile: '可能是旧版本文件',
    Tools: '开发者工具箱',
    Tools_data: '数据数据',
    Tools_dataMerge: 'Mod合并',
    Tools_dataConfig: '生成Mod变更文件',
    Tools_encryption: '加解密工具',
    Tools_Hex: '二进制编辑',
    Tools_View: '视图编辑',
    Tools_Help: '教程',
    Unopen: '暂未开放',
    Request: '申请',
    Warning: '警告',
    EncryptionFile: '选择待加密文件',
    DencryptionFile: '选择待解密文件',
    DownloadDencryption: '下载加解密工具',
    VCLow_version: 'VC++版本较低,可能无法正常运行Mod,建议升级后使用',
    NewInterface: '体验新界面',
    Other: '其他',
    TranslationProvider: ''
  },
  Explanatory: {
    Elimination_unknown_weapons: '武器信息清单中排除掉未被记载的武器数据',
    Raw_data_comparison: '与系统中记载的原始武器信息进行对比',
    Binary_mode: '显示档案二进位数据的档案模式,二进位数据根据武器类型进行辅助显示',
    Dark_theme: '切换软件主色调至暗黑模式',
    About_content: '本软件可针对《怪物猎人世界》中武器数据魔改档案进行查看和修改,修改后档案放置在Monster Hunter World\\nativePC\\common\\equip\\下即可生效。修改后档案将影响游戏平衡性,请勿用于联机使用。',
    About_edition: '软件版本：1.2.4',
    Instructions: '<h3>该工具可以读取解包后的武器数据,内置了当前版本的武器数据档案,可以直接新建mod档案。部分数值修改会根据固有系数自动修正,武器信息为手动录入,可能与现版本数据存在差异。修改后的档案请勿用于联机使用。</h3><br><h4>用法：</h4><br><span>&nbsp;&nbsp;1、打开解包后的mod档案或点击新建选择需要的武器档案</span><br><span>&nbsp;&nbsp;2、搜索或手动找到要修改的武器</span><br><span>&nbsp;&nbsp;3、将相应属性改成你希望的数值</span><br><span>&nbsp;&nbsp;4、点击保存将档案保存至游戏目录\\nativePC\\common\\equip\\</span><br><span>&nbsp;&nbsp;5、安装冰原装载Mod（https://www.nexusmods.com/monsterhunterworld/mods/1984）</span><br><br><h4>工具原始代码发布在Github上：https://github.com/HalcyonAlcedo/MHW-Weaponeditor</h4>',
    Old_version: '将以名称匹配方式打开数据档案,建议使用新版本数据档案进行魔改。',
    Old_version_open: '兼容模式已启动,请重新打开数据档案',
    Old_version_close: '兼容模式已关闭,请重新打开数据档案',
    Version_update: '将现时打开的档案更新到新版本',
    Version_update_true: '版本数据更新完成,请勿忘记保存数据档案',
    Free_model: '如需修改模型请调整为修改数据,不懂勿动',
    Have_model: '如需关闭模型请改成65535',
    Update_description: '<ul><li>更新数据</li></ul>',
    Toolsinfo: '开发者工具箱只针对MOD开发人员开放,工具箱内包含本工具内置的数据信息和一些实用工具,如需申请开发者认证许可,请在下方填写您曾经发布过的一个Mod地址并提交申请,申请后您将拥有1天的试用时间,审核通过后在有效期内可随意使用。',
    NewInterface: '尝试新的编辑界面',
    ResetChopping: '需要开启原始数据对比功能',
    NoLimit: '当前无修改限制',
    DidNotOpen: '当前文件未开启新版编辑界面功能,请使用旧版界面操作',
    Encryptionwarning: '当前要修改的文件为加密文件,请使用加解密工具解密后再次打开解密后的文件',
    Dencryptionwarning: '当前要修改的文件为解密后的文件,保存后请使用加解密工具加密后放入游戏才能生效',
    EncryptionHelp: `
    此工具用于解密被加密的数据文件和将解密的文件加密回程序识别的加密文件</br>
    当前内置了cus_pa、cus_par、msk、owp_dat、dtt_eda、dtt_epg、plp、plsp、plip、asp、shlp类型的文件密钥,如果你有其他类型的加密文件和密钥可以在Github上告诉我,确认后会补充进系统
    `,
    ConfigAuthor: '当前配置文件作者：'
  },
  Weaponsmiscellaneous: {
    Sharpness: '斩味',
    Wswordattribute: '双属性',
    Saxebottle: '斩瓶',
    Bombardment: '铳枪炮击',
    Syllable: '笛音',
    Rod: '猎虫',
    Skill: '技能',
    Bottle: '弓瓶',
    Shell: '弩弹',
    ASkill: '装置',
    WeaponDerived: '武器派生',
    WeaponMake: '武器制造'
  },
  Armor: {
    Armor: '装备',
    ArmorMake: '装备制造'
  },
  Weaponrecipe: {
    Number: '武器Id',
    Type: '武器类型',
    wus_wz: '未知',
    item1: '素材1',
    item1quantity: '素材1数量',
    item2: '素材1',
    item2quantity: '素材2数量',
    item3: '素材3',
    item3quantity: '素材3数量',
    item4: '素材4',
    item4quantity: '素材4数量',
    Unlock: '解锁条件',
  },
  Armorrecipe: {
    Number: '装备Id',
    Type: '装备类型',
    item1: '素材1',
    item1quantity: '素材1数量',
    item2: '素材1',
    item2quantity: '素材2数量',
    item3: '素材3',
    item3quantity: '素材3数量',
    item4: '素材4',
    item4quantity: '素材4数量',
    Unlock: '解锁条件',
  },
  Sharpness: {
    Number: '斩味id',
    Weaponlist: '影响武器列表',
    Red: '红斩',
    Orange: '橙斩',
    Yellow: '黄斩',
    green: '绿斩',
    blue: '蓝斩',
    white: '白斩',
    purple: '紫斩'
  },
  Wswordattribute: {
    Number: '双刀双属性id',
    First_attribute: '第一属性',
    First_attribute_values: '第一属性值',
    Second_attribute: '第二属性',
    Second_attribute_values: '第二属性值'
  },
  Saxebottle: {
    Number: '斩瓶id',
    Bottle_type: '斩瓶类型',
    Attribute_values: '属性值'
  },
  Huntingbottle: {
    Number: '弓瓶id',
    Bottle_type_1: '接击瓶',
    Bottle_type_2: '强击瓶',
    Bottle_type_3: '麻瓶',
    Bottle_type_4: '毒瓶',
    Bottle_type_5: '眠瓶',
    Bottle_type_6: '爆瓶'
  },
  Shell: {
    Number: '弹种id',
    Normal_1: '通常弹LV1',
    Normal_2: '通常弹LV2',
    Normal_3: '通常弹LV3',
    Through_1: '贯通弹LV1',
    Through_2: '贯通弹LV2',
    Through_3: '贯通弹LV3',
    Scattering_1: '散弹LV1',
    Scattering_2: '散弹LV2',
    Scattering_3: '散弹LV3',
    Diffusion_1: '扩散弹LV1',
    Diffusion_2: '扩散弹LV2',
    Diffusion_3: '扩散弹LV3',
    Dragon_shot: '龙击弹',
    Slash: '斩裂弹',
    Grenade_1: '撤甲榴弹LV1',
    Grenade_2: '撤甲榴弹LV2',
    Grenade_3: '撤甲榴弹LV3',
    Fire: '火弹',
    Water: '水弹',
    Ice: '冰弹',
    Electricity: '电弹',
    Dragon: '龙弹',
    Poison_1: '毒弹LV1',
    Poison_2: '毒弹LV2',
    Hemp_1: '麻弹LV1',
    Hemp_2: '麻弹LV2',
    Sleep_1: '眠弹LV1',
    Sleep_2: '眠弹LV2',
    Reduce_breath: '灭气弹',
    Restores_1: '回复弹LV1',
    Restores_2: '回复弹LV2',
    Madman: '鬼人弹',
    Harden: '硬化弹',
    Capture: '捕获弹',
    Ammunition: '弹药数',
    Model: '射击模式',
    Recoil: '反动',
    Speed: '上弹速度'
  },
  Bombardment: {
    Number: '铳枪炮击id',
    Bombard_type: '炮击类型',
    Bombard_level: '炮击等级'
  },
  Syllable: {
    Number: '笛音id',
    Syllable1: '音色1',
    Syllable2: '音色2',
    Syllable3: '音色3'
  },
  ASkill: {
    Number: '装置id',
    Type: '装置类型',
    Slot_grade_Number: '镶孔数量',
    Slot_grade_Number1: '1孔等级',
    Slot_grade_Number2: '2孔等级',
  },
  Equipment: {
    Number: '装备id',
    Type: '装备类型',
    Equipment_model: '幻化ID',
    Variant: '特型',
    Patience1: '火耐性',
    Patience2: '水耐性',
    Patience3: '冰耐性',
    Patience4: '雷耐性',
    Patience5: '龙耐性',
    skill1: '技能一',
    skill2: '技能二',
    skill3: '技能三',
    skill4: '技能四',
    skill5: '技能五',
    skilllv1: '技能一等级',
    skilllv2: '技能二等级',
    skilllv3: '技能三等级',
    skilllv4: '技能四等级',
    skilllv5: '技能五等级'
  },
  Insect: {
    Number: '猎虫id',
    Craft_costs: '购买费用',
    Type: '攻击系统',
    Speed: '速度',
    Power: '力量',
    Heal: '回复',
    Rarity: '治愈',
    Dust: '粉尘', DustEffect_0: '爆破',
    DustEffect_1: '回复',
    DustEffect_2: '麻痹',
    DustEffect_3: '毒',
    Unknown: '未知'
  },
  Weapon: {
    Charge_blade: '盾斧',
    Gunlance: '铳枪',
    Hammer: '大锤',
    Greatsword: '大剑',
    Lance: '长枪',
    Insect_glaive: '虫棍',
    Switch_axe: '斩斧',
    Blade: '片手',
    Longsword: '太刀',
    Dual_blade: '双刀',
    Hunting_horn: '猎笛',
    Light_crossbow: '轻弩',
    Heavy_crossbow: '重弩',
    Hunting_bow: '弓',
    Unknown: '未知'
  },
  WeaponExplain: {
    Describe: '描述',
    Address: '地址',
    Edit_data: '修改数据',
    Sequence_number: '武器序列号',
    Independent_model: '独立模型',
    Weapon_model: '武器模型',
    Weapon_secondary_model: '次要模型',
    Manufacturing_costs: '制造费用',
    Production_expenses: '希有度',
    Chopping_value: '斩味匹配',
    Chopping_grade: '斩味',
    Chopping_grade_quick1: '短白',
    Chopping_grade_quick2: '中白',
    Chopping_grade_quick3: '长白',
    Reset: '重置',
    Damage: '伤害值',
    Defense: '防御值',
    Heart: '会心值',
    Visible_attributes: '可见属性',
    Visible_attribute_values: '可见属性数值',
    Hidden_attributes: '隐藏属性',
    Hidden_attribute_values: '隐藏属性数值',
    Match_projectile: '弹种匹配',
    Ballistic_offset: '偏移',
    Seal_Dragon: '封龙力',
    Slot_grade_Number: '镶孔数量',
    Slot_grade_Number1: '1孔等级',
    Slot_grade_Number2: '2孔等级',
    Slot_grade_Number3: '3孔等级',
    clothes: '衣装',
    pipe: '烟筒',
    Special_attributes: '特殊属性',
    Weapon_skills: '武器技能',
    Unknown: '未知',
    Nothing: '无',
    Verybig: '特大',
    Big: '大',
    Inside: '中',
    Small: '小',
    NoGroove: '无孔槽',
    OneGroove: '一个孔槽',
    TwoGroove: '二个孔槽',
    ThreeGroove: '三个孔槽',
    OneGroovel: '一级孔槽',
    TwoGroovel: '二级孔槽',
    ThreeGroovel: '三级孔槽',
    FourGroovel: '四级孔槽',
    Specialprojectile: '特殊弹种',
    Setbomb: '起爆龙弹',
    Gatling: '机关龙弹',
    Snipe: '狙击龙弹',
    Error: '错误',
    Fire: '火',
    Water: '水',
    Ice: '冰',
    Electricity: '电',
    Dragon: '龙',
    Poison: '毒',
    Hemp: '麻',
    Sleep: '眠',
    Burst: '爆',
    Cut: '切断',
    Strike: '打击',
    Attribute: '属性',
    Speed: '速度',
    Power: '力量',
    Endurance: '耐力',
    Restores: '回复',
    Extinguish_dragon: '灭龙',
    Reduce_breath: '减气',
    Strong_exocet_bottle: '榴弹瓶',
    Strong_attribute_bottle: '强属性瓶',
    Normal_type: '通常型',
    Diffusion_type: '扩散型',
    Radiological_type: '放射型',
    Rapid_type: '速射型',
    Automatic_type: '自动装填',
    Dragon_type: '龙击蓄力',
    Fast: '快',
    Medium: '中',
    Slightly_slow: '稍慢',
    Slow: '慢',
    Purple_timbre: '紫音',
    Red_timbre: '红音',
    Orange_timbre: '橙音',
    Yellow_timbre: '黄音',
    Green_timbre: '绿音',
    Blue_timbre: '蓝音',
    Indigo_timbre: '青音',
    White_timbre: '白音',
    Equipment_type_0: '头盔',
    Equipment_type_1: '胸甲',
    Equipment_type_2: '手套',
    Equipment_type_3: '腰带',
    Equipment_type_4: '护腿',
    Equipment_type_5: '护石',
    Equipment_variant_1: 'α、γ',
    Equipment_variant_2: 'β',
    Ordinary: '普通',
    Intensify: '强化'
  },
  Skill: {
    Number: '技能id',
    Level: '技能等级',
    Parameter_1: '参数1',
    Parameter_2: '参数2',
    0: '无技能',
    1: '毒耐性',
    2: '麻痹耐性',
    3: '睡眠耐性',
    4: '昏厥耐性',
    5: '泥耐性',
    6: '爆破异常状态的耐性',
    7: '裂伤耐性',
    8: '防御力下降耐性',
    9: '样本',
    11: '耳塞',
    12: '风压耐性',
    13: '耐震',
    14: '异臭名人',
    16: '调节瘴气环境',
    17: '热伤害无效',
    19: '攻击',
    20: '防御',
    21: '体力增强',
    22: '体力回复量上升',
    23: '回复速度',
    24: '火耐性',
    25: '水耐性',
    26: '冰耐性',
    27: '雷耐性',
    28: '龙耐性',
    29: '属性异常状态的耐性',
    30: '火属性攻击强化',
    31: '水属性攻击强化',
    32: '冰属性攻击强化',
    33: '雷属性攻击强化',
    34: '龙属性攻击强化',
    35: '毒属性强化',
    36: '麻痹属性强化',
    37: '睡眠属性强化',
    38: '爆破属性强化',
    39: '通常弹‧通常箭强化',
    40: '贯通弹‧龙之箭强化',
    41: '散弹‧刚射强化',
    42: '毒瓶追加',
    43: '麻痹瓶追加',
    44: '睡眠瓶追加',
    46: '爆破瓶追加',
    47: '属性解放／装填扩充',
    48: '看破',
    49: '超会心',
    50: '弱点特效',
    51: '样本',
    52: '集中',
    53: '强化持续',
    54: '匠',
    55: '拔刀术【技】', 56: '破坏王',
    57: '击晕术',
    58: '夺取耐力',
    59: '骑乘名人',
    60: '飞燕',
    61: '力之解放',
    62: '挑战者',
    63: '无伤',
    64: '火场怪力',
    65: '不屈',
    66: '怨恨',
    67: '死里逃生',
    68: '吹笛名人',
    69: '炮弹装填数提升',
    70: '特殊射击强化',
    71: '炮术',
    72: '炮击手',
    73: '跑者',
    74: '体术',
    75: '飞身跃入',
    76: '耐力急速回复',
    77: '饥饿耐性',
    78: '回避性能',
    79: '回避距离提升',
    80: '防御性能',
    81: '纳刀术',
    82: '广域化',
    83: '道具使用强化',
    84: '满足感',
    85: '快吃',
    86: '砥石使用高速化',
    88: '炸弹客',
    90: '最爱蘑菇',
    91: '钓鱼名人',
    92: '烤肉名人',
    93: '搬运达人',
    94: '采集达人',
    95: '蜂蜜猎人',
    96: '剥取铁人',
    97: '精灵加护',
    98: '指示随从',
    99: '植生学',
    100: '地质学',
    101: '精神抖擞',
    102: '投射器装填数提升',
    103: '潜伏',
    104: '减轻胆怯',
    105: '导虫反应距离提升',
    106: '蹲下移动速度提升',
    107: '跳跃铁人',
    108: '棉花孢子草的知识',
    109: '调节水场',
    111: '攀岩者',
    112: '闪光强化',
    114: '研究者',
    115: '昆虫标本达人',
    116: '瘴气耐性',
    117: '追迹达人',
    118: '探索者的幸运',
    119: '察觉',
    120: '整备',
    122: '滑走强化',
    123: '龙封力强化',
    124: '威吓',
    125: '蛮颚龙之力',
    126: '灭尽龙之饥饿',
    127: '尸套龙之命脉',
    128: '火龙之力',
    129: '角龙之力',
    130: '幻兽之恩惠',
    131: '樱火龙之奥秘',
    132: '蛮颚龙之斗志',
    135: '火龙奥秘',
    136: '角龙之奥秘',
    137: '幻兽之恩宠',
    138: '爆锤龙之守护',
    142: '爆鳞龙之守护',
    143: '炎王龙之武技',
    144: '钢龙的飞翔',
    145: '冥灯龙的神秘',
    147: '熔山龙的奥秘',
    149: '公会的指引',
    150: '调查团的指引',
    151: '风漂龙的恩惠',
    152: '风漂龙的恩宠',
    153: '惨爪龙之力',
    154: '惨爪龙的奥秘',
    155: '解放弓的蓄力阶段',
    156: '心眼／弹道强化',
    157: '防御强化',
    158: '刚刃研磨',
    159: '无内容强化',
    160: '毅力',
    161: '加速再生',
    162: '利刃／弹丸节约',
    163: '炎妃龙的恩宠',
    164: '龙骑士之证',
    165: '会心攻击【属性】',
    166: '会心攻击【特殊】',
    167: '狩魔猎人的心得',
    168: '星辰的祝福',
    169: '雷狼龙的真髓',
    170: '轰龙的真髓',
    171: '迅龙的真髓',
    172: '碎龙的真髓',
    173: '斩龙的真髓',
    174: '银火龙的真髓',
    175: '金火龙的真髓',
    176: '天地煌啼龙的神秘',
    177: '溟波龙的神秘',
    178: '冰咒龙的神秘',
    179: '太古的神秘',
    180: '调查团的炼金术',
    181: '教官的引导',
    182: '蛮颚龙的霸气',
    183: '雌火龙的真髓',
    184: '佯动攻击',
    185: '攻击守势',
    186: '转祸为福',
    187: '受身术',
    188: '冰牙龙的秘技',
    189: '火龙的真髓',
    190: '角龙的霸气',
    191: '风漂龙的霸气',
    192: '惨爪龙的真髓',
    193: '爆锤龙的霸气',
    194: '爆鳞龙的霸气',
    195: '恐暴龙的真髓',
    196: '尸套龙的灵脉',
    199: '幻兽的神秘',
    200: '公会的见识',
    201: '熔山龙的真髓',
    202: '炎妃龙的真髓',
    203: '灭尽龙的霸气',
    205: '钝器能手',
    206: '振奋',
    207: '寒冷耐性',
    208: '金狮子的怒气',
    210: '生还者',
    212: '万福的祝福',
    213: '大感谢的祝福',
  }
}