/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */

import Vue from "vue";
// Multi Language Add
import VueI18n from "vue-i18n";
import en from "@/locales/en.json";
import id from "@/locales/id.json";
import {defaultLocale, localeOptions} from "@/utils/utils.js";

const messages = {en: en, id: id};
Vue.use(VueI18n);
const locale =
    window.localStorage.getItem("currentLanguage") &&
    localeOptions.filter(
        (x) => x.id === window.localStorage.getItem("currentLanguage")
    ).length > 0
        ? window.localStorage.getItem("currentLanguage")
        : defaultLocale;

export default  new VueI18n({
    locale: locale,
    fallbackLocale: "en",
    messages: messages,
});

