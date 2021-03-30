<template>
  <v-dialog
    v-model="dialog"
    @click:outside="close"
    scrollable
    max-width="300px"
  >
    <v-card>
      <v-card-title>Select Country</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px">
        <v-radio-group column>
          <v-radio
            v-for="(item, index) in items"
            :key="index"
            label="Bahamas, The"
            value="bahamas"
          ></v-radio>
        </v-radio-group>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="close"> Close </v-btn>
        <v-btn color="blue darken-1" text @click="choose"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["show"],
  data: () => ({
    dialog: false,
  }),
  watch: {
    show: {
      immediate: true,
      handler(newVal) {
        this.dialog = newVal;
      },
    },
  },
  computed: {
    ...mapState({
      items: (state) => state.system.datausers,
      header: (state) => state.system.user.header,
    }),
  },

  methods: {
    close() {
      this.$emit("close", true);
    },
    choose() {
      this.$emit("choose", true);
    },
  },
};
</script>