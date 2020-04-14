<template>
  <div>
    <v-flex xs12 class="pt-5 pl-5">
      <div>
        <h2 class="title_menu">online history</h2>
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
          <div style="position: absolute; z-index: 1;">
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
          <div style="position: absolute; z-index: 1;">
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
            <button @click="getOnlineHistory">{{ $t("msg.go") }}</button>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 sm12 md10 lg10 class="pt-5 pl-5">
      <div class="chart_container">
        <p v-if="!dataReady" class="no-data">
          <strong>{{ error }}</strong>
        </p>
        <VueApexCharts
          v-if="dataReady"
          type="bar"
          height="350"
          :options="chartOptions"
          :series="series"
          :key="componentKey"
        />
      </div>
    </v-flex>
    <v-flex xs12 class="pt-3 pl-5">
      <div v-if="dataReady">
        <span style="margin-right: 30px;">
          {{ $t("profile.onlinetime") }} : <b>{{ currentActiveTime }}</b>
        </span>
        <span style="margin-right: 30px;">
          {{ $t("profile.totalonline") }} : <b> {{ totalOnlineTime }} </b>
        </span>
      </div>
    </v-flex>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import date from "date-and-time";
import config from "../../../../config/config.global";
import VueApexCharts from "vue-apexcharts";
export default {
  components: {
    VueApexCharts
  },
  data() {
    return {
      series: [],
      componentKey: 0,
      totalOnlineTime: "",
      currentActiveTime: "",
      dataReady: false,
      error: "",
      isShowDateStart: false,
      isShowDateEnd: false,
      startDate: "",
      endDate: "",
      chartOptions: {
        chart: {
          height: 350,
          type: "bar"
          // events: {
          //   click: function (chart, w, e) {
          //     console.log(chart, e);
          //   }
          // }
        },
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              fontSize: "12px"
            }
          }
        }
        // tootltip: {
        //   enabled: false,
        //   followCurso: true,
        //   intersect: true,
        //   onDataSetHover: {
        //     highlightDataSeries: false
        //   },
        //   x: {
        //     show: false
        //   },
        //   custom: function({series, seriesIndex, dataPointIndex, w}) {
        //     console.log('ayaaaaaaaaa');
        //     return '<div class="arrow_box">' +
        //         '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
        //       '</div>'
        //   },
        //   y: {
        //     formatter: function (val, {series, seriesIndex, dataPointIndex, w}) {
        //       console.log('ayaayaaaaaaaaa');
        //       return '<div class="arrow-box">' +
        //           '<span> Active minutes: ' + series[seriesIndex] + '</span>'
        //         '</div>'
        //     }
        //   }
        // },
      }
    };
  },
  async created() {
    const now = date.format(new Date(), "YYYY-MM-DD");
    const lastWeek = date.addDays(new Date(), -7);
    this.startDate = date.format(lastWeek, "YYYY-MM-DD");
    this.endDate = now;
  },
  async mounted() {
    await this.getOnlineHistory();
  },

  computed: {
    ...mapGetters(["getUserInfo", "getPortalProviderUUID", "getUserUUID"])
  },
  methods: {
    startDateClick() {
      this.isShowDateStart = !this.isShowDateStart;
      this.isShowDateEnd = false;
    },
    endDateClick() {
      this.isShowDateEnd = !this.isShowDateEnd;
      this.isShowDateStart = false;
    },
    checkValidDate(startDate, endDate) {
      const now = date.format(new Date(), "YYYY-MM-DD");
      if (endDate > now || !(endDate >= startDate)) {
        return false;
      }
      return true;
    },
    async getOnlineHistory() {
      try {
        if (!this.checkValidDate(this.startDate, this.endDate)) {
          throw new Error("Please select a valid date");
        }
        const res = await this.$axios.$post(
          config.getUserProfile.url,
          {
            portalProviderUUID: this.getPortalProviderUUID,
            userUUID: this.getUserUUID,
            dateRangeFrom: this.startDate,
            dateRangeTo: this.endDate,
            version: config.version
          },
          {
            headers: config.header
          }
        );
        if (res.code === 200) {
          if (res.data.activeTimeDateWise.length) {
            this.dataReady = true;
            let result = res.data.activeTimeDateWise;
            this.currentActiveTime = res.data.currentActiveTime;
            let totalActiveTime = 0;
            let xAxis = [];
            let chartData = [];
            result.forEach(element => {
              totalActiveTime += parseInt(element.activeTimeInMins);
              chartData.push(parseInt(element.activeTimeInMins));
              xAxis.push(element.Date);
            });
            let days = Math.floor(totalActiveTime / (24 * 60));
            let hours = parseInt(totalActiveTime / 60) % 24;
            let minutes = totalActiveTime % 60;
            this.totalOnlineTime = `${
              days ? `${days} days, ` : ``
            }${hours} hours and ${minutes} minutes`;
            this.series = [{ data: chartData }];
            this.chartOptions.xaxis.categories = xAxis;
            this.componentKey++;
          } else {
            this.error = "No data to display";
            this.dataReady = false;
          }
        } else {
          this.error = "Something went wrong";
          this.dataReady = false;
          throw new Error(Object.values(res.message)[0][0]);
        }
      } catch (ex) {
        console.log(ex);
        this.$swal({
          title: ex.message,
          type: "error",
          showConfirmButton: true
        });
        if (ex.message == "Please select a valid date") {
          this.error = "Please select a valid date";
          this.dataReady = false;
        }
      }
    }
  }
};
</script>

<style scoped>
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
  height: 420px;
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
  align-content: center;
  text-align: center;
}
</style>
