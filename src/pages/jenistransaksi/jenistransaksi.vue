<template>
  <div>
    <Breadcrumbs title="Jenis Transaksi" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Master Data Jenis Transaksi</h5>
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
    <form-jenistransaksi
      :show="form"
      :body="body"
      @close="form = false"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import header from "../../data/headerjenistransaksi.json";
import {
  ACTION_GET_DATA_MASTER,
  ACTION_POST_DATA_MASTER,
  ACTION_PUT_DATA_MASTER,
  ACTION_DELETE_DATA_MASTER,
  MJENISTRANSAKSI,
} from "../../store/modules/master";
import { mapState } from "vuex";
import pageMixin from "@/mixin/page.mixin"
export default {
  mixins:[pageMixin],
  data: () => {
    return {
      headers: header,
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.master.datajenistransaksi,
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
          type: MJENISTRANSAKSI,
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
          {
            type: MJENISTRANSAKSI,
            body: data,
          }
        )
        .then(({ success}) => {

          if (success) {
            this.form = false;
            this.body = {};
          }
        });
    },
    onAdd() {
      this.form = true;
      this.body = {};
      this.isEdit = false;
    },
    onEdit(data) {
      this.form = true;

      this.body = {
        id:data.id,
        nama_transaksi:data.nama_transaksi,
        kode_transaksi:data.kode_transaksi
      };
      this.isEdit = true;
    },
    onDelete(data) {
      this.$swal({
        text: this.$t("Delete Message", { who: `${data.nama_transaksi}` }),
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
              type: MJENISTRANSAKSI,
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
  },
};
</script>