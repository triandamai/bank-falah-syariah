<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row">
      <div class="col-xl-12" style="margin-top: 15px">
        <banner-warning-aktivasi-dashboard />
      </div>
    </div>

    <div class="row">
      <div class="col-xl-8">
        <chart-dashboard />
      </div>
      <div class="col-xl-4">
        <list-user-dashboard />
      </div>
    </div>

    <!--end::Dashboard-->
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/store";

export default {
  name: "dashboard",
  mounted() {
    this.$store.dispatch("breadcrumbs/" + SET_BREADCRUMB, [
      { title: "Dashboard" },
    ]);
  },
  methods: {
    setActiveTab1(event) {
      this.tabIndex = this.setActiveTab(event);
    },
    setActiveTab2(event) {
      this.tabIndex2 = this.setActiveTab(event);
    },
    /**
     * Set current active on click
     * @param event
     */
    setActiveTab(event) {
      // get all tab links
      const tab = event.target.closest('[role="tablist"]');
      const links = tab.querySelectorAll(".nav-link");
      // remove active tab links
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
      }

      // set current active tab
      event.target.classList.add("active");

      // set clicked tab index to bootstrap tab
      return parseInt(event.target.getAttribute("data-tab"));
    },
  },
};
</script>
