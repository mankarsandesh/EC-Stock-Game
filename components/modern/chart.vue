<template>
  <div class="v-card-style">
    <v-layout px-1 style="background-color:#fff">
      <v-flex xs6 class="text-xs-left">
        live TIME
        <span class="text-primary">{{getLiveTime($route.params.id)}}</span>
      </v-flex>
      <v-flex xs6 class="text-xs-right"  v-if="getLotteryDraw($route.params.id) >0" >
        live PRICE
        <span class="text-second">{{getLivePrice($route.params.id)}}</span>
      </v-flex>
    </v-layout>
    <apexchart type="area" width="100%" height="400" :options="chartOptions" :series="series" />
  </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import {mapGetters} from "vuex"
export default {
  props: {
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
  computed:{
    ...mapGetters([
      "getLiveTime",
      "getLivePrice",
      "getLotteryDraw"
    ])
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
              color: "#90CAF9",
              opacity: 0.4
            },
            stroke: {
              color: "#0D47A1",
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
          background: '#fff',
          parentHeightOffset: 0,
          height: 600,
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
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
          //   curve: "smooth",
          lineCap: "butt",
          colors: undefined,
          width: 1,
          dashArray: 0
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
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