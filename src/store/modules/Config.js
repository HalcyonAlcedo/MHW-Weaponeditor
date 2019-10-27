const state = {
  GameConfig: {
    gamePath: '',
  },
  license: {
    state: false,
    uuid: ''
  }
}

const mutations = {
  SET_LICENSE (state, license) {
    state.license.state = license
  },
  SET_UUID (state, uuid) {
    state.license.uuid = uuid
  },
  SET_GAMEPATH (state, gamePath) {
    state.GameConfig.gamePath = gamePath
  }
}

const getters = {
  doneGameConfig: state => {
    return state.GameConfig
  },
  donelicense: state => {
    return state.license.state
  },
  doneuuid: state => {
    return state.license.uuid
  }
}

const actions = {
  setlicense ({ commit }, license) {
    commit('SET_LICENSE', license)
  },
  setuuid ({ commit }, uuid) {
    commit('SET_UUID', uuid)
  },
  setgamePath ({ commit }, gamePath) {
    commit('SET_GAMEPATH', gamePath)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
