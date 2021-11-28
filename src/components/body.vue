<template>
  <div class="view">
    <!--    notif     -->

    <div
      class="page-wrapper"
      :class="
        layout.settings.sidebar.type === 'horizontal_sidebar'
          ? 'horizontal-wrapper'
          : 'compact-wrapper'
      "
    >
      <div class="page-header" :class="{ close_icon: !togglesidebar }">
        <Header @clicked="onToggleSidebar" />
      </div>
      <div
        class="page-body-wrapper"
        :class="
          layout.settings.sidebar.type === 'horizontal_sidebar'
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
          <Sidebar @clicked="onToggleSidebar" />
        </div>
        <div class="page-body">
          <transition name="fadeIn" enter-active-class="animated fadeIn">
            <router-view class="view"></router-view>
          </transition>
        </div>
        <Footer />
      </div>
      <form-transaksi-pembiayaan :show="formShowPembiayaan"/>
      <form-transaksi-tabungan :show="formShowTabungan"/>
      <form-transaksi-bank :show="formShowTransaksiBank"/>
<!-- TODO:show option for costumizer -->
<!--      <Customizer />-->
      <v-snackbar
          v-model="notifConnection"
      >
        {{ isOnline ? 'Anda Online':'Anda Offline' }}

        <template v-slot:action="{ attrs }">
          <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>

    <!--    overlay Loading -->
    <v-overlay :value="lazyLoad">
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
    <!--    -->
  </div>
</template>

<script>

import componentMixin from "@/mixin/component.mixin"
export default {
  name: "mainPage",
  mixins:[componentMixin],
  data() {
    return {
      toggleHeaderMobile: false,
      toggleSidebar: false,
      horizontalSidebar: true,
      resized: false,
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("keypress",this.doCommand)
    this.handleResize();
    this.resized = this.toggleSidebar;
    this.$store.dispatch("layout/set");
  },
  destroyed() {
    window.removeEventListener("resize",this.handleResize)
    window.removeEventListener("keypress",this.doCommand)
  },
  computed:{
    notifConnection:{
      get(){
        return this.$store.state.notifConnection
      },
      set(newVal){
        return this.$store.commit("showNotif",newVal)
      }
    }
  },
  watch: {
    $route() {
      this.itemsMenus.filter((items) => {
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
        this.width <= 991 ? !this.toggleSidebar : this.toggleSidebar;
    },
  },
  methods: {
    onToggleSidebar(value) {
      this.toggleSidebar = !value;
    },
    onToggleMobileHeader(value) {
      this.toggleHeaderMobile = value;
    },
    handleResize() {
      this.$store.dispatch("menu/resizetoggle");
    },
    doCommand(e){

      //20=CTRL +T
      // 16 CTRL + P
      if(e.keyCode === 16 ){
        if(!this.formShowPembiayaan) {
          this.$store.commit('showForm',"PEMBIAYAAN")
        }
      }

      if(e.keyCode === 20 ){
        if(!this.formShowSimpanan) {
          this.$store.commit('showForm',"SIMPANAN")
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
