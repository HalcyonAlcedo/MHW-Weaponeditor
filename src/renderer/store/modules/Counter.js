const state = {
  file: '',
  filename: false,
  filedata: [],
  filesourcedata: false,
  excludeunknown: true,
  Oldversion: false,
  versionupdate: false
}

const mutations = {
  FILE_SET (state, file) {
    state.file = file
  },
  FILE_SET_NAME (state, filedata) {
    let file = [filedata[0], filedata[1], filedata[2]]
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
        default:
          state.filename = 'Unknown'
      }
    } else {
      switch (file.join('-')) {
        case '134-1-135':
          state.filename = 'l_sword.wp_dat'
          break
        case '134-1-142':
          state.filename = 'sword.wp_dat'
          break
        case '134-1-132':
          state.filename = 'hammer.wp_dat'
          break
        case '134-1-133':
          if (filedata[8121] === 133) {
            state.filename = 'lance.wp_dat'
          } else {
            state.filename = 'w_sword.wp_dat'
          }
          break
        case '134-1-126':
          state.filename = 's_axe.wp_dat'
          break
        case '134-1-128':
          state.filename = 'rod.wp_dat'
          break
        case '134-1-129':
          state.filename = 'tachi.wp_dat'
          break
        case '177-1-131':
          state.filename = 'lbg.wp_dat_g'
          break
        case '134-1-131':
          state.filename = 'whistle.wp_dat'
          break
        case '134-1-125':
          state.filename = 'g_lance.wp_dat'
          break
        case '134-1-121':
          state.filename = 'c_axe.wp_dat'
          break
        case '177-1-122':
          state.filename = 'bow.wp_dat_g'
          break
        case '177-1-124':
          state.filename = 'hbg.wp_dat_g'
          break
        case '119-1-119':
          state.filename = 'kireaji.kire'
          break
        case '0-1-62':
          state.filename = 'rod_insect.rod_inse'
          break
        case '94-0-120':
          state.filename = 'skill_data.skl_dat'
          break
        case '119-1-15':
          state.filename = 'wep_glan.wep_glan'
          break
        case '119-1-42':
          state.filename = 'wep_saxe.wep_saxe'
          break
        case '119-1-50':
          state.filename = 'wep_whistle.wep_wsl'
          break
        case '119-1-4':
          state.filename = 'wep_wsword.wep_wsd'
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
      console.log('update')
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
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
