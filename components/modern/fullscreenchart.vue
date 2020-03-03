<template>
  <div class="text-xs-center">
    <apexchart type="bar" height="350" :options="chartOptions" :series="series" ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import openSocket from "socket.io-client";
export default {
  props: ["StockData"],
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      series: [
        {
          name: "BIG",
          data: [0,0,0,0]
        },
        {
          name: "SMALL",
          data: [0,0,4,2]
        },
        {
          name: "ODD",
          data: [0,0,3,0]
        },
        {
          name: "EVEN",
          data: [0,0,0,0]
        },
        {
          name: "HIGH",
          data: [0,0,0,0]
        },
        {
          name: "MID",
          data: [0,0,0,0]
        },
        {
          name: "LOW",
          data: [0,0,0,0]
        },
        {
          name: "NUMBER",
          data: [0,0,0,0]
        }
      ],
      chartOptions: {
        chart: {
          toolbar : { show :false },     
          type: "bar",
          height: 350,
          stacked: true,
          stackType: "100%"
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        stroke: {
          width: 1,
          colors: ["#fff"]
        },
        // title: {
        //   text: "Live Stock Data"
        // },
        xaxis: {
          categories: ["First Digit", "Last Digit", "Both Digit", "Two Digit"]
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return "$" + val + " users : 20";
            }
          }
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40
        }
      }
    };
  }
};
</script>

<style scoped>
.set-height {
  height: 300px;
}

.v-progress-circular {
  margin: 1rem;
}
</style>
