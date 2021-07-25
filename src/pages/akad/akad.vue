<template>
  <div>
    <Breadcrumbs :title="$t('Akad')" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>{{$t('Master Data Akad')}}</h5>
              <span
                >{{$t('subtitle Akad')}}</span
              >
            </div>
            <div class="card-body">
              <data-table
                :items="items_akad"
                :headers="headers"
                @add="formproduk = true"
                @edit="onEdit"
                @delete="onDelete"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
    <form-akad
      :show="formproduk"
      :body="body"
      @submit="onSubmit"
      @close="formproduk = false"
    />
  </div>
</template>

<script>
import header from "../../data/headerproduk.json";
import {
  ACTION_GET_DATA_MASTER,
  ACTION_POST_DATA_MASTER,
  ACTION_PUT_DATA_MASTER,
  ACTION_DELETE_DATA_MASTER,
  MPRODUK,
} from "../../store/modules/master";

import { mapState } from "vuex";
export default {
  data: () => {
    return {
      headers: header,
      formproduk: false,
      body: {},
      isEdit: false,
    };
  },
  computed: {
    ...mapState({
      items_akad: (state) => state.master.dataproduk,
    }),
  },
  created() {
    this.$store.commit('setLoading',true)
    this.getData();
  },
  methods: {
    getData() {

      this.$store
        .dispatch(ACTION_GET_DATA_MASTER, {
          type: MPRODUK,
        })
        .then((isNext) => {
          if (isNext) {
            this.getData();
          }
          this.$store.commit('setLoading',false)
        }).catch(()=>{
        this.unAuthorize()
      });
    },
    onSubmit(data) {
      this.$store
        .dispatch(
          this.isEdit ? ACTION_PUT_DATA_MASTER : ACTION_POST_DATA_MASTER,
          {
            type: MPRODUK,
            body: data,
          }
        )
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
          if (success) {
            if (!this.isEdit) {
              this.onAdd();
              return;
            }
            this.formproduk = false;
            this.body = {};
          }
        })
    },
    onAdd() {
      this.formproduk = true;
      this.body = {};
      this.isEdit = false;
    },
    onEdit(data) {
      this.formproduk = true;
      this.body = data;
      this.isEdit = data;
    },
    onDelete(data) {
      this.$swal({
        text: `Hapus ${data.nama_produk}?`,
        showCancelButton: true,
        confirmButtonText: "Oke",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Batal",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      }).then(({ value }) => {
        if (value) {
          this.$store
            .dispatch(ACTION_DELETE_DATA_MASTER, {
              type: MPRODUK,
              body: data,
            })
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
      })
    },
  },
};
</script>
