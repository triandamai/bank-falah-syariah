<template>
  <div>
    <Breadcrumbs title="Laporan" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <h5>{{$t('Report Neraca')}}</h5>
          <!-- <span
          >lorem ipsum dolor sit amet, consectetur adipisicing elit</span
          > -->
        </div>

        <div class="card-body">
          <v-row>
            <v-col cols="12" sm="12" md="12" lg="12">
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="dates"
                      persistent
                      width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="dates"
                          :label="$t('Pilih Tahun')"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          dense
                      ></v-text-field>
                    </template>
                    <v-date-picker
                        ref="datepicker"
                        v-model="dates"
                        :active-picker.sync="activePicker"
                        @click:year="saveYears"
                    >
                    </v-date-picker>
                  </v-dialog>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="12" md="12" lg="12">
              <v-row>

                <v-btn
                    @click="printLaporan"
                    class="ml-3"
                    outlined
                    color="indigo"

                >
                  {{$t('Cetak')}}
                </v-btn>

              </v-row>

            </v-col>
          </v-row>
        </div>
      </div>

    </div>
    <dialog-cetak
        :show="showCetak"
        :body="pdfFile"
        :name="pdfName"
        @close="closeForm"
        @submit="downloadFile"
    />
    <!-- Container-fluid Ends-->
  </div>
</template>

<script>
import pageMixin from "@/mixin/page.mixin"
import ApiService from "@/services/api.service"

export default {
  mixins:[pageMixin],
  data: () => {
    return {
      dates:"",
      activePicker:'YEAR',
      itemsType:[
        {
          text:"Kredit&Debet",
          value:"KREDETDEBET"
        },
        {
          text:"Kredit",
          value:"KREDIT"
        },
        {
          text:"Debet",
          value:"DEBET"
        }
      ],
      modal:false,
      pdfName:"",
      pdfFile:null,
      showCetak:false,
      type:""
    };
  },
  watch:{
    modal(val){
      val && this.$nextTick(() => (this.$refs.datepicker.activePicker = 'YEAR'))
    }

  },
  methods: {
    saveYears(val){
      // Reset activePicker to type YEAR
      this.$refs.datepicker.activePicker = 'YEAR'
      this.$refs.dialog.save(val.toString())
      this.dates=val
      this.modal = false
    },
    printLaporan(){
      this.startLoading()
      ApiService.downloadFileMutasi(
          `/laporan/neraca_saldo?waktu_masuk=${this.dates}`
      )
          .then((response)=>{
            this.pdfName = `NERACA-${this.dates}.pdf`
            this.pdfFile = window.URL.createObjectURL(new Blob([response.data]))
            this.stopLoading()
            this.showCetak = true
          }).catch(()=>{

            this.stopLoading()
      })
    },
    saveFile(){
      if(this.pdfFile) {
      this.clearForm()
       this.downloadFile(this.pdfFile,this.pdfName)
      }else {
        //file doesn't exist
      }
    },
    clearForm(){
      this.type = ""
      this.dates = ""
    },
    closeForm(){
      this.showCetak = false
      this.clearForm()
    }
  }
};
</script>
