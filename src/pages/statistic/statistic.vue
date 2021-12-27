<template>
  <div>
    <Breadcrumbs :title="$t('Statistic')" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <!-- BEGIN CHART -->

          <div class="col-xl-12 xl-100 dashboard-sec box-col-12">
          <px-card class="earning-card with-padding">
            <div class="row m-0">
              <div class="col-xl-3 earning-content p-0">
                <div class="row m-0 chart-left">
                  <div class="col-xl-12 p-0 left_side_earning">
                    <h5>{{ $t('Transaksi') }}</h5>
                    <p class="font-roboto">{{infoTransaction}}</p>
                  </div>
                  <div class="col-xl-12 p-0 left-btn">
                    <v-row>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-menu
                            ref="refDateTransactionFrom"
                            v-model="datePickerTransactionFrom"
                            :close-on-content-click="false"
                            :return-value.sync="dateTransactionFrom"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateTransactionFrom"
                                :label="$t('From Date')"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                              v-model="dateTransactionFrom"
                              no-title
                              scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="datePickerTransactionFrom = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.refDateTransactionFrom.save(dateTransactionFrom)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-menu
                            ref="refDateTransactionTo"
                            v-model="datePickerTransactionTo"
                            :close-on-content-click="false"
                            :return-value.sync="dateTransactionTo"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateTransactionTo"
                                :label="$t('To Date')"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                              v-model="dateTransactionTo"
                              no-title
                              scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="datePickerTransactionTo = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.refDateTransactionTo.save(dateTransactionTo)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </div>
              <div class="col-xl-9 p-0">
                <div class="card-body">
                  <apexchart
                      ref="chart_transaction"
                      height="200"
                      :options="options"
                      :series="series"
                  />
                </div>
              </div>
            </div>
          </px-card>
        </div>
        <!-- END CHART -->
        <!-- BEGIN CHART -->

        <div class="col-xl-12 xl-100 dashboard-sec box-col-12">
          <px-card class="earning-card with-padding">

            <div class="row m-0">
              <div class="col-xl-3 earning-content p-0">
                <div class="row m-0 chart-left">
                  <div class="col-xl-12 p-0 left_side_earning">
                    <h5>{{ $t('Nasabah') }}</h5>
                    <p class="font-roboto">{{infoNasabah}}</p>
                  </div>
                  <div class="col-xl-12 p-0 left-btn">
                    <v-row>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-menu
                            ref="refDateNasabahFrom"
                            v-model="datePickerNasabahFrom"
                            :close-on-content-click="false"
                            :return-value.sync="dateNasabahFrom"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateNasabahFrom"
                                :label="$t('From Date')"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                              v-model="dateNasabahFrom"
                              no-title
                              scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="datePickerNasabahFrom = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.refDateNasabahFrom.save(dateNasabahFrom)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-menu
                            ref="refDateNasabahTo"
                            v-model="datePickerNasabahTo"
                            :close-on-content-click="false"
                            :return-value.sync="dateNasabahTo"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateNasabahTo"
                                :label="$t('To Date')"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                              v-model="dateNasabahTo"
                              no-title
                              scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="datePickerNasabahTo = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.refDateNasabahTo.save(dateNasabahTo)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </div>
              <div class="col-xl-9 p-0">
                  <div class="card-body">
                        <apexchart
                            ref="chart_nasabah"
                            height="200"
                            :options="options"
                            :series="series"
                        />
                  </div>
              </div>
            </div>
          </px-card>
        </div>
        <!-- END CHART -->
        <!-- BEGIN CHART -->

        <div class="col-xl-12 xl-100 dashboard-sec box-col-12">
          <px-card class="earning-card with-padding">
            <div class="row m-0">
              <div class="col-xl-3 earning-content p-0">
                <div class="row m-0 chart-left">
                  <div class="col-xl-12 p-0 left_side_earning">
                    <h5>{{ $t('Tabungan') }}</h5>
                    <p class="font-roboto">{{infoTabungan}}</p>
                  </div>
                  <div class="col-xl-12 p-0 left-btn">
                    <v-row>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-menu
                            ref="refDateTabunganFrom"
                            v-model="datePickerTabunganFrom"
                            :close-on-content-click="false"
                            :return-value.sync="dateTabunganFrom"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateTabunganFrom"
                                :label="$t('From Date')"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                              v-model="dateTabunganFrom"
                              no-title
                              scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="datePickerTabunganFrom = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.refDateTabunganFrom.save(dateTabunganFrom)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col
                          cols="12"
                          sm="6"
                          md="4"
                      >
                        <v-menu
                            ref="refDateTabunganTo"
                            v-model="datePickerTabunganTo"
                            :close-on-content-click="false"
                            :return-value.sync="dateTabunganTo"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateTabunganTo"
                                :label="$t('To Date')"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                              v-model="dateTabunganTo"
                              no-title
                              scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="datePickerTabunganTo = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.refDateTabunganTo.save(dateTabunganTo)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </div>
              <div class="col-xl-9 p-0">
                  <div class="card-body">
                        <apexchart
                            ref="chart_account_tabungan"
                            height="200"
                            :options="options"
                            :series="series"
                        />
                </div>
              </div>
            </div>

          </px-card>
        </div>
        <!-- END CHART -->
      </div>
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>

<script>

import {
  ACTION_GET_STATISTIC_NASABAH,
  ACTION_GET_STATISTIC_TRANSACTION,
  ACTION_GET_STATISTIC_ACCOUN_TABUNGAN
} from "@/store"
import {mapState} from "vuex"
import {getOptions} from "@/utils/AxisFormatter.js"
import {getTodayDate,getLastMontDate} from "@/utils/utils.js"

export default {
  data: () => {
    return {
      datePickerTransactionFrom:false,
      dateTransactionFrom :"",
      datePickerTransactionTo:false,
      dateTransactionTo :"",
      infoTransaction:"",

      datePickerNasabahFrom:false,
      dateNasabahFrom :"",
      datePickerNasabahTo:false,
      dateNasabahTo :"",
      infoNasabah:"",

      datePickerTabunganFrom:false,
      dateTabunganFrom :"",
      datePickerTabunganTo:false,
      dateTabunganTo :"",
      infoTabungan:"",

      series:[]
    };
  },
  computed:{
    ...mapState({
      options:(state)=>state.statistic.options,
    })
  },
  watch:{
    dateTransactionTo(newVal){
      this.infoTransaction = `Data ${this.dateTransactionFrom} sampai ${newVal}`
      this.getStatisticTransaction(this.dateTransactionFrom,newVal)
    },
    dateNasabahTo(newVal){

      this.infoNasabah =  `Data ${this.dateNasabahFrom} sampai ${newVal}`
      this.getStatisticNasabah(this.dateNasabahFrom,newVal)
    },
    dateTabunganTo(newVal){
      this.infoTabungan =  `Data ${this.dateTabunganFrom} sampai ${newVal}`
      this.getStatisticTabungan(this.dateTabunganFrom,newVal)
    }
  },
  created() {
    const from = getLastMontDate()
    const to = getTodayDate()
    this.infoTransaction = "Data 30 hari terakhir"
    this.getStatisticTransaction(from,to)
    this.dateTransactionFrom = from
    this.dateTransactionTo = to

    this.infoNasabah = "Data 30 hari terakhir"
    this.getStatisticNasabah(from,to)
    this.dateNasabahFrom = from
    this.dateNasabahTo = to

    this.infoTabungan = "Data 30 hari terakhir"
    this.getStatisticTabungan(from,to)
    this.dateTabunganFrom = from
    this.dateTabunganTo = to
  },
  methods:{
    getStatisticTransaction(from,to){
      this.$store.dispatch(ACTION_GET_STATISTIC_TRANSACTION,{
        from:from,
        to:to
      }).then(({success,data})=>{
        if(success){
          this.$refs.chart_transaction.updateOptions(getOptions(data.label,data.max))
          this.$refs.chart_transaction.updateSeries(
              [
                {
                  name:this.$t("Transaction"),
                  data:data.transaction
                },
                {
                  name:this.$t("Transaction Kredit"),
                  data:data.transaction_kredit
                },
                {
                  name:this.$t("Transaction Debit"),
                  data:data.transaction_debit
                }
              ]
          )
        }
      })

    },
    getStatisticNasabah(from,to){
      this.$store.dispatch(ACTION_GET_STATISTIC_NASABAH,{
        from:from,
        to:to
      }).then(({success,data})=>{
        if(success){
          this.$refs.chart_nasabah.updateOptions(getOptions(data.label,data.max))
          this.$refs.chart_nasabah.updateSeries(
              [
                {
                  name:this.$t("Customer"),
                  data:data.nasabah
                }
              ]
          )
        }
      })

    },
    getStatisticTabungan(from,to){
      this.$store.dispatch(ACTION_GET_STATISTIC_ACCOUN_TABUNGAN,{
        from:from,
        to:to
      }).then(({success,data})=>{
        if(success){
          this.$refs.chart_account_tabungan.updateOptions(getOptions(data.label,data.max))
          this.$refs.chart_account_tabungan.updateSeries(
              [
                {
                  name:this.$t("Account"),
                  data:data.account
                }
              ]
          )
        }
      })
    }
  }
};
</script>
