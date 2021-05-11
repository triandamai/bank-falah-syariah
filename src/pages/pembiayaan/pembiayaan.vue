<template>
  <div>
    <Breadcrumbs title="Pembiayaan" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Rekening Pembiayaan</h5>
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
import header from "@/data/headerpembiayaan.json";
import {
  ACTION_DELETE_DATA_REKENING,
  ACTION_GET_DATA_REKENING,
  ACTION_POST_DATA_REKENING,
  ACTION_PUT_DATA_REKENING,
  RPEMBIAYAAN,
} from "@/store/modules/rekening";
import { mapState } from "vuex";
export default {
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
        .dispatch(ACTION_GET_DATA_REKENING, {
          type: RPEMBIAYAAN,
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
          this.isEdit ? ACTION_PUT_DATA_REKENING : ACTION_POST_DATA_REKENING,
          {
            type: RPEMBIAYAAN,
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
            this.formpembiayaan = false;
            this.body = {};
          }
        });
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
        text: this.$t("Delete Message", { who: `${data}` }),
        showCancelButton: true,
        confirmButtonText: "Oke",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Batal",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      }).then(({ value }) => {
        if (value) {
          this.$store
            .dispatch(ACTION_DELETE_DATA_REKENING, {
              type: RPEMBIAYAAN,
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