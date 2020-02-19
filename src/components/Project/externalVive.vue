<template>
  <v-container>
  <v-row>
      <v-col v-for="item in datalist" :key="item.hexdata" :cols="item.col.default" :sm="item.col.sm" :md="item.col.md">
        <v-text-field
          v-if="item.type == 'input'"
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
          return-object
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
  import hexHandler from '../../plugins/edit/hexHandler'

  export default {
    data: () => ({
    }),
    props: ['hexdata', 'sourcedata'],
    computed: {
      weapon () {
        return this.$store.getters.donefilename
      },
      config () {
        return this.$store.getters.doneconfig
      },
      datalist () {
        let _this = this
        let config = this.config.filter(item=>item.type === _this.weapon.substring(_this.weapon.lastIndexOf('.') + 1, _this.weapon.length))[0]
        let resources = config.resources
        let view = config.view.map(item => {
          let ret = {
            type: 'input',
            col: {
              default: 12,
              sm: 6,
              md: 4
            },
            label: this.$t('WeaponExplain.Unknown'),
            hexdata: item.hexdata,
            readonly: true,
            suffix: '',
            change: null,
            sourcedata: false,
          }
          if (_this.isEmptyObjec(item.change)) {
            ret.change = _this[item.change]
          } else if (item.change === null) {
            ret.change = _this.input_interchangeable
          }
          if(_this.isEmptyObjec(item.items)) {
            ret.items = resources[item.items]
          }
          if (_this.isEmptyObjec(item.type) && (item.type == 'input' || item.type == 'select')) {
            ret.type = item.type
          }
          if (_this.isEmptyObjec(item.col)) {
            ret.col = item.col
          }
          if (_this.isEmptyObjec(item.label)) {
            ret.label = item.label
          }
          if (_this.isEmptyObjec(item.readonly)) {
            ret.readonly = item.readonly
          }
          if (_this.isEmptyObjec(item.suffix)) {
            ret.suffix = item.suffix
          }
          if (_this.isEmptyObjec(item.sourcedata)) {
            ret.sourcedata = item.sourcedata
          }
          if (!item.hexdata) {
            ret.type = 'input'
            ret.hexdata = _this.$t('WeaponExplain.Error')
          }
          return ret
        })
        return view
      },
    },
    methods: {
      str_pad (hex, digits = 8) {
        var zero = new Array(digits + 1).join('0')
        var tmp = digits - hex.length
        return zero.substr(0, tmp) + hex.toLocaleUpperCase()
      },
      isEmptyObjec (obj) {
        for (let _ in obj) {
          return true
        }
        if (obj === false) {
          return true
        }
        return false
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
      Affinity_transform (val) {
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
      input_interchangeable_Float (val) {
        let valsave
        if (val.vul === '') {
          val.vul = 0
        }
        valsave = val
        valsave.vul = hexHandler.SingleToHex(valsave.vul)
        this.save(valsave, true)
        valsave.vul = hexHandler.HexToSingle(valsave.vul)
      }
    }
  }
</script>
