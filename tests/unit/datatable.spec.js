import { createLocalVue, mount, config, shallowMount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import DataTable from "../../src/components/datatable.vue";
import Vuetify from "vuetify";
config.showDeprecationWarnings = false;

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuetify);

describe("datatable.vue", () => {
  let store;
  let state;
  let vuetify;
  beforeEach(() => {
    state = {
      isDark: false
    };
    store = new Vuex.Store({
      modules: {
        layout: {
          state,
          namespaced: true
        }
      }
    });
    vuetify = new Vuetify();
  });
  test("is a vue instance", () => {
    const wrapper = shallowMount(DataTable, {
      localVue,
      propsData: { search: "", headers: [] },
      mocks: {
        $t: msg => msg
      },
      store,
      vuetify
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it("get button add component", () => {
    const search = "";
    const wrapper = mount(DataTable, {
      localVue,
      propsData: { search: search, headers: [] },

      mocks: {
        $t: msg => msg
      },
      store,
      vuetify
    });

    const button = wrapper.find('[data-testid="button"]');

    //cek apakah v btn ada
    expect(button.exists()).toBe(true);
  });
});
