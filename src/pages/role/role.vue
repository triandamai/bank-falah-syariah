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
import header from "../../data/headeruser.json";
import {
  ACTION_GET_DATA_SYSTEM,
  ACTION_POST_DATA_SYSTEM,
  ACTION_PUT_DATA_SYSTEM,
  SUSER,
} from "../../store/modules/system";
import { mapState } from "vuex";
export default {
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
      items: (state) => state.system.datausers,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store
        .dispatch(`system/${ACTION_GET_DATA_SYSTEM}`, {
          systemtype: SUSER,
          path: "users",
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
          .dispatch(`system/${ACTION_POST_DATA_SYSTEM}`, {
            systemtype: SUSER,
            path: "user",
            body: data,
          })
          .then(({ success, message }) => {});
      }

      if (!this.isEdit) {
        this.$store
          .dispatch(`system/${ACTION_PUT_DATA_SYSTEM}`, {
            systemtype: SUSER,
            path: "user",
            body: data,
          })
          .then(({ success, message }) => {});
      }
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