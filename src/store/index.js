import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: {},
    nowCity: '北京',
    nowCityId: 'AREA|88cff55c-aaa4-e2e0',
    searchValue: '请输入小区名称'
  },
  getters: {
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    changenowCity (state, payload) {
      state.nowCity = payload
    },
    changenowCityId (state, payload) {
      state.nowCityId = payload
    },
    setSearchValue (state, payload) {
      state.searchValue = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
