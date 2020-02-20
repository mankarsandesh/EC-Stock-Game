<template>
  <div class="v-card-style " v-if="stockid !== null"  >
    <v-layout px-1 >
      <v-flex xs6 class="text-xs-left stockTimer">
        {{ $t("msg.livetime") }}:
        <span class="stockTimer" >{{ getLiveTime(stockid) }}</span>
      </v-flex>
      <v-flex xs6 class="text-xs-right" v-if="getLotteryDraw(stockid) > 0">      
        <span class="stockPrice">${{ getLivePrice(stockid) }}</span>
      </v-flex>
    </v-layout>
    <apexchart class="chartDesgin" type="area" height="310vh" width="99.5%" :options="chartOptions" :series="series" />
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { Line, mixins } from "vue-chartjs";
import VueCharts from "vue-chartjs";
import Chart from "chart.js";
import { mapGetters } from "vuex";
export default {
  props: {
    stockid: {
      type: String,
      default: null
    },
    height: {
      type: String,
      default: "auto"
    },
    data: {
      type: Array,
      required: true
    },
    time: {
      type: Array,
      required: true
    }
  },
  components: {
    apexchart: VueApexCharts
  },
  computed: {
    ...mapGetters(["getLiveTime", "getLivePrice", "getLotteryDraw"])
  },
  data() {
    return {
      series: [
        {
          name: "Price",
          data: this.data
        }
      ],
      chartOptions: {
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
              width: 1,
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
          height: 400,
          zoom: {
            enabled: false
          },
          toolbar: {
             shared: false,
              y: {
                formatter: function (val) {
                  return (val / 1000000).toFixed(0)
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
          categories: this.time,
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
          title:{
            text: 'Price'
          }
          //   tickAmount:
          // min: Math.max(...this.data)+10,
          //   max: Math.min(10470),
        }
      }
    };
  }
};
</script>
<style>
.stockPrice{
  padding-right:14px;
  color:green;
  font-size: 24px;
  margin: 0px;
  font-weight: 600;
}
.stockTimer{
  padding-left:20px;
  color:#333;
  font-size: 20px;
  margin: 0px;
  font-weight: 600;
}
</style>