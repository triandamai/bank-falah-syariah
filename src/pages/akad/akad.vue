<template>
  <div>
    <Breadcrumbs :title="$t('Akad')" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>{{$t('Master Data Akad')}}</h5>
              <span
                >{{$t('subtitle Akad')}}</span
              >
            </div>
            <div class="card-body">
              <data-table
                :items="items_akad"
                :headers="headers"
                @add="form = true"
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
      :show="form"
      :body="body"
      @submit="onSubmit"
      @close="form = false"
    />
  </div>
</template>

<script>
import header from "@/data/headerakad.json";
import {
  ACTION_GET_DATA_MASTER,
  ACTION_POST_DATA_MASTER,
  ACTION_PUT_DATA_MASTER,
  ACTION_DELETE_DATA_MASTER,
  MPRODUK,
} from "@/store";

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
      items_akad: (state) => state.master.dataproduk,
    }),
  },
  created() {
    this.$store.commit('setLoading',true)
    this.getData();
  },
  methods: {
    getData() {

      this.$store
        .dispatch(ACTION_GET_DATA_MASTER, {
          type: MPRODUK,
        })
        .then((isNext) => {
          if (isNext) {
            this.getData();
          }
          this.$store.commit('setLoading',false)
        }).catch(()=>{
        this.unAuthorize()
      });
    },
    onSubmit(data) {
      this.$store
        .dispatch(
          this.isEdit ? ACTION_PUT_DATA_MASTER : ACTION_POST_DATA_MASTER,
          {
            type: MPRODUK,
            body: data,
          }
        )
        .then(({ success }) => {
          if (success) {
            this.formproduk = false;
            this.body = {};
          }
        })
    },
    onAdd() {
      this.form = true;
      this.body = {};
      this.isEdit = false;
    },
    onEdit(data) {
      console.log(data)
      this.form = true;
      this.body = {
        id:data.id,
        nama_produk:data.nama_produk,
        tipe_produk:data.tipe_produk,
        kode_produk:data.kode_produk,
        saldo_minimum:data.saldo_minimum,

      };
      this.isEdit = true;
    },
    onDelete(data) {
      this.$swal({
        text: `Hapus ${data.nama_produk}?`,
        showCancelButton: true,
        confirmButtonText: "Oke",
        confirmButtonColor: "#4466f2",
        cancelButtonText: "Batal",
        cancelButtonColor: "#efefef",
        reverseButtons: true,
      }).then(({ value }) => {
        if (value) {
          this.$store
            .dispatch(ACTION_DELETE_DATA_MASTER, {
              type: MPRODUK,
              body: data,
            })
        }
      })
    },
  },
};
</script>
