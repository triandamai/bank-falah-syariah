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
                  label="File Siswa"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
          <small>{{ $t('Pick File Excel') }}</small>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text>
            <a href="https://bfsservice.bakaranproject.com/upload/format_import_siswa.xlsx">
              {{$t('Download Format')}}
            </a>

          </v-btn>
          <v-btn color="grey darken-1" text @click="close(dialog.value)">
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
import { ACTION_IMPORT_USER } from "@/store/index.js";
import componentMixin from "@/mixin/component.mixin"
export default {
 mixins:[componentMixin],
  data: () => {
    return {


      datasiswa: [],
    };
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

            if (nasabah["Username"]) {
              this.datasiswa.push({
                username: nasabah["Username"],
                email: nasabah["Email"],
                password: nasabah["Password"],
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
    onSubmit() {
      console.log(this.datanasabah);
      this.$store
        .dispatch(ACTION_IMPORT_USER, { data: this.datasiswa })
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
            this.datasiswa = [];
            this.files = null;
          }
        });
    },
  },
};
</script>
