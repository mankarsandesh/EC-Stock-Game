<template>
  <div class="v-card-style">
    <v-layout px-1>
      <v-flex xs6 class="text-xs-left stockTimer">
        {{ $t("msg.livetime") }}:
        <!-- <span class="stockTimer">{{ getLiveTime(stockid) }}</span> -->
      </v-flex>
      <v-flex xs6 class="text-xs-right stockPrice">
        {{ $t("msg.liveprice") }}:
        <span>{{ getStockLivePrice(stockName) }} </span>
      </v-flex>
    </v-layout>
    <apexchart
      class="chartDesgin"
      type="area"
      :height="chartHeight"
      width="99.5%"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import config from "../../config/config.global";
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
    },
    stockName: {
      type: String,
      default: "btc1"
    }
  },
  data() {
    return {
      chartHeight: "240vh",
      window: {
        width: 0,
        height: 0
      },
      chartData: []
    };
  },
  created() {
    this.fetchChart(this.getStockUUIDByStockName(this.stockName));
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.Echo.leave(
      `roadMap.${this.getStockUUIDByStockName(this.stockName)}.${
        this.getPortalProviderUUID
      }`
    );
  },
  mounted() {
    // socket new api
    this.listenForBroadcast(
      {
        // liveStockData.stockName
        channelName: `roadMap.${this.getStockUUIDByStockName(this.stockName)}.${
          this.getPortalProviderUUID
        }`,
        eventName: "roadMap"
      },
      ({ data }) => {
        let dataIndex = data.data.roadMap[0];
        let readyData = {
          stockValue: dataIndex.stockValue.replace(",", ""),
          stockTimeStamp: dataIndex.stockTimeStamp,
          number1: dataIndex.number1,
          number2: dataIndex.number2
        };
        if (dataIndex.stockTimeStamp !== this.chartData[this.chartData.length - 1].stockTimeStamp) {
          console.log('RoadMap data', readyData);
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
      "getLiveTime"
    ]),
    chartOptions() {
      let newTime = [];
      this.chartData.forEach(element => {
        newTime.push(element.stockTimeStamp);
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
          height: this.heightChart,
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
      this.chartData.forEach(element => {
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
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    setLiveChart(payload) {
      this.chartData.push(payload);
    },
    async fetchChart(stockUUID) {
      try {
        const res = await this.$axios.$post(
          config.getRoadMap.url,
          {
            portalProviderUUID: this.getPortalProviderUUID,
            limit: 50,
            stockUUID: [stockUUID],
            version: config.version
          },
          {
            headers: config.header
          }
        );
        if (res.code === 200) {
          console.log('Component gets mounted and rest api is called for the roadMap data \n', res.data[0].roadMap);
          let readyData = res.data[0].roadMap.reverse();
          this.chartData = readyData;
        } else {
          throw new Error();
        }
      } catch (ex) {
        console.error(ex.message);
      }
    },
    changeChartType(value) {
      this.trendType = value;
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      this.demo = this.window.width;
      if(this.window.width >= 1900){
        this.chartHeight = "320vh";
        this.heightChart = 320;
        
      }else{
        this.chartHeight = "320vh";
        this.heightChart = 320;
      }
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
