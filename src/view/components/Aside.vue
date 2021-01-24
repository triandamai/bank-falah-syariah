<template>
  <!-- begin:: Aside -->
  <div
    class="aside aside-left aside-fixed d-flex flex-column flex-row-auto"
    id="kt_aside"
    ref="kt_aside"
  >
    <!-- begin:: Aside Menu -->
    <div
      class="aside-menu-wrapper flex-column-fluid"
      id="kt_aside_menu_wrapper"
    >
      <div
        ref="kt_aside_menu"
        id="kt_aside_menu"
        class="aside-menu min-h-lg-800px"
        data-menu-vertical="1"
        data-menu-dropdown-timeout="500"
        v-bind:class="asideMenuClass"
      >
        <!-- example static menu here -->
        <perfect-scrollbar
          class="aside-menu scroll"
          style="max-height: 90vh; position: relative;"
        >
          <Menu />
        </perfect-scrollbar>
      </div>
    </div>
  </div>
  <!-- end:: Aside -->
</template>

<script>
import { mapGetters } from "vuex";
import KTLayoutAside from "@/assets/js/layout/base/aside.js";
import KTLayoutAsideMenu from "@/assets/js/layout/base/aside-menu.js";

export default {
  name: "Aside",
  data() {
    return {
      insideTm: 0,
      outsideTm: 0,
    };
  },

  mounted() {
    this.$nextTick(() => {
      // Init Aside
      KTLayoutAside.init(this.$refs["kt_aside"]);

      // Init Aside Menu
      KTLayoutAsideMenu.init(this.$refs["kt_aside_menu"]);
    });
  },
  computed: {
    ...mapGetters({
      layoutConfig: "config/layoutConfig",
      getClasses: "htmlclass/getClasses",
    }),

    /**
     * Get extra classes for menu based on the options
     */
    asideMenuClass() {
      const classes = this.getClasses("aside_menu");
      if (typeof classes !== "undefined") {
        return classes.join(" ");
      }
      return null;
    },
  },
};
</script>
