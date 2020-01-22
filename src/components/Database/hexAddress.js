const hexAddress = (data) => {
  let HexRuler
  let HexPointer
  if (data[11] === 0 && data[76] === 1 && data[142] === 2) {
    HexRuler = 16 * 4 + 2 // 近程武器
    HexPointer = {
      'wp_Number': [10, 1], // 6
      'wp_Unprefixed_Model': [18, 2], // 12~13
      'wp_Model': [20, 2], // 14~15
      'wp_Minor_Model': [22, 2], // 16~17
      'wp_Money': [29, 4], // 21~24
      'wp_Rarity': [30, 1], // 25
      'wp_Chopping_value': [31, 1], // 26
      'wp_Chopping_grade': [32, 1], // 27
      'wp_Damage_value': [34, 2, 'wpdamage'], // 28~29
      'wp_Defense_value': [36, 2, 'wpdefense'], // 30~31
      'wp_Heart_value': [37, 1, 'wpheart'], // 32
      'wp_Visible_attributes': [38, 1], // 33
      'wp_Visible_attribute_values': [40, 2, 'wpattribute'], // 34~35
      'wp_Hidden_attribute': [41, 1], // 36
      'wp_Hidden_attribute_values': [43, 2, 'wpattribute'], // 37~38
      'wp_Seal_Dragon': [44, 1], // 39
      'wp_Slot_grade_Number': [45, 1], // 40
      'wp_Slot_grade_1': [46, 1], // 41
      'wp_Slot_grade_2': [47, 1], // 42
      'wp_Slot_grade_3': [48, 1], // 43
      'wp_Special_attributes': [49, 1], // 44
      'wp_Weapon_skills': [(HexRuler + 6), 1] // HexRuler(下一行) + 2
    }
  } else if (data[11] === 0 && data[79] === 1 && data[148] === 2) {
    HexRuler = 16 * 4 + 5 // 远程武器
    HexPointer = {
      'wp_Number': [10, 1], // 6
      'wp_Unprefixed_Model': [17, 2], // 12~13
      'wp_Model': [19, 2], // 14~15
      'wp_Minor_Model': [21, 2], // 16~17
      'wp_Money': [33, 4], // 25~28
      'wp_Rarity': [34, 1], // 29
      'wp_Damage_value': [36, 2, 'wpdamage'], // 30~31
      'wp_Defense_value': [38, 2, 'wpdefense'], // 32~33
      'wp_Heart_value': [39, 1, 'wpheart'], // 34
      'wp_Visible_attributes': [40, 1], // 35
      'wp_Visible_attribute_values': [42, 2, 'wpattribute'], // 36~37
      'wp_Hidden_attribute': [43, 1], // 38
      'wp_Hidden_attribute_values': [45, 2, 'wpattribute'], // 39~40
      'wp_Seal_Dragon': [46, 1], // 41
      'wp_Cartridge_matching': [47, 1], // 42
      'wp_Offset_size': [49, 1], // 44
      'wp_Slot_grade_Number': [50, 1], // 45
      'wp_Slot_grade_1': [51, 1], // 46
      'wp_Slot_grade_2': [52, 1], // 47
      'wp_Slot_grade_3': [53, 1], // 48
      'wp_Special_projectile': [67, 1], // 62
      'wp_Weapon_skills': [(HexRuler + 6), 1] // HexRuler(下一行) + 2
    }
  } else if (data[10] === 0 && data[28] === 1 && data[46] === 2) {
    HexRuler = 18 // 斩味
    HexPointer = {
      'k_Number': [13, 4], // 6~9
      'k_Sharpness_red': [15, 2], // 8~9
      'k_Sharpness_orange': [17, 2], // 10~11
      'k_Sharpness_yellow': [19, 2], // 12~13
      'k_Sharpness_green': [21, 2], // 14~15
      'k_Sharpness_blue': [23, 2], // 16~17
      'k_Sharpness_white': [25, 2], // 08~19
      'k_Sharpness_purple': [27, 2] // 20~21
    }
  } else if (data[10] === 0 && data[20] === 1 && data[30] === 2) {
    HexRuler = 10 // 双刀双属性
    HexPointer = {
      'ws_Number': [13, 4], // 6~9
      'ws_First_attribute': [14, 1], // 10
      'ws_First_attribute_values': [16, 2, 'wpattribute'], // 11~12
      'ws_Second_attribute': [17, 1], // 13
      'ws_Second_attribute_values': [19, 2, 'wpattribute'] // 14~15
    }
  } else if (data[6] === 0 && data[16] === 1 && data[26] === 2) {
    HexRuler = 27 // 虫
    HexPointer = {
      'ri_Number': [15, 4] // 11~15
    }
  } else if (data[4] === 193 && data[6] === 42 && data[10] === 0 && data[17] === 1 && data[24] === 2) {
    HexRuler = 7 // 斩瓶
    HexPointer = {
      'sa_Number': [13, 4], // 6~9
      'sa_Attribute': [14, 1], // 10
      'sa_Attribute_value': [16, 2, 'wpattribute'] // 11~12
    }
  } else if (data[4] === 193 && data[6] === 50 && data[10] === 0 && data[17] === 1 && data[24] === 2) {
    HexRuler = 7 // 狩猎笛
    HexPointer = {
      'ww_Number': [13, 4], // 6~9
      'ww_Timbre1': [14, 1], // 10
      'ww_Timbre2': [15, 1], // 11
      'ww_Timbre3': [16, 1] // 12
    }
  } else if (data[4] === 194 && data[6] === 21 && data[10] === 0 && data[18] === 1 && data[26] === 2) {
    HexRuler = 8 // 铳枪
    HexPointer = {
      'gl_Number': [13, 4], // 6~9
      'gl_bombard_type': [15, 2], // 10~11
      'gl_bombard_level': [17, 2] // 12~13
    }
  } else if (data[2] === 120 && data[6] === 0 && data[17] === 1 && data[28] === 1) {
    HexRuler = 10 // 技能
    HexPointer = {
      'sk_Number': [11, 2], // 6~9
      'sk_level': [12, 1], // 8
      'sk_First_effect': [14, 2], // 9~10
      'sk_Second_effect': [16, 2] // 11~12
    }
  } else if (data[4] === 29 && data[5] === 2 && data[6] === 186) {
    HexRuler = 111 // 弩弹
    HexPointer = {
      'sh_Number': 'auto',
      'Normal_1': {
        Ammunition: [10, 1],
        Model: [11, 1],
        Speed: [12, 1],
      },
      'Normal_2': {
        Ammunition: [13, 1],
        Model: [14, 1],
        Speed: [15, 1],
      },
      'Normal_3': {
        Ammunition: [16, 1],
        Model: [17, 1],
        Speed: [18, 1],
      },
      'Through_1': {
        Ammunition: [19, 1],
        Model: [20, 1],
        Speed: [21, 1],
      },
      'Through_2': {
        Ammunition: [22, 1],
        Model: [23, 1],
        Speed: [24, 1],
      },
      'Through_3': {
        Ammunition: [25, 1],
        Model: [26, 1],
        Speed: [27, 1],
      },
      'Scattering_1': {
        Ammunition: [28, 1],
        Model: [29, 1],
        Speed: [30, 1],
      },
      'Scattering_2': {
        Ammunition: [31, 1],
        Model: [32, 1],
        Speed: [33, 1],
      },
      'Scattering_3': {
        Ammunition: [34, 1],
        Model: [35, 1],
        Speed: [36, 1],
      },
      'Diffusion_1': {
        Ammunition: [37, 1],
        Model: [38, 1],
        Speed: [39, 1],
      },
      'Diffusion_2': {
        Ammunition: [3406, 1],
        Model: [41, 1],
        Speed: [42, 1],
      },
      'Diffusion_3': {
        Ammunition: [43, 1],
        Model: [44, 1],
        Speed: [45, 1],
      },
      'Dragon_shot': {
        Ammunition: [46, 1],
        Model: [47, 1],
        Speed: [48, 1],
      },
      'Grenade_1': {
        Ammunition: [49, 1],
        Model: [50, 1],
        Speed: [51, 1],
      },
      'Grenade_2': {
        Ammunition: [52, 1],
        Model: [53, 1],
        Speed: [54, 1],
      },
      'Grenade_3': {
        Ammunition: [55, 1],
        Model: [56, 1],
        Speed: [57, 1],
      },
      'Slash': {
        Ammunition: [58, 1],
        Model: [59, 1],
        Speed: [60, 1],
      },
      'Fire': {
        Ammunition: [61, 1],
        Model: [62, 1],
        Speed: [63, 1],
      },
      'Water': {
        Ammunition: [64, 1],
        Model: [65, 1],
        Speed: [66, 1],
      },
      'Ice': {
        Ammunition: [67, 1],
        Model: [68, 1],
        Speed: [69, 1],
      },
      'Electricity': {
        Ammunition: [70, 1],
        Model: [71, 1],
        Speed: [72, 1],
      },
      'Dragon': {
        Ammunition: [73, 1],
        Model: [74, 1],
        Speed: [75, 1],
      },
      'Poison_1': {
        Ammunition: [76, 1],
        Model: [77, 1],
        Speed: [78, 1],
      },
      'Poison_2': {
        Ammunition: [79, 1],
        Model: [80, 1],
        Speed: [81, 1],
      },
      'Hemp_1': {
        Ammunition: [82, 1],
        Model: [83, 1],
        Speed: [84, 1],
      },
      'Hemp_2': {
        Ammunition: [85, 1],
        Model: [86, 1],
        Speed: [87, 1],
      },
      'Sleep_1': {
        Ammunition: [88, 1],
        Model: [89, 1],
        Speed: [90, 1],
      },
      'Sleep_2': {
        Ammunition: [91, 1],
        Model: [92, 1],
        Speed: [93, 1],
      },
      'Reduce_breath': {
        Ammunition: [94, 1],
        Model: [95, 1],
        Speed: [96, 1],
      },
      'Restores_1': {
        Ammunition: [97, 1],
        Model: [98, 1],
        Speed: [99, 1],
      },
      'Restores_2': {
        Ammunition: [100, 1],
        Model: [101, 1],
        Speed: [102, 1],
      },
      'Madman': {
        Ammunition: [103, 1],
        Model: [104, 1],
        Speed: [105, 1],
      },
      'Harden': {
        Ammunition: [106, 1],
        Model: [107, 1],
        Speed: [108, 1],
      },
      'Capture': {
        Ammunition: [109, 1],
        Model: [110, 1],
        Speed: [111, 1],
      }
    }
  } else if (data[4] === 29 && data[5] === 2 && data[6] === 26) {
    HexRuler = 6 // 弓瓶
    HexPointer = {
      'bt_Number': 'auto',
      'bt_chopping': [10, 1], // 6~9
      'bt_enhance': [11, 1], // 10~11
      'bt_paralysis': [12, 1], // 12~13
      'bt_poison': [13, 1], // 12~13
      'bt_sleep': [14, 1], // 12~13
      'bt_bomb': [15, 1] // 12~13
    }
  } else if (data[11] === 0 && data[70] === 1 && data[130] === 2) {
    HexRuler = 60 // 装备
    HexPointer = {
      'eq_Number': [64, 2],
      'eq_Type': [20, 1], // 6~9
      'eq_Variant': [18, 1], // 10~11
      'eq_Defense': [22, 2], // 12~13
      'eq_Rarity': [30, 1], // 12~13
      'eq_Money': [34, 4], // 12~13
      'eq_Patience1': [35, 1, 'wpattribute'], // 12~13
      'eq_Patience2': [36, 1, 'wpattribute'], // 12~13
      'eq_Patience3': [37, 1, 'wpattribute'], // 12~13
      'eq_Patience4': [38, 1, 'wpattribute'], // 12~13
      'eq_Patience5': [39, 1, 'wpattribute'], // 12~13
      'eq_Slot_grade_Number': [40, 1],
      'eq_Slot_grade_1': [41, 1],
      'eq_Slot_grade_2': [42, 1],
      'eq_Slot_grade_3': [43, 1],
      'qe_Weapon_skills1': [45, 2],
      'qe_Weapon_skillslv1': [46, 1],
      'qe_Weapon_skills2': [48, 2],
      'qe_Weapon_skillslv2': [49, 1],
      'qe_Weapon_skills3': [51, 2],
      'qe_Weapon_skillslv3': [52, 1],
      'qe_Weapon_skills4': [54, 2],
      'qe_Weapon_skillslv4': [55, 1],
      'qe_Weapon_skills5': [57, 2],
      'qe_Weapon_skillslv5': [58, 1]

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