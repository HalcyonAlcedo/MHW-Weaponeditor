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
          @change="item.change(hexdata[item.hexdata])"
          item-text="text"
          item-value="value"
          :readonly="item.readonly"
          :suffix="item.suffix"
          :return-object="item.object"
        ></v-select>
        <v-text-field
          v-if="item.sourcedata && sourcedata && (item.hexdata !== item.hexsourcedata)"
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
            note: 'ri_Number',
            type: 'text',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('Insect.Number'),
            hexdata: 'ri_Number',
            readonly: true,
            suffix: '',
            change: null,
            sourcedata: false,
          },
          {
            note: 'ri_type',
            type: 'select',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('Insect.Type'),
            hexdata: 'ri_type',
            readonly: false,
            suffix: '',
            change: this.Select_interchangeable,
            sourcedata: true,
            object: true,
            items: this.attacktypeitem
          },
          {
            note: 'ri_craftCost',
            type: 'text',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('Insect.Craft_costs'),
            hexdata: 'ri_craftCost',
            readonly: false,
            suffix: '',
            change: this.input_interchangeable,
            sourcedata: true,
          },
          {
            note: 'ri_power',
            type: 'text',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('Insect.Power'),
            hexdata: 'ri_power',
            readonly: false,
            suffix: '',
            change: this.input_interchangeable,
            sourcedata: true,
          },
          {
            note: 'ri_speed',
            type: 'text',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('Insect.Speed'),
            hexdata: 'ri_speed',
            readonly: false,
            suffix: '',
            change: this.input_interchangeable,
            sourcedata: true,
          },
          {
            note: 'ri_heal',
            type: 'text',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('Insect.Heal'),
            hexdata: 'ri_heal',
            readonly: false,
            suffix: '',
            change: this.input_interchangeable,
            sourcedata: true,
          },
          {
            note: 'ri_dustEffect',
            type: 'select',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('Insect.Dust'),
            hexdata: 'ri_dustEffect',
            readonly: false,
            suffix: '',
            change: this.Select_interchangeable,
            sourcedata: true,
            object: true,
            items: this.dustEffectitem
          },
          {
            note: 'Element',
            type: 'text',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('Insect.Unknown'),
            hexdata: 'Element',
            readonly: false,
            suffix: '',
            change: this.input_interchangeable,
            sourcedata: true,
          },
          {
            note: 'Rarity',
            type: 'text',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('Insect.Unknown'),
            hexdata: 'Rarity',
            readonly: false,
            suffix: '',
            change: this.input_interchangeable,
            sourcedata: true,
          },
          {
            note: 'TreePositionId',
            type: 'text',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('Insect.Unknown'),
            hexdata: 'TreePositionId',
            readonly: false,
            suffix: '',
            change: this.input_interchangeable,
            sourcedata: true,
          },
          {
            note: 'BaseModelId',
            type: 'text',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('Insect.Unknown'),
            hexdata: 'BaseModelId',
            readonly: false,
            suffix: '',
            change: this.input_interchangeable,
            sourcedata: true,
          },
          {
            note: 'TreeId',
            type: 'text',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('Insect.Unknown'),
            hexdata: 'TreeId',
            readonly: false,
            suffix: '',
            change: this.input_interchangeable,
            sourcedata: true,
          },
          {
            note: 'TreePos',
            type: 'text',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('Insect.Unknown'),
            hexdata: 'TreePos',
            readonly: false,
            suffix: '',
            change: this.input_interchangeable,
            sourcedata: true,
          },
          {
            note: 'EquipId',
            type: 'text',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('Insect.Unknown'),
            hexdata: 'EquipId',
            readonly: false,
            suffix: '',
            change: this.input_interchangeable,
            sourcedata: true,
          },
        ]
      },
      attacktypeitem () {
        return [
          {value: 0, text: this.$t('WeaponExplain.Cut')},
          {value: 1, text: this.$t('WeaponExplain.Strike')},
        ]
      },
      dustEffectitem () {
        return [
          {value: 0, text: this.$t('Insect.DustEffect_0')},
          {value: 1, text: this.$t('Insect.DustEffect_1')},
          {value: 2, text: this.$t('Insect.DustEffect_2')},
          {value: 3, text: this.$t('Insect.DustEffect_3')},
        ]
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
    }
  }
</script>
