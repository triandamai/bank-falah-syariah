<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >

      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="hidden">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>User Controls</v-subheader>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Password</v-list-item-title>
              <v-list-item-subtitle
              >Require password for purchase or use password to restrict
                purchase</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>

      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>

export default {
  props: ["show"],
  data: () => {
    return {
      dialog: false,
    };
  },
  watch: {
    show: function(newVal) {
      console.log(newVal)
      this.dialog = newVal;
    },
  },
  methods:{
    hidden(){

      this.$store.commit("hideForm",{});
    }
  }
};
</script>
