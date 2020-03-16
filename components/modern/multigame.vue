<template>
  <!-- <v-flex xs6>
  <div class="border-flex">-->
  <v-layout class="multiplescreen">
    <v-flex xs12 class="pt-2">
      <h3
        class="text-uppercase ml-4 heading"
      >{{$t('stockname.'+stockid)}} {{getStockLoop(stockid)}} {{$t('msg.minute')}} {{$t('msg.loop')}}</h3>
      <!-- <chartApp
        class="chartDesgin"
        :data="getStockById(stockid).stockPrice"
        :time="getStockById(stockid).stockTime"
        :key="getStockById(stockid).stockPrice[0]"
        :stockid="stockid"
       
      ></chartApp>-->
      <chartApp/>

      <!-- <livechart  :StockData="getStockById(stockid).prices" /> -->
      <v-layout>
        <v-flex align-left class="totalPrice">
          <h4>{{formatToPrice(getAmountBettingByStockId('btc1'))}}</h4>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <v-flex>
        <v-layout>
          <v-flex class="text-xs-center" px-2>
            <span class="text-gray">{{$t('msg.Lastdraw')}}:</span>
            <v-flex class="lastdraw">
              <!-- <span
                class="text-black"
                v-html="$options.filters.lastDraw(getStockLastDraw(stockid))"
              ></span>-->
            </v-flex>
          </v-flex>
          <v-flex class="text-xs-center" px-2>
            <span class="text-gray">{{$t('msg.BetClosein')}}:</span>
            <v-flex class="betclose">
              <!-- <span
                class="text-black"
              >{{getLotteryDraw(stockid) | betclosein(getStockLoop(stockid))}}</span>-->
            </v-flex>
          </v-flex>
          <v-flex class="text-xs-center" px-2>
            <span class="text-gray">{{$t('msg.lotterydraw')}}:</span>
            <v-flex class="lottery">
              <!-- <span
                class="text-black"
              >{{getLotteryDraw($route.params.id) | lotterydraw(getStockLoop($route.params.id))}}</span>-->
            </v-flex>
          </v-flex>
        </v-layout>

        <betButton :isFullscreen="true" :stockName="stockid" :loop="getStockLoop(stockid)"></betButton>
        <v-btn fab class="multiplefull" :to="'/modern/fullscreen/' +stockid" style="float:right;">
          <v-icon>fullscreen</v-icon>
        </v-btn>
      </v-flex>
    </v-flex>
  </v-layout>
  <!-- </div>
  </v-flex>-->
</template>

<script>
import { mapGetters } from "vuex";
import betButton from "~/components/modern/betButton";
import chartApp from "~/components/modern/chart";
// import livechart from "../modern/livechart"
export default {
  props: {
    stockid: {
      require: true
    }
  },
  components: {
    betButton,
    chartApp
    // livechart
  },
  computed: {
    ...mapGetters([
      "getStockLoop",
      "lotterydraw",
      "getStockById",
      "getAmountBettingByStockId"
    ])
  },
  methods: {
    formatToPrice(value) {
      return `$ ${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
    }
  }
};
</script>
<style scoped >
.heading {
  color: #013f70;
  font-size: 22px;
}
.totalPrice {
  font-size: 24px;
  margin-left: 50px;
}
.multiplescreen {
  border-top: 10px solid #092a68;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
}
.multiplefull {
  background-color: #8d31cd !important;
  color: #fff !important;
  border-radius: 180px;
}
.multiplefull .v-icon {
  font-size: 30px;
}
</style>