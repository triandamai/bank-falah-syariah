<template>
  <div>
    <Breadcrumbs :title="$t('Customer')" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>{{ $t('Form Nasabah') }}</h5>
              <span
                >{{$t('subtitle form nasabah')}}</span
              >
            </div>
            <form-nasabah :isEdit="false" @submit="onSubmit" :body="{}" />
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
    <v-overlay :value="overlay">
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { ACTION_POST_NASABAH } from "@/store/modules/nasabah";
export default {
  data:()=>{return{
    overlay:false,
  }},
  methods: {
    onSubmit(data) {
      this.overlay = true
      this.$store
        .dispatch(ACTION_POST_NASABAH, data)
        .then(({ success, message }) => {
          this.overlay = false
          this.$toasted.show(
            success
              ? this.$t("Success Message", { context: `${message}` })
              : this.$t("Failed Message", { context: `${message}` }),
            {
              theme: "bubble",
              position: "top-right",
              type: success ? "success" : "error",
              duration: 4000,
            }
          );
        });
    },
  },
};
</script>