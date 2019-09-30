<template>
  <div class="p-relative">
    <!-- <div
      class="bet-close"
      v-if="checkBetClose  || getLotteryDraw($route.params.id) ==='close' || getLotteryDraw($route.params.id) == null "
    >
      <p>bet close</p>
    </div>-->
    <v-layout row>
      <popper
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
          <betModal
            :stockName="$route.params.id"
            :loop="getLoop($route.params.id)"
            :betId="'firstdigit-'+data.rule"
            :payout="data.payout"
          ></betModal>
        </div>
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">{{data.rule}}</span>
          <br />
          <span class="small-digit">First Digit</span>
          <br/><span class="small-digit" v-show="isFullscreen">{{payout_big_small}}</span>
        </v-btn>
      </popper>

      <div class="d-block w20">
        <popper
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
              betId="firstdigit-high"
              :payout="payout_high_mid_low"
            ></betModal>
          </div>
          <v-btn class="betting-small" slot="reference">HIGH  {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
        <popper
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
              betId="firstdigit-mid"
              :payout="payout_high_mid_low"
            ></betModal>
          </div>
          <v-btn class="betting-small" slot="reference">MID  {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
        <popper
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
          <v-btn class="betting-small" slot="reference">LOW  {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
      </div>
    </v-layout>
    <!-- Row betting button2 -->
    <v-layout row>
      <popper
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
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">{{data.rule}}</span>
          <br />
          <span class="small-digit">Last Digit</span>
          <br/><span class="small-digit" v-show="isFullscreen">{{payout_big_small}}</span>
        </v-btn>
      </popper>
      <div class="d-block w20">
        <popper
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
          <v-btn class="betting-small" slot="reference">HIGH  {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
        <popper
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
          <v-btn class="betting-small" slot="reference">MID  {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
        <popper
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
          <v-btn class="betting-small" slot="reference">LOW  {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
      </div>
    </v-layout>
    <!-- Row betting button2 -->
    <!-- Row betting button3 -->
    <v-layout row>
      <popper
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
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">{{data.rule}}</span>
          <br />
          <span class="small-digit">Both Digit</span>
          <br/><span class="small-digit" v-show="isFullscreen">{{payout_big_small}}</span>
        </v-btn>
      </popper>

      <div class="d-block w18">
        <popper
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
          <v-btn class="betting-small" slot="reference">HIGH  {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
        <popper
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
          <v-btn class="betting-small" slot="reference">MID  {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
        <popper
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
          <v-btn class="betting-small" slot="reference">LOW  {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
      </div>
    </v-layout>
    <!-- Row betting button3 -->
    <!-- Row betting button3 -->
    <v-layout row>
      <popper
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
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">{{data.rule}}</span>
          <br />
          <span class="small-digit">Two Digit</span>
          <br/><span class="small-digit" v-show="isFullscreen">{{payout_big_small}}</span>
        </v-btn>
      </popper>
      <div class="d-block w18">
        <popper
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
          <v-btn class="betting-small" slot="reference">HIGH  {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
        <popper
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
          <v-btn class="betting-small" slot="reference">MID  {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
        <popper
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
          <v-btn class="betting-small" slot="reference">LOW  {{ isFullscreen?`(${payout_high_mid_low})`:''}}</v-btn>
        </popper>
      </div>
    </v-layout>
    <!-- Row betting button5 -->
    <v-layout row>
      <span class="w20">
        <v-btn class="align_button4" @click="btnnumber('first')">
          <span class="big-digit">0 - 9</span>
          <br />
          <span class="small-digit">First Digit</span>
          <br/><span class="small-digit" v-show="isFullscreen">{{payout_09}}</span>
        </v-btn>
      </span>
      <span class="w20">
        <v-btn class="align_button4" @click="btnnumber('last')">
          <span class="big-digit">0 - 9</span>
          <br />
          <span class="small-digit">Last Digit</span>
          <br/><span class="small-digit" v-show="isFullscreen">{{payout_09}}</span>
        </v-btn>
      </span>
      <span class="w20">
        <v-btn class="align_button4" @click="btnnumber('both')">
          <span class="big-digit">0 - 18</span>
          <br />
          <span class="small-digit">Both Digit</span>
          <br/><span class="small-digit" v-show="isFullscreen">{{payout_18}}</span>

        </v-btn>
      </span>
      <span class="w20">
        <v-btn class="align_button4" @click="btnnumber('two')">
          <span class="big-digit">00 - 99</span>
          <br />
          <span class="small-digit">Two Digit</span>
          <br/><span class="small-digit" v-show="isFullscreen">{{payout_99}}</span>
        </v-btn>
      </span>
    </v-layout>
    <!-- Row betting button5 -->
    <v-layout row class="container-btn-small">
      <popper
        v-for="(n,index) in 10"
        :key="index"
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
        <v-btn slot="reference" v-show="number == 'first'" class="btn-small">{{index}}</v-btn>
      </popper>
      <popper
        v-for="(n,index) in 10"
        :key="index"
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
        <v-btn slot="reference" v-show="number == 'last' " class="btn-small">{{index}}</v-btn>
      </popper>
      <popper
        v-for="(n,index) in 19"
        :key="index"
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
        <v-btn slot="reference" v-show="number == 'both' " class="btn-small">{{index}}</v-btn>
      </popper>
      <popper
        v-for="(n,index) in 100"
        :key="index"
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
            :betId="'twodigit-'+ index"
            :payout="payout_99"
          ></betModal>
        </div>
        <v-btn
          slot="reference"
          v-show="number == 'two' "
          class="btn-small"
        >{{ index < 10 ? "0" + index :index}}</v-btn>
      </popper>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import betModal from "~/components/modern/betModal";
import popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
let payout = {
  big_small: 1.92,
  high_mid_low: 2.92,
  _09: 9.82,
  _18: 19.92,
  _99: 98.82
};
export default {
  props:{
    isFullscreen:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      number: null,
      payout_high_mid_low: payout.high_mid_low,
      payout_big_small:payout.big_small,
      payout_09: payout._09,
      payout_18: payout._18,
      payout_99: payout._99,
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
    popper,
    betModal
  },
  computed: {
    ...mapGetters([
      "getLotteryDraw",
      "getStockLoop",
      "getLotteryDraw",
      "getLoop"
    ]),

    checkBetClose() {
      if (this.getStockLoop(this.$route.params.id) == 1) {
        return this.getLotteryDraw(this.$route.params.id) > 40;
      } else {
        return this.getLotteryDraw(this.$route.params.id) > 240;
      }
    }
  },
  methods: {
    payoutBigSmall() {
      return this.payout.big_small;
    },
    btnnumber(value) {
      value == this.number ? (this.number = null) : (this.number = value);
    }
  }
};
</script>
<style scoped>
</style>