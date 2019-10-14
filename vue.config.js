module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    },
    electronBuilder: {
      builderOptions: {
        productName: 'MHWEE',
        copyright: 'Copyright © 2019 Alcedo',
        asarUnpack:['Sourceweapon']
      }
    }
  }
}
