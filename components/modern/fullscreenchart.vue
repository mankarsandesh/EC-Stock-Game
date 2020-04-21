<template>
  <div class="text-xs-center">
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
      :key="componentKey"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { mapGetters } from "vuex";
import openSocket from "socket.io-client";
import log from "roarr";

export default {
  props: ["StockData"],
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {    
      series: [
        {
          name: this.$root.$t("gamemsg.big"),
          data: [1, 2, 0, 15],
          betCounts: [15, 14, 13, 0]
        },
        {
          name: this.$root.$t("gamemsg.small"),
          data: [0, 10, 10, 0],
          betCounts: [15, 14, 13, 100]
        },
        {
          name: this.$root.$t("gamemsg.odd"),
          data: [0, 0, 0, 10],
          betCounts: [15, 14, 13, 12]
        },
        {
          name: this.$root.$t("gamemsg.even"),
          data: [0, 0, 5, 15],
          betCounts: [15, 14, 13, 12]
        },
        {
          name: this.$root.$t("gamemsg.high"),
          data: [1, 5, 0, 1],
          betCounts: [15, 14, 13, 12]
        },
        {
          name: this.$root.$t("gamemsg.mid"),
          data: [1, 0, 0, 0],
          betCounts: [15, 14, 13, 12]
        },
        {
          name: this.$root.$t("gamemsg.low"),
          data: [0, 20, 0, 15],
          betCounts: [15, 14, 13, 12]
        },
        {
          name: this.$root.$t("gamemsg.number"),
          data: [1, 0, 10, 10],
          betCounts: [15, 14, 13, 12]
        },
        {
          name: this.$root.$t("gamemsg.tie"),
          data: [0, 9, 20, 0],
          betCounts: [15, 14, 13, 20]
        }
      ],
      componentKey: 0,
      chartOptions: {
        chart: {
          toolbar: {
            show: false
          },
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
        xaxis: {
          categories: [
            this.$root.$t("gamemsg.firstdigit"),
            this.$root.$t("gamemsg.lastdigit"),
            this.$root.$t("gamemsg.bothdigit"),
            this.$root.$t("gamemsg.twodigit")
          ]
        },
        tooltip: {
          enabled: true,
          followCursor: false,
          intersect: true,
          onDataSetHover: {
            highlightDataSeries: false
          },
          y: {
            formatter: function(
              val,
              { series, seriesIndex, dataPointIndex, w }
            ) {
              return (
                '<div class="arrow_box">' +
                "<span> Amount: $" +
                series[seriesIndex][dataPointIndex] +
                " </span>" +
                "</div>" +
                '<div class="arrow_box">' +
                "<span> BetCount:" +
                w.config.series[seriesIndex].betCounts[dataPointIndex] +
                "</span>" +
                "</div>"
              );
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
    ...mapGetters(["getGameUUIDByStockName", "getPortalProviderUUID"])
  },
  mounted() {
    this.listenForBroadcast(
      {
        channelName: `liveBetCounts.${this.getGameUUIDByStockName(
          this.$route.params.id
        )}`,
        eventName: "liveBetCounts"
      },
      ({ data }) => {
        try {
          var logData = data;
          if (data.status) {
            this.series = data.data;
            this.componentKey += 1;
          } else {
            throw new Error(config.error.general);
          }
        } catch (ex) {
          console.log(ex);
          log.error(
            {
              channel: `liveBetCounts.${this.getGameUUIDByStockName(
                this.$route.params.id
              )}`,
              event: "liveBetCounts",
              res: logData,
              page: "components/modern/fullscreenchart.vue",
              provider: this.getPortalProviderUUID,
              user: localStorage.getItem("USER_UUID")
            },
            ex.message
          );
        }
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
