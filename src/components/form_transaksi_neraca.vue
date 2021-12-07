<template>
  <v-row justify="center">
    <v-dialog
        v-model="show"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >

      <v-card class="grey lighten-3">
        <v-toolbar color="orange" dark flat>
          <v-btn dark icon @click="hidden('TRANSAKSI_NERACA')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{$t('Transaksi Neraca')}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container >
          <v-main>
                <v-sheet
                    class="mt-4"
                    rounded="lg"
                >
                  <div class="card">
                    <div class="card-body">
                      <v-row>
                        <v-col cols="12" sm="12" md="12" lg="12">
                          <v-card-text>
                                  <v-file-input
                                      v-model="files"
                                      @change="onFileChanged"
                                      show-size
                                      :disabled="loading"
                                      label="File Transaksi"
                                  ></v-file-input>
                            <small>{{ $t('Pick File Excel') }}</small>
                          </v-card-text>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" lg="12">
                        <v-btn color="green darken-1" text small>
                                    <a href="https://bfsservice.bakaranproject.com/upload/format_import_transaksi_bank.xlsx">
                                      {{$t('Download Format')}}
                                    </a>

                                 </v-btn>
                          <v-btn
                              outlined
                              small
                              @click="onSubmit"
                              color="indigo"

                          >
                            Prosess
                          </v-btn>
                        </v-col>
                      </v-row>
                    </div>
                  </div>
                </v-sheet>
          </v-main>

        </v-container>
      </v-card>
      <v-overlay :value="overlay" :z-index="99">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
      </v-overlay>
    </v-dialog>

  </v-row>
</template>
<script>
import {ACTION_TRANSACTION, TRANSACTION_NERACA} from "@/store"

import componentMixin from "@/mixin/component.mixin"
import {extractNeracaTransaction} from "@/utils/TransactionNeracaExtractFromExcel"
import xlsx from "xlsx";


export default {
  mixins:[componentMixin],
  data: () => {
    return {
      file:null,
      overlay:false,
      form:[]
    };
  },
  created() {
    this.loading = false
  },
  methods: {
    onFileChanged(file){
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
            this.form = extractNeracaTransaction(sheet)
            console.log(this.form)


            // eslint-disable-next-line no-empty
          } catch (error) {

          }
        };
        fileReader.onprogress = () => {
          this.loading = false;
        };
        fileReader.readAsBinaryString(file);

    },
    onSubmit(){

      this.$store.dispatch(ACTION_TRANSACTION,{
        payload:{
          neraca:this.form
        },
        type:TRANSACTION_NERACA
      })
          .then(({success})=>{
            this.overlay = false
            // if(success){
            //
            // }else {
            //
            // }

          })
    },
  }
};
</script>
