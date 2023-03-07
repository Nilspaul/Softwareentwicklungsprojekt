import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [
        createPersistedState()
      ],
  state: {
    myVar: 'Hello Vuex!',
    currentModule: {},
  },
  mutations: {
    setMyVar(state, newVal) {
      state.myVar = newVal
    },
    setCurrentModule(state, payload) {
        state.currentModule = payload;
      }
  },
  actions: {
    updateMyVar({ commit }, newVal) {
      commit('setMyVar', newVal)
    },
    setMyObject({commit}, payload) {
        commit('setCurrentModule', payload);
      }
    
  },
  getters: {
    getMyVar: state => state.myVar
  }
})

export default store
