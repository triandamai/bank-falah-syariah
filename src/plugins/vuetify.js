/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */

import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import id from "vuetify/lib/locale/id";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { id },
    current: "id"
  },
  icons: {
    iconfont: "mdi"
  }
});
