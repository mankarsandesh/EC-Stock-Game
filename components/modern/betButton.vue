<template>
  <div class="p-relative">
    <button class="closepopper" hidden>close popper</button>
    <!-- for show bet close -->
    <div class="bet-close" v-if="checkBetClose">
      <p>{{ $t("msg.betClosed") }}</p>
    </div>
    <!-- end for show bet close -->
    <v-layout row md10>
      <span class="w12 buttonbtn">
        <v-btn class="bg-btn-first btnHeight">
          <span class="btn-digit">{{ $t("gamemsg.firstdigits") }}</span>
        </v-btn>
      </span>
      <!-- first digit bet button -->
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
          class="align_button4 f-hover"
          :id="stockID + 'firstdigit-' + data.rule"
          slot="reference"
          @click="
            storemarkColor(
              data.ruleid,
              stockID + 'firstdigit-' + data.rule,
              'firstdigit',
              null,
              getItemPage,
              stockID
            )
          "
        >
          <showChipAmount
            size="35px"
            :amount="
              getAmountMultiGameBet({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: data.ruleid
              })
            "
          ></showChipAmount>

          <div :id="'firstdigitWin-' + data.rule"></div>

          <span class="big-digit"> {{ $t("gamemsg." + data.rule) }}</span>
          <!-- show payout on bet button in the page fullscreen -->
          <span
            class="small-digit"
            v-show="isFullscreen"
            v-if="
              getAmountMultiGameBet({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: data.ruleid
              }) == 0
            "
          >
            {{
              $store.state.game.payout[
                parseInt(data.payout)
              ].dynamicOdds.toFixed(2)
            }}
          </span>
        </v-btn>
      </popper>

      <span class="w10">
        <v-btn
          class="align_button4 f-hover"
          :id="stockID + 'firstdigit'"
          @click="btnNumber('first')"
        >
          <showChipAmount
            size="35px"
            :amount="
              getAmountBetSpecificNumber({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: 'firstdigit'
              })
            "
          ></showChipAmount>

          <div class="big-digit" :id="stockID + 'firstdigitNumber'"></div>
          <span class="big-digit">0 - 9</span>
          <!-- show payout if in fullscreen mode -->
          <span
            class="small-digit"
            v-show="isFullscreen"
            v-if="
              getAmountBetSpecificNumber({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: 'firstdigit'
              }) == 0
            "
          >
            9.82</span
          >
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
      <!-- last digit bet button -->
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
          class="l-hover"
          :class="
            index == 3
              ? 'align_button4 betButtonGuide BetButtonGuideEven'
              : 'align_button4 betButtonGuide'
          "
          :id="stockID + 'lastdigit-' + data.rule"
          @click="
            storemarkColor(
              data.ruleid,
              stockID + 'lastdigit-' + data.rule,
              'lastdigit',
              null,
              getItemPage,
              stockID
            )
          "
          slot="reference"
        >
          <showChipAmount
            size="35px"
            :amount="
              getAmountMultiGameBet({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: data.ruleid
              })
            "
          ></showChipAmount>
          <div :id="'lastdigitWin-' + data.rule"></div>

          <span class="big-digit">{{ $t("gamemsg." + data.rule) }}</span>
          <!-- <span class="small-digit">{{$t('gamemsg.lastdigit')}}</span> -->
          <!-- show payout if in fullscreen mode -->
          <span
            class="small-digit"
            v-show="isFullscreen"
            v-if="
              getAmountMultiGameBet({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: data.ruleid
              }) == 0
            "
          >
            {{
              $store.state.game.payout[
                parseInt(data.payout)
              ].dynamicOdds.toFixed(2)
            }}
          </span>
        </v-btn>
      </popper>

      <span class="w10">
        <v-btn
          class="align_button4 betButtonGuide l-hover"
          :id="stockID + 'lastdigit'"
          @click="btnNumber('last')"
        >
          <showChipAmount
            size="35px"
            :amount="
              getAmountBetSpecificNumber({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: 'lastdigit'
              })
            "
          ></showChipAmount>
          <div class="big-digit" :id="stockID + 'lastdigitNumber'"></div>
          <span class="big-digit">0 - 9</span>
          <!-- <span class="small-digit">{{$t('gamemsg.lastdigit')}}</span> -->
          <!-- show payout if in fullscreen mode -->
          <span
            class="small-digit"
            v-show="isFullscreen"
            v-if="
              getAmountBetSpecificNumber({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: 'lastdigit'
              }) == 0
            "
          >
            9.85</span
          >
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
      <!-- both digit -->
      <popper
        :disabled="checkFooterBetAmount"
        v-for="(data, index) in bothDigit"
        :key="index"
        class="w12"
        :class="index === 0 ? 'ml-13' : null"
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
          class="align_button4 b-hover"
          :id="stockID + 'bothdigit-' + data.rule"
          @click="
            storemarkColor(
              data.ruleid,
              stockID + 'bothdigit-' + data.rule,
              'bothdigit',
              null,
              getItemPage,
              stockID
            )
          "
          slot="reference"
        >
          <showChipAmount
            size="35px"
            :amount="
              getAmountMultiGameBet({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: data.ruleid
              })
            "
          ></showChipAmount>
          <div :id="'bothdigitWin-' + data.rule"></div>
          <span class="big-digit">{{ $t("gamemsg." + data.rule) }}</span>
          <!-- <span class="small-digit">{{$t('gamemsg.bothdigit')}}</span> -->
          <!-- show payout if in fullscreen mode -->
          <span
            class="small-digit"
            v-show="isFullscreen"
            v-if="
              getAmountMultiGameBet({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: data.ruleid
              }) == 0
            "
          >
            {{
              $store.state.game.payout[
                parseInt(data.payout)
              ].dynamicOdds.toFixed(2)
            }}
          </span>
        </v-btn>
      </popper>
      <span class="w12">
        <v-btn
          class="align_button4 b-hover"
          :id="stockID + 'bothdigit'"
          @click="btnNumber('both')"
        >
          <showChipAmount
            size="35px"
            :amount="
              getAmountBetSpecificNumber({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: 'bothdigit'
              })
            "
          ></showChipAmount>
          <div class="big-digit" :id="stockID + 'bothdigitNumber'"></div>

          <span class="big-digit">0 - 18</span>
          <!-- <span class="small-digit">{{$t('gamemsg.bothdigit')}}</span> -->
          <!-- show payout if in fullscreen mode -->
          <span
            class="small-digit"
            v-show="isFullscreen"
            v-if="
              getAmountBetSpecificNumber({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: 'bothdigit'
              }) == 0
            "
            >18.64</span
          >
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
      <!-- two digit -->
      <popper
        :disabled="checkFooterBetAmount"
        v-for="(data, index) in twoDigit"
        :key="index"
        class="w12"
        :class="index === 0 ? 'ml-13' : null"
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
          class="align_button4 t-hover"
          :id="stockID + 'twodigit-' + data.rule"
          @click="
            storemarkColor(
              data.ruleid,
              stockID + 'twodigit-' + data.rule,
              'twodigit',
              null,
              getItemPage,
              stockID
            )
          "
          slot="reference"
        >
          <showChipAmount
            size="35px"
            :amount="
              getAmountMultiGameBet({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: data.ruleid
              })
            "
          ></showChipAmount>
          <div :id="'twodigitWin-' + data.rule"></div>
          <span class="big-digit">{{ $t("gamemsg." + data.rule) }}</span>
          <!-- <span class="small-digit">{{$t('gamemsg.twodigit')}}</span> -->
          <!-- show payout if in fullscreen mode -->
          <span
            class="small-digit"
            v-show="isFullscreen"
            v-if="
              getAmountMultiGameBet({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: data.ruleid
              }) == 0
            "
          >
            {{
              $store.state.game.payout[
                parseInt(data.payout)
              ].dynamicOdds.toFixed(2)
            }}
          </span>
        </v-btn>
      </popper>

      <span class="w12">
        <v-btn
          class="align_button4 t-hover"
          :id="stockID + 'twodigit'"
          @click="btnNumber('two')"
        >
          <showChipAmount
            size="35px"
            :amount="
              getAmountBetSpecificNumber({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: 'twodigit'
              })
            "
          ></showChipAmount>
          <div :id="stockID + 'twodigitNumber'"></div>
          <span class="big-digit">0 - 99</span>
          <!-- <span class="small-digit">{{$t('gamemsg.twodigit')}}</span> -->
          <!-- show payout if in fullscreen mode -->
          <span
            class="small-digit"
            v-show="isFullscreen"
            v-if="
              getAmountBetSpecificNumber({
                gameUUID: getGameUUIDByStockName(stockID),
                ruleID: 'twodigit'
              }) == 0
            "
            >98.02</span
          >
        </v-btn>
      </span>
    </v-layout>

    <!-- specific number bet button -->
    <v-layout row class="setlayuot">
      <!-- first digit specificNumber -->
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
            :specific="true"
          ></betModal>
        </div>
        <v-btn
          :id="stockID + 'firstdigit' + '-' + index"
          slot="reference"
          @click="
            storemarkColor(
              8 + index,
              stockID + 'firstdigit' + '-' + index,
              'firstdigit',
              'firstdigit' + '-' + index,
              getItemPage,
              stockID
            )
          "
          v-show="number == 'first'"
          class="btn-small f-hover"
          >{{ index }}</v-btn
        >
      </popper>
      <!-- last digit specificNumber -->
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
            @update-bet="updateBet"
            :stockName="stockID"
            :ruleid="25 + index"
            :betId="'lastdigit-' + index"
            :betWin="'lastdigitWin-' + index"
            :payout="index + 40"
            :specific="true"
          ></betModal>
        </div>
        <v-btn
          :id="stockID + 'lastdigit' + '-' + index"
          slot="reference"
          @click="
            storemarkColor(
              25 + index,
              stockID + 'lastdigit' + '-' + index,
              'lastdigit',
              'lastdigit' + '-' + index,
              getItemPage,
              stockID
            )
          "
          v-show="number == 'last'"
          class="btn-small l-hover"
          >{{ index }}</v-btn
        >
      </popper>
      <!-- both digit specificNumber -->
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
            @update-bet="updateBet"
            :stockName="stockID"
            :ruleid="149 + index"
            :betId="'bothdigit-' + index"
            :betWin="'bothdigitWin-' + index"
            :payout="index + 50"
            :specific="true"
          ></betModal>
        </div>
        <v-btn
          :id="stockID + 'bothdigit' + '-' + index"
          slot="reference"
          @click="
            storemarkColor(
              149 + index,
              stockID + 'bothdigit' + '-' + index,
              'bothdigit',
              'bothdigit' + '-' + index,
              getItemPage,
              stockID
            )
          "
          v-show="number == 'both'"
          class="btn-small b-hover"
          >{{ index }}
        </v-btn>
      </popper>
      <!-- two digit specificNumber -->
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
            @update-bet="updateBet"
            :stockName="stockID"
            :ruleid="42 + index"
            :betId="index < 10 ? 'twodigit-0' + index : 'twodigit-' + index"
            :betWin="'twodigitWin-' + index"
            :payout="index + 69"
            :specific="true"
          ></betModal>
        </div>
        <v-btn
          :id="
            index < 10
              ? stockID + 'twodigit-0' + index
              : stockID + 'twodigit' + '-' + index
          "
          slot="reference"
          @click="
            storemarkColor(
              42 + index,
              index < 10
                ? stockID + 'twodigit-0' + index
                : stockID + 'twodigit' + '-' + index,
              'twodigit',
              'twodigit' + '-' + index,
              getItemPage,
              stockID
            )
          "
          v-show="number == 'two'"
          class="btn-small t-hover"
          >{{ index < 10 ? "0" + index : index }}
        </v-btn>
      </popper>
    </v-layout>
  </div>
</template>

<script>
import gameRule from "~/data/gameRule";

import { mapGetters, mapActions, mapMutations } from "vuex";
import betModal from "~/components/modern/betModal";
import showChipAmount from "~/components/modern/showChipAmount";
import popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";

import { itemBetting } from "~/mixin/itemBetting";

export default {
  mixins: [itemBetting],
  props: {
    isFullscreen: {
      type: Boolean,
      default: true
    },
    //  for multi game
    stockName: {
      type: String
    }
  },

  data() {
    return {
      isActive: false,
      number: null,
      // games rules
      firstDigit: gameRule.firstDigit,
      lastDigit: gameRule.lastDigit,
      bothDigit: gameRule.bothDigit,
      twoDigit: gameRule.twoDigit
    };
  },

  watch: {
    getCollegeBtnNumber(val) {
      this.btnNumber(val);
    },
    selectBetting(val) {
      // console.log("betting are not confirm ", val.length);
    }
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
      "getCollegeBtnNumber",
      "selectBetting"
    ]),
    stockID() {
      if (this.stockName == null) {
        return this.$route.params.id;
      } else {
        return this.stockName;
      }
    },

    getItemPage() {
      return this.$route.path.split("/")[2];
    }
  },

  methods: {
    ...mapActions([
      "pushDataMultiGameBet",
      "clearDataMultiGameBet",
      "setTempMultiGameBetData",
      "setCollegeButtonNumberParent"
    ])
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
