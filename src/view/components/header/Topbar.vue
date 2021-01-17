<template>
  <!-- begin:: Header Topbar -->
  <div class="topbar">
    <!--begin: Search -->
    <search-default />

    <!--begin: Quick panel toggle -->
    <!-- <KTQuickPanel></KTQuickPanel> -->
    <!--end: Quick panel toggle -->

    <!--begin: Quick panel toggle -->
    <quick-actions />
    <!--end: Quick panel toggle -->

    <!--begin: User Bar -->
    <quick-user />
    <!--end: User Bar -->

    <quick-notifications />
  </div>
  <!-- end:: Header Topbar -->
</template>

<style lang="scss">
.topbar {
  .dropdown-toggle {
    padding: 0;
    &:hover {
      text-decoration: none;
    }

    &.dropdown-toggle-no-caret {
      &:after {
        content: none;
      }
    }
  }

  .dropdown-menu {
    margin: 0;
    padding: 0;
    outline: none;
    .b-dropdown-text {
      padding: 0;
    }
  }
}
</style>

<script>
import SearchDefault from "../../components/offcanvas/DropdownCreate.vue";
import QuickUser from "../../components/offcanvas/QuickUser.vue";
// import KTQuickPanel from "@/view/layout/extras/offcanvas/QuickPanel.vue";
import QuickActions from "../../components/offcanvas/QuickActions.vue";
import QuickNotifications from "../../components/offcanvas/QuickNotifications.vue";

export default {
  name: "KTTopbar",
  data() {
    return {};
  },
  components: {
    SearchDefault,
    QuickUser,
    // KTQuickPanel,
    QuickActions,
    QuickNotifications,
  },
  methods: {},
  computed: {
    getLanguageFlag() {
      return this.onLanguageChanged();
    },
  },
};
</script>
