<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    v-model="show"
    persistent
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>{{$t('Import')}}</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-file-input
                  v-model="files"
                  @change="onFileChanged"
                  show-size
                  :disabled="loading"
                  label="File Nasabah"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
          <small>{{ $t('Pick File Excel') }}</small>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text>
            <a href="https://bfsservice.bakaranproject.com/upload/format_import_nasabah.xlsx">
            {{$t('Download Format')}}
            </a>

          </v-btn>
          <v-btn color="grey darken-1" text @click="onClose(dialog.value)">
            {{$t('Close')}}
          </v-btn>
          <v-btn
            :disabled="loading"
            @click="onSubmit"
            color="blue darken-1"
            text
          >
            {{$t('Save')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
import xlsx from "xlsx";
import { ACTION_IMPORT_NASABAH } from "@/store/index.js";

import componentMixin from "@/mixin/component.mixin"
export default {
  mixins:[componentMixin],
  props: ["show", "body"],
  data: () => {
    return {

      datanasabah: [],
    };
  },
  watch: {
    show: function(newVal) {
      this.dialogakad = newVal;
    },
  },
  methods: {
    onFileChanged(file) {
      this.files = file;
      this.loading = true;

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
                  nasabah["Jenis Kelamin"] === "Laki-Laki" ? "L" : "P",
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
          // eslint-disable-next-line no-empty
        } catch (error) {

        }
      };
      fileReader.onprogress = () => {
        this.loading = false;
      };
      fileReader.readAsBinaryString(file);
    },

    onClose(dialog) {
      console.log(dialog);
      this.$emit("close", dialog);
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
    }

  },
};
</script>
