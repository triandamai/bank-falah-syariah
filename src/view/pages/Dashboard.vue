<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row">
      <div class="col-xl-12">
        <EngageWidget1></EngageWidget1>
      </div>
    </div>

    <div class="row">
      <div class="col-xl-8">
        <ListWidget5></ListWidget5>
      </div>
      <div class="col-xl-4">
        <AdvancedTableWidget2></AdvancedTableWidget2>
      </div>
    </div>

    <!--end::Dashboard-->
  </div>
</template>

<script>
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import AdvancedTableWidget2 from "@/view/content/widgets/advance-table/Widget2.vue";
import EngageWidget1 from "@/view/content/widgets/engage/Widget1.vue";
import ListWidget5 from "@/view/content/widgets/list/Widget5.vue";

export default {
  name: "dashboard",

  components: {
    AdvancedTableWidget2,
    EngageWidget1,

    ListWidget5
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Dashboard" }]);
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
    }
  }
};
</script>
