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
          <v-btn dark icon @click="hidden('TRANSAKSI_BANK')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{$t('Transaksi Bank')}}</v-toolbar-title>
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
import {
  ACTION_TRANSACTION,
} from "@/store"

import componentMixin from "@/mixin/component.mixin"
import xlsx from "xlsx";


export default {
  mixins:[componentMixin],
  data: () => {
    return {
      file:null,
      overlay:false,
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
            let transaksi = []

            console.log(sheet)
            sheet.map((data) => {

              //check pertransaction
              let availableTransaction = data['NO'];
              if(availableTransaction){
                let keys = Object.keys(data) // its will become ['2020','2019','NO','POS POS']

                //getting only ['2020','2019']
                const getFiltered = keys.filter((val)=>{
                     return this.isNumeric(val)
                })
                const subTransaction = data['POS']

                const firstData = data[getFiltered[0]]
                const secondData = data[getFiltered[1]]
                let detailFirstTransaction = []
                let detailSecondTransaction = []

                let firstPerData ={
                  nama_transaksi : availableTransaction,
                  nominal : firstData,
                  waktu_masuk: getFiltered[0],
                  type_waktu_masuk: 'tahun',
                  type: data['TYPE'],
                  detail_transaksi: [
                    {
                      nama_transaksi: 'ste',
                      nominal: 'nominal',
                    }
                  ]
                }
                let secondPerData ={
                  nama_transaksi : availableTransaction,
                  nominal : secondData,
                  waktu_masuk: getFiltered[1],
                  type_waktu_masuk: 'tahun',
                  type: data['TYPE'],
                  detail_transaksi: [
                    {
                      nama_transaksi: 'ste',
                      nominal: 'nominal',
                    }
                  ]
                }

                transaksi.push(firstPerData)
                transaksi.push(secondPerData)
              }

              //asosiate ke objek nasabah


            });
          //  console.log('transaksi',transaksi)
            // eslint-disable-next-line no-empty
          } catch (error) {
            console.log('err',error)
          }
        };
        fileReader.onprogress = () => {
          this.loading = false;
        };
        fileReader.readAsBinaryString(file);

    },
    onSubmit(){

      this.$store.dispatch(ACTION_TRANSACTION,{payload:this.form,type:this.transactionsSelected})
          .then(()=>{


          })
    },
  }
};
</script>
