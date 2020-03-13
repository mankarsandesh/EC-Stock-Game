<template>
  <div class="v-card-style">
    <v-layout px-1>
      <v-flex xs6 class="text-xs-left stockTimer">
        {{ $t("msg.livetime") }}:
        <!-- <span class="stockTimer">{{ getLiveTime(stockid) }}</span> -->
      </v-flex>
      <v-flex xs6 class="text-xs-right stockPrice">
        {{ $t("msg.liveprice") }}:
        <span>{{ getStockLivePrice(routeParams) }}</span>
      </v-flex>
    </v-layout>
    <apexchart
      ref="realtimeChart"
      class="chartDesgin"
      type="area"
      height="240vh"
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
        channelName: `roadMap.${this.getStockUUIDByStockName(
          this.routeParams
        )}.${this.getPortalProviderUUID}`,
        eventName: "roadMap"
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
      "getPortalProviderUUID",
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
          height: 230,
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
          }
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
  }
};
</script>
<style>
.stockPrice span {
  padding-right: 14px;
  color: green;
  font-size: 16px;
  margin: 0px;
  font-weight: 600;
}
.stockTimer span {
  padding-left: 20px;
  color: #333;
  font-size: 16px;
  margin: 0px;
  font-weight: 600;
}
</style>