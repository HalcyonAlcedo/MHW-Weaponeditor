import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueI18n)

/* i18n */

/*
let fs = require('fs')
let langdir = './lang/'
let lang = []
for (let file = fs.readdirSync(langdir), i = 0; i < file.length; i++) {
  lang.push(file[i])
}
console.log(lang)
*/

const i18n = new VueI18n({
  locale: 'zh_tw',
  messages: {
    'zh_cn': require('./components/lang/zh_cn'),
    'zh_tw': require('./components/lang/zh_tw'),
    'en': require('./components/lang/en')
  }
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: '<App/>'
}).$mount('#app')
