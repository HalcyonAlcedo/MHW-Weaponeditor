<template>
  <div>
    <v-app id="inspire" :dark="appdark">
      <v-navigation-drawer
        clipped
        fixed
        v-model="drawer"
        app
      >
        <v-list dense>
          <v-menu
            transition="slide-x-transition"
            bottom
            right
            offset-x
            full-width
          >
            <v-list-tile @click="" style="width: 100%" slot="activator">
              <v-list-tile-action>
                <v-icon>insert_drive_file</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{$t("Interface.New_file")}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list>
              <v-list-tile
                v-for="(item, i) in newfile"
                :key="i"
                @click="openfile(item.file)"
              >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-list-tile @click="openfile()">
            <v-list-tile-action>
              <v-icon>folder_open</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{$t("Interface.Open_file")}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="savefile()">
            <v-list-tile-action>
              <v-icon>save</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{$t("Interface.Save_file")}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="dialog = true">
            <v-list-tile-action>
              <v-icon>info</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{$t("Interface.About")}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list
          subheader
          three-line
        >
          <v-subheader>{{$t("Interface.Setting")}}</v-subheader>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox
                v-model="excludeunknown"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click.prevent="excludeunknown = !excludeunknown">
              <v-list-tile-title>{{$t("Interface.Elimination_unknown_weapons")}}</v-list-tile-title>
              <v-list-tile-sub-title>{{$t("Explanatory.Elimination_unknown_weapons")}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox
                v-model="sound"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click.prevent="sound = !sound">
              <v-list-tile-title>{{$t("Interface.Raw_data_comparison")}}</v-list-tile-title>
              <v-list-tile-sub-title>{{$t("Explanatory.Raw_data_comparison")}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox
                v-model="sourcemod"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click.prevent="sourcemod = !sourcemod">
              <v-list-tile-title>{{$t("Interface.Binary_mode")}}</v-list-tile-title>
              <v-list-tile-sub-title>{{$t("Explanatory.Binary_mode")}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox
                v-model="appdark"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click.prevent="appdark = !appdark">
              <v-list-tile-title>{{$t("Interface.Dark_theme")}}</v-list-tile-title>
              <v-list-tile-sub-title>{{$t("Explanatory.Dark_theme")}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox
                v-model="Old_version"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click.prevent="Old_version = !Old_version">
              <v-list-tile-title>{{$t("Interface.Old_version")}}</v-list-tile-title>
              <v-list-tile-sub-title>{{$t("Explanatory.Old_version")}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="" v-if="Old_version">
                <v-btn
                  :loading="update"
                  :disabled="update"
                  color="secondary"
                  @click.native="versionupdate"
                >
                  {{$t("Interface.Version_update")}}
                </v-btn>

            <v-list-tile-sub-title>{{$t("Explanatory.Version_update")}}</v-list-tile-sub-title>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list
          subheader
          three-line>
          <v-list-tile @click="">
          <v-select
            v-model="lang"
            :items="langlist"
            item-text="text"
            item-value="value"
            :label="$t('Interface.Lang')"
            return-object
          ></v-select>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app fixed clipped-left style="-webkit-app-region: drag">
        <v-toolbar-side-icon @click.stop="drawer = !drawer" style="-webkit-app-region: no-drag"></v-toolbar-side-icon>
        <v-toolbar-title>MHW-WeaponEditor - {{file}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="ipc.send('hide-window')" icon style="-webkit-app-region: no-drag">
          <v-icon>remove</v-icon>
        </v-btn>
        <v-btn @click="ipc.send('window-all-closed')" icon style="-webkit-app-region: no-drag">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <Editor v-if="!sourcemod"></Editor>
          <EditorSource v-else></EditorSource>
        </v-container>
      </v-content>
      <v-footer app fixed style="-webkit-app-region: drag">
        <span>&nbsp;&nbsp;&nbsp;By Alcedo  &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp; | {{$t("Interface.Data_version")}} 157749 | {{$t("Interface.Original_file_version")}} 157749 （{{$t("Interface.Extract_from")}} 2018-10-31） | {{$t("Interface.Current_file")}} {{file}}（{{weaponfilename}}）|</span>
      </v-footer>
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
              <p><a>https://github.com/HalcyonAlcedo/MHW-Weaponeditor</a></p>
              <v-divider></v-divider>
            </div>
          </v-card-text>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              flat="flat"
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
      <v-dialog v-model="Explain" persistent max-width="690">
        <v-card>
          <v-card-title class="headline">{{$t("Interface.Instructions")}}</v-card-title>
          <v-divider></v-divider>
          <v-card-title><div v-html="$t('Explanatory.Instructions')"></div></v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="Explain = false">{{$t("Interface.Read")}}</v-btn>
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
          flat
          @click="snackbar.snackbar = false"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>
import Editor from './Editor'
import EditorSource from './EditorSource'
import fs from 'fs'
import path from 'path'

const {dialog} = require('electron').remote

export default {
  data () {
    let Language = this.$i18n.locale
    return {
      lang: Language,
      langlist: [
        {text: '中文', value: 'zh'},
        {text: 'English', value: 'en'}
      ],
      drawer: true,
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
  components: {
    Editor,
    EditorSource
  },
  computed: {
    newfile () {
      return [
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
    },
    weapon () {
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
      if (file === null) {
        filepath = dialog.showOpenDialog({properties: ['openFile']})[0]
      } else {
        this.$store.dispatch('setOldversion', false)
        this.Old_version = false
        filepath = path.join(__static, '/Sourceweapon/' + file)
      }
      this.file = filepath.substring(filepath.lastIndexOf('\\') + 1)
      this.loadfile(filepath)
    },
    savefile () {
      let _this = this
      if (this.file !== this.$t('Interface.No_file_opened')) {
        let filepath = dialog.showSaveDialog({ title: this.$t('Interface.Save_file'), defaultPath: this.weapon })
        console.log(this.filedata)
        fs.writeFile(filepath, this.filedata, { flag: 'w' }, function (err) {
          if (err) {
            _this.snackbar.text = _this.$t('Interface.Save_Failure')
          } else {
            _this.snackbar.text = _this.$t('Interface.Save_Success')
          }
          _this.snackbar.snackbar = true
        })
      } else {
        this.snackbar.text = this.$t('Interface.No_file_opened')
        this.snackbar.snackbar = true
      }
    },
    contrastdata () {
      let _this = this
      if (this.weapon !== 'Unknown' && this.sound) {
        fs.readFile(path.join(__static, '/Sourceweapon/' + this.weapon), function (err, data) {
          if (err) {
            console.log(err)
          } else {
            _this.$store.dispatch('setsourcedata', data)
          }
          _this.loaddialog = false
        })
      } else {
        this.$store.dispatch('setsourcedata', false)
      }
    },
    loadfile (f) {
      let _this = this
      this.loaddialog = true
      fs.readFile(f, function (err, data) {
        if (err) {
          _this.snackbar.text = _this.$t('Interface.Open_Failure')
          _this.snackbar.snackbar = true
          console.log(err)
        } else {
          _this.$store.dispatch('setdata', data)
          _this.$store.dispatch('setfile', f)
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