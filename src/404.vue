<template>
  <v-app id="404" dark>
    <v-app-bar
      clipped-left
      app
      style="-webkit-app-region: drag"
    >
      <v-app-bar-nav-icon
        to="/"
        style="-webkit-app-region: no-drag"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>怪物猎人世界工具箱</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="ipcRenderer.send('hide-window')" icon style="-webkit-app-region: no-drag">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-btn @click="ipcRenderer.send('window-all-closed')" icon style="-webkit-app-region: no-drag">
        <v-icon>close</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- 内容区 -->
    <v-content>
    <v-row
        align="center"
        justify="center"
        >
        <v-col class="text-center" cols="12">
            <h1 class="display-1 font-weight-thin mb-4">页面施工中</h1>
            <h4 class="subheading">ERROR 404 NOT FOUND!</h4>
        </v-col>
    </v-row>
    </v-content>

    <v-footer
      app
    >
      <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  const {remote, ipcRenderer} = require('electron')
  export default {
    data: () => ({
      remote: remote,
      ipcRenderer: ipcRenderer,
      primaryDrawer: {
        model: null,
      },
    })
  }
</script>

<style>
  /* This is for documentation purposes and will not be needed in your application */
  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
</style>