module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  pluginOptions: {
    i18n: {
      locale: 'zh-tw',
      fallbackLocale: 'zh-tw',
      localeDir: 'locales',
      enableInSFC: false
    },
    electronBuilder: {
      builderOptions: {
        productName: 'MHW Equipment Editor',
        copyright: 'Copyright © 2022 Alcedo',
        win: {
          target: ['zip','nsis']
        },
        extraResources:  [
          {
            "from": "./node_modules/electron-asar-hot-updater/updater.exe",
            "to": "../updater.exe"
          }
        ]
      }
    }
  }
}
