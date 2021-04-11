<template>
  <v-dialog v-model="show" @click:outside="close" scrollable max-width="300px">
    <v-card>
      <v-card-title>Pilih Nasabah</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px">
        <v-radio-group column v-model="value">
          <v-radio
            v-for="(item, index) in items"
            :key="index"
            :label="item.nama_lengkap"
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
import { ACTION_GET_NASABAH } from "../../store";
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
      items: (state) => state.nasabah.datanasabah,
    }),
  },
  created() {
    this.getAllNasabah();
  },
  methods: {
    getAllNasabah() {
      this.$store.dispatch("nasabah/" + ACTION_GET_NASABAH).then((res) => {
        if (res) {
          this.getAllNasabah();
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