import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'zh_tw',
  fallbackLocale: 'zh_cn',
  messages: {
    'zh_cn': require('./locales/zh-cn'),
    'zh_tw': require('./locales/zh-tw')
  }
})
