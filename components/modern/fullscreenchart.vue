<template>
  <div class="text-xs-center">
    <apexchart type="bar" height="350" :options="chartOptions" :series="series" :key="componentKey"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { mapGetters, mapState } from "vuex";
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
          data: [1, 2, 0, 15],
          betCounts: [15, 14, 13, 0]
        },
        {
          name: "SMALL",
          data: [0, 10, 10, 0],
          betCounts: [15, 14, 13, 100]
        },
        {
          name: "ODD",
          data: [0, 0, 0, 10],
          betCounts: [15, 14, 13, 12]
        },
        {
          name: "EVEN",
          data: [0, 0, 5, 15],
          betCounts: [15, 14, 13, 12]
        },
        {
          name: "HIGH",
          data: [1, 5, 0, 1],
          betCounts: [15, 14, 13, 12]
        },
        {
          name: "MID",
          data: [1, 0, 0, 0],
          betCounts: [15, 14, 13, 12]
        },
        {
          name: "LOW",
          data: [0, 20, 0, 15],
          betCounts: [15, 14, 13, 12]
        },
        {
          name: "NUMBER",
          data: [1, 0, 10, 10],
          betCounts: [15, 14, 13, 12]
        },
        {
          name : "TIE",
          data: [0, 9, 20, 0],
          betCounts: [15, 14, 13, 20]
        }
      ],
      componentKey: 0,
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
              console.log(w.config.series[seriesIndex].betCounts[dataPointIndex], 'ayaaaaaaaaaaaaaaaaaaaaa')
              return '<div class="arrow_box">' +
                 '<span> Amount: $' + series[seriesIndex][dataPointIndex] + ' </span>' +
                '</div>' +
                '<div class="arrow_box">' + 
                '<span> BetCount:' + w.config.series[seriesIndex].betCounts[dataPointIndex] + '</span>' +
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
  },
  computed: {
    ...mapGetters([
      ""
    ]),
    ...mapState([
      "gameStockId"
    ])
  },
  mounted() {
    this.listenForBroadcast({ 
      channelName: "liveBetCounts." + this.gameStockId,
      eventName: "liveBetCounts" 
    },
     ({ data }) => {
      console.log(data.data);
      this.series = data.data;
      this.componentKey += 1;
    }
    );
  },
  methods: {
    listenForBroadcast({ channelName, eventName }, callback) {
    window.Echo.channel(channelName).listen(eventName, callback);
    }
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

