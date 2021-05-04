<template>
  <div>
    <Breadcrumbs title="Akad" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>User Role</h5>
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
    <form-role
      :show="form"
      :body="body"
      @close="form = false"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import header from "../../data/headerrole.json";
import {
  ACTION_DELETE_DATA_SYSTEM,
  ACTION_GET_DATA_SYSTEM,
  ACTION_POST_DATA_SYSTEM,
  ACTION_PUT_DATA_SYSTEM,
  SROLE,
} from "../../store/modules/system";
import { mapState } from "vuex";
export default {
  data: () => {
    return {
      headers: header,
      form: false,
      body: {},
      isEdit: false,
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.system.dataroles,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store
        .dispatch(`system/${ACTION_GET_DATA_SYSTEM}`, {
          systemtype: SROLE,
          path: "roles",
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
          .dispatch(`system/${ACTION_PUT_DATA_SYSTEM}`, {
            systemtype: SROLE,
            path: "role",
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
              this.form = false;
              this.body = {};
            }
          });
      }

      if (!this.isEdit) {
        this.$store
          .dispatch(`system/${ACTION_POST_DATA_SYSTEM}`, {
            systemtype: SROLE,
            path: "role",
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
    onDelete(data) {
      this.$swal({
        text: `Hapus ${data.name}?`,
        showCancelButton: true,
        confirmButtonText: "Oke",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Batal",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      }).then(({ value }) => {
        if (value) {
          this.$store
            .dispatch(`system/${ACTION_DELETE_DATA_SYSTEM}`, {
              systemtype: SROLE,
              path: "role",
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
    onAdd() {
      this.body = {};
      this.form = true;
      this.isEdit = false;
    },
    onEdit(data) {
      this.body = data;
      this.form = true;
      this.isEdit = true;
    },
  },
};
</script>