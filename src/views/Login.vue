<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col class="col-12 col-xs-12 col-sm-12 col-md-4"></v-col>
        <v-col class="col-12 col-xs-12 col-sm-12 col-md-4">
          <h1 class="mb-5">Login</h1>
          <h5 class="mb-5">Silahkan masuk menggunakan akun anda</h5>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-text-field
              v-model="username"
              label="Username"
              outlined
              :rules="[rules.required, rules.min]"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              outlined
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-btn
              :loading="loading"
              :disabled="loading"
              block
              color="primary"
              depressed
              elevation="1"
              medium
              class="mt-10"
              @click="prosesLogin"
              >Masuk</v-btn
            >
          </v-form>
          <v-row class="pa-2 align-self-center">
            <v-divider class="align-self-center ml-10"></v-divider>
            <p class="align-self-center text-center mr-10 ml-10 mt-2 mb-2">
              ATAU
            </p>
            <v-divider class="align-self-center mr-10"></v-divider>
          </v-row>
          <v-btn
            :disabled="loading"
            block
            color="primary"
            elevation="1"
            outlined
            medium
            >Daftar</v-btn
          >
          <v-row>
            <p class="font-weight-light text-body-2 mr-5 ml-5 mt-10">
              Dengan Masuk Anda Menyetujui Kebijakan Privasi dan Ketentuan
              Layanan
            </p>
          </v-row>
        </v-col>
        <v-col class="col-12 col-xs-12 col-sm-12 col-md-4"></v-col>
      </v-row>
      <v-snackbar
        v-model="snackbar"
        :left="'left'"
        :multi-line="'multi-line'"
        :top="'top'"
        :vertical="'vertical'"
        >{{ message }}</v-snackbar
      >
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data: function() {
    return {
      valid: true,
      lazy: true,
      password: "",
      username: "",
      show1: false,
      rules: {
        required: (value) => !!value || "Tidak Boleh Kosong!.",
        min: (v) => v.length >= 6 || "Minimal 6 karakter",
        emailMatch: () => "The email and password you entered don't match",
      },
    };
  },
  computed: {
    loading() {
      return this.$store.getters.getloading;
    },
    snackbar() {
      return this.$store.getters.getsnackbar;
    },
    message() {
      return this.$store.getters.getmessage;
    },
  },
  methods: {
    prosesLogin: function() {
      this.$store.dispatch("proseslogin", {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>

<style></style>
