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
                readonly
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
        <v-toolbar-title>MHW-WeaponEditor - {{weapon ? weapon : '未打开文件'}}</v-toolbar-title>
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
        <span>&copy;Alcedo 2018</span>
      </v-footer>
      <v-dialog
        v-model="dialog"
        max-width="490"
      >
        <v-card>
          <v-card-title class="headline">说明</v-card-title>
  
          <v-card-text>
            将数据文件拖拽到程序窗口中，MHW-WeapinEditor将自动读取并分析数据，根据内建的资料表匹配数据文件信息。
            修改数据后点击保存将生成新的数据文件。
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
    </v-app>
  </div>
</template>

<script>
import Editor from './Editor'
import EditorSource from './EditorSource'

export default {
  data: () => ({
    drawer: true,
    dialog: false,
    appdark: false,
    sourcemod: false,
    excludeunknown: true,
    ipc: require('electron').ipcRenderer
  }),
  components: {
    Editor,
    EditorSource
  },
  computed: {
    weapon () {
      return this.$store.getters.donefilename
    }
  },
  watch: {
    excludeunknown: function () {
      this.$store.dispatch('excludeUnknown', this.excludeunknown)
    }
  },
  props: {
    source: String
  },
  methods: {
    openfile () {
      const {dialog} = require('electron').remote
      this.$store.dispatch('setfile', dialog.showOpenDialog({properties: ['openFile']})[0])
    }
  }
}
</script>

<style>
  body::-webkit-scrollbar {
    display: none;
  }
</style>