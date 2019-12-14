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
              <v-flex xs12>
                <selectStock :stockId="$route.params.id"></selectStock>
              </v-flex>
              <v-flex pt-1 v-if="getStockById($route.params.id).stockPrice.length>0">
                <v-flex style="height:421px">
                  <chartApp
                    :data="getStockById($route.params.id).stockPrice"
                    :time="getStockById($route.params.id).stockTime"
                    :key="getStockById($route.params.id).stockPrice[0]"
                    :stockid="$route.params.id"
                  ></chartApp>
                </v-flex>
                <v-layout>
                  <v-flex>
                    <v-btn dark color="#003e70" :to="'/modern/fullscreen/' +$route.params.id">
                      <v-icon left dark class="ma-0">fullscreen</v-icon>
                      {{$t('msg.fullscreenmode')}}
                    </v-btn>
                    <v-btn
                      dark
                      :to="'/modern/multigame/' +$route.params.id"
                      color="#003e70"
                    >{{$t('msg.Multiplegaming')}}</v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6 class="mx-2">
            <v-layout>
              <v-flex class="text-xs-center" px-2>
                <span>{{$t('msg.Lastdraw')}}:</span>
                <v-flex flex-style>
                  <span v-html="$options.filters.lastDraw(getStockLastDraw($route.params.id))"></span>
                </v-flex>
              </v-flex>
              <!-- <v-spacer></v-spacer> -->
              <v-flex class="text-xs-center" px-2>
                <span>{{$t('msg.BetClosein')}}:</span>
                <v-flex flex-style>
                  <span
                    class="text-yellow"
                  >{{getLotteryDraw($route.params.id) | betclosein(getStockLoop($route.params.id))}}</span>
                </v-flex>
              </v-flex>
              <v-flex class="text-xs-center" px-2>
                <span>{{$t('msg.lotterydraw')}}:</span>
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
            <betButton :stockName="$route.params.id" :loop="getLoop($route.params.id)"></betButton>
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
            <v-icon left dark>add</v-icon>
            {{$t('msg.addtrendchart')}}
          </v-btn>
        </v-flex>
      </v-flex>
    </v-layout>

  
      
  </div>


</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
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
       bgColor: '#778899',
          position: 'top-right',
          fabActions: [
              {
                  name: 'cache',
                  icon: 'cached'
              },
              {
                  name: 'alertMe',
                  icon: 'add_alert'
              }
          ],
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" }
      ],
      trendTypes: ["firstDigit"],
      isloading: false
    };
  },
  mounted() {
    // call this every page that used "dekstopModern" layout to hide loading
    this.setIsLoadingStockGame(false);
    console.warn("mounted...");

    // set footerBet to zero because on this page cant use bet footer
    this.setFooterBetAmount(0);
    this.removeAllFooterBet();
  },
  watch: {
    "$screen.width"() {
      if (this.$screen.width <= 1204) {
        let linkto = `/modern/betting/${this.$route.params.id}`;
        this.$router.push(linkto);
      }
    }
  },
  methods: {
    //  async test(){
    //    const body = {
    //                 client_id: 8,
    //                 webToken: "IJZSsfMjXCSxt7X27luJAoiUYNmx13RXqWY6H2ba",
    //                 name: "macky",
    //                 userId: "11223344",
    //                 balance: "800000",
    //                 webId: "0001"
    //             }
    //             const token = await this.$axios.$post('http://192.168.1.134:8003/api/redirect', body)
    //             console.warn("token")
    //             console.warn(token)
    //             console.warn("token")
    // },
    ...mapMutations([
      "setFooterBetAmount",
      "removeAllFooterBet",
      "setIsLoadingStockGame"
    ]),
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
    },
    loaded() {
      this.isLoad = true;
      console.log(isLoad);
    }
  },
  computed: {
    ...mapGetters([
      "getStockById",
      "getLotteryDraw",
      "lotterydraw",
      "getStockLoop",
      "getStockLastDraw",
      "getStockCrawlerData",
      "getLoop"
    ])
  }
};
</script>

<style scoped>
</style>

