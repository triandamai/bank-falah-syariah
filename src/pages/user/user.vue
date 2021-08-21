<template>
  <div>
    <Breadcrumbs :title="$t('User')" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-12 xl-100 dashboard-sec box-col-12">
          <px-card class="earning-card">
            <div class="row">
              <div class="earning-content col-xl-3 col-lg-12 col-md-12">
                <div class="row  chart-left">
                  <div class="col-xl-12 left_side_earning">
                    <h5>{{$t('Data User')}}</h5>
                    <p class="font-roboto">{{$t('subtitleuser')}}</p>
                  </div>
                  <div class="col-xl-12 left-btn">
                    <a class="btn btn-gradient" @click="form_import = true"
                    >{{ $t('Import Siswa') }}</a
                    >
                  </div>
                </div>
              </div>

              <div class="chart-right col-xl-9 col-lg-12 col-md-12 pt-5 pb-5">
                <data-table
                    :items="items"
                    :headers="headers"
                    @add="onAdd"
                    @edit="onEdit"
                    @delete="onDelete"
                />
              </div>
            </div>
          </px-card>
        </div>

      </div>
    </div>
    <!-- Container-fluid Ends-->
    <form-user
      :show="form"
      :body="body"
      :edit="isEdit"
      @close="form = false"
      @submit="onSubmit"
    />
    <form-import-siswa :show="form_import" @close="form_import = false" />
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
import pageMixin from "@/mixin/page.mixin"
export default {
  mixins:[pageMixin],
  data: () => {
    return {
      headers: header,
      form_import:false
    };
  },
  computed: {
    ...mapState({
      items: (state) => state.system.datausers,
    }),
  },
  created() {
    this.$store.commit('setLoading',true)
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
          this.$store.commit('setLoading',false)
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
        .then(({ success }) => {

          if (success) {
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

        if (value) {
          this.$store
            .dispatch(ACTION_DELETE_DATA_SYSTEM, {
              type: SUSER,

              body: data,
            })

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
      this.body.role_id = data.role[0].id
      this.form = true;
      this.isEdit = true;
    },
  },
};
</script>
