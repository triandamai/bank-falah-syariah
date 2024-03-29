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
import nasabah from "./modules/customer";
import master from "./modules/master";
import rekening from "./modules/account";
import system from "./modules/system";
import wilayah from "./modules/wilayah";
import transaksi from "./modules/transaction";
import statistic from "./modules/statistic";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    formtransaksipembiayaan:false,
    formtransaksitabungan:false,
    formtransaksibank:false,
    formtransaksineraca:false,
    loadingtable:true,
    isOnline:true,
    notifConnection:false,
    lazyLoad:false,
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
    hideForm(state, type) {
      if(type === "PEMBIAYAAN"){
        state.formtransaksipembiayaan = false
      }else if(type === "TRANSAKSI_BANK"){
        state.formtransaksibank = false
      }else if(type === "TABUNGAN"){
        state.formtransaksitabungan = false
      }else if(type === "TRANSAKSI_NERACA"){
        state.formtransaksineraca = false
      }

    },
    setLazyLoad(state,isLoading){
      state.lazyLoad = isLoading
    },
    //eslint-disable-next-line no-empty-pattern
    showForm(state,type) {
      if(type === "PEMBIAYAAN"){
        state.formtransaksipembiayaan = true
        state.formtransaksitabungan = false
        state.formtransaksibank=false
        state.formtransaksineraca = false
      }else if(type === "TRANSAKSI_BANK"){
        state.formtransaksipembiayaan = false
        state.formtransaksitabungan = false
        state.formtransaksibank=true
        state.formtransaksineraca = false
      }else if(type === "TRANSAKSI_NERACA"){
        state.formtransaksipembiayaan = false
        state.formtransaksitabungan = false
        state.formtransaksibank=false
        state.formtransaksineraca = true
      }else if(type === "TABUNGAN"){
        state.formtransaksipembiayaan = false
        state.formtransaksitabungan = true
        state.formtransaksibank=false
        state.formtransaksineraca = false
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
export * from "./modules/customer";
export * from "./modules/master";
export * from "./modules/account";
export * from "./modules/system";
export * from "./modules/wilayah";
export * from "./modules/transaction";
export * from "./modules/statistic"
