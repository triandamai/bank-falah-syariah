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
          <v-btn dark icon @click="hidden('PEMBIAYAAN')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{$t('Transaksi Pembiayaan')}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container >
          <v-main>
              <v-row>
                <v-col cols="12" xs="12" sm="12" md="3" lg="3" xl="3">
                  <v-sheet rounded="lg" class="pt-4 pl-4 pr-4" >
                    <v-list color="transparent">
                      <v-subheader>Pilih Nasabah/No Rekening</v-subheader>
                      <v-divider class="my-2"></v-divider>
                      <v-autocomplete
                          v-model="selectedRekening"
                          label="Nasabah/Rekening *"
                          :items="itemRekening"
                          return-object
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
                    </v-list>

                  </v-sheet>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="9" lg="9" xl="9">
                  <v-sheet
                      min-height="70vh"
                      class="mt-4"
                      rounded="lg"
                  >
                    <!--  -->

                    <v-row>
                      <v-col cols="12">
                        <div class="card">
                          <div class="card-header">
                            <h5>Transaksi</h5>
                            <!-- <span
                            >lorem ipsum dolor sit amet, consectetur adipisicing elit</span
                            > -->
                          </div>
                          <div class="card-body">
                            <v-row>
                              <v-col cols="12" sm="12" md="12" lg="12">
                                <v-row>
                                  <v-col cols="12" sm="6" md="6" lg="6">



                                      <v-list>
                                        <v-subheader>
                                          Nasabah
                                        </v-subheader>
                                        <v-list-item>
                                          <v-list-item-content>
                                            <v-list-item-title>{{ nasabahName ? nasabahName : 'Nama Nasabah' }}</v-list-item-title>
                                            <v-list-item-subtitle>{{selectedRekening.no_rekening ? selectedRekening.no_rekening:'No Rekening' }}</v-list-item-subtitle>
                                          </v-list-item-content>
                                        </v-list-item>
                                      </v-list>

                                  </v-col>
                                  <v-col cols="12" sm="6" md="6" lg="6">
                                    <v-row>
                                      <v-col cols="12" sm="12" md="12" lg="12">
                                        <v-autocomplete
                                            v-model="transactionsSelected"
                                            label="Pilih Transaksi *"
                                            :items="transactions"
                                            item-text="text"
                                            item-value="value"
                                            auto-select-first
                                            outlined
                                            required
                                            dense
                                            small-chips
                                        />
                                      </v-col>
                                      <v-col cols="12" sm="12" md="12" lg="12">
                                        <vuetify-money
                                            v-model="form.value"
                                            :label="$t('Jumlah')"
                                            v-bind:options="options"
                                            v-bind:outlined="'outlined'"
                                            dense
                                            required
                                        />
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="12" sm="12" md="12" lg="12">
                                <v-btn
                                    outlined
                                    @click="onSubmit"
                                    color="indigo"

                                >
                                  Prosess
                                </v-btn>
                              </v-col>
                            </v-row>
                          </div>
                        </div>
                      </v-col>
                      <v-col  cols="12">
                        <div class="row">
                          <div class="col-xl-12 col-md-12 col-sm-12 col-xs-12 box-col-12">
                            <div class="file-content">
                              <div class="card">
                                <div class="card-header">
                                  <h5>Result</h5>
                                  <span
                                  >lorem ipsum dolor sit amet, consectetur adipisicing elit</span
                                  >
                                </div>
                                <div class="card-body">
                                  <div class="invoice">
                                    <div class="row">
                                      <div class="col-sm-6">
                                        <div class="media">
                                          <div class="media-left">
                                            <img
                                                class="media-object img-60"
                                                src="../assets/images/logo/logo.webp"
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
                                            {{nasabahName}}
                                            <span class="digits counter">#{{
                                                selectedRekening.no_rekening ? selectedRekening.no_rekening : ""
                                              }}</span>
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
                                          <td class="subtotal">
                                            <h6 class="p-2 mb-0">Sisa Saldo</h6>
                                          </td>
                                        </tr>
                                        <tr v-for="(detailrekening,index) in itemsDetailRekeningPembiayaan" :key="index">
                                          <td>
                                            <label>{{detailrekening.tgl_transaksi}}</label>
                                          </td>
                                          <td>
                                            <p class="itemtext digits">{{getType(detailrekening.type)}}</p>
                                          </td>
                                          <td>
                                            <p class="itemtext digits">{{getJenisTransaksi(detailrekening.jenis_transaksi)}}</p>
                                          </td>

                                          <td>
                                            <p class="itemtext digits">Rp {{formatCurrency(detailrekening.value) }}</p>
                                          </td>
                                          <td>
                                            <p class="itemtext digits">Rp {{formatCurrency(detailrekening.saldo) }}</p>
                                          </td>
                                        </tr>

                                        </tbody>
                                      </table>
                                    </div>
                                    <!-- End Table-->

                                  </div>
                                  <!-- End InvoiceBot-->
                                </div>
                                <!-- End Invoice-->
                                <!-- End Invoice Holder-->
                              </div>
                            </div>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-sheet>
                </v-col>
              </v-row>

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
  ACTION_GET_REKENING_TRANSACTION,
  ACTION_TRANSACTION,
  TABUNGAN_TRANSFER,
  PEMBIAYAAN_SETOR,
  PEMBIAYAAN_TARIK, 
  ACTION_GET_DETAIL_REKENING,
   DETAIL_REKENING_PEMBIAYAAN, 
   MUTATION_ADD_MUTASI, 
   MUTATION_DESTROY_MUTASI
} from "@/store"
import {getCurrendUserId} from "@/services/jwt.service"
import {getTodayDate} from "@/utils/utils"
import componentMixin from "@/mixin/component.mixin"
export default {
  mixins:[componentMixin],
  data: () => {
    return {
      overlay:false,
      transactionsSelected:"",
      selectedRekening:{},
      isTransfer:false,
      nasabahName:"",
      transactions:[
        {
          text:"Tarik Pembiayaan",
          value:PEMBIAYAAN_TARIK
        },
        {
          text:"Setor Pembiayaan",
          value:PEMBIAYAAN_SETOR
        },
      ],
      form:{
        tgl_transaksi:null,
        value:null,
        nasabah_id:null,
        nomor_rekening:null,
        nomor_rekening_tujuan:null,
        petugas_id:null
      },
    };
  },
  watch:{
    selectedRekening:function (newVal){
      if(newVal.no_rekening){
        this.form.nasabah_id = newVal.nasabah_id
        this.nasabahName = newVal.nasabah.nama_lengkap
        this.form.nomor_rekening = newVal.no_rekening
        this.getMutasiByAccount(newVal.no_rekening)
      }
      
    },
    transactionsSelected:function(newVal){
      this.isTransfer = newVal === TABUNGAN_TRANSFER;
    }
  },
  mounted() {
    this.selectedRekening={}
    this.getRekeningByType()
  },
  methods: {
    getMutasiByAccount(no_account){
      this.$store.commit(MUTATION_DESTROY_MUTASI,{type:DETAIL_REKENING_PEMBIAYAAN})
      const no_rekening = this.encryptPlain(no_account)
      this.$store.dispatch(ACTION_GET_DETAIL_REKENING,{type:DETAIL_REKENING_PEMBIAYAAN,no_rekening:no_rekening})
          .then(()=>{
            if(this.isLoading){
              this.stopLoading()
            }
          })
    },
    getRekeningByType(){
      this.$store.dispatch(ACTION_GET_REKENING_TRANSACTION,PEMBIAYAAN_SETOR).then(()=>{

      })
    },
    onSubmit(){
      this.overlay = true
      this.form.tgl_transaksi = getTodayDate()
      this.form.petugas_id = getCurrendUserId()
      this.$store.dispatch(ACTION_TRANSACTION,{payload:this.form,type:this.transactionsSelected})
          .then(({success,data})=>{
            this.overlay = false
            if(success){
              this.transactionsSelected = ""
              this.form = {}
              data.map(detailrekening => {
              
                this.$store.commit(MUTATION_ADD_MUTASI,{type: DETAIL_REKENING_PEMBIAYAAN, detail: detailrekening})

              })

            }
          })
    },
  }
};
</script>
