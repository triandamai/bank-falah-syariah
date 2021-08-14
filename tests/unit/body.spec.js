import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vue from "vue"
import Vuex from "vuex";
import App from "@/components/body.vue"
import Vuetify from "vuetify";
import VueFeather from "vue-feather";
import i18n from "@/plugins/i18n"
import Layout from "@/data/layout";
import "@/plugins/components"
Vue.use(Vuetify)



describe("body.vue", () => {
    const GET_NASABAH = "getNasabah";
    let store;
    let state;
    let vuetify;
    beforeEach(() => {
        state = {
            isDark: false,
            layout: Layout,
        };
        store = new Vuex.Store({
            modules: {
                menu:{
                    namespaced:true,
                    actions:{
                        resizetoggle() {}
                    }
                },
                nasabah:{
                    namespaced:true,
                    actions:{
                        [GET_NASABAH](){}
                    }
                },
                layout: {
                    state,
                    actions : {
                        set: context => {
                            context.commit("set");
                        },
                    },
                    mutations:{
                        set() {
                        },

                    },
                    namespaced: true
                }
            }
        });
        vuetify = new Vuetify();
    });

    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(VueFeather);



    it("render snackbar ketika online/offline", () => {
        const wrapper = shallowMount(App, {
            store,
            vuetify,
            i18n,
            data:()=>{return{
                mobileheader_toggle_var: false,
                sidebar_toggle_var: false,
                horizontal_Sidebar: true,
                resized: false,
                username:""
            }}
        });
        expect(wrapper.find("v-snackbar").text()).toContain("Anda")
    });
});

