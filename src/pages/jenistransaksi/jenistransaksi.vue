<template>
  <div>
    <Breadcrumbs title="Jenis Transaksi" />
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
      :show="formjenistransaksi"
      :body="body"
      @close="formjenistransaksi = false"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import header from "../../data/headerjenistransaksi.json";
import {
  ACTION_GET_DATA_MASTER,
  MJENISTRANSAKSI,
} from "../../store/modules/master";
import { mapState } from "vuex";
export default {
  data: () => {
    return {
      headers: header,
      formjenistransaksi: false,
      body: {},
      isEdit: false,
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.master.datajenistransaksi,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store
        .dispatch(`master/${ACTION_GET_DATA_MASTER}`, {
          mastertype: MJENISTRANSAKSI,
          path: "jenis-transaksi",
        })
        .then((res) => {
          if (res) {
            this.getData();
          }
        });
    },
    onSubmit(data) {},
    onAdd() {
      this.formjenistransaksi = true;
      this.body = {};
      this.isEdit = false;
    },
    onEdit(data) {
      this.formjenistransaksi = true;
      this.body = data;
      this.isEdit = true;
    },
    onDelete(data) {
      this.$swal({
        text: "Are you sure you want to do this?",
        showCancelButton: true,
        confirmButtonText: "Oke",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Batal",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      });
    },
  },
};
</script>