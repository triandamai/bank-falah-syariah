<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-7 order-1">
        <img
          class="bg-img-cover bg-center"
          src="../../assets/images/login/1.jpg"
          alt="looginpage"
        />
      </div>
      <div class="col-xl-5 p-0">
        <div class="login-card">
          <div>
            <div>
              <a class="logo text-left">
                <img
                  class="img-fluid for-light"
                  width="40px"
                  src="../../assets/images/logo/login.png"
                  alt="looginpage"/>
                <img
                  class="img-fluid for-dark"
                  width="40px"
                  src="../../assets/images/logo/logo_dark.png"
                  alt="looginpage"
              /></a>
            </div>
            <div class="login-main">
              <b-card no-body>
                <b-tabs pills vertical>

                    <b-card-text>
                      <form class="theme-form" @submit.prevent="signUp">
                        <h4>Sign in to account</h4>
                        <p>Enter your username & password to login</p>
                        <div class="alert alert-info">
                          Username: admin<br />
                          Password: admin
                        </div>
                        <div class="form-group">
                          <label class="col-form-label">Username</label>
                          <input
                            v-model="email"
                            class="form-control"
                            type="text"
                            required=""
                            placeholder="Username"
                            :class="{
                              'is-invalid': submitted && !email,
                            }"
                          />
                          <div
                            v-show="submitted && !email"
                            class="invalid-feedback"
                          >
                            Username is required
                          </div>
                        </div>
                        <div class="form-group">
                          <label class="col-form-label">Password</label>
                          <input
                            v-model="password"
                            autocomplete=""
                            class="form-control"
                            :type="type"
                            name="login[password]"
                            required=""
                            placeholder="*********"
                            :class="{
                              'is-invalid': submitted && !email,
                            }"
                          />
                          <div
                            v-show="submitted && !password"
                            class="invalid-feedback"
                          >
                            Password is required
                          </div>
                          <div class="show-hide" @click="showPassword">
                            <span class="show"></span>
                          </div>
                        </div>
                        <div class="form-group mb-0">
                          <!-- <div class="checkbox p-0">
                            <input id="checkbox1" type="checkbox" />
                            <label class="text-muted" for="checkbox1"
                              >Remember password</label
                            >
                          </div> -->
                          <button
                            class="btn btn-primary btn-block"
                            type="submit"
                            :disabled="disable"
                          >
                            Login
                          </button>
                        </div>

                        <!-- <p class="mt-4 mb-0">
                          Don't have account?
                          <router-link class="ml-2" tag="a" to="/auth/register">
                            Create Account
                          </router-link>
                        </p> -->
                      </form>
                    </b-card-text>

                </b-tabs>
              </b-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-overlay :value="overlay">
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { LOGIN } from "@/store/modules/auth";
export default {
  name: "login",
  data() {
    return {
      overlay:false,
      type: "password",
      email: "",
      password: "",
      username: "",
      passwordjwt: "",
      submitted: false,
      disable: false,
    };
  },
  computed: {
    // JWT authentication
    loggingIn() {
      return false; // this.$store.state.authentication.status.loggingIn;
    },
  },
  created() {
    // reset login status for JWT
  },
  methods: {
    // show/hide password
    showPassword: function() {
      if (this.type === "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    // Firebase login
    signUp: function() {
      this.submitted = true;
      if (this.email !== "" && this.password !== "") {
        this.disable = true;
        this.overlay = true;
        this.$store
          .dispatch(`auth/${LOGIN}`, {
            username: this.email,
            password: this.password,
          })
          .then(({ success, message }) => {
            this.$toasted.show(
              success
                ? this.$t("Success Message", { context: `${message}` })
                : this.$t("Failed Message", { context: `${message}` }),
              {
                theme: "bubble",
                position: "top-right",
                type: success ? "success" : "error",
                duration: 2000,
              }
            );

            if (success) {
              this.overlay = false;
              setTimeout(() => {
                this.$router.push({ name: "dashboard" });
              }, 1000);
              return;
            }
            this.disable = false;
            this.overlay = false;
          });
      }
    },
  },
};
</script>
