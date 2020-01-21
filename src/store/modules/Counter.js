const state = {
  file: '',
  filename: false,
  filedata: [],
  filesourcedata: false,
  excludeunknown: true,
  Oldversion: false,
  versionupdate: false,
  license: false,
  uuid: ''
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
        default:
          state.filename = 'Unknown'
      }
    } else {
      switch (file.join('-')) {
        case '1-16-9-24-193-1-44':
          state.filename = 'l_sword.wp_dat'
          break
        case '1-16-9-24-193-1-42':
          if (state.file.substring(state.file.lastIndexOf('\\') + 1) === 'wep_saxe.wep_saxe') {
            state.filename = 'wep_saxe.wep_saxe'
          } else {
            state.filename = 'sword.wp_dat'
          }
          break
        case '1-16-9-24-193-1-37':
          state.filename = 'hammer.wp_dat'
          break
        case '1-16-9-24-193-1-36':
          if (state.file.substring(state.file.lastIndexOf('\\') + 1) === 'lance.wp_dat') {
            state.filename = 'lance.wp_dat'
          } else {
            state.filename = 'whistle.wp_dat'
          }
          break
        case '1-16-9-24-193-1-40':
          if (state.file.substring(state.file.lastIndexOf('\\') + 1) === 'w_sword.wp_dat') {
            state.filename = 'w_sword.wp_dat'
          } else {
            state.filename = 'tachi.wp_dat'
          }
          break
        case '1-16-9-24-193-1-31':
          state.filename = 's_axe.wp_dat'
          break
        case '1-16-9-24-193-1-33':
          state.filename = 'rod.wp_dat'
          break
        case '1-16-9-24-29-2-37':
          state.filename = 'lbg.wp_dat_g'
          break
        case '1-16-9-24-29-2-32':
          state.filename = 'hbg.wp_dat_g'
          break
        case '1-16-9-24-193-1-30':
          state.filename = 'g_lance.wp_dat'
          break
        case '1-16-9-24-193-1-26':
          state.filename = 'c_axe.wp_dat'
          break
        case '1-16-9-24-29-2-28':
          state.filename = 'bow.wp_dat_g'
          break
        case '1-16-9-24-193-1-0':
          state.filename = 'kireaji.kire'
          break
        case '9-1-61':
          state.filename = 'rod_insect.rod_inse'
          break
        case '1-16-9-24-135-0-226':
          state.filename = 'skill_data.skl_dat'
          break
        case '1-16-9-24-194-1-21':
          state.filename = 'wep_glan.wep_glan'
          break
        case '1-16-9-24-193-1-50':
          state.filename = 'wep_whistle.wep_wsl'
          break
        case '1-16-9-24-193-1-8':
          state.filename = 'wep_wsword.wep_wsd'
          break
        case '93-0-25':
          state.filename = 'armor.am_dat'
          break
        case '1-16-9-24-19-2-26':
          state.filename = 'bottle_table.bbtbl'
          break
        case '1-16-9-24-29-2-186':
            state.filename = 'shell_table.shl_tbl'
            break
        default:
          state.filename = 'Unknown'
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
    state.filedata[data.address] = data.value
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
  }
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
  editdata ({ commit }, data) {
    commit('DATA_EDIT', data)
  },
  setsourcedata ({ commit }, filedata) {
    commit('SOURCE_DATA_SET', filedata)
  },
  excludeUnknown ({ commit }, excludeunknown) {
    commit('EXCLUDE_UKNOWN', excludeunknown)
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
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
