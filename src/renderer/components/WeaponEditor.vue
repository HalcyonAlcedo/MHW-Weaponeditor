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
          <v-list-tile @click="openfile()">
            <v-list-tile-action>
              <v-icon>folder_open</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>打开</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>save</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>保存</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="dialog = true">
            <v-list-tile-action>
              <v-icon>info</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>关于</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list
          subheader
          three-line
        >
          <v-subheader>设置</v-subheader>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox
                v-model="excludeunknown"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click.prevent="excludeunknown = !excludeunknown">
              <v-list-tile-title>排除未知武器</v-list-tile-title>
              <v-list-tile-sub-title>武器信息列表中排除掉未被记载的武器数据</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox
                v-model="sound"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click.prevent="sound = !sound">
              <v-list-tile-title>原始数据对比</v-list-tile-title>
              <v-list-tile-sub-title>与系统中记载的原始武器信息进行对比</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox
                v-model="sourcemod"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click.prevent="sourcemod = !sourcemod">
              <v-list-tile-title>源码查看模式</v-list-tile-title>
              <v-list-tile-sub-title>显示文件二进制数据的文件模式，二进制数据根据武器类型进行辅助显示</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-checkbox
                v-model="appdark"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click.prevent="appdark = !appdark">
              <v-list-tile-title>暗黑主题</v-list-tile-title>
              <v-list-tile-sub-title>切换软件主色调至暗黑模式。</v-list-tile-sub-title>
            </v-list-tile-content>
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
      <v-footer app fixed>
        <span>&nbsp;&nbsp;&nbsp;By Alcedo 2018 &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp; | 数据版本 154766 | 原始文件版本 154766 (提取自2018-10-14)| 当前文件 {{file}}（{{weaponfilename}}）|</span>
      </v-footer>
      <v-dialog
        v-model="dialog"
        max-width="490"
      >
        <v-card>
          <v-card-title class="headline">关于</v-card-title>
  
          <v-card-text>
            本软件可针对《怪物猎人世界》中武器数据魔改文件进行查看和修改，修改后文件放置在Monster Hunter World\nativePC\common\equip下即可生效。修改后文件将影响游戏平衡性，请勿用于联机使用。注：目前仅支持查看。
          </v-card-text>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              flat="flat"
              @click="dialog = false"
            >
              已读
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
            加载中，请稍等
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>
import Editor from './Editor'
import EditorSource from './EditorSource'
import fs from 'fs'
import path from 'path'

export default {
  data: () => ({
    drawer: true,
    dialog: false,
    appdark: false,
    sourcemod: false,
    excludeunknown: true,
    loaddialog: false,
    sound: false,
    file: '未打开文件',
    ipc: require('electron').ipcRenderer
  }),
  components: {
    Editor,
    EditorSource
  },
  computed: {
    weapon () {
      return this.$store.getters.donefilename
    },
    weaponfilename () {
      switch (this.weapon) {
        case 'l_sword.wp_dat':
          return '大剑'
        case 'sword.wp_dat':
          return '片手'
        case 'hammer.wp_dat':
          return '大锤'
        case 'lance.wp_dat':
          return '长枪'
        case 's_axe.wp_dat':
          return '斩斧'
        case 'rod.wp_dat':
          return '虫棍'
        case 'lbg.wp_dat_g':
          return '轻弩'
        case 'tachi.wp_dat':
          return '太刀'
        case 'w_sword.wp_dat':
          return '双刀'
        case 'whistle.wp_dat':
          return '猎笛'
        case 'g_lance.wp_dat':
          return '铳枪'
        case 'c_axe.wp_dat':
          return '盾斧'
        case 'bow.wp_dat_g':
          return '弓'
        case 'hbg.wp_dat_g':
          return '重弩'
        default:
          return '未知文件'
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
    }
  },
  props: {
    source: String
  },
  methods: {
    openfile () {
      const {dialog} = require('electron').remote
      let filepath = dialog.showOpenDialog({properties: ['openFile']})[0]
      this.file = filepath.substring(filepath.lastIndexOf('\\') + 1)
      this.loadfile(filepath)
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
          console.log(err)
        } else {
          _this.$store.dispatch('setdata', data)
          _this.$store.dispatch('setfile', f)
        }
        _this.loaddialog = false
      })
    }
  },
  mounted () {
    let _this = this
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
  }
}
</script>

<style>
  body::-webkit-scrollbar {
    display: none;
  }
</style>