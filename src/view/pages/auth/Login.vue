/* eslint-disable */
<template>
  <div>
    <!--begin::Content header-->
    <!-- <div
      class="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10"
    >
      <span class="font-weight-bold font-size-3 text-dark-60">
        Don't have an account yet?
      </span>
      <router-link
        class="font-weight-bold font-size-3 ml-2"
        :to="{ name: 'register' }"
      >
        Sign Up!
      </router-link>
    </div> -->
    <!--end::Content header-->

    <!--begin::Signin-->
    <div class="login-form login-signin">
      <div class="text-center mb-10 mb-lg-20">
        <h3 class="font-size-h1">Masuk</h3>
        <p class="text-muted font-weight-semi-bold">
          Masukkan Username dan Password milik Anda
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

        <b-form-group
          id="example-input-group-1"
          label=""
          label-for="example-input-1"
        >
          <b-form-input
            class="form-control form-control-solid h-auto py-5 px-6"
            id="example-input-1"
            name="example-input-1"
            v-model="$v.form.email.$model"
            :state="validateState('email')"
            placeholder="username"
            aria-describedby="input-1-live-feedback"
          ></b-form-input>

          <b-form-invalid-feedback id="input-1-live-feedback">
            Tidak boleh kosong!.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="example-input-group-2"
          label=""
          label-for="example-input-2"
        >
          <b-form-input
            class="form-control form-control-solid h-auto py-5 px-6"
            type="password"
            placeholder="Password"
            id="example-input-2"
            name="example-input-2"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
            aria-describedby="input-2-live-feedback"
          ></b-form-input>

          <b-form-invalid-feedback id="input-2-live-feedback">
            Password harus diisi.
          </b-form-invalid-feedback>
        </b-form-group>

        <!--begin::Action-->
        <div
          class="form-group d-flex flex-wrap justify-content-between align-items-center"
        >
          <!-- <a
            href="#"
            class="text-dark-60 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            Forgot Password ?
          </a> -->
          <button
            ref="kt_login_signin_submit"
            class="btn font-weight-bold px-9 py-4 my-3 font-size-3"
            :class="error ? 'btn-primary' : 'btn-success'"
          >
            Masuk Sekarang
          </button>
        </div>
        <!--end::Action-->
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
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      const email = this.$v.form.email.$model;
      const password = this.$v.form.password.$model;

      // clear existing errors
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
    this.$store.commit("auth/" + SET_ERROR, { error: false, message: "" });
  },
  computed: {
    ...mapState({
      error: (state) => state.auth.error,
      message: (state) => state.auth.message,
    }),
  },
};
</script>
