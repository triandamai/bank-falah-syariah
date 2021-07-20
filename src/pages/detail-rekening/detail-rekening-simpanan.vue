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
                <ul>
                  <li>
                    <div class="pricing-plan">
                      <h6>Trial Version</h6>
                      <h5>FREE</h5>
                      <p>100 GB Space</p>
                      <div class="btn btn-outline-primary btn-xs">Selected</div>
                      <img
                          class="bg-img"
                          :src="require('../../assets/images/dashboard/folder.png')"
                          alt=""
                      />
                    </div>
                  </li>
                  <li>
                    <div class="pricing-plan">
                      <h6>Premium</h6>
                      <h5>$5/month</h5>
                      <p>200 GB Space</p>
                      <div class="btn btn-outline-primary btn-xs">
                        Contact Us
                      </div>
                      <img
                          class="bg-img"
                          :src="require('../../assets/images/dashboard/folder1.png')"

                          alt=""
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-9 col-md-8 box-col-12">
          <div class="file-content">
            <div class="card">
              <div class="card-header">
                <div class="media">
                  <form class="form-inline" action="#" method="get">
                    <div class="form-group mb-0">
                      <i class="fa fa-search"></i>
                      <input
                          class="form-control-plaintext"
                          type="text"
                          placeholder="Search..."
                      />
                    </div>
                  </form>
                  <div class="media-body text-right">
                    <form
                        class="d-inline-flex"
                        action="#"
                        method="POST"
                        enctype="multipart/form-data"
                        name="myForm"
                    >
                      <div class="btn btn-primary" >
                        <i data-feather="plus-square"></i>Add New
                      </div>
                      <div style="height: 0px; width: 0px; overflow: hidden">
                        <input
                            id="upfile"
                            type="file"
                            value="upload"
                            onchange="sub(this)"
                        />
                      </div>
                    </form>
                    <div class="btn btn-outline-primary">
                      <i data-feather="upload"> </i>Upload
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body file-manager">
                <div class="col-sm-12">
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
                                        src="../../assets/images/other-images/logo-login.png"
                                        alt
                                    />
                                  </div>
                                  <div class="media-body m-l-20">
                                    <h4 class="media-heading">Cuba</h4>
                                    <p>
                                      hello@cuba.in
                                      <br />
                                      <span class="digits">289-335-6503</span>
                                    </p>
                                  </div>
                                </div>
                                <!-- End Info-->
                              </div>
                              <div class="col-sm-6">
                                <div class="text-md-right">
                                  <h3>
                                    Invoice
                                    <span class="digits counter">#1069</span>
                                  </h3>
                                  <p>
                                    Issued: May
                                    <span class="digits">27, 2019</span>
                                    <br />Payment Due: June
                                    <span class="digits">27, 2019</span>
                                  </p>
                                </div>
                                <!-- End Title-->
                              </div>
                            </div>
                          </div>
                          <hr />
                          <!-- End InvoiceTop-->
                          <div class="row">
                            <div class="col-md-4">
                              <div class="media">
                                <div class="media-left">
                                  <img
                                      class="media-object rounded-circle img-60"
                                      src="../../assets/images/user/1.jpg"
                                      alt
                                  />
                                </div>
                                <div class="media-body m-l-20">
                                  <h4 class="media-heading">Johan Deo</h4>
                                  <p>
                                    JohanDeo@gmail.com
                                    <br />
                                    <span class="digits">555-555-5555</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-8">
                              <div class="text-md-right" id="project">
                                <h6>Project Description</h6>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                              </div>
                            </div>
                          </div>
                          <!-- End Invoice Mid-->
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
                            <div class="row">
                              <div class="col-md-8">
                                <div>
                                  <p class="legal">
                                    <strong>Thank you for your business!</strong>Payment is expected within 31 days; please process this invoice within that time. There will be a 5% interest charge per month on late invoices.
                                  </p>
                                </div>
                              </div>
                              <div class="col-md-4">
                                <form class="text-right">
                                  <img
                                      src="../../assets/images/other-images/paypal.png"
                                      class="mt-2"
                                      alt="PayPal - The safer, easier way to pay online!"
                                  />
                                </form>
                              </div>
                            </div>
                          </div>
                          <!-- End InvoiceBot-->
                        </div>
                        <div class="col-sm-12 text-center mt-3">
                          <button
                              class="btn btn btn-primary mr-2"
                              type="button"
                              @click="printWindow()"
                          >Print</button>
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
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->

  </div>
</template>

<script>

export default {
  data: () => {
    return {

    };
  },


  methods: {

  },
};
</script>