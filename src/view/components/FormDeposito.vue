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
        Menambahkan Rekening Deposito
      </h3>
      <div class="form-group">
        <label>Nasabah</label>
        <input
          type="text"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: Zaenur Rochman"
          v-model="nasabah_name"
          @click="dialognasabah = !dialognasabah"
        />
        <span class="form-text text-muted"
          >Masukkan Nasaba a=yang akan dibuat rekening.</span
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
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: Produk A"
          v-model="produk_name"
          @click="dialogproduk = !dialogproduk"
        />
        <span class="form-text text-muted"
          >Masukkan produk akan dibuat rekening.</span
        >
      </div>
      <div class="form-group">
        <label>Tanggal Pembuatan</label>
        <input
          type="date"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh:01-04-202"
          v-model="tanggal_buka"
        />
        <span class="form-text text-muted">Pilih tanggal pembuatan.</span>
      </div>
      <div class="form-group">
        <label>Tanggal jatuh Tempo</label>
        <input
          type="date"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: 01-04-2021"
          v-model="tanggal_tempo"
        />
        <span class="form-text text-muted">Pilih tanggal jatuh tempo.</span>
      </div>
      <div class="form-group">
        <label>Nilai Deposito</label>
        <input
          type="number"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: Rp 10 000"
          v-model="nilai"
        />
        <span class="form-text text-muted">Masukkan Nilai deposito user.</span>
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
      @choose="onDialogNasabah"
    />
    <dialog-produk
      :show="dialogproduk"
      @close="dialogproduk = !dialogproduk"
      @choose="onDialogProduk"
    />
  </form>
</template>
<script>
/*eslint-disable*/
import { mapState } from "vuex";
import { getUser } from "../../core/services/jwt.service";

export default {
  name: "FormUser",
  data: () => {
    return {
      id: "",
      nasabah_id: "",
      nasabah_name: "",
      pegawai_id: "",
      pegawai_name: "",
      tanggal_buka: "",
      tanggal_tempo: "",
      produk_name: "",
      produk: {},
      nilai: "",
      dialoguser: false,
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
    if (this.$route.params.id) {
      // this.getUserById(this.$route.params.id);
    }

    const pegawai = getUser();
    this.pegawai_name = pegawai.username;
    this.pegawai_id = pegawai.id;

    // console.log(getUser());
  },
  methods: {
    onDialogNasabah(nasabah) {
      this.dialognasabah = !this.dialognasabah;
      this.nasabah_id = nasabah.id;
      this.nasabah_name = nasabah.nama_lengkap;
    },
    onDialogProduk(produk) {
      this.dialogproduk = !this.dialogproduk;
      this.produk_name = produk.nama_produk;
      this.produk = produk;
    },
    submit() {
      if (this.isEdit) {
        // if (this.username && this.email && this.role && this.group) {
        this.$emit("submit", {
          id: this.id,
          tgl_buka: this.tanggal_buka,
          tgl_jatuh_tempo: this.tanggal_tempo,
          produk_id: this.produk.id,
          nasabah_id: this.nasabah_id,
          pegawai_id: this.pegawai_id,
          nilai_deposito: this.nilai,
        });
        // }
      } else {
        // if (
        //   this.username &&
        //   this.password &&
        //   this.email &&
        //   this.role &&
        //   this.group
        // ) {

        this.$emit("submit", {
          id: this.id,
          tgl_buka: this.tanggal_buka,
          tgl_jatuh_tempo: this.tanggal_tempo,
          produk_id: this.produk.id,
          nasabah_id: this.nasabah_id,
          pegawai_id: this.pegawai_id,
          nilai_deposito: this.nilai,
        });
        // }
      }
    },
  },
};
</script>
