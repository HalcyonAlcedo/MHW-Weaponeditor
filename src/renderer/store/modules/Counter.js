const state = {
  main: 0,
  file: '',
  filename: false
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  FILE_SET (state, file) {
    state.file = file
  },
  FILE_SET_NAME (state, filename) {
    state.filename = filename
  }
}

const getters = {
  donefile: state => {
    return state.file
  },
  donefilename: state => {
    return state.filename
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  setfile ({ commit }, file) {
    commit('FILE_SET_NAME', file.substring(file.lastIndexOf('\\') + 1))
    commit('FILE_SET', file)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
