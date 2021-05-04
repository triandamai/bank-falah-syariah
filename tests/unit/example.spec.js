import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Footer from "../../src/components/footer.vue";
import Bookmark from "../../src/components/bookmark.vue";

const localVue = createLocalVue();

localVue.use(Vuex);
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

  it("renders Bookmark when passed", () => {
    const msg = "Copyright 2020 © Bank Falah Syariah by BakaranProject";
    const wrapper = shallowMount(Bookmark, {
      store,
      localVue
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
