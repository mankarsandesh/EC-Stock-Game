<template>
  <div class="v-card-style" id="v-card-style">
    <v-layout px-1 >
      <v-flex xs6 class="text-xs-left stockTimer">
        <span v-if="getStockLiveTime(stockName)">{{
          getStockLiveTime(stockName).split(" ")[1]
        }}</span>
      </v-flex>
      <v-flex
        xs6
        class="text-xs-right stockPrice"
        v-if="getStockLivePrice(stockName)"
      >
        <span>${{ getStockLivePrice(stockName) }}</span>
      </v-flex>
    </v-layout>
    <apexchart   
      type="area"
      :height="chartHeight"
      width="99.5%"
      :options="chartOptions"
      :series="series"
      v-if="isDataReady"
    />
  </div>
</template>
<script>
import config from "~/config/config.global";
import VueApexCharts from "vue-apexcharts";
import { Line, mixins } from "vue-chartjs";
import VueCharts from "vue-chartjs";
import Chart from "chart.js";
import { mapGetters, mapActions } from "vuex";
import Echo from "laravel-echo";
import secureStorage from "../../plugins/secure-storage";

export default {
  props: {
    height: {
      type: String,
      default: "auto"
    },
    stockName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      chartHeight: "245vh",
      isDataReady: false,
      apiAttemptCount: 0,
      window: {
        width: 0,
        height: 0
      },
      chartData: []
    };
  },
  async created() {    
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
    this.fetchChart(this.getStockUUIDByStockName(this.stockName));
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
        try {
          if (data.status) {
            let dataIndex = data.data.roadMap[0];
            let readyData = {
              stockValue: dataIndex.stockValue.replace(",", ""),
              stockTimeStamp: dataIndex.stockTimeStamp,
              number1: dataIndex.number1,
              number2: dataIndex.number2
            };
            this.setClearRoadMap(true);
            this.setLiveChart(readyData);
            setTimeout(() => {
              this.setClearRoadMap(false);
            }, 1000);
            // }
          } else {
            throw new Error(this.$root.$t("error.general"));
          }
        } catch (ex) {
          console.log(ex);
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
      "getUserUUID",
      "getStockLivePrice",
      "getStockLiveTime",
      "getStockUUIDByStockName"
    ]),
    chartOptions() {
      let newTime = [];
      this.chartData.forEach(element => {
        newTime.push(element.stockTimeStamp);
      });
      return {
        tooltip: {
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            return (
              '<div class="arrow_boxChart"> $' +
              w.config.series[0].data[dataPointIndex] +
              "</div>"
            );
          }
        },
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
            tools: {
              download: false
            },
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
          enabled: false
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
    ...mapActions(["setClearRoadMap"]),
    // live chart
    setLiveChart(payload) {
      this.chartData.push(payload);
    },
    async fetchChart(stockUUID) {
      try {
        var reqBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          userUUID: this.getUserUUID,
          limit: 50,
          stockUUID: [stockUUID],
          version: config.version
        };
        var res = await this.$axios.$post(config.getRoadMap.url, reqBody, {
          headers: config.header
        });        
        if (res.code) {        
          this.apiAttemptCount = 0;
          let readyData = res.data[0].roadMap.reverse();
          this.chartData = readyData;
          this.isDataReady = true;
        } else {
          if (this.apiAttemptCount < 3) {
            this.apiAttemptCount++;
            this.fetchChart(stockUUID);
          } else {
            throw new Error(this.$root.$t("error.general"));
          }
        }       
      } catch (ex) {
        console.error(ex);
        this.$swal({
          title: ex.message,
          type: "error",
          confirmButtonText: "Okay Logout",
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(result => {
          if (result.value) {
             const URL = secureStorage.getItem("referrerURL");
             location.href = URL;
          } else {
          }
        });
      }
    },
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    changeChartType(value) {
      this.trendType = value;
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      this.demo = this.window.width;
      // Chart Size Change According Desktop and Laptop Size
      if (this.window.width >= 2000) {
        this.chartHeight = "350vh";
        this.heightChart = 360;
      } else if (this.window.width > 1400) {
        this.chartHeight = "330vh";
        this.heightChart = 330;
      } else {
        this.chartHeight = "250vh";
        this.heightChart = 250;
      }
    }
  }
};
</script>
<style>
.arrow_boxChart {
  font-family: Arial, Helvetica, sans-serif;
  border: 1px solid #003f70;
  border-radius: 5px;
  font-weight: 600;
  padding: 3px 10px;
  font-size: 20px;
  color: #fff;
  background: #003f70 !important  ;
}
.stockTimer {
  margin-left: 10px;
}
.stockPrice span {
  padding-right: 14px;
  color: green;
  font-size: 18px;
  margin: 0px;
  font-weight: 600;
}
.stockTimer span {
  color: #585858;
  font-size: 18px;
  margin: 0px;
  font-weight: 600;
}
</style>
