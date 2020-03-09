<template>
  <div class="p-relative">
    <button class="closepopper" hidden>close popper</button>
    <!-- for show bet close -->
    <div
      class="bet-close"
      v-if="checkBetClose  || getLotteryDraw(stockName) ==='close' || getLotteryDraw(stockName) == null "
    >
      <p>{{$t('msg.betclosed')}}</p>
    </div>
    <!-- end for show bet close -->
    <v-layout row>
      <span class="w12 buttonbtn">
        <v-btn class="bg-btn-first">
          <span class="btn-digit">{{$t('gamemsg.firstdigits')}}</span>
        </v-btn>
      </span>

      <popper
        :disabled="checkFooterBet"
        v-for="data in firstDigit"
        :key="data.rule"
        md3
        class="w12"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <!-- this component display the modal,the modal let users choose amount they want to bet -->
          <betModal
            :stockName="stockName"
            :loop="loop"
            :ruleid="data.ruleid"
            :betId="'firstdigit-'+data.rule"
            :payout="data.payout"
          ></betModal>
        </div>
        <v-btn
          class="align_button4 "
          :id="'firstdigit-'+data.rule"
          style="margin-left: -5px;"
          slot="reference"
          @click="betButtonClick('firstdigit-'+data.rule)"
        >
          <showChipAmount
            text-center
            size="45px"
            :amount="getAmountMultiGameBet({stockId:getStockId(stockName) ,gameRule:'firstdigit-'+data.rule})"
          ></showChipAmount>
          <span class="big-digit">{{$t('gamemsg.'+data.rule)}}</span>
          <!-- <span class="small-digit">{{$t('gamemsg.firstdigit')}}</span> -->
          <!-- show payout on button if is fullscreen -->
          <span
            class="small-digit"
            v-show="isFullscreen"
          >{{$store.state.payout[parseInt(data.payout)].dynamicOdds}}</span>
        </v-btn>
      </popper>

      <span class="w12">
        <v-btn class="align_button4" id="first" @click="btnNumber('first')">
          <showChipAmount
            size="45px"
            :amount="getAmountBetSpecificNumber({stockId:getStockId(stockName) ,gameRule:'firstdigit'})"
          ></showChipAmount>
          <span class="big-digit">0 - 9</span>
          <!-- <span class="small-digit">{{$t('gamemsg.firstdigit')}}</span> -->
          <!-- show payout if in fullscreen mode -->
          <span class="small-digit" v-show="isFullscreen">{{payout_09}}</span>
        </v-btn>
      </span>
    </v-layout>

    <!-- Row betting button2 -->
    <v-layout row>
      <span class="w12 buttonbtn">
        <v-btn class="bg-btn-last">
          <span class="btn-digit">{{$t('gamemsg.lastdigits')}}</span>
        </v-btn>
      </span>

      <popper
        :disabled="checkFooterBet"
        v-for="data in lastDigit"
        :key="data.rule"
        class="w12"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal
            :stockName="stockName"
            :loop="loop"
            :betId="'lastdigit-'+data.rule"
            :payout="data.payout"
          ></betModal>
        </div>
        <v-btn
          class="align_button4"
          :id="'lastdigit-'+data.rule"
          style="margin-left: -5px;"
          @click="betButtonClick('lastdigit-'+data.rule)"
          slot="reference"
        >
          <showChipAmount
            size="45px"
            :amount="getAmountMultiGameBet({stockId:getStockId(stockName) ,gameRule:'lastdigit-'+data.rule})"
          ></showChipAmount>

          <span class="big-digit">{{$t('gamemsg.'+data.rule)}}</span>
          <!-- <span class="small-digit">{{$t('gamemsg.lastdigit')}}</span> -->
          <!-- show payout if in fullscreen mode -->
          <span
            class="small-digit"
            v-show="isFullscreen"
          >{{$store.state.payout[parseInt(data.payout)].dynamicOdds}}</span>
        </v-btn>
      </popper>

      <span class="w12">
        <v-btn class="align_button4" id="last" @click="btnNumber('last')">
          <showChipAmount
            size="45px"
            :amount="getAmountBetSpecificNumber({stockId:getStockId(stockName) ,gameRule:'lastdigit'})"
          ></showChipAmount>
          <span class="big-digit">0 - 9</span>
          <!-- <span class="small-digit">{{$t('gamemsg.lastdigit')}}</span> -->
          <!-- show payout if in fullscreen mode -->
          <span class="small-digit" v-show="isFullscreen">{{payout_09}}</span>
        </v-btn>
      </span>
    </v-layout>
    <!-- Row betting button2 -->
    <!-- Row betting button3 -->
    <v-layout row>
      <span class="w12 buttonbtn">
        <v-btn class="bg-btn-both">
          <span class="btn-digit">{{$t('gamemsg.bothdigits')}}</span>
        </v-btn>
      </span>

      <popper
        :disabled="checkFooterBet"
        v-for="data in bothDigit"
        :key="data.rule"
        class="w12"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal
            :stockName="stockName"
            :loop="loop"
            :betId="'bothdigit-'+data.rule"
            :payout="data.payout"
          ></betModal>
        </div>
        <v-btn
          class="align_button5"
          :id="'bothdigit-'+data.rule"
          @click="betButtonClick('bothdigit-'+data.rule)"
          slot="reference"
        >
          <showChipAmount
            size="45px"
            :amount="getAmountMultiGameBet({stockId:getStockId(stockName) ,gameRule:'bothdigit-'+data.rule})"
          ></showChipAmount>

          <span class="big-digit">{{$t('gamemsg.'+data.rule)}}</span>
          <!-- <span class="small-digit">{{$t('gamemsg.bothdigit')}}</span> -->
          <!-- show payout if in fullscreen mode -->
          <span
            class="small-digit"
            v-show="isFullscreen"
          >{{$store.state.payout[parseInt(data.payout)].dynamicOdds}}</span>
        </v-btn>
      </popper>

      <span class="w12">
        <v-btn class="align_button4" id="both" @click="btnNumber('both')">
          <showChipAmount
            size="45px"
            :amount="getAmountBetSpecificNumber({stockId:getStockId(stockName) ,gameRule:'bothdigit'})"
          ></showChipAmount>

          <span class="big-digit">0 - 18</span>
          <!-- <span class="small-digit">{{$t('gamemsg.bothdigit')}}</span> -->
          <!-- show payout if in fullscreen mode -->
          <span class="small-digit" v-show="isFullscreen">{{payout_18}}</span>
        </v-btn>
      </span>
    </v-layout>
    <!-- Row betting button3 -->
    <!-- Row betting button3 -->
    <v-layout row>
      <span class="w12 buttonbtn">
        <v-btn class="bg-btn-two">
          <span class="btn-digit">{{$t('gamemsg.twodigits')}}</span>
        </v-btn>
      </span>

      <popper
        :disabled="checkFooterBet"
        v-for="data in twoDigit"
        :key="data.rule"
        class="w12"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal
            :stockName="stockName"
            :loop="loop"
            :betId="'twodigit-'+data.rule"
            :payout="data.payout"
          ></betModal>
        </div>
        <v-btn
          class="align_button5"
          :id="'twodigit-'+data.rule"
          @click="betButtonClick('twodigit-'+data.rule)"
          slot="reference"
        >
          <showChipAmount
            size="45px"
            :amount="getAmountMultiGameBet({stockId:getStockId(stockName) ,gameRule:'twodigit-'+data.rule})"
          ></showChipAmount>

          <span class="big-digit">{{$t('gamemsg.'+data.rule)}}</span>
          <!-- <span class="small-digit">{{$t('gamemsg.twodigit')}}</span> -->
          <!-- show payout if in fullscreen mode -->
          <span
            class="small-digit"
            v-show="isFullscreen"
          >{{$store.state.payout[parseInt(data.payout)].dynamicOdds}}</span>
        </v-btn>
      </popper>

      <span class="w12">
        <v-btn class="align_button4" id="two" @click="btnNumber('two')">
          <showChipAmount
            size="45px"
            :amount="getAmountBetSpecificNumber({stockId:getStockId(stockName) ,gameRule:'twodigit'})"
          ></showChipAmount>

          <span class="big-digit">00 - 99</span>
          <!-- <span class="small-digit">{{$t('gamemsg.twodigit')}}</span> -->
          <!-- show payout if in fullscreen mode -->
          <span class="small-digit" v-show="isFullscreen">{{payout_99}}</span>
        </v-btn>
      </span>
    </v-layout>

    <v-layout row class="setlayuot">
      <popper
        :disabled="checkFooterBet"
        v-for="(n,index) in 10"
        :key="'firstdigit-'+index"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal
            :stockName="stockName"
            :loop="loop"
            :betId="'firstdigit-'+index"
            :payout="index+30"
          ></betModal>
        </div>
        <v-btn
          slot="reference"
          @click="betButtonClick('firstdigit-'+index)"
          v-show="number == 'first'"
          class="btn-small"
        >{{index}}</v-btn>
      </popper>
      <popper
        :disabled="checkFooterBet"
        v-for="(n,index) in 10"
        :key="'lastdigit-'+index"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal
            :stockName="stockName"
            :loop="loop"
            :betId="'lastdigit-'+index"
            :payout="index+40"
          ></betModal>
        </div>
        <v-btn
          slot="reference"
          @click="betButtonClick('lastdigit-'+index)"
          v-show="number == 'last' "
          class="btn-small"
        >{{index}}</v-btn>
      </popper>
      <popper
        :disabled="checkFooterBet"
        v-for="(n,index) in 19"
        :key="'bothdigit-'+index"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal
            :stockName="stockName"
            :loop="loop"
            :betId="'bothdigit-'+index"
            :payout="index+50"
          ></betModal>
        </div>
        <v-btn
          slot="reference"
          @click="betButtonClick('bothdigit-'+index)"
          v-show="number == 'both' "
          class="btn-small"
        >{{index}}</v-btn>
      </popper>
      <popper
        :disabled="checkFooterBet"
        v-for="(n,index) in 100"
        :key="index < 10 ? 'twodigit-0' + index :'twodigit-'+index"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal
            :stockName="stockName"
            :loop="loop"
            :betId="index < 10 ? 'twodigit-0' + index :'twodigit-'+index"
            :payout="index+69"
          ></betModal>
        </div>
        <v-btn
          slot="reference"
          @click="betButtonClick('twodigit-'+index)"
          v-show="number == 'two' "
          class="btn-small"
        >{{ index < 10 ? "0" + index :index}}</v-btn>
      </popper>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import betModal from "~/components/modern/betModal";
import showChipAmount from "~/components/modern/showChipAmount";
import popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
import payout from "~/data/payout";
export default {
  props: {
    isFullscreen: {
      type: Boolean,
      default: false
    },
    //  for multi game
    stockName: {
      type: String
    },
    loop: {
      type: Number
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
      firstDigit: [
        {
          ruleid: 1,
          rule: "big",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 0
        },
        {
          ruleid: 2,
          rule: "small",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 1
        },
        {
          ruleid: 3,
          rule: "odd",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 2
        },
        {
          ruleid: 4,
          rule: "even",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 3
        },
        {
          ruleid: 5,
          rule: "high",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 4
        },
        {
          ruleid: 6,
          rule: "mid",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 5
        },
        {
          ruleid: 7,
          rule: "low",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 6
        }
      ],
      lastDigit: [
        {
          rule: "big",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 7
        },
        {
          rule: "small",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 8
        },
        {
          rule: "odd",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 9
        },
        {
          rule: "even",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 10
        },
        {
          rule: "high",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 11
        },
        {
          rule: "mid",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 12
        },
        {
          rule: "low",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 13
        }
      ],
      bothDigit: [
        {
          rule: "big",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 14
        },
        {
          rule: "tie",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 15
        },
        {
          rule: "small",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 16
        },
        {
          rule: "odd",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 17
        },
        {
          rule: "even",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 18
        },
        {
          rule: "high",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 19
        },
        {
          rule: "mid",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 20
        },
        {
          rule: "low",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 21
        }
      ],
      twoDigit: [
        {
          rule: "big",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 22
        },
        {
          rule: "tie",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 23
        },
        {
          rule: "small",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 24
        },
        {
          rule: "odd",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 25
        },
        {
          rule: "even",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 26
        },
        {
          rule: "high",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 27
        },
        {
          rule: "mid",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 28
        },
        {
          rule: "low",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: 29
        }
      ]
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
      "getLotteryDraw",
      "getStockLoop",
      "getLotteryDraw",
      "getLoop",
      "checkFooterBet",
      "getFooterBetAmount",
      "getMultiGameBet",
      "getAmountMultiGameBet",
      "getAmountBetSpecificNumber",
      "getPayout",
      "getStockId"
    ]),
    // return true if bet close
    checkBetClose() {
      if (this.getStockLoop(this.stockName) == 1) {
        if (this.getLotteryDraw(this.stockName) == 40) {
          this.clearDataMultiGameBet();
        }
        return this.getLotteryDraw(this.stockName) > 40;
      } else {
        if (this.getLotteryDraw(this.stockName) == 240) {
          this.clearDataMultiGameBet();
        }
        return this.getLotteryDraw(this.stockName) > 240;
      }
    }
  },
  methods: {
    ...mapMutations(["pushDataMultiGameBet", "clearDataMultiGameBet"]),
    betButtonClick(betId) {
      // $("#"+betId).addClass('bg-btn-first');
      if (this.checkFooterBet) {
        let data = {
          // stockId: this.stockName,
          stockId: this.getStockId(this.stockName),
          loop: this.loop,
          gameRule: betId,
          amount: this.getFooterBetAmount
        };
        this.pushDataMultiGameBet(data);
        // console.warn(this.getMultiGameBet);
      }
    },
    // the btnNumber methods use to switch specific number first,last,both and two
    btnNumber(value) {
      value == this.number ? (this.number = null) : (this.number = value);
    }
  }
};
</script>

<style scoped>
.buttonbtn {
  width: 130px;
}
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

.bet-close p {
  position: absolute;
  font-size: 8rem;
  z-index: 50;
  text-transform: capitalize;
}

/* .btnp p{
  font-size: 16px;
  margin:0;
}  */
.setlayuot {
  flex-flow: wrap;
  position: relative;
}

.btn-digit {
  font-size: 14px;
  text-transform: uppercase;
  /* font-family: fantasy; */
  font-weight: bold;
  white-space: pre-line;
}
</style>
