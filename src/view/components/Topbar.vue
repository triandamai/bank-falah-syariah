<!--
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 --->
<template>
  <!-- begin:: Header Topbar -->
  <div class="topbar">
    <!--begin: Search -->

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
export default {
  name: "Topbar",
  data() {
    return {};
  },
  methods: {},
  computed: {
    getLanguageFlag() {
      return this.onLanguageChanged();
    },
  },
};
</script>
