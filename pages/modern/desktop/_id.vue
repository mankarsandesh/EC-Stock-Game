<template>
  <v-container fluid mt-2 class="containerNew">
    <v-layout>
      <!-- Start of Left Side Stock List  -->
      <v-flex v-if="checkBettingResult"></v-flex>
      <!-- <span v-if="checkBettingResultNew"></span> -->
      <v-flex v-if="!isHidden" class="leftStocklist" mt-4 lg2>
        <span @click="isHidden = true" class="sidebar-close">
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-icon color="#0b2968" v-on="on">close</v-icon>
            </template>
            <span>{{ $t("msg.close") }}</span>
          </v-tooltip>
        </span>
        <v-layout column>
          <!-- Stock List -->
          <v-flex xs12 pt-3>
            <div id="stocklistGuidelines">
              <stockList />
            </div>
          </v-flex>
          <!-- Stock Result  -->
          <v-flex xs12 pt-2>
            <div id="betresultGuidelines">
              <stockResult  v-if="renderStockResult" />
            </div>
          </v-flex>
          <!-- on going Betting -->
          <v-flex xs12 pt-2>
            <div id="bettingGuidelines">
              <onBetting />
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex v-if="isHidden" @click="isHidden = false" mr-3>
        <span class="sidebar-toggle">
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-icon color="#FFF" v-on="on">list</v-icon>
            </template>
            <span>{{ $t("msg.expand") }}</span>
          </v-tooltip>
        </span>
      </v-flex>
      <!-- End of Left Side Stock List-->

      <!-- Start of Main Middle Layout -->
      <v-flex :xs10="!isHidden" :xs12="isHidden">
        <v-flex md12 lg12 pl-3>
          <v-layout row wrap md12>
            <!-- Start of Stock Select -->
            <v-flex md6 lg6 pt-2 id="selectstockGuidelines">
              <stockSelect />
            </v-flex>
            <!-- End of Stock Select -->

            <!-- Start of Stock Last Draw -->
            <v-flex xs6 md6 lg6 pt-1>
              <v-layout mb-3 justify-center wrap row>
                <v-flex xs4 md3 lg3 class="text-xs-center text-uppercase" px-2>
                  <span>{{ $t("msg.lastDraw") }}</span>
                  <div id="lastDrawGuideline">
                    <v-flex class="lastdraw">
                      <span
                        v-html="$options.filters.lastDraw(getLastDraw)"
                      ></span>
                    </v-flex>
                  </div>
                </v-flex>
                <v-flex xs4 md3 class="text-xs-center text-uppercase" px-2>
                  <span>{{ $t("msg.betCloseIn") }}</span>
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
                  <span>{{ $t("msg.lotteryDraw") }}</span>
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
                </v-flex>
                <!-- Start of Help Tutorial -->
                <v-flex
                  xs2
                  md3
                  class="text-xs-right"
                  style="align-self: flex-end;"
                >
                  <v-tooltip left>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        fab
                        class="helpButton"
                        dark
                        @click="openTutorial()"
                        v-on="on"
                      >
                        <v-icon dark size="24">fa-question</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $t("tutorial.help") }}</span>
                  </v-tooltip>
                </v-flex>
                <!-- End of Help Tutorial -->
              </v-layout>
            </v-flex>
            <!-- End of Stock Last Draw -->
          </v-layout>

          <!-- Start of Stock Chart and Bet button Component  -->
          <v-layout>
            <v-flex md5 lg5 class="marginTop-2">
              <div id="chartGuidelineNew" class="chartDesgin">
                <v-flex>
                  <!-- Chart Stock wise -->
                  <chartApp :stockName="routeParams" />
                </v-flex>
              </div>
            </v-flex>
            <v-flex md7 lg7 mx-2 class="marginTop-2">
              <div id="betRuleButton">
                <!-- -Bet Button -->
                <betButton :stockName="$route.params.id" :loop="1"></betButton>
              </div>
            </v-flex>
          </v-layout>
          <!-- End of Stock Chart and Bet button Component  -->
        </v-flex>

        <!-- Stock of Road Map -->
        <v-flex xs12 v-if="getRoadMap.length > 0">
          <div
            class="trendmap-container"
            v-for="(trendType, index) in trendTypes"
            :key="index"
          >
            <div id="trendmapGuidelines" >
              <tableTrendMap
                :index="index"
                :dataArray="getRoadMap"
                :isShowMultigameButton="index"
              >
                <!-- Start of add new trend map-->
                <span
                  class="addChart"
                  @click="addTrendMap()"
                  v-if="index === 0"
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on">fa-plus</v-icon>
                    </template>
                    <span>{{ $t("msg.addNewRoadMap") }}</span>
                  </v-tooltip>
                </span>
                <!-- End of add new trend map-->
                <!-- Start of close trend map-->
                <span v-else class="addChart" @click="removeTrendMap(index)">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on">fa-close</v-icon>
                    </template>
                    <span>{{ $t("msg.closeRoadMap") }}</span>
                  </v-tooltip>
                </span>
                <!-- End of close trend map-->
              </tableTrendMap>
            </div>
          </div>
        </v-flex>
        <!-- End of Road Map  -->
      </v-flex>

      <!-- Game Rule Popup open First Time -->
      <v-dialog v-model="GameRuleDialog" width="50%">
        <v-card class="ruleModel" style="border-radius: 10px;">
          <v-icon
            class="closePopup"
            color="#333 !important"
            @click="GameRuleDialog = false"
            >fa-times</v-icon
          >

          <v-card-text style="padding:40px;">
            <h2 style="text-align:center;">
              {{ $t("msg.ecGamingRulesDescription") }}
            </h2>
            <onlyrules />
          </v-card-text>
          <v-flex class="text-lg-right">
            <v-btn
              class="buttonGreensmall"
              to="/modern/desktop/gamerule"
              dark
              >{{ $t("msg.gameRule") }}</v-btn
            >
          </v-flex>
        </v-card>
      </v-dialog>

      <!-- Full Screen Float Button -->
      <v-flex class="layout-bottom">
        <div id="fullscreenGuidelines">
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                rigth
                fab
                class="fullscreen"
                dark
                @click="setAfterFullScreenClosePage()"
                v-on="on"
              >
                <v-icon size="26px" v-if="$t('msg.TName') != 'chinese'"
                  >fa-expand</v-icon
                >
                <span v-else> {{ $t("msg.FullScreen") }} </span>
              </v-btn>
            </template>
            <span>{{ $t("msg.enterFullScreen") }}</span>
          </v-tooltip>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import stockList from "~/components/modern/stockList";
import stockResult from "~/components/modern/stockresult";
import onBetting from "~/components/modern/onBetting";
import betButton from "~/components/modern/betButton";
import chartApp from "~/components/modern/chart"; // Chart
import tableTrendMap from "~/components/modern/tableTrendMap"; // Road Map
import stockSelect from "~/components/stockSelect"; // Select Stock
import config from "~/config/config.global"; // Config Settings
import { isMobile } from "mobile-device-detect";
import secureStorage from "../../../plugins/secure-storage";
import onlyrules from "~/components/modern/rule/onlyrule";
import {BetResult} from "../../../mixin/betResult";

export default {
  async validate({ params, store }) {
    return store.getters.getCheckStock(params.id);
  },
  mixins : [BetResult],
  layout: "desktopModern",
  components: {
    stockList,
    stockResult,
    onBetting,
    chartApp,
    betButton,
    tableTrendMap,
    stockSelect,
    isMobile: isMobile,
    onlyrules
  },
  data() {
    return {
      routeParams: this.$route.params.id,
      stock: [],
      GameRuleDialog: true,
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
      isStep: 0,
      defaultStcok: config.homePageStockName,
      renderStockResult : true,
    };
  },

  created() {
    this.clearBetValueFooterBet();
    // Check size is Desktop or Mobile. and redirect to Mobile or Desktop
    if (isMobile) {
      window.location = `/modern/betting/${this.$route.params.id}`;
    }
    this.getStock();
    // Game Rule Popup check and open Ne User
    if (secureStorage.getItem("gameRule") != "shown") {
      this.GameRuleDialog = true;
      secureStorage.setItem("gameRule", "shown");
    } else {
      this.GameRuleDialog = false;
    }
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
    // Live Road Map From Socket
    this.listenForBroadcast(
      {
        channelName: `roadMap.${this.getStockUUIDByStockName(
          this.$route.params.id
        )}.${this.getPortalProviderUUID}`,
        eventName: "roadMap"
      },
      ({ data }) => {
        try {
          if (data.status) {
            this.setLiveRoadMap(data.data.roadMap[0]);
          } else {
            throw new Error(this.$root.$t("error.general"));
          }
        } catch (ex) {
          console.log(ex);
        }
      }
    );
    // call this every page that used "dekstopModern" layout to hide loading
    this.setIsLoadingStockGame(false);

    // set footerBet to zero because on this page cant use bet footer
    this.setFooterBetAmount(0);
  },
  watch: {
    // check size screen
    // change to mobile component
    "$screen.width"() {
      if (this.$screen.width <= 1204) {
        let linkto = "/modern/betting/" + this.defaultStcok;
        this.$router.push(linkto);
      }
    }
  },
  beforeMount(){
     this.userActivityAction();
  },
  methods: {
    ...mapActions([
      "userActivityAction",
      "setNewGameId",
      "setRoadMap",
      "setIsShowTutorial",
      "setLiveRoadMap",
      "setFooterBetAmount",
      "setIsLoadingStockGame",
      "clearBetValueFooterBet"
    ]),
    // Force Render Stock Result
    forceRenderStock() {
        // Remove my-component from the DOM
        this.renderStockResult = false;

        this.$nextTick(() => {
          // Add the component back in
          this.renderStockResult = true;
        });
    },
    // Open Tutorial
    openTutorial() {
      this.setIsShowTutorial(true);
      setTimeout(() => {
        $("#open-Tutorial").click();
      }, 10);
    },
    setAfterFullScreenClosePage() {
      secureStorage.setItem("fullscreenclosed", "desktop");
      this.$router.push(`/modern/fullscreen/${this.$route.params.id}`);
      this.userActivity();
    },
    stopListenSocket(channel) {
      window.Echo.leave(channel);
    },
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    // User Activity Call every 5 MIn
    async userActivity() {
      try {
        var reqBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          userUUID: this.getUserUUID,
          version: config.version
        };

        const res = await this.$axios.$post(
          config.userActivityLog.url,
          reqBody,
          {
            headers: config.header
          }
        );
      } catch (ex) {
        console.log(ex);
      }
    },
    // Stock List
    async getStock() {
      try {
        var reqBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          userUUID: this.getUserUUID,
          version: config.version
        };
        var res = await this.$axios.$post(config.getStock.url, reqBody, {
          headers: config.header
        });
        if (res.status) {
          this.stock = res.data;
        } else {
          throw new Error(this.$root.$t("error.general"));
        }
      } catch (ex) {
        console.log(ex);
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
    removeTrendMap(index) {
      let indexValue = this.trendTypes[index];
      let newData = this.trendTypes.filter(data => {
        return data != indexValue;
      });
      this.trendTypes = newData;
    },
    loaded() {
      this.isLoad = true;
    },
    // Place Bet Last Step
    async resultFetch() {
      try {
        var reqBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          gameUUID: this.getPreviousGameID,
          userUUID: this.getUserUUID,
          version: config.version
        };
        var res = await this.$axios.$post(config.checkBetStatus.url, reqBody, {
          headers: config.header
        });
        if (res.code == 200 && res.data.length > 0) {
          let resultStatus = {
            win: 0,
            loss: 0
          };
          let resultData = [];
          // Sum Same Rule Name BetAmount
          res.data.forEach(function(a) {
            if (!this[a.ruleName]) {
              this[a.ruleName] = {
                ruleName: a.ruleName,
                betAmount: 0,
                betResult: a.betResult,
                rollingAmount: 0
              };
              resultData.push(this[a.ruleName]);
            }
            this[a.ruleName].betAmount += a.betAmount;
            this[a.ruleName].rollingAmount += a.rollingAmount;
          }, Object.create(null));

          // Sperate Win and Loss Amount Rule Wise
          resultData.forEach(element => {
            const result = element.betResult == "Win" ? "green" : "red";

            const winAmount =
              element.rollingAmount == 0
                ? "-$" + element.betAmount
                : "+$" + element.rollingAmount;

            if (element.betResult == "Win") {
              resultStatus.win += element.rollingAmount - element.betAmount;
            } else if (element.betResult == "Lose") {
              resultStatus.loss += element.betAmount;
            }

            const ruleData = isNaN(element.ruleName.split("_")[1])
              ? window.$nuxt.$root.$t(
                  "gamemsg." + element.ruleName.split("_")[0]
                ) +
                "-" +
                window.$nuxt.$root.$t(
                  "gamemsg." + element.ruleName.split("_")[1]
                )
              : window.$nuxt.$root.$t(
                  "gamemsg." + element.ruleName.split("_")[0]
                ) +
                "-" +
                element.ruleName.split("_")[1];

            this.winBetData += `<div class="betResult">
         ${window.$nuxt.$root.$t("gamemsg.you")}
             <b>${ruleData}</b>  <span style="color:${result}"> ${window.$nuxt.$root.$t(
              "stockList." + element.betResult
            )} </span>   : <span  style="color:${result}"> ${winAmount} </span>
         </div>`;
          });

          if (resultStatus.win >= resultStatus.loss) {
            this.resultData = `<span style="color:green"> ${window.$nuxt.$root.$t(
              "betHistory.yourWinningAmount"
            )} +$${resultStatus.win - resultStatus.loss} </span>`;
          } else {
            this.resultData = `<span style="color:red">${window.$nuxt.$root.$t(
              "betHistory.yourLosingAmount"
            )} -$${resultStatus.loss - resultStatus.win} </span>`;
          }

          this.winBetInfo += `<div class="betResult">  ${this.winBetData} <h1>${this.resultData}</h1> </div>`;

          this.$swal({
            title: window.$nuxt.$root.$t("msg.betResult"),
            html: this.winBetInfo,
            confirmButtonText: window.$nuxt.$root.$t("msg.ok"),
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          });
        }
      } catch (ex) {
        // this.setSnackBarMessage(ex.message);
      }
    }
  },
  computed: {
    ...mapGetters([
      "getPreviousGameID",
      "getGameUUIDByStockName",
      "getTutorialStepNumber",
      "getIsShowTutorial",
      "getStockLoop",
      "getTimerByStockName",
      "getStockUUIDByStockName",
      "getRoadMap",
      "getPortalProviderUUID",
      "getUserUUID",
      "getLastDraw",
      "getmultiGameBet",
      "getPreviousGameID"
    ]),
    checkBettingResult() {
      // Stock Time
      const stockTime = this.getTimerByStockName(this.$route.params.id);
      if(this.getPreviousGameID == null){
        this.setNewGameId(this.getGameUUIDByStockName(this.$route.params.id));
      }
      // New Game Open Old Game Stock Result Popup
      if (this.getStockLoop(this.$route.params.id) === 5) {
        var resultSecond = 296;
      } else {
        var resultSecond = 56;
      }
      if (stockTime && stockTime.gameEndTimeCountDownInSec == resultSecond) {
        this.winBetData = "";
        this.winBetInfo = "";
        this.forceRenderStock();
        this.resultFetch(); // Fetch Previous Game Result     
      } else if (
        stockTime &&
        stockTime.gameEndTimeCountDownInSec <= resultSecond - 2 &&
        stockTime.gameEndTimeCountDownInSec >= resultSecond - 6
      ) {
        // Update Previous Game ID
        this.setNewGameId(this.getGameUUIDByStockName(this.$route.params.id));
      }
    }
  }
};
</script>
<style scoped>
.closePopup {
  background-color: #fff;
  right: 0;
  border-radius: 50%;
  padding: 2px;
  width: 30px;
  height: 30px;
}
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
  bottom: 90px;
  right: 0px;
  width: 60px;
  height: 60px;
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
  width: 40px;
  height: 40px;
}

.leftStocklist {
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  top: 0;
  height: 100%;
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
.chartDesgin {
  height: 380px;
  padding: 2px;
  border-radius: 10px;
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
