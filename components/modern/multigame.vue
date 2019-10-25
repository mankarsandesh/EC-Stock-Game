<template>
  <!-- <v-flex xs6>
    <div class="border-flex"> -->
      <v-layout>
        <v-flex xs12 class="pt-2">
          <h2 class="text-uppercase">{{stockid}} {{getStockLoop(stockid)}} minute loop</h2>
          <chartApp
            :data="getStockById(stockid).stockPrice"
            :time="getStockById(stockid).stockTime"
            :key="getStockById(stockid).stockPrice[0]"
            :stockid="stockid"
            height="400px"
          ></chartApp>
          <v-layout align-center justify-end>
            <v-flex >
              <h4>$ {{getAmountBettingByStockId(stockid)}}</h4>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex >
              <v-btn dark color="#003e70" :to="'/modern/fullscreen/' +stockid">
                <v-icon left dark class="ma-0">fullscreen</v-icon>full screen mode
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <v-flex>
            <v-layout>
              <v-flex class="text-xs-center" px-2>
                <span class="text-gray">Last draw:</span>
                <v-flex flex-style>
                  <h4 v-html="$options.filters.lastDraw(getStockLastDraw(stockid))"></h4>
                </v-flex>
              </v-flex>
              <v-flex class="text-xs-center" px-2>
                <span class="text-gray">Bet Close in:</span>
                <v-flex flex-style>
                  <span
                    class="text-yellow"
                  >{{getLotteryDraw(stockid) | betclosein(getStockLoop(stockid))}}</span>
                </v-flex>
              </v-flex>
              <v-flex class="text-xs-center" px-2>
                <span class="text-gray">lottery draw:</span>
                <v-flex flex-style>
                  <span
                    class="text-yellow"
                  >{{getLotteryDraw(stockid) | lotterydraw(getStockLoop(stockid))}}</span>
                </v-flex>
              </v-flex>
              <v-flex xs4 class="text-xs-right" style="align-self: flex-end;">
                <!-- <v-btn fab dark small color="#003e70">
                <v-icon dark size="25">fa-question</v-icon>
                </v-btn>-->
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex>
            <betButton :isFullscreen="true" :stockName="stockid" :loop="getStockLoop(stockid)"></betButton>
          </v-flex>
        </v-flex>
      </v-layout>
    <!-- </div>
  </v-flex> -->
</template>
<script>
import { mapGetters } from "vuex";
import betButton from "~/components/modern/betButton";
import chartApp from "~/components/modern/chart";
export default {
  props: {
    stockid: {
      require: true
    }
  },
  components: {
    betButton,
    chartApp
  },
  computed: {
    ...mapGetters([
      "getStockLoop",
      "getStockLastDraw",
      "getLotteryDraw",
      "lotterydraw",
      "getStockById",
      "getAmountBettingByStockId"
    ])
  }
};
</script>

