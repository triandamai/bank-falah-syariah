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
        <Header @clicked="sidebar_toggle" />
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
          <Sidebar @clicked="sidebar_toggle" />
        </div>
        <div class="page-body">
          <transition name="fadeIn" enter-active-class="animated fadeIn">
            <router-view class="view"></router-view>
          </transition>
        </div>
        <Footer />
      </div>
      <form-transaksi-pembiayaan-setor-tunai :show="pembiayaanformsetortunai"/>
      <form-transaksi-pembiayaan-setor-nontunai :show="pembiayaanformsetornontunai"/>
      <form-transaksi-pembiayaan-tarik-tunai :show="pembiayaanformtariktunai"/>
      <form-transaksi-pembiayaan-tarik-nontunai :show="pembiayaanformtariknontunai"/>
      <form-transaksi-tabungan-setor-tunai :show="tabunganformsetortunai"/>
      <form-transaksi-tabungan-setor-nontunai :show="tabunganformsetornontunai"/>
      <form-transaksi-tabungan-tarik-tunai :show="tabunganformtariktunai"/>
      <form-transaksi-tabungan-tarik-nontunai :show="tabunganformtariknontunai"/>
      <Customizer />
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
  </div>
</template>

<script>

import {ACTION_GET_NASABAH} from "@/store";
import componentMixin from "@/mixin/component.mixin"
import {mapState} from "vuex";
export default {
  name: "mainpage",
  mixins:[componentMixin],
  data() {
    return {
      mobileheader_toggle_var: false,
      sidebar_toggle_var: false,
      horizontal_Sidebar: true,
      resized: false,
    };
  },
  // props:['sidebar_toggle_var'],
  created() {

    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    this.resized = this.sidebar_toggle_var;
    this.$store.dispatch("layout/set");
    //get data nasabah
    this.getNasabah()
  },
  computed:{
    ...mapState({
      isOnline:(state)=>state.isOnline,
    }),
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
    sidebar_toggle(value) {
      this.sidebar_toggle_var = !value;
    },
    mobiletoggle_toggle(value) {
      this.mobileheader_toggle_var = value;
    },
    handleResize() {
      this.$store.dispatch("menu/resizetoggle");
    },
    getNasabah(){
      this.$store.dispatch(ACTION_GET_NASABAH).then((isNext) => {
        if (isNext) {
          this.getNasabah();
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
