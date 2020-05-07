<template>
  <div xs2>
    <section class="breadcrumbs" v-if="messageError == false">
      <v-container md10>
        <v-parallax dark height="150">
          <v-layout align-center row>
            <v-flex xs6>
              <div class="flex-container">
                <div class="profile-img-container">
                  <div class="profile-crowd">
                    <fa icon="crown" style="font-size: 17px; color: orange;" />
                  </div>
                  <img
                    width="100%"
                    height="100%"
                    :src="userImgProfile(visitProfileUserData.userImage)"
                    class="grey darken-4"
                  />
                </div>
                <div class="profile-name-container">
                  <span class="profile-name-tittle text-capitalize">
                    {{ visitProfileUserData.firstName }}
                    {{ visitProfileUserData.lastName }}
                  </span>

                  <span
                    class="font-weight-medium"
                    v-if="visitProfileUserData.username"
                  >
                    {{ visitProfileUserData.username }}
                  </span>

                  <span
                    v-if="visitProfileUserData.currentActiveTime === 'offline'"
                  >
                    {{ visitProfileUserData.currentActiveTime }}
                  </span>
                  <span v-else>
                    <b>{{ $t("profile.lastActive") }} : </b>
                    {{ visitProfileUserData.currentActiveTime }}
                  </span>
                  <span
                    class="font-weight-medium"
                    v-if="visitProfileUserData.userUUID == getUserUUID"
                  >
                    <a class="editButton" href="/modern/desktop/profile/"
                      >{{ $t("msg.edit") }} {{ $t("menu.profile") }}
                    </a>
                  </span>
                </div>
              </div>
            </v-flex>
            <v-flex xs8 class="text-end">
              <div class="leftFollowDiv">
                <span class="historyName">
                  {{ $t("profile.historyPeriod") }}:
                </span>
                <div style="flex-grow: wrap; width: 150px; margin: 0 10px;">
                  <v-select
                    v-model="filter"
                    height="15px"
                    dense
                    hide-details
                    :items="items"
                    solo
                  ></v-select>
                </div>
                <v-btn
                  v-if="
                    visitProfileUserData.userUUID != getUserUUID 
                  "
                  v-bind:class="[
                    visitProfileUserData.userUUID != getUserUUID &&
                    visitProfileUserData.isFollowing == 0
                      ? 'buttonFollow'
                      : 'buttonunFollow'
                  ]"
                  v-on:click="
                    followUserBet(
                      visitProfileUserData.username,
                      visitProfileUserData.userImage,
                      visitProfileUserData.userUUID,
                      visitProfileUserData.isFollowing
                    )
                  "
                >              
                  {{
                    visitProfileUserData.isFollowing == 0
                      ? $t("useraction.followBet")
                      : $t("useraction.unfollowBet")
                  }}
                </v-btn>
              </div>
            </v-flex>
          </v-layout>
        </v-parallax>
      </v-container>
    </section>
    <v-container mb-5>
      <v-layout row wrap>
        <v-flex xs12 mt-3 v-if="messageError == false">
          <div class="container-content">
            <div class="box-container">
              <div class="cul-box" style="color: #7e57c2;">
                <span>
                  <fa
                    icon="percentage"
                    style="font-size: 40px; color: #7e57c2;"
                  />
                </span>
                <span class="number-box"
                  >{{ visitProfileUserData.winRate }}%</span
                >
                <span class="des-title text-uppercase">{{
                  $t("leaderboard.winningrate")
                }}</span>
              </div>
              <div class="cul-box cul-box-green">
                <span>
                  <fa
                    icon="money-bill-wave"
                    style="font-size: 40px; color: #ace6af;"
                  />
                </span>
                <span class="number-box">{{
                  visitProfileUserData.totalBets
                }}</span>
                <span class="des-title text-uppercase">{{
                  $t("msg.totalbet")
                }}</span>
              </div>
              <div class="cul-box cul-box-red">
                <span>
                  <fa icon="users" style="font-size: 40px; color: #f28691;" />
                </span>
                <span class="number-box">{{
                  visitProfileUserData.followerCount
                }}</span>
                <span class="des-title text-uppercase">{{
                  $t("profile.followers")
                }}</span>
              </div>
              <div class="cul-box cul-box-yellow">
                <span>
                  <fa
                    icon="money-bill-alt"
                    style="font-size: 40px; color: #ffd682;"
                  />
                </span>
                <span class="number-box"
                  >${{ visitProfileUserData.totalWinAmount | currency }}</span
                >
                <span class="des-title text-uppercase">{{
                  $t("leaderboard.winningamount")
                }}</span>
              </div>
            </div>
            <div class="pt-5 stock-history">
              <h2 class="text-uppercase">
                {{ $t("profile.onlinehistory") }} {{ $t("profile.chart") }}
              </h2>
              <div class="stock-history-container">
                <VueApexCharts
                  v-if="series.length > 0"
                  type="bar"
                  height="350"
                  :options="chartOptions"
                  :series="series"
                  :key="series.length + '' + filter"
                />
              </div>
            </div>
          </div>
        </v-flex>
        <v-flex v-if="messageError == true">
          <div class="container-content">
            <div class="box-error">
              <h1>Sorry, this content isn't avaiable right now</h1>
              <p>
                The Link you followed have expired, or the page may only be
                visiable to an audiencce you're not in.
              </p>
              <a @click="$router.push('/modern/desktop/userprofile/')">
                Go back to the previous Page
              </a>
              <a @click="$router.push('/modern/desktop/btc1/')">
                EC Game Home Page</a
              >
            </div>
          </div>
        </v-flex>
      </v-layout>

      <!-- Follow Dialog -->
      <v-dialog v-model="dialog" width="500" class="followDialog">
        <followBet
          v-if="renderComponent"
          :username="this.username"
          :userImage="this.userImage"
          :FollowerUserUUID="this.FollowUserUUID"
          :isFollowing="this.FolloworNot"
          @followBetClose="closeFollowBet"
        />
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueApexCharts from "vue-apexcharts";
import config from "~/config/config.global";
import followBet from "~/components/modern/follow/followBet";
import date from "date-and-time";
import secureStorage from "../../../../plugins/secure-storage";
import log from "roarr";

export default {
  layout: "desktopModern",
  components: {
    followBet,
    VueApexCharts
  },
  data() {
    return {
      myProfileImage : "",
      renderComponent: true, // render Follow Bet
      username: "",
      FollowUserUUID: "",
      FolloworNot: "",
      userImage: "",
      dialog: false,
      defaultImage: "/no-profile-pic.jpg",
      messageError: false,
      startDate: "",
      endDate: "",
      visitProfileUserData: "",
      filter: 1,
      items: [
        {
          text: "1 Month",
          value: 1
        },
        {
          text: "2 Month",
          value: 2
        },
        {
          text: "3 Month",
          value: 3
        }
      ],
      series: [],
      chartOptions: {
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function(chart, w, e) {}
          },
          toolbar: {
            show: false
          }
        },
        colors: ["#2E93fA", "#66DA26", "#546E7A", "#E91E63", "#FF9800"],
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
    this.setFilter(30);
    this.getUserProfileByID();   
  },
  computed: {
    ...mapGetters(["getPortalProviderUUID", "getUserUUID","getUserInfo"]),     
  },
  watch: {
    filter() {
      this.setFilter(this.filter * 30);
      this.getUserProfileByID();
    }
  },
  methods: {
    // Render Follow Bet Component
    forceRerender() {
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    // Close Follow Bet Popup
    closeFollowBet() {
      this.dialog = false;
    },
    // Follow User Bet
    followUserBet: function(username, userImg, userUUID, method) {      
      this.username = username;
      this.FollowUserUUID = userUUID;
      if (method == 0) {
        this.FolloworNot = 1;
      } else {
        this.FolloworNot = 2;
      }
      this.userImage = userImg ? this.userImgProfile(userImg) : this.defaultImage;     
      this.dialog = true;
      this.forceRerender();
    },
    userImgProfile(userImg) {
      return userImg ? `${config.apiDomain}/`+ userImg : this.defaultImage;        
    },   
    setFilter(duration) {
      const now = date.format(new Date(), "YYYY-MM-DD");
      const lastWeek = date.addDays(new Date(), -duration);
      this.startDate = date.format(lastWeek, "YYYY-MM-DD");
      this.endDate = now;
    },
    async getUserProfileByID() {
      try {
        if (!this.$route.params.useruuid) {
          this.userNew = this.getUserUUID;
        } else {
          this.userNew = this.$route.params.useruuid;
        }
        var reqBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          userUUID: this.getUserUUID,
          visitingUserUUID: this.userNew,
          dateRangeFrom: this.startDate,
          dateRangeTo: this.endDate,
          version: config.version
        };
        var res = await this.$axios.$post(
          config.getVisitUserProfile.url,
          reqBody,
          {
            headers: config.header
          }
        );
        console.log(reqBody);
        console.log(res);
        if (res.status) {
          this.messageError = false;
          this.visitProfileUserData = res.data;
          this.myProfileImage = res.data.userImage;       
          
          //  series
          let series = [];
          let xaxis = [];
          res.data.activeTimeDateWise.forEach(element => {
            series.push(element.activeTimeInMins);
            xaxis.push(element.Date);
          });
          this.series = [
            {
              data: series
            }
          ];
          this.chartOptions.xaxis.categories = xaxis;
        } else {
          this.messageError = true;
          throw new Error(config.error.general);
        }
      } catch (ex) {
        console.error(ex);
        this.$swal({
          title: ex.message,
          type: "error",
          timer: 1000
        });
        log.error(
          {
            req: reqBody,
            res,
            page: "pages/modern/desktop/userprofile/_useruuid.vue",
            apiUrl: config.getVisitUserProfile.url,
            provider: secureStorage.getItem("PORTAL_PROVIDERUUID"),
            user: secureStorage.getItem("USER_UUID")
          },
          ex.message
        );
      }
    }
  }
};
</script>

<style scoped>
.leftFollowDiv {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.historyName {
  flex-grow: wrap;
  font-weight: bold;
}

.box-error {
  border: 1px solid #dddddd;
  background-color: #fff;
  width: 40%;
  margin: 10% auto;
  padding: 40px;
}

.box-error h1 {
  border-bottom: 1px solid #dddddd;
  margin-bottom: 20px;
  color: #003e70;
}

.box-error a {
  color: #003e70;
  font-weight: 500;
  margin-right: 10px;
}

.editButton {
  color: #fff;
  font-size: 16px;
  font-weight: 800;
}

.stock-history-container {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 0 3px gray;
  border-radius: 5px;
}

.des-title {
  color: black !important;
  font-weight: 500;
}

.number-box {
  font-size: 25px;
  font-weight: bolder;
}

.box-container {
  display: flex;
  width: 100%;
}

.cul-box:first-child {
  margin-left: 0;
}

.cul-box {
  padding: 15px;
  border-radius: 10px;
  border: #c0acef solid 3px;
  background-color: #fff;
  margin: 15px;
  width: 220px;
  height: 180px;
  box-shadow: 0 0 2px #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
}

.cul-box-green {
  border-color: #ace6af !important;
  color: #ace6af;
}

.cul-box-yellow {
  border-color: #ffd682 !important;
  color: #ffd682;
}

.cul-box-red {
  border-color: #f28691 !important;
  color: #f28691;
}

.container-content {
  padding-top: 25px;
  display: flex;
  width: 100%;
  flex-direction: column;
}

.profile-crowd {
  position: absolute;
  z-index: 1;
  min-width: 30px;
  min-height: 30px;
  border-radius: 50%;
  border: #fff solid 1px;
  background-color: #8b4448;
  top: -12px;
  right: -9px;
  padding: 4px;
}

.profile-img-container {
  cursor: pointer;

  position: relative;
  border: gray solid 3px;
  border-radius: 5px;
  height: 100px;
  width: 100px;
  box-shadow: 0 0 5px #fff;
}

.profile-name-tittle {
  font-weight: bolder;
  font-size: 22px;
}

.flex-container {
  display: flex;
  align-items: center;
}

.profile-name-container {
  display: flex;
  cursor: pointer;
  flex-direction: column;
  position: relative;
  padding-left: 12px;
}

.buttonFollow {
  color: #fff !important;
  border-radius: 3px;
  background-image: linear-gradient(to right, #0bb177 30%, #2bb13a 51%);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3) !important;
  font-size: 14px;
  width: 120px;
  height: 48px;
  flex-grow: wrap;
}

.buttonunFollow {
  color: #fff !important;
  border-radius: 3px;
  background-image: linear-gradient(to right, #888787 30%, #626161 51%);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3) !important;
  font-size: 14px;
  width: 120px;
  height: 48px;
  flex-grow: wrap;
}
</style>
