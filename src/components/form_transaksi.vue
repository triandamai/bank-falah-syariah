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
          <v-toolbar-title>{{$t('Transaksi Pembiayaan Setor NonTunai')}}</v-toolbar-title>
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
                          v-model="form.nasabah_id"
                          label="Nasabah/Rekening *"
                          :items="rekening"
                          item-text="nama_lengkap"
                          item-value="id"
                          auto-select-first
                          outlined
                          required
                          dense
                          small-chips
                      />
                    </v-col>

                    <v-col cols="12" sm="12" md="4" lg="4">
                      <v-text-field
                          v-model="form.nomor_rekening"
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
                                      Trian Damai
                                      <span class="digits counter">#01.001.032.5000</span>
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
                                      <h6 class="p-2 mb-0">Angsuran</h6>
                                    </td>
                                    <td class="subtotal">
                                      <h6 class="p-2 mb-0">Angsuran Harus Dibayar</h6>
                                    </td>
                                  </tr>
                                  <tr v-for="(mutasi,index) in mutasi" :key="index">
                                    <td>
                                      <label>12/20/2020</label>
                                    </td>
                                    <td>
                                      <p class="itemtext digits">type</p>
                                    </td>
                                    <td>
                                      <p class="itemtext digits">pembiayaan</p>
                                    </td>
                                    <td>
                                      <p class="itemtext digits">Rp {{
                                          formatCurrency(10000)
                                        }}</p>
                                    </td>
                                    <td>
                                      <p class="itemtext digits">Rp {{
                                          formatCurrency(20000)
                                        }}</p>
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
import {ACTION_GET_REKENING_TRANSACTION, ACTION_TRANSACTION, PEMBIAYAAN_SETOR_NONTUNAI} from "@/store"
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
      mutasi: [
        {

        }
      ],
      transactions:[
        {
          text:"Stor Tunai",
          value:"Setor Tunai"
        },
        {
          text:"Tarik Tunai",
          value:"Tarik Tunai"
        },
        {
          text:"Transfer",
          value:"Transfer"
        },
        {
          text:"Deposito",
          value:"Deposito"
        },
        {
          text:"Tarik Pembiayaan",
          value:"Tarik Pembiayaan"
        },
        {
          text:"Setor Pembiayaan",
          value:"Setor Pembiayaan"
        },
      ],
      form:{}
    };
  },
  computed:{
    ...mapState({
      rekening: (state) => state.transaksi.rekening
    })
  },
  methods: {
    getRekeningByType(){
      this.$store.dispatch(ACTION_GET_REKENING_TRANSACTION,this.transactionsSelected).then(({success,data,message})=>{
        if(success){
          console.log(data)
          console.log(message)
        }
      })
    },
    onSubmit(){
      this.overlay = true
      this.form.tgl_transaksi = getTodayDate()
      this.form.petugas_id = getCurrendUserId()
      this.$store.dispatch(ACTION_TRANSACTION,{payload:this.form,type:PEMBIAYAAN_SETOR_NONTUNAI})
          .then(()=>{
            this.overlay = false
          })
    },
  }
};
</script>
