/* eslint-disable */
/*
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store, { RESET_LAYOUT_CONFIG } from "@/store";
import ApiService from "@/core/services/api.service";
import { getUser } from "@/core/services/jwt.service.js";

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
// import "@/core/plugins/highlight-js";
import "@/core/plugins/inline-svg";
import "@/core/plugins/apexcharts";
import "@/core/plugins/metronic";
import "@mdi/font/css/materialdesignicons.css";

//registring components
import { upperFirst, camelCase } from "lodash";

import "./assets/tailwind.css";
const requireComponent = require.context(
  "./view/components",
  false,
  /[\w-]+\.vue$/
);

requireComponent.keys().forEach(fileName => {
  //get comp config
  const componentConfig = requireComponent(fileName);
  //get PascalCase name
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, "").replace(/\.\w+$/, ""))
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});

// API service init
ApiService.init();

// Remove this to disable mock API
// MockService.init();

router.beforeEach((to, from, next) => {
  const user = getUser();
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (user) {
      next();
    } else {
      next({
        path: "/auth"
      });
    }
  } else {
    next();
  }

  // reset config to initial state
  store.dispatch("config/" + RESET_LAYOUT_CONFIG, "");

  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount("#app");
