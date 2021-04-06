<!--
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 --->
<template>
  <div class="px-8 py-8 wizard-body py-lg-20 px-lg-10">
    <!--begin: Wizard Form-->
    <div class="row">
      <div class="offset-xxl-2 col-xxl-8">
        <form class="form" id="kt_form" @submit.prevent="onSubmit">
          <!--begin: Wizard Step 1-->
          <div
            class="pb-5"
            data-wizard-type="step-content"
            data-wizard-state="current"
          >
            <h4 class="mb-10 font-weight-bold text-dark">Lengkapi Biodata</h4>
            <div class="form-group">
              <label>Nama Lengkap</label>
              <input
                type="text"
                class="form-control form-control-solid form-control-lg"
                v-model="NamaLengkap"
                placeholder="Contoh:John"
              />
              <span class="form-text text-muted">Masukkan nama lengkap.</span>
            </div>
            <div class="form-group">
              <label>Nama Panggilan</label>
              <input
                type="text"
                class="form-control form-control-solid form-control-lg"
                v-model="NamaPanggilan"
                placeholder="Contoh: Wick"
              />
              <span class="form-text text-muted">isikan nama panggilan.</span>
            </div>

            <div class="form-group">
              <label>Jenis Kelamin</label>
              <select
                name="country"
                v-model="JenisKelamin"
                class="form-control form-control-solid form-control-lg"
              >
                <option value="">Pilih</option>
                <option value="L">Laki-Laki</option>
                <option value="P">Perempuan</option>
              </select>
              <span class="form-text text-muted">Pilih jenis kelamin.</span>
            </div>

            <div class="row">
              <div class="col-xl-6">
                <div class="form-group">
                  <label>Tempat Lahir</label>
                  <input
                    type="text"
                    class="form-control form-control-solid form-control-lg"
                    v-model="TempatLahir"
                    placeholder="Contoh: Banyumas"
                  />
                  <span class="form-text text-muted"
                    >Masukkan tempat lahir.</span
                  >
                </div>
              </div>
              <div class="col-xl-6">
                <div class="form-group">
                  <label>Tanggal Lahir</label>
                  <input
                    type="date"
                    class="form-control form-control-solid form-control-lg"
                    v-model="TanggalLahir"
                    placeholder="Contoh:john.wick@reeves.com"
                  />
                  <span class="form-text text-muted">Pilih tanggal lahir.</span>
                </div>
              </div>
            </div>
          </div>
          <!--end: Wizard Step 1-->

          <!--begin: Wizard Step 2-->
          <div class="pb-5" data-wizard-type="step-content">
            <h4 class="mb-10 font-weight-bold text-dark">
              Setup Your Current Location
            </h4>
            <div class="form-group">
              <label>No Telepon</label>
              <input
                type="text"
                class="form-control form-control-solid form-control-lg"
                v-model="NomerTelepon"
                placeholder="Contoh: +6281226809435"
              />
              <span class="form-text text-muted"
                >Please enter your last name.</span
              >
            </div>

            <div class="form-group">
              <label>Alamat</label>
              <input
                type="text"
                class="form-control form-control-solid form-control-lg"
                v-model="Alamat"
                placeholder="Alamat"
              />
              <span class="form-text text-muted">Alamat lengkap nasabah.</span>
            </div>

            <div class="row">
              <div class="col-xl-6">
                <div class="form-group">
                  <label>Kota</label>
                  <input
                    type="text"
                    class="form-control form-control-solid form-control-lg"
                    v-model="Kota"
                    placeholder="Contoh: Purwokerto"
                  />
                  <span class="form-text text-muted"
                    >Masukkan Kota tempat tinggal.</span
                  >
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xl-6">
                <div class="form-group">
                  <label>Kabupaten</label>
                  <input
                    type="text"
                    class="form-control form-control-solid form-control-lg"
                    v-model="Kabupatem"
                    placeholder="Contoh:Banyumas"
                  />
                  <span class="form-text text-muted">Masukkan Kabupaten.</span>
                </div>
              </div>
              <div class="col-xl-6">
                <div class="form-group">
                  <label>Negara</label>
                  <select
                    v-model="Negara"
                    class="form-control form-control-solid form-control-lg"
                  >
                    <option
                      v-for="(item, index) in country"
                      :key="index"
                      value="item.code"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                  <span class="form-text text-muted">Masukkan Negara.</span>
                </div>
              </div>
            </div>
          </div>
          <!--end: Wizard Step 2-->

          <!--begin: Wizard Step 3-->
          <div class="pb-5" data-wizard-type="step-content">
            <h4 class="mb-10 font-weight-bold text-dark">Review Biodata</h4>
            <div class="pb-5 mb-5 border-bottom">
              <div class="mb-3 font-weight-bold">Detail Akun:</div>
              <div class="line-height-md">
                {{ NamaLengkap }}
                <br />{{ NamaPanggilan }}
                <br />
                Telp.: {{ NomerTelepon }} <br />
                Tempat&Tanggal Lahir: {{ TempatLahir + "-" + TanggalLahir }}
              </div>
            </div>
            <div class="pb-5 mb-5 border-bottom">
              <div class="mb-3 font-weight-bold">Alamat</div>
              <div class="line-height-md">
                {{ Alamat }}

                {{ Kota }} {{ KodePos }}, {{ Kabupatem }}, {{ Negara }}
              </div>
            </div>
          </div>
          <!--end: Wizard Step 6-->

          <!--begin: Wizard Actions -->
          <div class="pt-10 d-flex justify-content-between border-top">
            <div class="mr-2">
              <button
                class="py-4 btn btn-light-primary font-weight-bold text-uppercase px-9"
                data-wizard-type="action-prev"
              >
                Sebelumnya
              </button>
            </div>
            <div>
              <button
                type="submit"
                @click="onSubmit"
                class="py-4 btn btn-success font-weight-bold text-uppercase px-9"
                data-wizard-type="action-submit"
              >
                Simpan
              </button>
              <button
                class="py-4 btn btn-primary font-weight-bold text-uppercase px-9"
                data-wizard-type="action-next"
              >
                Selanjutnya
              </button>
            </div>
          </div>
          <!--end: Wizard Actions -->
        </form>
      </div>
      <!--end: Wizard-->
    </div>
  </div>
</template>
<script>
import { country } from "@/store";
export default {
  data: () => {
    return {
      NamaLengkap: "",
      NamaPanggilan: "",
      JenisKelamin: "",
      TempatLahir: "",
      TanggalLahir: "",
      NomerTelepon: "",
      Alamat: "",
      Kota: "",
      Kabupaten: "",
      Negara: "",
      country: country,
    };
  },
  methods: {
    onSubmit() {
      console.log("up");

      const body = {
        kode_nasabah: `${Date.now()}`,
        nama_lengkap: this.NamaLengkap,
        nama_panggilan: this.NamaPanggilan,
        jenis_kelamin: this.JenisKelamin,
        tempat_lahir: this.TempatLahir,
        tanggal_lahir: this.TanggalLahir,
        no_hp: this.NomerTelepon,
        alamat: this.Alamat,

        active: 1,
      };
      this.$emit("submit", body);
    },
    check() {
      return (
        !this.NamaLengkap == null &&
        !this.NamaLengkap == "" &&
        !this.NamaPanggilan == null &&
        !this.NamaPanggilan == "" &&
        !this.JenisKelamin == null &&
        !this.JenisKelamin == ""
      );
    },
  },
};
</script>
