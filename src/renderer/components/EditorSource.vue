<template>
  <div id="wrapper">
    <main>
      <v-app id="inspire">
        <v-container fluid grid-list-md>
          <v-data-iterator
            :items="items"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
            content-tag="v-layout"
            row
            wrap
          >
            <v-flex
              slot="item"
              slot-scope="props"
            >
            <v-edit-dialog
              :return-value.sync="props.item.wp_Hex"
              large
              lazy
              persistent
              @save="save(props.item.wp_address, props.item.wp_Hex)"
            >
              <v-tooltip bottom>
                <v-card slot="activator" height="50" width="50" :color="props.item.wp_Colour">
                  <v-card-text class="text-xs-center">
                      {{ str_pad(props.item.wp_Hex, 2) }}
                  </v-card-text>
                </v-card>
                <span>描述：{{ props.item.wp_Describe }}</span>
                <span>地址：{{ str_pad(props.item.wp_address.toString(16)).toLocaleUpperCase() }}</span>
              </v-tooltip>
              <div slot="input" class="mt-3 title">修改数据</div>
              <v-text-field
                slot="input"
                v-model="props.item.wp_Hex"
                :rules="[hexrules]"
                label="Edit"
                single-line
                counter
                autofocus
              ></v-text-field>
            </v-edit-dialog>
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
    rowsPerPageItems: [100, 300, 500],
    pagination: {
      rowsPerPage: 100
    },
    items: [
      {
        wp_Hex: 0,
        wp_Describe: '未知',
        wp_address: '',
        wp_Colour: ''
      }
    ],
    hexrules: (v) => /^[0-9a-fA-F]{1,2}$/.test(v)
  }),
  computed: {
    getfile () {
      return this.$store.getters.donefile
    },
    weapon () {
      return this.$store.getters.donefilename
    },
    data () {
      return this.$store.getters.donefiledata
    }
  },
  watch: {
    data: function () {
      this.hexdata(this.data)
    }
  },
  methods: {
    str_pad (hex, digits = 8) {
      var zero = new Array(digits + 1).join('0')
      var tmp = digits - hex.length
      return zero.substr(0, tmp) + hex.toLocaleUpperCase()
    },
    save (address, data) {
      if (/^[0-9a-fA-F]{1,2}$/.test(data)) {
        this.$store.dispatch('editdata', {
          address: address,
          value: parseInt(data, 16)
        })
      }
    },
    hexdata (data) {
      let _this = this
      let HexRuler
      let HexPointer
      if (data[7] === 0 && data[71] === 1 && data[136] === 2) {
        HexRuler = 16 * 4 + 1 // 近程武器
        HexPointer = {
          'wp_Number': [6, 1], // 6
          'wp_Money': [21, 4], // 21~24
          'wp_Rarity': [25, 1], // 25
          'wp_Chopping_value': [26, 1], // 26
          'wp_Chopping_grade': [27, 1], // 27
          'wp_Damage_value': [28, 2], // 28~29
          'wp_Defense_value': [30, 2], // 30~31
          'wp_Heart_value': [32, 1], // 32
          'wp_Visible_attributes': [33, 1], // 33
          'wp_Visible_attribute_values': [34, 2], // 34~35
          'wp_Hidden_attribute': [36, 1], // 36
          'wp_Hidden_attribute_values': [37, 2], // 37~38
          'wp_Seal_Dragon': [39, 1], // 39
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
          'wp_Money': [25, 4], // 25~28
          'wp_Rarity': [29, 1], // 29
          'wp_Damage_value': [30, 2], // 30~31
          'wp_Defense_value': [32, 2], // 32~33
          'wp_Heart_value': [34, 1], // 34
          'wp_Visible_attributes': [35, 1], // 35
          'wp_Visible_attribute_values': [36, 2], // 36~37
          'wp_Hidden_attribute': [38, 1], // 38
          'wp_Hidden_attribute_values': [39, 2], // 39~40
          'wp_Seal_Dragon': [41, 1], // 41
          'wp_Cartridge_matching': [42, 1], // 42
          'wp_Offset_size': [44, 1], // 44
          'wp_Slot_grade_Number': [45, 1], // 45
          'wp_Slot_grade_1': [46, 1], // 46
          'wp_Slot_grade_2': [47, 1], // 47
          'wp_Slot_grade_3': [48, 1], // 48
          'wp_Weapon_skills': [(HexRuler + 2), 1] // HexRuler(下一行) + 2
        }
      }
      this.rowsPerPageItems = [HexRuler * 2, HexRuler * 4, HexRuler * 6]
      this.pagination.rowsPerPage = HexRuler * 4
      let wplist = []
      for (let l = data.length, i = 0; i < l; i++) {
        wplist[i] = {
          wp_Hex: data[i].toString(16).toLocaleUpperCase(),
          wp_Describe: '未知',
          wp_address: i,
          wp_Colour: ''
        }
      }
      for (let l = data.length / (HexRuler + HexPointer.wp_Number[0]), i = 0; i < l; i++) {
        for (let s = HexPointer.wp_Number[1], r = 0; r < s; r++) {
          wplist[(HexRuler * i) + HexPointer.wp_Number[0] + r].wp_Describe = '编码'
          wplist[(HexRuler * i) + HexPointer.wp_Number[0] + r].wp_Colour = 'blue'
        }
      }
      for (let l = data.length / (HexRuler + HexPointer.wp_Number[0]), i = 0; i < l; i++) {
        for (let s = HexPointer.wp_Money[1], r = 0; r < s; r++) {
          wplist[(HexRuler * i) + HexPointer.wp_Money[0] + r].wp_Describe = '金钱'
          wplist[(HexRuler * i) + HexPointer.wp_Money[0] + r].wp_Colour = 'amber'
        }
      }
      for (let l = data.length / (HexRuler + HexPointer.wp_Number[0]), i = 0; i < l; i++) {
        for (let s = HexPointer.wp_Rarity[1], r = 0; r < s; r++) {
          wplist[(HexRuler * i) + HexPointer.wp_Rarity[0] + r].wp_Describe = '稀有度'
          wplist[(HexRuler * i) + HexPointer.wp_Rarity[0] + r].wp_Colour = 'deep-purple'
        }
      }
      if (HexPointer.wp_Chopping_value !== undefined) {
        for (let l = data.length / (HexRuler + HexPointer.wp_Number[0]), i = 0; i < l; i++) {
          for (let s = HexPointer.wp_Chopping_value[1], r = 0; r < s; r++) {
            wplist[(HexRuler * i) + HexPointer.wp_Chopping_value[0] + r].wp_Describe = '斩味值'
            wplist[(HexRuler * i) + HexPointer.wp_Chopping_value[0] + r].wp_Colour = 'cyan'
          }
        }
      }
      if (HexPointer.wp_Chopping_grade !== undefined) {
        for (let l = data.length / (HexRuler + HexPointer.wp_Number[0]), i = 0; i < l; i++) {
          for (let s = HexPointer.wp_Chopping_grade[1], r = 0; r < s; r++) {
            wplist[(HexRuler * i) + HexPointer.wp_Chopping_grade[0] + r].wp_Describe = '斩味等级'
            wplist[(HexRuler * i) + HexPointer.wp_Chopping_grade[0] + r].wp_Colour = 'light-blue'
          }
        }
      }
      for (let l = data.length / (HexRuler + HexPointer.wp_Number[0]), i = 0; i < l; i++) {
        for (let s = HexPointer.wp_Damage_value[1], r = 0; r < s; r++) {
          wplist[(HexRuler * i) + HexPointer.wp_Damage_value[0] + r].wp_Describe = '伤害'
          wplist[(HexRuler * i) + HexPointer.wp_Damage_value[0] + r].wp_Colour = 'red'
        }
      }
      for (let l = data.length / (HexRuler + HexPointer.wp_Number[0]), i = 0; i < l; i++) {
        for (let s = HexPointer.wp_Defense_value[1], r = 0; r < s; r++) {
          wplist[(HexRuler * i) + HexPointer.wp_Defense_value[0] + r].wp_Describe = '防御'
          wplist[(HexRuler * i) + HexPointer.wp_Defense_value[0] + r].wp_Colour = 'green'
        }
      }
      for (let l = data.length / (HexRuler + HexPointer.wp_Number[0]), i = 0; i < l; i++) {
        for (let s = HexPointer.wp_Heart_value[1], r = 0; r < s; r++) {
          wplist[(HexRuler * i) + HexPointer.wp_Heart_value[0] + r].wp_Describe = '会心'
          wplist[(HexRuler * i) + HexPointer.wp_Heart_value[0] + r].wp_Colour = 'purple'
        }
      }
      for (let l = data.length / (HexRuler + HexPointer.wp_Number[0]), i = 0; i < l; i++) {
        for (let s = HexPointer.wp_Visible_attributes[1], r = 0; r < s; r++) {
          wplist[(HexRuler * i) + HexPointer.wp_Visible_attributes[0] + r].wp_Describe = '可见属性'
          wplist[(HexRuler * i) + HexPointer.wp_Visible_attributes[0] + r].wp_Colour = 'brown'
        }
      }
      for (let l = data.length / (HexRuler + HexPointer.wp_Number[0]), i = 0; i < l; i++) {
        for (let s = HexPointer.wp_Visible_attribute_values[1], r = 0; r < s; r++) {
          wplist[(HexRuler * i) + HexPointer.wp_Visible_attribute_values[0] + r].wp_Describe = '可见属性值'
          wplist[(HexRuler * i) + HexPointer.wp_Visible_attribute_values[0] + r].wp_Colour = 'brown darken-4'
        }
      }
      for (let l = data.length / (HexRuler + HexPointer.wp_Number[0]), i = 0; i < l; i++) {
        for (let s = HexPointer.wp_Hidden_attribute[1], r = 0; r < s; r++) {
          wplist[(HexRuler * i) + HexPointer.wp_Hidden_attribute[0] + r].wp_Describe = '隐藏属性'
          wplist[(HexRuler * i) + HexPointer.wp_Hidden_attribute[0] + r].wp_Colour = 'blue-grey'
        }
      }
      for (let l = data.length / (HexRuler + HexPointer.wp_Number[0]), i = 0; i < l; i++) {
        for (let s = HexPointer.wp_Hidden_attribute_values[1], r = 0; r < s; r++) {
          wplist[(HexRuler * i) + HexPointer.wp_Hidden_attribute_values[0] + r].wp_Describe = '隐藏属性值'
          wplist[(HexRuler * i) + HexPointer.wp_Hidden_attribute_values[0] + r].wp_Colour = 'blue-grey darken-4'
        }
      }
      if (HexPointer.wp_Cartridge_matching !== undefined) {
        for (let l = data.length / (HexRuler + HexPointer.wp_Number[0]), i = 0; i < l; i++) {
          for (let s = HexPointer.wp_Cartridge_matching[1], r = 0; r < s; r++) {
            wplist[(HexRuler * i) + HexPointer.wp_Cartridge_matching[0] + r].wp_Describe = '弹种匹配'
            wplist[(HexRuler * i) + HexPointer.wp_Cartridge_matching[0] + r].wp_Colour = 'grey'
          }
        }
      }
      if (HexPointer.wp_Offset_size !== undefined) {
        for (let l = data.length / (HexRuler + HexPointer.wp_Number[0]), i = 0; i < l; i++) {
          for (let s = HexPointer.wp_Offset_size[1], r = 0; r < s; r++) {
            wplist[(HexRuler * i) + HexPointer.wp_Offset_size[0] + r].wp_Describe = '偏移'
            wplist[(HexRuler * i) + HexPointer.wp_Offset_size[0] + r].wp_Colour = 'light-green'
          }
        }
      }
      for (let l = data.length / (HexRuler + HexPointer.wp_Number[0]), i = 0; i < l; i++) {
        for (let s = HexPointer.wp_Seal_Dragon[1], r = 0; r < s; r++) {
          wplist[(HexRuler * i) + HexPointer.wp_Seal_Dragon[0] + r].wp_Describe = '封龙力'
          wplist[(HexRuler * i) + HexPointer.wp_Seal_Dragon[0] + r].wp_Colour = 'deep-purple accent-1'
        }
      }
      for (let l = data.length / (HexRuler + HexPointer.wp_Number[0]), i = 0; i < l; i++) {
        for (let s = HexPointer.wp_Slot_grade_Number[1], r = 0; r < s; r++) {
          wplist[(HexRuler * i) + HexPointer.wp_Slot_grade_Number[0] + r].wp_Describe = '孔槽数'
          wplist[(HexRuler * i) + HexPointer.wp_Slot_grade_Number[0] + r].wp_Colour = 'teal'
        }
      }
      for (let l = data.length / (HexRuler + HexPointer.wp_Number[0]), i = 0; i < l; i++) {
        for (let s = HexPointer.wp_Slot_grade_1[1], r = 0; r < s; r++) {
          wplist[(HexRuler * i) + HexPointer.wp_Slot_grade_1[0] + r].wp_Describe = '孔槽1等级'
          wplist[(HexRuler * i) + HexPointer.wp_Slot_grade_1[0] + r].wp_Colour = 'indigo'
        }
      }
      for (let l = data.length / (HexRuler + HexPointer.wp_Number[0]), i = 0; i < l; i++) {
        for (let s = HexPointer.wp_Slot_grade_2[1], r = 0; r < s; r++) {
          wplist[(HexRuler * i) + HexPointer.wp_Slot_grade_2[0] + r].wp_Describe = '孔槽2等级'
          wplist[(HexRuler * i) + HexPointer.wp_Slot_grade_2[0] + r].wp_Colour = 'indigo'
        }
      }
      for (let l = data.length / (HexRuler + HexPointer.wp_Number[0]), i = 0; i < l; i++) {
        for (let s = HexPointer.wp_Slot_grade_3[1], r = 0; r < s; r++) {
          wplist[(HexRuler * i) + HexPointer.wp_Slot_grade_3[0] + r].wp_Describe = '孔槽3等级'
          wplist[(HexRuler * i) + HexPointer.wp_Slot_grade_3[0] + r].wp_Colour = 'indigo'
        }
      }
      if (HexPointer.wp_Special_attributes !== undefined) {
        for (let l = data.length / (HexRuler + HexPointer.wp_Number[0]), i = 0; i < l; i++) {
          for (let s = HexPointer.wp_Special_attributes[1], r = 0; r < s; r++) {
            wplist[(HexRuler * i) + HexPointer.wp_Special_attributes[0] + r].wp_Describe = '特殊属性'
            wplist[(HexRuler * i) + HexPointer.wp_Special_attributes[0] + r].wp_Colour = 'lime'
          }
        }
      }
      if (HexPointer.wp_Weapon_skills !== undefined) {
        for (let l = data.length / (HexRuler + HexPointer.wp_Number[0]), i = 0; i < l; i++) {
          for (let s = HexPointer.wp_Weapon_skills[1], r = 0; r < s; r++) {
            wplist[(HexRuler * i) + HexPointer.wp_Weapon_skills[0] + r].wp_Describe = '特殊技能'
            wplist[(HexRuler * i) + HexPointer.wp_Weapon_skills[0] + r].wp_Colour = 'orange'
          }
        }
      }
      _this.items = wplist
    }
  },
  mounted () {
    this.hexdata(this.data)
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
