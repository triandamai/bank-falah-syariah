<template>
  <div class="white " height="100%">
    <v-row align="center" justify="space-around">
      <v-col class="col-4"> </v-col>
      <v-col class="col-4 " align="center" justify="space-around">
        <v-img
          class="d-flex align-content-center"
          :src="require('../../assets/notfound.png')"
        ></v-img>
        <p class="text-center">
          Oops Halaman Tidak Ditemukan :-(
        </p>
        <v-btn class="d-flex align-content-center" small color="primary" dark>
          Kembali
        </v-btn>
      </v-col>
      <v-col class="col-4"></v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style></style>
