<template>
<v-app>
  <router-view></router-view>
  <v-snackbar
    v-model="snackbar"
    bottom
    color="cyan darken-2"
    left
    multi-line
    :timeout="6000"
  >
    尊敬的Mod开发人员，您拥有版软件高级功能使用许可，可以使用本软件全部功能。
    <v-subheader>当前许可有效期：{{lictime}}</v-subheader>
  </v-snackbar>
</v-app>
</template>

<script>
  import axios from 'axios'
  import fs from 'fs'
  import path from 'path'

  import {machineId, machineIdSync} from 'node-machine-id'
  
  const software = path.join(__static, '../../')

  export default {
    data () {
      return {
        snackbar: false,
        lictime: ''
      }
    },
    mounted () {
      let _this = this
      let id = machineIdSync()
      _this.$store.dispatch('setuuid', id)
      let filepath = path.join(software, 'license')
      fs.access(filepath,fs.constants.F_OK, (err) => {
        if (!err) {
          fs.readFile(filepath, function (err, data) {
            if (!err && data.length > 0) {
              let lic = JSON.parse(data)
              let licdate = new Date(lic.time)
              let date = new Date()
              if (lic.UUID === id && licdate > date) {
                _this.lictime = licdate.toLocaleDateString()
                _this.snackbar = true
                _this.$store.dispatch('setlicense', true)
              } else {
                _this.onlyLicense(id)
              }
            } else {
              _this.onlyLicense(id)
            }
          })
        } else {
          _this.onlyLicense(id)
        }
      })
      let modConfig = software + '\\gamemodes\\modeInstallInfo.json'
      fs.access(modConfig,fs.constants.F_OK, (err) => {
        if(!err) {
          fs.readFile(modConfig,function (err, data) {
            if(!err) {
              let modinfo = JSON.parse(data)
            }
          })
        } else {
          let modinfo = JSON.stringify({
            modes: []
          }, null, "\t")
          fs.writeFile(modConfig, modinfo, function(err){})
        }
      })
      let Config = software + '\\config.json'
      fs.access(Config,fs.constants.F_OK, (err) => {
        if(!err) {
          fs.readFile(Config,function (error, data) {
            if(!error) {
              let modinfo = JSON.parse(data)
              if(modinfo.gamePath !== '') {
                _this.$store.dispatch('setgamePath', modinfo.gamePath)
              }
            }
          })
        } else {
          let gamepaths = [
            'C:\\Program Files (x86)\\Steam\\SteamApps\\common\\Monster Hunter World',
            'D:\\Program Files (x86)\\Steam\\SteamApps\\common\\Monster Hunter World',
            'E:\\Program Files (x86)\\Steam\\SteamApps\\common\\Monster Hunter World',
            'F:\\Program Files (x86)\\Steam\\SteamApps\\common\\Monster Hunter World',
            'G:\\Program Files (x86)\\Steam\\SteamApps\\common\\Monster Hunter World',
            'H:\\Program Files (x86)\\Steam\\SteamApps\\common\\Monster Hunter World',
            'C:\\SteamLibrary\\steamapps\\common\\Monster Hunter World',
            'D:\\SteamLibrary\\steamapps\\common\\Monster Hunter World',
            'E:\\SteamLibrary\\steamapps\\common\\Monster Hunter World',
            'F:\\SteamLibrary\\steamapps\\common\\Monster Hunter World',
            'G:\\SteamLibrary\\steamapps\\common\\Monster Hunter World',
            'H:\\SteamLibrary\\steamapps\\common\\Monster Hunter World',
          ]
          for(let i = 0; i < gamepaths.length; i++) {
            let gamepath = path.resolve(gamepaths[i])
            fs.access(gamepath + '\\MonsterHunterWorld.exe',fs.constants.F_OK, (err) => {
              if (!err) {
                console.log('app game 搜索')
                console.log(gamepath)
                _this.$store.dispatch('setgamePath', gamepath)
                let modinfo = JSON.stringify({
                  gamePath: gamepath
                }, null, "\t")
                fs.writeFile(Config, modinfo, function(err){})
              }
            })
          }
          
        }
      })
    },
    watch: {
    },
    computed: {
    },
    methods: {
      generateLicense (id, time) {
        let license = {
          UUID: id,
          time: time
        }
        let filepath = path.join(__static, '../../license')
        fs.writeFile(filepath, JSON.stringify(license),  function(err) {
          if (err) {
            return console.error(err);
          }
        });
      },
      onlyLicense (id) {
        let _this = this
        axios({
          method: 'post',
          url: 'https://mhwee.com/authorization.php', // 请求地址
          headers:{
            'Content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            UUID: id
          },
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          responseType: 'json' // 表明返回服务器返回的数据类型
        }).then((res) => { // 处理返回的文件流
          if (res.data.state) {
            _this.generateLicense(res.data.UUID, res.data.time)
            _this.lictime = res.data.time
            _this.snackbar = true
            _this.$store.dispatch('setlicense', true)
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  body::-webkit-scrollbar {
    display: none;
  }
</style>