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
                <v-list-tile-title>新建</v-list-tile-title>
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
              <v-list-tile-title>打开</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="savefile()">
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
              <v-list-tile-title>二进制模式</v-list-tile-title>
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
      <v-footer app fixed style="-webkit-app-region: drag">
        <span>&nbsp;&nbsp;&nbsp;By Alcedo 2018 &nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp; | 数据版本 154766 | 原始文件版本 154766 （提取自2018-10-14） | 当前文件 {{file}}（{{weaponfilename}}）|</span>
      </v-footer>
      <v-dialog
        v-model="dialog"
        max-width="490"
      >
        <v-card>
          <v-card-title class="headline">关于</v-card-title>
  
          <v-card-text>
            <div>
              <p>本软件可针对《怪物猎人世界》中武器数据魔改文件进行查看和修改，修改后文件放置在Monster Hunter World\nativePC\common\equip\下即可生效。修改后文件将影响游戏平衡性，请勿用于联机使用。</p>
              <v-divider></v-divider>
              <p>软件版本：0.6.2</p>
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
  data: () => ({
    drawer: true,
    dialog: false,
    appdark: false,
    sourcemod: false,
    excludeunknown: true,
    loaddialog: false,
    sound: false,
    file: '未打开文件',
    newfile: [
      { title: '大剑', file: 'l_sword.wp_dat' },
      { title: '片手', file: 'sword.wp_dat' },
      { title: '大锤', file: 'hammer.wp_dat' },
      { title: '长枪', file: 'lance.wp_dat' },
      { title: '斩斧', file: 's_axe.wp_dat' },
      { title: '虫棍', file: 'rod.wp_dat' },
      { title: '轻弩', file: 'lbg.wp_dat_g' },
      { title: '重弩', file: 'hbg.wp_dat_g' },
      { title: '太刀', file: 'tachi.wp_dat' },
      { title: '双刀', file: 'w_sword.wp_dat' },
      { title: '猎笛', file: 'whistle.wp_dat' },
      { title: '铳枪', file: 'g_lance.wp_dat' },
      { title: '盾斧', file: 'c_axe.wp_dat' },
      { title: '弓', file: 'bow.wp_dat_g' }
    ],
    snackbar: {
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      text: ''
    },
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
    filedata () {
      return this.$store.getters.donefiledata
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
    openfile (file = null) {
      let filepath
      if (file === null) {
        filepath = dialog.showOpenDialog({properties: ['openFile']})[0]
      } else {
        filepath = path.join(__static, '/Sourceweapon/' + file)
      }
      this.file = filepath.substring(filepath.lastIndexOf('\\') + 1)
      this.loadfile(filepath)
    },
    savefile () {
      let _this = this
      if (this.file !== '未打开文件') {
        let filepath = dialog.showSaveDialog({ title: '保存', defaultPath: this.weapon })
        fs.writeFile(filepath, this.filedata, { flag: 'w' }, function (err) {
          if (err) {
            _this.snackbar.text = '保存失败'
          } else {
            _this.snackbar.text = '保存成功'
          }
          _this.snackbar.snackbar = true
        })
      } else {
        this.snackbar.text = '未打开文件'
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
          _this.snackbar.text = '文件打开失败'
          _this.snackbar.snackbar = true
          console.log(err)
        } else {
          _this.$store.dispatch('setdata', data)
          _this.$store.dispatch('setfile', f)
          _this.snackbar.text = '文件已打开'
          _this.snackbar.snackbar = true
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