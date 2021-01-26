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
            <form-user :isEdit="true" :user="user" @buttonsubmit="submit" />
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
import { ACTION_PUT_DATA_SYSTEM, SUSER } from "@/store";

import { mapState } from "vuex";

export default {
  name: "TambahUser",
  data: {
    user: {},
  },
  created() {
    if (!this.userformvalidation) {
      this.$router.go(-1);
    }
    if (!this.$router.params.id) {
      this.user = this.$store.getters.system.getUserById(
        this.$router.params.id
      );
    }
  },
  computed: {
    ...mapState({
      message: (state) => state.system.userform.message,
    }),
  },
  methods: {
    submit(val) {
      this.$store
        .dispatch("system/" + ACTION_PUT_DATA_SYSTEM, {
          systemtype: SUSER,
          path: "user",
          val,
        })
        .then((res) => {
          if (res) {
            Swal.fire({
              title: "Berhasil",
              text: res,
              icon: "success",
              confirmButtonText: "Oke",
            }).then((result) => {
              if (result.isConfirmed) {
                this.$router.go(-1);
              }
            });
          } else {
            Swal.fire({
              title: "Gagal",
              text: res,
              icon: "error",
              confirmButtonText: "Coba lagi",
            });
          }
        });
    },
  },
};
</script>
