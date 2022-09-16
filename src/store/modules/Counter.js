const state = {
  file: '',
  filename: false,
  filedata: [],
  config: [],
  filesourcedata: false,
  excludeunknown: true,
  Oldversion: false,
  versionupdate: false,
  license: false,
  uuid: '',
  newinterface: false,
  dataChangeToConfig: false,
  languagesdata:[]
}

const mutations = {
  FILE_SET (state, file) {
    state.file = file
  },
  FILE_SET_NAME (state, filedata) {
    let file = [filedata[0], filedata[1], filedata[2], filedata[3], filedata[4], filedata[5], filedata[6]]
    if (state.Oldversion) {
      switch (state.file.substring(state.file.lastIndexOf('\\') + 1)) {
        case 'l_sword.wp_dat':
          state.filename = 'l_sword.wp_dat'
          break
        case 'sword.wp_dat':
          state.filename = 'sword.wp_dat'
          break
        case 'hammer.wp_dat':
          state.filename = 'hammer.wp_dat'
          break
        case 'lance.wp_dat':
          state.filename = 'lance.wp_dat'
          break
        case 'w_sword.wp_dat':
          state.filename = 'w_sword.wp_dat'
          break
        case 's_axe.wp_dat':
          state.filename = 's_axe.wp_dat'
          break
        case 'rod.wp_dat':
          state.filename = 'rod.wp_dat'
          break
        case 'tachi.wp_dat':
          state.filename = 'tachi.wp_dat'
          break
        case 'lbg.wp_dat_g':
          state.filename = 'lbg.wp_dat_g'
          break
        case 'whistle.wp_dat':
          state.filename = 'whistle.wp_dat'
          break
        case 'g_lance.wp_dat':
          state.filename = 'g_lance.wp_dat'
          break
        case 'c_axe.wp_dat':
          state.filename = 'c_axe.wp_dat'
          break
        case 'bow.wp_dat_g':
          state.filename = 'bow.wp_dat_g'
          break
        case 'hbg.wp_dat_g':
          state.filename = 'hbg.wp_dat_g'
          break
        case 'kireaji.kire':
          state.filename = 'kireaji.kire'
          break
        case 'rod_insect.rod_inse':
          state.filename = 'rod_insect.rod_inse'
          break
        case 'rod_insect.rod_inse_d':
          state.filename = 'rod_insect.rod_inse'
          break
        case 'skill_data.skl_dat':
          state.filename = 'skill_data.skl_dat'
          break
        case 'wep_glan.wep_glan':
          state.filename = 'wep_glan.wep_glan'
          break
        case 'wep_saxe.wep_saxe':
          state.filename = 'wep_saxe.wep_saxe'
          break
        case 'wep_whistle.wep_wsl':
          state.filename = 'wep_whistle.wep_wsl'
          break
        case 'wep_wsword.wep_wsd':
          state.filename = 'wep_wsword.wep_wsd'
          break
        case 'armor.am_dat':
          state.filename = 'armor.am_dat'
          break
        case 'bottle_table.bbtbl':
          state.filename = 'bottle_table.bbtbl'
          break
        case 'shell_table.shl_tbl':
          state.filename = 'shell_table.shl_tbl'
          break
        case 'a_skill.ask':
          state.filename = 'a_skill.ask'
          break
        case 'weapon.eq_crt':
          state.filename = 'weapon.eq_crt'
          break
        case 'weapon.eq_cus':
          state.filename = 'weapon.eq_cus'
          break
        case 'armor.eq_crt':
          state.filename = 'armor.eq_crt'
          break
        default:
          state.filename = 'Unknown'
      }
    } else {
      switch (file.join('-')) {
        case '1-16-9-24-193-1-64':
          state.filename = 'l_sword.wp_dat'
          break
        case '1-16-9-24-193-1-42':
          //if (state.file.substring(state.file.lastIndexOf('\\') + 1) === 'wep_saxe.wep_saxe') {
            state.filename = 'wep_saxe.wep_saxe'
          //}
          break
        case '1-16-9-24-193-1-62':
          state.filename = 'sword.wp_dat'
          break
        case '1-16-9-24-193-1-57':
          state.filename = 'hammer.wp_dat'
          break
        case '1-16-9-24-193-1-56':
          if (state.file.substring(state.file.lastIndexOf('\\') + 1) === 'lance.wp_dat') {
            state.filename = 'lance.wp_dat'
          } else {
            state.filename = 'whistle.wp_dat'
          }
          break
        case '1-16-9-24-193-1-60':
          if (state.file.substring(state.file.lastIndexOf('\\') + 1) === 'w_sword.wp_dat') {
            state.filename = 'w_sword.wp_dat'
          } else {
            state.filename = 'tachi.wp_dat'
          }
          break
        case '1-16-9-24-193-1-51':
          state.filename = 's_axe.wp_dat'
          break
        case '1-16-9-24-193-1-53':
          state.filename = 'rod.wp_dat'
          break
        case '1-16-9-24-29-2-57':
          state.filename = 'lbg.wp_dat_g'
          break
        case '1-16-9-24-29-2-52':
          state.filename = 'hbg.wp_dat_g'
          break
        case '1-16-9-24-193-1-50':
          if (state.file.substring(state.file.lastIndexOf('\\') + 1) === 'wep_whistle.wep_wsl') {
            state.filename = 'wep_whistle.wep_wsl'
          } else {
            state.filename = 'g_lance.wp_dat'
          }
          break
        case '1-16-9-24-193-1-46':
          state.filename = 'c_axe.wp_dat'
          break
        case '1-16-9-24-29-2-48':
          state.filename = 'bow.wp_dat_g'
          break
        case '1-16-9-24-193-1-0':
          state.filename = 'kireaji.kire'
          break
        case '1-16-9-24-188-0-245':
          state.filename = 'skill_data.skl_dat'
          break
        case '1-16-9-24-194-1-21':
          state.filename = 'wep_glan.wep_glan'
          break
        case '1-16-9-24-193-1-10':
          state.filename = 'wep_wsword.wep_wsd'
          break
        case '1-16-9-24-95-0-152':
          state.filename = 'armor.am_dat'
          break
        case '1-16-9-24-29-2-34':
          state.filename = 'bottle_table.bbtbl'
          break
        case '1-16-9-24-29-2-198':
            state.filename = 'shell_table.shl_tbl'
            break
        case '1-16-9-24-104-0-20':
          state.filename = 'a_skill.ask'
          break
        case '1-16-9-24-121-0-149':
          state.filename = 'weapon.eq_crt'
          break
        case '1-16-9-24-88-0-153':
          state.filename = 'weapon.eq_cus'
          break
        case '1-16-9-24-121-0-203':
          state.filename = 'armor.eq_crt'
          break
        default:
          state.filename = 'Unknown'
      }
      if (
        state.filename == 'Unknown' &&
        (state.file.substring(state.file.lastIndexOf('\\') + 1) == 'rod_insect.rod_inse' ||
        state.file.substring(state.file.lastIndexOf('\\') + 1) == 'rod_insect.rod_inse_d')
      ) {
        state.filename = 'rod_insect.rod_inse'
      }
      for(let configloadfile = 0; configloadfile < state.config.length; configloadfile ++) {
        let loadfilename = state.config[configloadfile].modeFile
        if (
          state.filename == 'Unknown' &&
          (state.file.substring(state.file.lastIndexOf('\\') + 1) == loadfilename ||
          state.file.substring(state.file.lastIndexOf('\\') + 1) == loadfilename + '_d')
        ) {
          state.filename = loadfilename
        }
      }
    }
  },
  DATA_SET (state, filedata) {
    state.filedata = filedata
  },
  SOURCE_DATA_SET (state, filesourcedata) {
    state.filesourcedata = filesourcedata
    if (state.versionupdate && filesourcedata) {
      for (let i = 3, l = state.filedata.length; i < l; i++) {
        filesourcedata[i] = state.filedata[i]
      }
      state.filedata = filesourcedata
      state.versionupdate = false
    }
  },
  DATA_EDIT (state, data) {
    let hex = data.value.toString(16)
    if(hex.length % 2 != 0) hex = '0' + hex
    let val = []
    for(let i = 0; i < hex.length / 2; i++) {
      val.push(parseInt(hex.slice((hex.length / 2 - i) * 2 - 2,(hex.length / 2 - i) * 2), 16))
    }
    for(let i = 0; i < val.length; i++) {
      state.filedata[data.address + i] = val[i]
    }
  },
  DATA_INSERT (state, data) {
    const _buffer1 = state.filedata.slice(0,data.target);
    const _buffer2 = state.filedata.slice(data.target);
    state.filedata = Buffer.concat([_buffer1,data.buffer,_buffer2]);
  },
  CONFIG_ADD (state, data) {
    if(state.config.filter(item=> data[0] !== undefined && item.type === data[0].type).length == 0) {
      state.config.push(data)
    }
  },
  EXCLUDE_UKNOWN (state, excludeunknown) {
    state.excludeunknown = excludeunknown
  },
  SET_Old_version (state, Oldversion) {
    state.Oldversion = Oldversion
  },
  UPDATE_Old_version (state, update) {
    state.versionupdate = update
  },
  SET_LICENSE (state, license) {
    state.license = license
  },
  SET_UUID (state, uuid) {
    state.uuid = uuid
  },
  NEW_IMTERFACE (state, newinterface) {
    state.newinterface = newinterface
  },
  SET_DATATOCONFIG (state, dataChangeToConfig) {
    state.dataChangeToConfig = dataChangeToConfig
  },
  ADD_LAMHIAHE_DATA (state, LanguageData) {
    state.languagesdata.push(LanguageData)
  },
}

const getters = {
  donefile: state => {
    return state.file
  },
  donefilename: state => {
    return state.filename
  },
  donefiledata: state => {
    return state.filedata
  },
  doneconfig: state => {
    return state.config
  },
  donefilesourcedata: state => {
    return state.filesourcedata
  },
  doneexcludeunknown: state => {
    return state.excludeunknown
  },
  doneOldversion: state => {
    return state.Oldversion
  },
  donelicense: state => {
    return state.license
  },
  doneuuid: state => {
    return state.uuid
  },
  donenewInterface: state => {
    return state.newinterface
  },
  doneDataToConfig: state => {
    return state.dataChangeToConfig
  },
  doneLanguageData: state => {
    return state.languagesdata
  }
}

const actions = {
  setfile ({ commit }, file) {
    commit('FILE_SET', file)
  },
  setdata ({ commit }, filedata) {
    commit('FILE_SET_NAME', filedata)
    commit('DATA_SET', filedata)
  },
  setconfig ({ commit }, data) {
    commit('CONFIG_ADD', data)
  },
  editdata ({ commit }, data) {
    commit('DATA_EDIT', data)
  },
  insertdata ({ commit }, data) {
    commit('DATA_INSERT', data)
  },
  setsourcedata ({ commit }, filedata) {
    commit('SOURCE_DATA_SET', filedata)
  },
  excludeUnknown ({ commit }, excludeunknown) {
    commit('EXCLUDE_UKNOWN', excludeunknown)
  },
  newInterface ({ commit }, newinterface) {
    commit('NEW_IMTERFACE', newinterface)
  },
  setOldversion ({ commit }, Oldversion) {
    commit('SET_Old_version', Oldversion)
  },
  updateversion ({ commit }, update) {
    commit('UPDATE_Old_version', update)
  },
  setlicense ({ commit }, license) {
    commit('SET_LICENSE', license)
  },
  setuuid ({ commit }, uuid) {
    commit('SET_UUID', uuid)
  },
  setdatatoconfig ({ commit }, dataChangeToConfig) {
    commit('SET_DATATOCONFIG', dataChangeToConfig)
  },
  addlanguagedata ({ commit }, LanguageData) {
    commit('ADD_LAMHIAHE_DATA', LanguageData)
  } 
}

export default {
  state,
  mutations,
  getters,
  actions
}
