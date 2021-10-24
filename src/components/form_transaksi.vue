<template>
  <v-row justify="center">
    <v-dialog
        v-model="show"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >

      <v-card>
        <v-toolbar color="orange" dark flat>
          <v-btn dark icon @click="hidden">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{$t('Transaksi')}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container class="pt-md-6 pt-lg-6 pt-sm-6">
          <v-row>
            <v-col cols="12">
              <div class="card">
                <div class="card-header">
                  <h5>Transaksi</h5>
                  <span
                  >lorem ipsum dolor sit amet, consectetur adipisicing elit</span
                  >
                </div>
                <div class="card-body">
                  <v-row>
                    <v-col cols="12" sm="12" md="4" lg="4">
                      <v-autocomplete
                          v-model="transactionsSelected"
                          label="Pilih Transaksi *"
                          :items="transactions"
                          @change="getRekeningByType"
                          item-text="text"
                          item-value="value"
                          auto-select-first
                          outlined
                          required
                          dense
                          small-chips
                      />
                    </v-col>
                    <v-col cols="12" sm="12" md="4" lg="4">
                      <v-autocomplete
                          v-model="selectedRekening"
                          label="Nasabah/Rekening *"
                          :items="rekenings"
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
                    </v-col>

                    <v-col v-show="isTransfer" cols="12" sm="12" md="4" lg="4">
                      <v-text-field
                          v-model="form.nomor_rekening_tujuan"
                          label="Nomor Rekening Tujuan"
                          placeholder="01100XXXX"
                          dense
                          outlined
                      />
                    </v-col>
                    <v-col cols="12" sm="12" md="4" lg="4">
                      <vuetify-money
                          v-model="form.value"
                          :label="$t('Jumlah')"
                          v-bind:options="options"
                          v-bind:outlined="'outlined'"
                          dense
                          required
                      />
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
            <v-col v-show="isTransactionSuccess" cols="12">
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
                                  <tr v-for="(mutasi,index) in mutasi" :key="index">
                                    <td>
                                      <label>12/20/2020</label>
                                    </td>
                                    <td>
                                      <p class="itemtext digits">{{getType(mutasi.type)}}</p>
                                    </td>
                                    <td>
                                      <p class="itemtext digits">{{mutasi.jenis_transaksi}}</p>
                                    </td>
                                    <td>
                                      <p class="itemtext digits">Rp {{formatCurrency(mutasi.value) }}</p>
                                    </td>
                                    <td>
                                      <p class="itemtext digits">Rp {{formatCurrency(mutasi.saldo) }}</p>
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
  TABUNGAN_TARIK,
  TABUNGAN_TRANSFER,
  TABUNGAN_SETOR,
  TABUNGAN_DEPOSITO,
  PEMBIAYAAN_SETOR,
  PEMBIAYAAN_TARIK
} from "@/store"
import {getCurrendUserId} from "@/services/jwt.service"
import {getTodayDate} from "@/utils/utils"
import componentMixin from "@/mixin/component.mixin"
import {mapState} from "vuex";
export default {
  mixins:[componentMixin],
  data: () => {
    return {
      overlay:false,
      transactionsSelected:"",
      selectedRekening:{},
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
        },
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
      this.form.nasabah_id = newVal.nasabah_id
      this.nasabahName = newVal.nasabah.nama_lengkap
      this.form.nomor_rekening = newVal.no_rekening
    },
    transactionsSelected:function(newVal){
      if (newVal === TABUNGAN_TRANSFER) {
        this.isTransfer = true
      }else {
        this.isTransfer = false
      }
    }
  },
  computed:{
    ...mapState({
      rekenings: (state) => state.transaksi.rekening
    })
  },
  methods: {
    getRekeningByType(){
      this.$store.dispatch(ACTION_GET_REKENING_TRANSACTION,this.transactionsSelected).then(()=>{

      })
    },
    onSubmit(){
      this.overlay = true
      this.form.tgl_transaksi = getTodayDate()
      this.form.petugas_id = getCurrendUserId()
      this.$store.dispatch(ACTION_TRANSACTION,{payload:this.form,type:this.transactionsSelected})
          .then(({success,data})=>{
            this.overlay = false
            this.isTransactionSuccess = success
            if(success){
              this.form = {}
              this.mutasi = data
            }
          })
    },
  }
};
</script>
