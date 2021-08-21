/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
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
import wilayah from "./modules/wilayah";
import transaksi from "./modules/transaksi";
import statistic from "./modules/statistic";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    tabunganformsetortunai: false,
    tabunganformsetornontunai: false,
    tabunganformtariktunai: false,
    tabunganformtariknontunai: false,
    pembiayaanformsetortunai: false,
    pembiayaanformsetornontunai: false,
    pembiayaanformtariktunai: false,
    pembiayaanformtariknontunai: false,
    loadingtable:true,
    isOnline:true,
    notifConnection:false
  },
  mutations: {
    // eslint-disable-next-line no-unused-vars
    setLoading(state,isloading){
      state.loadingtable = isloading
    },
    setConnection(state,isOnline){
      state.isOnline = isOnline
      state.notifConnection = true
    },
    showNotif(state,show){
      state.notifConnection = show
    },
    changeLang(state, payload) {
      localStorage.setItem("currentLanguage", payload.id);
      localStorage.setItem("currentLanguageIcon", payload.icon);
      window.location.reload();
    },
    // eslint-disable-next-line no-empty-pattern
    hideForm(state, {}) {
      state.tabunganformsetortunai= false;
      state.tabunganformsetornontunai= false;
      state.tabunganformtariktunai= false;
      state.tabunganformtariknontunai= false;
      state.pembiayaanformsetortunai= false;
      state.pembiayaanformsetornontunai= false;
      state.pembiayaanformtariktunai= false;
      state.pembiayaanformtariknontunai= false;
    },
    showForm(state, form) {
      state.body = {};
      switch (form) {
        case "tabunganformsetortunai":
          state.tabunganformsetortunai= true;
          state.tabunganformsetornontunai= false;
          state.tabunganformtariktunai= false;
          state.tabunganformtariknontunai= false;
          state.pembiayaanformsetortunai= false;
          state.pembiayaanformsetornontunai= false;
          state.pembiayaanformtariktunai= false;
          state.pembiayaanformtariknontunai= false;
          break;
        case "tabunganformsetornontunai":
          state.tabunganformsetortunai= false;
          state.tabunganformsetornontunai= true;
          state.tabunganformtariktunai= false;
          state.tabunganformtariknontunai= false;
          state.pembiayaanformsetortunai= false;
          state.pembiayaanformsetornontunai= false;
          state.pembiayaanformtariktunai= false;
          state.pembiayaanformtariknontunai= false;
          break;
        case "tabunganformtariktunai":
          state.tabunganformsetortunai= false;
          state.tabunganformsetornontunai= false;
          state.tabunganformtariktunai= true;
          state.tabunganformtariknontunai= false;
          state.pembiayaanformsetortunai= false;
          state.pembiayaanformsetornontunai= false;
          state.pembiayaanformtariktunai= false;
          state.pembiayaanformtariknontunai= false;
          break;
        case "tabunganformtariknontunai":
          state.tabunganformsetortunai= false;
          state.tabunganformsetornontunai= false;
          state.tabunganformtariktunai= false;
          state.tabunganformtariknontunai= true;
          state.pembiayaanformsetortunai= false;
          state.pembiayaanformsetornontunai= false;
          state.pembiayaanformtariktunai= false;
          state.pembiayaanformtariknontunai= false;
          break;
        case "pembiayaanformsetortunai":
          state.tabunganformsetortunai= false;
          state.tabunganformsetornontunai= false;
          state.tabunganformtariktunai= false;
          state.tabunganformtariknontunai= false;
          state.pembiayaanformsetortunai= true;
          state.pembiayaanformsetornontunai= false;
          state.pembiayaanformtariktunai= false;
          state.pembiayaanformtariknontunai= false;
          break;
        case "pembiayaanformsetornontunai":
          state.tabunganformsetortunai= false;
          state.tabunganformsetornontunai= false;
          state.tabunganformtariktunai= false;
          state.tabunganformtariknontunai= false;
          state.pembiayaanformsetortunai= false;
          state.pembiayaanformsetornontunai= true;
          state.pembiayaanformtariktunai= false;
          state.pembiayaanformtariknontunai= false;
          break;
        case "pembiayaanformtariktunai":
          state.tabunganformsetortunai= false;
          state.tabunganformsetornontunai= false;
          state.tabunganformtariktunai= false;
          state.tabunganformtariknontunai= false;
          state.pembiayaanformsetortunai= false;
          state.pembiayaanformsetornontunai= false;
          state.pembiayaanformtariktunai= true;
          state.pembiayaanformtariknontunai= false;
          break;
        case "pembiayaanformtariknontunai":
          state.tabunganformsetortunai= false;
          state.tabunganformsetornontunai= false;
          state.tabunganformtariktunai= false;
          state.tabunganformtariknontunai= false;
          state.pembiayaanformsetortunai= false;
          state.pembiayaanformsetornontunai= false;
          state.pembiayaanformtariktunai= false;
          state.pembiayaanformtariknontunai= true;
          break;
      }
    }
  },
  actions: {
    setLang({ commit }, payload) {
      commit("changeLang", payload);
    }
  },
  modules: {
    layout,
    menu,
    auth,
    nasabah,
    master,
    rekening,
    system,
    wilayah,
    transaksi,
    statistic
  }
});

export * from "./modules/layout";
export * from "./modules/menu";
export * from "./modules/auth";
export * from "./modules/nasabah";
export * from "./modules/master";
export * from "./modules/rekening";
export * from "./modules/system";
export * from "./modules/wilayah";
export * from "./modules/transaksi";
export * from "./modules/statistic"
