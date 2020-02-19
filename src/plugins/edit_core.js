/* eslint-disable no-unused-vars */
//获取运行环境
const platform = require('os').platform()
const isDevelopment = process.env.NODE_ENV !== 'production'
const isNotWeb = platform !== 'browser'
//初始化依赖
if (isNotWeb) {
  var path = require('path')
  var fs = require('fs')
  var {dialog, app} = require('electron').remote
} else {
  var axios = require('axios')
}

var AddedConfig = (callback, error, internal = false) => {
  if (isNotWeb && !internal) {
    let configPath = isDevelopment ? path.join(__static, '/config/') : path.join(__static, '../../config/')
    fs.readdir( configPath, function( err, paths ){
      if (!err) {
        paths.forEach(function( filepath ){
          let requirePath = path.join(configPath, filepath)
          fs.readFile(requirePath, 'utf8',function (err, data) {
            if (err) {
              error(err)
            } else {
              let configData = JSON.parse(data)
              configData.dataInfo = ProcessData(configData.dataInfo)
              if(configData.modeFile !== undefined) {
                let configLoadFile = path.join(__static, '../../Sourceweapon/' + configData.modeFile)
                fs.access(configLoadFile,fs.constants.F_OK, (err) => {
                  if (err) {
                    //如果没有替换文件夹，设置为主文件夹路径
                    configLoadFile = path.join(__static, '/Sourceweapon/' + configData.modeFile)
                    fs.access(configLoadFile,fs.constants.F_OK, (err) => {
                      if (!err) {callback(configData)}
                    })
                  } else {
                    callback(configData)
                  }
                })
              }
            }
          })
        });
      } else {
        AddedConfig(callback, error, true)
      }
    })
  } else {
    console.log('导入内部数据')
  }
}


// 格式化传入的配置信息
var ProcessData = (dataInfo) => { 
  let defaultDataInfo = {
    HexRuler: null,
    HexPointer: {},
    StartOffset: 10
  }
  if (!dataInfo) {
    return defaultDataInfo
  }
  //检查资料完整性并填充至默认数据中
  if (typeof(dataInfo.HexRuler) == 'number') {
    defaultDataInfo.HexRuler = dataInfo.HexRuler
  }
  if (dataInfo.HexPointer) {
    defaultDataInfo.HexPointer = dataInfo.HexPointer
  }
  if (typeof(dataInfo.StartOffset) == 'number') {
    defaultDataInfo.StartOffset = dataInfo.StartOffset
  }
  //将数据格式转换为处理程序所需的格式
  for(let i in defaultDataInfo.HexPointer) {
    if (
      defaultDataInfo.HexPointer[i] instanceof Array &&
      defaultDataInfo.HexPointer[i].length >= 2) {
      defaultDataInfo.HexPointer[i][0] += parseInt((defaultDataInfo.StartOffset + (defaultDataInfo.HexPointer[i][1] - 1)))
    }
  }
  return defaultDataInfo
}

//打开文件
var openfile = ( file = null,callback, error ,isPath = false ) => {
  if (file === null) { //打开外部文件
    if (isNotWeb) {
      dialog.showOpenDialog({
        properties: ['openFile']
      }).then(result => {
        let f = result.filePaths[0]
        if(f) {
          openfile(f, callback, error, true)
        } else {
          error('用户取消打开操作')
        }
      }).catch(err => {
        console.log('err:' + err)
        error(err)
      })
    } else {
      callback(null, null, null)
    }
  } else { //文件加载
    if (isNotWeb) {
      //检查是否有替换文件夹
      let Old_version = false
      let filepath = file
      if (!isPath) {
        //打开内部文件
        filepath = path.join(__static, '../../Sourceweapon/' + file) //文件夹路径
      }
      fs.access(filepath,fs.constants.F_OK, (err) => {
        if (!isPath) {
          if (err) {
            //如果没有替换文件夹，设置为主文件夹路径
            filepath = path.join(__static, '/Sourceweapon/' + file)
          }/* else {
            Old_version = true
          }*/
        }
        //读取文件并执行操作
        fs.readFile(filepath, function (err, data) {
          if (err) {
            console.err('openfile err:', err)
            error(err)
          } else {
            //判断是否为加密文件
            let filename = path.extname(filepath)
            let key = false
            switch (filename) {
              case '.rod_inse':
                key = 'SFghFQVFJycHnypExurPwut98ZZq1cwvm7lpDpASeP4biRhstQgULzlb'
                break;
              case '.owp_dat':
                key = 'FZoS8QLyOyeFmkdrz73P9Fh2N4NcTwy3QQPjc1YRII5KWovK6yFuU8SL'
                break;
              case '.plp':
                key = 'j1P15gEkgVa7NdFxiqwCPitykHctY2nZPjSaElvqb0eSwcLO1cOlTqqv'
                break;
              case '.plsp':
                key = 'j1P15gEkgVa7NdFxiqwCPitykHctY2nZPjSaElvqb0eSwcLO1cOlTqqv'
                break;
              case '.asp':
                key = 'Nb06gpPJ9WtbO6FF1ZYqm5NbLREsCzuqAY0G25ug2Ei5XkkAtVXD5Uda'
                break;
              case '.cus_pa':
                key = 'PCEBFfRCbwIdy6AZIoNA5lXV6FEki0yBEyW4FPXZUyWgeauqY8PYeZkM'
                break;
              default:
                key = false
                break;
            }
            if(key) {
              app.fileDencryption(callback, {
                Oldversion: Old_version,
                filepath: filepath,
                hex: data,
                key: key,
              });
            } else {
              callback(Old_version, filepath, data)
            }
          }
        })
      })
    } else {
      let getfile = file
      switch (file) {
        case 'rod_insect.rod_inse':
          getfile = 'Decode/rod_insect.rod_inse'
          file = 'rod_insect.rod_inse_d'
          break;
      }
      axios({
        method: 'get',
        url: '/Sourceweapon/' + getfile, // 请求地址
        responseType: 'arraybuffer' // 表明返回服务器返回的数据类型
      }).then((res) => { // 处理返回的文件流
        let content = res.data
        let data = new Uint8Array(content)
        callback(null, file, data)
      }).catch(function(err){
        console.err('openfile err:', err)
        error(err)
      })
    }
  }
}
//保存文件
var savefile = ( title, file, data, callback, error ) => {
  if (isNotWeb) {
    let key = false
    switch (file) {
      case 'rod_insect.rod_inse':
        key = 'SFghFQVFJycHnypExurPwut98ZZq1cwvm7lpDpASeP4biRhstQgULzlb'
        break;
      case 'otomoWeapon.owp_dat':
        key = 'FZoS8QLyOyeFmkdrz73P9Fh2N4NcTwy3QQPjc1YRII5KWovK6yFuU8SL'
        break;
      case '.plp':
        key = 'j1P15gEkgVa7NdFxiqwCPitykHctY2nZPjSaElvqb0eSwcLO1cOlTqqv'
        break;
      case '.plsp':
        key = 'j1P15gEkgVa7NdFxiqwCPitykHctY2nZPjSaElvqb0eSwcLO1cOlTqqv'
        break;
      case '.asp':
        key = 'Nb06gpPJ9WtbO6FF1ZYqm5NbLREsCzuqAY0G25ug2Ei5XkkAtVXD5Uda'
        break;
      case '.cus_pa':
        key = 'PCEBFfRCbwIdy6AZIoNA5lXV6FEki0yBEyW4FPXZUyWgeauqY8PYeZkM'
        break;
      default:
        key = false
        break;
    }
    if(key) {
      app.fileEncryption((EncryptionData) => {
        dialog.showSaveDialog({ title: title, defaultPath: file }).then(result => {
          fs.writeFile(result.filePath, EncryptionData, { flag: 'w' }, function (err) {
            if (err) {
              console.err('savefile err:', err)
              error(err)
            } else {
              callback()
            }
          })
        }).catch(err => {
          console.err('savefile err:', err)
          error(err)
        })
      }, {
        hex: data,
        key: key,
      });
    } else {
      dialog.showSaveDialog({ title: title, defaultPath: file }).then(result => {
        fs.writeFile(result.filePath, data, { flag: 'w' }, function (err) {
          if (err) {
            console.err('savefile err:', err)
            error(err)
          } else {
            callback()
          }
        })
      }).catch(err => {
        console.err('savefile err:', err)
        error(err)
      })
    }
  } else {
    let url = window.URL.createObjectURL(new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    switch (file) {
      case 'rod_insect.rod_inse':
        file = 'rod_insect.rod_inse_d'
        break;
    }
    link.setAttribute('download', file)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
//电子操作
var APPOperation = (Operation) => {
  switch (Operation) {
    case 'hide':
      app.hide_window()
      break;
    case 'closed':
      app.quit()
      break;
  }
}
//载入外部依赖
var load_environment = (callback) => {
  app.load_environment(callback)
}

export default {
  notWeb: isNotWeb,
  openfile: openfile,
  savefile: savefile,
  APPOperation: APPOperation,
  load_environment: load_environment,
  AddedConfig: AddedConfig,
}