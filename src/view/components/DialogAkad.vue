<template>
  <v-dialog v-model="show" @click:outside="close" scrollable max-width="300px">
    <v-card>
      <v-card-title>Pilih Akad</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px">
        <v-radio-group v-model="value" column>
          <v-radio
            v-for="(item, index) in items"
            :key="index"
            :label="item.nama_akad"
            :value="item"
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
import { ACTION_GET_DATA_MASTER, MAKAD } from "../../store";
export default {
  props: ["show"],
  data: () => ({
    dialog: false,
    value: {},
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
      items: (state) => state.master.dataakad,
    }),
  },
  created() {
    this.getAllAkad();
  },
  methods: {
    getAllAkad() {
      this.$store
        .dispatch("master/" + ACTION_GET_DATA_MASTER, {
          mastertype: MAKAD,
          path: "akad",
        })
        .then((res) => {
          if (res) {
            this.getAllAkad;
          }
        });
    },
    close() {
      this.$emit("close", true);
    },
    choose() {
      this.$emit("choose", this.value);
    },
  },
};
</script>