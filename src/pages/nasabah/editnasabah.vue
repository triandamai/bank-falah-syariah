<template>
  <div>
    <Breadcrumbs :title="$t('Edit Data Nasabah')" />
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
            <form-nasabah :isEdit="true" @submit="onSubmit" :body="body" />
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
import { ACTION_PUT_NASABAH } from "@/store/modules/nasabah";
import ApiService from "@/services/api.service";
export default {
  data: () => {
    return {
      overlay:false,
      body: {

      },
    };
  },
  created() {
    this.overlay = true
    if (this.$route.params.id) {
      this.getNasabahById(this.$route.params.id);
    }
  },
  methods: {
    getNasabahById(id) {
      ApiService.get(`nasabah/${id}?t=${new Date().getMilliseconds()}`)
        .then(({ status, data }) => {
          this.overlay =false
          if (status === 200 || status === 201) {
            this.body = data.data[0];
            this.body.
          }
        })
          // eslint-disable-next-line no-unused-vars
        .catch((e) => {

        });
    },
    onSubmit(data) {
      this.overlay = true
      this.$store
        .dispatch(ACTION_PUT_NASABAH, data)
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