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
                        class="form-control form-control-solid form-control-lg"
                      >
                        <option value="">Pilih</option>
                        <option value="AF">1</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <div class="form-group">
                      <label>Group</label>
                      <select
                        class="form-control form-control-solid form-control-lg"
                      >
                        <option value="">Pilih</option>
                        <option value="AF">1</option>
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
import KTUtil from "@/assets/js/components/util";
import KTWizard from "@/assets/js/components/wizard";
import Swal from "sweetalert2";

export default {
  name: "TambahUser",
  mounted() {},
  methods: {
    submit: function() {
      Swal.fire({
        title: "",
        text: "The application has been successfully submitted!",
        icon: "success",
        confirmButtonClass: "btn btn-secondary",
      });
    },
  },
};
</script>
