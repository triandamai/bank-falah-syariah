<template>
  <div>
    <Breadcrumbs title="Produk" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Sample Card</h5>
              <span
                >lorem ipsum dolor sit amet, consectetur adipisicing elit</span
              >
            </div>
            <div class="card-body">
              <data-table
                :items="items"
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
    <form-produk
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
      items: (state) => state.master.dataproduk,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store
        .dispatch(`master/${ACTION_GET_DATA_MASTER}`, {
          mastertype: MPRODUK,
          path: "produk",
        })
        .then((res) => {
          if (res) {
            this.getData();
          }
        });
    },
    onSubmit(data) {
      if (this.isEdit) {
        this.$store
          .dispatch(`master/${ACTION_PUT_DATA_MASTER}`, {
            mastertype: MPRODUK,
            path: "produk",
            body: data,
          })
          .then(({ success, message }) => {
            this.$toasted.show(`${message}`, {
              theme: "bubble",
              position: "top-right",
              type: success ? "success" : "error",
              duration: 4000,
            });
            if (success) {
              this.formproduk = false;
              this.body = {};
            }
          });
      }
      if (!this.isEdit) {
        this.$store
          .dispatch(`master/${ACTION_POST_DATA_MASTER}`, {
            mastertype: MPRODUK,
            path: "produk",
            body: data,
          })
          .then(({ success, message }) => {
            this.$toasted.show(`${message}`, {
              theme: "bubble",
              position: "top-right",
              type: success ? "success" : "error",
              duration: 4000,
            });
            if (success) {
              this.onAdd();
            }
          });
      }
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
            .dispatch(`master/${ACTION_DELETE_DATA_MASTER}`, {
              mastertype: MPRODUK,
              path: "produk",
              body: data,
            })
            .then(({ success, message }) => {
              this.$toasted.show(`${message}`, {
                theme: "bubble",
                position: "top-right",
                type: success ? "success" : "error",
                duration: 4000,
              });
            });
        }
      });
    },
  },
};
</script>