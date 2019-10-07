<template>
  <div>
    <v-layout>
      <v-flex xs2 pa-2>
        <v-layout column>
          <v-flex xs12 pt-2 style="padding-top:21px !important">
            <stockList></stockList>
          </v-flex>
          <v-flex xs12 pt-2>
            <betResultAllResult></betResultAllResult>
          </v-flex>
          <v-flex xs12 pt-2>
            <onBetting></onBetting>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs10 pa-2>
        <v-layout>
          <v-flex xs6 style="padding-top:21px">
            <v-layout column>
             <v-flex xs12 >
                <selectStock></selectStock>
              </v-flex>
              <v-flex pt-1 v-if="getStockById($route.params.id).stockPrice.length>0">
                <v-flex style="height:421px">
                  <chartApp
                    :data="getStockById($route.params.id).stockPrice"
                    :time="getStockById($route.params.id).stockTime"
                    :key="getStockById($route.params.id).stockPrice[0]"
                  ></chartApp>
                </v-flex>
                <v-layout>
                  <v-flex>
                    <v-btn dark color="#003e70" :to="'/modern/fullscreen/' +$route.params.id">
                      <v-icon left dark class="ma-0">fullscreen</v-icon>full screen mode
                    </v-btn>
                    <v-btn dark color="#003e70">Multiple gaming</v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6 class="mx-2">
            <v-layout>
              <v-flex class="text-xs-center" px-2>
                <span>Last draw:</span>
                <v-flex flex-style>
                  <h4 v-html="$options.filters.lastDraw(getStockLastDraw($route.params.id))"></h4>
                </v-flex>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex class="text-xs-center" px-2>
                <span>Bet Close in:</span>
                <v-flex flex-style>
                  <span
                    class="text-yellow"
                  >{{getLotteryDraw($route.params.id) | betclosein(getStockLoop($route.params.id))}}</span>
                </v-flex>
              </v-flex>
              <v-flex class="text-xs-center" px-2>
                <span>lottery draw:</span>
                <v-flex flex-style>
                  <span
                    class="text-yellow"
                  >{{getLotteryDraw($route.params.id) | lotterydraw(getStockLoop($route.params.id))}}</span>
                </v-flex>
              </v-flex>
              <v-flex xs2 class="text-xs-right" style="align-self: flex-end;">
                <v-btn fab dark small color="#003e70">
                  <v-icon dark size="25">fa-question</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <betButton></betButton>
          </v-flex>
        </v-layout>
        <v-flex xs12 v-if="getStockCrawlerData($route.params.id) !== ''">
          <div v-for="(trendType, index) in trendTypes" :key="index">
            <hr v-if="index > 0" />
            <tableTrendMap></tableTrendMap>
          </div>
        </v-flex>
        <v-flex xs12 class="text-xs-center" v-if="trendTypes.length<4">
          <v-btn class="text-white" color="#003e70" @click="addTrendMap()">
            <v-icon left dark>add</v-icon>add trend chart
          </v-btn>
        </v-flex>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import stockList from "~/components/modern/stockList";
import betResultAllResult from "~/components/modern/betResultAllResult";
import onBetting from "~/components/modern/onBetting";
import betButton from "~/components/modern/betButton";
import chartApp from "~/components/modern/chart";
import tableTrendMap from "~/components/modern/tableTrendMap";
import selectStock from "~/components/modern/selectStock";

export default {
  async validate({ params, store }) {
    return store.getters.getCheckStock(params.id);
  },
  layout: "desktopModern",
  components: {
    stockList,
    betResultAllResult,
    onBetting,
    chartApp,
    betButton,
    tableTrendMap,
    selectStock
  },
  data() {
    return {
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" }
      ],
      trendTypes: ["firstDigit"]
    };
  },
  methods: {
    addTrendMap() {
      let trendCount = this.trendTypes.length;
      switch (trendCount) {
        case 1:
          this.trendTypes.push("lastDigit");
          break;
        case 2:
          this.trendTypes.push("bothDigit");
          break;
        case 3:
          this.trendTypes.push("twoDigit");
          break;
      }
    }
  },
  computed: {
    ...mapGetters([
      "getStockById",
      "getLotteryDraw",
      "lotterydraw",
      "getStockLoop",
      "getStockLastDraw",
      "getStockCrawlerData"
    ])
  }
};
</script>

<style scoped>
</style>

