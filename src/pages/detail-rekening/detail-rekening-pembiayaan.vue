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
                  <h5>Rp 20.000.000</h5>

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
                              <h6 class="p-2 mb-0">Item Description</h6>
                            </td>
                            <td class="Hours">
                              <h6 class="p-2 mb-0">Hours</h6>
                            </td>
                            <td class="Rate">
                              <h6 class="p-2 mb-0">Rate</h6>
                            </td>
                            <td class="subtotal">
                              <h6 class="p-2 mb-0">Sub-total</h6>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label>Lorem Ipsum</label>
                              <p
                                  class="m-0"
                              >Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </td>
                            <td>
                              <p class="itemtext digits">5</p>
                            </td>
                            <td>
                              <p class="itemtext digits">$75</p>
                            </td>
                            <td>
                              <p class="itemtext digits">$375.00</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label>Lorem Ipsum</label>
                              <p
                                  class="m-0"
                              >Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </td>
                            <td>
                              <p class="itemtext digits">3</p>
                            </td>
                            <td>
                              <p class="itemtext digits">$75</p>
                            </td>
                            <td>
                              <p class="itemtext digits">$225.00</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label>Lorem Ipsum</label>
                              <p
                                  class="m-0"
                              >Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </td>
                            <td>
                              <p class="itemtext digits">10</p>
                            </td>
                            <td>
                              <p class="itemtext digits">$75</p>
                            </td>
                            <td>
                              <p class="itemtext digits">$750.00</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <label>Lorem Ipsum</label>
                              <p
                                  class="m-0"
                              >Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </td>
                            <td>
                              <p class="itemtext digits">10</p>
                            </td>
                            <td>
                              <p class="itemtext digits">$75</p>
                            </td>
                            <td>
                              <p class="itemtext digits">$750.00</p>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p class="itemtext"></p>
                            </td>
                            <td>
                              <p class="m-0">HST</p>
                            </td>
                            <td>
                              <p class="m-0 digits">13%</p>
                            </td>
                            <td>
                              <p class="m-0 digits">$419.25</p>
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td class="Rate">
                              <h6 class="mb-0 p-2">Total</h6>
                            </td>
                            <td class="payment digits">
                              <h6 class="mb-0 p-2">$3,644.25</h6>
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
import {ACTION_MUTASI, MUTASI_PEMBIAYAAN} from "@/store"
export default {
  data: () => {
    return {

    };
  },
  created() {
    if(this.$route.params.no_rekening){
      this.getData(this.$route.params.no_rekening)
    }
  },
  methods: {
    getData(no_rekening){
      this.$store.dispatch(ACTION_MUTASI,{type:MUTASI_PEMBIAYAAN,no_rekening:no_rekening})
      .then(isSuccess=>{
        if(isSuccess){
          console.log(isSuccess)
        }
      })
    }
  },
};
</script>