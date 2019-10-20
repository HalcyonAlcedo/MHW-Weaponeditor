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
  </v-snackbar>
</v-app>
</template>

<script>
  import axios from 'axios'
  import fs from 'fs'
  import path from 'path'
  
  import {machineId, machineIdSync} from 'node-machine-id'

  export default {
    data () {
      return {
        snackbar: false,
      }
    },
    mounted () {
      let _this = this
      let id = machineIdSync()
      _this.$store.dispatch('setuuid', id)
      let filepath = path.join(__static, '../../license')
      fs.access(filepath,fs.constants.F_OK, (err) => {
        if (!err) {
          fs.readFile(filepath, function (err, hexdata) {
            if (!err) {
              console.log('暂不支持')
            } else {
              console.log('授权文件错误')
            }
          })
        } else {
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
              _this.snackbar = true
              _this.$store.dispatch('setlicense', true)
            }
          })
        }
      })
    }
  }
</script>
<style lang="scss">
  body::-webkit-scrollbar {
    display: none;
  }
</style>