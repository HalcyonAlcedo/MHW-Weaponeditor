const hexAddress = (data) => {
  let HexRuler
  let HexPointer
  if (data[7] === 0 && data[71] === 1 && data[136] === 2) {
    HexRuler = 16 * 4 + 1 // 近程武器
    HexPointer = {
      'wp_Number': [6, 1], // 6
      'wp_Unprefixed_Model': [13, 2], // 12~13
      'wp_Model': [15, 2], // 14~15
      'wp_Minor_Model': [17, 2], // 16~17
      'wp_Money': [24, 4], // 21~24
      'wp_Rarity': [25, 1], // 25
      'wp_Chopping_value': [26, 1], // 26
      'wp_Chopping_grade': [27, 1], // 27
      'wp_Damage_value': [29, 2, 'wpdamage'], // 28~29
      'wp_Defense_value': [31, 2, 'wpdefense'], // 30~31
      'wp_Heart_value': [32, 1, 'wpheart'], // 32
      'wp_Visible_attributes': [33, 1], // 33
      'wp_Visible_attribute_values': [35, 2, 'wpattribute'], // 34~35
      'wp_Hidden_attribute': [36, 1], // 36
      'wp_Hidden_attribute_values': [38, 2, 'wpattribute'], // 37~38
      'wp_Seal_Dragon': [39, 1], // 39
      'wp_Slot_grade_Number': [40, 1], // 40
      'wp_Slot_grade_1': [41, 1], // 41
      'wp_Slot_grade_2': [42, 1], // 42
      'wp_Slot_grade_3': [43, 1], // 43
      'wp_Special_attributes': [44, 1], // 44
      'wp_Weapon_skills': [(HexRuler + 2), 1] // HexRuler(下一行) + 2
    }
  } else if (data[7] === 0 && data[74] === 1 && data[142] === 2) {
    HexRuler = 16 * 4 + 4 // 远程武器
    HexPointer = {
      'wp_Number': [6, 1], // 6
      'wp_Unprefixed_Model': [13, 2], // 12~13
      'wp_Model': [15, 2], // 14~15
      'wp_Minor_Model': [17, 2], // 16~17
      'wp_Money': [28, 4], // 25~28
      'wp_Rarity': [29, 1], // 29
      'wp_Damage_value': [31, 2, 'wpdamage'], // 30~31
      'wp_Defense_value': [33, 2, 'wpdefense'], // 32~33
      'wp_Heart_value': [34, 1, 'wpheart'], // 34
      'wp_Visible_attributes': [35, 1], // 35
      'wp_Visible_attribute_values': [37, 2, 'wpattribute'], // 36~37
      'wp_Hidden_attribute': [38, 1], // 38
      'wp_Hidden_attribute_values': [40, 2, 'wpattribute'], // 39~40
      'wp_Seal_Dragon': [41, 1], // 41
      'wp_Cartridge_matching': [42, 1], // 42
      'wp_Offset_size': [44, 1], // 44
      'wp_Slot_grade_Number': [45, 1], // 45
      'wp_Slot_grade_1': [46, 1], // 46
      'wp_Slot_grade_2': [47, 1], // 47
      'wp_Slot_grade_3': [48, 1], // 48
      'wp_Special_projectile': [62, 1], // 62
      'wp_Weapon_skills': [(HexRuler + 2), 1] // HexRuler(下一行) + 2
    }
  } else if (data[6] === 0 && data[24] === 1 && data[42] === 2) {
    HexRuler = 18 // 斩味
    HexPointer = {
      'k_Number': [9, 4], // 6~9
      'k_Sharpness_red': [11, 2], // 8~9
      'k_Sharpness_orange': [13, 2], // 10~11
      'k_Sharpness_yellow': [15, 2], // 12~13
      'k_Sharpness_green': [17, 2], // 14~15
      'k_Sharpness_blue': [19, 2], // 16~17
      'k_Sharpness_white': [21, 2], // 08~19
      'k_Sharpness_purple': [23, 2] // 20~21
    }
  } else if (data[6] === 0 && data[16] === 1 && data[26] === 2) {
    HexRuler = 10 // 双刀双属性
    HexPointer = {
      'ws_Number': [9, 4], // 6~9
      'ws_First_attribute': [10, 1], // 10
      'ws_First_attribute_values': [12, 2, 'wpattribute'], // 11~12
      'ws_Second_attribute': [13, 1], // 13
      'ws_Second_attribute_values': [15, 2, 'wpattribute'] // 14~15
    }
  } else if (data[6] === 0 && data[16] === 1 && data[26] === 2) {
    HexRuler = 27 // 虫
    HexPointer = {
      'ri_Number': [15, 4] // 11~15
    }
  } else if (data[2] === 42 && data[6] === 0 && data[13] === 1 && data[20] === 2) {
    HexRuler = 7 // 斩瓶
    HexPointer = {
      'sa_Number': [9, 4], // 6~9
      'sa_Attribute': [10, 1], // 10
      'sa_Attribute_value': [12, 2, 'wpattribute'] // 11~12
    }
  } else if (data[2] === 50 && data[6] === 0 && data[13] === 1 && data[20] === 2) {
    HexRuler = 7 // 狩猎笛
    HexPointer = {
      'ww_Number': [9, 4], // 6~9
      'ww_Timbre1': [10, 1], // 10
      'ww_Timbre2': [11, 1], // 11
      'ww_Timbre3': [12, 1] // 12
    }
  } else if (data[6] === 0 && data[14] === 1 && data[22] === 2) {
    HexRuler = 8 // 铳枪
    HexPointer = {
      'gl_Number': [9, 4], // 6~9
      'gl_bombard_type': [11, 2], // 10~11
      'gl_bombard_level': [13, 2] // 12~13
    }
  } else if (data[2] === 120 && data[6] === 0 && data[17] === 1 && data[28] === 1) {
    HexRuler = 10 // 技能
    HexPointer = {
      'sk_Number': [7, 2], // 6~9
      'sk_level': [8, 1], // 8
      'sk_First_effect': [10, 2], // 9~10
      'sk_Second_effect': [12, 2] // 11~12
    }
  } else if (data[0] === 166 && data[1] === 1 && data[2] === 77) {
    HexRuler = 111 // 弩弹
    HexPointer = {
      'sh_Number': 'auto',
      'Normal_1': {
        Ammunition: [6, 1],
        Model: [7, 1],
        Speed: [8, 1],
      },
      'Normal_2': {
        Ammunition: [9, 1],
        Model: [10, 1],
        Speed: [11, 1],
      },
      'Normal_3': {
        Ammunition: [12, 1],
        Model: [13, 1],
        Speed: [14, 1],
      },
      'Through_1': {
        Ammunition: [15, 1],
        Model: [16, 1],
        Speed: [17, 1],
      },
      'Through_2': {
        Ammunition: [18, 1],
        Model: [19, 1],
        Speed: [20, 1],
      },
      'Through_3': {
        Ammunition: [21, 1],
        Model: [22, 1],
        Speed: [23, 1],
      },
      'Scattering_1': {
        Ammunition: [24, 1],
        Model: [25, 1],
        Speed: [26, 1],
      },
      'Scattering_2': {
        Ammunition: [27, 1],
        Model: [28, 1],
        Speed: [29, 1],
      },
      'Scattering_3': {
        Ammunition: [30, 1],
        Model: [31, 1],
        Speed: [32, 1],
      },
      'Diffusion_1': {
        Ammunition: [33, 1],
        Model: [34, 1],
        Speed: [35, 1],
      },
      'Diffusion_2': {
        Ammunition: [36, 1],
        Model: [37, 1],
        Speed: [38, 1],
      },
      'Diffusion_3': {
        Ammunition: [39, 1],
        Model: [40, 1],
        Speed: [41, 1],
      },
      'Dragon_shot': {
        Ammunition: [42, 1],
        Model: [43, 1],
        Speed: [44, 1],
      },
      'Slash': {
        Ammunition: [45, 1],
        Model: [46, 1],
        Speed: [47, 1],
      },
      'Grenade_1': {
        Ammunition: [48, 1],
        Model: [49, 1],
        Speed: [50, 1],
      },
      'Grenade_2': {
        Ammunition: [51, 1],
        Model: [52, 1],
        Speed: [53, 1],
      },
      'Grenade_3': {
        Ammunition: [54, 1],
        Model: [55, 1],
        Speed: [56, 1],
      },
      'Fire': {
        Ammunition: [57, 1],
        Model: [58, 1],
        Speed: [59, 1],
      },
      'Water': {
        Ammunition: [60, 1],
        Model: [61, 1],
        Speed: [62, 1],
      },
      'Ice': {
        Ammunition: [63, 1],
        Model: [64, 1],
        Speed: [65, 1],
      },
      'Electricity': {
        Ammunition: [66, 1],
        Model: [67, 1],
        Speed: [68, 1],
      },
      'Dragon': {
        Ammunition: [69, 1],
        Model: [70, 1],
        Speed: [71, 1],
      },
      'Poison_1': {
        Ammunition: [72, 1],
        Model: [73, 1],
        Speed: [74, 1],
      },
      'Poison_2': {
        Ammunition: [75, 1],
        Model: [76, 1],
        Speed: [77, 1],
      },
      'Hemp_1': {
        Ammunition: [78, 1],
        Model: [79, 1],
        Speed: [80, 1],
      },
      'Hemp_2': {
        Ammunition: [81, 1],
        Model: [82, 1],
        Speed: [83, 1],
      },
      'Sleep_1': {
        Ammunition: [84, 1],
        Model: [85, 1],
        Speed: [86, 1],
      },
      'Sleep_2': {
        Ammunition: [87, 1],
        Model: [88, 1],
        Speed: [89, 1],
      },
      'Reduce_breath': {
        Ammunition: [90, 1],
        Model: [91, 1],
        Speed: [92, 1],
      },
      'Restores_1': {
        Ammunition: [93, 1],
        Model: [94, 1],
        Speed: [95, 1],
      },
      'Restores_2': {
        Ammunition: [96, 1],
        Model: [97, 1],
        Speed: [98, 1],
      },
      'Madman': {
        Ammunition: [99, 1],
        Model: [100, 1],
        Speed: [101, 1],
      },
      'Harden': {
        Ammunition: [102, 1],
        Model: [103, 1],
        Speed: [104, 1],
      },
      'Capture': {
        Ammunition: [105, 1],
        Model: [106, 1],
        Speed: [107, 1],
      }
    }
  } else if (data[0] === 166 && data[1] === 1 && data[2] === 20) {
    HexRuler = 6 // 弓瓶
    HexPointer = {
      'bt_Number': 'auto',
      'bt_chopping': [7, 1], // 6~9
      'bt_enhance': [8, 1], // 10~11
      'bt_paralysis': [9, 1], // 12~13
      'bt_poison': [10, 1], // 12~13
      'bt_sleep': [11, 1], // 12~13
      'bt_bomb': [12, 1] // 12~13
    }
  } else if (data[10] === 1 && data[59] === 2 && data[123] === 3) {
    HexRuler = 60 // 装备
    HexPointer = {
      'eq_Number': [59, 1],
      'eq_Type': [16, 1], // 6~9
      'eq_Variant': [12, 1], // 10~11
      'eq_Defense': [18, 2], // 12~13
      'eq_Rarity': [26, 1], // 12~13
      'eq_Money': [30, 4], // 12~13
      'eq_Patience1': [31, 1, 'wpattribute'], // 12~13
      'eq_Patience2': [32, 1, 'wpattribute'], // 12~13
      'eq_Patience3': [33, 1, 'wpattribute'], // 12~13
      'eq_Patience4': [34, 1, 'wpattribute'], // 12~13
      'eq_Patience5': [35, 1, 'wpattribute'], // 12~13
      'eq_Slot_grade_Number': [36, 1],
      'eq_Slot_grade_1': [37, 1],
      'eq_Slot_grade_2': [38, 1],
      'eq_Slot_grade_3': [39, 1],
      'qe_Weapon_skills1': [41, 2],
      'qe_Weapon_skillslv1': [42, 1],
      'qe_Weapon_skills2': [44, 2],
      'qe_Weapon_skillslv2': [45, 1],
      'qe_Weapon_skills3': [47, 2],
      'qe_Weapon_skillslv3': [48, 1],
      'qe_Weapon_skills4': [50, 2],
      'qe_Weapon_skillslv4': [51, 1],
      'qe_Weapon_skills5': [53, 2],
      'qe_Weapon_skillslv5': [54, 1]

    }
  } else {
    HexRuler = data.length // 未知
    HexPointer = {}
  }
  return {
    HexRuler: HexRuler,
    HexPointer: HexPointer
  }
}

export default hexAddress