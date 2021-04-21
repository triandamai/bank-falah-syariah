<template>
  <div>
    <Breadcrumbs title="Akad" />
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
    <form-akad
      :show="formakad"
      :body="body"
      @close="formakad = false"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import DataTable from "../../components/datatable.vue";
import FormAkad from "../../components/form_akad.vue";
import header from "../../data/headerakad.json";
import {
  ACTION_GET_DATA_MASTER,
  ACTION_POST_DATA_MASTER,
  ACTION_PUT_DATA_MASTER,
  MAKAD,
} from "../../store/modules/master";
import { mapState } from "vuex";
export default {
  components: {
    DataTable,
    FormAkad,
  },
  data: () => {
    return {
      headers: header,
      formakad: false,
      body: {},
      isEdit: false,
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.master.dataakad,
    }),
  },
  created() {
    this.getAkad();
  },
  methods: {
    getAkad() {
      this.$store
        .dispatch(`master/${ACTION_GET_DATA_MASTER}`, {
          mastertype: MAKAD,
          path: "akad",
        })
        .then((res) => {
          if (res) {
            this.getAkad();
          }
        });
    },
    onSubmit(data) {
      if (this.isEdit) {
        this.$store
          .dispatch(`master/${ACTION_PUT_DATA_MASTER}`, {
            mastertype: MAKAD,
            path: "akad",
            body: data,
          })
          .then(({ success, message }) => {});
      }

      if (!this.isEdit) {
        this.$store
          .dispatch(`master/${ACTION_POST_DATA_MASTER}`, {
            mastertype: MAKAD,
            path: "akad",
            body: data,
          })
          .then(({ success, message }) => {});
      }
    },
    onDelete() {
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
    onAdd() {
      this.body = {};
      this.formakad = true;
      this.isEdit = false;
    },
    onEdit(data) {
      this.body = data;
      this.formakad = true;
      this.isEdit = true;
    },
  },
};
</script>