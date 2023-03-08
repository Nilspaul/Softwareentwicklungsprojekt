import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    currentModule: {},
  },
  mutations: {
    setCurrentModule(state, payload) {
      state.currentModule = payload;
    },
  },
  actions: {
    setMyObject({ commit }, payload) {
      commit("setCurrentModule", payload);
    },
  },
  getters: {
    getMyVar: (state) => state.myVar,
  },
});

export default store;
