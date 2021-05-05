<template>
  <div>
    <Breadcrumbs title="Akad" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 project-list">
          <div class="card">
            <div class="row">
              <div class="col-sm-12 p-0">
                <b-tabs content-class="mt-3">
                  <b-tab active>
                    <template v-slot:title>
                      <feather type="book"></feather> Cetak Sampul
                    </template>
                    <b-card-text>
                      <div class="col-sm-12 p-0">
                        <div class="card">
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
                    </b-card-text>
                  </b-tab>
                  <b-tab>
                    <template v-slot:title>
                      <feather type="database"></feather> Cetak Mutasi
                    </template>
                    <b-card-text>
                      <div class="col-sm-12 p-0">
                        <div class="card">
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
                    </b-card-text>
                  </b-tab>
                </b-tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>

<script>
import header from "../../data/headerakad.json";
import {
  ACTION_GET_DATA_MASTER,
  ACTION_POST_DATA_MASTER,
  ACTION_PUT_DATA_MASTER,
  ACTION_DELETE_DATA_MASTER,
  MAKAD,
} from "../../store/modules/master";
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
      items: (state) => state.master.dataakad,
    }),
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store
        .dispatch(`master/${ACTION_GET_DATA_MASTER}`, {
          mastertype: MAKAD,
          path: "akad",
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
            mastertype: MAKAD,
            path: "akad",
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
              this.formakad = false;
            }
          });
      }

      if (!this.isEdit) {
        this.$store
          .dispatch(`master/${ACTION_POST_DATA_MASTER}`, {
            mastertype: MAKAD,
            path: "akad",
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
            if (success) {
              this.onAdd();
            }
          });
      }
    },
    onDelete(data) {
      this.$swal({
        text: `Hapus ${data.nama_akad}?`,
        showCancelButton: true,
        confirmButtonText: "Hapus",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Batal",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      }).then(({ value }) => {
        if (value) {
          this.$store
            .dispatch(`master/${ACTION_DELETE_DATA_MASTER}`, {
              mastertype: MAKAD,
              path: "akad",
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
      this.body = { active: 1 };
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