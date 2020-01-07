import Vue from "vue";
import Vuex from "vuex";

import app from "./modules/app";
import user from "./modules/user";
import sysDictionary from "./modules/sysDictionary";
import webSocketData from "./modules/webSocketData";
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {},
  modules: {
    app,
    user,
    sysDictionary,
    webSocketData
  }
});

export default store;
