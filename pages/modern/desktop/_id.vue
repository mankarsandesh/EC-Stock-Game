<template>
  <v-container fluid mt-2 class="containerNew pa-2 " style="text-align:center;">
    <v-layout style="background-color: #f4f5fd;width:100%;">
      <!-- <v-flex md3 lg3 mt-3 > -->
      <v-flex v-if="!isHidden" class="leftStocklist" mt-4>
        <span @click="isHidden = true" class="sidebar-close">
          <v-icon color="#0b2968">close</v-icon>
        </span>
        <v-layout column>
          <v-flex xs12 pt-3>
            <div id="stocklistGuidelines">
              <stockList></stockList>
            </div>
          </v-flex>
          <v-flex xs12 pt-2>
            <div id="betresultGuidelines">
              <stockResult></stockResult>
            </div>
          </v-flex>
          <v-flex xs12 pt-2>
            <div id="bettingGuidelines">
              <onBetting></onBetting>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex v-if="isHidden" @click="isHidden = false" mr-3>
        <span class="sidebar-toggle">
          <v-icon color="#FFF">list</v-icon>
        </span>
      </v-flex>
      <!-- </v-flex> -->
      <v-flex :xs10="!isHidden" :xs12="isHidden">
        <v-flex md12 lg12 pl-3>
          <v-layout row wrap md12>
            <!-- Stock Select Start -->
            <v-flex md7 lg6 pt-2>
              <div id="selectstockGuideline">
                <stockSelect />
              </div>
            </v-flex>
            <!-- Stock Select End -->

            <!-- Stock Last Draw Start -->
            <v-flex xs6 md5 lg6 pt-1>
              <v-layout mb-3>
                <v-flex xs4 md3 class="text-xs-center text-uppercase" px-2>
                  <span>{{ $t("msg.Lastdraw") }}</span>
                  <div id="lastDrawGuideline">
                    <v-flex class="lastdraw">
                      <span
                        v-html="$options.filters.lastDraw(getLastDraw)"
                      ></span>
                    </v-flex>
                  </div>
                </v-flex>
                <v-flex xs4 md3 class="text-xs-center text-uppercase" px-2>
                  <span>{{ $t("msg.BetClosein") }}</span>
                  <div id="betCloseInGuideline">
                    <v-flex class="betclose">
                      <span
                        v-if="
                          getTimerByStockName($route.params.id) &&
                            getTimerByStockName($route.params.id)
                              .stockStatus === 'Closed'
                        "
                      >
                        {{
                          getTimerByStockName($route.params.id)
                            | betclosein(getStockLoop($route.params.id))
                        }}
                      </span>
                      <span v-else>
                        {{
                          getTimerByStockName($route.params.id) &&
                            getTimerByStockName($route.params.id)
                              .gameEndTimeCountDownInSec
                              | betclosein(getStockLoop($route.params.id))
                        }}
                      </span>
                    </v-flex>
                  </div>
                </v-flex>

                <v-flex xs4 md3 class="text-xs-center text-uppercase" px-2>
                  <span>{{ $t("msg.lotterydraw") }}</span>
                  <div id="lotteryDrawGuidelines">
                    <v-flex class="lottery">
                      <span>
                        {{
                          getTimerByStockName($route.params.id) &&
                            getTimerByStockName($route.params.id)
                              .gameEndTimeCountDownInSec
                              | lotterydraw(getStockLoop($route.params.id))
                        }}
                      </span>
                    </v-flex>
                  </div>
                  <!-- <lotteryDraw > </lotteryDraw>   -->
                </v-flex>

                <v-flex
                  xs2
                  md1
                  class="text-xs-right"
                  style="align-self: flex-end;"
                >
                  <v-btn
                    fab
                    dark
                    small
                    class="helpButton"
                    @click="openTutorial()"
                    title="Help"
                  >
                    <v-icon dark size="22">fa-question</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
            <!-- Stock Last Draw End -->
          </v-layout>
          <v-layout style="margin-top:-10px;">
            <v-flex md5 lg5>
              <div id="chartGuidelineNew" class="chartDesgin">
                <v-flex>
                  <chartApp :stockName="routeParams" />
                </v-flex>
              </div>
            </v-flex>
            <v-flex md7 lg6 ml-3 pt-2>
              <div id="betRuleButton">
                <betButton :stockName="$route.params.id" :loop="1"></betButton>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>

        <!-- Road Map Start -->
        <v-flex xs12 v-if="getRoadMap.length > 0">
          <div
            class="trendmap-container"
            v-for="(trendType, index) in trendTypes"
            :key="index"
          >
            <div id="trendmapGuidelines">
              <tableTrendMap
                :index="index"
                :dataArray="getRoadMap"
                :isShowMultigameButton="index"
              ></tableTrendMap>
            </div>
            <span class="addChart" @click="removeTradMap(index)">
              <v-icon>close</v-icon>
            </span>
            <span
              class="addChart"
              @click="addTrendMap()"
              v-if="trendTypes.length == index + 1 && trendTypes.length < 4"
            >
              <v-icon>add</v-icon>
            </span>
          </div>
        </v-flex>
        <!-- Road Map End -->
      </v-flex>

      <!-- Game Rule Popup -->
      <v-dialog v-model="dialog" width="800">
        <v-card class="ruleModel" style="border-radius: 10px;">
          <v-icon
            class="closePopup"
            color="#333 !important"
            @click="dialog = false"
            >close</v-icon
          >
          <v-card-title class="title" primary-title
            >TOP 10 LEADERS</v-card-title
          >
          <v-card-text>
            <leaderboardUserlist />
          </v-card-text>
          <v-flex class="text-lg-right">
            <v-btn
              class="buttonGreensmall"
              to="/modern/desktop/leaderboard"
              dark
              >Go to Leaderboard</v-btn
            >
          </v-flex>
        </v-card>
      </v-dialog>

      <!-- Full Screen Float Button -->
      <v-flex class="layout-bottom">
        <div id="fullscreenGuidelines">
          <v-btn
            color="primary"
            :to="'/modern/multigame/' + $route.params.id"
            rigth
            fab
            class="multiGame"
            dark
            title="Multiple Game"
          >
            <i
              style="font-size:26px;"
              class="fa fa-gamepad"
              aria-hidden="true"
            ></i>
          </v-btn>

          <v-btn
            color="primary"
            rigth
            fab
            class="fullscreen"
            dark
            @click="setAfterFullScreenClosePage()"
            title="Full Screen"
          >
            <v-icon>fullscreen</v-icon>
          </v-btn>
        </div>
      </v-flex>
      <!-- End Multiple Screen Button Code -->
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import stockList from "~/components/modern/stockList";
import stockResult from "~/components/modern/stockresult";
import onBetting from "~/components/modern/onBetting";
import betButton from "~/components/modern/betButton";
import chartApp from "~/components/modern/chart";
import tableTrendMap from "~/components/modern/tableTrendMap";
import onlyrules from "~/components/modern/stocklist/onlyrule";
import stockSelect from "~/components/stockSelect";
import leaderboardUserlist from "~/components/modern/leaderboard/leaderboardUserlist";
import config from "~/config/config.global";
import lotteryDraw from "~/components/modern/lotteryDraw";
import { isMobile } from "mobile-device-detect";
import log from "roarr";
import secureStorage from "../../../plugins/secure-storage";

export default {
  async validate({ params, store }) {
    return store.getters.getCheckStock(params.id);
  },
  layout: "desktopModern",
  components: {
    stockList,
    stockResult,
    onBetting,
    chartApp,
    betButton,
    tableTrendMap,
    onlyrules,
    stockSelect,
    leaderboardUserlist,
    lotteryDraw,
    isMobile: isMobile
  },
  data() {
    return {
      routeParams: this.$route.params.id,
      stock: [],
      dialog: false,
      bgColor: "#778899",
      position: "top-right",
      isHidden: false,
      isMobile: isMobile,
      firstPanelFocus: false,
      fabActions: [
        {
          name: "cache",
          icon: "cached"
        }
      ],
      trendTypes: ["firstDigit"],
      isloading: false,
      isStep: 0
    };
  },
  updated() {},
  created() {
    if (isMobile) {
      window.location = `/modern/betting/${this.$route.params.id}`;
    }
    this.getStock();
    // Game Rule Popup check and open Ne User
    // if (secureStorage.getItem("gameRule") != "shown") {
    //   this.dialog = true;
    //   secureStorage.setItem("gameRule", "shown");
    // } else {
    //   this.dialog = false;
    // }
  },
  beforeDestroy() {
    this.stopListenSocket(
      `roadMap.${this.getStockUUIDByStockName(this.routeParams)}.${
        this.getPortalProviderUUID
      }`
    );
  },
  mounted() {
    this.setRoadMap(this.getStockUUIDByStockName(this.$route.params.id));
    // live road map from socket
    this.listenForBroadcast(
      {
        channelName: `roadMap.${this.getStockUUIDByStockName(
          this.$route.params.id
        )}.${this.getPortalProviderUUID}`,
        eventName: "roadMap"
      },
      ({ data }) => {
        try {
          var logData = data;
          if (data.status) {
            this.setLiveRoadMap(data.data.roadMap[0]);
          } else {
            throw new Error(config.error.general);
          }
        } catch (ex) {
          console.log(ex);
          log.error(
            {
              channel: `roadMap.${this.getStockUUIDByStockName(
                this.$route.params.id
              )}.${this.getPortalProviderUUID}`,
              event: "roadMap",
              res: logData,
              page: "pages/modern/desktop/_id.vue",
              provider: this.getPortalProviderUUID,
              user: secureStorage.getItem("USER_UUID")
            },
            ex.message
          );
        }
      }
    );
    // call this every page that used "dekstopModern" layout to hide loading
    this.setIsLoadingStockGame(false);
    // console.warn("mounted...");

    // set footerBet to zero because on this page cant use bet footer
    this.setFooterBetAmount(0);
    this.removeAllFooterBet();
  },
  watch: {
    // check size screen
    // change to mobile component
    "$screen.width"() {
      if (this.$screen.width <= 1204) {
        let linkto = `/modern/betting/btc1`;
        this.$router.push(linkto);
      }
    }
  },
  methods: {
    ...mapActions([
      "setRoadMap",
      "setTutorialStepNumber",
      "setIsShowTutorial",
      "setLiveRoadMap",
      "setFooterBetAmount",
      "removeAllFooterBet",
      "setIsLoadingStockGame"
    ]),
    setAfterFullScreenClosePage() {
      secureStorage.setItem("fullscreenclosed", "desktop");
      this.$router.push(`/modern/fullscreen/${this.$route.params.id}`);
    },
    stopListenSocket(channel) {
      window.Echo.leave(channel);
    },
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    async getStock() {
      try {
        var reqBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          version: config.version
        };
        var res = await this.$axios.$post(config.getStock.url, reqBody, {
          headers: config.header
        });
        if (res.status) {
          this.stock = res.data;
        } else {
          throw new Error(config.error.general);
        }
      } catch (ex) {
        console.log(ex);
        log.error(
          {
            req: reqBody,
            res,
            page: "pages/modern/desktop/_id.vue",
            apiUrl: config.getStock.url,
            provider: secureStorage.getItem("PORTAL_PROVIDERUUID"),
            user: secureStorage.getItem("USER_UUID")
          },
          ex.message
        );
      }
    },
    // Add TrendMap
    addTrendMap() {
      let trendCount = this.trendTypes.length;
      switch (trendCount) {
        case 1:
          this.trendTypes.push("lastDigit");
          break;
        case 2:
          this.trendTypes.push("bothDigit");
          break;
        case 3:
          this.trendTypes.push("twoDigit");
          break;
      }
    },
    // Remove trendMap
    removeTradMap(index) {
      console.log(index);
      var indexValue = this.trendTypes[index];
      console.log(indexValue);
      var newData = this.trendTypes.filter(function(data) {
        return data != indexValue;
      });
      this.trendTypes = newData;
      console.log(this.trendTypes);
    },
    loaded() {
      this.isLoad = true;
    },
    clearTutorialUI() {
      $("#lastDrawGuideline").css("z-index", "1");
      $("#betCloseInGuideline").css("z-index", "1");
      $("#lotteryDrawGuidelines").css("z-index", "1");
      $("#chartGuidelineNew").css("z-index", "1");
      $(".betButtonGuide").css("z-index", "1");
      $(".BetButtonGuideEven").css("z-index", "1");
      $("#selectstockGuideline").css("z-index", "1");
      $("#stocklistGuidelines").css("z-index", "1");
      $("#trendmapGuidelines").css("z-index", "1");
      $("#trendmapGuidelines").css("backgroundColor", "#f2f4ff");
    },
    openTutorial() {
      const _this = this;
      let timeStart = this.getTutorialStepNumber === 0 ? 0 : 3000;
      // setTimeout  to  resolve problems if user close tutorial and reopen
      setTimeout(() => {
        this.setIsShowTutorial(true);
        let step = 1;
        this.setTutorialStepNumber(step);
        let stepGo = setInterval(() => {
          step++;
          this.setTutorialStepNumber(step);
          if (step === 12 || !_this.getIsShowTutorial) {
            clearInterval(stepGo);
            _this.clearTutorialUI();
            this.setTutorialStepNumber(0);
          }
        }, 3000);
      }, timeStart);
    }
  },
  computed: {
    vueVersion() {
      console.log(Vue.version, "Version");
      return Vue.version;
    },
    ...mapGetters([
      "getTutorialStepNumber",
      "getIsShowTutorial",
      "getStockLoop",
      "getTimerByStockName",
      "getStockUUIDByStockName",
      "getRoadMap",
      "getPortalProviderUUID",
      "getLastDraw",
      "getStockLoop"
    ])
  }
};
</script>
<style scoped>
.multiGame {
  z-index: 999;
  position: fixed;
  right: 0px;
  bottom: 80px;
  color: #fff;
  width: 50px;
  height: 50px;
  font-size: 12px !important;
  background: linear-gradient(to right, #19b9ff 20%, #3a79ff 51%);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3) !important;
  padding: 0px 9px;
}
.fullscreen {
  position: fixed !important;
  bottom: 140px;
  right: 0px;
  width: 50px;
  height: 50px;
  color: #fff;
  z-index: 999;
  background: linear-gradient(to right, #773bca 20%, #9c2bce 51%);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3) !important;
}

.fullscreen .v-icon {
  font-size: 40px;
}

/* left side corner toggle functionality in desktop  */
.helpButton {
  background-color: #4464ff !important;
  color: #fff;
  padding: 3px;
}

.leftStocklist {
  background-color: #fff;
  border-radius: 20px;
  position: relative;
  top: 0;
  box-shadow: 0 0 2px grey;
}

.sidebar-close {
  /* z-index: 999; */
  padding: 3px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4464ff !important;
  border-radius: 180px;
  position: absolute;
  top: -15px;
  right: -8px;
  transition: none !important;
}

.sidebar-close .v-icon {
  color: #fff !important;
}

.sidebar-toggle {
  cursor: pointer;
  position: fixed;
  left: 5px;
  top: 75px;
  background-color: #4464ff !important;
  color: #fff !important;
  padding: 5px;
  border: 1px solid #dddddd;
  border-radius: 180px;
}
</style>
