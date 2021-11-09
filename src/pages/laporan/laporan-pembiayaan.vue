<template>
  <div>
    <Breadcrumbs title="Nasabah" />
    <!-- Container-fluid starts-->
    <div class="container">
      <div class="card">
            <div class="card-header">
              <h5>Data Nasabah</h5>
              <span
                >lorem ipsum dolor sit amet, consectetur adipisicing elit</span
              >
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
                             v-model="dateRangeText"
                             label="Pilih Tanggal"
                             readonly
                             v-bind="attrs"
                             v-on="on"
                             outlined
                             dense
                         ></v-text-field>
                       </template>
                       <v-date-picker
                           v-model="dates"
                           scrollable
                           range
                       >
                         <v-spacer></v-spacer>
                         <v-btn
                             text
                             color="primary"
                             @click="modal = false"
                         >
                           Cancel
                         </v-btn>
                         <v-btn
                             text
                             color="primary"
                             @click="$refs.dialog.save(dates)"
                         >
                           OK
                         </v-btn>
                       </v-date-picker>
                     </v-dialog>
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
      <div class="card">
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
                    <span class="digits counter">#0000000</span>
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
                <tr v-for="(mutasi,index) in itemsMutasiPembiayaan" :key="index">
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
    <dialog-option-mutasi :show="optionMutasi" @close="optionMutasi = false"/>
    <!-- Container-fluid Ends-->
  </div>
</template>

<script>
import pageMixin from "@/mixin/page.mixin"
import {mapState} from "vuex";
import {ACTION_GET_DATA_REKENING, ACTION_GET_MUTASI, RPEMBIAYAAN} from "@/store";
export default {
  mixins:[pageMixin],
  data: () => {
    return {
      dates:[],
      modal:false,
      optionMutasi:false,
      selectedRekening:null,
      shouldShowButtonCetak:false,
    };
  },
  created() {
    this.getDataAccount()
  },
  methods: {
    getDataAccount(){
      this.$store.dispatch(ACTION_GET_DATA_REKENING,{type:RPEMBIAYAAN}).then((shouldNext)=>{
        if(shouldNext){
          this.getDataAccount()
        }
      })
    },
    getMutasi(){
      this.startLoading()
      let start = this.dates[0]
      let end = this.dates[this.dates.length -1]
      this.$store.dispatch(ACTION_GET_MUTASI,{
        type:RPEMBIAYAAN,
        no_rekening:this.selectedRekening,
        start:start,
        end:end
      }
      ).then(()=>{
        this.shouldShowButtonCetak = true
        if(this.lazyLoad){
          this.stopLoading()
          console.log(this.itemsMutasiPembiayaan)
        }
      })
    }
  },
  computed: {
    ...mapState({
      itemsRekening:(state)=>state.rekening.datapembiayaan,
      itemsMutasiPembiayaan:(state)=>state.rekening.mutasi.pembiayaan
    }),
    dateRangeText () {
      return this.dates.join(' ~ ')
    },
  },
};
</script>
