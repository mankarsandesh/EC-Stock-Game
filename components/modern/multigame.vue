<template>
  <!-- <v-flex xs6>
  <div class="border-flex">-->
  <v-layout>
    <v-flex xs12 class="pt-2">
      <h3
        class="text-uppercase"
      >{{$t('stockname.'+stockid)}} {{getStockLoop(stockid)}} {{$t('msg.minute')}} {{$t('msg.loop')}}</h3>
      <chartApp
        class="chartDesgin"
        :data="getStockById(stockid).stockPrice"
        :time="getStockById(stockid).stockTime"
        :key="getStockById(stockid).stockPrice[0]"
        :stockid="stockid"
        height="400px"
      ></chartApp>
      <!-- <livechart  :StockData="getStockById(stockid).prices" /> -->
      <v-layout>
        <v-flex align-left >
          <h4>{{formatToPrice(getAmountBettingByStockId(getStockId(stockid)))}}</h4>
        </v-flex>
      
          
       
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <v-flex>
        <v-layout>
          <v-flex class="text-xs-center" px-2>
            <span class="text-gray">{{$t('msg.Lastdraw')}}:</span>
            <v-flex class="lastdraw">
              <span
                class="text-black"
                v-html="$options.filters.lastDraw(getStockLastDraw(stockid))"
              ></span>
            </v-flex>
          </v-flex>
          <v-flex class="text-xs-center" px-2>
            <span class="text-gray">{{$t('msg.BetClosein')}}:</span>
            <v-flex class="betclose">
              <span
                class="text-yellow"
              >{{getLotteryDraw(stockid) | betclosein(getStockLoop(stockid))}}</span>
            </v-flex>
          </v-flex>
          <v-flex class="text-xs-center" px-2>
            <span class="text-gray">{{$t('msg.lotterydraw')}}:</span>
            <v-flex class="lottery">
              <span
                class="text-black"
              >{{getLotteryDraw($route.params.id) | lotterydraw(getStockLoop($route.params.id))}}</span>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex>
        <betButton :isFullscreen="true" :stockName="stockid" :loop="getStockLoop(stockid)"></betButton>
        <v-btn fab align-right class="multiplefull" :to="'/modern/fullscreen/' +stockid" >
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
      "getStockLastDraw",
      "getLotteryDraw",
      "lotterydraw",
      "getStockById",
      "getAmountBettingByStockId",
      "getStockId"
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
<style>
.multiplefull {
  background-color: #8d31cd !important;
  color: #fff !important;
  border-radius: 180px;
}
.multiplefull .v-icon {
  font-size: 30px;
}
</style>