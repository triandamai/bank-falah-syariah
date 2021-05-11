<template>
  <div class="card-body">
    <div class="col-sm-12">
      <v-stepper v-model="step" non-linear class="elevation-0">
        <v-stepper-header class="elevation-0">
          <v-stepper-step :complete="step > 1" step="1">
            Identitas
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="step > 2" step="2">
            Domisili
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3"> Data pendukung </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-row>
              <v-col cols="12" sm="12" md="6" class="my-2">
                <v-text-field
                  v-model="form.nama_lengkap"
                  label="Nama Lengkap"
                  placeholder="Nama Lengkap"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6" class="my-2">
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
            <v-btn @click="goBack" text> Kembali </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-row>
              <v-col cols="12" sm="12" class="my-2">
                <v-text-field
                  v-model="form.alamat"
                  label="Alamat"
                  placeholder="Alamat Lengkap"
                  outlined
                  dense
                ></v-text-field> </v-col
            ></v-row>
            <v-btn @click="step = 3" outlined small> Selanjutnya </v-btn>

            <v-btn @click="goBack" text> Kembali </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-row>
              <v-col cols="12" sm="12" class="my-2">
                <v-text-field
                  v-model="form.no_hp"
                  label="Telp"
                  placeholder="Nomor Telpon"
                  outlined
                  dense
                ></v-text-field> </v-col
            ></v-row>
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

export default {
  props: ["isEdit"],

  data() {
    return {
      step: 1,
      jenis_kelamin: [
        { label: "Laki-Laki", value: "L" },
        { label: "Perempuan", value: "P" },
      ],
      datepicker: false,
      tanggal_lahir: "",
      form: {
        kode_nasabah: "4",
        nama_lengkap: "",
        nama_panggilan: "",
        jenis_kelamin: "",
        alamat: "",
        no_hp: "",
        active: 1,
      },
    };
  },
  created() {
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
    getKabupaten(query) {
      this.$store
        .dispatch(ACTION_GET_WILAYAH, {
          type: WKABUPATEN,
          query: `provinsi_id=${query}`,
        })
        .then((res) => {
          if (res) {
            this.getKabupaten();
          }
        });
    },
    getkecamatan() {},
    getDesa() {},
    save(date) {
      this.$refs.datepicker.save(date);
    },
    onSubmit() {
      this.$emit("submit", this.form);
    },
  },
};
</script>

