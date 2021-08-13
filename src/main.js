import Vue from "vue";
import App from "@/App.vue";
import BootstrapVue from "bootstrap-vue";
import router from "@/router";
import {store} from "@/store";
import Vue2Filters from "vue2-filters";
import VueSweetalert2 from "vue-sweetalert2";
import VueTour from "vue-tour";
import Notifications from "vue-notification";
import Toasted from "vue-toasted";

import {VueMasonryPlugin} from "vue-masonry";
import VueFeather from "vue-feather";
import {VueMaskDirective} from 'v-mask'

// Import Theme scss
import "@/assets/scss/app.scss";

import vuetify from "@/plugins/vuetify";
import "@babel/polyfill";

//components
import "@/plugins/components.js";
import "@/plugins/vuetify-money"
// api services
import ApiService from "@/services/api.service";

import {Icon} from "leaflet";

// Multi Language Add
import VueI18n from "vue-i18n";
import en from "@/locales/en.json";
import id from "@/locales/id.json";
import {defaultLocale, localeOptions} from "@/utils/utils.js";

const messages = {en: en, id: id};

delete Icon.Default.prototype._getIconUrl;

ApiService.init();

Vue.use(VueFeather);

Vue.use(Toasted, {
    iconPack: "fontawesome",
});

Vue.directive('mask', VueMaskDirective);
Vue.use(Notifications);
Vue.use(Vue2Filters);
Vue.use(VueSweetalert2);
Vue.use(VueTour);
Vue.use(BootstrapVue);
Vue.use(require("vue-chartist"));
Vue.use(require("vue-moment"));
Vue.use(VueMasonryPlugin);
Vue.use(VueI18n);
const locale =
    window.localStorage.getItem("currentLanguage") &&
    localeOptions.filter(
        (x) => x.id === window.localStorage.getItem("currentLanguage")
    ).length > 0
        ? window.localStorage.getItem("currentLanguage")
        : defaultLocale;

const i18n = new VueI18n({
    locale: locale,
    fallbackLocale: "en",
    messages: messages,
});

Vue.config.productionTip = false;

new Vue({
    i18n,
    router,
    store,
    vuetify,
    render: (h) => h(App),
    created() {
      window.addEventListener("offline",()=>{
          store.commit("setConnection", false);

      })
      window.addEventListener("online",()=>{
          store.commit("setConnection", true);
      })
    }
}).$mount("#app");
