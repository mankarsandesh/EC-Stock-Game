<template>
  <div>
    <!-- tutorial v-if="getIsShowTutorial" -->
    <div id="tutorial-container" v-if="getIsShowTutorial">
      <div id="background-tutorial"></div>
      <div id="guide-container">
        <div
          style="z-index: 10028;position: absolute;right:10px;top:20px;cursor:pointer"
        >
          <v-icon @click="setIsShowTutorial(false)" color="#fff">close</v-icon>
        </div>
        <!-- last draw v-if="getTutorialStepNumber === 1" -->
        <div class="guide-top" v-if="getTutorialStepNumber === 1">
          <span id="result-draw">{{ getLastDraw | lastDraw2 }}</span>
          <span class="guide-description">Result of the DRAW</span>
        </div>
        <!-- bet close in  -->
        <div class="guide-top" v-if="getTutorialStepNumber === 2">
          <span
            class="guide-description text-uppercase"
            style="font-size:100px"
          >
            calculation...
          </span>
        </div>
        <!-- lottery  -->
        <div class="guide-top" v-if="getTutorialStepNumber === 3">
          <span id="lottery-draw-guide-text">
            {{
              getTimerByStockName($route.params.id) &&
                getTimerByStockName($route.params.id).gameEndTimeCountDownInSec
                  | lotterydraw(getStockLoop($route.params.id))
            }}
          </span>
          <span class="guide-description">Lottery DRAW</span>
        </div>
        <!-- chart  -->
        <!-- has scroll -->
        <div
          class="guide-chart-has-scroll"
          v-if="getTutorialStepNumber === 4 && getIsWindowsHasScroll"
        >
          <span class="guide-title text-uppercase">
            analysis graph
          </span>
          <span class="guide-description">
            You can analysis stock graph,the result of last draw
          </span>
        </div>
        <!-- no scroll -->
        <div
          class="guide-chart-no-scroll"
          v-if="getTutorialStepNumber === 4 && !getIsWindowsHasScroll"
        >
          <span class="guide-title text-uppercase">
            analysis graph
          </span>
          <span class="guide-description">
            You can analysis stock graph,the result of last draw
          </span>
        </div>

        <!-- bet on digigt  -->
        <div
          class="guide-top "
          style="margin-right: 90px;"
          v-if="getTutorialStepNumber === 5"
        >
          <span class="guide-title text-uppercase">
            bet on digits
          </span>
          <span class="guide-description">
            Now you can select DIGIT
          </span>
        </div>
        <!-- select chipcamount  -->
        <div
          class="guide-top "
          style="margin-right: 90px;"
          v-if="getTutorialStepNumber === 6"
        >
          <span class="guide-title text-uppercase">
            bet confirm
          </span>
          <span class="guide-description">
            Your BET place confirm on Last Digit EVEN</span
          >
        </div>
        <!-- enter amount bet -->
        <!-- has scroll   v-if="getTutorialStepNumber === 7 && getIsWindowsHasScroll"-->
        <div
          class="guide-bottom-has-scroll"
          id="enter-bet-guide"
          v-if="getTutorialStepNumber === 7 && getIsWindowsHasScroll"
        >
          <span class="guide-title text-uppercase">
            bet on digits
          </span>
          <span class="guide-description">
            Select CHIP or enter AMOUNT to CONFIRM bet</span
          >
        </div>
        <!-- no scroll -->
        <div
          class="guide-bottom-no-scroll"
          id="enter-bet-guide"
          v-if="getTutorialStepNumber === 7 && !getIsWindowsHasScroll"
        >
          <span class="guide-title text-uppercase">
            bet on digits
          </span>
          <span class="guide-description">
            Select CHIP or enter AMOUNT to CONFIRM bet</span
          >
        </div>
        <!-- to scroll here -->
        <div id="enter-amount-to-bet" hidden>hidden</div>
        <!-- to scroll here -->

        <!-- select stock to play -->
        <div class="guide-top " v-if="getTutorialStepNumber === 8">
          <span class="guide-title text-uppercase">
            stocks & game
          </span>
          <span class="guide-description">
            You can choose your Stock,you want BET/PLAY</span
          >
        </div>
        <!-- stock list -->
        <div
          class="guide-top "
          v-if="getTutorialStepNumber === 9"
          style="margin-left: 100px;"
        >
          <span class="guide-title text-uppercase">
            stock analysis
          </span>
          <span class="guide-description">
            Analysis current active Stock DATA update
          </span>
        </div>
        <!-- stock result -->
        <div
          class="guide-top "
          style="margin-left: 100px;"
          v-if="getTutorialStepNumber === 10"
        >
          <span class="guide-title text-uppercase">
            stock result
          </span>
          <span class="guide-description"> Check update result of Stock</span>
        </div>
      </div>
    </div>
    <!-- tutorial -->

    <v-app style=" background-color: #f4f5fd;">
      <v-toolbar class="notification" xs12 v-if="showNotification">
        <v-flex xs8 class="text-xs-right" style="margin:0px;"></v-flex>
        <v-flex xs4 class="text-xs-right">
          <winnerMarquee
            class="winnerText"
            :scrollSpeed="scrollSpeed"
            :showSpeed="showSpeed"
            :pauseOnHover="pauseOnHover"
            :pauseTime="pauseTime"
            :marqueeList="winner"
            height="30px"
            width="100%"
            color="#f76a24"
            fontSize="13px"
          ></winnerMarquee>
        </v-flex>
        <v-flex xs1 class="text-xs-right closeNotification">
          <i class="fa fa-close fa-2x" @click="showNotification = false" />
        </v-flex>
      </v-toolbar>
      <!-- <div v-if="getStockCrawlerData('btc1').length == ''" class="container-loading">
      <div class="text-xs-center loading">
        <v-progress-circular
          style="top: calc(100% - 68%);"
          :size="100"
          :width="10"
          color="#ffffff"
          indeterminate
        ></v-progress-circular>
      </div>
    </div> -->
      <div
        class="text-xs-center container-loading loading"
        v-if="getIsLoadingStockGame"
      >
        <v-progress-circular
          style="top: calc(100% - 68%);"
          :size="100"
          :width="10"
          color="#ffffff"
          indeterminate
        ></v-progress-circular>
      </div>
      <v-toolbar class="toolbarMenu" style="background-color:#FFF;">
        <v-container fluid class="navbar">
          <v-toolbar-title>
            <v-img
              src="/logo.png"
              @click="$router.push('/modern/desktop/btc1')"
              class="logoStyle"
            ></v-img>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-xs-only text-s1 toolBar">
            <v-btn
              flat
              v-for="item in menu"
              :key="item.title"
              :to="item.to"
              class="menuItem"
            >
              <i :class="item.icon" />
              <span>&nbsp;{{ $t(`menu.${item.title}`) }}</span>
            </v-btn>
            <div class="layout-btn">
              <v-btn
                class="btn-langage"
                text
                flat
                @click="$refs.language.showDialog()"
              >
                <countryFlag :country="countryflag" size="normal" />
                <span>&nbsp;{{ $t("msg.chooselanguage") }}</span>
                <i class="fa fa-caret-down" style="margin: 0 -6px 0px 8px;" />
              </v-btn>
            </div>
            <userMenu class="layout-logout" />
            <span
              flat
              @click="showNotification = true"
              id="notification"
              class="menuItemNotification"
            >
              <i class="fa fa-bell-o fa-2x" />
              <span class="badge">{{ messagesCount }}</span>
            </span>
          </v-toolbar-items>
        </v-container>
      </v-toolbar>

      <languageDialog ref="language" />
      <v-content>
        <nuxt />
      </v-content>

      <!-- Chat Windows-->
      <invitation
        :gameUUID="getGameUUIDByStockName($route.params.id)"
        :key="$route.name"
      />
      <!-- <chatWindow /> -->
    </v-app>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AnimatedNumber from "animated-number-vue";
import menu from "~/data/menudesktop";
import countryFlag from "vue-country-flag";
import languageDialog from "~/components/LanguageDialog";
import winnerMarquee from "~/components/modern/winnerMarquee";
import welcomeUser from "~/components/welcomeUser";
import openSocket from "socket.io-client";
import i18n from "vue-i18n";
import lottie from "lottie-web";
import invitation from "~/components/invitation";
import userMenu from "../components/userMenu";
import config from "../config/config.global";

export default {
  components: {
    invitation,
    countryFlag,
    languageDialog,
    winnerMarquee,
    welcomeUser,
    userMenu,
    AnimatedNumber
  },
  data() {
    return {
      isShowTutorial: true,
      messagesCount: 2,
      activeClass: null,
      showNotification: false,
      direction: "top",
      fab: true,
      fling: true,
      hover: false,
      tabs: true,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: "slide-y-reverse-transition",
      //winner mqrquee
      winner: [],
      pauseTime: 2000,
      pauseOnHover: false,
      scrollSpeed: 30,
      showSpeed: 20,
      clipped: false,
      drawer: false,
      fixed: false,
      menu: menu,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "EC gaming",
      isFullscreen: null,
      timeout: 3000
    };
  },
  updated() {
    let path = this.$nuxt.$route.name.split("-");
    let pageName = path[2];
    if (pageName === "id") {
      this.setGameChannelShow(true);
    } else {
      this.setGameChannelShow(false);
    }
  },
  created() {
    // check is full screen or not
    let path = this.$nuxt.$route.name.split("-");
    let isFullscreen = path[1];
    if (isFullscreen === "fullscreen") {
      this.isFullscreen = true;
    } else {
      this.isFullscreen = false;
    }
    // console.log("crearted");
  },
  mounted() {
    this.fetchNotification();
    lottie.loadAnimation({
      container: this.$refs.svgContainer, // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://assets10.lottiefiles.com/packages/lf20_logbxj.json" // the path to the animation json
    });
  },
  methods: {
    ...mapActions([
      "setGameChannelShow",
      "setIsShowTutorial",
      "setIsWindowsHasScroll"
    ]),
    async fetchNotification() {
      const betData = {
        portalProviderUUID: this.getPortalProviderUUID, // get the portal provider uuid from computed that we call from vuex
        userUUID: this.getUserUUID, // get the userUUID with the this object
        version: config.version, // version of API
        betResult: [0, 1], // -1= pending, pending that mean is betting
        limit: "5", // limit the data we the data come will come only the 20 that we limit in this case
        offset: "0" // offset or skip the data
      };
      const { data } = await this.$axios.post(
        config.getAllBets.url, // after finish crawl the every API will the the baseURL from AXIOS
        betData,
        {
          headers: {
            Authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh" // basic AUTH before send, becase the backend they will check
          }
        }
      );
      this.messagesCount = data.data.length;
      for (let i = 0; i < data.data.length - 1; i++) {
        let betID = data.data[i].betID;
        let betResult = data.data[i].betResult;
        let name = data.data[i].name;
        let ruleName = data.data[i].ruleName;
        let betAmount = data.data[i].betAmount;
        let betTime = data.data[i].createdTime;
        let stockName = data.data[i].stockName;
        let win = `<span class="text-slide text-white"><span class="text-warning">
                        <i class="fa fa-bell"></i>
                        </span>Player ${betResult}  ${betAmount} chips on,
                         ${stockName} stock ${ruleName}  ${betTime}</span>`;
        this.winner.push(win);
      }
    }
  },
  watch: {
    getTutorialStepNumber(newValue) {
      switch (newValue) {
        case 1:
          $("#lastDrawGuideline").css("z-index", "10001");
          break;
        case 2:
          $("#lastDrawGuideline").css("z-index", "1");
          $("#betCloseInGuideline").css("z-index", "10001");
          break;
        case 3:
          $("#betCloseInGuideline").css("z-index", "1");
          $("#lotteryDrawGuidelines").css("z-index", "10001");
          break;
        case 4:
          $("#lotteryDrawGuidelines").css("z-index", "1");
          $("#chartGuidelineNew").css("z-index", "10001");
          if ($(document).height() > $(window).height()) {
            this.setIsWindowsHasScroll(true);
          } else {
            this.setIsWindowsHasScroll(false);
          }
          break;
        case 5:
          $("#chartGuidelineNew").css("z-index", "1");
          $(".betButtonGuide").css("z-index", "10001");
          break;
        case 6:
          $(".betButtonGuide").css("z-index", "1");
          $(".BetButtonGuideEven").css("z-index", "10001");
          break;
        case 7:
          $(".BetButtonGuideEven").click();
          $("html, body").animate(
            { scrollTop: $("#enter-amount-to-bet").scrollTop() },
            1000
          );
          break;
        case 8:
          $(".BetButtonGuideEven").css("z-index", "1");
          $("#background-tutorial").click();
          $("#selectstockGuideline").css("z-index", "10001");
          break;
        case 9:
          $("#selectstockGuideline").css("z-index", "1");
          $("#stocklistGuidelines").css("z-index", "10001");
          break;
        case 10:
          $("#stocklistGuidelines").css("z-index", "1");
          $("#betresultGuidelines").css("z-index", "10001");
          break;
        default:
          $("#betresultGuidelines").css("z-index", "1");
          this.setIsShowTutorial(false);
      }
    }
  },
  computed: {
    ...mapGetters([
      "getIsWindowsHasScroll",
      "getTimerByStockName",
      "getStockLoop",
      "getTutorialStepNumber",
      "getIsShowTutorial",
      "getLastDraw",
      "getGameUUIDByStockName",
      "getPortalProviderUUID", // Get Portalprovider
      "getUserUUID", // Get UserUUID
      "getGameChannel",
      "getLocale",
      "getIsLoadingStockGame"
    ]),
    countryflag() {
      return this.getLocale;
    }
  }
};
</script>

<style scoped>
.winnerText {
  margin-top: -30px;
  font-weight: 800;
  text-transform: uppercase;
}
.badge {
  position: absolute;
  margin-top: -5px;
  margin-left: -15px;
  background-color: red;
  color: #fff;
  border-radius: 180px;
  padding: 1px;
  height: 18px;
  width: 18px;
  font-size: 10px;
  font-weight: 800;
  border: 1px solid #333;
}
.closeNotification {
  margin-right: 10px;
  margin-top: -15px;
  color: #fff;
  cursor: pointer;
}
.menuItemNotification {
  height: 62px !important;
  width: 40px !important;
  text-align: center;
  padding-top: 16px;
  cursor: pointer;
}
.activeNotification {
  color: #ffffff;
  background-color: #2bb13a;
  height: 62px !important;
  width: 50px !important;
  text-align: center;
  padding-top: 16px;
  cursor: pointer;
}

.v-toolbar__content {
  padding: 0 !important;
  justify-content: center !important;
}
.settop {
  top: 30%;
}
.popper {
  background-color: #333;
  border-radius: 10px;
}

.container-loading {
  position: absolute;
  z-index: 5000;
  width: 100%;
  height: 100%;
}

.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.7;
}

/* This is for documentation purposes and will not be needed in your application */
.v-speed-dial {
  position: absolute;
}

.v-btn--floating {
  position: relative;
}

.v-progress-circular {
  margin: 1rem;
}

.layout-btn {
  padding: 0 5px;
  display: flex;
}

.v-btn {
  /* padding: 0 5px !important; */
  border-bottom: none;
  border-top: none;
}

.btn-langage {
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flow-root;
}

.icon-dollar {
  color: white;
  background: green;
  padding: 6px;
  border-radius: 10em;
  width: 27px;
}

nav .v-toolbar__content .v-toolbar__items a.v-btn--active {
  color: #ffffff;
  background-image: linear-gradient(to right, #0bb177 30%, #2bb13a 51%);
}

.layout-logout {
  display: flex;
  border: 1px solid #ccc;
  border-bottom: none;
  border-top: none;
  border-right: none;
}
</style>
