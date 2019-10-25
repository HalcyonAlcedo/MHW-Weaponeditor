<template>
  <v-card>
    <v-row
      class="pa-4"
      justify="space-between"
    >
      <v-col 
        :cols="cols" 
        @click="cols = 5"
      >
        <v-text-field
          label="游戏目录"
          prepend-icon="mdi-folder"
          v-model="gamedir"
          @click:prepend="setgame"
        ></v-text-field>
        <v-divider></v-divider>
        <v-treeview
          v-model="tree"
          :open="open"
          :items="items"
          activatable
          item-key="name"
          open-on-click
          selected-color="indigo"
          return-object
          :active.sync="active"
          transition
        >
          <template v-slot:prepend="{ item, open }">
            <v-icon v-if="!item.file">
              {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            </v-icon>
            <v-icon v-else>
              {{ files[item.file] }}
            </v-icon>
          </template>
        </v-treeview>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col
        class="d-flex text-center"
        @click="cols = 3"
      >
        <v-scroll-y-transition mode="out-in">
          <v-card
            class="pt-8 mx-auto"
            flat
          >
            <template v-if="active.length === 0">
              未选中文件
            </template>
            <template v-else>
              <v-card
                v-for="(selection, i) in active"
                :key="i"
                small
              >
                <v-card-text>
                  <h3 class="headline mb-2">
                    {{ selection.name }}
                  </h3>
                  <div class="blue--text mb-2">{{ selection.src }}</div>
                </v-card-text>
                <v-divider></v-divider>
                <v-tabs vertical>
                  <v-tab>
                    文件属性
                  </v-tab>
                  <v-tab>
                    自定义选项
                  </v-tab>
                  <v-tab @click="if(selection.edit) openwee(selection.src)">
                    文件修改
                  </v-tab>

                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <v-row
                          class="text-left"
                          tag="v-card-text"
                        >
                          <v-col class="text-right" tag="strong" cols="5">文件大小:</v-col>
                          <v-col cols="7">{{ (selection.size / 1024).toFixed(2) }}KB</v-col>
                          <v-col class="text-right" tag="strong" cols="5">创建时间:</v-col>
                          <v-col cols="7">{{ selection.ctime.toISOString().substr(0, 10) + ' ' + selection.ctime.toISOString().substr(11, 8) }}</v-col>
                          <v-col class="text-right" tag="strong" cols="5">修改时间:</v-col>
                          <v-col cols="7">{{ selection.mtime.toISOString().substr(0, 10) + ' ' + selection.mtime.toISOString().substr(11, 8) }}</v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <!-- 自定义选项 -->
                        <v-row
                          class="text-left"
                          tag="v-card-text"
                        >
                          <p v-if="!selection.option">无自定义选项</p>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <!-- 文件修改 -->
                        <v-row
                          class="text-left"
                          tag="v-card-text"
                        >
                          <p v-if="!selection.edit">不支持修改</p>
                          <router-view v-else></router-view>
                        </v-row>
                        <v-btn
                          v-if="selection.size < 20480"
                          class="ma-2" 
                          tile 
                          outlined 
                          color="success" 
                          @click="openhex(selection.src)">
                          <v-icon left>mdi-pencil</v-icon> 二进制编辑
                        </v-btn>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
                
              </v-card>
            </template>
          </v-card>
        </v-scroll-y-transition>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar.open"
      bottom
      left
      multi-line
      :color="snackbar.color"
      :timeout="6000"
    >
      {{snackbar.text}}
    </v-snackbar>
    <v-dialog
      v-model="dialog.open"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{dialog.title}}
        </v-card-title>

        <v-card-text>
          {{dialog.text}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            v-for="operation in dialog.options"
            :key="operation.text"
            @click="dialogOperation(operation.operation)"
          >
            {{operation.text}}
          </v-btn>
          
          <v-btn
            color="primary"
            text
            @click="dialog.open = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
  import fs from 'fs'
  import path from 'path'

  const {dialog} = require('electron').remote

  export default {
    data: () => ({
      open: ['public'],
      active: [],
      files: {
        wp_dat: 'mdi-sword',
        wp_dat_g: 'mdi-pistol',
        am_dat: 'mdi-security',
        mod3: 'mdi-tshirt-crew',
        kire: 'mdi-knife-military',
        wep_wsd: 'mdi-knife-military',
        wep_saxe: 'mdi-knife-military',
        wep_glan: 'mdi-knife-military',
        wep_wsl: 'mdi-knife-military',
        bbtbl: 'mdi-knife-military',
        shl_tbl: 'mdi-knife-military',
        md: 'mdi-markdown',
      },
      editlist: [
        'wp_dat',
        'wp_dat_g',
        'am_dat',
        'kire',
        'wep_wsd',
        'wep_saxe',
        'wep_glan',
        'wep_wsl',
        'bbtbl',
        'shl_tbl',
      ],
      gamedir: '',
      tree: [],
      items: [],
      cols: 5,
      snackbar: {
        open: false,
        text: '',
        color: 'cyan darken-2'
      },
      dialog: {
        open: false,
        title: '提示',
        text: ''
      }
    }),
    mounted () {
      let gamepaths = [
        'C:\\Program Files (x86)\Steam\\SteamApps\\common\\Monster Hunter World',
        'D:\\Program Files (x86)\Steam\\SteamApps\\common\\Monster Hunter World',
        'E:\\Program Files (x86)\Steam\\SteamApps\\common\\Monster Hunter World',
        'F:\\Program Files (x86)\Steam\\SteamApps\\common\\Monster Hunter World',
        'G:\\Program Files (x86)\Steam\\SteamApps\\common\\Monster Hunter World',
        'H:\\Program Files (x86)\Steam\\SteamApps\\common\\Monster Hunter World',
        'C:\\SteamLibrary\\steamapps\\common\\Monster Hunter World',
        'D:\\SteamLibrary\\steamapps\\common\\Monster Hunter World',
        'E:\\SteamLibrary\\steamapps\\common\\Monster Hunter World',
        'F:\\SteamLibrary\\steamapps\\common\\Monster Hunter World',
        'G:\\SteamLibrary\\steamapps\\common\\Monster Hunter World',
        'H:\\SteamLibrary\\steamapps\\common\\Monster Hunter World',
        'D:\\MHW\\Monster Hunter World'
      ]
      this.selectgame(gamepaths)
    },
    computed: {
    },
    watch: {
      gamedir (gamepath) {
        this.gamefile(gamepath + '\\nativePC')
      }
    },
    methods: {
      dialogOperation (operation) {
        switch (operation.handle) {
          case 'createdir':
            this.createdir(operation.attribute[0], operation.attribute[1])
            this.dialog.open = false
            break
        }
      },
      selectgame (gamepaths) {
        let _this = this
        for(let i = 0; i < gamepaths.length; i++) {
          let gamepath = path.resolve(gamepaths[i])
          fs.access(gamepath + '\\MonsterHunterWorld.exe',fs.constants.F_OK, (err) => {
            if (!err) {
              _this.gamedir = gamepath
              fs.access(gamepath + '\\nativePC',fs.constants.F_OK, (err) => {
                if (!err) {
                  _this.gamefile(gamepath + '\\nativePC')
                } else {
                  _this.dialog.open = true
                  _this.dialog.text = '当前游戏目录无Mod文件夹，是否创建？'
                  _this.dialog.options = [
                    {
                      text: '确认',
                      operation: {
                        handle: 'createdir',
                        attribute: [_this.gamedir, 'nativePC']
                      }
                    }
                  ]
                }
              })
            }
          })
        }
      },
      setgame () {
        let _this = this
        dialog.showOpenDialog({ title: '选择游戏目录', properties: ['openDirectory'] }).then(result => {
          _this.gamedir = result.filePaths[0]
          fs.access(result.filePaths[0] + '\\MonsterHunterWorld.exe',fs.constants.F_OK, (err) => {
            if (!err) {
              fs.access(result.filePaths[0] + '\\nativePC',fs.constants.F_OK, (err) => {
                if (!err) {
                  _this.gamefile(_this.gamedir + '\\nativePC')
                } else {
                  _this.dialog.open = true
                  _this.dialog.text = '当前游戏目录无Mod文件夹，是否创建？'
                  _this.dialog.options = [
                    {
                      text: '确认',
                      operation: {
                        handle: 'createdir',
                        attribute: [_this.gamedir, 'nativePC']
                      }
                    }
                  ]
                }
              })
            } else {
              _this.snackbar.open = true
              _this.snackbar.color = 'error'
              _this.snackbar.text = '当前目录并非游戏目录！'
            }
          })
        }).catch(err => {
          console.log('err:' + err)
        })
      },
      gamefile (filePath) {
        let _this = this
        fs.readdir(filePath,function(err,files){
          if(err){
              console.warn(err)
          }else{
              //遍历读取到的文件列表
              files.forEach(function(filename){
                  //获取当前文件的绝对路径
                  let filedir = path.join(filePath,filename);
                  //根据文件路径获取文件信息，返回一个fs.Stats对象
                  fs.stat(filedir,function(eror,stats){
                      if(eror){
                          console.warn('获取文件stats失败')
                      }else{
                        let isFile = stats.isFile()//是文件
                        let isDir = stats.isDirectory()//是文件夹
                        let nativepath = filedir.substring(filedir.lastIndexOf("nativePC") + 9).split('\\')
                        if(isFile){
                          if (nativepath.length === 1) {
                            let filetype = nativepath[0].substring(nativepath[0].lastIndexOf(".") + 1)
                            _this.items.push({
                              name: nativepath[0],
                              file: filetype,
                              src: filedir,
                              size: stats.size,
                              ctime: stats.ctime,
                              mtime: stats.mtime,
                              edit: filetype in _this.editlist
                            })
                          } else {
                            let dir = nativepath[nativepath.length - 1]
                            let rootdir = _this.items.findIndex((n) => n.name === nativepath[0])
                            
                            if (rootdir >= 0) {
                              let children = _this.items[rootdir].children
                              children = _this.children(children, nativepath, filedir, stats)
                              _this.items[rootdir].children = children
                            }
                          }
                        }
                        if(isDir){
                          let dir = nativepath[nativepath.length - 1]
                          let rootdir = _this.items.findIndex((n) => n.name === nativepath[0])
                          
                          if (rootdir >= 0) {
                            let children = _this.items[rootdir].children
                            children = _this.children(children, nativepath, filedir, stats)
                            _this.items[rootdir].children = children
                            
                          } else {
                            _this.items.push({
                              name: dir,
                              children: [],
                            })
                          }
                          _this.gamefile(filedir)//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                      }
                  })
              })
          }
        })
      },
      children (children, nativepath, filedir, stats) {
        let nowdir = -1
        for(let i = 1; i < nativepath.length; i++) {
          if (children.length > 0) {
            nowdir = children.findIndex((n) => n.name === nativepath[i])
          }
          if (nowdir < 0) {
            if (nativepath[i].lastIndexOf(".") < 0) {
              children.push({
                name: nativepath[i],
                children: [],
              })
            } else {
              let filetype = nativepath[i].substring(nativepath[i].lastIndexOf(".") + 1)
              children.push({
                name: nativepath[i],
                file: filetype,
                src: filedir,
                size: stats.size,
                ctime: stats.ctime,
                mtime: stats.mtime,
                edit: this.editlist.includes(filetype)
              })
            }
          } else {
            let nownativepath = nativepath
            nownativepath.splice(i,1)
            children[nowdir].children = this.children(children[nowdir].children, nownativepath, filedir, stats)
          }
        }
        return children
      },
      openhex (file) {
        let _this = this
        this.cols = 2
        fs.readFile(file, function (err, data) {
          if (err) {
            console.log(err)
          } else {
            _this.$router.push('/hexedit').catch(err => {
              console.log('all good')
            })
            _this.$store.dispatch('setfile', file)
            _this.$store.dispatch('setdata', data)
          }
        })
      },
      openwee (file) {
        let _this = this
        this.cols = 2
        fs.readFile(file, function (err, data) {
          if (err) {
            console.log(err)
          } else {
            _this.$router.push('/local/edit').catch(err => {
              console.log('all good')
            })
            _this.$store.dispatch('setfile', file)
            _this.$store.dispatch('setdata', data)
          }
        })
      },
      // 文件操作
      createdir (dir, name) {
        fs.mkdir(dir + '\\' + name,{recursive:true},(err)=>{
          if(err){
            console.log(err)
          }
        })
      }
    },
  }
</script>
