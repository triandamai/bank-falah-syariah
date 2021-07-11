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
          <v-btn color="blue darken-1" text> Save </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
import xlsx from "xlsx";
import { ACTION_IMPORT_NASABAH } from "@/store";
export default {
  props: ["show", "body"],
  data: () => {
    return {
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
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const XLSX = xlsx;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
          console.log(sheet);
          sheet.map((nasabah) => {
            //asosiate ke objek nasabah
            this.datanasabah.push({});
          });
        } catch (error) {
          console.log(error);
        }
      };
      fileReader.readAsBinaryString(file);
    },
    onSubmit() {
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
  },
};
</script>
