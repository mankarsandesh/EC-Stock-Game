<template>
  <div>
    <v-flex xs12 class="pt-5 pl-5">
      <div>
        <h2 class="title_menu">{{ $t("profile.stockanalysis") }}</h2>
        <v-divider></v-divider>
      </div>
    </v-flex>
    <v-flex xs12 pt-3 pl-5>
      <v-layout row>
        <!-- select start date  -->
        <v-flex xs6 sm6 md3 lg3 pr-5>
          <div class="date_picker_container" @click="startDateClick">
            <div class="title_date_picker">
              <span>{{ $t("msg.from") }}</span>
            </div>
            <div class="date_picker">
              <span class="select_date">{{ startDate }}</span>
              <span class="icon_date">
                <v-icon>date_range</v-icon>
              </span>
            </div>
          </div>
          <div style="position:absolute;z-index:1">
            <v-date-picker
              v-if="isShowDateStart"
              v-model="startDate"
              @input="isShowDateStart = false"
            ></v-date-picker>
          </div>
        </v-flex>
        <!-- select end date -->
        <v-flex xs6 sm6 md3 lg3 pr-5>
          <div class="date_picker_container" @click="endDateClick">
            <div class="title_date_picker">
              <span>{{ $t("msg.to") }}</span>
            </div>
            <div class="date_picker">
              <span class="select_date">{{ endDate }}</span>
              <span class="icon_date">
                <v-icon>date_range</v-icon>
              </span>
            </div>
          </div>
          <div style="position:absolute;z-index:1">
            <v-date-picker
              v-if="isShowDateEnd"
              v-model="endDate"
              @input="isShowDateEnd = false"
            ></v-date-picker>
          </div>
        </v-flex>
        <!-- go button -->
        <v-flex xs6 sm6 md2 lg1>
          <div class="date_picker_container">
            <div class="title_date_picker">
              <span></span>
            </div>
            <button class="buttonGreen" @click="getStockAnalysis">
              {{ $t("msg.go") }}
            </button>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 sm12 md10 lg10 class="pt-5 pl-5">
      <div class="chart_container">
        <div v-if="isDataValid" class="chart-map-color">
          <span v-for="(stock, index) in stocks" :key="index">
            <span
              class="circle-color"
              :style="{ backgroundColor: colors[0][index] }"
            ></span>
            <span style="margin-right:10px" class="text-uppercase">{{
              stock
            }}</span>
          </span>
        </div>
        <p class="no-data" v-if="!isDataValid">
          <strong>{{ error }}</strong>
        </p>
        <apexchart
          v-if="isDataValid"
          type="bar"
          height="480vh"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </v-flex>
  </div>
</template>

<script>
import apexchart from "vue-apexcharts";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import date from "date-and-time";
import log from "roarr";
import config from "~/config/config.global";

// set color win and lose color in bar chart
let index = 0;
let barColor = [
  ["#67c9d3", "#f75b54", "#fcc624", "#1a237e", "#d81b60", "#ff6f00", "#01579b"], // win color
  ["#81eaf5", "#f9a5a3", "#fddf84", "#7986cb", "#f06292", "#ffb74d", "#90caf9"] // loss color
];
export default {
  components: {
    apexchart: apexchart
  },
  created() {
    const now = date.format(new Date(), "YYYY-MM-DD");
    const lastWeek = date.addDays(new Date(), -7);
    this.startDate = date.format(lastWeek, "YYYY-MM-DD");
    this.endDate = now;
    this.getStockAnalysis();
  },
  destroyed() {
    index = 0; // reset index
  },
  updated() {
    index = 0; // reset index
  },

  data() {
    return {
      stockAnalysis: [],
      colors: barColor,
      isShowDateStart: false,
      isShowDateEnd: false,
      startDate: "",
      endDate: "",
      error: '',
      isDataValid: false,
      chartOptions: {
        colors: [
          function({ value, seriesIndex, dataPointIndex, w }) {
            if (seriesIndex == 0) {
              return barColor[0][dataPointIndex];
            }
            if (seriesIndex == 1) {
              return barColor[1][dataPointIndex];
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "50%",
            // startingShape: "rounded",
            rangeBarOverlap: true,
            barHeight: "100%"
            // dataLabels: {
            //   position: 'top'
            // }
            //endingShape: 'rounded'
            // distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        chart: {
          type: "bar",
          stacked: true,
          //stackType: '100%',
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          },
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          }
        },
        title: {
          text: this.$root.$t('profile.stockanalysis'),
          align: "left",
          margin: 10,
          offsetX: 2,
          offsetY: -5,
          style: {
            fontSize: "20px",
            fontWeight: "bold"
          }
        },
        stroke: {
          show: true,
          width: 2,
          curve: "smooth"
        },
        noData: {
          text: this.$root.$t('msg.nodata')
        },
        tooltip: {
          enabled: true,
          followCursor: true,
          intersect: true,
          onDataSetHover: {
            highlightDataSeries: false
          },
          x: {
            show: false
          },
          y: {
            formatter: (val, { series, seriesIndex, dataPointIndex }) => {
              return (
                '<div class="arrow_box">' +
                "<span> " +
                this.stockAnalysis[dataPointIndex].stockName +
                " </span>" +
                "<span> " +
                series[seriesIndex][dataPointIndex] +
                "</span>" +
                "</div>"
              );
            },
            title: {
              formatter: function(seriesName) {
                return seriesName.toUpperCase();
              }
            }
          }
        },
        xaxis: {
          labels: {
            offsetX: 10,
            offsetY: 10,
            formatter: function(value) {
              return "";
            },
            axisBorder: {
              show: true,
              width: "10%"
            }
          }
        }
      }
    };
  },
  computed: {
    ...mapGetters(["getPortalProviderUUID", "getUserUUID"]),
    stocks() {
      let stocks = [];
      this.stockAnalysis.forEach(element => {
        stocks.push(element.stockName);
      });
      return stocks;
    },
    series() {
      let win = [];
      let loss = [];
      this.stockAnalysis.forEach(element => {
        win.push(element.winCount);
        loss.push(element.lossCount);
      });
      return [
        {
          name: this.$root.$t("msg.win"),
          data: win
        },
        {
          name: this.$root.$t("msg.lose"),
          data: loss
        }
      ];
    }
  },
  methods: {
    checkValidDate(startDate, endDate) {
      const now = date.format(new Date(), "YYYY-MM-DD");
      if (endDate > now || !(endDate >= startDate)) {
        return false;
      }
      return true;
    },
    async getStockAnalysis() {
      try {
        if (!this.checkValidDate(this.startDate, this.endDate)) {
          throw new Error("Please select a valid date");
        }
        var reqBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          userUUID: this.getUserUUID,
          version: config.version,
          dateRangeFrom: this.startDate,
          dateRangeTo: this.endDate
        };
        var res = await this.$axios.$post(
          config.getUserBetAnalysis.url,
          reqBody,
          {
            headers: config.header
          }
        );
        if (res.status) {
          if (res.data.length) {
            this.isDataValid = true;
            this.error = "";
            this.stockAnalysis = res.data;
          } else {
            this.isDataValid = false;
            this.error = "No data to display";
          }
        } else {
          throw new Error(config.error.general);
        }
      } catch (ex) {
        console.log(ex.message);
        this.$swal({
          title: ex.message,
          type: "error",
          timer: 1000,
          showConfirmButton: false
        });
        if (ex.message == "Please select a valid date") {
          this.error = "Please select a valid date";
          this.isDataValid = false;
        }
        log.error(
          {
            req: reqBody,
            res,
            page: "pages/modern/desktop/profile/stockAnalysis.vue",
            apiUrl: config.getUserBetAnalysis.url,
            provider: localStorage.getItem("PORTAL_PROVIDERUUID"),
            user: localStorage.getItem("USER_UUID")
          },
          ex.message
        );
      }
    },
    startDateClick() {
      this.isShowDateStart = !this.isShowDateStart;
      this.isShowDateEnd = false;
    },
    endDateClick() {
      this.isShowDateEnd = !this.isShowDateEnd;
      this.isShowDateStart = false;
    }
  }
};
</script>

<style scoped>
#chart_container .apexcharts-tooltip {
  color: blue;
  background-color: red;
}

li {
  list-style-type: none;
}

.chart-map-color {
  position: relative;
  float: right ;
  margin-top: 15px;
  display: inline-block;
}

.circle-color {
  position: relative;
  display: inline-block;
  top: 2px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

button {
  background-color: green;
  padding: 10px;
  width: 60px;
  color: #ffffff;
  border-radius: 10px;
  font-weight: bold;
}

button:focus {
  outline: none;
}

.title_menu {
  padding-bottom: 15px;
  text-transform: capitalize;
  color: #353333;
}

.date_picker_container {
  text-transform: capitalize;
  cursor: pointer;
}

.chart_container {
  background-color: white;
  color: black;
  padding: 10px;
  box-shadow: 0px 2px 5px rgb(145, 145, 145);
  border-radius: 10px;
  width: 100%;
  min-height: 550px;
}

.date_picker {
  background-color: white;
  color: black;
  padding: 10px;
  box-shadow: 0px 2px 5px rgb(145, 145, 145);
  border-radius: 10px;
  position: relative;
}

.title_date_picker {
  padding-left: 10px;
  padding-bottom: 5px;
  color: #353333;
  text-transform: uppercase;
  min-height: 30px;
}

.icon_date {
  float: right;
  margin-top: -2px;
}

.select_date {
  text-transform: uppercase;
}

.no-data {
  color: red;
  text-align: center;
  align-content: center;
}
</style>
