<template>
  <div>
    <Breadcrumbs title="Akad" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Data User</h5>
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
    <form-user
      :show="form"
      :body="body"
      :isEdit="isEdit"
      @close="form = false"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import header from "@/data/headeruser.json";
import {
  ACTION_DELETE_DATA_SYSTEM,
  ACTION_GET_DATA_SYSTEM,
  ACTION_POST_DATA_SYSTEM,
  ACTION_PUT_DATA_SYSTEM,
  SUSER,
} from "@/store/modules/system";
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
      items: (state) => state.system.datausers,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store
        .dispatch(ACTION_GET_DATA_SYSTEM, {
          type: SUSER,
        })
        .then((isNext) => {
          if (isNext) {
            this.getData();
          }
        });
    },
    onSubmit(data) {
      this.$store
        .dispatch(
          this.isEdit ? ACTION_PUT_DATA_SYSTEM : ACTION_POST_DATA_SYSTEM,
          {
            type: SUSER,
            body: data,
          }
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
            this.form = false;
            this.body = {};
          }
        });
    },
    onDelete(data) {
      this.$swal({
        text: this.$t("Delete Message", { who: `${data.username}` }),
        showCancelButton: true,
        confirmButtonText: "Oke",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Batal",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      }).then(({ value }) => {
        console.log(value);
        if (value) {
          this.$store
            .dispatch(ACTION_DELETE_DATA_SYSTEM, {
              type: SUSER,

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
      this.body = { active: 1 };
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
