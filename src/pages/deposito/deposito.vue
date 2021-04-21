<template>
  <div>
    <Breadcrumbs title="Deposito" />
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
              <data-table :items="items" :headers="headers" @add="onAdd" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
    <form-deposito :show="formdeposito" @close="formdeposito = false" />
  </div>
</template>

<script>
import DataTable from "../../components/datatable.vue";
import FormDeposito from "../../components/form_deposito.vue";
import header from "../../data/headerdeposito.json";
import {
  ACTION_GET_DATA_REKENING,
  RDEPOSITO,
} from "../../store/modules/rekening";
import { mapState } from "vuex";
export default {
  components: {
    DataTable,
    FormDeposito,
  },
  data: () => {
    return {
      headers: header,
      formdeposito: false,
      body: {},
      isEdit: false,
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.rekening.datadeposito,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store
        .dispatch(`rekening/${ACTION_GET_DATA_REKENING}`, {
          mastertype: RDEPOSITO,
          path: "rekening_deposito",
        })
        .then((res) => {
          if (res) {
            this.getData();
          }
        });
    },
    onSubmit(data) {
      if (this.isEdit) {
      }
      if (!this.isEdit) {
      }
    },
    onAdd() {
      this.formdeposito = true;
      this.body = {};
      this.isEdit = false;
    },
    onEdit(data) {
      this.formdeposito = true;
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