<template>
  <v-container>
  <v-row>
      <v-col v-for="item in datalist" :key="item.hexdata" :cols="item.col.default" :sm="item.col.sm" :md="item.col.md" :hidden="item.type == null">
        <v-tooltip bottom :disabled="(hexdata[item.hexdata] && hexdata[item.hexdata].note) ? false : true">
          <template v-slot:activator="{ on }">
            <div v-on="on">
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
            <v-autocomplete
              v-if="item.type == 'search_select'"
              :label="item.label"
              v-model="hexdata[item.hexdata].vul"
              :items="item.items"
              @change="item.change(hexdata[item.hexdata])"
              item-text="text"
              item-value="value"
              :readonly="item.readonly"
              persistent-hint
              :no-data-text="$t('Interface.No_data')"
            >
            </v-autocomplete>
            <v-checkbox
              v-if="item.type == 'checkbox'"
              :label="item.label"
              v-model="hexdata[item.hexdata].vul"
              @change="item.change(hexdata[item.hexdata])"
              :readonly="item.readonly"
            ></v-checkbox>
            <v-text-field
              v-if="item.sourcedata && sourcedata && (item.hexdata !== item.hexsourcedata)"
              :label="$t('Interface.Original') + ' ' + $t(item.label)"
              v-model="hexdata.wp_sourcedata[item.hexdata].vul"
              prepend-icon="mdi-transfer-left"
              readonly
            ></v-text-field>
            </div>
          </template>
          <span>{{hexdata[item.hexdata] ? hexdata[item.hexdata].note : ''}}</span>
        </v-tooltip>

        
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
          if (this.hexdata[item.hexdata] == undefined) {
            ret.type = null
            return ret
          }
          if (_this.isEmptyObjec(item.change)) {
            ret.change = _this[item.change]
          } else if (item.change === null || item.change === undefined) {
            ret.change = _this.input_interchangeable
          }
          if(_this.isEmptyObjec(item.items)) {
            let tempItem = []
            if (!(resources[item.items] instanceof Array)) {
              for(let _item in resources[item.items]) {
                tempItem[_item] = {value: Number(_item), text: resources[item.items][_item]}
              }
            } else {
              tempItem = resources[item.items]
            }
            ret.items = tempItem
          }
          if (_this.isEmptyObjec(item.type) && (item.type == 'input' || item.type == 'select' || item.type == 'search_select' || item.type == 'checkbox')) {
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
        let vulHex = ''
        if (val.float) {
          vulHex = val.vul
        } else {
          vulHex = Number(val.vul).toString(16)
        }
        let tempdata = this.str_pad(vulHex, val.hexL * 2)
        let data = []
        for(let i = 0; i * 2 < tempdata.length; i++){
          data.push(tempdata.substr(i * 2, 2))
        }
        for (let i = 0; i < val.hexL; i++) {
          let setvul
          if (val.hexL - i <= data.length) {
            setvul = parseInt(data[i], 16)
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
        valsave.float = true
        this.save(valsave, true)
        valsave.vul = hexHandler.HexToSingle(valsave.vul)
      },
      check_interchangeable (val) {
        let valsave
        if (val.vul === '') {
          val.vul = 0
        }
        valsave = val
        valsave.vul = valsave.vul ? 1 : 0
        this.save(valsave, true)
      }
    }
  }
</script>
