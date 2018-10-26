const state = {
  file: '',
  filename: false,
  filedata: [],
  filesourcedata: false,
  excludeunknown: true
}

const mutations = {
  FILE_SET (state, file) {
    state.file = file
  },
  FILE_SET_NAME (state, filedata) {
    let file = [filedata[0], filedata[1], filedata[2]]
    switch (file.join('-')) {
      case '134-1-127':
        state.filename = 'l_sword.wp_dat'
        break
      case '134-1-132':
        state.filename = 'sword.wp_dat'
        break
      case '134-1-124':
        state.filename = 'hammer.wp_dat'
        break
      case '134-1-125':
        if (filedata[8121] === 133) {
          state.filename = 'lance.wp_dat'
        } else {
          state.filename = 'w_sword.wp_dat'
        }
        break
      case '134-1-118':
        state.filename = 's_axe.wp_dat'
        break
      case '134-1-120':
        if (filedata[7800] === 169) {
          state.filename = 'rod.wp_dat'
        } else {
          state.filename = 'tachi.wp_dat'
        }
        break
      case '177-1-124':
        state.filename = 'lbg.wp_dat_g'
        break
      case '134-1-123':
        state.filename = 'whistle.wp_dat'
        break
      case '134-1-117':
        state.filename = 'g_lance.wp_dat'
        break
      case '134-1-113':
        state.filename = 'c_axe.wp_dat'
        break
      case '177-1-115':
        state.filename = 'bow.wp_dat_g'
        break
      case '177-1-117':
        state.filename = 'hbg.wp_dat_g'
        break
      default:
        state.filename = 'Unknown'
    }
  },
  DATA_SET (state, filedata) {
    state.filedata = filedata
  },
  SOURCE_DATA_SET (state, filesourcedata) {
    state.filesourcedata = filesourcedata
  },
  DATA_EDIT (state, data) {
    state.filedata[data.address] = data.value
  },
  EXCLUDE_UKNOWN (state, excludeunknown) {
    state.excludeunknown = excludeunknown
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
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
