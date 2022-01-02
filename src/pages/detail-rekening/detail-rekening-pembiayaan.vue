<template>
  <div>
    <Breadcrumbs title="Detail Rekening" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-md-4 col-sm-12 col-xs-12 pr-0 box-col-12">
          <div class="file-sidebar">
            <div class="card">
              <div class="card-body">

                <div class="pricing-plan">
                  <h6>Total Saldo</h6>
                  <h5>Rp {{ formatCurrency(saldo.saldo) }}</h5>
                  <p>Jumlah Pinjaman</p>
                  <div class="btn btn-outline-primary btn-xs">
                    Rp {{formatCurrency(saldo.jumlah_pinjaman)}}
                  </div>
                  <img
                      class="bg-img"
                      :src="require('../../assets/images/dashboard/folder1.png')"
                      alt=""
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
        <!--        detail-->
        <div class="col-xl-9 col-md-8 col-sm-12 col-xs-12 box-col-12">
          <div class="file-content">
            <div class="card">
              <div class="card-body">
                <div class="invoice">
                  <div>
                    <div>
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
                              {{nasabah.nama_lengkap}}
                              <span class="digits counter">#{{ decrypt($route.query.r) }}</span>
                            </h3>
                            <p>
                              {{getMonthString()}}
                              <span class="digits">{{ getTodayDateMutasi() }}</span>
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
                          <tr v-for="(itemsMutasiPembiayaan,index) in mutasi" :key="index">
                            <td>
                              <label>{{itemsMutasiPembiayaan.tgl_transaksi}}</label>
                            </td>
                            <td>
                              <p class="itemtext digits">{{ getTypeTransaction(itemsMutasiPembiayaan.type) }}</p>
                            </td>
                            <td>
                              <p class="itemtext digits">{{itemsMutasiPembiayaan.jenis_transaksi.nama_transaksi}}</p>
                            </td>
                            <td>
                              <p class="itemtext digits">Rp {{formatCurrency(itemsMutasiPembiayaan.value) }}</p>
                            </td>
                            <td>
                              <p class="itemtext digits">Rp {{formatCurrency(itemsMutasiPembiayaan.saldo) }}</p>
                            </td>
                          </tr>

                          </tbody>
                        </table>
                      </div>
                      <!-- End Table-->

                    </div>
                    <!-- End InvoiceBot-->
                  </div>
                  <div class="col-sm-12 text-center mt-3">

                    <button class="btn btn-secondary" @click="$router.go(-1)" type="button">kembali</button>
                  </div>
                  <!-- End Invoice-->
                  <!-- End Invoice Holder-->
                </div>
              </div>
            </div>


          </div>
        </div>
        <!--        -->
<!--        detail-->
        <div class="col-xl-9 col-md-8 col-sm-12 col-xs-12 box-col-12">
          <div class="file-content">
            <div class="card">
              <div class="card-body">
                <div class="invoice">
                  <div>
                    <div>
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
                              {{nasabah.nama_lengkap}}
                              <span class="digits counter">#{{ decrypt($route.query.r) }}</span>
                            </h3>
                            <p>
                            {{getMonthString()}}
                              <span class="digits">{{ getTodayDateMutasi() }}</span>
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
                          <tr v-for="(itemsMutasiPembiayaan,index) in mutasi" :key="index">
                            <td>
                              <label>{{itemsMutasiPembiayaan.tgl_transaksi}}</label>
                            </td>
                            <td>
                              <p class="itemtext digits">{{ getTypeTransaction(itemsMutasiPembiayaan.type) }}</p>
                            </td>
                            <td>
                              <p class="itemtext digits">{{itemsMutasiPembiayaan.jenis_transaksi.nama_transaksi}}</p>
                            </td>
                            <td>
                              <p class="itemtext digits">Rp {{formatCurrency(itemsMutasiPembiayaan.value) }}</p>
                            </td>
                            <td>
                              <p class="itemtext digits">Rp {{formatCurrency(itemsMutasiPembiayaan.saldo) }}</p>
                            </td>
                          </tr>

                          </tbody>
                        </table>
                      </div>
                      <!-- End Table-->

                    </div>
                    <!-- End InvoiceBot-->
                  </div>
                  <div class="col-sm-12 text-center mt-3">

                    <button class="btn btn-secondary" @click="$router.go(-1)" type="button">kembali</button>
                  </div>
                  <!-- End Invoice-->
                  <!-- End Invoice Holder-->
                </div>
              </div>
            </div>


          </div>
        </div>
<!--        -->
      </div>
    </div>
    <!-- Container-fluid Ends-->

  </div>
</template>


<script>
import {ACTION_GET_SALDO, ACTION_GET_DETAIL_REKENING, DETAIL_REKENING_PEMBIAYAAN, MUTATION_DESTROY_MUTASI} from "@/store"
import {mapState} from "vuex"
import pageMixin from "@/mixin/page.mixin"

export default {
  mixins:[pageMixin],
  computed:{
    ...mapState({
      mutasi:(state)=> state.rekening.detailrekening.pembiayaan,
      saldo:(state)=> state.rekening.saldo.pembiayaan,
      nasabah:(state)=> state.rekening.detailrekening.nasabah,
      isLoading:(state)=>state.lazyLoad
    }),

  },
  created() {
    this.$store.commit(MUTATION_DESTROY_MUTASI,{type:DETAIL_REKENING_PEMBIAYAAN})
    if(this.$route.query.r){
      this.startLoading()
      this.getData(this.$route.query.r)
    }
  },
  methods: {
    getData(no_rekening){
      this.$store.dispatch(ACTION_GET_DETAIL_REKENING,{type:DETAIL_REKENING_PEMBIAYAAN,no_rekening:no_rekening})
          .then(()=>{
            if(this.isLoading){
              this.stopLoading()
            }
          })
      this.$store.dispatch(ACTION_GET_SALDO,{type:DETAIL_REKENING_PEMBIAYAAN,no_rekening:no_rekening})
          .then(()=>{
            if(this.isLoading){
              this.stopLoading()
            }
          })
    },
  },
};
</script>