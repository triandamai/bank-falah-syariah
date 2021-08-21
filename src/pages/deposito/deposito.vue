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
    <form-deposito
      :show="form"
      :body="body"
      @close="form = false"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import header from "@/data/headerdeposito.json";
import {
  ACTION_DELETE_DATA_REKENING,
  ACTION_GET_DATA_REKENING,
  ACTION_POST_DATA_REKENING,
  ACTION_PUT_DATA_REKENING,
  RDEPOSITO,
} from "@/store/modules/rekening";
import { mapState } from "vuex";
import pageMixin from "@/mixin/page.mixin"
export default {
  mixins:[pageMixin],
  data: () => {
    return {
      headers: header,
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.rekening.datadeposito,
    }),
  },
  created() {
    this.$store.commit('setLoading',true)
    this.getData();
  },
  methods: {
    getData() {
      this.$store
        .dispatch(ACTION_GET_DATA_REKENING, {
          type: RDEPOSITO,
        })
        .then((isNext) => {
          if (isNext) {
            this.getData();
          }
          this.$store.commit('setLoading',false)
        });
    },
    onSubmit(data) {

      this.$store
        .dispatch(
          this.isEdit ? ACTION_PUT_DATA_REKENING : ACTION_POST_DATA_REKENING,
          {
            type: RDEPOSITO,
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

            this.form = false;
            this.body = {};
          }
        });
    },
    onAdd() {
      this.form = true;
      this.body = {};
      this.isEdit = false;
    },
    onEdit(data) {
      this.form = true;
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
            .dispatch(ACTION_DELETE_DATA_REKENING, {
              type: RDEPOSITO,
              body: data,
            })
        }
      });
    },
  },
};
</script>