<template>
  <div>
    <Breadcrumbs :title="$t('Simpanan')" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>{{$t('Master data Simpanan')}}</h5>
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
import header from "@/data/headersimpanan.json";
import {
  ACTION_DELETE_DATA_REKENING,
  ACTION_GET_DATA_REKENING,
  ACTION_POST_DATA_REKENING,
  ACTION_PUT_DATA_REKENING,
  RTABUNGAN,

} from "@/store";
import { mapState } from "vuex";
export default {
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
    this.$store.commit('setLoading',true)
    this.getData();
  },
  methods: {
    getData() {
      this.$store
        .dispatch(ACTION_GET_DATA_REKENING, {
          type: RTABUNGAN,
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
            type: RTABUNGAN,
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
            this.formsimpanan = false;
            this.body = {};
          }
        });
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
              type: RTABUNGAN,
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
