<!--
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 --->
<template>
  <div>
    <!--begin::Content header-->
    <div
      class="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10"
    >
      <span class="font-weight-bold font-size-3 text-dark-60">
        Masuk
      </span>
      <router-link class="font-weight-bold font-size-3 ml-2" to="/auth/login">
        Disini
      </router-link>
    </div>
    <!--end::Content header-->

    <!--begin::Signin-->
    <div class="login-form login-signin">
      <div class="text-center mb-10 mb-lg-20">
        <h3 class="font-size-h1">Aktivasi Aplikasi</h3>
        <p class="text-muted font-weight-semi-bold">
          MMasukkan Key aktivasi yang Anda dapatkan
        </p>
      </div>
      <b-alert :show="error" dismissible variant="danger">{{
        message
      }}</b-alert>
      <!--begin::Form-->
      <b-form class="form" @submit.prevent="onSubmit">
        <!-- <div role="alert" class="alert alert-info">
          <div class="alert-text">
            Gunakan akun username <strong>admin@demo.com</strong> dan password
            <strong>demo</strong> untuk melanjutkan.
          </div>
        </div> -->

        <b-input-group prepend="Key" class="mt-3">
          <b-form-input></b-form-input>
          <b-input-group-append>
            <b-button variant="info">Aktifkan</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form>
      <!--end::Form-->
    </div>
    <!--end::Signin-->
  </div>
</template>

<style lang="scss" scoped>
.spinner.spinner-right {
  padding-right: 3.5rem !important;
}
</style>

<script>
/* eslint-disable*/
import { mapState } from "vuex";
import { LOGIN, LOGOUT, SET_ERROR } from "@/store";

import { validationMixin } from "vuelidate";
import { minLength, required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "Login",
  data() {
    return {
      // Remove this dummy login info
      form: {
        email: "",
        password: "",
      },
    };
  },

  validations: {
    form: {
      email: {
        required,
        minLength: minLength(1),
      },
      password: {
        required,
        minLength: minLength(3),
      },
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        email: null,
        password: null,
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    /***
     * Button Login submited
     *
     */
    onSubmit() {
      this.$v.form.$touch();
      //check for validation
      if (this.$v.form.$anyError) {
        return;
      }

      const email = this.$v.form.email.$model;
      const password = this.$v.form.password.$model;

      // clear existing data and token before login
      this.$store.dispatch("auth/" + LOGOUT);

      // set spinner to submit button
      const submitButton = this.$refs["kt_login_signin_submit"];
      submitButton.classList.add("spinner", "spinner-light", "spinner-right");

      // dummy delay
      setTimeout(() => {
        // send login request
        this.$store
          .dispatch("auth/" + LOGIN, { username: email, password: password })
          // go to which page after successfully login
          .then((result) => {
            if (result) {
              this.$router.push({ path: "/home" });
            }
          });

        submitButton.classList.remove(
          "spinner",
          "spinner-light",
          "spinner-right"
        );
      }, 2000);
    },
  },
  created() {
    //set state to normal every page created
    this.$store.commit("auth/" + SET_ERROR, { error: false, message: "" });
  },
  /***
   * get state from store
   *
   */
  computed: {
    ...mapState({
      error: (state) => state.auth.error,
      message: (state) => state.auth.message,
    }),
  },
};
</script>
