<template>
  <div>
    <!-- Other Stock List popup -->
    <v-dialog v-model="dialogOtherstock" style="position:fixed !important">
      <v-card color="rgb(0, 62, 111, 0.8)">
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialogOtherstock = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-layout row wrap px-2 pt-2>
          <v-flex
            pa-2
            v-for="(data, index) in getAllStocks"
            :key="index"
            xs6
            sm6
            md6
            v-if="$route.params.id !== data.stockName"
          >
            <nuxt-link :to="'/modern/fullscreen/' + data.stockName">
              <v-card class="v-card-style">
                <div
                  class="close-bet-chart"
                  v-if="
                    getTimerByStockName(data.stockName) &&
                      getTimerByStockName(data.stockName).stockOpenOrClosed ===
                        'Closed!'
                  "
                >
                  <span class="text-close-bet">market close</span>
                </div>

                <v-card-text class="pa-0" min-height="500">
                  <chartApp :stockName="data.stockName"></chartApp>
                </v-card-text>
              </v-card>
              <div class="pt-2" style="color: white;">
                <h3 class="text-uppercase">
                  {{ $t("stockname." + data.stockName) }}
                </h3>
                <h4 style="line-height: 1">
                  <em>{{ data.loop }} minute game</em>
                </h4>
              </div>
            </nuxt-link>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>

    <v-container fluid class="containerNew">
      <v-layout pa-1 wrap>
        <v-flex xs4 sm12 md6 lg4>
          <v-layout column>
            <div id="livechartGuidelines">
              <v-flex>
                <v-layout xs12>
                  <v-flex
                    xs12
                    lg6
                    md6
                    class="text-xs-center1"
                    style="width:100%;align-self: center;"
                  >
                    <div class="stockname">
                      {{ $t(`stockname.${$route.params.id}`) }}
                    </div>
                    <span class="gameid">
                      {{ getGameUUIDByStockName($route.params.id) }}
                    </span>
                  </v-flex>

                  <v-flex xs12 md6 lg6 class="text-xs-right topHeader">
                    <v-btn color="buttonRed"
                      >1 {{ $t("msg.minute") }} {{ $t("msg.loop") }}</v-btn
                    >
                    <v-btn
                      color="buttonGreen"
                      @click="dialogOtherstock = true"
                      >{{ $t("msg.otherstock") }}</v-btn
                    >
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 sm12 md8 lg12 class="chartDesgin">
                <chartApp :stockName="$route.params.id"></chartApp>
              </v-flex>
            </div>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md5 lg5>
          <v-flex>
            <v-layout>
              <v-flex class="text-xs-center" xs4 px-2>
                <span class="text-black">{{ $t("msg.Lastdraw") }}:</span>
                <div id="lastDrawGuidelines">
                  <v-flex flex-style class="lastdraw">
                    <h4
                      class="text-black"
                      v-html="$options.filters.lastDraw(getLastDraw)"
                    ></h4>
                  </v-flex>
                </div>
              </v-flex>
              <v-flex class="text-xs-center" xs4 px-2>
                <span class="text-black">{{ $t("msg.BetClosein") }}:</span>
                <div id="betCloseInGuidelines">
                  <v-flex flex-style class="betclose">
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
              <v-flex class="text-xs-center" xs4 px-2>
                <span class="text-black">{{ $t("msg.lotterydraw") }}:</span>
                <div id="lotteryDrawGuidelines">
                  <v-flex flex-style class="lottery">
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
              </v-flex>
              <v-flex xs3 class="text-xs-right" style="align-self: flex-end;">
                <v-btn
                  fab
                  dark
                  small
                  class="helpButton"
                  @click="setNextstep(), getopen()"
                  title="Help"
                >
                  <v-icon dark size="25">fa-question</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex id="betButtonGuidelines" xs4 sm12 md12 lg12>
            <betButton
              :isFullscreen="true"
              :stockName="$route.params.id"
              :loop="1"
            ></betButton>
          </v-flex>
        </v-flex>
        <v-flex xs12 sm12 md3 lg3>
          <h3 class="balanceUser" v-if="getUserInfo.balance > 0" >
            Acc : {{ getUserInfo.balance | currency }}
          </h3>
          <h3 class="balanceUser" v-if="getUserInfo.balance == 0" >
            Acc : 0000.00
          </h3>
          <!-- Toggle between two components -->
          <div id="livebetGuidelines">
            <fullscreenchart v-if="!isHidden"></fullscreenchart>
            <fullscreencurrentbet v-else></fullscreencurrentbet>
          </div>
          <v-layout pa-3>
            <v-flex xs3 sm3 md3 lg3 pt-2>
              <span class="seticon">
                <i class="fa fa-user fa-2x iconcolor" />
                <span>
                  {{
                    dataliveBetAll.totalUsers ? dataliveBetAll.totalUsers : 15
                  }}
                </span>
              </span>
            </v-flex>
            <v-flex xs3 sm3 md3 lg3 pt-2>
              <span class="seticon">
                <i class="fa fa-gamepad fa-2x iconcolor" />
                <span>{{ dataliveBetAll.totalBetCount ? dataliveBetAll.totalBetCount : 35 }}</span>
              </span>
            </v-flex>
            <v-flex xs3 sm3 md3 lg3 pt-2>
              <span class="seticon">
                <i class="fa fa-money fa-2x iconcolor" />
                <span>
                  {{
                  dataliveBetAll.totalAmountPlaced
                  ? dataliveBetAll.totalAmountPlaced
                  : 5500
                  }}
                </span>
              </span>
            </v-flex>
            <v-flex xs3 sm3 md3 lg3 mb-1>
              <v-btn
                @click="isHidden = !isHidden"
                color="buttonGreensmall"
                class="curretbet-btn"
                >{{ $t("menu.current bet") }}</v-btn
              >
            </v-flex>
          </v-layout>
        </v-flex>

        <!-- live Chart -->

        <v-flex xs12 class="text-xs-center" mt-3>
          <footerBet lg12 md12></footerBet>
          <v-layout class="fullroadMap elevation-4" style="margin-top:-40px;">
            <v-flex xs12 sm12 md12 lg12 wrap pt-2 id="roadmapGuidelines">
              <v-layout>
                <v-flex xs12 sm12 md6 lg6>
                  <trendMapFullScreen
                    :index="0"
                    :dataArray="getRoadMap"
                  ></trendMapFullScreen>
                </v-flex>
                <v-flex xs12 sm12 md6 lg6>
                  <trendMapFullScreen
                    :index="1"
                    :dataArray="getRoadMap"
                  ></trendMapFullScreen>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12 sm12 md6 lg6>
                  <trendMapFullScreen
                    :index="2"
                    :dataArray="getRoadMap"
                  ></trendMapFullScreen>
                </v-flex>
                <v-flex xs12 sm12 md6 lg6>
                  <trendMapFullScreen
                    :index="3"
                    :dataArray="getRoadMap"
                  ></trendMapFullScreen>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              rigth
              fab
              @click="$router.push(closeFullscreen)"
              class="fullscreenclose"
              dark
              v-on="on"
              title="Full Screen"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </template>
          <span>Close Full Screen</span>
        </v-tooltip>
      </v-layout>
      <!-- Tutorial component boxes -->

      <div ref="guideline" class="overlay">
        <a class="closebtn" @click="closeGuideline()">&times;</a>
      </div>
      <div hidden ref="guidelineContent" class="overlay-content">
        <!-- 1)Live chart -->
        <div
          ref="livechartGuidelines"
          style="position:fixed;"
          v-show="isStep == 1"
        >
          <div class="d-flex">
            <p class="float-right guideline" @click="setNextstep">
              The live chart
              <v-icon dark size="15" color="#000">fa-arrow-right</v-icon>
            </p>
            <div class="arrow float-left line-my">&#8628;</div>
          </div>
        </div>
        <!-- 2) Last draw -->
        <div
          ref="lastDrawGuidelines"
          style="position:fixed;"
          v-show="isStep == 2"
        >
          <div class="d-flex">
            <p class="float-right guideline" @click="setNextstep">
              The last draw price of stock
              <v-icon dark size="15" color="#000">fa-arrow-right</v-icon>
            </p>
            <div class="arrow float-left line-my">&#8605;</div>
          </div>
        </div>
        <!-- 3) Bet close -->
        <div
          ref="betCloseInGuidelines"
          style="position:fixed;"
          v-show="isStep == 3"
        >
          <div class="d-flex">
            <p class="float-right guideline" @click="setNextstep">
              Bet close time
              <v-icon dark size="15" color="#000">fa-arrow-right</v-icon>
            </p>
            <div class="arrow float-left line-my">&#8628;</div>
          </div>
        </div>
        <!-- 4) Lottery draw -->
        <div
          ref="lotteryDrawGuidelines"
          style="position:fixed;"
          v-show="isStep == 4"
        >
          <div class="d-flex">
            <p class="float-right guideline" @click="setNextstep">
              Time left for lottery draw
              <v-icon dark size="15" color="#000">fa-arrow-right</v-icon>
            </p>
            <div class="arrow float-left line-my">&#8628;</div>
          </div>
        </div>
        <!-- 5) Betting button -->
        <div
          ref="betButtonGuidelines"
          style="position:fixed;"
          v-show="isStep == 5"
        >
          <div class="d-flex">
            <p class="float-right guideline" @click="setNextstep">
              Choose any option to place a bet
              <v-icon dark size="15" color="#000">fa-arrow-right</v-icon>
            </p>
            <div class="arrow float-left line-my">&#8628;</div>
          </div>
        </div>
        <!-- 6) Live bet data -->
        <div
          ref="livebetGuidelines"
          style="position:fixed;"
          v-show="isStep == 6"
        >
          <div class="d-flex">
            <p class="float-right guideline" @click="setNextstep">
              Live bet data
              <v-icon dark size="15" color="#000">fa-arrow-right</v-icon>
            </p>
            <div class="arrow float-left line-my">&#8628;</div>
          </div>
        </div>
        <!-- 7) Roadmap data-->
        <div
          ref="roadmapGuidelines"
          style="position:fixed;"
          v-show="isStep == 7"
        >
          <div class="d-flex">
            <p class="float-right guideline" @click="setNextstep">
              Road map of previous games
              <v-icon dark size="15" color="#000">fa-arrow-right</v-icon>
            </p>
            <div class="arrow float-left line-my">&#8628;</div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import betButton from "~/components/modern/betButton";
import chartApp from "~/components/modern/chart";
import footerBet from "~/components/modern/footerbet";
import trendMapFullScreen from "~/components/modern/trendMapFullScreen";
import fullscreenchart from "~/components/modern/fullscreenchart";
import fullscreencurrentbet from "~/components/modern/fullscreencurrentbet";
import config from "../../../config/config.global";

export default {
  async validate({ params, store }) {
    return store.getters.getCheckStock(params.id);
  },
  layout: "fullscreen",
  data() {
    return {
      routeParamID: this.$route.params.id,
      dialogOtherstock: false,
      //winner mqrquee
      winner: [],
      pauseTime: 2000,
      pauseOnHover: false,
      scrollSpeed: 30,
      showSpeed: 20,
      chartData: [],
      isShow: false,
      isHidden: false,
      chartData: [],
      chartDatas: [],
      rule: [],
      rulenew: [],
      ruleold: [],
      msg: "",
      dataliveBetAll: {},
      stockId: "",
      isStep: 0
    };
  },
  created() {
    this.getActiveGamesByCategory();
    this.setRoadMap(this.getStockUUIDByStockName(this.$route.params.id));
  },
  beforeDestroy() {
    window.Echo.leave(
      `roadMap.${this.getStockUUIDByStockName(this.routeParamID)}.${
        this.getPortalProviderUUID
      }`
    );
  },
  mounted() {
    // socket new api
    console.log('gamne stock id', this.gameStockId);
    this.listenForBroadcast(
      {
        channelName: `roadMap.${this.getStockUUIDByStockName(
          this.$route.params.id
        )}.${this.getPortalProviderUUID}`,
        eventName: "roadMap"
      },
      ({ data }) => {
        console.log('gamne stock id', this.gameStockId);
        this.setLiveRoadMap(data.data.roadMap[0]);
      }
    );
    this.listenForBroadcast({
      channelName: `LiveTotalBetData.${this.gameStockId}`,
      eventName: "LiveTotalBetData"
    }, ({ data }) => {
      this.dataliveBetAll = data.data;
      console.log('data', data);
    });
    this.setNextstepstart();
  },

  components: {
    betButton,
    chartApp,
    footerBet,
    trendMapFullScreen,
    fullscreenchart,
    fullscreencurrentbet
  },
  computed: {
    closeFullscreen() {
      let fullscreenClose = localStorage.getItem("fullscreenclosed");
      if (
        localStorage.getItem("fullscreenclosed") == null ||
        localStorage.getItem("fullscreenclosed") == "undefined"
      ) {
        fullscreenClose = "desktop";
      }
      return `/modern/${fullscreenClose}/${this.$route.params.id}`;
    },
    ...mapGetters([
      "getGameUUIDByStockName",
      "getAllStocks",
      "getTimerByStockName",
      "getStockUUIDByStockName",
      "getPortalProviderUUID",
      "getUserInfo",
      "getLastDraw",
      "getRoadMap",
      "getStockById",
      "lotterydraw",
      "getStockLoop",
      "getStockLastDraw",
      "getStockCrawlerData",
      "getStockChart",
      "getLiveTime",
      "getLivePrice",
      "getUserUUID"
    ]),
    ...mapState({
      gameStockId: state => state.game.gameStockId
    })
  },
  methods: {
    ...mapActions([
      'setRoadMap', 'setLiveRoadMap', 'setStockCategory'
    ]),
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    async getActiveGamesByCategory() {
      try {
        const { data } = await this.$axios.$post(
          config.getActiveGamesByCategory.url,
          {
            portalProviderUUID: this.getPortalProviderUUID,
            version: config.version
          },
          {
            headers: config.header
          }
        );
        this.setStockCategory(data);
        this.items = data;
      } catch (error) {
        console.log(error);
      }
    },
    formatToPrice(value) {
      return `$ ${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
    },
    getopen() {
      //open Next step.
      localStorage.valTutorial = 0;
      this.setNextstepstart();
    },
    setNextstepstart() {
      //Run Timer for next step.
      if (localStorage.valTutorial != "1") {
        let i = 0;
        let setIntervals = setInterval(() => {
          i++;
          if (i == 8) {
            clearInterval(setIntervals);
            this.closeGuideline();
            $(".guideline").css("style", "none");
            localStorage.valTutorial = 1;
            return;
          }
          if (localStorage.valTutorial != "1") {
            this.setNextstep();
          }
        }, 3000);
      }
    },
    setNextstep() {
      //Next one step and stop on step 7
      if (this.isStep < 8) this.isStep += 1;
      else this.isStep = 1;
      this.setTutorial(this.isStep);
    },
    setTutorial(isStep) {
      //Open tutorial
      this.$refs.guidelineContent.hidden = false;
      let w = window.innerWidth;

      if (isStep == 1) {
        //Live chart
        let liveG = $("#livechartGuidelines").offset();
        $("#livechartGuidelines").css("border-style", "solid");
        $("#livechartGuidelines").css("border-color", "coral");
        $(this.$refs.livechartGuidelines).css("right", w - liveG.left - 50);
        $(this.$refs.livechartGuidelines).css("top", liveG.top + 40);
        $("#roadmapGuidelines").css("border-style", "none");
      } else if (isStep == 2) {
        //Last draw
        let lastdrawG = $("#lastDrawGuidelines").offset();
        $("#lastDrawGuidelines").css("border-style", "solid");
        $("#lastDrawGuidelines").css("border-color", "coral");
        $(this.$refs.lastDrawGuidelines).css("right", w - lastdrawG.left - 10);
        $(this.$refs.lastDrawGuidelines).css("top", lastdrawG.top + 10);
        $("#livechartGuidelines").css("border-style", "none");
      } else if (isStep == 3) {
        //Bet close in
        let betcloseG = $("#betCloseInGuidelines").offset();
        $("#betCloseInGuidelines").css("border-style", "solid");
        $("#betCloseInGuidelines").css("border-color", "coral");
        $(this.$refs.betCloseInGuidelines).css(
          "right",
          w - betcloseG.left - 80
        );
        $(this.$refs.betCloseInGuidelines).css("top", betcloseG.top - 30);
        $("#lastDrawGuidelines").css("border-style", "none");
      } else if (isStep == 4) {
        // Lottery draw
        let lotteryG = $("#lotteryDrawGuidelines").offset();
        $("#lotteryDrawGuidelines").css("border-style", "solid");
        $("#lotteryDrawGuidelines").css("border-color", "coral");
        $(this.$refs.lotteryDrawGuidelines).css(
          "right",
          w - lotteryG.left - 140
        );
        $(this.$refs.lotteryDrawGuidelines).css("top", lotteryG.top - 30);
        $("#betCloseInGuidelines").css("border-style", "none");
      } else if (isStep == 5) {
        // Betting button
        let betbuttonG = $("#betButtonGuidelines").offset();
        $("#betButtonGuidelines").css("border-style", "solid");
        $("#betButtonGuidelines").css("border-color", "coral");
        $(this.$refs.betButtonGuidelines).css("left", betbuttonG.left - 220);
        $(this.$refs.betButtonGuidelines).css("top", betbuttonG.top + 20);
        $("#lotteryDrawGuidelines").css("border-style", "none");
      } else if (isStep == 6) {
        //Live betting chart
        let livebetG = $("#livebetGuidelines").offset();
        $("#livebetGuidelines").css("border-style", "solid");
        $("#livebetGuidelines").css("border-color", "coral");
        $(this.$refs.livebetGuidelines).css("left", livebetG.left - 90);
        $(this.$refs.livebetGuidelines).css("top", livebetG.top + 20);
        $("#betButtonGuidelines").css("border-style", "none");
      } else if (isStep == 7) {
        //Road map data
        let roadmapG = $("#roadmapGuidelines").offset();
        $("#roadmapGuidelines").css("border-style", "solid");
        $("#roadmapGuidelines").css("border-color", "coral");
        $(this.$refs.roadmapGuidelines).css("right", w - roadmapG.left - 250);
        $(this.$refs.roadmapGuidelines).css("top", roadmapG.top - 10);
        $("#livebetGuidelines").css("border-style", "none");
      }
      this.$refs.guideline.style.height = "100%";
      document.documentElement.style.overflow = "hidden";
      window.scrollTo(0, 0);
    },
    closeGuideline() {
      //Close tutorial
      this.isStep = 0;
      $(".fa-question-circle").show();
      this.$refs.guidelineContent.hidden = true;
      this.$refs.guideline.style.height = "0%";
      document.documentElement.style.overflow = "visible";
      $("#livechartGuidelines").css("border-style", "none");
      $("#lastDrawGuidelines").css("border-style", "none");
      $("#betCloseInGuidelines").css("border-style", "none");
      $("#lotteryDrawGuidelines").css("border-style", "none");
      $("#betButtonGuidelines").css("border-style", "none");
      $("#livebetGuidelines").css("border-style", "none");
      $("#roadmapGuidelines").css("border-style", "none");
      localStorage.valTutorial = 1;
    }
  }
};
</script>

<style scoped>
.balanceUser {
  float: right;
  margin: 10px 20px;
}
.chartDesgin {
  margin-top: 10px;
  padding: 5px 5px;
  background-color: #fff;
  border-radius: 10px;
}

.fullscreenclose {
  position: fixed !important;
  border-radius: 180px;
  bottom: 80px;
  right: 0px;
  width: 50px;
  height: 50px;
  color: #fff;
  background: linear-gradient(
    215deg,
    rgba(156, 44, 205, 1) 35%,
    rgba(121, 59, 204, 1) 100%
  );
}

.fullscreenclose .v-icon {
  font-weight: 800;
  font-size: 30px;
}

.lastdraw {
  font-size: 14px;
  border: 1.5px solid #4b65ff;
  border-radius: 10px;
  font-size: 22px;
  padding: 2px 6px;
  font-weight: 400;
}

.betclose {
  font-size: 14px;
  border: 1.5px solid #ef076a;
  border-radius: 10px;
  font-size: 22px;
  padding: 2px 6px;
  font-weight: 400;
}

.lottery {
  font-size: 14px;
  border: 1.5px solid #01e3bf;
  border-radius: 10px;
  font-size: 22px;
  padding: 2px 6px;
  font-weight: 400;
}

.setborder span {
  font-size: 14px;
  line-height: 10px;
}

.setborder {
  text-align: justify;
}

.seticon {
  border: 2px solid #b4b2b2;
  border-radius: 10px;
  padding: 8px 10px;
  /*height: 25px;
  min-width: 25px !important; */
}

.seticon i {
  color: #545352;
  font-size: 15px;
}

.seticon span {
  font-weight: 600;
  color: #545352;
  font-size: 15px;
}

.fullroadMap {
  border-top: 10px solid #092968;
  border-left: 2px solid #dddddd;
  border-right: 2px solid #dddddd;
  border-radius: 10px;
}

.helpButton {
  background-color: #4464ff !important;
  color: #fff;
  padding: 5px;
  font-size: 22px;
}
</style>
