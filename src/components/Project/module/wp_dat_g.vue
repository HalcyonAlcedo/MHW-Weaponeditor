<template>
  <v-container>
  <v-row>
      <v-col v-for="item in datalist" :key="item.note" :cols="item.col.default" :sm="item.col.sm" :md="item.col.md">
        <v-text-field
          v-if="item.type == 'text'"
          :label="item.label"
          v-model="hexdata[item.hexdata].vul"
          :readonly="item.readonly"
          :suffix="item.suffix"
          @change="item.change(hexdata[item.hexdata])"
        ></v-text-field>
        <v-select
          v-if="item.type == 'select'"
          :label="item.label"
          v-model="hexdata[item.hexdata].vul"
          :items="item.items"
          @change="item.change(hexdata[item.hexdata].vul)"
          item-text="text"
          item-value="value"
          :readonly="item.readonly"
          :suffix="item.suffix"
          :return-object="item.object"
        ></v-select>
        <v-autocomplete
          v-if="item.type == 'autocomplete'"
          :label="item.label"
           v-model="hexdata[item.hexdata].vul"
          :items="item.items"
          @change="item.change(hexdata[item.hexdata].vul)"
          item-text="text"
          persistent-hint
          :readonly="item.readonly"
          :suffix="item.suffix"
          :no-data-text="$t('Interface.No_data')"
        >
        </v-autocomplete>
        <v-text-field
          v-if="item.sourcedata && sourcedata && (hexdata[item.hexdata].vul !== hexdata.wp_sourcedata[item.hexdata].vul)"
          :label="$t('Interface.Original') + ' ' + $t(item.label)"
          v-model="hexdata.wp_sourcedata[item.hexdata].vul"
          prepend-icon="mdi-transfer-left"
          readonly
        ></v-text-field>
      </v-col>
  </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
    }),
    props: ['hexdata', 'sourcedata'],
    computed: {
      datalist () {
        return [
          {
            note: '武器id',
            type: 'text',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('WeaponExplain.Sequence_number'),
            hexdata: 'wp_Number',
            readonly: true,
            suffix: '',
            change: null,
            sourcedata: false,
          },
          {
            note: '制造费用',
            type: 'text',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('WeaponExplain.Manufacturing_costs'),
            hexdata: 'wp_Money',
            readonly: false,
            suffix: '',
            change: this.input_interchangeable,
            sourcedata: true,
          },
          {
            note: '稀有度',
            type: 'select',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('WeaponExplain.Production_expenses'),
            hexdata: 'wp_Rarity',
            readonly: false,
            suffix: '',
            change: this.input_interchangeable,
            sourcedata: true,
            object: true,
            items: this.rankitem
          },
          {
            note: '伤害',
            type: 'text',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('WeaponExplain.Damage'),
            hexdata: 'wp_Damage_value',
            readonly: false,
            suffix: '',
            change: this.Damage_treatment,
            sourcedata: true,
          },
          {
            note: '防御',
            type: 'text',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('WeaponExplain.Defense'),
            hexdata: 'wp_Defense_value',
            readonly: false,
            suffix: '',
            change: this.Defense_treatment,
            sourcedata: true,
          },
          {
            note: '会心',
            type: 'text',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('WeaponExplain.Heart'),
            hexdata: 'wp_Heart_value',
            readonly: false,
            suffix: '%',
            change: this.Heart_treatment,
            sourcedata: true,
          },
          {
            note: '可见属性',
            type: 'select',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('WeaponExplain.Visible_attributes'),
            hexdata: 'wp_Visible_attributes',
            readonly: false,
            suffix: '',
            change: this.Select_interchangeable,
            sourcedata: true,
            object: true,
            items: this.attributeitem
          },
          {
            note: '可见属性值',
            type: 'text',
            col: {
              default: 12,
              sm: 6,
              md: 6
            },
            label: this.$t('WeaponExplain.Visible_attribute_values'),
            hexdata: 'wp_Visible_attribute_values',
            readonly: false,
            suffix: '',
            change: this.Attribute_treatment,
            sourcedata: true,
          },
          {
            note: '隐藏属性',
            type: 'select',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('WeaponExplain.Hidden_attributes'),
            hexdata: 'wp_Hidden_attribute',
            readonly: false,
            suffix: '',
            change: this.Select_interchangeable,
            sourcedata: true,
            object: true,
            items: this.attributeitem
          },
          {
            note: '隐藏属性值',
            type: 'text',
            col: {
              default: 12,
              sm: 6,
              md: 6
            },
            label: this.$t('WeaponExplain.Hidden_attribute_values'),
            hexdata: 'wp_Hidden_attribute_values',
            readonly: false,
            suffix: '',
            change: this.Attribute_treatment,
            sourcedata: true,
          },
          {
            note: '弹种匹配',
            type: 'text',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('WeaponExplain.Match_projectile'),
            hexdata: 'wp_Cartridge_matching',
            readonly: false,
            suffix: '',
            change: this.input_interchangeable,
            sourcedata: true,
          },
          {
            note: '偏移',
            type: 'text',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('WeaponExplain.Ballistic_offset'),
            hexdata: 'wp_Offset_size',
            readonly: false,
            suffix: '',
            change: this.input_interchangeable,
            sourcedata: true,
          },
          {
            note: '封龙力',
            type: 'select',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('WeaponExplain.Seal_Dragon'),
            hexdata: 'wp_Seal_Dragon',
            readonly: false,
            suffix: '',
            change: this.Select_interchangeable,
            sourcedata: true,
            object: true,
            items: this.generalsizeitem
          },
          {
            note: '特殊弹种',
            type: 'select',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('WeaponExplain.Specialprojectile'),
            hexdata: 'wp_Special_projectile',
            readonly: false,
            suffix: '',
            change: this.Select_interchangeable,
            sourcedata: true,
            object: true,
            items: this.specialprojectileitem
          },
          {
            note: '技能',
            type: 'autocomplete',
            col: {
              default: 12,
              sm: 6,
              md: 6
            },
            label: this.$t('WeaponExplain.Weapon_skills'),
            hexdata: 'wp_Weapon_skills',
            readonly: false,
            suffix: '',
            change: this.input_interchangeable,
            sourcedata: true,
            items: this.skillitem
          },
          {
            note: '孔槽数',
            type: 'select',
            col: {
              default: 12,
              sm: 3,
              md: 3
            },
            label: this.$t('WeaponExplain.Slot_grade_Number'),
            hexdata: 'wp_Slot_grade_Number',
            readonly: false,
            suffix: '',
            change: this.Select_interchangeable,
            sourcedata: true,
            object: true,
            items: this.grooveitem
          },
          {
            note: '1孔槽',
            type: 'select',
            col: {
              default: 12,
              sm: 3,
              md: 3
            },
            label: this.$t('WeaponExplain.Slot_grade_Number1'),
            hexdata: 'wp_Slot_grade_1',
            readonly: false,
            suffix: '',
            change: this.Select_interchangeable,
            sourcedata: true,
            object: true,
            items: this.gradeitem
          },
          {
            note: '2孔槽',
            type: 'select',
            col: {
              default: 12,
              sm: 3,
              md: 3
            },
            label: this.$t('WeaponExplain.Slot_grade_Number2'),
            hexdata: 'wp_Slot_grade_2',
            readonly: false,
            suffix: '',
            change: this.Select_interchangeable,
            sourcedata: true,
            object: true,
            items: this.gradeitem
          },
          {
            note: '3孔槽',
            type: 'select',
            col: {
              default: 12,
              sm: 3,
              md: 3
            },
            label: this.$t('WeaponExplain.Slot_grade_Number3'),
            hexdata: 'wp_Slot_grade_3',
            readonly: false,
            suffix: '',
            change: this.Select_interchangeable,
            sourcedata: true,
            object: true,
            items: this.gradeitem
          },
        ]
      },
      weapon () {
        return this.$store.getters.donefilename
      },
      rankitem () {
        return [
          {value: 0, text: 'Rank1'},
          {value: 1, text: 'Rank2'},
          {value: 2, text: 'Rank3'},
          {value: 3, text: 'Rank4'},
          {value: 4, text: 'Rank5'},
          {value: 5, text: 'Rank6'},
          {value: 6, text: 'Rank7'},
          {value: 7, text: 'Rank8'},
          {value: 8, text: 'Rank9'},
          {value: 9, text: 'Rank10'},
          {value: 10, text: 'Rank11'},
          {value: 11, text: 'Rank12'},
        ]
      },
      attributeitem () {
        return [
          {value: 0, text: this.$t('WeaponExplain.Nothing')},
          {value: 1, text: this.$t('WeaponExplain.Fire')},
          {value: 2, text: this.$t('WeaponExplain.Water')},
          {value: 3, text: this.$t('WeaponExplain.Ice')},
          {value: 4, text: this.$t('WeaponExplain.Electricity')},
          {value: 5, text: this.$t('WeaponExplain.Dragon')},
          {value: 6, text: this.$t('WeaponExplain.Poison')},
          {value: 7, text: this.$t('WeaponExplain.Hemp')},
          {value: 8, text: this.$t('WeaponExplain.Sleep')},
          {value: 9, text: this.$t('WeaponExplain.Burst')}
        ]
      },
      generalsizeitem () {
        return [
          {value: 0, text: this.$t('WeaponExplain.Nothing')},
          {value: 1, text: this.$t('WeaponExplain.Small')},
          {value: 2, text: this.$t('WeaponExplain.Inside')},
          {value: 3, text: this.$t('WeaponExplain.Big')},
          {value: 4, text: this.$t('WeaponExplain.Verybig')}
        ]
      },
      grooveitem () {
        return [
          {value: 0, text: this.$t('WeaponExplain.NoGroove')},
          {value: 1, text: this.$t('WeaponExplain.OneGroove')},
          {value: 2, text: this.$t('WeaponExplain.TwoGroove')},
          {value: 3, text: this.$t('WeaponExplain.ThreeGroove')}
        ]
      },
      gradeitem () {
        return [
          {value: 0, text: this.$t('WeaponExplain.NoGroove')},
          {value: 1, text: this.$t('WeaponExplain.OneGroovel')},
          {value: 2, text: this.$t('WeaponExplain.TwoGroovel')},
          {value: 3, text: this.$t('WeaponExplain.ThreeGroovel')},
          {value: 4, text: this.$t('WeaponExplain.FourGroovel')}
        ]
      },
      specialprojectileitem () {
        if (this.weapon === 'lbg.wp_dat_g') {
          return [
            {value: 0, text: this.$t('WeaponExplain.Setbomb')}
          ]
        } else if (this.weapon === 'hbg.wp_dat_g') {
          return [
            {value: 1, text: this.$t('WeaponExplain.Gatling')},
            {value: 2, text: this.$t('WeaponExplain.Snipe')}
          ]
        } else {
          return [
            {value: 0, text: this.$t('WeaponExplain.Nothing')}
          ]
        }
      },
      skillitem () {
        let skill = []
        for (let i = 0; i < 214; i++) {
          if (this.$te('Skill.' + i)) {
            skill.push(
              {
                text: this.$t('Skill.' + i),
                value: i
              }
            )
          }
        }
        return skill
      },
    },
    methods: {
      str_pad (hex, digits = 8) {
        var zero = new Array(digits + 1).join('0')
        var tmp = digits - hex.length
        return zero.substr(0, tmp) + hex.toLocaleUpperCase()
      },
      save (val) {
        if (val.vul.length === 0) {
          val.vul = 0
        }
        let data = this.str_pad(Number(val.vul).toString(16), Math.ceil(Number(val.vul).toString(16).length / 2) * 2)
        for (let i = 0; i < val.hexL; i++) {
          let setvul
          if (val.hexL - i <= (data.length / 2)) {
            setvul = parseInt(data.substr(-2 - (val.hexL - (i * 2)), 2), 16)
          } else {
            setvul = '00'
          }
          this.$store.dispatch('editdata', {
            address: val.hex - i,
            value: setvul
          })
        }
      },
      input_interchangeable (val) {
        let valsave
        if (val.vul === '') {
          val.vul = 0
        }
        valsave = val
        this.save(valsave)
      },
      Select_interchangeable (val) {
        let valsave
        if (val.vul === '') {
          val.vul = 0
        }
        valsave = val
        valsave.vul = valsave.vul.value
        this.save(valsave)
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
      Defense_treatment (val) {
        let valsave
        if (val.vul === '') {
          val.vul = 0
        }
        valsave = val
        valsave.vul = Math.ceil(valsave.vul)
        this.save(valsave)
      },
      Heart_treatment (val) {
        let valsave
        if (val.vul === '') {
          val.vul = 0
        }
        valsave = val
        if (Math.abs(Number(valsave.vul)) > 100) {
          valsave.vul = Number(valsave.vul) >= 0 ? 100 : -100
        }
        valsave.vul = Number(valsave.vul) >= 0 ? Number(valsave.vul) : 256 - Math.abs(Number(valsave.vul))
        this.save(valsave)
        valsave.vul = this.wpheart(valsave).vul // 回显有问题，好像还原处理就好了，不影响save时数据，不知道啥原因喵″
      },
      Attribute_treatment (val) {
        let valsave
        if (val.vul === '') {
          val.vul = 0
        }
        valsave = val
        valsave.vul = Math.ceil(val.vul / 10)
        this.save(valsave)
        valsave.vul = Math.ceil(val.vul * 10) // 同上喵″
      },
      Damage_treatment (val) {
        let valsave
        if (val.vul === '') {
          val.vul = 0
        }
        valsave = val
        valsave.vul = Math.ceil(val.vul / this.weapon_damage(this.weapon))
        this.save(valsave)
        valsave.vul = Math.ceil(val.vul * this.weapon_damage(this.weapon)) // 同上喵″
      },
    }
  }
</script>
