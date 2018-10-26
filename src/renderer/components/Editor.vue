<template>
  <div id="wrapper">
    <main>
      <v-app id="inspire">
        <v-autocomplete
          v-model="search"
          :items="filteritem"
          item-text="wp_Name"
          persistent-hint
          prepend-icon="search"
          no-data-text="无可用数据"
        >
          <v-slide-x-reverse-transition
            slot="append-outer"
            mode="out-in"
          >
          <v-icon
            @click="search = null"
          >clear</v-icon>
          </v-slide-x-reverse-transition>
        </v-autocomplete>
        <v-container fluid grid-list-md>
          <v-data-iterator
            :items="filteritem"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
            content-tag="v-layout"
            row
            wrap
            :search="search"
          >
            <v-flex
              slot="item"
              slot-scope="props"
              xs12
              sm6
              md4
              lg3
            >
              <v-card>
                <v-card-title>
                  <h4>{{ props.item.wp_Name }}</h4><v-spacer></v-spacer>
                  <h5>地址：<span class="red--text">{{ str_pad(props.item.wp_Hex) }}</span></h5>
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-tile v-if="props.item.wp_Number !== false">
                    <v-list-tile-content>武器序号:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.wp_Number }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Money !== false">
                    <v-list-tile-content>金币:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.wp_Money }}
                      <Contrast v-if="sourceitems" class="red--text">{{ props.item.wp_Money !== props.item.wp_sourcedata.wp_Money ? '(' + props.item.wp_sourcedata.wp_Money + ')' : ''}}</Contrast>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Rarity !== false">
                    <v-list-tile-content>稀有度:</v-list-tile-content>
                    <v-list-tile-content class="align-end">Rank{{ props.item.wp_Rarity + 1 }}
                      <Contrast v-if="sourceitems" class="red--text">{{ props.item.wp_Rarity !== props.item.wp_sourcedata.wp_Rarity ? '(' + props.item.wp_sourcedata.wp_Rarity + ')' : ''}}</Contrast>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Chopping_value !== false">
                    <v-list-tile-content>斩味值:</v-list-tile-content>
                    <v-list-tile-content class="align-end">
                        <v-slider
                          v-model="props.item.wp_Chopping_value"
                          max=118
                          readonly
                        ></v-slider>
                        {{ props.item.wp_Chopping_value }}
                        <Contrast v-if="sourceitems" class="red--text">{{ props.item.wp_Chopping_value !== props.item.wp_sourcedata.wp_Chopping_value ? '(' + props.item.wp_sourcedata.wp_Chopping_value + ')' : ''}}</Contrast>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Chopping_grade !== false">
                    <v-list-tile-content>斩味等级:</v-list-tile-content>
                    <v-list-tile-content class="align-end">
                        <v-slider
                          v-model="props.item.wp_Chopping_grade"
                          max=8
                          ticks="always"
                          tick-size="2"
                          readonly
                        ></v-slider>
                        {{ props.item.wp_Chopping_grade }}
                        <Contrast v-if="sourceitems" class="red--text">{{ props.item.wp_Chopping_grade !== props.item.wp_sourcedata.wp_Chopping_grade ? '(' + props.item.wp_sourcedata.wp_Chopping_grade + ')' : ''}}</Contrast>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Damage_value !== false">
                    <v-list-tile-content>伤害值:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.wp_Damage_value }}
                      <Contrast v-if="sourceitems" class="red--text">{{ props.item.wp_Damage_value !== props.item.wp_sourcedata.wp_Damage_value ? '(' + props.item.wp_sourcedata.wp_Damage_value + ')' : ''}}</Contrast>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Defense_value !== false">
                    <v-list-tile-content>防御值:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.wp_Defense_value }}
                      <Contrast v-if="sourceitems" class="red--text">{{ props.item.wp_Defense_value !== props.item.wp_sourcedata.wp_Defense_value ? '(' + props.item.wp_sourcedata.wp_Defense_value + ')' : ''}}</Contrast>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Heart_value !== false">
                    <v-list-tile-content>会心值:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.wp_Heart_value <= 100 ? props.item.wp_Heart_value : '-' + (256 - props.item.wp_Heart_value) }}%
                      <Contrast v-if="sourceitems" class="red--text">{{ props.item.wp_Heart_value !== props.item.wp_sourcedata.wp_Heart_value ? '(' + props.item.wp_sourcedata.wp_Heart_value <= 100 ? props.item.wp_sourcedata.wp_Heart_value : '-' + (256 - props.item.wp_sourcedata.wp_Heart_value) + ')' : ''}}</Contrast>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Visible_attributes !== false">
                    <v-list-tile-content>可见属性:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ attribute(props.item.wp_Visible_attributes) }}
                      <Contrast v-if="sourceitems" class="red--text">{{ props.item.wp_Visible_attributes !== props.item.wp_sourcedata.wp_Visible_attributes ? '(' + attribute(props.item.wp_sourcedata.wp_Visible_attributes) + ')' : ''}}</Contrast>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Visible_attribute_values !== false">
                    <v-list-tile-content>可见属性数值:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.wp_Visible_attribute_values * 10 }}
                      <Contrast v-if="sourceitems" class="red--text">{{ props.item.wp_Visible_attribute_values !== props.item.wp_sourcedata.wp_Visible_attribute_values ? '(' + props.item.wp_sourcedata.wp_Visible_attribute_values * 10 + ')' : ''}}</Contrast>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Hidden_attribute !== false">
                    <v-list-tile-content>隐藏属性:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ attribute(props.item.wp_Hidden_attribute) }}
                      <Contrast v-if="sourceitems" class="red--text">{{ props.item.wp_Hidden_attribute !== props.item.wp_sourcedata.wp_Hidden_attribute ? '(' + attribute(props.item.wp_sourcedata.wp_Hidden_attribute) + ')' : ''}}</Contrast>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Hidden_attribute_values !== false">
                    <v-list-tile-content>隐藏属性数值:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.wp_Hidden_attribute_values * 10 }}
                      <Contrast v-if="sourceitems" class="red--text">{{ props.item.wp_Hidden_attribute_values !== props.item.wp_sourcedata.wp_Hidden_attribute_values ? '(' + props.item.wp_sourcedata.wp_Hidden_attribute_values + ')' : ''}}</Contrast>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Cartridge_matching !== false">
                    <v-list-tile-content>子弹匹配:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.wp_Cartridge_matching }}
                      <Contrast v-if="sourceitems" class="red--text">{{ props.item.wp_Cartridge_matching !== props.item.wp_sourcedata.wp_Cartridge_matching ? '(' + props.item.wp_sourcedata.wp_Cartridge_matching + ')' : ''}}</Contrast>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Offset_size !== false">
                    <v-list-tile-content>偏移大小:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.wp_Offset_size }}
                      <Contrast v-if="sourceitems" class="red--text">{{ props.item.wp_Offset_size !== props.item.wp_sourcedata.wp_Offset_size ? '(' + props.item.wp_sourcedata.wp_Offset_size + ')' : ''}}</Contrast>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Slot_grade_Number !== false">
                    <v-list-tile-content>镶孔数量:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.wp_Slot_grade_Number }}
                      <Contrast v-if="sourceitems" class="red--text">{{ props.item.wp_Slot_grade_Number !== props.item.wp_sourcedata.wp_Slot_grade_Number ? '(' + props.item.wp_sourcedata.wp_Slot_grade_Number + ')' : ''}}</Contrast>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Slot_grade_1 !== false">
                    <v-list-tile-content>1孔等级:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.wp_Slot_grade_1 }}
                      <Contrast v-if="sourceitems" class="red--text">{{ props.item.wp_Slot_grade_1 !== props.item.wp_sourcedata.wp_Slot_grade_1 ? '(' + props.item.wp_sourcedata.wp_Slot_grade_1 + ')' : ''}}</Contrast>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Slot_grade_2 !== false">
                    <v-list-tile-content>2孔等级:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.wp_Slot_grade_2 }}
                      <Contrast v-if="sourceitems" class="red--text">{{ props.item.wp_Slot_grade_2 !== props.item.wp_sourcedata.wp_Slot_grade_2 ? '(' + props.item.wp_sourcedata.wp_Slot_grade_2 + ')' : ''}}</Contrast>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Slot_grade_3 !== false">
                    <v-list-tile-content>3孔等级:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.wp_Slot_grade_3 }}
                      <Contrast v-if="sourceitems" class="red--text">{{ props.item.wp_Slot_grade_3 !== props.item.wp_sourcedata.wp_Slot_grade_3 ? '(' + props.item.wp_sourcedata.wp_Slot_grade_3 + ')' : ''}}</Contrast>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Special_attributes !== false">
                    <v-list-tile-content>特殊属性:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.wp_Special_attributes }}
                      <Contrast v-if="sourceitems" class="red--text">{{ props.item.wp_Special_attributes !== props.item.wp_sourcedata.wp_Special_attributes ? '(' + props.item.wp_sourcedata.wp_Special_attributes + ')' : ''}}</Contrast>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-if="props.item.wp_Weapon_skills !== false">
                    <v-list-tile-content>武器技能:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.wp_Weapon_skills }}
                      <Contrast v-if="sourceitems" class="red--text">{{ props.item.wp_Weapon_skills !== props.item.wp_sourcedata.wp_Weapon_skills ? '(' + props.item.wp_sourcedata.wp_Weapon_skills + ')' : ''}}</Contrast>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-data-iterator>
        </v-container>
      </v-app>
    </main>
  </div>
</template>

<script>
export default {
  name: 'wpfile',
  data: () => ({
    rowsPerPageItems: [4, 8],
    pagination: {
      rowsPerPage: 4
    },
    search: null,
    items: [
      {
        wp_Name: '未知武器',
        wp_Number: 0,
        wp_Money: 0,
        wp_Rarity: 0,
        wp_Chopping_value: false,
        wp_Chopping_grade: false,
        wp_Damage_value: 0,
        wp_Defense_value: 0,
        wp_Heart_value: 0,
        wp_Visible_attributes: false,
        wp_Visible_attribute_values: false,
        wp_Hidden_attribute: false,
        wp_Hidden_attribute_values: false,
        wp_Cartridge_matching: false,
        wp_Offset_size: false,
        wp_Slot_grade_Number: 0,
        wp_Slot_grade_1: 0,
        wp_Slot_grade_2: 0,
        wp_Slot_grade_3: 0,
        wp_Special_attributes: false,
        wp_Weapon_skills: 0
      }
    ],
    sourceitems: false
  }),
  computed: {
    getfile () {
      return this.$store.getters.donefile
    },
    data () {
      return this.$store.getters.donefiledata
    },
    sourcedata () {
      return this.$store.getters.donefilesourcedata
    },
    weapon () {
      return this.$store.getters.donefilename
    },
    excludeunknown () {
      return this.$store.getters.doneexcludeunknown
    },
    filteritem () {
      let _items = this.items
      if (this.excludeunknown) {
        let itemsarr = []
        for (let i = 0, l = _items.length; i < l; i++) {
          if (_items[i].wp_Name !== '未知武器') {
            itemsarr.push(_items[i])
          }
        }
        return itemsarr
      } else {
        return _items
      }
    }
  },
  watch: {
    data: function () {
      this.items = this.hexdata(this.data)
    },
    sourcedata: function () {
      if (this.sourcedata) {
        this.sourceitems = this.hexdata(this.sourcedata)
        this.items = this.hexdata(this.data)
      } else {
        this.sourceitems = false
      }
    }
  },
  mounted () {
    if (this.sourcedata) {
      this.sourceitems = this.hexdata(this.sourcedata)
    }
    this.items = this.hexdata(this.data)
  },
  methods: {
    str_pad (hex) {
      var zero = '00000000'
      var tmp = 8 - hex.length
      return zero.substr(0, tmp) + hex
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
    attribute (attribute) {
      let attributetext = '无'
      switch (attribute) {
        case 0:
          attributetext = '无'
          break
        case 1:
          attributetext = '火'
          break
        case 2:
          attributetext = '水'
          break
        case 3:
          attributetext = '冰'
          break
        case 4:
          attributetext = '电'
          break
        case 5:
          attributetext = '龙'
          break
        case 6:
          attributetext = '毒'
          break
        case 7:
          attributetext = '麻'
          break
        case 8:
          attributetext = '眠'
          break
        default:
          attributetext = '爆'
      }
      return attributetext
    },
    hexdata (data, setsourcedata = false) {
      let _this = this
      let HexRuler
      let HexPointer
      if (data[7] === 0 && data[71] === 1 && data[136] === 2) {
        HexRuler = 16 * 4 + 1 // 近程武器
        HexPointer = {
          'wp_Number': [6, 1], // 6
          'wp_Money': [24, 4], // 21~24
          'wp_Rarity': [25, 1], // 25
          'wp_Chopping_value': [26, 1], // 26
          'wp_Chopping_grade': [27, 1], // 27
          'wp_Damage_value': [29, 2], // 28~29
          'wp_Defense_value': [31, 2], // 30~31
          'wp_Heart_value': [32, 1], // 32
          'wp_Visible_attributes': [33, 1], // 33
          'wp_Visible_attribute_values': [35, 2], // 34~35
          'wp_Hidden_attribute': [36, 1], // 36
          'wp_Hidden_attribute_values': [38, 2], // 37~38
          'wp_Slot_grade_Number': [40, 1], // 40
          'wp_Slot_grade_1': [41, 1], // 41
          'wp_Slot_grade_2': [42, 1], // 42
          'wp_Slot_grade_3': [43, 1], // 43
          'wp_Special_attributes': [44, 1], // 44
          'wp_Weapon_skills': [(HexRuler + 2), 1] // HexRuler(下一行) + 2
        }
      } else {
        HexRuler = 16 * 4 + 4 // 远程武器
        HexPointer = {
          'wp_Number': [6, 1], // 6
          'wp_Money': [28, 4], // 25~28
          'wp_Rarity': [29, 1], // 29
          'wp_Damage_value': [31, 2], // 30~31
          'wp_Defense_value': [33, 2], // 32~33
          'wp_Heart_value': [34, 1], // 34
          'wp_Cartridge_matching': [42, 1], // 42
          'wp_Offset_size': [44, 1], // 44
          'wp_Slot_grade_Number': [45, 1], // 45
          'wp_Slot_grade_1': [46, 1], // 46
          'wp_Slot_grade_2': [47, 1], // 47
          'wp_Slot_grade_3': [48, 1], // 48
          'wp_Weapon_skills': [(HexRuler + 2), 1] // HexRuler(下一行) + 2
        }
      }
      let wplist = []
      let HexFunction = function (data, Hexpointer, HexRuler, i) {
        let ret = ''
        if (Hexpointer === undefined) {
          return false
        }
        for (let p = 0; p < Hexpointer[1]; p++) {
          let Hex16 = data[(HexRuler * i) + Hexpointer[0] - p]
          if (Hex16 !== undefined) {
            ret += Hex16.toString(16)
          } else {
            ret = 0
          }
        }
        return parseInt(ret, 16)
      }
      let wpname = function (id) {
        let wpnamelist = require('./Weaponinfo/' + _this.weapon + '.json')
        let namedata = wpnamelist.Data
        for (let i = 0; i < namedata.length; i++) {
          if (namedata[i].Weapon_Number === id) {
            return namedata[i].name
          }
        }
        return '未知武器'
      }
      for (let l = data.length / HexRuler, i = 0; i < l; i++) {
        wplist[i] = {
          'wp_Hex': (HexRuler * i).toString(16),
          'wp_Name': wpname(HexFunction(data, HexPointer.wp_Number, HexRuler, i)),
          'wp_Number': HexFunction(data, HexPointer.wp_Number, HexRuler, i),
          'wp_Money': HexFunction(data, HexPointer.wp_Money, HexRuler, i),
          'wp_Rarity': HexFunction(data, HexPointer.wp_Rarity, HexRuler, i),
          'wp_Chopping_value': HexFunction(data, HexPointer.wp_Chopping_value, HexRuler, i),
          'wp_Chopping_grade': HexFunction(data, HexPointer.wp_Chopping_grade, HexRuler, i),
          'wp_Damage_value': _this.weapon_damage(_this.weapon) * HexFunction(data, HexPointer.wp_Damage_value, HexRuler, i),
          'wp_Defense_value': HexFunction(data, HexPointer.wp_Defense_value, HexRuler, i),
          'wp_Heart_value': HexFunction(data, HexPointer.wp_Heart_value, HexRuler, i),
          'wp_Visible_attributes': HexFunction(data, HexPointer.wp_Visible_attributes, HexRuler, i),
          'wp_Visible_attribute_values': HexFunction(data, HexPointer.wp_Visible_attribute_values, HexRuler, i),
          'wp_Hidden_attribute': HexFunction(data, HexPointer.wp_Hidden_attribute, HexRuler, i),
          'wp_Hidden_attribute_values': HexFunction(data, HexPointer.wp_Hidden_attribute_values, HexRuler, i),
          'wp_Cartridge_matching': HexFunction(data, HexPointer.wp_Cartridge_matching, HexRuler, i),
          'wp_Offset_size': HexFunction(data, HexPointer.wp_Offset_size, HexRuler, i),
          'wp_Slot_grade_Number': HexFunction(data, HexPointer.wp_Slot_grade_Number, HexRuler, i),
          'wp_Slot_grade_1': HexFunction(data, HexPointer.wp_Slot_grade_1, HexRuler, i),
          'wp_Slot_grade_2': HexFunction(data, HexPointer.wp_Slot_grade_2, HexRuler, i),
          'wp_Slot_grade_3': HexFunction(data, HexPointer.wp_Slot_grade_3, HexRuler, i),
          'wp_Special_attributes': HexFunction(data, HexPointer.wp_Special_attributes, HexRuler, i),
          'wp_Weapon_skills': HexFunction(data, HexPointer.wp_Weapon_skills, HexRuler, i)
        }
        if (this.sourceitems) {
          wplist[i].wp_sourcedata = this.sourceitems[i]
        }
      }
      return wplist
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 0px 0px;
  width: 100vw;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 100%;
}
</style>
