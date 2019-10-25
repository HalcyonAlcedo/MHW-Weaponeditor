<template>
  <v-app id="tools">
    <!-- 导航 -->
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      clipped
      :mini-variant.sync="primaryDrawer.mini"
      app
      overflow
    >
      <v-list dense>
        <v-list-item
          v-for="item in drawerItems"
          :key="item.title"
          :to="item.link"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- 程序栏 -->
    <v-app-bar
      clipped-left
      app
      :collapse="primaryDrawer.mini"
      :collapse-on-scroll="primaryDrawer.mini"
      style="-webkit-app-region: drag"
    >
      <v-app-bar-nav-icon
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
        style="-webkit-app-region: no-drag"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>怪物猎人世界工具箱</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
       v-if="primaryDrawer.mini"
       style="-webkit-app-region: no-drag"
       icon
       @click="primaryDrawer.mini=!primaryDrawer.mini"
      >
        <v-icon>mdi-menu-right</v-icon>
      </v-btn>
      <v-btn v-if="primaryDrawer.mini" @click="ipcRenderer.send('hide-window')" icon style="-webkit-app-region: no-drag">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-btn v-if="primaryDrawer.mini" @click="ipcRenderer.send('window-all-closed')" icon style="-webkit-app-region: no-drag">
        <v-icon>close</v-icon>
      </v-btn>
      <v-speed-dial
        v-else
        v-model="primaryDrawer.fab"
        direction="bottom"
        transition="slide-y-transition"
        style="-webkit-app-region: no-drag"
      >
        <template v-slot:activator>
          <v-btn
            v-model="primaryDrawer.fab"
            color="blue darken-2"
            small
            dark
            fab
          >
            <v-icon v-if="primaryDrawer.fab">mdi-close</v-icon>
            <v-icon v-else>mdi-microsoft-dynamics</v-icon>
          </v-btn>
        </template>
        <v-btn
          fab
          dark
          small
          color="green"
          @click="primaryDrawer.mini=!primaryDrawer.mini"
        >
          <v-icon>mdi-menu-left-outline</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="indigo"
          @click="ipcRenderer.send('hide-window')"
        >
          <v-icon>remove</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="red"
          @click="ipcRenderer.send('window-all-closed')"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-app-bar>
    <!-- 内容区 -->
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer
      app
    >
      <span class="px-4">MHWEE &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  import fs from 'fs'
  import path from 'path'
  import axios from 'axios'

  const {remote, ipcRenderer} = require('electron')

  export default {
    data: () => ({
      remote: remote,
      ipcRenderer: ipcRenderer,
      primaryDrawer: {
        model: null,
        mini: true,
        fab: false
      },
      drawerItems: [
        { title: '主页', icon: 'dashboard', link: '/home' },
        { title: '本地Mod', icon: 'list', link: '/local' },
        { title: 'Mod管理', icon: 'wb_cloudy', link: '/management' },
        { title: '装备编辑工具', icon: 'build', link: '/mhwee' },
        // { title: '个人信息', icon: 'person', link: '/user' },
        // { title: 'Bug反馈', icon: 'bug_report', link: '/feedback' },
      ],
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