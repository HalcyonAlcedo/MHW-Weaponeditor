<template>
  <div>
    <v-app id="inspire">
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
          <Editor></Editor>
          <!--
          <v-layout justify-center align-center>
            <v-flex shrink>
              <v-tooltip right>
                <v-btn
                  icon
                  large
                  :href="source"
                  target="_blank"
                  slot="activator"
                >
                  <v-icon large>code</v-icon>
                </v-btn>
                <span>Source</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
          -->
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

export default {
  data: () => ({
    drawer: true,
    dialog: false,
    ipc: require('electron').ipcRenderer
  }),
  components: {
    Editor
  },
  computed: {
    weapon () {
      return this.$store.getters.donefilename
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