//将数据与配置匹配
var DataFormation = (data, dataInfo, dataFormation, resources, sourceData) => {
    let gethexAddress = dataInfo
    let HexRuler = gethexAddress.HexRuler
    let HexPointer = gethexAddress.HexPointer
    let HexStartOffset = gethexAddress.StartOffset
    let Datalist = []

    if (typeof(HexRuler) == "string") {
      //非标准行
      if (HexRuler == "Linebyline") {
        //逐行处理
        let dataLine = 0
        for (let LineName in HexPointer) {
          
          let Line = HexPointer[LineName]
          //逐行处理中的循环处理
          if(Line.cycle) {
            for (let l = (Line.EndAddress - Line.StartAddress + Line.HexRuler) / Line.HexRuler, internalDataLine = 0; internalDataLine < l; internalDataLine++) {
              let Dataobj = {}
              Dataobj.Data_Hex = Line.StartAddress.toString(16)
              Dataobj.Data_Hex = (Line.StartAddress + (Line.HexRuler * internalDataLine)).toString(16) // 目标地址
              for (let hp in Line.Pointer) { // 遍历所有属性
                Dataobj[hp] = ProcessingRawData(ProcessingHex(data, Line.Pointer[hp], Line.StartAddress + (Line.HexRuler * internalDataLine), 1))
              }
              let Resources = ProcessResources(dataFormation, resources)

              for(let res = 0; res < Resources.length; res++) {
                let resourcesId = ProcessingHex(
                  data, Line.Pointer[Resources[res].requiredParameters], Line.StartAddress + (Line.HexRuler * internalDataLine), 1
                )
                Dataobj[Resources[res].name] = Resources[res].func(resourcesId ? resourcesId : LineName)
              }

              Dataobj.SourceData = sourceData[dataLine]
              Datalist[dataLine] = Dataobj
              dataLine ++
            }
          } else {
            let Dataobj = {}
            Dataobj.Data_Hex = Line.StartAddress.toString(16)
            for (let hp in Line.Pointer) { // 遍历所有属性
              Dataobj[hp] = ProcessingRawData(ProcessingHex(data, Line.Pointer[hp], Line.StartAddress, 1))
            }
            let Resources = ProcessResources(dataFormation, resources)
            for(let res = 0; res < Resources.length; res++) {
              let resourcesId = ProcessingHex(
                data, Line[Resources[res].requiredParameters], HexRuler, dataLine
              )
              Dataobj[Resources[res].name] = Resources[res].func(resourcesId ? resourcesId : LineName, true)
            }
            Dataobj.SourceData = sourceData[dataLine]
            Datalist[dataLine] = Dataobj
            dataLine ++
          }
        }
      }
    } else if (typeof(HexRuler) == "number") {
      //标准行循环
      for (let l = (data.length - HexStartOffset) / HexRuler, dataLine = 0; dataLine < l; dataLine++) {
        let Dataobj = {}
        Dataobj.Data_Hex = (HexRuler * dataLine).toString(16) // 目标地址
        for (let hp in HexPointer) { // 遍历所有属性
          Dataobj[hp] = ProcessingRawData(ProcessingHex(data, HexPointer[hp], HexRuler, dataLine))
        }
        let Resources = ProcessResources(dataFormation, resources)
        for(let res = 0; res < Resources.length; res++) {
          Dataobj[Resources[res].name] = Resources[res].func(ProcessingHex(
            data, HexPointer[Resources[res].requiredParameters], HexRuler, dataLine
          ))
        }
        Dataobj.SourceData = sourceData[dataLine]
        Datalist[dataLine] = Dataobj
      }
    }
    return Datalist
}
//十六进制转浮点
var HexToSingle = (t) => {
  t = t.replace(/\s+/g, "");
  if (t == "") {
    return "";
  }
  if (t == "00000000") {
    return "0";
  }
  if ((t.length > 8) || (isNaN(parseInt(t, 16)))) {
    return "Error";
  }
  if (t.length < 8) {
    t = FillString(t, "0", 8, true);
  }
  t = parseInt(t, 16).toString(2);
  t = FillString(t, "0", 32, true);
  var s = t.substring(0, 1);
  var e = t.substring(1, 9);
  var m = t.substring(9);
  e = parseInt(e, 2) - 127;
  m = "1" + m;
  if (e >= 0) {
    m = m.substr(0, e + 1) + "." + m.substring(e + 1)
  } else {
    m = "0." + FillString(m, "0", m.length - e - 1, true)
  }
  if (m.indexOf(".") == -1) {
    m = m + ".0";
  }
  var a = m.split(".");
  var mi = parseInt(a[0], 2);
  var mf = 0;
  for (var i = 0; i < a[1].length; i++) {
    mf += parseFloat(a[1].charAt(i)) * Math.pow(2, -(i + 1));
  }
  m = parseInt(mi) + parseFloat(mf);
  if (s == 1) {
    m = 0 - m;
  }
  return m;
}
//浮点转十六进制
var SingleToHex = (t) => {
  if (t == "") {
    return "";
  }
  t = parseFloat(t);
  if (isNaN(t) == true) {
    return "Error";
  }
  if (t == 0) {
    return "00000000";
  }
  var s,
  e,
  m;
  if (t > 0) {
    s = 0;
  } else {
    s = 1;
    t = 0 - t;
  }
  m = t.toString(2);
  if (m >= 1) {
    if (m.indexOf(".") == -1) {
      m = m + ".0";
    }
    e = m.indexOf(".") - 1;
  } else {
    e = 1 - m.indexOf("1");
  }
  if (e >= 0) {
    m = m.replace(".", "");
  } else {
    m = m.substring(m.indexOf("1"));
  }
  if (m.length > 24) {
    m = m.substr(0, 24);
  } else {
    m = FillString(m, "0", 24, false)
  }
  m = m.substring(1);
  e = (e + 127).toString(2);
  e = FillString(e, "0", 8, true);
  var r = parseInt(s + e + m, 2).toString(16);
  r = FillString(r, "0", 8, true);
  //return InsertString(r, "", 2).toUpperCase();
  return r
}
/*
  内部方法
*/

// 根据配置文件生成可用处理函数
function ProcessResources (dataFormation, resources) {
  let ResourcesObj = []

  /*
    可用的处理程序写在这里
  */
  //根据id获取资源中的数据
    let matchName = (item, id) => {
      if (item[id]) {
        return item[id]
      } else {
        return 'null'
      }
    }
    //根据id获取资源中的列表数据
    let matchNameList = (item, id) => {
      if (item[id]) {
        let ret = []
        for (let i = 0; i < item[id].length; i++) {
          ret[i] = {name: item[id][i]}
        }
        return ret
      } else {
        return []
      }
    }
  //下面是将传入信息匹配到处理程序的代码
  for (let df = 0; df < dataFormation.length; df ++) {
    let Obj_resources = dataFormation[df].resources
    if (typeof(Obj_resources) == 'string') Obj_resources = resources[Obj_resources]
    switch (dataFormation[df].program.toLowerCase()) {
      case "MatchName".toLowerCase():
        ResourcesObj.push({
          name: dataFormation[df].name,
          func: (id, string = false) => {
            if(typeof (id) !== 'number' && !string) {
              id = id.vul
            }
            return matchName(Obj_resources, id)
          },
          requiredParameters: dataFormation[df].requiredParameters
        })
        
        break;
      case "MatchNameList".toLowerCase():
        ResourcesObj.push({
          name: dataFormation[df].name,
          func: (id) => {
            if(typeof (id) !== 'number') {
              id = id.vul
            }
            return matchNameList(Obj_resources, id)
          },
          requiredParameters: dataFormation[df].requiredParameters
        })
        break;
    }
  }
  //将程序必须的程序进行检查，如果输入数据不存在这些数据，则将这些数据补充为默认值(暂无)
  
  return ResourcesObj
}

// 处理原始数据（HexPointer的内容）
function ProcessingRawData (HexData, fileObject) {
  if (HexData !== false) {
    switch (HexData.resourceprocessing) {
      case 'wpdamage':
        if (fileObject) {
          HexData.vul = Math.ceil(HexData.vul * weapon_damage(fileObject))
        }
        break
      case 'Element':
        if (HexData.hexL == 1) {
          HexData.vul = HexData.vul <= 100 ? HexData.vul : '-' + (256 - HexData.vul)
        }
        if (HexData.vul !== 0) { HexData.vul = HexData.vul + '0' }
        break
      case 'Affinity':
        HexData.vul = HexData.vul <= 100 ? HexData.vul : '-' + (Math.pow(256, HexData.hexL) - HexData.vul)
        break
      case 'Defense':
        HexData.vul = Math.ceil(HexData.vul)
        break
    }
  } else {
    HexData = false
  }
  return HexData
}

// 处理二进制数据
function ProcessingHex (data, Hexpointer, HexRuler, dataLine) {
  let ret = ''
  if (Hexpointer === undefined) {
    return false
  }
  if (Hexpointer === 'auto') {
    return {vul: dataLine}
  }
  if (typeof (Hexpointer[0]) !== 'number') {
    let vul = {}
    for (let k in Hexpointer) {
      let vulret = ''
      for (let p = 0; p < Hexpointer[k][1]; p++) {
        let Hex16 = data[(HexRuler * dataLine) + Hexpointer[k][0] - p]
        if (Hex16 !== undefined) {
          vulret += str_pad(Hex16.toString(16), 2)
        } else {
          vulret = '00'
        }
      }
      vul[k] = {
        vul: parseInt(vulret, 16),
        hex: (HexRuler * dataLine) + Hexpointer[k][0],
        hexL: Hexpointer[k][1],
        note: Hexpointer[k][3],
      }
    }
    return {data: vul}
  }
  for (let p = 0; p < Hexpointer[1]; p++) {
    let Hex16 = data[(HexRuler * dataLine) + Hexpointer[0] - p]
    if (Hex16 !== undefined) {
      ret += str_pad(Hex16.toString(16), 2)
    } else {
      ret = '00'
    }
  }
  return {
    vul: Hexpointer[2] == "Float" ? HexToSingle(ret) : parseInt(ret, 16),
    hex: (HexRuler * dataLine) + Hexpointer[0],
    hexL: Hexpointer[1], resourceprocessing: Hexpointer.length > 2 ? Hexpointer[2] : false,
    note: Hexpointer[3],
  }
}

// 处理函数
function str_pad (hex, digits = 8) {
  var zero = new Array(digits + 1).join('0')
  var tmp = digits - hex.length
  return zero.substr(0, tmp) + hex.toLocaleUpperCase()
}
/*
function InsertString(t, c, n) {
  var r = new Array();
  for (var i = 0; i * 2 < t.length; i++) {
    r.push(t.substr(i * 2, n));
  }
  return r.join(c);
}
*/
function FillString(t, c, n, b) {
  if ((t == "") || (c.length != 1) || (n <= t.length)) {
    return t;
  }
  var l = t.length;
  for (var i = 0; i < n - l; i++) {
    if (b == true) {
      t = c + t;
    } else {
      t += c;
    }
  }
  return t;
}
function weapon_damage (weapon) {
  let weapondamage = 0
  switch (weapon) {
    case 'l_sword.wp_dat':
      weapondamage = 4.8
      break
    case 'sword.wp_dat':
      weapondamage = 1.4
      break
    case 'hammer.wp_dat':
      weapondamage = 5.2
      break
    case 'lance.wp_dat':
      weapondamage = 2.3
      break
    case 's_axe.wp_dat':
      weapondamage = 3.5
      break
    case 'rod.wp_dat':
      weapondamage = 3.1
      break
    case 'lbg.wp_dat_g':
      weapondamage = 1.3
      break
    case 'tachi.wp_dat':
      weapondamage = 3.3
      break
    case 'w_sword.wp_dat':
      weapondamage = 1.4
      break
    case 'whistle.wp_dat':
      weapondamage = 4.2
      break
    case 'g_lance.wp_dat':
      weapondamage = 2.3
      break
    case 'c_axe.wp_dat':
      weapondamage = 3.6
      break
    case 'bow.wp_dat_g':
      weapondamage = 1.2
      break
    case 'hbg.wp_dat_g':
      weapondamage = 1.5
      break
    default:
      weapondamage = 1
  }
  return weapondamage
}

export default {
  DataFormation: DataFormation,
  HexToSingle: HexToSingle,
  SingleToHex: SingleToHex,
}