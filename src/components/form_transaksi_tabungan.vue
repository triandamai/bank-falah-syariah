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
          <v-btn dark icon @click="hidden('TABUNGAN')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{$t('Transaksi Tabungan')}}</v-toolbar-title>
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
                        :items="rekening"
                        :loading="isLoading"
                        :search-input.sync="search"
                        chips
                        hide-details
                        hide-selected
                        return-object
                        no-filter
                        label="Cari Nasabah atau No rekening..."
                        dense
                        outlined
                    >
                      <template v-slot:no-data>
                        <v-list-item>
                          <v-list-item-title>
                            Cari Nasabah atau
                            <strong>No Rekening</strong>
                          </v-list-item-title>
                        </v-list-item>
                      </template>
                      <template v-slot:selection="{ attr, on, item, selected }">
                        <v-chip
                            v-bind="attr"
                            :input-value="selected"
                            color="blue-grey"
                            class="white--text"
                            v-on="on"
                        >
                          <span v-text="item.nasabah.nama_lengkap"></span>
                        </v-chip>
                      </template>
                      <template v-slot:item="{ item }">
                        <v-list-item-avatar
                            color="indigo"
                            class="text-h5 font-weight-light white--text"
                        >
                          {{ item.nasabah.nama_lengkap.charAt(0) }}
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title v-text="item.nasabah.nama_lengkap"></v-list-item-title>
                          <v-list-item-subtitle v-text="item.no_rekening"></v-list-item-subtitle>
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
                                        <v-list-item-subtitle>{{getSelectedRekening(selectedRekening) }}</v-list-item-subtitle>
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
                                    <v-col v-show="isTransfer" cols="12" sm="12" md="12" lg="12">
                                      <v-text-field
                                          v-model="form.nomor_rekening_tujuan"
                                          label="Nomor Rekening Tujuan"
                                          placeholder="01100XXXX"
                                          dense
                                          outlined
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
                    <v-col cols="12">
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
                                              getSelectedRekening(selectedRekening)
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
                                        <td class="subtotal" v-if="isTransfer">
                                          <h6 class="p-2 mb-0">Description</h6>
                                        </td>
                                        <td class="subtotal">
                                          <h6 class="p-2 mb-0">Jumlah</h6>
                                        </td>
                                        <td class="subtotal">
                                          <h6 class="p-2 mb-0">Sisa Saldo</h6>
                                        </td>
                                      </tr>
                                      <tr v-for="(detailrekening,index) in itemsDetailRekeningSimpanan" :key="index">
                                        <td>
                                          <label>{{detailrekening.tgl_transaksi}}</label>
                                        </td>
                                        <td>
                                          <p class="itemtext digits">{{getType(detailrekening.type)}}</p>
                                        </td>
                                        <td>
                                          <p class="itemtext digits">{{getJenisTransaksi(detailrekening.jenis_transaksi)}}</p>
                                        </td>
                                        <td v-if="isTransfer">
                                          <p class="itemtext digits">{{detailrekening.description}}</p>
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
  ACTION_TRANSACTION,
  TABUNGAN_TARIK,
  TABUNGAN_TRANSFER,
  TABUNGAN_SETOR,
  TABUNGAN_DEPOSITO,
  ACTION_GET_DETAIL_REKENING,
  DETAIL_REKENING_SIMPANAN, MUTATION_ADD_MUTASI, MUTATION_DESTROY_MUTASI
} from "@/store"
import {getCurrendUserId} from "@/services/jwt.service"
import {getTodayDate} from "@/utils/utils"
import componentMixin from "@/mixin/component.mixin"
import ApiService from "@/services/api.service";

export default {
  mixins:[componentMixin],
  data: () => {
    return {
      isLoading: false,
      search: null,
      rekening:[],
      selectedRekening:null,
      overlay:false,
      transactionsSelected:"",
      isTransfer:false,
      isTransactionSuccess:false,
      nasabahName:"",
      mutasi: [],
      transactions:[
        {
          text:"Setor Tunai",
          value:TABUNGAN_SETOR
        },
        {
          text:"Tarik Tunai",
          value:TABUNGAN_TARIK
        },
        {
          text:"Transfer",
          value:TABUNGAN_TRANSFER
        },
        {
          text:"Deposito",
          value:TABUNGAN_DEPOSITO
        }
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
    search (val) {
      // Items have already been loaded
      // if (this.rekening.length > 0) return

      this.isLoading = true

      // Lazily load input items
      ApiService.get(`rekening_simpanan?cari=${val}`)
          .then(({success,data})=>{
            this.isLoading = false
            if(success){
              this.rekening = data
            }
          }).catch((a)=>{
            console.log(a)
            this.isLoading = false
          })
    },
    selectedRekening:function (newVal){
      if(newVal !== null) {
        if (newVal.no_rekening) {
          this.form.nasabah_id = newVal.nasabah_id
          this.nasabahName = newVal.nasabah.nama_lengkap
          this.form.nomor_rekening = newVal.no_rekening
          this.getMutasiByAccount(newVal.no_rekening)
        }
      }
    },
    transactionsSelected:function(newVal){
      if(newVal !== null) {
        this.isTransfer = newVal === TABUNGAN_TRANSFER;
      }
    }
  },
  mounted() {
    this.selectedRekening={}
  },
  methods: {
    getMutasiByAccount(no_account){
      this.$store.commit(MUTATION_DESTROY_MUTASI,{type:DETAIL_REKENING_SIMPANAN})
      const no_rekening = this.encryptPlain(no_account)
      this.$store.dispatch(ACTION_GET_DETAIL_REKENING,{type:DETAIL_REKENING_SIMPANAN,no_rekening:no_rekening})
          .then(()=>{
            if(this.isLoading){
              this.stopLoading()
            }
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
                this.$store.commit(MUTATION_ADD_MUTASI,{type: DETAIL_REKENING_SIMPANAN, detail: detailrekening})
              })
            }
          })
    },
  }
};
</script>
