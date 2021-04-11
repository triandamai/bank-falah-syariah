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
        Menambahkan Rekening Pembiayaan
      </h3>
      <div class="form-group">
        <label>Nasabah</label>
        <input
          type="text"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: Zaenur Rochman"
          v-model="nasabah.nama_lengkap"
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
        <label>Tanggal Pencairan</label>
        <input
          type="date"
          v-model="tgl_pencairan"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh:01-04-202"
        />
        <span class="form-text text-muted">Pilih tanggal pencairan.</span>
      </div>
      <div class="form-group">
        <label>jatuh Tempo</label>
        <input
          type="date"
          v-model="tgl_jatuh_tempo"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: 01-04-2021"
        />
        <span class="form-text text-muted">Pilih tanggal jatuh tempo.</span>
      </div>

      <div class="form-group">
        <label>Tipe Angsuran</label>
        <select
          v-model="tipe_angsuran"
          class="form-control form-control-solid form-control-lg"
        >
          <option value="0" selected>Pilih Tipe</option>
          <option value="1">Minguan</option>
          <option value="2">Harian</option>
        </select>
        <span class="form-text text-muted">Masukkan Negara.</span>
      </div>
      <div class="form-group">
        <label>Lama Angsuran</label>
        <input
          type="number"
          v-model="lama_angsuran"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: Rp 10 000"
        />
        <span class="form-text text-muted">Masukkan durasi angsuran.</span>
      </div>
      <div class="form-group">
        <label>Modal</label>
        <input
          type="number"
          v-model="modal"
          class="form-control form-control-solid form-control-lg"
          placeholder="Contoh: Rp 10 000"
        />
        <span class="form-text text-muted">Masukkan jumlah modal.</span>
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
          @click="submit"
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
      tgl_pencairan: "",
      tgl_jatuh_tempo: "",
      nasabah_id: "",
      produk_id: "",
      pegawai_id: "",
      lama_angsuran: "",
      tipe_angsuran: "0",
      modal: "",
      pegawai_name: "",
      nasabah: {},
      produk: {},
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
    this.pegawai_name = user.username;
    this.pegawai_id = user.id;
  },
  methods: {
    onProdukChoose(produk) {
      this.dialogproduk = !this.dialogproduk;
      this.produk_id = produk.id;
      this.produk = produk;
    },
    onNasabahChoose(nasabah) {
      this.dialognasabah = !this.dialognasabah;
      this.nasabah_id = nasabah.id;
      this.nasabah = nasabah;
    },
    submit() {
      if (this.isEdit) {
        // if (this.username && this.email && this.role && this.group) {
        this.$emit("onsubmit", {
          tgl_pencarian: this.tgl_pencairan,
          tgl_jatuh_tempo: this.tgl_jatuh_tempo,
          nasabah_id: this.nasabah_id,
          produk_id: this.produk_id,
          pegawai_id: this.pegawai_id,
          lama_angsuran: this.lama_angsuran,
          tipe_angsuran: this.tipe_angsuran,
          modal: this.modal,
        });
        // }
      } else {
        this.$emit("onsubmit", {
          tgl_pencarian: this.tgl_pencairan,
          tgl_jatuh_tempo: this.tgl_jatuh_tempo,
          nasabah_id: this.nasabah_id,
          produk_id: this.produk_id,
          pegawai_id: this.pegawai_id,
          lama_angsuran: this.lama_angsuran,
          tipe_angsuran: this.tipe_angsuran,
          modal: this.modal,
        });
      }
    },
  },
};
</script>
