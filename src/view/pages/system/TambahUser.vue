<template>
  <div class="card card-custom">
    <div class="card-body p-0">
      <!--begin: Wizard-->
      <div
        class="wizard wizard-1"
        id="kt_wizard_v1"
        data-wizard-state="step-first"
        data-wizard-clickable="true"
      >
        <!--begin: Wizard Body-->
        <div class="row justify-content-center my-10 px-8 my-lg-15 px-lg-10">
          <div class="col-xl-12 col-xxl-7">
            <!--begin: Wizard Form-->
            <form class="form" id="kt_form">
              <!--begin: Wizard Step 1-->
              <div
                class="pb-5"
                data-wizard-type="step-content"
                data-wizard-state="current"
              >
                <h3 class="mb-10 font-weight-bold text-dark">
                  Atur user yang akan ditambahkan
                </h3>
                <div class="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    v-model="username"
                    class="form-control form-control-solid form-control-lg"
                    placeholder="Contoh: Purwokerto selatan,Banyumas"
                  />
                  <span class="form-text text-muted"
                    >Masukkan alamat user.</span
                  >
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    v-model="password"
                    class="form-control form-control-solid form-control-lg"
                    placeholder="Contoh:Xdsrcs"
                  />
                  <span class="form-text text-muted">
                    Kunci keamanan yang akan digunakan user.</span
                  >
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    v-model="email"
                    class="form-control form-control-solid form-control-lg"
                    placeholder="Contoh: bakaranproject@contoh.com"
                  />
                  <span class="form-text text-muted">Email aktif user.</span>
                </div>

                <div class="row">
                  <div class="col-xl-6">
                    <div class="form-group">
                      <label>Role</label>
                      <select
                        v-model="role"
                        class="form-control form-control-solid form-control-lg"
                      >
                        <option value="">Pilih</option>

                        <option
                          v-for="(role, index) in roles"
                          :key="index"
                          :value="role.id"
                          >{{ role.name }}</option
                        >
                      </select>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <div class="form-group">
                      <label>Group</label>
                      <select
                        v-model="group"
                        class="form-control form-control-solid form-control-lg"
                      >
                        <option value="">Pilih</option>
                        <option
                          v-for="(group, index) in groups"
                          :key="index"
                          :value="group.id"
                          >{{ group.name }}</option
                        >
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <!--end: Wizard Step 1-->

              <!--begin: Wizard Actions -->
              <div class="d-flex justify-content-between border-top pt-10">
                <div class="mr-2">
                  <button
                    class="btn btn-light-primary font-weight-bold text-uppercase px-9 py-4"
                  >
                    Batal
                  </button>
                </div>
                <div>
                  <button
                    @click.prevent="submit"
                    class="btn btn-success font-weight-bold text-uppercase px-9 py-4"
                  >
                    Simpan
                  </button>
                </div>
              </div>
              <!--end: Wizard Actions -->
            </form>
            <!--end: Wizard Form-->
          </div>
        </div>
        <!--end: Wizard Body-->
      </div>
    </div>
    <!--end: Wizard-->
  </div>
</template>

<style lang="scss">
@import "@/assets/sass/pages/wizard/wizard-1.scss";
</style>

<script>
/*eslint-disable*/
import Swal from "sweetalert2";
import { mapState } from "vuex";
import { ACTION_GET_GROUP, ACTION_GET_ROLE } from "..";

export default {
  name: "TambahUser",
  created() {
    this.getRoles();
    this.getGroups();
  },
  computed: {
    ...mapState({
      groups: (state) => {
        return state.system.datagroups;
      },
      roles: (state) => {
        return state.system.dataroles;
      },
    }),
    //form
    username: {
      get() {
        return this.$store.state.system.userform.username;
      },
      set(val) {
        this.$store.commit("setFormUsername", val);
      },
    },
    password: {
      get() {
        return this.$store.state.system.userform.password;
      },
      set(val) {
        this.$store.commit("setFormPassword", val);
      },
    },
    email: {
      get() {
        return this.$store.state.system.userform.email;
      },
      set(val) {
        this.$store.commit("setFormEmail", val);
      },
    },
    role: {
      get() {
        return this.$store.state.system.userform.role;
      },
      set(val) {
        this.$store.commit("setFormRole", val);
      },
    },
    group: {
      get() {
        return this.$store.state.system.userform.group;
      },
      set(val) {
        this.$store.commit("setFormGroup", val);
      },
    },
  },
  methods: {
    submit: function() {
      Swal.fire({
        title: "",
        text: "The application has been successfully submitted!",
        icon: "success",
        confirmButtonClass: "btn btn-secondary",
      });
    },
    getRoles() {
      this.$store.dispatch(ACTION_GET_ROLE).then((res) => {
        if (!res) return;
        this.getRoles();
      });
    },
    getGroups() {
      this.$store.dispatch(ACTION_GET_GROUP).then((res) => {
        if (!res) return;
        this.getGroups();
      });
    },
  },
};
</script>
