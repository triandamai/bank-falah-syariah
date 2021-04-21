<template>
  <div>
    <Breadcrumbs title="Simpanan" />
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
    <form-simpanan
      :show="formsimpanan"
      :body="body"
      @submit="onSubmit"
      @close="formsimpanan = false"
    />
  </div>
</template>

<script>
import DataTable from "../../components/datatable.vue";
import FormSimpanan from "../../components/form_simpanan.vue";
import header from "../../data/headersimpanan.json";
import {
  ACTION_GET_DATA_REKENING,
  RSIMPANAN,
} from "../../store/modules/rekening";
import { mapState } from "vuex";
export default {
  components: {
    DataTable,
    FormSimpanan,
  },
  data: () => {
    return {
      formsimpanan: false,
      headers: header,
      body: {},
      isEdit: false,
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.rekening.datasimpanan,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store
        .dispatch(`rekening/${ACTION_GET_DATA_REKENING}`, {
          mastertype: RSIMPANAN,
          path: "rekening_simpanan",
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
      this.formsimpanan = true;
      this.isEdit = false;
      this.body = {};
    },
    onEdit(data) {
      this.formsimpanan = true;
      this.isEdit = true;
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