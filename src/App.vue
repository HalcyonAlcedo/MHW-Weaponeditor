<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item @click.stop="left = !left">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t("Interface.New_file")}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="openfile()">
          <v-list-item-action>
            <v-icon>folder_open</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t("Interface.Open_file")}}</v-list-item-title>
          </v-list-item-content>
          <input ref="filElem" type="file" style="display:none" @change="getFile">
        </v-list-item>
        <v-list-item @click="savefile()">
          <v-list-item-action>
            <v-icon>save</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t("Interface.Save_file")}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="dialog = true">
          <v-list-item-action>
            <v-icon>info</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{$t("Interface.About")}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense>
        <v-subheader>{{$t("Interface.Setting")}}</v-subheader>
        <v-list-item @click="1">
          <v-list-item-action>
            <v-checkbox
              v-model="excludeunknown"
            ></v-checkbox>
          </v-list-item-action>
          <v-list-item-content @click.prevent="excludeunknown = !excludeunknown">
            <v-list-item-title>{{$t("Interface.Elimination_unknown_weapons")}}</v-list-item-title>
            <v-list-item-subtitle>{{$t("Explanatory.Elimination_unknown_weapons")}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item @click="1">
          <v-list-item-action>
            <v-checkbox
              v-model="sound"
            ></v-checkbox>
          </v-list-item-action>
          <v-list-item-content @click.prevent="sound = !sound">
            <v-list-item-title>{{$t("Interface.Raw_data_comparison")}}</v-list-item-title>
            <v-list-item-subtitle>{{$t("Explanatory.Raw_data_comparison")}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="1">
          <v-list-item-action>
            <v-checkbox
              v-model="Old_version"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content @click.prevent="Old_version = !Old_version">
            <v-list-item-title>{{$t("Interface.Old_version")}}</v-list-item-title>
            <v-list-item-subtitle>{{$t("Explanatory.Old_version")}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="1" v-if="Old_version">
          <v-btn
            :loading="update"
            :disabled="update"
            color="secondary"
            @click.native="versionupdate"
          >
            {{$t("Interface.Version_update")}}
          </v-btn>
          <v-list-item-subtitle>{{$t("Explanatory.Version_update")}}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        subheader
        three-line>
        <v-list-item @click="1">
        <v-select
          v-model="lang"
          :items="langlist"
          item-text="text"
          item-value="value"
          :label="$t('Interface.Lang')"
          return-object
        ></v-select>
        </v-list-item>
      </v-list>
      <!--
      <div class="flex-grow-1"></div>
      <v-divider></v-divider>
      <v-list-item href="https://mhwee.alcedo.top/download/MHW%20Equipment%20Editor.zip">
        <v-list-item-action>
          <v-icon>mdi-cloud-download-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{$t("Interface.Download")}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      -->
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="blue-grey"
      dark
      style="-webkit-app-region: drag"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" style="-webkit-app-region: no-drag"></v-app-bar-nav-icon>
      <v-toolbar-title>{{$t("Interface.Title")}} - {{file}}</v-toolbar-title>
      <div class="flex-grow-1"></div>

      <v-btn @click="ipc.send('hide-window')" icon style="-webkit-app-region: no-drag">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-btn @click="ipc.send('window-all-closed')" icon style="-webkit-app-region: no-drag">
        <v-icon>close</v-icon>
      </v-btn>

    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-navigation-drawer
      v-model="left"
      fixed
      temporary
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            新建
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list>
        <v-list-group
          v-for="(item, i) in newfile"
          :key="i"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </template>

          <v-list-item
            v-for="subItem in item.items"
            :key="subItem.title"
            @click="openfile(subItem.file),left = false"
          >
            <v-list-item-title>{{ subItem.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-divider></v-divider>
        <v-list-item @click="openfile('armor.am_dat'),left = false">
          <v-list-item-title>
            {{$t("Interface.equipment")}}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-footer
      app
      color="blue-grey"
      class="white--text"
      style="-webkit-app-region: drag"
    >
      <span>&nbsp;&nbsp;&nbsp;By Alcedo  &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp; | {{$t("Interface.Data_version")}} 167796 | {{$t("Interface.Original_file_version")}} 167796 （{{$t("Interface.Extract_from")}} 2019-05-09） | {{$t("Interface.Current_file")}} {{file}}（{{weaponfilename}}）|</span>
    </v-footer>

    <!--弹窗-->
    <v-dialog
      v-model="dialog"
      max-width="490"
    >
      <v-card>
        <v-card-title class="headline">{{$t("Interface.About")}}</v-card-title>
  
        <v-card-text>
          <div>
            <p>{{$t("Explanatory.About_content")}}</p>
            <v-divider></v-divider>
            <p>{{$t("Explanatory.About_edition")}}</p>
            <p>{{$t("Interface.Update_description")}}</p>
            <div v-html="$t('Explanatory.Update_description')"></div>
            <v-divider></v-divider>
            <p><a>https://github.com/HalcyonAlcedo/MHW-Weaponeditor</a></p>
            <v-divider></v-divider>
          </div>
        </v-card-text>
  
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            {{$t("Interface.Read")}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="loaddialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          {{$t("Interface.Loading")}}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog 
      v-model="Explain"
      persistent 
      max-width="690">
      <v-card>
        <v-card-title class="headline">
          {{$t("Interface.Instructions")}}
          <v-spacer></v-spacer>
          <v-select
            v-model="lang"
            :items="langlist"
            item-text="text"
            item-value="value"
            :label="$t('Interface.Lang')"
            return-object
          ></v-select>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text><div v-html="$t('Explanatory.Instructions')"></div></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click.native="Explain = false">{{$t("Interface.Read")}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar.snackbar"
      :bottom="snackbar.y === 'bottom'"
      :left="snackbar.x === 'left'"
      :multi-line="snackbar.mode === 'multi-line'"
      :right="snackbar.x === 'right'"
      :timeout="snackbar.timeout"
      :top="snackbar.y === 'top'"
      :vertical="snackbar.mode === 'vertical'"
      style="-webkit-app-region: no-drag"
    >
      {{ snackbar.text }}
      <v-btn
        color="pink"
        text
        @click="snackbar.snackbar = false"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>


<script>
import fs from 'fs'
import path from 'path'
// import axios from 'axios'

const {dialog} = require('electron').remote

export default {
  data () {
    let Language = this.$i18n.locale
    return {
      lang: Language,
      langlist: [
        {text: '简体中文', value: 'zh_cn'},
        {text: '繁體中文', value: 'zh_tw'}
      ],
      drawer: true,
      left: false,
      dialog: false,
      Explain: false,
      appdark: false,
      sourcemod: false,
      excludeunknown: true,
      Old_version: false,
      update: false,
      loaddialog: false,
      sound: false,
      file: '',
      snackbar: {
        snackbar: false,
        y: 'top',
        x: null,
        mode: '',
        timeout: 6000,
        text: ''
      },
      ipc: require('electron').ipcRenderer
    }
  },
  computed: {
    newfile () {
      let wp = [
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
        { title: this.$t('Weapon.Hunting_bow') + ' (bow)', file: 'bow.wp_dat_g' }
      ]
      let wpm = [
        { title: this.$t('Weaponsmiscellaneous.Sharpness') + ' (kireaji.kire)', file: 'kireaji.kire' },
        { title: this.$t('Weaponsmiscellaneous.Wswordattribute') + ' (wep_wsword.wep_wsd)', file: 'wep_wsword.wep_wsd' },
        { title: this.$t('Weaponsmiscellaneous.Saxebottle') + ' (wep_saxe.wep_saxe)', file: 'wep_saxe.wep_saxe' },
        { title: this.$t('Weaponsmiscellaneous.Bombardment') + ' (wep_glan.wep_glan)', file: 'wep_glan.wep_glan' },
        { title: this.$t('Weaponsmiscellaneous.Syllable') + ' (wep_whistle.wep_wsl)', file: 'wep_whistle.wep_wsl' },
        { title: this.$t('Weaponsmiscellaneous.Bottle') + ' (bottle_table.bbtbl)', file: 'bottle_table.bbtbl' },
        { title: this.$t('Weaponsmiscellaneous.Shell') + ' (shell_table.shl_tbl)', file: 'shell_table.shl_tbl' }
      ]
      return [
        {title: this.$t('Interface.Weapon'), items: wp},
        {title: this.$t('Interface.Weaponsmiscellaneous'), items: wpm}
      ]
    },
    weapon () {
      if (this.file !== this.$store.getters.donefilename && this.$store.getters.donefilename !== 'Unknown') {
        this.snackbar.text = this.$t('Interface.Oldfile')
      }
      return this.$store.getters.donefilename
    },
    filedata () {
      return this.$store.getters.donefiledata
    },
    weaponfilename () {
      switch (this.weapon) {
        case 'l_sword.wp_dat':
          return this.$t('Weapon.Greatsword')
        case 'sword.wp_dat':
          return this.$t('Weapon.Blade')
        case 'hammer.wp_dat':
          return this.$t('Weapon.Hammer')
        case 'lance.wp_dat':
          return this.$t('Weapon.Lance')
        case 's_axe.wp_dat':
          return this.$t('Weapon.Switch_axe')
        case 'rod.wp_dat':
          return this.$t('Weapon.Insect_glaive')
        case 'lbg.wp_dat_g':
          return this.$t('Weapon.Light_crossbow')
        case 'tachi.wp_dat':
          return this.$t('Weapon.Longsword')
        case 'w_sword.wp_dat':
          return this.$t('Weapon.Dual_blade')
        case 'whistle.wp_dat':
          return this.$t('Weapon.Hunting_horn')
        case 'g_lance.wp_dat':
          return this.$t('Weapon.Gunlance')
        case 'c_axe.wp_dat':
          return this.$t('Weapon.Charge_blade')
        case 'bow.wp_dat_g':
          return this.$t('Weapon.Hunting_bow')
        case 'hbg.wp_dat_g':
          return this.$t('Weapon.Heavy_crossbow')
        case 'kireaji.kire':
          return this.$t('Weaponsmiscellaneous.Sharpness')
        case 'rod_insect.rod_inse':
          return this.$t('Weaponsmiscellaneous.Rod')
        case 'skill_data.skl_dat':
          return this.$t('Weaponsmiscellaneous.Skill')
        case 'wep_glan.wep_glan':
          return this.$t('Weaponsmiscellaneous.Bombardment')
        case 'wep_saxe.wep_saxe':
          return this.$t('Weaponsmiscellaneous.Saxebottle')
        case 'wep_whistle.wep_wsl':
          return this.$t('Weaponsmiscellaneous.Syllable')
        case 'bottle_table.bbtbl':
          return this.$t('Weaponsmiscellaneous.Bottle')
        case 'shell_table.shl_tbl':
          return this.$t('Weaponsmiscellaneous.Shell')
        case 'wep_wsword.wep_wsd':
          return this.$t('Weaponsmiscellaneous.Wswordattribute')
        case 'armor.am_dat':
          return this.$t('Interface.equipment')
        default:
          return this.$t('Weapon.Unknown')
      }
    }
  },
  watch: {
    excludeunknown: function () {
      this.$store.dispatch('excludeUnknown', this.excludeunknown)
    },
    weapon: function () {
      this.contrastdata()
    },
    sound: function () {
      this.contrastdata()
    },
    Old_version: function () {
      this.snackbar.text = this.Old_version ? this.$t('Explanatory.Old_version_open') : this.$t('Explanatory.Old_version_close')
      this.snackbar.snackbar = true
      this.$store.dispatch('setOldversion', this.Old_version)
    },
    lang: function () {
      this.$i18n.locale = this.lang.value
    }
  },
  props: {
    source: String
  },
  methods: {
    openfile (file = null) {
      let filepath
      let _this = this
      if (file === null) {
        // this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
        // this.loaddialog = true
        dialog.showOpenDialog({
          properties: ['openFile']
        }).then(result => {
          this.file = result.filePaths[0].substring(result.filePaths[0].lastIndexOf('\\') + 1)
          this.loadfile(result.filePaths[0])
        }).catch(err => {
          console.log('err:' + err)
        })
      } else {
        this.$store.dispatch('setOldversion', false)
        this.Old_version = false
        filepath = path.join(__static, '../../Sourceweapon/' + file)
        fs.access(filepath,fs.constants.F_OK, (err) => {
          if (err) {
            filepath = path.join(__static, '/Sourceweapon/' + file)
          }
          _this.file = filepath.substring(filepath.lastIndexOf('\\') + 1)
          _this.loadfile(filepath)
        })
        // this.file = file
        // this.loadfile(file)
      }
    },
    getFile (event) {
      let _this = this
      let file = event.target.files
      let reader = new FileReader();
      reader.readAsArrayBuffer(file[0]);
      reader.onload = function() {
        _this.file = file[0].name
        let data = new Uint8Array(this.result)
        _this.loaddialog = false
        _this.$store.dispatch('setfile', file[0].name)
        _this.$store.dispatch('setdata', data)
        _this.snackbar.text = _this.$t('Interface.Open_Success')
        _this.snackbar.snackbar = true
      }
      reader.onerror = function() {
        _this.snackbar.text = _this.$t('Interface.Open_Failure')
        _this.snackbar.snackbar = true
      }
    },
    savefile () {
      let _this = this
      if (this.Old_version) {
        this.snackbar.text = this.$t('Interface.Old_version_save')
        this.snackbar.snackbar = true
      } else if (this.file !== this.$t('Interface.No_file_opened')) {
        dialog.showSaveDialog({ title: this.$t('Interface.Save_file'), defaultPath: this.weapon !== 'Unknown' ? this.weapon : this.file }).then(result => {
          fs.writeFile(result.filePath, this.filedata, { flag: 'w' }, function (err) {
            if (err) {
              _this.snackbar.text = _this.$t('Interface.Save_Failure')
            } else {
              _this.snackbar.text = _this.$t('Interface.Save_Success')
            }
            _this.snackbar.snackbar = true
          })
        }).catch(err => {
          console.log('err:' + err)
        })
        // const data = _this.filedata
        // const url = window.URL.createObjectURL(new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}))
        // const link = document.createElement('a')
        // link.style.display = 'none'
        // link.href = url
        // link.setAttribute('download', _this.weapon !== 'Unknown' ? _this.weapon : _this.file)
        // document.body.appendChild(link)
        // link.click()
        // document.body.removeChild(link)
      } else {
        this.snackbar.text = this.$t('Interface.No_file_opened')
        this.snackbar.snackbar = true
      }
    },
    contrastdata () {
      let _this = this
      if (this.weapon !== 'Unknown' && this.sound) {
        let filepath = path.join(__static, '../../Sourceweapon/' + this.weapon)
        fs.access(filepath,fs.constants.F_OK, (err) => {
          if (err) {
            filepath = path.join(__static, '/Sourceweapon/' + _this.weapon)
          }
          fs.readFile(filepath, function (err, data) {
            if (!err) {
              _this.$store.dispatch('setsourcedata', data)
            }
            _this.loaddialog = false
          })
        })
        
        // axios({
        //   method: 'get',
        //   url: '/Sourceweapon/' + this.weapon, // 请求地址
        //   responseType: 'arraybuffer' // 表明返回服务器返回的数据类型
        // }).then((res) => { // 处理返回的文件流
        //   let content = res.data
        //   let data = new Uint8Array(content)
        //   _this.$store.dispatch('setsourcedata', data)
        //   _this.loaddialog = false
        // })
      } else {
        this.$store.dispatch('setsourcedata', false)
      }
    },
    loadfile (f) {
      let _this = this
      this.loaddialog = true
      // axios({
      //   method: 'get',
      //   url: '/Sourceweapon/' + f, // 请求地址
      //   responseType: 'arraybuffer' // 表明返回服务器返回的数据类型
      // }).then((res) => { // 处理返回的文件流
      //   let content = res.data
      //   let data = new Uint8Array(content)
      //   _this.$store.dispatch('setfile', f)
      //   _this.$store.dispatch('setdata', data)
      //   _this.snackbar.text = _this.$t('Interface.Open_Success')
      //   _this.snackbar.snackbar = true
      //   _this.loaddialog = false
      // }).catch(function(error){
      //   _this.snackbar.text = _this.$t('Interface.Open_Failure')
      //   _this.snackbar.snackbar = true
      //   _this.loaddialog = false
      // })
      fs.readFile(f, function (err, data) {
        if (err) {
          _this.snackbar.text = _this.$t('Interface.Open_Failure')
          _this.snackbar.snackbar = true
        } else {
          _this.$store.dispatch('setfile', f)
          _this.$store.dispatch('setdata', data)
          _this.snackbar.text = _this.$t('Interface.Open_Success')
          _this.snackbar.snackbar = true
        }
        _this.loaddialog = false
      })
    },
    versionupdate () {
      this.$store.dispatch('updateversion', true)
      this.sound = true
      this.contrastdata()
      this.Old_version = false
      this.snackbar.text = this.$t('Explanatory.Version_update_true')
      this.snackbar.snackbar = true
    }
  },
  mounted () {
    let _this = this
    this.file = this.$t('Interface.No_file_opened')
    document.addEventListener('drop', function (e) {
      e.preventDefault()
      e.stopPropagation()
      for (let f of e.dataTransfer.files) {
        _this.file = f.name
        _this.loadfile(f.path)
      }
    })
    document.addEventListener('dragover', function (e) {
      e.preventDefault()
      e.stopPropagation()
    })
    this.Explain = true
  }
}
</script>

<style>
  body::-webkit-scrollbar {
    display: none;
  }
</style>