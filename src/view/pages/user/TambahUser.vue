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
            <form-user :isEdit="false" @buttonsubmit="submit" />
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
import { ACTION_POST_USER, MUTATION_CLEAR_FORM_USER } from "..";
import { mapState } from "vuex";
import FormUser from "../../components/form/FormUser.vue";

export default {
  name: "TambahUser",
  components: {
    FormUser,
  },
  computed: {
    ...mapState({
      message: (state) => state.system.userform.message,
    }),
  },
  methods: {
    submit(val) {
      this.$store.dispatch(ACTION_POST_USER).then((res) => {
        if (res) {
          this.$store.commit(MUTATION_CLEAR_FORM_USER);
          Swal.fire({
            title: "",
            text: this.message,
            icon: "success",
            confirmButtonText: "Oke",
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.go(-1);
            }
          });
        } else {
          Swal.fire({
            title: "",
            text: this.message,
            icon: "error",
            confirmButtonText: "Coba lagi",
          });
        }
      });
    },
  },
};
</script>
