<template>
  <div class="v-card-style">
    <v-layout px-1>
      <v-flex xs6 class="text-xs-left stockTimer">
        {{ $t("msg.livetime") }}:
        <!-- <span class="stockTimer">{{ getLiveTime(stockid) }}</span> -->
      </v-flex>
      <v-flex xs6 class="text-xs-right">
        <span class="stockPrice">{{ getStockLivePrice(routeParams) }}</span>
      </v-flex>
    </v-layout>
    <apexchart
      ref="realtimeChart"
      class="chartDesgin"
      type="area"
      height="310vh"
      width="99.5%"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { Line, mixins } from "vue-chartjs";
import VueCharts from "vue-chartjs";
import Chart from "chart.js";
import { mapGetters, mapMutations, mapActions } from "vuex";
import Echo from "laravel-echo";
export default {
  props: {
    height: {
      type: String,
      default: "auto"
    }
  },
  data() {
    return {
      routeParams: this.$route.params.id
    };
  },
  created() {
    this.asyncChart(this.getStockUUIDByStockName(this.$route.params.id));
  },
  beforeDestroy() {
    window.Echo.leave(`liveStockData.${this.routeParams}`);
  },
  mounted() {
    // socket new api
    this.listenForBroadcast(
      {
        // liveStockData.stockName
        channelName: `liveStockData.${this.$route.params.id}`,
        eventName: "liveStockData"
      },
      ({ data }) => {
        let dataIndex = data.data.roadMap[0];
        let readyData = {
          stockValue: dataIndex.stockValue.replace(",", ""),
          stockTimestamp: dataIndex.stockTimestamp,
          number1: dataIndex.number1,
          number2: dataIndex.number2
        };
        if (
          dataIndex.stockTimestamp !==
          this.getLiveChart[this.getLiveChart.length - 1].stockTimestamp
        ) {
          this.setLiveChart(readyData);
        }
      }
    );
  },
  components: {
    apexchart: VueApexCharts
  },
  computed: {
    ...mapGetters([
      "getStockLivePrice",
      "getStockUUIDByStockName",
      "getLiveTime",
      "getLivePrice",
      "getLotteryDraw",
      "getLiveChart"
    ]),
    chartOptions() {
      let newTime = [];
      this.getLiveChart.forEach(element => {
        newTime.push(element.stockTimestamp);
      });
      return {
        zoom: {
          enabled: true,
          type: "x",
          autoScaleYaxis: false,
          zoomedArea: {
            fill: {
              color: "#0b2a68",
              opacity: 0.3
            },
            stroke: {
              color: "#0b2a68",
              opacity: 0.4,
              width: 1
            }
          }
        },
        plotOptions: {
          line: {
            lineHeight: "100%",
            horizontal: true // <---- "true" flip the axis, "100" is not shown anymore
          }
        },
        chart: {
          background: "#fff",
          parentHeightOffset: 0,
          height: 300,
          zoom: {
            enabled: false
          },
          toolbar: {
            shared: false,
            y: {
              formatter: function(val) {
                return (val / 1000000).toFixed(0);
              }
            }
          }
        },
        brush: {
          target: "chartArea",
          enabled: true
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          curve: "smooth",
          lineCap: "butt",
          colors: undefined,
          width: 1,
          dashArray: 0
        },
        grid: {
          row: {
            colors: ["#fff", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        // grid: {
        //   // padding: {
        //   //   left: 0,
        //   //   right: 0,
        //   //   top: 0,
        //   //   bottom: 0
        //   // },

        // },
        xaxis: {
          categories: newTime,
          show: false,
          labels: {
            show: false
          }
        },
        yaxis: {
          show: true,
          labels: {
            show: true
          },
          title: {
            text: "Price"
          }
          //   tickAmount:
          // min: Math.max(...this.data)+10,
          //   max: Math.min(10470),
        }
      };
    },
    series() {
      let newData = [];
      this.getLiveChart.forEach(element => {
        newData.push(element.stockValue);
      });
      return [
        {
          name: "Price",
          data: newData
        }
      ];
    }
  },
  methods: {
    ...mapActions(["asyncChart"]),
    ...mapMutations(["setLiveChart"]),
    changeChartType(value) {
      this.trendType = value;
    },
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    }
    // updateChart() {
    //   console.log('updating....')
    //   let newData = [];
    //   this.getLiveChart.forEach(element => {
    //     newData.push(element.stockValue);
    //   });
    //   newData.push(1)
    //   this.$refs.realtimeChart.updateSeries(
    //     [
    //       {
    //         data: newData
    //       }
    //     ],
    //     false,
    //     true
    //   );
    // }
  }
};
</script>
<style>
.stockPrice {
  padding-right: 14px;
  color: green;
  font-size: 24px;
  margin: 0px;
  font-weight: 600;
}
.stockTimer {
  padding-left: 20px;
  color: #333;
  font-size: 20px;
  margin: 0px;
  font-weight: 600;
}
</style>