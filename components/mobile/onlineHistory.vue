<template>
  <v-dialog
    v-model="dialogOnlineHistory"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    light
  >
    <v-card>
      <v-toolbar>
        <v-layout row>
          <v-spacer></v-spacer>
          <v-icon size="20" @click="dialogOnlineHistory = false">close</v-icon>
        </v-layout>
      </v-toolbar>

      <v-flex xs12 sm12 class="pt-2 pl-5 pr-5">
        <v-layout row>
          <v-flex xs0 sm2></v-flex>
          <v-flex xs12 sm10 class="text-xs-center">
            <h2 class="title_menu">{{ $t("profile.onlinehistory") }}</h2>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex
        xs12
        md12
        v-if="$vuetify.breakpoint.xs"
        class="profile_head text-xs-center"
      >
        <div class="image_container">
          <v-avatar :size="90">
            <img :src="imgProfile" alt="img-profile" />
          </v-avatar>
          <!-- <span class="blur-img">uploading</span> -->
        </div>
        <h3>{{ getUserInfo.firstName }} {{ getUserInfo.lastName }}</h3>
        <p>
          {{ $t("profile.onlinestatus") }} : {{ getUserInfo.currentActiveTime }}
        </p>
        <v-divider></v-divider>
      </v-flex>

      <v-flex xs12 sm12 pt-3>
        <v-layout row>
          <v-flex
            xs2
            md2
            v-if="!$vuetify.breakpoint.xs"
            class="profile_head text-xs-center"
          >
            <div class="image_container">
              <v-avatar :size="60">
                <img :src="imgProfile" alt="img-profile" />
              </v-avatar>
              <!-- <span class="blur-img">uploading</span> -->
            </div>
            <h3>{{ getUserInfo.firstName }} {{ getUserInfo.lastName }}</h3>
            <p>
              {{ $t("profile.onlinestatus") }} :
              {{ getUserInfo.currentActiveTime }}
            </p>
          </v-flex>
          <v-flex xs12 sm10>
            <v-layout row>
              <!-- select start date  -->
              <v-flex xs5 sm5 mr-1 ml-1>
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
              <v-flex xs5 sm5 mr-1>
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

              <v-flex xs1 sm1 ml-1 mr-4>
                <div class="date_picker_container">
                  <div class="title_date_picker">
                    <span></span>
                  </div>
                  <button @click="getOnlineHistory" class="buttonGreen btn-go">
                    GO
                  </button>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm12 md10 lg10 :class="$vuetify.breakpoint.xs ? 'mt-4' : ''">
        <v-layout row>
          <v-flex xs1 sm2></v-flex>
          <v-flex xs10 sm8>
            <div class="chart_container">
              <p class="no-data" v-if="!dataReady">
                <strong>No data to display</strong>
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
        </v-layout>
      </v-flex>

      <v-flex v-if="dataReady" xs12 class="pt-3 pl-5 text-xs-center">
        <div class="text-xs-center">
          <span style="margin-right:30px">
            Online time:
            <b>{{ currentActiveTime }}</b>
          </span>
          <span style="margin-right:30px">
            Total Online:
            <b>{{ totalOnlineTime }}</b>
          </span>
        </div>
      </v-flex>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
import uploadprofile from "./UploadFile";
import onlineChart from "./onlinechart";
import VueApexCharts from "vue-apexcharts";
import date from "date-and-time";
import config from "../../config/config.global";
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
      isShowDateStart: false,
      isShowDateEnd: false,
      startDate: "",
      endDate: "",
      profile: {
        imgProfile: ""
      },
      dialogOnlineHistory: false,
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
  created() {
    const now = date.format(new Date(), "YYYY-MM-DD");
    const lastWeek = date.addDays(new Date(), -7);
    this.startDate = date.format(lastWeek, "YYYY-MM-DD");
    this.endDate = now;
  },
  async mounted() {
    // this.asynUserInfo();
    await this.getOnlineHistory();
  },

  computed: {
    ...mapGetters(["getUserInfo", "getPortalProviderUUID", "getUserUUID"]),
    imgProfile() {
      return this.getUserInfo.profileImage == "" ||
        this.getUserInfo.profileImage == undefined
        ? "/user.png"
        : `${config.apiDomain}/` + this.getUserInfo.profileImage;
    }
  },
  methods: {
    ...mapActions(["setUserData"]),
    showDialogOnlineHistory() {
      this.dialogOnlineHistory = true;
    },
    checkValidDate(startDate, endDate) {
      const now = date.format(new Date(), "YYYY-MM-DD");
      if (endDate > now || !(endDate >= startDate)) {
        return false;
      }
      return true;
    },
    startDateClick() {
      this.isShowDateStart = !this.isShowDateStart;
      this.isShowDateEnd = false;
    },
    endDateClick() {
      this.isShowDateEnd = !this.isShowDateEnd;
      this.isShowDateStart = false;
    },
    async getOnlineHistory() {
      try {
        // console.log('mishri')
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
          console.log(res.data);
          this.dataReady = true;
          let result = res.data.activeTimeDateWise;
          this.currentActiveTime = res.data.currentActiveTime;
          let totalActiveTime = 0;
          let xAxis = [];
          let chartData = [];
          result.forEach(el => {
            totalActiveTime += parseInt(el.activeTimeInMins);
            chartData.push(parseInt(el.activeTimeInMins));
            xAxis.push(el.Date);
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
          console.log(res);
          // alert(res.message);
        }
      } catch (ex) {
        console.error(ex);
        if (ex.message == "Please select a valid date") {
          alert("Please select a valid date");
          this.dataReady = false;
        }
        // alert(ex.message);
      }
    }
  }
};
</script>

<style scoped>
.btn-go {
  width: 45px !important;
  height: 42px !important;
  font-size: 16px !important;
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

.btn_camera {
  background-color: #ffffff;
  border-radius: 50%;
  padding: 6px;
  box-shadow: 0px 2px 5px rgb(145, 145, 145);
}

.btn_camera:focus {
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
  height: 400px;
}

.date_picker {
  background-color: white;
  color: black;
  padding: 10px;
  box-shadow: 0px 2px 5px rgb(145, 145, 145);
  border-radius: 10px;
  position: relative;
  width: 120px;
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
