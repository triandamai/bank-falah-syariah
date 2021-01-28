import { mount } from "@vue/test-utils";
import Layout from "../src/view/pages/Layout.vue";

describe("Mounted App", () => {
  const wrapper = mount(Layout);

  test("is a Vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
