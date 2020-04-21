<template>
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
        <span class="guide-description text-uppercase" style="font-size:100px">
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
          You can choose your Stock and Time,you want BET/PLAY</span
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
      <!-- road map  -->
      <div class="guide-bottom " v-if="getTutorialStepNumber === 11">
        <span class="guide-title text-uppercase">
          road map
        </span>
        <span class="guide-description">
          You can analysis stock graph,the result of last draw
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["setIsShowTutorial", "setIsWindowsHasScroll"])
  },
  computed: {
    ...mapGetters([
      "getIsWindowsHasScroll",
      "getTimerByStockName",
      "getStockLoop",
      "getTutorialStepNumber",
      "getIsShowTutorial",
      "getLastDraw"
    ])
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
        case 11:
          $("#betresultGuidelines").css("z-index", "1");
          $("#trendmapGuidelines").css("z-index", "10001");
          $("#trendmapGuidelines").css("backgroundColor", "#fff");
          break;
        default:
          $("#trendmapGuidelines").css("z-index", "1");
          $("#trendmapGuidelines").css("backgroundColor", "#f2f4ff");
          this.setIsShowTutorial(false);
      }
    }
  }
};
</script>
<style scoped></style>
