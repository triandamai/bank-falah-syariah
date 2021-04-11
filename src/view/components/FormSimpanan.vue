<!--
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 --->
<template>
  <form class="form" id="kt_form" @submit.prevent="submit">
    <!--begin: Wizard Step 1-->
    <div
      class="pb-5"
      data-wizard-type="step-content"
      data-wizard-state="current"
    >
      <h3 class="mb-10 font-weight-bold text-dark">
        Menambahkan Rekening Simpanan
      </h3>
      <div class="form-group">
        <label>Nasabah</label>
        <input
          type="text"
          v-model="nasabah.nama_lengkap"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: Zaenur Rochman"
          @click="dialognasabah = !dialognasabah"
        />
        <span class="form-text text-muted"
          >Masukkan Nasaba ayang akan dibuat rekening.</span
        >
      </div>

      <div class="form-group">
        <label>Pegawai</label>
        <input
          type="text"
          v-model="pegawai_name"
          class="form-control form-control-solid form-control-lg"
          placeholder="Trian Damai"
        />
        <span class="form-text text-muted">Pegawai yang melayani.</span>
      </div>
      <div class="form-group">
        <label>Produk</label>
        <input
          type="text"
          v-model="produk.nama_produk"
          class="form-control form-control-solid form-control-lg"
          placeholder="Trian Damai"
          @click="dialogproduk = !dialogproduk"
        />
        <span class="form-text text-muted">Produk yang dipakai.</span>
      </div>
      <div class="form-group">
        <label>Tanggal Pembuatan</label>
        <input
          type="date"
          v-model="tgl_buka"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh:01-04-202"
        />
        <span class="form-text text-muted">Pilih tanggal pencairan.</span>
      </div>
    </div>

    <!--end: Wizard Step 1-->

    <!--begin: Wizard Actions -->
    <div class="pt-10 d-flex justify-content-between border-top">
      <div class="mr-2">
        <button
          type="button"
          class="py-4 btn btn-light-primary font-weight-bold text-uppercase px-9"
        >
          Batal
        </button>
      </div>
      <div>
        <button
          type="submit"
          class="py-4 btn btn-success font-weight-bold text-uppercase px-9"
        >
          Simpan
        </button>
      </div>
    </div>
    <!--end: Wizard Actions -->
    <!-- <v-row justify="center"> -->

    <dialog-nasabah
      :show="dialognasabah"
      @close="dialognasabah = !dialognasabah"
      @choose="onNasabahChoose"
    />
    <dialog-produk
      :show="dialogproduk"
      @close="dialogproduk = !dialogproduk"
      @choose="onProdukChoose"
    />
  </form>
</template>
<script>
/*eslint-disable*/
import { mapState } from "vuex";
import { getUser } from "../../store";

export default {
  name: "FormUser",
  props: ["isEdit"],
  data: () => {
    return {
      produk: {},
      nasabah: {},
      pegawai_id: "",
      pegawai_name: "",
      tgl_buka: "",
      dialognasabah: false,
      dialogproduk: false,
    };
  },

  computed: {
    ...mapState({
      groups: (state) => {
        return state.system.datagroups;
      },
      roles: (state) => {
        return state.system.dataroles;
      },
    }),
    //form
  },
  created() {
    const user = getUser();
    this.pegawai_id = user.id;
    this.pegawai_name = user.username;
  },
  methods: {
    onNasabahChoose(nasabah) {
      this.dialognasabah = !this.dialognasabah;
      this.nasabah = nasabah;
    },
    onProdukChoose(produk) {
      this.dialogproduk = !this.dialogproduk;
      this.produk = produk;
    },
    submit() {
      if (this.isEdit) {
        this.$emit("buttonsubmit", {
          tgl_buka: this.tgl_buka,
          nasabah_id: this.nasabah.id,
          pegawai_id: this.pegawai_id,
          produk_id: this.produk.id,
        });
      } else {
        this.$emit("buttonsubmit", {
          tgl_buka: this.tgl_buka,
          nasabah_id: this.nasabah.id,
          pegawai_id: this.pegawai_id,
          produk_id: this.produk.id,
        });
      }
    },
  },
};
/**
 * tgl_buka
 * nasabah_id
 * produk_id
 * pegawai_id
 */
</script>
