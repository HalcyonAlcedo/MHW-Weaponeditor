/* eslint-disable no-unused-vars */
//获取运行环境
const platform = require('os').platform()
const isDevelopment = process.env.NODE_ENV !== 'production'
const isNotWeb = platform !== 'browser'
//初始化依赖
const JSON5 = require('json5')
const Blowfish = require('egoroof-blowfish')
if (isNotWeb) {
  var path = require('path')
  var fs = require('fs')
  var {dialog, app} = require('electron').remote
}
var axios = require('axios')

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
              let configData = JSON5.parse(data)
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
  if (typeof(dataInfo.HexRuler) == 'number' || typeof(dataInfo.HexRuler) == 'string') {
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
var openfile = ( file = null,callback, error ,isPath = false, dontEncrypted = false, dir = false, _this, item) => {
  console.log(dir)
  if (file === null) { //打开外部文件
    if (isNotWeb) {
      dialog.showOpenDialog({
        properties: [dir ? 'openDirectory' : 'openFile']
      }).then(result => {
        let f = result.filePaths[0]
        if(f) {
          if (dir) {
            GetFileList(f, _this, item)
          } else {
            openfile(f, callback, error, true, dontEncrypted)
          }
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
          }
        }
        //读取文件并执行操作
        fs.readFile(filepath, function (err, data) {
          if (err) {
            console.err('openfile err:', err)
            error(err)
          } else {
            //判断是否为加密文件
            let key = CryptographicKey(GetExtname(filepath))
            if(key && !dontEncrypted) data = decoded(key, data)
            callback(Old_version, filepath, data)
          }
        })
      })
    } else {
      let getfile = file
      axios({
        method: 'get',
        url: '/Sourceweapon/' + getfile, // 请求地址
        responseType: 'arraybuffer' // 表明返回服务器返回的数据类型
      }).then((res) => { // 处理返回的文件流
        let content = res.data
        let data = new Uint8Array(content)
        let key = CryptographicKey(GetExtname(getfile))
        if(key && !dontEncrypted) data = decoded(key, data)
        callback(null, file, data)
      }).catch(function(err){
        console.err('openfile err:', err)
        error(err)
      })
    }
  }
}
//保存文件
var savefile = ( title, file, data, callback, error , dontEncrypted = false) => {
  let key = CryptographicKey(GetExtname(file))
  if(key && !dontEncrypted) {
    data = encoded(key, data)
  }
  if (isNotWeb) {
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
  } else {
    let url = window.URL.createObjectURL(new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
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

//加密文件
var EncodedFile = (filepath, data) => {
  let filename =  filepath.substring(filepath.lastIndexOf('\\') + 1)
  if(filename.substr(filename.length - 2,2) == '_d') filename = filename.substring(0, filename.length - 2)
  let key = CryptographicKey(GetExtname(filepath))
  if (key) {
    data = encoded(key, data)
    savefile( 'Save File', filename, data, () => {
      console.log('转换成功')
    }, null, true)
  } else {
    console.log('密钥错误')
  }
}

//解密文件
var DecodedFile = (filepath, data) => {
  let filename =  filepath.substring(filepath.lastIndexOf('\\') + 1)
  let key = CryptographicKey(GetExtname(filepath))
  if (key) {
    data = decoded(key, data)
    savefile( 'Save File', filename + '_d', data, () => {
      console.log('转换成功')
    }, null, true)
  } else {
    console.log('密钥错误')
  }
}
//获取文件密钥
function CryptographicKey(filename) {
  let key = false
  if(filename.substr(filename.length - 2,2) == '_d') filename = filename.substring(0, filename.length - 2)
  console.log(filename)
  switch (filename) {
    case '.rod_inse':
      key = 'SFghFQVFJycHnypExurPwut98ZZq1cwvm7lpDpASeP4biRhstQgULzlb'
      break;
    case '.owp_dat':
      key = 'FZoS8QLyOyeFmkdrz73P9Fh2N4NcTwy3QQPjc1YRII5KWovK6yFuU8SL'
      break;
    case '.shlp':
      key = 'FZoS8QLyOyeFmkdrz73P9Fh2N4NcTwy3QQPjc1YRII5KWovK6yFuU8SL'
      break;
    case '.plp':
      key = 'j1P15gEkgVa7NdFxiqwCPitykHctY2nZPjSaElvqb0eSwcLO1cOlTqqv'
      break;
    case '.plsp':
      key = 'j1P15gEkgVa7NdFxiqwCPitykHctY2nZPjSaElvqb0eSwcLO1cOlTqqv'
      break;
    case '.plip':
      key = 'j1P15gEkgVa7NdFxiqwCPitykHctY2nZPjSaElvqb0eSwcLO1cOlTqqv'
      break;
    case '.asp':
      key = 'Nb06gpPJ9WtbO6FF1ZYqm5NbLREsCzuqAY0G25ug2Ei5XkkAtVXD5Uda'
      break;
    case '.cus_pa':
      key = 'PCEBFfRCbwIdy6AZIoNA5lXV6FEki0yBEyW4FPXZUyWgeauqY8PYeZkM'
      break;
    case '.cus_par':
      key = 'PCEBFfRCbwIdy6AZIoNA5lXV6FEki0yBEyW4FPXZUyWgeauqY8PYeZkM'
      break;
    case '.msk':
      key = 'qm7psvaMXQoay7kARXpNPcLNWqsbqcOyI4lqHtxFh26HSuE6RHNq7J4e'
      break;
    case '.dtt_eda':
      key = 'Fqkpg1xx1cMlvg3AtKOCLxFgVFBwHkCbjizBRV49hWmEe5lOAaNOTm7m'
      break;
    case '.dtt_epg':
      key = 'sJV4g7d55gKnQB5nS6XJ9pZ1qZmmQwNnSbidUW1OeAhHrpPd6MKbfsrt'
      break;
    default:
      key = false
      break;
  }
  return key
}
//加密功能
function encoded (key, data) {
  data = BSwap(data)
  let bf = new Blowfish(key)
  let ecoded = bf.encode(data)
  ecoded = BSwap(ecoded)
  return ecoded
}
//解密功能
function decoded (key, data) {
  data = BSwap(data)
  let bf = new Blowfish(key)
  let decoded = bf.decode(data, Blowfish.TYPE.UINT8_ARRAY)
  decoded = BSwap(decoded)
  return decoded
}

function BSwap(data) {
  var result = new Buffer(data.length);
  for (let i = 0; i < data.length; i += 4)
  {
      result[i] = data[i + 3];
      result[i + 1] = data[i + 2];
      result[i + 2] = data[i + 1];
      result[i + 3] = data[i];
  }
  return result;
}
function GetExtname(file) {
  if (isNotWeb) {
    return path.extname(file)
  } else {
    return file.substring(file.lastIndexOf('.'))
  }
}

//多语言载入
var MultiLanguage = (callback) => {
  if (isNotWeb) {
    let LanguagePath = isDevelopment ? path.join(__static, '/Language/') : path.join(__static, '../../Language/')
    fs.readdir( LanguagePath, function( err, paths ){
      if (!err) {
        paths.forEach(function( filepath ){
          fs.readdir( path.join(LanguagePath, filepath), function( err, LanguageFilepaths ){
            for(let i = 0;i < LanguageFilepaths.length; i++) {
              let languagePath = path.join(LanguagePath, filepath + '/' + LanguageFilepaths[i])
              fs.readFile(languagePath, 'utf8',function (err, data) {
                if (err) {
                  console.log('文件加载失败')
                } else {
                  let LanguageData = JSON5.parse(data)
                  callback(LanguageData, filepath, LanguageFilepaths[i].substring(0, LanguageFilepaths[i].lastIndexOf('.')))
                }
              })
            }
          })
        });
      } else {
        console.log('文件列表加载失败')
      }
    })
  } else {
    console.log('网页版不加载')
  }
}
//获取授权
var GenerateLicense = (id, time, callback) => {
  let filepath = path.join(__static, '../../license')
  fs.access(filepath,fs.constants.F_OK, (err) => {
    if (!err) {
      fs.readFile(filepath, function (err, data) {
        if (!err && data.length > 0) {
          let lic = JSON5.parse(data)
          let licdate = new Date(lic.time)
          let date = new Date()
          if ((lic.UUID === id && licdate > date) || lic.inside == 'developers:3honesty_sway_Grimm_hits5_jilt_culminate7_surrender_decent4_8Humid_permit4_feed5_Midst') {
            callback(licdate.toLocaleDateString())
          } else {
            onlyLicense(id, callback)
          }
        } else {
          onlyLicense(id, callback)
        }
      })
    } else {
      onlyLicense(id, callback)
    }
  })
}
//申请授权
var onlyLicense = (id, callback) => {
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
      writeLocalLicense(res.data.UUID, res.data.time)
      callback(res.data.time)
    }
  })
}
//写入本地授权
function writeLocalLicense (id, time) {
  let license = {
    UUID: id,
    time: time
  }
  let filepath = path.join(__static, '../../license')
  fs.writeFile(filepath, JSON.stringify(license),  function(err) {
    if (err) {
      return console.error(err);
    }
  });
}
//获取目录下的文件
var GetFileList = (filePath, _this, item) => {
  //获取目录中文件列表
  fs.readdir(filePath, (err,files) => {
    if(err){
        console.warn(err)
    }else{
      //遍历读取到的文件列表
      files.forEach(function(filename){
        //获取当前文件的绝对路径
        let filedir = path.join(filePath,filename)
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir,function(eror,stats){
            if(eror){
                console.warn('获取文件stats失败')
            }else{
              let isFile = stats.isFile()//是文件
              let isDir = stats.isDirectory()//是文件夹
              if(isFile){
                let filename = filedir.substring(filedir.lastIndexOf('\\') + 1)
                _this[item].push({
                  file: filedir,
                  filename: filename,
                  key: CryptographicKey(filename)
                })
              }
              if(isDir){
                GetFileList(filedir)//递归，如果是文件夹，就继续遍历该文件夹下面的文件
              }
            }
        })
      })
    }
  })
}
export default {
  notWeb: isNotWeb,
  openfile: openfile,
  savefile: savefile,
  APPOperation: APPOperation,
  AddedConfig: AddedConfig,
  encoded: encoded,
  decoded: decoded,
  encodedFile: EncodedFile,
  decodedFile: DecodedFile,
  CryptographicKey: CryptographicKey,
  MultiLanguage: MultiLanguage,
  GenerateLicense: GenerateLicense,
  onlyLicense: onlyLicense
}