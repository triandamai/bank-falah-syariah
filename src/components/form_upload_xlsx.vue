<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    v-model="show"
    persistent
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>Import Nasabah</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-file-input
                  v-model="files"
                  @change="onFileChanged"
                  show-size
                  label="File Nasabah"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
          <small>*pilih file excel</small>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$emit('close', dialog.value)"
          >
            Close
          </v-btn>
          <v-btn
            :disabled="loading"
            @click="onSubmit"
            color="blue darken-1"
            text
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
import xlsx from "xlsx";
import { ACTION_IMPORT_NASABAH } from "@/store/modules/nasabah";
export default {
  props: ["show", "body"],
  data: () => {
    return {
      loading: false,
      dialogakad: false,
      files: null,
      datanasabah: [],
    };
  },
  watch: {
    body: function(newVal) {
      this.form = newVal;
    },
  },
  methods: {
    onFileChanged(file) {
      this.files = file;

      if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase()))
        return alert("format salah");

      const fileReader = new FileReader();
      fileReader.onloadstart = () => {
        this.loading = true;
      };
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const XLSX = xlsx;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

          sheet.map((nasabah) => {
            //asosiate ke objek nasabah

            if (nasabah["Kode Nasabah"]) {
              this.datanasabah.push({
                kode_nasabah: nasabah["Kode Nasabah"],
                nama_lengkap: nasabah["Nama Lengkap"],
                nama_panggilan: nasabah["Nama Panggilan"],
                jenis_kelamin:
                  nasabah["Jenis Kelamin"] == "Laki-Laki" ? "L" : "P",
                jenis_identitas: this.checkIDType("KTP"),
                nomor_identitas: nasabah["No Identitas"],
                agama: this.checkAgama(nasabah["Agama"]),
                pendidikan: this.checkEducation(nasabah["Pendidikan"]),
                status_martial: this.checkStatusMartial(
                  nasabah["Status Martial"]
                ),
                nama_ibu_kandung: nasabah["Ibu Kandung"],
                tanggal_lahir: this.ExcelDateToJSDate(
                  nasabah["Tanggal Lahir"],
                  false
                ),
                provinsi: {
                  desNama: nasabah["Nama Provinsi"],
                  provKode: nasabah["Kode Provinsi"],
                },
                kabupaten: {
                  kabNama: nasabah["Nama Kabupaten"],
                  kabKodeMendagri: nasabah["Kode Kabupaten"],
                },
                kecamatan: {
                  kecNama: nasabah["Nama Kecmatan"],
                  kecKodeMendagri: nasabah["Kode Kecamatan"],
                },
                desa: {
                  desNama: nasabah["Nama Desa/Kelurahan"],
                  desKodeMendagri: nasabah["Kode Desa/Kelurahan"],
                },
                alamat: "kosong",
                telp_kantor: 0,
                hp: 0,
                email: nasabah["Email"],
                pekerjaan: nasabah["Pekerjaan"],
                nama_perusahaan: nasabah["Nama Perusahaan"],
                nama_atasan: "kosong",
                penghasilan_perbulan: nasabah["Penghasilan Pertahun"],
                penghasilan_pertahun: nasabah["Penghasilan Perbulan"],
                rasio_nasabah: nasabah["Rasio Nasabah"],
                rasio_bank: nasabah["Rasio Bank"],
                active: 1,
              });
            }
          });
        } catch (error) {
          console.log(error);
        }
      };
      fileReader.onprogress = () => {
        this.loading = false;
      };
      fileReader.readAsBinaryString(file);
    },
    onSubmit() {
      console.log(this.datanasabah);
      this.$store
        .dispatch(ACTION_IMPORT_NASABAH, { nasabah: this.datanasabah })
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
            this.datanasabah = [];
            this.files = null;
          }
        });
    },
    ExcelDateToJSDate(serial, todate) {
      var utc_days = Math.floor(serial - 25569);
      var utc_value = utc_days * 86400;
      var date_info = new Date(utc_value * 1000);

      var fractional_day = serial - Math.floor(serial) + 0.0000001;

      var total_seconds = Math.floor(86400 * fractional_day);

      var seconds = total_seconds % 60;

      total_seconds -= seconds;

      var hours = Math.floor(total_seconds / (60 * 60));
      var minutes = Math.floor(total_seconds / 60) % 60;
      if (todate)
        return new Date(
          date_info.getFullYear(),
          date_info.getMonth(),
          date_info.getDate(),
          hours,
          minutes,
          seconds
        );
      return `${date_info.getUTCFullYear()}-${date_info.getMonth()}-${date_info.getDate()}`;
    },
    checkIDType(value) {
      if (value == "KTP") return 1;
      if (value == "SIM") return 2;
      if (value == "PASSPOSRT") return 3;
      return 1;
    },
    checkAgama(value) {
      if (value == "Islam") return 1;
      if (value == "Kristen") return 2;
      if (value == "Kristen Katolik") return 2;
      if (value == "Katolik") return 2;
      if (value == "Kristen Protestan") return 3;
      if (value == "Protestan") return 3;
      if (value == "Hindu") return 4;
      if (value == "Budha") return 5;
      if (value == "Konghucu") return 6;

      return 1;
    },
    checkEducation(value) {
      if (value == "SD") return 1;
      if (value == "SLTP/SMP/Sederajat") return 2;
      if (value == "SLTP") return 2;
      if (value == "SMP") return 2;
      if (value == "SLTA/SMA/SMK/Sederajat") return 3;
      if (value == "SLTA") return 3;
      if (value == "SMA") return 3;
      if (value == "SMK") return 3;
      if (value == "Diploma") return 4;
      if (value == "S1") return 5;
      if (value == "S2") return 6;
      if (value == "S3") return 7;
      if (value == "Lainnya") return 8;
      return 8;
    },
    checkStatusMartial(value) {
      if (value == "Lajang") return 1;
      if (value == "Menikah") return 2;
      if (value == "Janda/Duda") return 3;
      if (value == "Duda/Janda") return 3;
      if (value == "Janda") return 3;
      if (value == "Duda") return 3;
      return 1;
    },
    checkWork(value) {
      if (value == "Pegawai Negeri(Guru)") return 1;
      if (value == "Pegawai Negeri(Non Guru)") return 2;
      if (value == "PNS") return 2;
      if (value == "TNI/POLRI") return 3;
      if (value == "TNI") return 3;
      if (value == "POLRI") return 3;
      if (value == "Karyawan Swasta") return 4;
      if (value == "Petani") return 5;
      if (value == "Nelayan") return 6;
      if (value == "Peternak") return 7;
      if (value == "Pengrajin") return 8;
      if (value == "Pedagang") return 9;
      if (value == "Pekerjaan Lainnya") return 10;
      return 10;
    },
  },
};
</script>
