<template>
  <div class="card-body">
    <div class="col-sm-12">
      <v-stepper v-model="step" non-linear class="elevation-0">
        <v-stepper-header class="elevation-0">
          <v-stepper-step :complete="step > 1" step="1">
            Data Umum
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="step > 2" step="2">
            Data Alamat
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="step > 3" step="3">
            Data Pekerjaan
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 4" step="4">
            Data pendukung
          </v-stepper-step>
          <v-divider></v-divider>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-row>
              <v-col cols="12" sm="12" md="6" class="my-2">
                <v-text-field
                  v-model="form.kode_nasabah"
                  label="Kode Nasabah"
                  placeholder="kode Nasabah"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6" class="my-2">
                <v-text-field
                  v-model="form.nama_lengkap"
                  label="Nama Lengkap"
                  placeholder="Nama Lengkap"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="my-2">
                <v-text-field
                  v-model="form.nama_panggilan"
                  label="Nama panggilan"
                  placeholder="Nama Panggilan"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col class="d-flex" cols="12" sm="12">
                <v-select
                  :items="jenis_kelamin"
                  v-model="form.jenis_kelamin"
                  item-text="label"
                  item-value="value"
                  label="Jenis Kelamin"
                  auto-select-first
                  dense
                  outlined
                ></v-select>
              </v-col>
              <v-col class="d-flex" cols="12" sm="12">
                <v-select
                  :items="jenis_identitas"
                  v-model="form.jenis_identitas_id"
                  item-text="label"
                  item-value="value"
                  label="Jenis Identitas"
                  auto-select-first
                  dense
                  outlined
                /> </v-col
              ><v-col cols="12" sm="12" md="12" class="my-2">
                <v-text-field
                  v-model="form.no_identitas"
                  label="Nomor Identitas"
                  placeholder="Nomor Identitas"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" sm="12">
                <v-select
                  :items="agama"
                  v-model="form.agama_id"
                  item-text="label"
                  item-value="value"
                  label="Agama"
                  auto-select-first
                  dense
                  outlined
                />
              </v-col>
              <v-col class="d-flex" cols="12" sm="12">
                <v-select
                  :items="pendidikan"
                  v-model="form.pendidikan_id"
                  item-text="label"
                  item-value="value"
                  label="Pendidikan"
                  auto-select-first
                  dense
                  outlined
                />
              </v-col>
              <v-col class="d-flex" cols="12" sm="12">
                <v-select
                  :items="status_martial"
                  v-model="form.status_martial_id"
                  item-text="label"
                  item-value="value"
                  label="Status Martial"
                  auto-select-first
                  dense
                  outlined
                />
              </v-col>
              <v-col cols="12" sm="12" md="12" class="my-2">
                <v-text-field
                  v-model="form.nama_ibu_kandung"
                  label="Nama Ibu Kandung"
                  placeholder="Nama Ibu Kandung"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="12">
                <v-menu
                  ref="datepicker"
                  v-model="datepicker"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.tanggal_lahir"
                      label="Tanggal Lahir"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      dense
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="form.tanggal_lahir"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-btn @click="step = 2" outlined small> Selanjutnya </v-btn>
            <v-btn @click="goBack" text> Sebelumnya </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-row>
              <v-col cols="12" md="6" lg="6" sm="12">
                <v-autocomplete
                  v-model="form.provinsi"
                  label="Provinsi *"
                  :items="provinsi"
                  item-text="provNama"
                  @change="provinsiChange"
                  auto-select-first
                  return-object
                  outlined
                  required
                  small
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6" lg="6" sm="12">
                <v-autocomplete
                  label="Kabupaten *"
                  v-model="form.kabupaten"
                  :items="kabupaten"
                  item-text="kabNama"
                  @change="kabupatenChange"
                  auto-select-first
                  return-object
                  outlined
                  required
                  small
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6" lg="6" sm="12">
                <v-autocomplete
                  label="Kecamatan *"
                  v-model="form.kecamatan"
                  :items="kecamatan"
                  item-text="kecNama"
                  @change="kecamatanChange"
                  auto-select-first
                  return-object
                  outlined
                  required
                  small
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6" lg="6" sm="12">
                <v-autocomplete
                  label="Desa *"
                  v-model="form.desa"
                  :items="desa"
                  item-text="desNama"
                  auto-select-first
                  return-object
                  outlined
                  required
                  small
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="12" class="my-2">
                <v-text-field
                  v-model="form.alamat"
                  label="Alamat"
                  placeholder="Alamat Lengkap"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" sm="12" class="my-2">
                <v-text-field
                  v-model="form.tlpkantor"
                  label="Telp Kantor"
                  placeholder="No Telpon Kantor"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" sm="12" class="my-2">
                <v-text-field
                  v-model="form.no_hp"
                  label="Hp"
                  placeholder="No Handphone"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" sm="12" class="my-2">
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  placeholder="Email"
                  outlined
                  dense
                /> </v-col
            ></v-row>
            <v-btn @click="step = 3" outlined small> Selanjutnya </v-btn>

            <v-btn @click="goBack" text> Sebelumnya </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-row>
              <v-col class="d-flex" cols="12" sm="12">
                <v-select
                  :items="jenis_pekerjaan"
                  v-model="form.jenis_pekerjaan_id"
                  item-text="label"
                  item-value="value"
                  label="Pekerjaan"
                  auto-select-first
                  dense
                  outlined
                />
              </v-col>
              <v-col cols="12" sm="12" class="my-2">
                <v-text-field
                  v-model="form.nama_perusahaan"
                  label="Nama Perusahaan"
                  placeholder="Nama Perusahaan"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" sm="12" class="my-2">
                <v-text-field
                  v-model="form.nama_atasan"
                  label="Nama Atasan"
                  placeholder="Nama Atasan"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" sm="12" class="my-2">
                <v-text-field
                  v-model="form.penghasilan_perbulan"
                  label="Penghasilan Perbulan"
                  placeholder="Penghasilan Perbulan"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" sm="12" class="my-2">
                <v-text-field
                  v-model="form.penghasilan_pertahun"
                  label="Penghasilan Pertahun"
                  placeholder="Penghasilan Pertahun"
                  outlined
                  dense
                />
              </v-col>
            </v-row>
            <v-btn @click="step = 4" outlined small> Selanjutnya </v-btn>

            <v-btn @click="goBack" text> Sebelumnya </v-btn>
          </v-stepper-content>
          <v-stepper-content step="4">
            <v-row>
              <v-col class="d-flex" cols="12" sm="12">
                <v-select
                  :items="jenis_pekerjaan"
                  v-model="form.jenis_pekerjaan_id"
                  item-text="label"
                  item-value="value"
                  label="Pekerjaan"
                  auto-select-first
                  dense
                  outlined
                />
              </v-col>
              <v-col cols="12" sm="12" class="my-2">
                <v-text-field
                  v-model="form.nama_perusahaan"
                  label="Nama Perusahaan"
                  placeholder="Nama Perusahaan"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" sm="12" class="my-2">
                <v-text-field
                  v-model="form.nama_atasan"
                  label="Nama Atasan"
                  placeholder="Nama Atasan"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" sm="12" class="my-2">
                <v-text-field
                  v-model="form.penghasilan_perbulan"
                  label="Penghasilan Perbulan"
                  placeholder="Penghasilan Perbulan"
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" sm="12" class="my-2">
                <v-text-field
                  v-model="form.penghasilan_pertahun"
                  label="Penghasilan Pertahun"
                  placeholder="Penghasilan Pertahun"
                  outlined
                  dense
                />
              </v-col>
            </v-row>
            <v-btn @click="onSubmit" outlined small> Simpan </v-btn>

            <v-btn @click="goBack" text> Sebelumnya </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </div>
</template>

<script>
import ApiService from "@/services/api.service";
import {
  ACTION_GET_WILAYAH,
  WPROVINSI,
  WKABUPATEN,
  WKECAMATAN,
  WDESA,
} from "@/store/modules/wilayah";
import { mapState } from "vuex";

export default {
  props: ["isEdit", "body"],

  data() {
    return {
      step: 1,
      jenis_kelamin: [
        { label: "Laki-Laki", value: "L" },
        { label: "Perempuan", value: "P" },
      ],
      jenis_identitas: [
        { label: "KTP", value: 1 },
        { label: "SIM", value: 2 },
        { label: "PASSPORT", value: 3 },
      ],
      agama: [
        { label: "Islam", value: 1 },
        { label: "Kristen Katolik", value: 2 },
        { label: "Kristen Protestan", value: 3 },
        { label: "Hindu", value: 4 },
        { label: "Budha", value: 5 },
        { label: "Konghucu", value: 6 },
      ],
      pendidikan: [
        { label: "SD", value: 1 },
        { label: "SLTP/SMP/Sederajat", value: 2 },
        { label: "SLTA/SMA/SMK/Sederajat", value: 3 },
        { label: "Diploma", value: 4 },
        { label: "S1", value: 5 },
        { label: "S2", value: 6 },
        { label: "S3", value: 7 },
        { label: "Lainnya", value: 8 },
      ],
      status_martial: [
        { label: "Lajang", value: 1 },
        { label: "Menikah", value: 2 },
        { label: "Janda/Duda", value: 3 },
      ],
      jenis_pekerjaan: [
        { label: "Pegawai Negeri(Guru)", value: 1 },
        { label: "Pegawai Negeri(Non Guru)", value: 2 },
        { label: "TNI/POLRI", value: 3 },
        { label: "Karyawan Swasta", value: 4 },
        { label: "Petani", value: 5 },
        { label: "Nelayan", value: 6 },
        { label: "Peternak", value: 7 },
        { label: "Pengrajin", value: 8 },
        { label: "Pedagang", value: 9 },
        { label: "Pekerjaan Lainnya", value: 10 },
      ],
      datepicker: false,
      tanggal_lahir: "",
      form: {
        nama_lengkap: "",
        nama_panggilan: "",
        jenis_kelamin: "",
        alamat: "",
        no_hp: "",
        active: 1,
      },
    };
  },
  watch: {
    body: function (newVal) {
      this.form = newVal;
    },
  },
  computed: {
    ...mapState({
      provinsi: (state) => state.wilayah.provinsi.data,
      kabupaten: (state) => state.wilayah.kabupaten.data,
      kecamatan: (state) => state.wilayah.kecamatan.data,
      desa: (state) => state.wilayah.desa.data,
    }),
  },
  mounted() {
    if (this.isEdit) {
      this.getDataById();
    }
    this.getProvinsi();
  },
  methods: {
    goBack() {
      if (this.step > 1) {
        this.step = this.step - 1;
        console.log(this.step);
      }
    },
    getDataById() {
      if (!this.$route.params.id) return this.$router.go(-1);
      this.form.id = this.$route.params.id;
      ApiService.get(`nasabah/${this.$route.params.id}`)
        .then(({ status, data }) => {
          if (status == 200 || status == 201) {
            if (data.data.length > 0) {
              this.form = data.data[0];
            }
          }
        })
        .catch((e) => {});
    },
    getProvinsi() {
      this.$store
        .dispatch(ACTION_GET_WILAYAH, { type: WPROVINSI })
        .then((res) => {
          if (res) {
            this.getProvinsi();
          }
        });
    },
    provinsiChange(data) {
      this.getKabupaten(data.provIdProvinsi);
    },
    getKabupaten(query) {
      console.log(query);
      this.$store
        .dispatch(ACTION_GET_WILAYAH, {
          type: WKABUPATEN,
          query: query,
        })
        .then((res) => {
          if (res) {
            this.getKabupaten();
          }
        });
    },
    kabupatenChange(data) {
      this.getKecamatan(data.kabIdKabupaten);
    },
    getKecamatan(query) {
      this.$store
        .dispatch(ACTION_GET_WILAYAH, { type: WKECAMATAN, query: query })
        .then((res) => {
          if (res) {
            this.getKecamatan();
          }
        });
    },
    kecamatanChange(data) {
      this.getDesa(data.kecIdKecamatan);
    },
    getDesa(query) {
      this.$store
        .dispatch(ACTION_GET_WILAYAH, { type: WDESA, query: query })
        .then((res) => {
          if (res) {
            this.getDesa();
          }
        });
    },
    save(date) {
      this.$refs.datepicker.save(date);
    },
    onSubmit() {
      this.$emit("submit", this.form);
    },
  },
};
</script>

