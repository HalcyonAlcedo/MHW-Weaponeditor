
<template>
  <v-container>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :no-data-text="$t('Interface.No_data')"
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.wp_address"
            cols="auto"
          >
            <v-edit-dialog
              :return-value.sync="item.wp_Hex"
              large
              persistent
              @save="save(item.wp_address, item.wp_Hex)"
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-card
                      elevation="1"
                      height="40"
                      width="40"
                      v-on="on"
                      :color="item.wp_Colour"
                  >
                      <v-row
                      class="fill-height"
                      align="center"
                      justify="center"
                      v-text="str_pad(item.wp_Hex, 2)"
                      ></v-row>
                  </v-card>
                </template>
                <span>{{$t("WeaponExplain.Describe")}}：{{ item.wp_Describe }}</span>
                <v-divider
                  class="mx-4"
                  vertical
                ></v-divider>
                <span>{{$t("WeaponExplain.Address")}}：{{ str_pad(item.wp_address.toString(16)).toLocaleUpperCase() }}</span>
              </v-tooltip>
              <template v-slot:input>
                <div slot="input" class="mt-3 title">{{$t("WeaponExplain.Edit_data")}}</div>
              </template>
              <template v-slot:input>
                  <v-text-field
                  slot="input"
                  v-model="item.wp_Hex"
                  :rules="[hexrules]"
                  label="Edit"
                  single-line
                  counter
                  autofocus
                  ></v-text-field>
              </template>
            </v-edit-dialog>
          </v-col>
        </v-row>
      </template>

    </v-data-iterator>
    <v-snackbar
      v-model="hexerr"
      bottom
      color="cyan darken-2"
      left
      multi-line
      :timeout="6000"
    >
      二进制编辑暂不支持<v-chip>弓瓶</v-chip><v-chip>弩弹</v-chip><v-chip>装备</v-chip>的智能地址分析功能，编辑时请谨慎修改。
    </v-snackbar>
  </v-container>
</template>

<script>
import hexAddress from './Database/hexAddress'

export default {
  name: 'wpfile',
  data: () => ({
    rowsPerPageItems: [100, 300, 500],
    itemsPerPage: 100,
    items: [
      {
        wp_Hex: 0,
        wp_Describe: '未知',
        wp_address: '',
        wp_Colour: ''
      }
    ],
    hexerr: false,
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
      return zero.substr(0, tmp) + hex.toString().toLocaleUpperCase()
    },
    save (address, data) {
      if (/^[0-9a-fA-F]{1,2}$/.test(data)) {
        this.$store.dispatch('editdata', {
          address: address,
          value: parseInt(data, 16)
        })
      }
    },
    getwplistval (val) {
      switch (val) {
        // 武器
        case 'wp_Number':
          return {
            Describe: this.$t('WeaponExplain.Sequence_number'),
            Colour: 'blue'
          }
        case 'wp_Unprefixed_Model':
          return {
            Describe: this.$t('WeaponExplain.Independent_model'),
            Colour: 'green darken-4'
          }
        case 'wp_Model':
          return {
            Describe: this.$t('WeaponExplain.Weapon_model'),
            Colour: 'cyan darken-4'
          }
        case 'wp_Minor_Model':
          return {
            Describe: this.$t('WeaponExplain.Weapon_secondary_model'),
            Colour: 'lime darken-4'
          }
        case 'wp_Money':
          return {
            Describe: this.$t('WeaponExplain.Manufacturing_costs'),
            Colour: 'amber'
          }
        case 'wp_Rarity':
          return {
            Describe: this.$t('WeaponExplain.Production_expenses'),
            Colour: 'deep-purple'
          }
        case 'wp_Chopping_value':
          return {
            Describe: this.$t('WeaponExplain.Chopping_value'),
            Colour: 'cyan'
          }
        case 'wp_Chopping_grade':
          return {
            Describe: this.$t('WeaponExplain.Chopping_grade'),
            Colour: 'light-blue'
          }
        case 'wp_Damage_value':
          return {
            Describe: this.$t('WeaponExplain.Damage'),
            Colour: 'red'
          }
        case 'wp_Defense_value':
          return {
            Describe: this.$t('WeaponExplain.Defense'),
            Colour: 'green'
          }
        case 'wp_Heart_value':
          return {
            Describe: this.$t('WeaponExplain.Heart'),
            Colour: 'purple'
          }
        case 'wp_Visible_attributes':
          return {
            Describe: this.$t('WeaponExplain.Visible_attributes'),
            Colour: 'brown'
          }
        case 'wp_Visible_attribute_values':
          return {
            Describe: this.$t('WeaponExplain.Visible_attribute_values'),
            Colour: 'brown darken-4'
          }
        case 'wp_Hidden_attribute':
          return {
            Describe: this.$t('WeaponExplain.Hidden_attributes'),
            Colour: 'blue-grey'
          }
        case 'wp_Hidden_attribute_values':
          return {
            Describe: this.$t('WeaponExplain.Hidden_attribute_values'),
            Colour: 'blue-grey darken-4'
          }
        case 'wp_Cartridge_matching':
          return {
            Describe: this.$t('WeaponExplain.Match_projectile'),
            Colour: 'grey'
          }
        case 'wp_Offset_size':
          return {
            Describe: this.$t('WeaponExplain.Ballistic_offset'),
            Colour: 'light-green'
          }
        case 'wp_Seal_Dragon':
          return {
            Describe: this.$t('WeaponExplain.Seal_Dragon'),
            Colour: 'deep-purple accent-1'
          }
        case 'wp_Slot_grade_Number':
          return {
            Describe: this.$t('WeaponExplain.Slot_grade_Number'),
            Colour: 'teal'
          }
        case 'wp_Slot_grade_1':
          return {
            Describe: this.$t('WeaponExplain.Slot_grade_Number1'),
            Colour: 'indigo'
          }
        case 'wp_Slot_grade_2':
          return {
            Describe: this.$t('WeaponExplain.Slot_grade_Number2'),
            Colour: 'indigo'
          }
        case 'wp_Slot_grade_3':
          return {
            Describe: this.$t('WeaponExplain.Slot_grade_Number3'),
            Colour: 'indigo'
          }
        case 'wp_Special_attributes':
          return {
            Describe: this.$t('WeaponExplain.Special_attributes'),
            Colour: 'lime'
          }
        case 'wp_Special_projectile':
          return {
            Describe: this.$t('WeaponExplain.Specialprojectile'),
            Colour: 'deep-purple accent-1'
          }
        case 'wp_Weapon_skills':
          return {
            Describe: this.$t('WeaponExplain.Weapon_skills'),
            Colour: 'orange'
          }
        // 斩味
        case 'k_Number':
          return {
            Describe: this.$t('Sharpness.Number'),
            Colour: 'lime'
          }
        case 'k_Sharpness_red':
          return {
            Describe: this.$t('Sharpness.Red'),
            Colour: 'red'
          }
        case 'k_Sharpness_orange':
          return {
            Describe: this.$t('Sharpness.Orange'),
            Colour: 'orange'
          }
        case 'k_Sharpness_yellow':
          return {
            Describe: this.$t('Sharpness.Yellow'),
            Colour: 'yellow'
          }
        case 'k_Sharpness_green':
          return {
            Describe: this.$t('Sharpness.green'),
            Colour: 'green'
          }
        case 'k_Sharpness_blue':
          return {
            Describe: this.$t('Sharpness.blue'),
            Colour: 'blue'
          }
        case 'k_Sharpness_white':
          return {
            Describe: this.$t('Sharpness.white'),
            Colour: 'white'
          }
        case 'k_Sharpness_purple':
          return {
            Describe: this.$t('Sharpness.purple'),
            Colour: 'purple'
          }
        //双刀双属性
        case 'ws_Number':
          return {
            Describe: this.$t('Wswordattribute.Number'),
            Colour: 'lime'
          }
        case 'ws_First_attribute':
          return {
            Describe: this.$t('Wswordattribute.First_attribute'),
            Colour: 'yellow'
          }
        case 'ws_First_attribute_values':
          return {
            Describe: this.$t('Wswordattribute.First_attribute_values'),
            Colour: 'orange'
          }
        case 'ws_Second_attribute':
          return {
            Describe: this.$t('Wswordattribute.Second_attribute'),
            Colour: 'green'
          }
        case 'ws_Second_attribute_values':
          return {
            Describe: this.$t('Wswordattribute.Second_attribute_values'),
            Colour: 'light-green'
          }
        //斩瓶
        case 'sa_Number':
          return {
            Describe: this.$t('Saxebottle.Number'),
            Colour: 'lime'
          }
        case 'sa_Attribute':
          return {
            Describe: this.$t('Saxebottle.Bottle_type'),
            Colour: 'yellow'
          }
        case 'sa_Attribute_value':
          return {
            Describe: this.$t('Saxebottle.Attribute_values'),
            Colour: 'orange'
          }
        // 狩猎笛
        case 'ww_Number':
          return {
            Describe: this.$t('Syllable.Number'),
            Colour: 'lime'
          }
        case 'ww_Timbre1':
          return {
            Describe: this.$t('Syllable.Syllable1'),
            Colour: 'red'
          }
        case 'ww_Timbre2':
          return {
            Describe: this.$t('Syllable.Syllable2'),
            Colour: 'yellow'
          }
        case 'ww_Timbre3':
          return {
            Describe: this.$t('Syllable.Syllable3'),
            Colour: 'green'
          }
        // 铳枪
        case 'gl_Number':
          return {
            Describe: this.$t('Bombardment.Number'),
            Colour: 'lime'
          }
        case 'gl_bombard_type':
          return {
            Describe: this.$t('Bombardment.Bombard_type'),
            Colour: 'yellow'
          }
        case 'gl_bombard_level':
          return {
            Describe: this.$t('Bombardment.Bombard_level'),
            Colour: 'orange'
          }
        // 弓瓶
        case 'bt_Number':
          return {
            Describe: this.$t('Huntingbottle.Number'),
            Colour: 'lime'
          }
        case 'bt_chopping':
          return {
            Describe: this.$t('Huntingbottle.Bottle_type_1'),
            Colour: 'brown'
          }
        case 'bt_enhance':
          return {
            Describe: this.$t('Huntingbottle.Bottle_type_2'),
            Colour: 'red'
          }
        case 'bt_paralysis':
          return {
            Describe: this.$t('Huntingbottle.Bottle_type_3'),
            Colour: 'yellow'
          }
        case 'bt_poison':
          return {
            Describe: this.$t('Huntingbottle.Bottle_type_4'),
            Colour: 'deep-purple '
          }
        case 'bt_sleep':
          return {
            Describe: this.$t('Huntingbottle.Bottle_type_5'),
            Colour: 'blue lighten-4'
          }
        case 'bt_bomb':
          return {
            Describe: this.$t('Huntingbottle.Bottle_type_6'),
            Colour: 'orange'
          }
        default:
          return {
            Describe: this.$t('WeaponExplain.Unknown'),
            Colour: ''
          }
      }
    },
    hexdata (data) {
      let _this = this
      let gethexAddress = hexAddress(data)
      let HexRuler = gethexAddress.HexRuler
      let HexPointer = gethexAddress.HexPointer
      this.rowsPerPageItems = [HexRuler * 2, HexRuler * 4, HexRuler * 6]
      this.itemsPerPage = HexRuler * 4
      let wplist = []
      for (let l = data.length, i = 0; i < l; i++) {
        wplist[i] = {
          wp_Hex: data[i].toString(16).toLocaleUpperCase(),
          wp_Describe: this.$t('WeaponExplain.Unknown'),
          wp_address: i,
          wp_Colour: ''
        }
      }
      for (let Pointe in HexPointer) {
        let Pointeval = this.getwplistval(Pointe)
        let Pointelist = [
          'wp_Number',
          'k_Number',
          'ws_Number',
          'ri_Number',
          'sa_Number',
          'ww_Number',
          'gl_Number'
        ]
        let Pointenumber = ''
        for (let n = 0; n < Pointelist.length; n++) {
          if (Pointelist[n] in HexPointer) {
            Pointenumber = Pointelist[n]
          }
        }
        if (Pointenumber === '') {
          Pointelist = [
            'sh_Number',
            'bt_Number',
            'eq_Number',
          ]
          for (let n = 0; n < Pointelist.length; n++) {
            if (Pointelist[n] in HexPointer) {
              Pointenumber = Pointelist[n]
            }
          }
          HexRuler = 100
          this.hexerr = true
        }
        for (let l = data.length / (HexRuler + HexPointer[Pointenumber][0]), i = 0; i < l; i++) {
          for (let s = HexPointer[Pointe][1], r = 0; r < s; r++) {
            wplist[(HexRuler * i) + HexPointer[Pointe][0] - r].wp_Describe = Pointeval.Describe
            wplist[(HexRuler * i) + HexPointer[Pointe][0] - r].wp_Colour = Pointeval.Colour
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