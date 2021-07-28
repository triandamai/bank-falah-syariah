<template>
  <div class="container-fluid p-0">
    <div class="row m-0">
      <div class="col-12 p-0">
        <div class="login-card">
          <div>
            <div>
              <a class="logo">
                <img
                    class="img-fluid for-light"
                    width="50px"
                    src="../../assets/images/logo/login.webp"
                    alt="looginpage"
                />
                <img
                    class="img-fluid for-dark"
                    width="50px"
                    src="../../assets/images/logo/logo_dark.webp"
                    alt="looginpage"
                />
              </a>
            </div>
            <div class="login-main">
              <div class="card">
                <div class="card-body">
                  <form class="theme-form" @submit.prevent="signUp">
                        <h4>Sign in to account</h4>
                        <p>Enter your username & password to login</p>
                        <div class="form-group">
                          <label class="col-form-label">Username</label>
                          <input
                              v-model="email"
                              class="form-control"
                              type="text"
                              required=""
                              placeholder="Bakaran Project"
                              :class="{
                                'is-invalid': submitted && !email,
                              }"
                          />
                          <div
                              v-show="submitted && !email"
                              class="invalid-feedback"
                          >
                            Email is required
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
                            Email is required
                          </div>
                          <div class="show-hide" @click="showPassword">
                            <span class="show"></span>
                          </div>
                        </div>
                        <div class="form-group mb-0">
                          <div class="checkbox p-0">
                            <input id="checkbox1" type="checkbox" />
                            <label class="text-muted"
                            >Remember password</label
                            >
                          </div>
                          <button
                              class="btn btn-primary btn-block"
                              type="submit"
                              :disabled="disable"

                          >
                            Login
                          </button>
                        </div>
                        <h6 class="text-muted mt-4 or">2021</h6>

                      </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
<!--    overlay-->
    <v-overlay :value="overlay">
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
<!--    -->
  </div>
</template>

<script>
import authenticatioMixin from "@/mixin/authentication.mixin"
export default {
  name: "login",
  mixins:[authenticatioMixin]

};
</script>
