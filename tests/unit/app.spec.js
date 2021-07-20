import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import App from "@/App.vue"
import VueFeather from "vue-feather";
import vuetify from "@/plugins/vuetify";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueFeather);
localVue.use(vuetify)

describe("App.vue", () => {
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
        expect(wrapper.find("h6").text()).toMatch("Bookmark");
    });
});

