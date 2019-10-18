<template>
<v-app>
  <router-view></router-view>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        Mod开发人员
      </v-card-title>

      <v-card-text>
        您拥有版软件高级功能使用许可，可以使用本软件全部功能。
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="dialog = false"
        >
          确认
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
        dialog: false,
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
              _this.dialog = true
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