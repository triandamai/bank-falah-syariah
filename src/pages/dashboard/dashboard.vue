<template>
  <div>
    <Breadcrumbs title="Sample Page" />
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6 col-xl-3 col-lg-6">
          <px-card class="bg-primary static-top-widget-card">
            <div slot="with-padding">
              <div class="media static-top-widget">
                <div class="align-self-center text-center">
                  <feather type="navigation" class="middle"></feather>
                </div>
                <div class="media-body">
                  <span class="m-0">Earnings</span>
                  <h4 class="mb-0 counter">6659</h4>
                  <feather type="navigation" class="icon-bg"></feather>
                </div>
              </div>
            </div>
          </px-card>
        </div>
        <div class="col-sm-6 col-xl-3 col-lg-6">
          <px-card class="bg-secondary static-top-widget-card">
            <div slot="with-padding">
              <div class="media static-top-widget">
                <div class="align-self-center text-center">
                  <feather type="box" class="middle"></feather>
                </div>
                <div class="media-body">
                  <span class="m-0">Products</span>
                  <h4 class="mb-0 counter">9856</h4>
                  <feather type="box" class="icon-bg"></feather>
                </div>
              </div>
            </div>
          </px-card>
        </div>
        <div class="col-sm-6 col-xl-3 col-lg-6">
          <px-card class="bg-primary static-top-widget-card">
            <div slot="with-padding">
              <div class="media static-top-widget">
                <div class="align-self-center text-center">
                  <feather type="message-square" class="middle"></feather>
                </div>
                <div class="media-body">
                  <span class="m-0">Messages</span>
                  <h4 class="mb-0 counter">893</h4>
                  <feather type="message-square" class="icon-bg"></feather>
                </div>
              </div>
            </div>
          </px-card>
        </div>
        <div class="col-sm-6 col-xl-3 col-lg-6">
          <px-card class="bg-primary static-top-widget-card">
            <div slot="with-padding">
              <div class="media static-top-widget">
                <div class="align-self-center text-center">
                  <feather type="users" class="middle"></feather>
                </div>
                <div class="media-body">
                  <span class="m-0">New User</span>
                  <h4 class="mb-0 counter">45631</h4>
                  <feather type="users" class="icon-bg"></feather>
                </div>
              </div>
            </div>
          </px-card>
        </div>
        <div class="col-xl-6 xl-100 box-col-12">
          <px-card class="widget-joins">
            <div class="row">
              <div class="col-sm-6 pr-0">
                <div class="media border-after-xs">
                  <div class="align-self-center mr-3">
                    68%<i class="fa fa-angle-up ml-2"></i>
                  </div>
                  <div class="media-body details pl-3">
                    <span class="mb-1">New</span>
                    <h4 class="mb-0 counter digits">6982</h4>
                  </div>
                  <div class="media-body align-self-center">
                    <feather
                      class="font-primary float-left ml-2"
                      type="shopping-bag"
                    ></feather>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 pl-0">
                <div class="media">
                  <div class="align-self-center mr-3 digits">
                    12%<i class="fa fa-angle-down ml-2"></i>
                  </div>
                  <div class="media-body details pl-3">
                    <span class="mb-1">Pending</span>
                    <h4 class="mb-0 counter digits">783</h4>
                  </div>
                  <div class="media-body align-self-center">
                    <feather
                      class="font-primary float-left ml-3"
                      type="layers"
                    ></feather>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 pr-0">
                <div class="media border-after-xs">
                  <div class="align-self-center mr-3">
                    68%<i class="fa fa-angle-up ml-2"></i>
                  </div>
                  <div class="media-body details pl-3 pt-0">
                    <span class="mb-1">Done</span>
                    <h4 class="mb-0 counter digits">3674</h4>
                  </div>
                  <div class="media-body align-self-center">
                    <feather
                      class="font-primary float-left ml-2"
                      type="shopping-cart"
                    ></feather>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 pl-0">
                <div class="media">
                  <div class="align-self-center mr-3">
                    68%<i class="fa fa-angle-up ml-2"></i>
                  </div>
                  <div class="media-body details pl-3 pt-0">
                    <span class="mb-1">Cancel</span>
                    <h4 class="mb-0 counter digits">069</h4>
                  </div>
                  <div class="media-body align-self-center">
                    <feather
                      class="font-primary float-left ml-2"
                      type="dollar-sign"
                    ></feather>
                  </div>
                </div>
              </div>
            </div>
          </px-card>
        </div>
        <div class="col-xl-6 xl-100 box-col-12">
          <px-card class="widget-joins widget-arrow">
            <div class="row">
              <div class="col-sm-6 pr-0">
                <div class="media border-after-xs">
                  <div class="align-self-center mr-3 text-left">
                    <h6 class="mb-1">Sale</h6>
                    <h4 class="mb-0">Today</h4>
                  </div>
                  <div class="media-body align-self-center">
                    <feather type="arrow-down" class="font-primary"></feather>
                  </div>
                  <div class="media-body">
                    <h5 class="mb-0">$<span class="counter">25698</span></h5>
                    <span class="mb-1">-$2658(36%)</span>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 pl-0">
                <div class="media">
                  <div class="align-self-center mr-3 text-left">
                    <h6 class="mb-1">Sale</h6>
                    <h4 class="mb-0">Month</h4>
                  </div>
                  <div class="media-body align-self-center">
                    <feather type="arrow-up" class="font-primary"></feather>
                  </div>
                  <div class="media-body pl-2">
                    <h5 class="mb-0">$<span class="counter">6954</span></h5>
                    <span class="mb-1">+$369(15%)</span>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 pr-0">
                <div class="media border-after-xs">
                  <div class="align-self-center mr-3 text-left">
                    <h6 class="mb-1">Sale</h6>
                    <h4 class="mb-0">Week</h4>
                  </div>
                  <div class="media-body align-self-center">
                    <feather type="arrow-up" class="font-primary"></feather>
                  </div>
                  <div class="media-body">
                    <h5 class="mb-0">$<span class="counter">63147</span></h5>
                    <span class="mb-1">+$69(65%)</span>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 pl-0">
                <div class="media">
                  <div class="align-self-center mr-3 text-left">
                    <h6 class="mb-1">Sale</h6>
                    <h4 class="mb-0">Year</h4>
                  </div>
                  <div class="media-body align-self-center pl-3">
                    <feather type="arrow-up" class="font-primary"></feather>
                  </div>
                  <div class="media-body pl-2">
                    <h5 class="mb-0">$<span class="counter">963198</span></h5>
                    <span class="mb-1">+$3654(90%)</span>
                  </div>
                </div>
              </div>
            </div>
          </px-card>
        </div>

        <!-- BEGIN CHART -->
        <div class="col-xl-4 col-md-12 box-col-12">
          <px-card>
            <div class="chart-widget-top">
              <div class="row card-body">
                <div class="col-5">
                  <h6 class="f-w-600 font-primary">SALE</h6>
                  <span class="num">
                    <span class="counter">
                      <countTo
                        :startVal="0"
                        :endVal="90"
                        :duration="3000"
                      ></countTo> </span
                    >%
                    <i class="icon-angle-up f-12 ml-1"></i>
                  </span>
                </div>
                <div class="col-7 text-right">
                  <h4 class="num total-value">
                    $
                    <span class="counter">
                      <countTo
                        :startVal="0"
                        :endVal="3654"
                        :duration="3000"
                        :decimals="2"
                      ></countTo>
                    </span>
                  </h4>
                </div>
              </div>
              <div>
                <div id="chart-widget1">
                  <apexchart
                    height="170"
                    type="area"
                    :options="chart1.options"
                    :series="chart1.series"
                  ></apexchart>
                </div>
              </div>
            </div>
          </px-card>
        </div>
        <div class="col-xl-4 col-md-12 box-col-12">
          <px-card>
            <div class="chart-widget-top">
              <div class="row card-body">
                <div class="col-7">
                  <h6 class="f-w-600 font-secondary">PROJECTS</h6>
                  <span class="num">
                    <span class="counter">
                      <countTo
                        :startVal="0"
                        :endVal="30"
                        :duration="3000"
                      ></countTo> </span
                    >%
                    <i class="icon-angle-up f-12 ml-1"></i>
                  </span>
                </div>
                <div class="col-5 text-right">
                  <h4 class="num total-value counter">
                    <countTo
                      :startVal="0"
                      :endVal="12654"
                      :duration="3000"
                    ></countTo>
                  </h4>
                </div>
              </div>
              <div id="chart-widget2">
                <div
                  class="flot-chart-placeholder"
                  id="chart-widget-top-second"
                >
                  <apexchart
                    height="170"
                    type="area"
                    :options="chart2.options"
                    :series="chart2.series"
                  ></apexchart>
                </div>
              </div>
            </div>
          </px-card>
        </div>
        <div class="col-xl-4 col-md-12 box-col-12">
          <px-card>
            <div class="chart-widget-top">
              <div class="row card-body">
                <div class="col-8">
                  <h6 class="f-w-600 font-success">PRODUCTS</h6>
                  <span class="num">
                    <span class="counter">
                      <countTo
                        :startVal="0"
                        :endVal="68"
                        :duration="3000"
                      ></countTo> </span
                    >%
                    <i class="icon-angle-up f-12 ml-1"></i>
                  </span>
                </div>
                <div class="col-4 text-right">
                  <h4 class="num total-value">
                    <span class="counter">
                      <countTo
                        :startVal="0"
                        :endVal="93"
                        :duration="3000"
                      ></countTo> </span
                    >M
                  </h4>
                </div>
              </div>
              <div id="chart-widget3">
                <div class="flot-chart-placeholder" id="chart-widget-top-third">
                  <apexchart
                    height="170"
                    type="area"
                    :options="chart3.options"
                    :series="chart3.series"
                  ></apexchart>
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
import countTo from "vue-count-to";
function generateData1(count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = "w" + (i + 1).toString();
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({
      x: x,
      y: y,
    });
    i++;
  }
  return series;
}
function generateData(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

    series.push([x, y, z]);
    baseval += 86400000;
    i++;
  }
  return series;
}
export default {
  components: {
    countTo,
  },
  data: () => {
    return {
      chart1: {
        options: {
          chart: {
            width: 510,
            height: 170,
            type: "area",
            toolbar: {
              show: false,
            },
          },
          colors: [secondary],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            show: false,
            type: "datetime",
            categories: [
              "2018-09-19T00:00:00",
              "2018-09-19T01:30:00",
              "2018-09-19T02:30:00",
              "2018-09-19T03:30:00",
              "2018-09-19T04:30:00",
              "2018-09-19T05:30:00",
              "2018-09-19T06:30:00",
            ],
            labels: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          fill: {
            colors: [secondary],
            type: "gradient",
            gradient: {
              shade: "light",
              type: "vertical",
              shadeIntensity: 0.4,
              inverseColors: false,
              opacityFrom: 0.8,
              opacityTo: 0.2,
              stops: [0, 100],
            },
          },
          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm",
            },
          },
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0,
              bottom: -40,
            },
          },
        },
        series: [
          {
            name: "series1",
            data: [4, 2, 7, 8, 10, 12, 14],
          },
        ],
      },
      chart2: {
        options: {
          chart: {
            width: 510,
            height: 170,
            type: "area",
            toolbar: {
              show: false,
            },
          },
          colors: ["#dd6e8a"],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            show: false,
            type: "datetime",
            categories: [
              "2018-09-19T00:00:00",
              "2018-09-19T01:30:00",
              "2018-09-19T02:30:00",
              "2018-09-19T03:30:00",
              "2018-09-19T04:30:00",
              "2018-09-19T05:30:00",
              "2018-09-19T06:30:00",
            ],
            labels: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          fill: {
            colors: ["#dd6e8a"],
            type: "gradient",
            gradient: {
              shade: "light",
              type: "vertical",
              shadeIntensity: 0.4,
              inverseColors: false,
              opacityFrom: 0.8,
              opacityTo: 0.2,
              stops: [0, 100],
            },
          },
          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm",
            },
          },
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0,
              bottom: -40,
            },
          },
        },
        series: [
          {
            name: "series1",
            data: [2, 4, 6, 8, 6, 12, 14],
          },
        ],
      },
      chart3: {
        options: {
          chart: {
            width: 510,
            height: 170,
            type: "area",
            toolbar: {
              show: false,
            },
          },
          colors: [primary],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            show: false,
            type: "datetime",
            categories: [
              "2018-09-19T00:00:00",
              "2018-09-19T01:30:00",
              "2018-09-19T02:30:00",
              "2018-09-19T03:30:00",
              "2018-09-19T04:30:00",
              "2018-09-19T05:30:00",
              "2018-09-19T06:30:00",
            ],
            labels: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          fill: {
            colors: [primary],
            type: "gradient",
            gradient: {
              shade: "light",
              type: "vertical",
              shadeIntensity: 0.4,
              inverseColors: false,
              opacityFrom: 0.8,
              opacityTo: 0.2,
              stops: [0, 100],
            },
          },
          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm",
            },
          },
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0,
              bottom: -40,
            },
          },
        },
        series: [
          {
            name: "series1",
            data: [16, 14, 10, 12, 8, 4, 2],
          },
        ],
      },
    };
  },
};
</script>