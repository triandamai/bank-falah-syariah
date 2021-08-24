<template>
  <div>
    <div class="page-wrapper">
      <div class="container-fluid p-0">
        <!-- Unlock page start-->
        <div class="authentication-main mt-0">
          <div class="row">
            <div class="col-12">
              <div class="login-card">
                <div>
                  <div>
                    <a class="logo">
                      <img class="img-fluid for-light" width="50px" src="../../assets/images/logo/logo-icon.webp" alt="looginpage">
                      <img class="img-fluid for-dark" width="50px" src="../../assets/images/logo/logo_dark.webp" alt="looginpage">
                    </a>
                  </div>
                  <div class="login-main login-form-card">
                    <form class="theme-form" @submit.prevent="unLock">
                      <h4>{{$t('Unlock')}}</h4>
                      <div class="form-group">
                        <label class="col-form-label">{{$t('EnterPassword')}}</label>
                        <input class="form-control"  v-model="password" type="password" name="login[password]" required="" placeholder="*********">
                        <div class="show-hide" @click="showPassword">
                          <span class="show"></span>
                        </div>
                      </div>
                      <div class="form-group mb-0">

                        <button  :disabled="disable" class="btn btn-primary btn-block" type="submit">{{$t('Process Unlock')}}</button>
                        <button  :disabled="disable" class="btn btn-primary btn-block" @click="signOut" type="button">{{$t('Logout')}}</button>
                      </div>
                      <p class="mt-4 mb-0">{{ $t('Butuh Bantuan') }}
                        <router-link class="ml-2" tag="a" to="/auth/login" >
                          {{ $t('Hubungi Kami') }}
                        </router-link></p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Unlock page end-->
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
import authenticationMixin from "@/mixin/authentication.mixin"
export default {
  name: "unlock_user",
  mixins:[authenticationMixin]
}
</script>

<style scoped>

</style>