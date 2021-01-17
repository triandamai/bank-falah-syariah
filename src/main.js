/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import ApiService from "@/core/services/api.service";
import { RESET_LAYOUT_CONFIG } from "./store";
import { getUser } from "@/core/services/jwt.service.js";

import VueTour from "vue-tour";
require("vue-tour/dist/vue-tour.css");
Vue.config.productionTip = false;

// Global 3rd party plugins
import "popper.js";
import "tooltip.js";
import PerfectScrollbar from "perfect-scrollbar";
window.PerfectScrollbar = PerfectScrollbar;
import ClipboardJS from "clipboard";
window.ClipboardJS = ClipboardJS;

// Vue 3rd party plugins
import i18n from "@/core/plugins/vue-i18n";
import vuetify from "@/core/plugins/vuetify";
import "@/core/plugins/portal-vue";
import "@/core/plugins/bootstrap-vue";
import "@/core/plugins/perfect-scrollbar";
import "@/core/plugins/highlight-js";
import "@/core/plugins/inline-svg";
import "@/core/plugins/apexcharts";
import "@/core/plugins/metronic";
import "@mdi/font/css/materialdesignicons.css";

// API service init
ApiService.init();

// Remove this to disable mock API
// MockService.init();

router.beforeEach((to, from, next) => {
  const user = getUser();
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (user) {
      next();
    } else {
      next({
        path: "/auth",
      });
    }
  } else {
    next();
  }
  // Ensure we checked auth before each page load.
  //Promise.all([store.dispatch(VERIFY_AUTH)]).then(next);

  // Scroll page to top on every route change

  // reset config to initial state
  store.dispatch(RESET_LAYOUT_CONFIG, "");

  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});
Vue.use(VueTour);

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
