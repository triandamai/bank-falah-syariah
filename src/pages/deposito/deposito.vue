<template>
  <div>
    <Breadcrumbs title="Deposito" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Rekening Deposito</h5>
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
import header from "../../data/headerdeposito.json";
import {
  ACTION_DELETE_DATA_REKENING,
  ACTION_GET_DATA_REKENING,
  ACTION_POST_DATA_REKENING,
  ACTION_PUT_DATA_REKENING,
  RDEPOSITO,
} from "../../store/modules/rekening";
import { mapState } from "vuex";
export default {
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
        .then((isNext) => {
          if (isNext) {
            this.getData();
          }
        });
    },
    onSubmit(data) {
      this.$store
        .dispatch(
          `rekening/${
            this.isEdit ? ACTION_PUT_DATA_REKENING : ACTION_POST_DATA_REKENING
          }`,
          {
            rekeningtype: RDEPOSITO,
            path: "rekening_deposito",
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
            this.formdeposito = false;
            this.body = {};
          }
        });
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
        text: this.$t("Delete Message", { who: `none` }),
        showCancelButton: true,
        confirmButtonText: "Oke",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Batal",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      }).then(({ value }) => {
        if (value) {
          this.$store
            .dispatch(`rekening/${ACTION_DELETE_DATA_REKENING}`, {
              rekeningtype: RDEPOSITO,
              path: "rekening_deposito",
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