<template>
  <div>
    <Breadcrumbs :title="$t('Customer')" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <!-- BEGIN CHART -->
        <div class="col-xl-12 xl-100 dashboard-sec box-col-12">
          <px-card class="earning-card">
            <div class="row">
              <div class="earning-content col-xl-3 col-lg-12 col-md-12">
                <div class="row  chart-left">
                  <div class="col-xl-12 left_side_earning">
                    <h5>{{$t('Data Customer')}}</h5>
                    <p class="font-roboto">{{$t('subtitlenasabah')}}</p>
                  </div>
                  <div class="col-xl-12 left-btn">
                    <a class="btn btn-gradient" @click="formimport = true"
                      >{{ $t('Import') }}</a
                    >
                  </div>
                </div>
              </div>

              <div class="chart-right col-xl-9 col-lg-12 col-md-12 pt-5 pb-5">
                <data-table
                  :items="nasabah"
                  :headers="headers"
                  @add="$router.push({ name: 'addnasabah' })"
                  @edit="onChange"
                  @delete="onDelete"
                />
              </div>
            </div>
          </px-card>
        </div>
        <!-- END CHART -->
      </div>
    </div>
    <!-- Container-fluid Ends-->
    <form-import-nasabah :show="formimport" @close="formimport = false" />
  </div>
</template>

<script>
import header from "@/data/headernasabah.json";
import {
  ACTION_GET_NASABAH,
  ACTION_DELETE_NASABAH,
} from "@/store/modules/nasabah";
import { mapState } from "vuex";
export default {
  data: () => {
    return {
      headers: header,
      formimport: false,
    };
  },
  computed: {
    ...mapState({
      nasabah: (state) => state.nasabah.datanasabah,
    }),
  },
  created() {
    this.$store.commit('setLoading',true)
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch(ACTION_GET_NASABAH).then((isNext) => {
        if (isNext) {
          this.getData();
        }
        this.$store.commit('setLoading',false)
      });
    },
    onChange(nasabah) {
      this.$router.push({ path: `nasabah/edit/${nasabah.id}` });
    },
    onDelete(nasabah) {
      this.$swal({
        text: this.$t("Delete Message", { who: `${nasabah.nama_lengkap}` }),
        showCancelButton: true,
        confirmButtonText: "Oke",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Batal",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      }).then(({ value }) => {
        if (value) {
          this.$store
            .dispatch(ACTION_DELETE_NASABAH, nasabah)
            .then(({ success, message }) => {
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
        }
      });
    },
  },
};
</script>
