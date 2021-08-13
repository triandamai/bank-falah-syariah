import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Footer from "@/components/footer.vue";
import Bookmark from "@/components/bookmark.vue";
import VueFeather from "vue-feather";
import i18n from "@/plugins/i18n"
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueFeather);

describe("Footer.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "Copyright 2020 © Bank Falah Syariah by BakaranProject";
    const wrapper = shallowMount(Footer, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

describe("Bookmark.vue", () => {
  let state;
  let actions;
  let store;
  beforeEach(() => {
    state = {
      data: [],
      searchData: ""
    };
    actions = {
      searchTerm() {}
    };
    store = new Vuex.Store({
      modules: {
        menu: {
          state,
          actions,
          namespaced: true
        }
      }
    });
  });

  it("renders h6 text when passed", () => {
    const wrapper = shallowMount(Bookmark, {
      store,
      localVue,
      i18n
    });
    expect(wrapper.find("h6").text()).toMatch("Penanda");
  });
});
