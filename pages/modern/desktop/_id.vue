<template>
  <v-container fluid mt-2 class="containerNew pa-2">
    <v-layout style="background-color: #f4f5fd;">
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
      <v-flex v-if="isHidden" @click="isHidden = false">
        <span class="sidebar-toggle">
          <v-icon color="#FFF">list</v-icon>
        </span>
      </v-flex>
      <!-- </v-flex> -->
      <v-flex :xs10="!isHidden" :xs12="isHidden">
        <v-layout xs12 pl-3>
          <v-flex xs6 md6 lg6 pt-2>
            <v-layout column>
              <v-flex xs12>
                <div id="selectstockGuideline">
                  <stockSelect />
                </div>
              </v-flex>
              <v-flex mt-1>
                <div id="chartGuideline" class="chartDesgin">
                  <v-flex>
                    <chartApp :stockName="routeParams" />
                  </v-flex>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs6 md6 lg6 class="mx-2">
            <v-layout mb-3>
              <v-flex xs4 class="text-xs-center text-uppercase" px-2>
                <span>{{ $t("msg.Lastdraw") }}</span>
                <div id="lastDrawGuideline">
                  <v-flex class="lastdraw">
                    <span
                      class="text-black"
                      v-html="$options.filters.lastDraw(getLastDraw)"
                    ></span>
                  </v-flex>
                </div>
              </v-flex>
              <!-- <v-spacer></v-spacer> -->
              <v-flex xs4 class="text-xs-center text-uppercase" px-2>
                <span>{{ $t("msg.BetClosein") }}</span>
                <div id="betCloseInGuideline">
                  <v-flex class="betclose">
                    <span
                      v-if="
                        getTimerByStockName($route.params.id) &&
                        getTimerByStockName($route.params.id)
                          .stockOpenOrClosed === 'Closed!'
                      "
                      class="text-black"
                    >
                      {{
                        getTimerByStockName($route.params.id) &&
                        "close" | betclosein(getStockLoop($route.params.id))
                      }}
                    </span>
                    <span v-else class="text-black">
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

              <v-flex xs4 class="text-xs-center text-uppercase" px-2>
                <span>{{ $t("msg.lotterydraw") }}</span>
                <div id="lotteryDrawGuidelines">
                  <v-flex class="lottery">
                    <span class="text-black">
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

              <v-flex xs2 class="text-xs-right" style="align-self: flex-end;">
                <v-btn
                  fab
                  dark
                  small
                  class="helpButton"
                  @click="openTutorial()"
                  title="Help"
                >
                  <v-icon dark size="25">fa-question</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <div id="betRuleButton">
              <betButton :stockName="$route.params.id" :loop="1"></betButton>
            </div>
          </v-flex>
        </v-layout>
        <v-flex xs12 v-if="getRoadMap.length > 0">
          <div
            class="trendmap-container"
            v-for="(trendType, index) in trendTypes"
            :key="index"
          >
            <hr v-if="index > 0" />
            <div id="trendmapGuidelines">
              <tableTrendMap
                :index="index"
                :dataArray="getRoadMap"
                :isShowMultigameButton="index"
              ></tableTrendMap>
            </div>
            <span
              class="addChart"
              @click="addTrendMap()"
              v-if="trendTypes.length == index + 1 && trendTypes.length < 4"
            >
              <v-icon>add</v-icon>
            </span>
          </div>
        </v-flex>
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
                title="Full Screen"
              >
                <v-icon>fullscreen</v-icon>
              </v-btn>
            </template>
            <span>Full Screen</span>
          </v-tooltip>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import stockList from "~/components/modern/stockList";
import stockResult from "~/components/modern/stockresult";
import onBetting from "~/components/modern/onBetting";
import betButton from "~/components/modern/betButton";
import chartApp from "~/components/modern/chart";
import tableTrendMap from "~/components/modern/tableTrendMap";
import onlyrules from "~/components/modern/stocklist/onlyrule";
import stockSelect from "~/components/stockSelect";
import leaderboardUserlist from "~/components/modern/leaderboard/leaderboardUserlist";
import config from "../../../config/config.global";
import lotteryDraw from "~/components/modern/lotteryDraw";

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
  },
  data() {
    return {
      routeParams: this.$route.params.id,
      stock: [],
      dialog: false,
      bgColor: "#778899",
      position: "top-right",
      isHidden: false,
      firstPanelFocus: false,
      fabActions: [
        {
          name: "cache",
          icon: "cached",
        },
      ],
      items: [
        {
          title: "Click Me",
        },
        {
          title: "Click Me",
        },
        {
          title: "Click Me",
        },
        {
          title: "Click Me 2",
        },
      ],
      trendTypes: ["firstDigit"],
      isloading: false,
      isStep: 0,
    };
  },
  created() {
    this.getStock();
    // Game Rule Popup check and open Ne User
    // if (localStorage.getItem("gameRule") != "shown") {
    //   this.dialog = true;
    //   localStorage.setItem("gameRule", "shown");
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
    this.asyncRoadMap(this.getStockUUIDByStockName(this.$route.params.id));
    // live road map from socket
    this.listenForBroadcast(
      {
        channelName: `roadMap.${this.getStockUUIDByStockName(
          this.$route.params.id
        )}.${this.getPortalProviderUUID}`,
        eventName: "roadMap",
      },
      ({ data }) => {
        this.setLiveRoadMap(data.data.roadMap[0]);
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
    },
    getLastDraw(val) {
      const lastDraw = val.substr(val.length - 2);
      const first = lastDraw.slice(0, 1);
      const last = lastDraw.slice(1, 2);

      console.log("This is the first  draw :" + first);
      console.log("This is the  last draw :" + last);
    },
  },
  methods: {
    ...mapActions(["asyncRoadMap"]),
    ...mapMutations([
      "setTutorialStepNumber",
      "setIsShowTutorial",
      "setLiveRoadMap",
      "setFooterBetAmount",
      "removeAllFooterBet",
      "setIsLoadingStockGame",
    ]),
    setAfterFullScreenClosePage() {
      localStorage.setItem("fullscreenclosed", "desktop");
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
        const data = await this.$axios.$post(
          config.getStock.url,
          {
            portalProviderUUID: this.getPortalProviderUUID,
            version: config.version,
          },
          { headers: config.header }
        );

        this.stock = data;
      } catch (error) {
        console.log(error);
      }
    },
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

    loaded() {
      this.isLoad = true;
    },
    openTutorial() {
      this.setTutorialStepNumber(1);
      this.setIsShowTutorial(true);
      let step = 1;
      this.setTutorialStepNumber(step);
      let stepGo = setInterval(() => {
        step++;
        this.setTutorialStepNumber(step);
        if (step === 11) {
          clearInterval(stepGo);
        }
      }, 3000);
    },
  },
  computed: {
    vueVersion() {
      console.log(Vue.version, "Version");
      return Vue.version;
    },
    ...mapGetters([
      "getIsShowTutorial",
      "getStockLoop",
      "getTimerByStockName",
      "getStockUUIDByStockName",
      "getRoadMap",
      "getPortalProviderUUID",
      "getLastDraw",
      "lotterydraw",
      "getStockLoop",
      "getStockLastDraw",
      "getStockCrawlerData",
    ]),
  },
};
</script>

<style scoped>
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
  padding: 5px;
  font-size: 22px;
}
.leftStocklist {
  background-color: #fff;
  border-radius: 20px;
  position: relative;
  top: 0;
  box-shadow: 0 0 2px grey;
  right: 5px;
}
.sidebar-close {
  z-index: 999;
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
