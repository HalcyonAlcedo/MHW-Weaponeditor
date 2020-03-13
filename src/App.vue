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
  import edit_core from './plugins/edit_core'
  // import JSON5 from 'json5'
  // import fs from 'fs'
  // import path from 'path'
  
  import {machineIdSync} from 'node-machine-id'

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
      this.$store.dispatch('setuuid', id)
      edit_core.GenerateLicense(id, null, (time) => {
        _this.lictime = time
        _this.snackbar = true
        _this.$store.dispatch('setlicense', true)
      })
    }
  }
</script>
<style lang="scss">
  body::-webkit-scrollbar {
    display: none;
  }
</style>