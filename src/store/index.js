import Vue from "vue";
import Vuex from "vuex";
// import 'es6-promise/auto';
import layout from "./modules/layout";
import menu from "./modules/menu";
import auth from "./modules/auth";
import nasabah from "./modules/nasabah";
import master from "./modules/master";
import rekening from "./modules/rekening";
import system from "./modules/system";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    layout,
    menu,
    auth,
    nasabah,
    master,
    rekening,
    system
  }
});
