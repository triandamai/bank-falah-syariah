<template>
  <div>
    <Breadcrumbs title="Laporan" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <h5>{{$t('Laporan Tabungan')}}</h5>
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
                      v-model="selectedRekening"
                      label="Nasabah/Rekening *"
                      :items="itemsRekening"
                      item-value="no_rekening"
                      outlined
                      required
                      dense
                      small-chips
                  >
                    <template v-slot:item="{ item }">
                      <v-list-item-content>
                        <v-list-item-title>
                          {{
                            item.no_rekening + " - " + item.nasabah.nama_lengkap
                          }}</v-list-item-title
                        >
                      </v-list-item-content>
                    </template>
                    <template v-slot:selection="{ item }">
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.no_rekening + " - " + item.nasabah.nama_lengkap }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="12" xl="12">
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
                <v-col cols="12" sm="6" md="6" lg="12" xl="12">
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
                    @click="getMutasi"
                    outlined
                    color="indigo"

                >
                  {{$t('Cari')}}
                </v-btn>
                <v-btn
                    v-show="shouldShowButtonCetak"
                    @click="optionMutasi = true"
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
      <div class="card" v-show="shouldShowResult">
        <div class="card-body">
          <div class="invoice">
            <div class="row">
              <div class="col-sm-6">
                <div class="media">
                  <div class="media-left">
                    <img
                        class="media-object img-60"
                        src="../../assets/images/logo/logo.webp"
                        alt
                    />
                  </div>
                  <div class="media-body m-l-20">
                    <h5 class="media-heading">Bank Falah Syariah</h5>
                    <p>
                      Bakaran Project
                      <br />
                      <span class="digits">(+62)81-226-xxx-xxx</span>
                    </p>
                  </div>
                </div>
                <!-- End Info-->
              </div>
              <div class="col-sm-6">
                <div class="text-md-right">
                  <h3>
                    Nama
                    <span class="digits counter">#{{selectedRekening}}</span>
                  </h3>
                  <p>
                    {{getMonthString()}}
                    <span class="digits">{{ getDateMutasi() }}</span>
                    <br />
                  </p>
                </div>
                <!-- End Title-->
              </div>
            </div>
          </div>
          <hr />
          <div>
            <div class="table-responsive invoice-table" id="table">
              <table class="table table-bordered table-striped">
                <tbody>
                <tr>
                  <td class="item">
                    <h6 class="p-2 mb-0">Tanggal Transaksi</h6>
                  </td>
                  <td class="Hours">
                    <h6 class="p-2 mb-0">Tipe</h6>
                  </td>
                  <td class="Rate">
                    <h6 class="p-2 mb-0">Jenis Transaksi</h6>
                  </td>
                  <td class="subtotal">
                    <h6 class="p-2 mb-0">Jumlah</h6>
                  </td>
                </tr>
                <tr v-for="(mutasi,index) in itemsMutasiSimpanan" :key="index">
                  <td>
                    <label>{{formatReadableDate(mutasi.created_at)}}</label>
                  </td>
                  <td>
                    <p class="itemtext digits">{{mutasi.type}}</p>
                  </td>
                  <td>
                    <p class="itemtext digits">{{mutasi.jenis_transaksi.nama_transaksi}}</p>
                  </td>

                  <td>
                    <p class="itemtext digits">Rp {{formatCurrency(mutasi.value)}}</p>
                  </td>
                </tr>

                </tbody>
              </table>
            </div>
            <!-- End Table-->

          </div>
        </div>

      </div>
    </div>
    <dialog-option-mutasi
        :show="optionMutasi"
        @close="optionMutasi = false"
        @submit="printMutasi"
    />
    <dialog-cetak
        :show="showCetak"
        :body="pdfFile"
        :name="pdfName"
        @close="showCetak = false"
        @submit="saveFile"
    />
    <!-- Container-fluid Ends-->
  </div>
</template>

<script>
import pageMixin from "@/mixin/page.mixin"
import {mapState} from "vuex";
import {ACTION_GET_DATA_REKENING, ACTION_GET_MUTASI, RTABUNGAN} from "@/store";
import ApiService from "@/services/api.service";

export default {
  mixins:[pageMixin],
  data: () => {
    return {
      dateFrom:"",
      dateTo:"",
      datePickerFrom:false,
      datePickerTo:false,
      optionMutasi:false,
      selectedRekening:null,
      shouldShowButtonCetak:false,
      shouldShowResult:false,
      pdfName:"",
      pdfFile:null,
      showCetak:false
    };
  },
  created() {
    this.getDataAccount()
  },
  computed: {
    ...mapState({
      itemsRekening:(state)=>state.rekening.datasimpanan,
      itemsMutasiSimpanan:(state)=>state.rekening.mutasi.simpanan
    }),
    dateRangeText () {
      return this.dates.join(' ~ ')
    },
  },
  methods: {
    getDataAccount(){
      this.$store.dispatch(ACTION_GET_DATA_REKENING,{type:RTABUNGAN}).then((shouldNext)=>{
        if(shouldNext){
          this.getDataAccount()
        }
      })
    },
    getMutasi(){
      this.startLoading()
      let start = this.dateFrom
      let end = this.dateTo
      this.$store.dispatch(ACTION_GET_MUTASI,{
        type:RTABUNGAN,
        no_rekening:this.selectedRekening,
        start:start,
        end:end
      }).then(()=>{
        this.shouldShowButtonCetak = true
        this.shouldShowResult = true
        if(this.lazyLoad){
          this.stopLoading()
        }
      })
    },
    printMutasi(data){
      this.optionMutasi=false
      this.startLoading()
      let start = this.dateFrom
      let end = this.dateTo
      ApiService.downloadFileMutasi(`rekening_simpanan/cetak/${this.selectedRekening}/buku_tabungan?start_date=${start}&end_date=${end}&total_first_row=${data.total}&first_row=${data.first}&end_row=${data.last}`)
          .then((response)=>{
            this.pdfName = `${this.selectedRekening}-${start}-${end}.pdf`
            this.pdfFile = window.URL.createObjectURL(new Blob([response.data]))
            this.stopLoading()
            this.showCetak = true
          }).catch(()=>{
            this.stopLoading()
          })
    },
    saveFile(){
      if(this.pdfFile) {
        const fileName = `${this.selectedRekening}-${this.dateFrom}-${this.dateTo}.pdf`
        this.downloadFile(this.pdfFile,fileName)
      }else {
        //file doesn't exist
      }
    }
  }
};
</script>
