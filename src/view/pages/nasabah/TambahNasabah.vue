<template>
  <div class="card card-custom">
    <div class="p-0 card-body">
      <!--begin: Wizard-->
      <div
        class="wizard wizard-2"
        id="kt_wizard_v2"
        data-wizard-state="step-first"
        data-wizard-clickable="true"
      >
        <!--begin: Wizard Nav -->
        <stepper :steps="steps" />
        <!--end: Wizard Nav -->

        <!--begin: Wizard Body -->
        <form-nasabah v-on:submit="submit" />
        <!--end: Wizard Body -->
      </div>
      <!--end: Wizard-->
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/sass/pages/wizard/wizard-2.scss";
</style>

<script>
/*eslint-disable*/
import KTUtil from "@/assets/js/components/util";
import KTWizard from "@/assets/js/components/wizard";
import Swal from "sweetalert2";
import { ACTION_TAMBAH_NASABAH } from "../../../store";

export default {
  name: "Wizard-2",
  data() {
    return {
      steps: [
        {
          id: 1,
          title: "Data Umum",
          subtitle: "data pribadi dan identitas pribadi",
        },
        {
          id: 2,
          title: "Data Alamat",
          subtitle: "detail alamat dan kontak alamat",
        },
        {
          id: 3,
          title: "Selesai",
          subtitle: "Cek data dan simpan",
        },
      ],
    };
  },
  mounted() {
    // Initialize form wizard
    const wizard = new KTWizard("kt_wizard_v2", {
      startStep: 1, // initial active step number
      clickableSteps: true, // allow step clicking
    });

    // Validation before going to next page
    wizard.on("beforeNext", function (/*wizardObj*/) {
      // validate the form and use below function to stop the wizard's step
      // wizardObj.stop();
    });

    // Change event
    wizard.on("change", function (/*wizardObj*/) {
      setTimeout(() => {
        KTUtil.scrollTop();
      }, 500);
    });
  },
  methods: {
    submit: function (body) {
      console.log(body);
      this.$store
        .dispatch("nasabah/" + ACTION_TAMBAH_NASABAH, body)
        .then((res) => {
          Swal.fire({
            title: "",
            text: "The application has been successfully submitted!",
            icon: "success",
            confirmButtonClass: "btn btn-secondary",
          });
        });
    },
  },
};
</script>
