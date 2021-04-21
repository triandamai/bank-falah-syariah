<template>
  <div>
    <Breadcrumbs title="Pembiayaan" />
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
    <form-pembiayaan :show="formpembiayaan" @close="formpembiayaan = false" />
  </div>
</template>

<script>
import DataTable from "../../components/datatable.vue";
import FormPembiayaan from "../../components/form_pembiayaan.vue";
import header from "../../data/headerpembiayaan.json";
import {
  ACTION_GET_DATA_REKENING,
  RPEMBIAYAAN,
} from "../../store/modules/rekening";
import { mapState } from "vuex";
export default {
  components: {
    DataTable,
    FormPembiayaan,
  },
  data: () => {
    return {
      formpembiayaan: false,
      headers: header,
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.rekening.datapembiayaan,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store
        .dispatch(`rekening/${ACTION_GET_DATA_REKENING}`, {
          mastertype: RPEMBIAYAAN,
          path: "rekening_pembiayaan",
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
      this.formpembiayaan = true;
      this.isEdit = false;
      this.body = {};
    },
    onEdit(data) {
      this.formpembiayaan = true;
      this.isEdit = data;
      this.body = data;
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