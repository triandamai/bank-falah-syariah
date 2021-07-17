<template>
  <div>
    <Breadcrumbs title="Simpanan" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Master Data Jabatan</h5>
              <span
                >lorem ipsum dolor sit amet, consectetur adipisicing elit</span
              >
            </div>
            <div class="card-body">
              <data-table
                :items="items"
                :headers="headers"
                @add="onAdd"
                @edit="onEdit"
                @delete="onDelete"
                @submit="onSubmit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
    <form-jabatan
      :show="showform"
      :body="body"
      @submit="onSubmit"
      @close="showform = false"
    />
  </div>
</template>

<script>
import header from "@/data/headerjabatan.json";
import {
  ACTION_GET_DATA_MASTER,
  ACTION_POST_DATA_MASTER,
  ACTION_PUT_DATA_MASTER,
  ACTION_DELETE_DATA_MASTER,
  MJABATAN,
} from "@/store/modules/master";
import { mapState } from "vuex";
export default {
  data: () => {
    return {
      headers: header,
      showform: false,
      idEdit: false,
      body: {},
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.master.datajabatan,
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
          type: MJABATAN,
        })
        .then((isNext) => {
          if (isNext) {
            this.getData();
          }
          this.$store.commit('setLoading',false)
        });
    },

    onSubmit(data) {
      this.$store
        .dispatch(
          this.isEdit ? ACTION_PUT_DATA_MASTER : ACTION_POST_DATA_MASTER,
          { type: MJABATAN, body: data }
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
            this.showform = false;
          }
        });
    },
    onDelete(data) {
      this.$swal({
        text: this.$t("Delete Message", { who: `${data.nama_jabatan}` }),
        showCancelButton: true,
        confirmButtonText: "Hapus",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Batal",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      }).then(({ value }) => {
        if (value) {
          this.$store
            .dispatch(ACTION_DELETE_DATA_MASTER, {
              type: MJABATAN,
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
      });
    },
    onAdd() {
      this.body = {};
      this.showform = true;
      this.isEdit = false;
    },
    onEdit(data) {
      this.body = data;
      this.showform = true;
      this.isEdit = true;
    },
  },
};
</script>