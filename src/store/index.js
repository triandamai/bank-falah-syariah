/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
import Vue from "vue";
import Vuex from "vuex";

import auth from "./module/auth.module";
import htmlClass from "./module/htmlclass.module";
import config from "./module/config.module";
import breadcrumbs from "./module/breadcrumbs.module";
import nasabah from "./module/nasabah.module";
import system from "./module/system.module";
import master from "./module/master.module";
import rekening from "./module/rekening.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    htmlclass: htmlClass,
    config,
    breadcrumbs,
    nasabah,
    system,
    master,
    rekening,
  },
});

export * from "./module/auth.module";
export * from "./module/breadcrumbs.module";
export * from "./module/config.module";
export * from "./module/htmlclass.module";
export * from "./module/nasabah.module";
export * from "./module/system.module";
export * from "./module/master.module";
export * from "./module/rekening.module";
export * from "./utils/country";
export * from "./utils/headers";
export * from "./utils/menu";
export * from "../core/services/jwt.service";
