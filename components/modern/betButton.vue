<template>
  <div class="p-relative">
    <button class="closepopper" hidden>close popper</button>
    <!-- for show bet close -->
    <!-- <div
      class="bet-close"
      v-if="checkBetClose  || getLotteryDraw($route.params.id) ==='close' || getLotteryDraw($route.params.id) == null "
    >
      <p>bet close</p>
    </div>-->
    <!-- end for show bet close -->
    <v-layout row>
      <popper
        :disabled="checkFooterBet"
        v-for="data in firstDigit"
        :key="data.rule"
        class="w20"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <!-- this component display the modal,the modal let users choose amount they want to bet -->
          <betModal
            :stockName="$route.params.id"
            :loop="getLoop($route.params.id)"
            :betId="'firstdigit-'+data.rule"
            :payout="data.payout"
          ></betModal>
        </div>
        <v-btn
          class="align_button4"
          slot="reference"
          @click="betButtonClick('firstdigit-'+data.rule)"
        >
          <showChipAmount size="50px" :amount="getAmountMultiGameBet({stockName:stockName ,betId:'firstdigit-'+data.rule})"></showChipAmount>
          <span class="big-digit">{{data.rule}}</span>
          <br />
          <span class="small-digit">First Digit</span>
          <!-- show payout if in fullscreen mode -->
          <br />
          <span class="small-digit" v-show="isFullscreen">{{payout_big_small}}</span>
        </v-btn>
      </popper>

      <div class="d-block w20">
        <popper
          :disabled="checkFooterBet"
          trigger="click"
          :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
        >
          <div class="popper">
            <!-- this component display the modal,the modal let users choose amount they want to bet -->
            <betModal
              :stockName="$route.params.id"
              :loop="getLoop($route.params.id)"
              betId="firstdigit-high"
              :payout="payout_high_mid_low"
            ></betModal>
          </div>
          <v-btn
            class="betting-small"
            slot="reference"
            
            @click="betButtonClick('firstdigit-high')"
          >
          
          HIGH {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
        <popper
          :disabled="checkFooterBet"
          trigger="click"
          :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
        >
          <div class="popper">
            <!-- this component display the modal,the modal let users choose amount they want to bet -->
            <betModal
              :stockName="$route.params.id"
              :loop="getLoop($route.params.id)"
              betId="firstdigit-mid"
              :payout="payout_high_mid_low"
            ></betModal>
          </div>
          <v-btn
            class="betting-small"
            slot="reference"
            @click="betButtonClick('firstdigit-mid')"
          >MID {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
        <popper
          :disabled="checkFooterBet"
          trigger="click"
          :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
        >
          <div class="popper">
            <betModal
              :stockName="$route.params.id"
              :loop="getLoop($route.params.id)"
              betId="firstdigit-low"
              :payout="payout_high_mid_low"
            ></betModal>
          </div>
          <v-btn
            class="betting-small"
            slot="reference"
            @click="betButtonClick('firstdigit-low')"
          >LOW {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
      </div>
    </v-layout>
    <!-- Row betting button2 -->
    <v-layout row>
      <popper
        :disabled="checkFooterBet"
        v-for="data in lastDigit"
        :key="data.rule"
        class="w20"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal
            :stockName="$route.params.id"
            :loop="getLoop($route.params.id)"
            :betId="'lastdigit-'+data.rule"
            :payout="data.payout"
          ></betModal>
        </div>
        <v-btn
          class="align_button4"
          @click="betButtonClick('lastdigit-'+data.rule)"
          slot="reference"
        >
          <showChipAmount size="50px" :amount="getAmountMultiGameBet({stockName:stockName ,betId:'lastdigit-'+data.rule})"></showChipAmount>

          <span class="big-digit">{{data.rule}}</span>
          <br />
          <span class="small-digit">Last Digit</span>
          <!-- show payout if in fullscreen mode -->
          <br />
          <span class="small-digit" v-show="isFullscreen">{{payout_big_small}}</span>
        </v-btn>
      </popper>
      <div class="d-block w20">
        <popper
          :disabled="checkFooterBet"
          trigger="click"
          :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
        >
          <div class="popper">
            <betModal
              :stockName="$route.params.id"
              :loop="getLoop($route.params.id)"
              betId="lastdigit-high"
              :payout="payout_high_mid_low"
            ></betModal>
          </div>
          <v-btn
            class="betting-small"
            slot="reference"
            @click="betButtonClick('lastdigit-high')"
          >HIGH {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
        <popper
          :disabled="checkFooterBet"
          trigger="click"
          :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
        >
          <div class="popper">
            <betModal
              :stockName="$route.params.id"
              :loop="getLoop($route.params.id)"
              betId="lastdigit-mid"
              :payout="payout_high_mid_low"
            ></betModal>
          </div>
          <v-btn
            class="betting-small"
            slot="reference"
            @click="betButtonClick('lastdigit-mid')"
          >MID {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
        <popper
          :disabled="checkFooterBet"
          trigger="click"
          :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
        >
          <div class="popper">
            <betModal
              :stockName="$route.params.id"
              :loop="getLoop($route.params.id)"
              betId="lastdigit-low"
              :payout="payout_high_mid_low"
            ></betModal>
          </div>
          <v-btn
            class="betting-small"
            slot="reference"
            @click="betButtonClick('lastdigit-low')"
          >LOW {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
      </div>
    </v-layout>
    <!-- Row betting button2 -->
    <!-- Row betting button3 -->
    <v-layout row>
      <popper
        :disabled="checkFooterBet"
        v-for="data in bothDigit"
        :key="data.rule"
        class="w16"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal
            :stockName="$route.params.id"
            :loop="getLoop($route.params.id)"
            :betId="'bothdigit-'+data.rule"
            :payout="data.payout"
          ></betModal>
        </div>
        <v-btn
          class="align_button5"
          @click="betButtonClick('bothdigit-'+data.rule)"
          slot="reference"
        >
          <showChipAmount size="50px" :amount="getAmountMultiGameBet({stockName:stockName ,betId:'bothdigit-'+data.rule})"></showChipAmount>

          <span class="big-digit">{{data.rule}}</span>
          <br />
          <span class="small-digit">Both Digit</span>
          <!-- show payout if in fullscreen mode -->
          <br />
          <span class="small-digit" v-show="isFullscreen">{{payout_big_small}}</span>
        </v-btn>
      </popper>

      <div class="d-block w16">
        <popper
          :disabled="checkFooterBet"
          trigger="click"
          :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
        >
          <div class="popper">
            <betModal
              :stockName="$route.params.id"
              :loop="getLoop($route.params.id)"
              betId="bothdigit-high"
              :payout="payout_high_mid_low"
            ></betModal>
          </div>
          <v-btn
            class="betting-small"
            slot="reference"
            @click="betButtonClick('bothdigit-high')"
          >HIGH {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
        <popper
          :disabled="checkFooterBet"
          trigger="click"
          :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
        >
          <div class="popper">
            <betModal
              :stockName="$route.params.id"
              :loop="getLoop($route.params.id)"
              betId="bothdigit-mid"
              :payout="payout_high_mid_low"
            ></betModal>
          </div>
          <v-btn
            class="betting-small"
            slot="reference"
            @click="betButtonClick('bothdigit-mid')"
          >MID {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
        <popper
          :disabled="checkFooterBet"
          trigger="click"
          :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
        >
          <div class="popper">
            <betModal
              :stockName="$route.params.id"
              :loop="getLoop($route.params.id)"
              betId="bothdigit-low"
              :payout="payout_high_mid_low"
            ></betModal>
          </div>
          <v-btn
            class="betting-small"
            slot="reference"
            @click="betButtonClick('bothdigit-low')"
          >LOW {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
      </div>
    </v-layout>
    <!-- Row betting button3 -->
    <!-- Row betting button3 -->
    <v-layout row>
      <popper
        :disabled="checkFooterBet"
        v-for="data in twoDigit"
        :key="data.rule"
        class="w16"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal
            :stockName="$route.params.id"
            :loop="getLoop($route.params.id)"
            :betId="'twodigit-'+data.rule"
            :payout="data.payout"
          ></betModal>
        </div>
        <v-btn
          class="align_button5"
          @click="betButtonClick('twodigit-'+data.rule)"
          slot="reference"
        >
          <showChipAmount size="50px" :amount="getAmountMultiGameBet({stockName:stockName ,betId:'twodigit-'+data.rule})"></showChipAmount>

          <span class="big-digit">{{data.rule}}</span>
          <br />
          <span class="small-digit">Two Digit</span>
          <!-- show payout if in fullscreen mode -->
          <br />
          <span class="small-digit" v-show="isFullscreen">{{payout_big_small}}</span>
        </v-btn>
      </popper>
      <div class="d-block w16">
        <popper
          :disabled="checkFooterBet"
          trigger="click"
          :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
        >
          <div class="popper">
            <betModal
              :stockName="$route.params.id"
              :loop="getLoop($route.params.id)"
              betId="twodigit-high"
              :payout="payout_high_mid_low"
            ></betModal>
          </div>
          <v-btn
            class="betting-small"
            slot="reference"
            @click="betButtonClick('twodigit-high')"
          >HIGH {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
        <popper
          :disabled="checkFooterBet"
          trigger="click"
          :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
        >
          <div class="popper">
            <betModal
              :stockName="$route.params.id"
              :loop="getLoop($route.params.id)"
              betId="twodigit-mid"
              :payout="payout_high_mid_low"
            ></betModal>
          </div>
          <v-btn
            class="betting-small"
            slot="reference"
            @click="betButtonClick('twodigit-mid')"
          >MID {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
        <popper
          :disabled="checkFooterBet"
          trigger="click"
          :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
        >
          <div class="popper">
            <betModal
              :stockName="$route.params.id"
              :loop="getLoop($route.params.id)"
              betId="twodigit-low"
              :payout="payout_high_mid_low"
            ></betModal>
          </div>
          <v-btn
            class="betting-small"
            slot="reference"
            @click="betButtonClick('twodigit-low')"
          >LOW {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
      </div>
    </v-layout>
    <!-- Row betting button5 -->
    <v-layout row>
      <span class="w20">
        <v-btn class="align_button4" @click="btnNumber('first')">
          <showChipAmount size="50px" :amount="getAmountBetSpecificNumber({stockName:stockName ,betId:'firstdigit'})"></showChipAmount>

          <span class="big-digit">0 - 9</span>
          <br />
          <span class="small-digit">First Digit</span>
          <!-- show payout if in fullscreen mode -->
          <br />
          <span class="small-digit" v-show="isFullscreen">{{payout_09}}</span>
        </v-btn>
      </span>
      <span class="w20">
        <v-btn class="align_button4" @click="btnNumber('last')">
          <showChipAmount size="50px" :amount="getAmountBetSpecificNumber({stockName:stockName ,betId:'lastdigit'})"></showChipAmount>

          <span class="big-digit">0 - 9</span>
          <br />
          <span class="small-digit">Last Digit</span>
          <!-- show payout if in fullscreen mode -->
          <br />
          <span class="small-digit" v-show="isFullscreen">{{payout_09}}</span>
        </v-btn>
      </span>
      <span class="w20">
        <v-btn class="align_button4" @click="btnNumber('both')">
          <showChipAmount size="50px" :amount="getAmountBetSpecificNumber({stockName:stockName ,betId:'bothdigit'})"></showChipAmount>

          <span class="big-digit">0 - 18</span>
          <br />
          <span class="small-digit">Both Digit</span>
          <!-- show payout if in fullscreen mode -->
          <br />
          <span class="small-digit" v-show="isFullscreen">{{payout_18}}</span>
        </v-btn>
      </span>
      <span class="w20">
        <v-btn class="align_button4" @click="btnNumber('two')">
          <showChipAmount size="50px" :amount="getAmountBetSpecificNumber({stockName:stockName ,betId:'twodigit'})"></showChipAmount>

          <span class="big-digit">00 - 99</span>
          <br />
          <span class="small-digit">Two Digit</span>
          <!-- show payout if in fullscreen mode -->
          <br />
          <span class="small-digit" v-show="isFullscreen">{{payout_99}}</span>
        </v-btn>
      </span>
    </v-layout>
    <!-- Row betting button5 -->
    <v-layout row class="container-btn-small">
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
            :stockName="$route.params.id"
            :loop="getLoop($route.params.id)"
            :betId="'firstdigit-'+index"
            :payout="payout_09"
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
            :stockName="$route.params.id"
            :loop="getLoop($route.params.id)"
            :betId="'lastdigit-'+index"
            :payout="payout_09"
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
            :stockName="$route.params.id"
            :loop="getLoop($route.params.id)"
            :betId="'bothdigit-'+index"
            :payout="payout_18"
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
            :stockName="$route.params.id"
            :loop="getLoop($route.params.id)"
            :betId="index < 10 ? 'twodigit-0' + index :'twodigit-'+index"
            :payout="payout_99"
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
      number: null,
      // rules payout
      payout_high_mid_low: payout.high_mid_low,
      payout_big_small: payout.big_small,
      payout_09: payout._09,
      payout_18: payout._18,
      payout_99: payout._99,
      // games rules
      firstDigit: [
        {
          rule: "big",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: payout.big_small
        },
        {
          rule: "small",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: payout.big_small
        },
        {
          rule: "odd",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: payout.big_small
        },
        {
          rule: "even",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: payout.big_small
        }
      ],
      lastDigit: [
        {
          rule: "big",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: payout.big_small
        },
        {
          rule: "small",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: payout.big_small
        },
        {
          rule: "odd",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: payout.big_small
        },
        {
          rule: "even",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: payout.big_small
        }
      ],
      bothDigit: [
        {
          rule: "big",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: payout.big_small
        },
        {
          rule: "tie",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: payout.big_small
        },
        {
          rule: "small",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: payout.big_small
        },
        {
          rule: "odd",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: payout.big_small
        },
        {
          rule: "even",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: payout.big_small
        }
      ],
      twoDigit: [
        {
          rule: "big",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: payout.big_small
        },
        {
          rule: "tie",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: payout.big_small
        },
        {
          rule: "small",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: payout.big_small
        },
        {
          rule: "odd",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: payout.big_small
        },
        {
          rule: "even",
          stock_id: this.$route.params.id,
          stock_name: this.$route.params.id,
          payout: payout.big_small
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
      "getAmountBetSpecificNumber"
    ]),
    // return true if bet close
    checkBetClose() {
      if (this.getStockLoop(this.$route.params.id) == 1) {
        return this.getLotteryDraw(this.$route.params.id) > 40;
      } else {
        return this.getLotteryDraw(this.$route.params.id) > 240;
      }
    }
  },
  methods: {
    ...mapMutations(["pushDataMultiGameBet"]),
    betButtonClick(betId) {
      if (this.checkFooterBet) {
        let data = {
          stockName: this.stockName,
          loop: this.loop,
          betId: betId,
          betValue: this.getFooterBetAmount
        };
        this.pushDataMultiGameBet(data);
        console.warn(this.getMultiGameBet);
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
</style>