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
                    <p class="font-roboto">{{$t('overview30day')}}</p>
                  </div>
                </div>
              </div>
              <div class="col-xl-9 p-0">
                <div class="chart-right">
                      <div class="card-body">
                        <div class="current-sale-container">
                          <div id="chart-transaction">
                            <apexchart
                                ref="chart_transaction"

                                :options="options"
                                :series="series"
                            ></apexchart>
                          </div>
                        </div>
                      </div>
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
                    <p class="font-roboto">{{$t('overview30day')}}</p>
                  </div>
                </div>
              </div>
              <div class="col-xl-9 p-0">
                <div class="chart-right">
                  <div class="card-body">
                    <div class="current-sale-container">
                      <div id="chart-account">
                        <apexchart
                            ref="chart_nasabah"

                            :options="options"
                            :series="series"
                        ></apexchart>
                      </div>
                    </div>
                  </div>
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
                    <p class="font-roboto">{{$t('overview30day')}}</p>
                  </div>

                </div>
              </div>
              <div class="col-xl-9 p-0">
                <div class="chart-right">
                  <div class="card-body">
                    <div class="current-sale-container">
                      <div id="chart-account-tabungan">
                        <apexchart
                            ref="chart_account_tabungan"

                            :options="options"
                            :series="series"
                        ></apexchart>
                      </div>
                    </div>
                  </div>
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
      series:[]
    };
  },
  computed:{
    ...mapState({
      options:(state)=>state.statistic.options,
    })

  },
  created() {
    this.$store.dispatch(ACTION_GET_STATISTIC_NASABAH,{
      from:getLastMontDate(),
      to:getTodayDate()
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
    this.$store.dispatch(ACTION_GET_STATISTIC_TRANSACTION,{
      from:getLastMontDate(),
      to:getTodayDate()
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
    this.$store.dispatch(ACTION_GET_STATISTIC_ACCOUN_TABUNGAN,{
      from:getLastMontDate(),
      to:getTodayDate()
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
};
</script>
