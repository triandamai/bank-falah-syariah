<template>
  <div>
    <Breadcrumbs title="Laporan" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <h5>{{$t('Report Kas')}}</h5>
          <!-- <span
          >lorem ipsum dolor sit amet, consectetur adipisicing elit</span
          > -->
        </div>

        <div class="card-body">
          <v-row>
            <v-col cols="12" sm="12" md="12" lg="12">
              <v-row>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-autocomplete
                  v-model="type"
                  :items="itemsType"
                  item-value="value"
                  item-text="text"
                  :label="$t('Type')+'*'"
                  dense
                  outlined
                  required
                  />
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="12">
                  <v-menu
                      ref="refDatePickerFrom"
                      v-model="datePickerFrom"
                      :close-on-content-click="false"
                      :return-value.sync="dateFrom"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="dateFrom"
                          :label="$t('From Date')"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          dense
                      ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="dateFrom"
                        no-title
                        scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                          text
                          color="primary"
                          @click="datePickerFrom = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                          text
                          color="primary"
                          @click="$refs.refDatePickerFrom.save(dateFrom)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="12">
                  <v-menu
                      ref="refDatePickerTo"
                      v-model="datePickerTo"
                      :close-on-content-click="false"
                      :return-value.sync="dateTo"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="dateTo"
                          :label="$t('To Date')"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          dense
                      ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="dateTo"
                        no-title
                        scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                          text
                          color="primary"
                          @click="datePickerTo = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                          text
                          color="primary"
                          @click="$refs.refDatePickerTo.save(dateTo)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="12" md="12" lg="12">
              <v-row>

                <v-btn
                    @click="printReport"
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
      pdfName:"",
      pdfFile:null,
      showCetak:false,
      dateFrom:"",
      dateTo:"",
      datePickerFrom:false,
      datePickerTo:false,
      type:""
    };
  },
  methods: {
    printReport(){
      this.startLoading()
      let start = this.dateFrom
      let end = this.dateTo

      const getType =()=>{
        if(this.type === "KREDETDEBET") return ""
        return this.type
      }

      ApiService.downloadFileMutasi(
          `laporan/transaksi?start_date=${start}&end_date=${end}&type=${getType()}`
      )
          .then((response)=>{
            this.pdfName = `KAS-${start}-${end}-${getType()}.pdf`
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
        const fileName = `KAS-${this.dateFrom}-${this.dateTo}.pdf`
        this.downloadFile(this.pdfFile,fileName)
      }else {
        //file doesn't exist
      }
    },
    clearForm(){
      this.type = ""
    },
    closeForm(){
      this.showCetak = false
      this.clearForm()
    }
  }
};
</script>
