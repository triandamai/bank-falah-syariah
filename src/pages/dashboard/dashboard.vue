<template>
  <div>
    <Breadcrumbs title="Sample Page" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <!-- BEGIN CHART -->
        <div class="col-xl-12 xl-100 dashboard-sec box-col-12">
          <px-card class="earning-card">
            <div class="row m-0">
              <div class="col-xl-3 earning-content p-0">
                <div class="row m-0 chart-left">
                  <div class="col-xl-12 p-0 left_side_earning">
                    <h5>Dashboard</h5>
                    <p class="font-roboto">Overview of last month</p>
                  </div>
                  <div class="col-xl-12 p-0 left_side_earning">
                    <h5>4055.56</h5>
                    <p class="font-roboto">Nasabah</p>
                  </div>
                  <div class="col-xl-12 p-0 left_side_earning">
                    <h5>1004.11</h5>
                    <p class="font-roboto">Transaksi</p>
                  </div>

                  <div class="col-xl-12 p-0 left-btn">
                    <a class="btn btn-gradient">Summary</a>
                  </div>
                </div>
              </div>
              <div class="col-xl-9 p-0">
                <div class="chart-right">
                  <div class="row m-0 p-tb">
                    <div class="col-xl-8 col-md-8 col-sm-8 col-12 p-0">
                      <div class="inner-top-left">
                        <ul class="d-flex list-unstyled">
                          <li>Daily</li>
                          <li class="active">Weekly</li>
                          <li>Monthly</li>
                          <li>Yearly</li>
                        </ul>
                      </div>
                    </div>
                    <div
                      class="col-xl-4 col-md-4 col-sm-4 col-12 p-0 justify-content-end"
                    >
                      <div class="inner-top-right">
                        <ul class="d-flex list-unstyled justify-content-end">
                          <li>Online</li>
                          <li>Store</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xl-12">
                      <div class="card-body pt-5 pb-5">
                        <div class="current-sale-container">
                          <div id="chart-currently">
                            <apexchart
                              height="250"
                              type="area"
                              :options="apexDashboard.options"
                              :series="apexDashboard.series"
                            ></apexchart>
                          </div>
                        </div>
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
var primary = localStorage.getItem("primary_color") || "#7366ff";
var secondary = localStorage.getItem("secondary_color") || "#f73164";
import {ACTION_GET_NASABAH_STATISTIC,ACTION_GET_TRANSACTION_STATISTIC} from "@/store"
export default {
  data: () => {
    return {
      apexDashboard: {
        options: {
          chart: {
            width: 685,
            height: 240,
            type: "area",
            toolbar: {
              show: false,
            },
          },
          colors: [primary, secondary],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "category",
            low: 0,
            offsetX: 0,
            offsetY: 0,
            show: false,
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
              "Jan",
            ],
            labels: {
              low: 0,
              offsetX: 0,
              show: false,
            },
            axisBorder: {
              low: 0,
              offsetX: 0,
              show: false,
            },
          },
          yaxis: {
            low: 0,
            offsetX: 0,
            offsetY: 0,
            show: false,
            labels: {
              low: 0,
              offsetX: 0,
              show: false,
            },
            axisBorder: {
              low: 0,
              offsetX: 0,
              show: false,
            },
          },
          markers: {
            strokeWidth: 3,
            colors: "#ffffff",
            strokeColors: [primary, secondary],
            hover: {
              size: 6,
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.5,
              stops: [0, 80, 100],
            },
          },
          legend: {
            show: false,
          },
          tooltip: {
            x: {
              format: "MM",
            },
          },
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0,
              bottom: -15,
              top: -40,
            },
          },
        },
        series: [
          {
            name: "Nasabah",
            data: [6, 20, 15, 40, 18, 20, 18, 23, 18, 35, 30, 55, 0],
          },
          {
            name: "Transaksi",
            data: [2, 22, 35, 32, 40, 25, 50, 38, 42, 28, 20, 45, 0],
          },
        ],
      },
    };
  },
  created() {
    console.log(this.$store)
    this.$store.dispatch(ACTION_GET_TRANSACTION_STATISTIC,{})
    this.$store.dispatch(ACTION_GET_NASABAH_STATISTIC,{})
  }
};
</script>
