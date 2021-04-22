<template>
  <div class="view">
    <div
      class="page-wrapper"
      :class="
        layout.settings.sidebar.type == 'horizontal_sidebar'
          ? 'horizontal-wrapper'
          : 'compact-wrapper'
      "
    >
      <div class="page-header" :class="{ close_icon: !togglesidebar }">
        <Header @clicked="sidebar_toggle" />
      </div>
      <div
        class="page-body-wrapper"
        :class="
          layout.settings.sidebar.type == 'horizontal_sidebar'
            ? 'horizontal-menu'
            : 'sidebar-icon'
        "
      >
        <div
          class="sidebar-wrapper"
          :class="[
            { close_icon: !togglesidebar },
            layout.settings.sidebar_backround,
          ]"
          :sidebar-layout="layout.settings.sidebar_setting"
        >
          <Sidebar @clicked="sidebar_toggle" />
        </div>
        <div class="page-body">
          <transition name="fadeIn" enter-active-class="animated fadeIn">
            <router-view class="view"></router-view>
          </transition>
        </div>
        <Footer />
      </div>
      <Customizer />
    </div>
    <form-akad :show="formakad" @close="hide" />
    <form-deposito :show="formdeposito" @close="hide" />
    <form-jenistransaksi :show="formjenistransaksi" @close="hide" />
    <form-pembiayaan :show="formpembiayaan" @close="hide" />
    <form-produk :show="formproduk" @close="hide" />
    <form-simpanan :show="formsimpanan" @close="hide" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";
import Customizer from "./customizer";

export default {
  name: "mainpage",
  data() {
    return {
      mobileheader_toggle_var: false,
      sidebar_toggle_var: false,
      horizontal_Sidebar: true,
      resized: false,
    };
  },
  // props:['sidebar_toggle_var'],
  components: {
    Header,
    Sidebar,
    Footer,
    Customizer,
  },
  computed: {
    ...mapState({
      menuItems: (state) => state.menu.data,
      layout: (state) => state.layout.layout,
      togglesidebar: (state) => state.menu.togglesidebar,
      body: (state) => state.body,
      formakad: (state) => state.formakad,
      formdeposito: (state) => state.formdeposito,
      formjenistransaksi: (state) => state.formjenistransaksi,
      formpembiayaan: (state) => state.formpembiayaan,
      formproduk: (state) => state.formproduk,
      formsimpanan: (state) => state.formsimpanan,
    }),
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    this.resized = this.sidebar_toggle_var;
    this.$store.dispatch("layout/set");
    console.log(this.$store);
  },
  watch: {
    $route() {
      this.menuItems.filter((items) => {
        if (items.path === this.$route.path)
          this.$store.dispatch("menu/setActiveRoute", items);
        if (!items.children) return false;
        items.children.filter((subItems) => {
          if (subItems.path === this.$route.path)
            this.$store.dispatch("menu/setActiveRoute", subItems);
          if (!subItems.children) return false;
          subItems.children.filter((subSubItems) => {
            if (subSubItems.path === this.$route.path)
              this.$store.dispatch("menu/setActiveRoute", subSubItems);
          });
        });
      });
    },
    sidebar_toggle_var: function () {
      this.resized =
        this.width <= 991 ? !this.sidebar_toggle_var : this.sidebar_toggle_var;
    },
  },
  methods: {
    hide() {
      this.$store.commit("hideForm", {});
    },
    sidebar_toggle(value) {
      this.sidebar_toggle_var = !value;
    },
    mobiletoggle_toggle(value) {
      this.mobileheader_toggle_var = value;
    },
    handleResize() {
      this.$store.dispatch("menu/resizetoggle");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
