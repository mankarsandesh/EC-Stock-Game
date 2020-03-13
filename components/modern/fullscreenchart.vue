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
          data: [0,0,0,0],
          betCount: [15, 14, 13, 0]
        },
        {
          name: "SMALL",
          data: [0,0,4,2],
          betCount: [15, 14, 13, 100]
        },
        {
          name: "ODD",
          data: [0,0,3,0],
          betCount: [15, 14, 13, 12]
        },
        {
          name: "EVEN",
          data: [0,0,0,0],
          betCount: [15, 14, 13, 12]
        },
        {
          name: "HIGH",
          data: [0,0,0,0],
          betCount: [15, 14, 13, 12]
        },
        {
          name: "MID",
          data: [0,0,0,0],
          betCount: [15, 14, 13, 12]
        },
        {
          name: "LOW",
          data: [0,0,0,0],
          betCount: [15, 14, 13, 12]
        },
        {
          name: "NUMBER",
          data: [0,0,0,0],
          betCount: [15, 14, 13, 12]
        },
        {
          name : "TIE",
          data: [0,0,0,0],
          betCount: [15, 14, 13, 12]
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
        //   text: "Live Bet Data"
        // },
        xaxis: {
          categories: ["First Digit", "Last Digit", "Both Digit", "Two Digit"]
        },
        tooltip: {
          enabled: true,
          followCursor: false,
          intersect: true,
          onDataSetHover: {
            highlightDataSeries: false
          },
          y: {
            formatter: function(val, { series, seriesIndex, dataPointIndex, w }) {
              console.log('ayaaaaaaaaaaaaaaaaaaaaa')
              return '<div class="arrow_box">' +
                '<span> Amount $' + series[seriesIndex][dataPointIndex] + ' </span>' +
                '</div>' +
                '<div class="arrow_box">' + 
                '<span> BetCount' + w.config.series[seriesIndex].betCount[dataPointIndex] + '</span>' +
                '</div>'
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
