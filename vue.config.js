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
        copyright: 'Copyright © 2020 Alcedo',
        win: {
          target: ['zip']
        },
        extraResources:  [
          {
            "from": "./node_modules/electron-asar-hot-updater/updater.exe",
            "to": "../updater.exe"
          },
          {
            "from": "./node_modules/regedit/vbs",
            "to": "../regedit/vbs",
            "filter": [
              "**/*"
            ]
          },
          {
            "from": "./node_modules/electron-edge-js",
            "to": "../ecryption/electron-edge-js",
            "filter": [
              "**/*"
            ]
          },
          {
            "from": "./dll",
            "to": "../ecryption/dll",
            "filter": [
              "**/*"
            ]
          },
          {
            "from": "./LeadFile",
            "to": "../前置文件",
            "filter": [
              "**/*"
            ]
          }
        ]
      }
    }
  }
}
