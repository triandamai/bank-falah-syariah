import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vue from "vue"
import Vuex from "vuex";
import App from "@/App.vue"
import VueFeather from "vue-feather";

import Vuetify from "vuetify";
Vue.use(Vuetify)


describe("App.vue", () => {
   let vuetify = new Vuetify();

    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(VueFeather);
    localVue.use(vuetify)

    it("renders props.msg when passed", () => {
        const wrapper = shallowMount(App, {
            data:()=>{return{
                show: true,
                viewMenu:false,
                top:'0px',
                left:'0px',
                selectedItem: 0,
                items: [

                ],
                muncul:true
            }}
        });
        expect(wrapper.text()).not.toMatch("Bookmark");
    });
});

