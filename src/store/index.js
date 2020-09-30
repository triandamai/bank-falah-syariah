import Vue from "vue";
import Vuex from "vuex";

import auth from "./module/auth";
import app from "./module/app";
import user from "../store/module/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
  },
  modules: {
    auth: auth,
    app: app,
    user: user,
  },
});
