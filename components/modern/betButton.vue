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
        class="w20"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal stockName="sdfgsdfg" loop="1" betId="big first digit-1"></betModal>
        </div>
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">BIG</span>
          <br />
          <span class="small-digit">First Digit</span>
        </v-btn>
      </popper>

      <popper
        class="w20"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">SMALL</span>
          <br />
          <span class="small-digit">First Digit</span>
        </v-btn>
      </popper>

      <popper
        class="w20"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">ODD</span>
          <br />
          <span class="small-digit">First Digit</span>
        </v-btn>
      </popper>

      <popper
        class="w20"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">EVEN</span>
          <br />
          <span class="small-digit">First Digit</span>
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
            <betModal></betModal>
          </div>
          <v-btn class="betting-small" slot="reference">HIGH</v-btn>
        </popper>
        <popper
          trigger="click"
          :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
        >
          <div class="popper">
            <betModal></betModal>
          </div>
          <v-btn class="betting-small" slot="reference">MID</v-btn>
        </popper>
        <popper
          trigger="click"
          :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
        >
          <div class="popper">
            <betModal></betModal>
          </div>
          <v-btn class="betting-small" slot="reference">LOW</v-btn>
        </popper>
      </div>
    </v-layout>
    <!-- Row betting button2 -->
    <v-layout row>
      <popper
        class="w20"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">BIG</span>
          <br />
          <span class="small-digit">Last Digit</span>
        </v-btn>
      </popper>
      <popper
        class="w20"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">SMALL</span>
          <br />
          <span class="small-digit">Last Digit</span>
        </v-btn>
      </popper>
      <popper
        class="w20"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">ODD</span>
          <br />
          <span class="small-digit">Last Digit</span>
        </v-btn>
      </popper>
      <popper
        class="w20"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">EVEN</span>
          <br />
          <span class="small-digit">Last Digit</span>
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
            <betModal></betModal>
          </div>
          <v-btn class="betting-small" slot="reference">HIGH</v-btn>
        </popper>
        <popper
          trigger="click"
          :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
        >
          <div class="popper">
            <betModal></betModal>
          </div>
          <v-btn class="betting-small" slot="reference">MID</v-btn>
        </popper>
        <popper
          trigger="click"
          :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
        >
          <div class="popper">
            <betModal></betModal>
          </div>
          <v-btn class="betting-small" slot="reference">LOW</v-btn>
        </popper>
      </div>
    </v-layout>
    <!-- Row betting button2 -->
    <!-- Row betting button3 -->
    <v-layout row>
      <popper
        class="w16"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">BIG</span>
          <br />
          <span class="small-digit">Both Digit</span>
        </v-btn>
      </popper>
      <popper
        class="w16"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">TIE (0)</span>
          <br />
          <span class="small-digit">Both Digit</span>
        </v-btn>
      </popper>
      <popper
        class="w16"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">SMALL</span>
          <br />
          <span class="small-digit">Both Digit</span>
        </v-btn>
      </popper>
      <popper
        class="w16"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">ODD</span>
          <br />
          <span class="small-digit">Both Digit</span>
        </v-btn>
      </popper>
      <popper
        class="w16"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">EVEN</span>
          <br />
          <span class="small-digit">Both Digit</span>
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
            <betModal></betModal>
          </div>
          <v-btn class="betting-small" slot="reference">HIGH</v-btn>
        </popper>
        <popper
          trigger="click"
          :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
        >
          <div class="popper">
            <betModal></betModal>
          </div>
          <v-btn class="betting-small" slot="reference">MID</v-btn>
        </popper>
        <popper
          trigger="click"
          :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
        >
          <div class="popper">
            <betModal></betModal>
          </div>
          <v-btn class="betting-small" slot="reference">LOW</v-btn>
        </popper>
      </div>
    </v-layout>
    <!-- Row betting button3 -->
    <!-- Row betting button3 -->
    <v-layout row>
      <popper
        class="w16"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">BIG</span>
          <br />
          <span class="small-digit">Two Digit</span>
        </v-btn>
      </popper>
      <popper
        class="w16"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">TIE (0)</span>
          <br />
          <span class="small-digit">Two Digit</span>
        </v-btn>
      </popper>
      <popper
        class="w16"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">SMALL</span>
          <br />
          <span class="small-digit">Two Digit</span>
        </v-btn>
      </popper>
      <popper
        class="w16"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">ODD</span>
          <br />
          <span class="small-digit">Two Digit</span>
        </v-btn>
      </popper>
      <popper
        class="w16"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn class="align_button4" slot="reference">
          <span class="big-digit">EVEN</span>
          <br />
          <span class="small-digit">Two Digit</span>
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
            <betModal></betModal>
          </div>
          <v-btn class="betting-small" slot="reference">HIGH</v-btn>
        </popper>
        <popper
          trigger="click"
          :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
        >
          <div class="popper">
            <betModal></betModal>
          </div>
          <v-btn class="betting-small" slot="reference">MID</v-btn>
        </popper>
        <popper
          trigger="click"
          :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
        >
          <div class="popper">
            <betModal></betModal>
          </div>
          <v-btn class="betting-small" slot="reference">LOW</v-btn>
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
        </v-btn>
      </span>
      <span class="w20">
        <v-btn class="align_button4" @click="btnnumber('last')">
          <span class="big-digit">0 - 9</span>
          <br />
          <span class="small-digit">Last Digit</span>
        </v-btn>
      </span>
      <span class="w20">
        <v-btn class="align_button4" @click="btnnumber('both')">
          <span class="big-digit">0 - 18</span>
          <br />
          <span class="small-digit">Both Digit</span>
        </v-btn>
      </span>
      <span class="w20">
        <v-btn class="align_button4" @click="btnnumber('two')">
          <span class="big-digit">00 - 99</span>
          <br />
          <span class="small-digit">Two Digit</span>
        </v-btn>
      </span>
    </v-layout>
    <!-- Row betting button5 -->
    <v-layout row class="container-btn-small">
      <popper
        v-for="index in 10"
        :key="index"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn slot="reference" v-show="number == 'first'" class="btn-small">{{index-1}}</v-btn>
      </popper>
      <popper
        v-for="index in 10"
        :key="index"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn slot="reference" v-show="number == 'last' " class="btn-small">{{index-1}}</v-btn>
      </popper>
      <popper
        v-for="index in 19"
        :key="index"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn slot="reference" v-show="number == 'both' " class="btn-small">{{index-1}}</v-btn>
      </popper>

      <popper
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn slot="reference" v-show="number == 'two' " class="btn-small">00</v-btn>
      </popper>
      
      <popper
        v-for="index in 99"
        :key="index"
        trigger="click"
        :options="{
                      placement: 'bottom-end',
                       modifiers: { offset: { offset: '25px' } }
                }"
      >
        <div class="popper">
          <betModal></betModal>
        </div>
        <v-btn
          slot="reference"
          v-show="number == 'two' "
          class="btn-small"
        >{{ index-1 < 9 ? "0" + index :index}}</v-btn>
      </popper>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import betModal from "~/components/modern/betModal";
import popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";

export default {
  data() {
    return {
      number: null
    };
  },
  components: {
    popper,
    betModal
  },
  computed: {
    ...mapGetters(["getLotteryDraw", "getStockLoop", "getLotteryDraw"]),
    checkBetClose() {
      if (this.getStockLoop(this.$route.params.id) == 1) {
        return this.getLotteryDraw(this.$route.params.id) > 40;
      } else {
        return this.getLotteryDraw(this.$route.params.id) > 240;
      }
    }
  },
  methods: {
    btnnumber(value) {
      value == this.number ? (this.number = null) : (this.number = value);
    }
  }
};
</script>  
<style scoped>
</style>