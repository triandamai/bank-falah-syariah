<template>
  <v-app id="inspire">
    <v-system-bar app class="orange darken-4">
      <v-spacer></v-spacer>
      <div class="text-center white--text text-caption">
        Notifikasi disini
      </div>
      <v-spacer></v-spacer>
    </v-system-bar>
    <navdrawer></navdrawer>
    <appbar></appbar>
    <v-main class="grey lighten-4">
      <router-view />
    </v-main>
    <footer></footer>
  </v-app>
</template>

<script>
import Appbar from "../components/AppBar.vue";
import Navdrawer from "../components/NavDrawer.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "Dashboard",
  components: {
    Appbar,
    Navdrawer,
    Footer,
  },
  data() {
    return {};
  },
};
</script>
