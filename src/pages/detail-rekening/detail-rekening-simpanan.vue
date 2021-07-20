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
                      <h5>Rp {{ saldo }}</h5>

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
                                        src="../../assets/images/logo/logo.png"
                                        alt
                                    />
                                  </div>
                                  <div class="media-body m-l-20">
                                    <h5 class="media-heading">Bank Falah Syariah</h5>
                                    <p>
                                      bakaran project
                                      <br />
                                      <span class="digits">(+62)81-226-809-435</span>
                                    </p>
                                  </div>
                                </div>
                                <!-- End Info-->
                              </div>
                              <div class="col-sm-6">
                                <div class="text-md-right">
                                  <h3>
                                    Mutasi
                                    <span class="digits counter">#{{$route.params.no_rekening}}</span>
                                  </h3>
                                  <p>
                                     May
                                    <span class="digits">27, 2019</span>
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
                                    <h6 class="p-2 mb-0">Saldo</h6>
                                  </td>
                                </tr>
                                <tr v-for="(mutasi,index) in mutasi" :key="index">
                                  <td>
                                    <label>{{mutasi.tgl_transaksi}}</label>
                                    </td>
                                  <td>
                                    <p class="itemtext digits">{{mutasi.type}}</p>
                                  </td>
                                  <td>
                                    <p class="itemtext digits">{{mutasi.jenis_transaksi.nama_transaksi}}</p>
                                  </td>
                                  <td>
                                    <p class="itemtext digits">Rp {{
                                        formatCurrency(mutasi.value)
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
                        <div class="col-sm-12 text-center mt-3">

                          <button class="btn btn-secondary" type="button">Cancel</button>
                        </div>
                        <!-- End Invoice-->
                        <!-- End Invoice Holder-->
                      </div>
                    </div>
                  </div>


          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->

  </div>
</template>


<script>
import {ACTION_MUTASI, MUTASI_SIMPANAN} from "@/store"
import {mapState,mapGetters} from "vuex"
import {formatCurrency} from "@/services/jwt.service";
export default {
  data: () => {
    return {

    };
  },
  computed:{
    ...mapState({
      mutasi:(state)=> state.rekening.mutasi.simpanan
    }),
    ...mapGetters({
      saldo:'rekening/saldoSimpanan'
    })
  },
  created() {
    if(this.$route.params.no_rekening){
      this.getData(this.$route.params.no_rekening)
    }
  },
  methods: {
    getData(no_rekening){
      this.$store.dispatch(ACTION_MUTASI,{type:MUTASI_SIMPANAN,no_rekening:no_rekening})
          .then(isSuccess=>{
            if(isSuccess){
              console.log(isSuccess)
            }
          })
    },
    formatCurrency:(total)=>formatCurrency(total)
  },
};
</script>