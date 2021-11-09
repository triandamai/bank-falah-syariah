<template>
  <div>
    <Breadcrumbs title="Nasabah" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5>Data Nasabah</h5>
              <span
                >lorem ipsum dolor sit amet, consectetur adipisicing elit</span
              >
            </div>

            <div class="card-body">
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

                                label="Nasabah/Rekening *"
                                :items="[]"
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
                                  <span
                                  >lorem ipsum dolor sit amet, consectetur adipisicing elit</span
                                  >
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
                                                <v-list-item-title>{{  'Nama Nasabah' }}</v-list-item-title>
                                                <v-list-item-subtitle>{{'No Rekening' }}</v-list-item-subtitle>
                                              </v-list-item-content>
                                            </v-list-item>
                                          </v-list>

                                        </v-col>
                                        <v-col cols="12" sm="6" md="6" lg="6">
                                          <v-row>
                                            <v-col cols="12" sm="12" md="12" lg="12">
                                              <vuetify-money
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
                                                <td class="subtotal">
                                                  <h6 class="p-2 mb-0">Sisa Saldo</h6>
                                                </td>
                                              </tr>
                                              <tr >
                                                <td>
                                                  <label>tanggal</label>
                                                </td>
                                                <td>
                                                  <p class="itemtext digits">tipe</p>
                                                </td>
                                                <td>
                                                  <p class="itemtext digits">jenis</p>
                                                </td>

                                                <td>
                                                  <p class="itemtext digits">Rp </p>
                                                </td>
                                                <td>
                                                  <p class="itemtext digits">Rp </p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>

<script>
import pageMixin from "@/mixin/page.mixin"
export default {
  mixins:[pageMixin],
  data: () => {
    return {};
  },
  methods: {},
};
</script>
