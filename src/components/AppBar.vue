<template>
  <v-app-bar class="primary" dense :elevation="1" app>
    <v-app-bar-nav-icon
      class="white--text"
      v-show="mini"
      @click="changemini"
    ></v-app-bar-nav-icon>

    <v-toolbar-title class="white--text">Aksioma</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu
      v-model="menu"
      :close-on-content-click="true"
      :close-on-click="true"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-on="on"
          v-bind="attrs"
          small
          class="ma-2 white--text"
          color="primary"
          depressed
        >
          <v-spacer></v-spacer>
          <v-avatar tile color="primary" class="rounded-md mr-1" size="20">
            <v-img :src="require('../assets/logo-aksioma.png')"></v-img>
          </v-avatar>
          Akun
        </v-btn>
      </template>
      <v-card dense>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Bakaran Project</v-list-item-title>
              <v-list-item-subtitle>Creator Website</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-title>Enable messages</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="signOut">
            Keluar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
import store from "../store/index";
export default {
  name: "Appbar",
  data: () => ({
    menu: false
  }),
  computed: {
    mini() {
      return this.$store.getters.getminimenu;
    }
  },
  methods: {
    changemini: function() {
      this.$store.dispatch("actionminimenu", !this.mini);
    },
    signOut: function() {
      this.menu = !this.menu;
      this.$store.dispatch("proseslogout", {});
    }
  }
};
</script>

<style></style>
