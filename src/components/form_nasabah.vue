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
                  label="Nama Lengkap"
                  placeholder="Nama Lengkap"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6" class="my-2">
                <v-text-field
                  label="Nama panggilan"
                  placeholder="Nama Panggilan"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col class="d-flex" cols="12" sm="12">
                <v-select
                  :items="jenis_kelamin"
                  label="Outlined style"
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
                      v-model="tanggal_lahir"
                      label="Birthday date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      dense
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="tanggal_lahir"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-btn @click="step = 2" outlined small> Selanjutnya </v-btn>
            <v-btn text> Kembali </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-row>
              <v-col cols="12" sm="12" md="6" class="my-2">
                <v-text-field
                  label="Alamat"
                  placeholder="Alamat Lengkap"
                  outlined
                  dense
                ></v-text-field> </v-col
            ></v-row>
            <v-btn @click="step = 3" outlined small> Selanjutnya </v-btn>

            <v-btn text> Kembali </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-row>
              <v-col cols="12" sm="12" md="6" class="my-2">
                <v-text-field
                  label="Telp"
                  placeholder="Nomor Telpon"
                  outlined
                  dense
                ></v-text-field> </v-col
            ></v-row>
            <v-btn @click="step = 1" outlined small> Simpan </v-btn>

            <v-btn text> Sebelumnya </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isEdit"],
  data() {
    return {
      step: 1,
      jenis_kelamin: ["Laki-Laki", "Perempuan"],
      datepicker: false,
      tanggal_lahir: "",
      form: {
        kode_nasabah: "",
        nama_lengkap: "",
        nama_panggilan: "",
        jenis_kelamin: "",
        active: 1,
      },
    };
  },
  methods: {
    save(date) {
      this.$refs.datepicker.save(date);
    },
  },
};
</script>

