<template>
  <div>
    <v-flex xs12 class="pt-5 pl-5">
      <div>
        <h2 class="title_menu">{{ $t("profile.stockAnalysis") }}</h2>
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
              color="#1db42f"
              :max="maxDate"
              v-if="isShowDateStart"
              v-model="startDate"
              @input="isShowDateStart = false"
              :locale="lang"
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
              color="#1db42f"
              :max="maxDate"
              v-if="isShowDateEnd"
              v-model="endDate"
              @input="isShowDateEnd = false"
              :locale="lang"
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
          height="480"
          :options="chartOptions"
          :series="series"
          :key="componentKey"
        ></apexchart>
      </div>
    </v-flex>
  </div>
</template>

<script>
import apexchart from "vue-apexcharts";
import { mapGetters,mapActions } from "vuex";
import secureStorage from "../../../../plugins/secure-storage";
import config from "~/config/config.global";
import utils from "~/mixin/utils";
import date from "date-and-time";

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
  mixins: [utils],
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
      componentKey: 0,
      colors: barColor,
      maxDate: new Date().toISOString(),
      isShowDateStart: false,
      isShowDateEnd: false,
      startDate: "",
      endDate: "",
      error: "",
      isDataValid: false,
      stocks: [],
      series: [],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false
          }
        },
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
            columnWidth: "30%",
            endingShape: "flat"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: [],
          labels: {
            formatter: function(val) {
              return val.toUpperCase();
            }
          }
        },
        yaxis: {
          title: {
            text: ""
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val;
            }
          }
        }
      }
    };
  },
  computed: {
    ...mapGetters(["getPortalProviderUUID", "getUserUUID", "getLocale"]),
    lang() {
      if(this.getLocale == "us"){
        return "en-US"
      } else if(this.getLocale == "th") {
        return "th-TH"
      } else if(this.getLocale == "cn") {
        return "zh-CN"
      } else {
        return "la"
      }
    }
  },
  watch: {
    getLocale() {
      this.series[0].name = this.$root.$t("msg.win");
      this.series[1].name = this.$root.$t("msg.lose");
      this.getStockAnalysis();
      this.componentKey++;
    }
  },
  beforeDestroy(){
    this.userActivityAction();
  },
  methods: {
    ...mapActions(["userActivityAction"]),
    // Fetch Stock info
    async getStockAnalysis() {
      try {
        // Check if the date is valid(function is written in util mixin)
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
        if (res.code == 200) {
          if (res.data.length > 0) {
            this.stockAnalysis = res.data;
            let stocks = [];
            this.stockAnalysis.forEach(element => {
              stocks.push(element.stockName);
            });
            this.stocks = stocks;
            this.chartOptions.xaxis.categories = stocks;
            let win = [];
            let loss = [];
            this.stockAnalysis.forEach(element => {
              win.push(element.winCount);
              loss.push(element.lossCount);
            });
            this.series = [
              {
                name: this.$root.$t("msg.win"),
                data: win
              },
              {
                name: this.$root.$t("msg.lose"),
                data: loss
              }
            ];
            this.isDataValid = true;
            this.error = "";
          } else {
            this.isDataValid = false;
            this.error = this.$root.$t("profile.noData");
          }
        } else if (res.code == 202) {
          this.dataReady = false;
          this.$swal({
            type: "error",
            title: this.$root.$t("popupMsg.sessionExpired"),
            confirmButtonText: this.$root.$t("popupMsg.okLogout"),
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then(result => {
            if (result.value) {
              const URL = secureStorage.getItem("referrerURL");
                secureStorage.removeItem("USER_UUID");
                secureStorage.removeItem("PORTAL_PROVIDERUUID");
                secureStorage.removeItem("userSessionID");  
              location.href = URL;
            }
          });
        }
      } catch (ex) {
        console.log(ex.message);
        if (ex.message == "Please select a valid date") {
          this.error = this.$root.$t("profile.invalidDate");
          this.isDataValid = false;
          this.$swal({
            title: this.$root.$t("profile.invalidDate"),
            type: "error",
            timer: 2000,
            showConfirmButton: false
          });
        } else {
          this.$swal({
            title: ex.message,
            type: "error",
            timer: 2000,
            showConfirmButton: false
          });
        }
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
  float: right;
  margin-top: 15px;
  /* display: inline-block; */
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
