const platform = require('os').platform()
var isNotWeb = platform !== 'browser'

if (isNotWeb) {
  var path = require('path')
  var fs = require('fs')
  var {dialog, app} = require('electron').remote
} else {
  var axios = require('axios')
}


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
          } else {
            Old_version = true
          }
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

var savefile = ( title, file, data, callback, error ) => {
  if (isNotWeb) {
    let key = false
    switch (file) {
      case 'rod_insect.rod_inse':
        key = 'SFghFQVFJycHnypExurPwut98ZZq1cwvm7lpDpASeP4biRhstQgULzlb'
        break;
      default:
        key = false
        break;
    }
    if(key) {
      console.log(app)
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

var load_environment = (callback) => {
  app.load_environment(callback)
}

export default {
  notWeb: isNotWeb,
  openfile: openfile,
  savefile: savefile,
  APPOperation: APPOperation,
  load_environment: load_environment,
}