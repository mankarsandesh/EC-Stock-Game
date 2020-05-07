<template>
  <div class="p-relative">
    <button class="closepopper" hidden>close popper</button>
    <!-- for show bet close -->
    <div class="bet-close" v-if="checkBetClose">
      <p>{{ $t("msg.betclosed") }}</p>
    </div>
    <!-- end for show bet close -->
    <v-layout row md10>
      <span class="w12 buttonbtn">
        <v-btn class="bg-btn-first btnHeight">
          <span class="btn-digit">{{ $t("gamemsg.firstdigits") }}</span>
        </v-btn>
      </span>
      <popper
        :disabled="checkFooterBetAmount"
        v-for="data in firstDigit"
        :key="data.ruleid"
        class="w12"
        trigger="clickToToggle"
        :options="{
          placement: 'bottom-end',
          modifiers: { offset: { offset: '25px' } }
        }"
      >
        <div class="popper">
          <!-- this component display the modal,the modal let users choose amount they want to bet -->
          <betModal
            :stockName="stockID"
            :ruleid="data.ruleid"
            :betId="'firstdigit-' + data.rule"
            :betWin="'firstdigitWin-' + data.rule"
            :payout="data.payout"
          ></betModal>
        </div>
        <v-btn
          class="align_button4"
          :id="stockID + 'firstdigit-' + data.rule"
          slot="reference"
          @click="betButtonClick(data.ruleid)"
        >
          <showChipAmount
            size="45px"
            :amount="
              getAmountMultiGameBet({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: data.ruleid
              })
            "
          ></showChipAmount>
          <span class="big-digit" :id="'firstdigitWin-' + data.rule">
            {{
            $t("gamemsg." + data.rule)
            }}
          </span>
          <!-- <span class="small-digit">{{$t('gamemsg.firstdigit')}}</span> -->
          <!-- show payout on button if is fullscreen -->
          <span class="small-digit" v-show="isFullscreen">
            {{
            $store.state.game.payout[parseInt(data.payout)].dynamicOdds
            }}
          </span>
        </v-btn>
      </popper>

      <span class="w10">
        <v-btn class="align_button4" :id="stockID+'firstdigit'" @click="btnNumber('first')">
          <showChipAmount
            size="45px"
            :amount="
              getAmountBetSpecificNumber({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: 'firstdigit'
              })
            "
          ></showChipAmount>
          <span class="big-digit">0 - 9</span>
          <!-- <span class="small-digit">{{$t('gamemsg.firstdigit')}}</span> -->
          <!-- show payout if in fullscreen mode -->
          <span class="small-digit" v-show="isFullscreen">{{ payout_09 }}</span>
        </v-btn>
      </span>
    </v-layout>

    <!-- Row betting button2 -->
    <v-layout row>
      <span class="w12 buttonbtn">
        <v-btn class="bg-btn-last btnHeight betButtonGuide">
          <span class="btn-digit">{{ $t("gamemsg.lastdigits") }}</span>
        </v-btn>
      </span>

      <popper
        :disabled="checkFooterBetAmount"
        v-for="(data, index) in lastDigit"
        :key="index"
        class="w12"
        trigger="clickToToggle"
        :options="{
          placement: 'bottom-end',
          modifiers: { offset: { offset: '25px' } }
        }"
      >
        <div class="popper">
          <betModal
            :stockName="stockID"
            :ruleid="data.ruleid"
            :betId="'lastdigit-' + data.rule"
            :betWin="'lastdigitWin-' + data.rule"
            :payout="data.payout"
          ></betModal>
        </div>
        <v-btn
          :class="
            index == 3
              ? 'align_button4 betButtonGuide BetButtonGuideEven'
              : 'align_button4 betButtonGuide'
          "
          :id="stockID + 'lastdigit-' + data.rule"
          @click="betButtonClick(data.ruleid)"
          slot="reference"
        >
          <showChipAmount
            size="45px"
            :amount="
              getAmountMultiGameBet({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: data.ruleid
              })
            "
          ></showChipAmount>

          <span class="big-digit" :id="'lastdigitWin-' + data.rule">
            {{
            $t("gamemsg." + data.rule)
            }}
          </span>
          <!-- <span class="small-digit">{{$t('gamemsg.lastdigit')}}</span> -->
          <!-- show payout if in fullscreen mode -->
          <span class="small-digit" v-show="isFullscreen">
            {{
            $store.state.game.payout[parseInt(data.payout)].dynamicOdds
            }}
          </span>
        </v-btn>
      </popper>

      <span class="w12">
        <v-btn class="align_button4 betButtonGuide" id="lastdigit" @click="btnNumber('last')">
          <showChipAmount
            size="45px"
            :amount="
              getAmountBetSpecificNumber({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: 'lastdigit'
              })
            "
          ></showChipAmount>
          <span class="big-digit">0 - 9</span>
          <!-- <span class="small-digit">{{$t('gamemsg.lastdigit')}}</span> -->
          <!-- show payout if in fullscreen mode -->
          <span class="small-digit" v-show="isFullscreen">{{ payout_09 }}</span>
        </v-btn>
      </span>
    </v-layout>
    <!-- Row betting button2 -->
    <!-- Row betting button3 -->
    <v-layout row>
      <span class="w12 buttonbtn">
        <v-btn class="bg-btn-both btnHeight">
          <span class="btn-digit">{{ $t("gamemsg.bothdigits") }}</span>
        </v-btn>
      </span>

      <popper
        :disabled="checkFooterBetAmount"
        v-for="data in bothDigit"
        :key="data.rule"
        class="w12"
        trigger="clickToToggle"
        :options="{
          placement: 'bottom-end',
          modifiers: { offset: { offset: '25px' } }
        }"
      >
        <div class="popper">
          <betModal
            :stockName="stockID"
            :ruleid="data.ruleid"
            :betId="'bothdigit-' + data.rule"
            :betWin="'bothdigitWin-' + data.rule"
            :payout="data.payout"
          ></betModal>
        </div>
        <v-btn
          class="align_button4"
          :id="stockID + 'bothdigit-' + data.rule"
          @click="betButtonClick(data.ruleid)"
          slot="reference"
        >
          <showChipAmount
            size="45px"
            :amount="
              getAmountMultiGameBet({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: data.ruleid
              })
            "
          ></showChipAmount>

          <span class="big-digit" :id="'bothdigitWin-' + data.rule">
            {{
            $t("gamemsg." + data.rule)
            }}
          </span>
          <!-- <span class="small-digit">{{$t('gamemsg.bothdigit')}}</span> -->
          <!-- show payout if in fullscreen mode -->
          <span class="small-digit" v-show="isFullscreen">
            {{
            $store.state.game.payout[parseInt(data.payout)].dynamicOdds
            }}
          </span>
        </v-btn>
      </popper>

      <span class="w12">
        <v-btn class="align_button4" id="both" @click="btnNumber('both')">
          <showChipAmount
            size="45px"
            :amount="
              getAmountBetSpecificNumber({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: 'bothdigit'
              })
            "
          ></showChipAmount>

          <span class="big-digit">0 - 18</span>
          <!-- <span class="small-digit">{{$t('gamemsg.bothdigit')}}</span> -->
          <!-- show payout if in fullscreen mode -->
          <span class="small-digit" v-show="isFullscreen">{{ payout_18 }}</span>
        </v-btn>
      </span>
    </v-layout>
    <!-- Row betting button3 -->
    <!-- Row betting button3 -->
    <v-layout row>
      <span class="w12 buttonbtn">
        <v-btn class="bg-btn-two btnHeight">
          <span class="btn-digit">{{ $t("gamemsg.twodigits") }}</span>
        </v-btn>
      </span>

      <popper
        :disabled="checkFooterBetAmount"
        v-for="data in twoDigit"
        :key="data.rule"
        class="w12"
        trigger="clickToToggle"
        :options="{
          placement: 'bottom-end',
          modifiers: { offset: { offset: '25px' } }
        }"
      >
        <div class="popper">
          <betModal
            :stockName="stockID"
            :ruleid="data.ruleid"
            :betId="'twodigit-' + data.rule"
            :betWin="'twodigitWin-' + data.rule"
            :payout="data.payout"
          ></betModal>
        </div>
        <v-btn
          class="align_button4"
          :id="stockID + 'twodigit-' + data.rule"
          @click="betButtonClick(data.ruleid)"
          slot="reference"
        >
          <showChipAmount
            size="45px"
            :amount="
              getAmountMultiGameBet({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: data.ruleid
              })
            "
          ></showChipAmount>

          <span class="big-digit" :id="'twodigitWin-' + data.rule">
            {{
            $t("gamemsg." + data.rule)
            }}
          </span>
          <!-- <span class="small-digit">{{$t('gamemsg.twodigit')}}</span> -->
          <!-- show payout if in fullscreen mode -->
          <span class="small-digit" v-show="isFullscreen">
            {{
            $store.state.game.payout[parseInt(data.payout)].dynamicOdds
            }}
          </span>
        </v-btn>
      </popper>

      <span class="w12">
        <v-btn class="align_button4" id="two" @click="btnNumber('two')">
          <showChipAmount
            size="45px"
            :amount="
              getAmountBetSpecificNumber({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: 'twodigit'
              })
            "
          ></showChipAmount>

          <span class="big-digit">00 - 99</span>
          <!-- <span class="small-digit">{{$t('gamemsg.twodigit')}}</span> -->
          <!-- show payout if in fullscreen mode -->
          <span class="small-digit" v-show="isFullscreen">{{ payout_99 }}</span>
        </v-btn>
      </span>
    </v-layout>

    <!-- specific number bet button -->
    <v-layout row class="setlayuot">
      <popper
        :disabled="checkFooterBetAmount"
        v-for="(n, index) in 10"
        :key="'firstdigit-' + index"
        trigger="clickToToggle"
        :options="{
          placement: 'bottom-end',
          modifiers: { offset: { offset: '25px' } }
        }"
      >
        <div class="popper">
          <betModal
            @update-bet="updateBet"
            :stockName="stockID"
            :ruleid="8 + index"
            :betId="'firstdigit-' + index"
            :betWin="'firstdigitWin-' + index"
            :payout="index + 30"
          ></betModal>
        </div>
        <v-btn
          :id="stockID +'firstdigit'+'-'+ index"
          slot="reference"
          @click="betButtonClick(8 + index, 'firstdigit')"
          v-show="number == 'first'"
          class="btn-small"
        >{{ index }}</v-btn>
      </popper>
      <popper
        :disabled="checkFooterBetAmount"
        v-for="(n, index) in 10"
        :key="'lastdigit-' + index"
        trigger="clickToToggle"
        :options="{
          placement: 'bottom-end',
          modifiers: { offset: { offset: '25px' } }
        }"
      >
        <div class="popper">
          <betModal
            :stockName="stockID"
            :ruleid="25 + index"
            :betId="'lastdigit-' + index"
            :betWin="'lastdigitWin-' + index"
            :payout="index + 40"
          ></betModal>
        </div>
        <v-btn
          :id="'lastdigit'+'-'+ index"
          slot="reference"
          @click="betButtonClick(25 + index, 'lastdigit')"
          v-show="number == 'last'"
          class="btn-small"
        >{{ index }}</v-btn>
      </popper>
      <popper
        :disabled="checkFooterBetAmount"
        v-for="(n, index) in 19"
        :key="'bothdigit-' + index"
        trigger="clickToToggle"
        :options="{
          placement: 'bottom-end',
          modifiers: { offset: { offset: '25px' } }
        }"
      >
        <div class="popper">
          <betModal
            :stockName="stockID"
            :ruleid="149 + index"
            :betId="'bothdigit-' + index"
            :betWin="'bothdigitWin-' + index"
            :payout="index + 50"
          ></betModal>
        </div>
        <v-btn
          slot="reference"
          @click="betButtonClick(149 + index, 'bothdigit')"
          v-show="number == 'both'"
          class="btn-small"
        >{{ index }}</v-btn>
      </popper>
      <popper
        :disabled="checkFooterBetAmount"
        v-for="(n, index) in 100"
        :key="index < 10 ? 'twodigit-0' + index : 'twodigit-' + index"
        trigger="clickToToggle"
        :options="{
          placement: 'bottom-end',
          modifiers: { offset: { offset: '25px' } }
        }"
      >
        <div class="popper">
          <betModal
            :stockName="stockID"
            :ruleid="42 + index"
            :betId="index < 10 ? 'twodigit-0' + index : 'twodigit-' + index"
            :betWin="'twodigit-0Win-' + index"
            :payout="index + 69"
          ></betModal>
        </div>
        <v-btn
          slot="reference"
          @click="betButtonClick(42 + index, 'twodigit')"
          v-show="number == 'two'"
          class="btn-small"
        >{{ index < 10 ? "0" + index : index }}</v-btn>
      </popper>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import gameRule from "~/data/gameRule";

import betModal from "~/components/modern/betModal";
import showChipAmount from "~/components/modern/showChipAmount";
import popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
import payout from "~/data/payout";
import Result from "~/helpers/Result";
export default {
  props: {
    isFullscreen: {
      type: Boolean,
      default: false
    },
    //  for multi game
    stockName: {
      type: String
    }
  },
  watch: {
    first(val) {
      console.log("This is a ", val);
    }
  },
  data() {
    return {
      isActive: false,
      number: null,
      // rules payout
      payout_high_mid_low: payout.high_mid_low,
      payout_big_small: 21,
      payout_09: payout._09,
      payout_18: payout._18,
      payout_99: payout._99,
      // games rules
      firstDigit: gameRule.firstDigit,
      lastDigit: gameRule.lastDigit,
      bothDigit: gameRule.bothDigit,
      twoDigit: gameRule.twoDigit
    };
  },
  components: {
    // popper is the third party package
    popper,
    // this component display the modal,the modal let users choose amount they want to bet
    betModal,
    showChipAmount
  },
  computed: {
    ...mapGetters([
      "getGameUUIDByStockName",
      "getTimerByStockName",
      "getStockLoop",
      "checkFooterBetAmount",
      "getFooterBetAmount",
      "getAmountMultiGameBet",
      "getAmountBetSpecificNumber",
      "first"
    ]),
    stockID() {
      if (this.stockName == null) {
        return this.$route.params.id;
      } else {
        return this.stockName;
      }
    },
    // check bet close using stockOpenOrClosed and timer
    checkBetClose() {
      if (
        this.getTimerByStockName(this.stockID) &&
        this.getTimerByStockName(this.stockID).stockStatus === "Closed"
      ) {
        return true;
      }
      // check 1 or 5 loop
      if (this.getStockLoop(this.stockID) === 5) {
        if (
          this.getTimerByStockName(this.stockID) &&
          this.getTimerByStockName(this.stockID).gameEndTimeCountDownInSec == 0
        ) {
          this.clearDataMultiGameBet(5);
        }
        return (
          this.getTimerByStockName(this.stockID) &&
          this.getTimerByStockName(this.stockID).gameEndTimeCountDownInSec <= 60
        );
      } else {
        if (
          this.getTimerByStockName(this.stockID) &&
          this.getTimerByStockName(this.stockID).gameEndTimeCountDownInSec == 0
        ) {
          this.clearDataMultiGameBet(1);
        }
        return (
          this.getTimerByStockName(this.stockID) &&
          this.getTimerByStockName(this.stockID).gameEndTimeCountDownInSec <= 20
        );
      }
    }
  },
  mounted() {},
  methods: {
    ...mapActions([
      "pushDataMultiGameBet",
      "clearDataMultiGameBet",
      "setTempMultiGameBetData"
    ]),
    betButtonClick(ruleID, specificNumber = "") {
      // $("#"+ruleID).addClass('bg-btn-first');
      if (this.checkFooterBetAmount) {
        let betData = {
          specificNumber: specificNumber,
          gameUUID: this.getGameUUIDByStockName(this.stockID),
          ruleID: ruleID,
          betAmount: this.getFooterBetAmount
        };
        this.setTempMultiGameBetData(betData);
        // this.pushDataMultiGameBet(betData);
        // console.warn(this.getMultiGameBet);
      }
    },
    // the btnNumber methods use to switch specific number first,last,both and two
    btnNumber(value) {
      value == this.number ? (this.number = null) : (this.number = value);
    },
    updateBet(items) {
      const split = items.betRule.split("-");
      $("#" + items.stock + items.betRule).addClass(split[0] + "-" + split[1]); // small button
      Result.getIdStock(items.stock + split[0]);
      $("#" + items.stock + split[0]).addClass(
        split[0] + " " + split[0] + "-" + split[1]
      ); // parent the button
    }
  }
};
</script>

<style scoped>
.popper {
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 5px 5px 5px #aaaaaa;
}
.bet-close {
  width: 100%;
  z-index: 10;
  height: 100%;
  position: absolute;
  background-color: rgb(255, 255, 255);
  opacity: 0.5;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;
}

.setlayuot {
  flex-flow: wrap;
  position: relative;
}
.btn-digit {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  white-space: pre-line;
}
</style>
