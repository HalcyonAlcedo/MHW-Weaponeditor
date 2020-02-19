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
          target: ['zip','nsis']
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
          //暂时不需要加载dll文件
          //{
          //  "from": "./node_modules/electron-edge-js",
          //  "to": "../ecryption/electron-edge-js",
          //  "filter": [
          //    "**/*"
          //  ]
          //},
          //{
          //  "from": "./dll",
          //  "to": "../ecryption/dll",
          //  "filter": [
          //    "**/*"
          //  ]
          //},
          //此后考虑不再包含前置文件，这个文件太大，下载太费流量
          //{
          //  "from": "./LeadFile",
          //  "to": "../前置文件",
          //  "filter": [
          //    "**/*"
          //  ]
          //}
        ]
      }
    }
  }
}
