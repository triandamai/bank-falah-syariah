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
