import { createStore } from 'vuex'

export default createStore({
  state: {
    index: {
      activeIndex: "/",
      otherIndex: "//",
    },
    token: "",
    userInfo: {
      username: "",
      email: "",
      icon: "",
    }
  },
  getters: {
    activeIndex: state => {
      return state.index.activeIndex
    },
    userInfo: state => {
      return state.userInfo
    }
  },
  mutations: {
    // index
    saveIndex(state) {
      localStorage.setItem("index", JSON.stringify(state.index))
    },
    loadIndex(state) {
      state.index = localStorage.getItem("index") === null ? state.index : localStorage.getItem("index")
    },
    delIndex() {
      localStorage.removeItem("index")
    },
    // userInfo
    saveUserInfo(state, payload) {
      state.userInfo = payload
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo))
    },
    loadUserInfo(state) {
      if (localStorage.getItem("userInfo") !== null) {
        state.userInfo = JSON.parse(localStorage.getItem("userInfo"))
      }
    },
    delUserInfo() {
      localStorage.removeItem("userInfo")
    },

    // token
    saveToken(state, payload) {
      state.token = payload
      localStorage.setItem("token", JSON.stringify(state.token))
    },
    loadToken(state) {
      state.token = localStorage.getItem("token")
    },
    delToken() {
      localStorage.removeItem("token")
    },


  },
  actions: {
    // userInfo
    saveUserInfo({ commit, payLoad }) {
      commit('saveUserInfo', payLoad)
    },
    loadUserInfo({ commit }) {
      commit('loadUserInfo')
    },
    delUserInfo({ commit }) {
      commit('delUserInfo')
    },

    // token
    saveToken({ commit, payLoad }) {
      commit('saveToken', payLoad)
    },
    loadToken({ commit }) {
      commit('loadToken')
    },
    delToken({ commit }) {
      commit('delToken')
    },
  },
  modules: {
  }
})
