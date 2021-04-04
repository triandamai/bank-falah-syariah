import { mount } from "@vue/test-utils";

import Aside from "../src/view/components/Aside.vue";

describe("Aside", () => {
  test("test user in not ", () => {
    const wrapper = mount(Aside);
    expect(true).toBe(false);
  });
});
