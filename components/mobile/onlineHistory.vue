<template>
  <v-dialog
    v-model="dialogOnlineHistory"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    light
  >
    <v-card>
      <v-toolbar card dark style="background-color:#2cb13b;">
        <v-layout row justify-center>
          <h2>{{ $t("profile.onlineHistory") }}</h2>
          <v-spacer></v-spacer>
          <v-icon size="20" @click="dialogOnlineHistory = false">fa-times</v-icon>
        </v-layout>
      </v-toolbar>
      <v-flex
        mt-2
        xs12
        v-if="$vuetify.breakpoint.xs"
        class="profile_head text-xs-center"
      >
        <div class="image_container" mt-2>
          <v-avatar :size="90">
            <img :src="imgProfile" alt="img-profile" />
          </v-avatar>
        </div>
        <h3 class="text-capitalize">
          {{ getUserInfo.firstName }} {{ getUserInfo.lastName }}
        </h3>
        <p>
          <strong> {{ $t("profile.onlineStatus") }} : </strong>
          {{ getUserInfo.currentActiveTime }}
        </p>
        <v-divider></v-divider>
      </v-flex>

      <v-flex xs12 sm12 pt-3>
        <v-layout row justify-center>
          <v-flex
            xs2
            sm12
            md2
            v-if="!$vuetify.breakpoint.xs"
            class="profile_head text-xs-center"
          >
            <div class="image_container">
              <v-avatar :size="60">
                <img :src="imgProfile" alt="img-profile" />
              </v-avatar>
            </div>
            <h3 class="text-capitalize">
              {{ getUserInfo.firstName }} {{ getUserInfo.lastName }}
            </h3>
            <p>
              <strong> {{ $t("profile.onlineStatus") }} : </strong>
              {{ getUserInfo.currentActiveTime }}
            </p>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
        <v-layout row justify-center>
          <v-flex xs12 sm10>
            <v-layout row justify-center pa-2>
              <!-- select start date  -->
              <v-flex xs5 sm5 mr-1 ml-1>
                <div class="date_picker_container" @click="startDateClick">
                  <div class="title_date_picker">
                    <strong>{{ $t("msg.from") }}</strong>
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
                    <strong>{{ $t("msg.to") }}</strong>
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
                    v-if="isShowDateEnd"
                    v-model="endDate"
                    @input="isShowDateEnd = false"
                  ></v-date-picker>
                </div>
              </v-flex>
              <!-- end of end date -->
              <v-flex xs2 sm2>
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
      <v-flex
        xs12
        sm12
        md10
        lg10
        mt-2
        :class="$vuetify.breakpoint.xs ? 'mt-4' : ''"
      >
        <v-layout row justify-center>
          <v-flex xs11 sm10>
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

      <v-flex v-if="dataReady" xs12 pb-2 class="pt-3 text-xs-center">
        <div class="text-xs-center">
          <div>
            <strong> Online Time : </strong>
            {{ currentActiveTime }}
          </div>
          <div>
            <strong> Total Online : </strong>
            {{ totalOnlineTime }}
          </div>
        </div>
      </v-flex>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
import onlineChart from "./onlinechart";
import VueApexCharts from "vue-apexcharts";
import date from "date-and-time";
import config from "~/config/config.global";
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
          type: "bar",
          toolbar: {
            show: false
          }
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
    ...mapActions(["setSnackBarMessage"]),
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
    // Check Online History Date Wise.
    async getOnlineHistory() {
      try {
        if (!this.checkValidDate(this.startDate, this.endDate)) {
          this.setSnackBarMessage("Please select a valid date");
        }
        var reBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          userUUID: this.getUserUUID,
          dateRangeFrom: this.startDate,
          dateRangeTo: this.endDate,
          version: config.version
        };
        const res = await this.$axios.$post(config.getUserProfile.url, reBody, {
          headers: config.header
        });
        if (res.code == 200) {
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
          this.setSnackBarMessage(config.error.general);
        }
      } catch (ex) {
        this.setSnackBarMessage("Please select a valid date");
        this.dataReady = false;
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
  border-radius: 6px;
  width: 100%;
  height: 400px;
}

.date_picker {
  background-color: white;
  color: black;
  padding: 10px;
  box-shadow: 0px 2px 5px rgb(145, 145, 145);
  border-radius: 5px;
  position: relative;
  width: 80%;
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
