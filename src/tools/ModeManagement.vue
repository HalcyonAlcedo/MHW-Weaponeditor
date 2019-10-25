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
        
        <v-dialog v-model="addmode" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn class="ma-2" tile outlined color="success" v-on="on">
              <v-icon left>mdi-pencil</v-icon> 本地添加Mod
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Mod加载</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field label="Mod名称*" required v-model="addNewMod.name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field label="游戏版本" required v-model="addNewMod.version"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Mod文件*"
                      prepend-icon="mdi-folder"
                      v-model="addNewMod.path"
                      @click:prepend="setLocalMod"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="['模型', '音效', '装备数据', '综合', '其他']"
                      label="Mod类型"
                      v-model="addNewMod.type"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field label="文件Md5" required v-model="addNewMod.md5"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*本地Mod无法进行云校验，无法确保Mod兼容性</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="addmode = false">取消</v-btn>
              <v-btn color="blue darken-1" text @click="installLocalMod">加载</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
            <v-icon v-if="!item.type">
              {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            </v-icon>
            <v-icon v-else>
              {{ files[item.type] }}
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
                    Mod属性
                  </v-tab>
                  <v-tab>
                    自定义选项
                  </v-tab>
                  <v-tab @click="modefile(selection.src)">
                    Mod文件
                  </v-tab>
                  <v-tab>
                    操作
                  </v-tab>

                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <v-row
                          class="text-left"
                          tag="v-card-text"
                        >
                          <v-col class="text-right" tag="strong" cols="5">Mod类型:</v-col>
                          <v-col cols="7">{{selection.type}}</v-col>
                          <v-col class="text-right" tag="strong" cols="5">适用版本:</v-col>
                          <v-col cols="7">{{selection.version}}</v-col>
                          <v-col class="text-right" tag="strong" cols="5">存储目录:</v-col>
                          <v-col cols="7">{{selection.src}}</v-col>
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
                        <!-- Mod文件内容 -->
                        <v-row
                          class="text-left"
                          tag="v-card-text"
                        >
                          <v-treeview
                            v-model="modtree"
                            :open="open"
                            :items="moditems"
                            activatable
                            item-key="name"
                            open-on-click
                            selected-color="indigo"
                          >
                            <template v-slot:prepend="{ item, open }">
                              <v-icon v-if="!item.type">
                                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                              </v-icon>
                              <v-icon v-else>
                                {{ files[item.type] }}
                              </v-icon>
                            </template>
                          </v-treeview>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
                        <!-- 操作 -->
                        <v-row
                          class="text-left"
                          tag="v-card-text"
                        >
                          <v-btn class="ma-2" tile outlined color="success" disabled>
                            <v-icon left>mdi-pencil</v-icon> 安装Mod
                          </v-btn>
                          <v-btn class="ma-2" tile outlined color="success" disabled>
                            <v-icon left>mdi-pencil</v-icon> 卸载Mod
                          </v-btn>
                          <v-btn class="ma-2" tile outlined color="error" @click="removedir(selection.src)">
                            <v-icon left>mdi-pencil</v-icon> 移除Mod
                          </v-btn>
                          <v-btn class="ma-2" tile outlined color="warning" @click="packzip(selection.src, selection.name)">
                            <v-icon left>mdi-pencil</v-icon> 导出Mod
                          </v-btn>
                        </v-row>
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
  import crypto from 'crypto'
  import zipper from 'zip-local'

  const {dialog} = require('electron').remote
  const software = path.join(__static, '../../')

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
      addNewMod: {
        name: '',
        path: '',
        version: '',
        type: '',
        md5: ''
      },
      moddir: '',
      tree: [],
      modtree: [],
      items: [],
      moditems: [],
      modelist: [],
      cols: 5,
      addmode: false,
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
      let modepath = software + '\\gamemodes'
      let _this = this
      fs.access(modepath,fs.constants.F_OK, (err) => {
        if (!err) {
          _this.moddir = modepath
          _this.getModeList()
        } else {
          _this.createdir(software, 'gamemodes')
        }
      })
    },
    computed: {
    },
    watch: {
      active () {
        this.moditems = []
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
      setLocalMod () {
        let _this = this
        dialog.showOpenDialog({
          title: '选择Mod文件',
          properties: ['openFile'],
          filters: [
            { name: 'zip', extensions: ['zip'] },
          ]
        }).then(result => {
          _this.addNewMod.path = result.filePaths[0]
          _this.addNewMod.name = result.filePaths[0].substring(result.filePaths[0].lastIndexOf('\\') + 1).slice(0, -4)
          // md5
          let rs = fs.createReadStream(result.filePaths[0])
          let hash = crypto.createHash('md5')
          rs.on('data', hash.update.bind(hash))
          rs.on('end', function () {
            _this.addNewMod.md5 = hash.digest('hex')
          })
        }).catch(err => {
          console.log('err:' + err)
        })
      },
      installLocalMod () {
        let _this = this
        let unzippath = path.join(software, '/gamemodes/' + _this.addNewMod.md5)
        fs.access(unzippath,fs.constants.F_OK, (err) => {
          if (!err) {
            _this.snackbar.open = true,
            _this.snackbar.text = '改模组已存在库中',
            _this.snackbar.color = 'error'
          } else {
            fs.mkdir(unzippath,{recursive:true},(err)=>{
              if(!err){
                zipper.unzip(_this.addNewMod.path, function(error, unzipped) {
                  if(!error) {
                    let unzippedfs = unzipped.memory()
                    let zipFileList = unzippedfs.contents()

                    let modinfo = JSON.stringify({
                      name: _this.addNewMod.name,
                      version: _this.addNewMod.version,
                      type: _this.addNewMod.type,
                      md5: _this.addNewMod.md5
                    }, null, "\t")
                    fs.writeFile(path.join(unzippath, '/modinfo.json'),modinfo,function(err){
                      if (err) {
                        // _this.snackbar.open = true,
                        // _this.snackbar.text = '生成描述文件失败，即将移除模组',
                        // _this.snackbar.color = 'error'
                        // _this.removedir(unzippath)
                      }
                    })
                    for(let i = 0; i < zipFileList.length; i++) {
                      if (zipFileList[i].lastIndexOf("nativePC") == 0) {
                        unzipped.save(unzippath)
                        _this.getModeList()
                        break
                      } else if (i == zipFileList.length - 1) {
                        unzippath = path.join(unzippath, '/nativePC')
                        fs.mkdir(unzippath,{recursive:true},(err)=>{
                          if(!err){
                            unzipped.save(unzippath)
                            _this.getModeList()
                          }
                        })
                      }
                    }
                    _this.addNewMod = {
                      name: '',
                      path: '',
                      version: '',
                      type: '',
                      md5: ''
                    }
                  }
                  _this.addmode = false
                })
              }
            })
          }
        })
        
      },
      getModeList () {
        let _this = this
        let filePath = software + '\\gamemodes'
        this.items = []
        this.active = []
        fs.readdir(filePath,function(err,files){
          if(err){
            _this.snackbar.open = true,
            _this.snackbar.text = '读取Mod文件数据失败！',
            _this.snackbar.color = 'error'
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
                        let modespath = filedir.substring(filedir.lastIndexOf("gamemodes") + 10).split('\\')
                        if(isFile){
                          // 可能添加在线获取渠道
                        }
                        if(isDir){
                          let dir = modespath[modespath.length - 1]
                          fs.readFile(path.join(filedir,'/modinfo.json'),function (err, data) {
                            if(!err) {
                              let modinfo = JSON.parse(data)
                              if (modinfo.md5 === dir) {
                                _this.items.push({
                                  name: modinfo.name,
                                  type: modinfo.type,
                                  version: modinfo.version,
                                  src: filedir,
                                })
                              }
                            }
                          })
                        }
                      }
                  })
              })
          }
        })
      },
      modefile (filePath) {
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
                            _this.moditems.push({
                              name: nativepath[0],
                              type: filetype,
                              src: filedir,
                              size: stats.size,
                              ctime: stats.ctime,
                              mtime: stats.mtime,
                              edit: filetype in _this.editlist
                            })
                          } else {
                            let dir = nativepath[nativepath.length - 1]
                            let rootdir = _this.moditems.findIndex((n) => n.name === nativepath[0])
                            
                            if (rootdir >= 0) {
                              let children = _this.moditems[rootdir].children
                              children = _this.children(children, nativepath, filedir, stats)
                              _this.moditems[rootdir].children = children
                            }
                          }
                        }
                        if(isDir){
                          let dir = nativepath[nativepath.length - 1]
                          let rootdir = _this.moditems.findIndex((n) => n.name === nativepath[0])
                          
                          if (rootdir >= 0) {
                            let children = _this.moditems[rootdir].children
                            children = _this.children(children, nativepath, filedir, stats)
                            _this.moditems[rootdir].children = children
                            
                          } else {
                            _this.moditems.push({
                              name: dir,
                              children: [],
                            })
                          }
                          _this.modefile(filedir)//递归，如果是文件夹，就继续遍历该文件夹下面的文件
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
                type: filetype,
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
      },
      removedir (dir) {
        let _this = this
        if (fs.existsSync(dir)) {
          fs.readdirSync(dir).forEach(function(file) {
            let curPath = dir + "/" + file
            if(fs.statSync(curPath).isDirectory()) {
              _this.removedir(curPath)
            } else {
              fs.unlinkSync(curPath)
              if (file === 'modinfo.json') {
                _this.getModeList()
                _this.snackbar.open = true,
                _this.snackbar.text = '模组已移除',
                _this.snackbar.color = 'success'
              }
            }
          })
          fs.rmdirSync(dir)
        } else {
          return true
        }
      },
      packzip (mode, file) {
        let _this = this
        zipper.zip(path.join(mode,'/nativePC'), function(error, zipped) {
          if(!error) {
            zipped.compress()
            let buff = zipped.memory()
            dialog.showSaveDialog({ 
              title: file,
              defaultPath: file,
              filters: [
                { name: 'zip', extensions: ['zip'] },
              ]
            }).then(result => {
              zipped.save(result.filePath, function(error) {
                if(!error) {
                  _this.snackbar.open = true,
                  _this.snackbar.text = '导出文件成功',
                  _this.snackbar.color = 'success'
                } else {
                  _this.snackbar.open = true,
                  _this.snackbar.text = '导出文件失败',
                  _this.snackbar.color = 'error'
                }
              })
            }).catch(err => {
              console.log('err:' + err)
            })
          }
        })
      }
    },
  }
</script>
