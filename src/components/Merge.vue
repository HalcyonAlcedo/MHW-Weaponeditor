<template>
<v-container fluid>
  <v-card>
    <v-tabs vertical>
      <v-tab>
        <v-icon left>mdi-account</v-icon>
        原始文件
      </v-tab>
      <v-tab>
        <v-icon left>mdi-access-point</v-icon>
        进行文件合并
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                sm="4"
              >
                <v-hover
                  v-slot:default="{ hover }"
                  open-delay="200"
                >
                  <v-card
                    :elevation="hover ? 16 : 2"
                    class="mx-auto"
                    height="350"
                    max-width="350"
                  >
                    <v-card-title>
                      原始数据
                    </v-card-title>
                    <v-card-text v-text="sdata">

                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>

              <v-col
                cols="12"
                sm="4"
              >
                <v-hover
                  v-slot:default="{ hover }"
                  close-delay="200"
                >
                  <v-card
                    :elevation="hover ? 16 : 2"
                    class="mx-auto"
                    height="350"
                    max-width="350"
                  >
                    <v-card-title>
                      当前文件数据
                      <div class="flex-grow-1"></div>
                      <span @click="openfile('r')">打开</span>
                    </v-card-title>
                    <v-card-text v-text="rdata">

                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>
              <v-col
                cols="12"
                sm="4"
              >
                <v-hover
                  v-slot:default="{ hover }"
                  close-delay="200"
                >
                  <v-card
                    :elevation="hover ? 16 : 2"
                    class="mx-auto"
                    height="350"
                    max-width="350"
                  >
                    <v-card-title>
                      待合并文件数据
                      <div class="flex-grow-1"></div>
                      <span @click="openfile('t')">打开</span>
                    </v-card-title>
                    <v-card-text v-text="tdata">

                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
            </p>

            <p class="mb-0">
              Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</v-container>
</template>

<script>
  import fs from 'fs'
  import path from 'path'

  const {dialog} = require('electron').remote

  export default {
    data () {
      return {
        sdata: [],
        rdata: [],
        tdata: [],
        file: '',
        tabs: [
          { title: this.$t('Weapon.Greatsword') + ' (l_sword)', file: 'l_sword.wp_dat' },
          { title: this.$t('Weapon.Blade') + ' (sword)', file: 'sword.wp_dat' },
          { title: this.$t('Weapon.Hammer') + ' (hammer)', file: 'hammer.wp_dat' },
          { title: this.$t('Weapon.Lance') + ' (lance)', file: 'lance.wp_dat' },
          { title: this.$t('Weapon.Switch_axe') + ' (s_axe)', file: 's_axe.wp_dat' },
          { title: this.$t('Weapon.Insect_glaive') + ' (rod)', file: 'rod.wp_dat' },
          { title: this.$t('Weapon.Light_crossbow') + ' (lbg)', file: 'lbg.wp_dat_g' },
          { title: this.$t('Weapon.Heavy_crossbow') + ' (hbg)', file: 'hbg.wp_dat_g' },
          { title: this.$t('Weapon.Longsword') + ' (tachi)', file: 'tachi.wp_dat' },
          { title: this.$t('Weapon.Dual_blade') + ' (w_sword)', file: 'w_sword.wp_dat' },
          { title: this.$t('Weapon.Hunting_horn') + ' (whistle)', file: 'whistle.wp_dat' },
          { title: this.$t('Weapon.Gunlance') + ' (g_lance)', file: 'g_lance.wp_dat' },
          { title: this.$t('Weapon.Charge_blade') + ' (c_axe)', file: 'c_axe.wp_dat' },
          { title: this.$t('Weapon.Hunting_bow') + ' (bow)', file: 'bow.wp_dat_g' },
          { title: this.$t('Weaponsmiscellaneous.Sharpness') + ' (kireaji.kire)', file: 'kireaji.kire' },
          { title: this.$t('Weaponsmiscellaneous.Wswordattribute') + ' (wep_wsword.wep_wsd)', file: 'wep_wsword.wep_wsd' },
          { title: this.$t('Weaponsmiscellaneous.Saxebottle') + ' (wep_saxe.wep_saxe)', file: 'wep_saxe.wep_saxe' },
          { title: this.$t('Weaponsmiscellaneous.Bombardment') + ' (wep_glan.wep_glan)', file: 'wep_glan.wep_glan' },
          { title: this.$t('Weaponsmiscellaneous.Syllable') + ' (wep_whistle.wep_wsl)', file: 'wep_whistle.wep_wsl' },
          { title: this.$t('Weaponsmiscellaneous.Bottle') + ' (bottle_table.bbtbl)', file: 'bottle_table.bbtbl' },
          { title: this.$t('Weaponsmiscellaneous.Shell') + ' (shell_table.shl_tbl)', file: 'shell_table.shl_tbl' }
        ],
        filedata: [],
        headers: {
          'l_sword.wp_dat': [],
          'sword.wp_dat': [],
          'hammer.wp_dat': [],
          'lance.wp_dat': [],
          's_axe.wp_dat': [],
          'rod.wp_dat': [],
          'lbg.wp_dat_g': [],
          'hbg.wp_dat_g': [],
          'tachi.wp_dat': [],
          'w_sword.wp_dat': [],
          'whistle.wp_dat': [],
          'g_lance.wp_dat': [],
          'c_axe.wp_dat': [],
          'bow.wp_dat_g': [],
          'kireaji.kire': [],
          'wep_wsword.wep_wsd': [],
          'wep_saxe.wep_saxe': [],
          'wep_glan.wep_glan': [],
          'wep_whistle.wep_wsl': [],
          'bottle_table.bbtbl': [],
        },
        desserts: {
          'l_sword.wp_dat': [{}],
          'sword.wp_dat': [{}],
          'hammer.wp_dat': [{}],
          'lance.wp_dat': [{}],
          's_axe.wp_dat': [{}],
          'rod.wp_dat': [{}],
          'lbg.wp_dat_g': [{}],
          'hbg.wp_dat_g': [{}],
          'tachi.wp_dat': [{}],
          'w_sword.wp_dat': [{}],
          'whistle.wp_dat': [{}],
          'g_lance.wp_dat': [{}],
          'c_axe.wp_dat': [{}],
          'bow.wp_dat_g': [{}],
          'kireaji.kire': [{}],
          'wep_wsword.wep_wsd': [{}],
          'wep_saxe.wep_saxe': [{}],
          'wep_glan.wep_glan': [{}],
          'wep_whistle.wep_wsl': [{}],
          'bottle_table.bbtbl': [{}],
        }
      }
    },
    methods: {
      openfile (t) {
        let filepath
        let _this = this
        dialog.showOpenDialog({
          properties: ['openFile']
        }).then(result => {
          let file = result.filePaths[0].substring(result.filePaths[0].lastIndexOf('\\') + 1)
          this.loadfile(result.filePaths[0], file, t)
        }).catch(err => {
          console.log('err:' + err)
        })
      },
      loadfile (f, filename, t) {
        let _this = this
        fs.readFile(f, function (err, data) {
          if (!err) {
            if (t === 'r') {
              _this.rdata = data
              _this.contrastdata(filename)
            } else {
              _this.tdata = data
            }
          }
        })
      },
      contrastdata (filename) {
        let _this = this
        let filepath = path.join(__static, '../../Sourceweapon/' + filename)
        fs.access(filepath,fs.constants.F_OK, (err) => {
          if (err) {
            filepath = path.join(__static, '/Sourceweapon/' + filename)
          }
          fs.readFile(filepath, function (err, data) {
            if (!err) {
              _this.sdata = data
            }
          })
        })
      },
      setheaders (file) {
        let _this = this
        let header = []
        this.filedata.map(function(value,index) {
          if (value.file === file) {
            let data = value.data
            for (let val in data[0]) {
              header.push(
                {
                  text: _this.headername(val),
                  value: val
                }
              )
            }
            _this.headers[file] = header
            _this.desserts[file] = data
          }
        })
      },
      hexdata (data, filename) {
        let _this = this
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
        let wplist = []
        for (let l = data.length / HexRuler, i = 0; i < l; i++) {
          let wpobj = {}
          wpobj.wp_Hex = (HexRuler * i).toString(16) // 目标地址
          if (HexPointer.eq_Type != null) {
            wpobj.wp_Name = _this.wpname(filename, _this.HexFunction(data, HexPointer.eq_Number, HexRuler, i).vul, _this.HexFunction(data, HexPointer.eq_Type, HexRuler, i).vul)
          } else {
            wpobj.wp_Name = _this.wpname(filename, _this.HexFunction(data, HexPointer.wp_Number, HexRuler, i))
          }
          for (let n in HexPointer) { // 遍历所有属性
            wpobj[n] = _this.Resourceprocessing(filename, _this.HexFunction(data, HexPointer[n], HexRuler, i))
          }
          wplist[i] = wpobj
        }
        return wplist
      },
      wpname (filename, id, type) {
        let wpnamelist
        if (
          filename &&
          (filename.substring(filename.lastIndexOf('.') + 1) === 'wp_dat_g' || filename.substring(filename.lastIndexOf('.') + 1) === 'wp_dat' || filename.substring(filename.lastIndexOf('.') + 1) === 'am_dat')
        ) {
          wpnamelist = require('../components/Weaponinfo/' + this.$i18n.locale + '/' + filename + '.json')
        } else {
          return this.$t('WeaponExplain.Unknown')
        }
        let namedata = wpnamelist.Data
        if (!Number.isInteger(id)) {
          id = id.vul
        }
        if (type != null && !Number.isInteger(type)) {
          type = type.vul
        }
        if (type != null) {
          for (let i = 0; i < namedata.length; i++) {
            if (
              namedata[i].Equipment_Number === id &&
              namedata[i].Equipment_Type === type
            ) {
              return namedata[i].name
            }
          }
        } else {
          for (let i = 0; i < namedata.length; i++) {
            if (namedata[i].Weapon_Number === id) {
              return namedata[i].name
            }
          }
        }
        return this.$t('WeaponExplain.Unknown')
      },
      Resourceprocessing (filename, HexFunction) {
        if (HexFunction !== false) {
          switch (HexFunction.resourceprocessing) {
            case 'wpdamage':
              HexFunction = Math.ceil(HexFunction.vul * this.weapon_damage(filename))
              break
            case 'wpattribute':
              if (HexFunction.hexL == 1) {
                HexFunction.vul = HexFunction.vul <= 100 ? HexFunction.vul : '-' + (256 - HexFunction.vul)
              }
              if (HexFunction.vul !== 0) { HexFunction.vul = HexFunction.vul + '0' }
              HexFunction = HexFunction.vul
              break
            case 'wpheart':
              HexFunction = HexFunction.vul <= 100 ? HexFunction.vul : '-' + (256 - HexFunction.vul)
              break
            case 'wpdefense':
              HexFunction = Math.ceil(HexFunction.vul)
              break
            default:
              HexFunction = HexFunction.vul
          }
        } else {
          HexFunction = ''
        }
        return HexFunction
      },
      HexFunction (data, Hexpointer, HexRuler, i) {
        let ret = ''
        if (Hexpointer === undefined) {
          return false
        }
        if (Hexpointer === 'auto') {
          return {vul: i}
        }
        if (typeof (Hexpointer[0]) !== 'number') {
          let vul = {}
          for (let k in Hexpointer) {
            let vulret = ''
            for (let p = 0; p < Hexpointer[k][1]; p++) {
              let Hex16 = data[(HexRuler * i) + Hexpointer[k][0] - p]
              if (Hex16 !== undefined) {
                vulret += this.str_pad(Hex16.toString(16), 2)
              } else {
                vulret = '00'
              }
            }
            vul[k] = {
              vul: parseInt(vulret, 16),
              hex: (HexRuler * i) + Hexpointer[k][0],
              hexL: Hexpointer[k][1],
            }
          }
          return {data: vul}
        }
        for (let p = 0; p < Hexpointer[1]; p++) {
          let Hex16 = data[(HexRuler * i) + Hexpointer[0] - p]
          if (Hex16 !== undefined) {
            ret += this.str_pad(Hex16.toString(16), 2)
          } else {
            ret = '00'
          }
        }
        return {vul: parseInt(ret, 16), hex: (HexRuler * i) + Hexpointer[0], hexL: Hexpointer[1], resourceprocessing: Hexpointer.length > 2 ? Hexpointer[2] : false}
      },
      str_pad (hex, digits = 8) {
        var zero = new Array(digits + 1).join('0')
        var tmp = digits - hex.length
        return zero.substr(0, tmp) + hex.toLocaleUpperCase()
      },
      weapon_damage (file) {
        let weapondamage = 0
        switch (file) {
          case 'l_sword.wp_dat':
            weapondamage = 4.8
            break
          case 'sword.wp_dat':
            weapondamage = 1.4
            break
          case 'hammer.wp_dat':
            weapondamage = 5.2
            break
          case 'lance.wp_dat':
            weapondamage = 2.3
            break
          case 's_axe.wp_dat':
            weapondamage = 3.5
            break
          case 'rod.wp_dat':
            weapondamage = 3.1
            break
          case 'lbg.wp_dat_g':
            weapondamage = 1.3
            break
          case 'tachi.wp_dat':
            weapondamage = 3.3
            break
          case 'w_sword.wp_dat':
            weapondamage = 1.4
            break
          case 'whistle.wp_dat':
            weapondamage = 4.2
            break
          case 'g_lance.wp_dat':
            weapondamage = 2.3
            break
          case 'c_axe.wp_dat':
            weapondamage = 3.6
            break
          case 'bow.wp_dat_g':
            weapondamage = 1.2
            break
          case 'hbg.wp_dat_g':
            weapondamage = 1.5
            break
          default:
            weapondamage = 1
        }
        return weapondamage
      },
      headername (header) {
        let text = header
        switch (header) {
          case 'wp_Number':
            text = this.$t('Interface.Weapon')
            break
          case 'wp_Unprefixed_Model':
            text = this.$t('WeaponExplain.Weapon_model')
            break
          case 'wp_Model':
            text = this.$t('WeaponExplain.Weapon_model')
            break
          case 'wp_Minor_Model':
            text = this.$t('WeaponExplain.Weapon_secondary_model')
            break
          case 'wp_Money':
            text = this.$t('WeaponExplain.Manufacturing_costs')
            break
          case 'wp_Rarity':
            text = this.$t('WeaponExplain.Production_expenses')
            break
          case 'wp_Chopping_value':
            text = this.$t('WeaponExplain.Chopping_grade_quick1')
            break
          case 'wp_Chopping_grade':
            text = this.$t('WeaponExplain.Chopping_grade_quick1')
            break
          case 'wp_Damage_value':
            text = this.$t('WeaponExplain.Damage')
            break
          case 'wp_Defense_value':
            text = this.$t('WeaponExplain.Defense')
            break
          case 'wp_Heart_value':
            text = this.$t('WeaponExplain.Heart')
            break
          case 'wp_Visible_attributes':
            text = this.$t('WeaponExplain.Visible_attributes')
            break
          case 'wp_Visible_attribute_values':
            text = this.$t('WeaponExplain.Visible_attribute_values')
            break
          case 'wp_Hidden_attribute':
            text = this.$t('WeaponExplain.Hidden_attributes')
            break
          case 'wp_Hidden_attribute_values':
            text = this.$t('WeaponExplain.Hidden_attribute_values')
            break
          case 'wp_Seal_Dragon':
            text = this.$t('WeaponExplain.Seal_Dragon')
            break
          case 'wp_Slot_grade_Number':
            text = this.$t('WeaponExplain.Slot_grade_Number')
            break
          case 'wp_Slot_grade_1':
            text = this.$t('WeaponExplain.Slot_grade_Number1')
            break
          case 'wp_Slot_grade_2':
            text = this.$t('WeaponExplain.Slot_grade_Number2')
            break
          case 'wp_Slot_grade_3':
            text = this.$t('WeaponExplain.Slot_grade_Number3')
            break
          case 'wp_Special_attributes':
            text = this.$t('WeaponExplain.Special_attributes')
            break
          case 'wp_Weapon_skills':
            text = this.$t('WeaponExplain.Weapon_skills')
            break
          case 'wp_Cartridge_matching':
            text = this.$t('WeaponExplain.Match_projectile')
            break
          case 'wp_Offset_size':
            text = this.$t('WeaponExplain.Ballistic_offset')
            break
          case 'wp_Special_projectile':
            text = this.$t('WeaponExplain.Specialprojectile')
            break
        }
        return text
      },
    }
  }
</script>