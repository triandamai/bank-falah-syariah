<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    v-model="show"
    persistent
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>Form Produk</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.nama_produk"
                  label="Nama *"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
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
          <v-btn color="blue darken-1" text @click="submit"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
import xlsx from "xlsx";
import { mapState } from "vuex";
export default {
  props: ["show", "body"],
  data: () => {
    return {
      dialogakad: false,
      files: null,
      form: {
        nama_produk: "",
        kode_produk: "",
        tipe_produk: "",
        akad_id: "",
      },
    };
  },
  computed: {
    ...mapState({
      itemsakad: (state) => state.master.dataakad,
    }),
  },
  watch: {
    body: function(newVal) {
      this.form = newVal;
    },
  },
  methods: {
    submit() {
      this.$emit("submit", this.form);
    },
    onFileChanged() {
      if (!this.files.length) return;
      if (!/\.(xls|xlsx)$/.test(this.files[0].name.toLowerCase()))
        return alert("format salah");
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const XLSX = xlsx;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

          sheet.map((nasabah) => {
            //asosiate ke objek nasabah
          });
        } catch (error) {}
      };
      fileReader.readAsBinaryString(this.files[0]);
    },
  },
};
</script>
