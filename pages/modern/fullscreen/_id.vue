<template>
  <div>
    <v-dialog v-model="dialogOtherstock" style="position:fixed !important">
      <v-card color="rgb(0, 62, 111, 0.8)">
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialogOtherstock = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-layout row wrap px-2 pt-2>
          <v-flex
            pa-2
            v-for="(data, index) in getStockChart"
            :key="index"
            xs6
            sm6
            md6
          >
            <nuxt-link :to="'/modern/fullscreen/' + data.id">
              <v-card class="v-card-style">
                <div
                  class="close-bet-chart"
                  v-if="getLotteryDraw(data.id) === 'close'"
                >
                  <span class="text-close-bet">market close</span>
                </div>

                <v-card-text class="pa-0" min-height="500">
                  <chartApp></chartApp>
                </v-card-text>
              </v-card>
              <div class="pt-2" style="color: white;">
                <h3 class="text-uppercase">
                  {{ $t("stockname." + data.stockname) }}
                </h3>
                <h4 style="line-height: 1">
                  <em>{{ data.loop }} minute game</em>
                </h4>
              </div>
            </nuxt-link>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>

    <v-container fluid class="containerNew">
      <v-layout pa-1 wrap>
        <v-flex xs4 sm12 md6 lg4>
          <v-layout column>
            <v-flex>
              <v-layout xs12>
                <v-flex
                  xs12
                  lg4
                  md4
                  class="text-xs-center1"
                  style="width:100%;align-self: center;"
                >
                  <span class="stockname">
                    {{ $t(`stockname.${$route.params.id}`) }}
                  </span>
                  <span class="gameid">010620190923140800</span>
                </v-flex>

                <v-flex xs12 md8 lg8 class="text-xs-right topHeader">
                  <v-btn color="buttonRed"
                    >1 {{ $t("msg.minute") }} {{ $t("msg.loop") }}</v-btn
                  >
                  <v-btn
                    color="buttonGreensmall"
                    @click="dialogOtherstock = true"
                    >{{ $t("msg.otherstock") }}</v-btn
                  >
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 sm12 md8 lg8 class="pt-2 chartDesgin">
              <chartApp></chartApp>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm12 md5 lg5>
          <v-flex>
            <v-layout>
              <v-flex class="text-xs-center" xs4 px-2>
                <span class="text-black">{{ $t("msg.Lastdraw") }}:</span>
                <v-flex flex-style class="lastdraw">
                  <h4
                    class="text-black"
                    v-html="$options.filters.lastDraw(getLastDraw)"
                  ></h4>
                </v-flex>
              </v-flex>
              <v-flex class="text-xs-center" xs4 px-2>
                <span class="text-black">{{ $t("msg.BetClosein") }}:</span>
                <v-flex flex-style class="betclose">
                  <!-- <span class="text-black">
                    {{
                      getLotteryDraw($route.params.id)
                        | betclosein(getStockLoop($route.params.id))
                    }}
                  </span> -->
                </v-flex>
              </v-flex>
              <v-flex class="text-xs-center" xs4 px-2>
                <span class="text-black">{{ $t("msg.lotterydraw") }}:</span>
                <v-flex flex-style class="lottery">
                  <!-- <span class="text-black">
                    {{
                      getLotteryDraw($route.params.id)
                        | lotterydraw(getStockLoop($route.params.id))
                    }}
                  </span> -->
                </v-flex>
              </v-flex>
              <!-- <v-flex xs3 class="text-xs-right" style="align-self: flex-end;">
                <v-btn fab dark small color="#003e70">
                <v-icon dark size="25">fa-question</v-icon>
                </v-btn>
              </v-flex>-->
            </v-layout>
          </v-flex>
          <v-flex>
            <betButton
              :isFullscreen="true"
              :stockName="$route.params.id"
              :loop="1"
            ></betButton>
          </v-flex>
        </v-flex>
        <v-flex xs12 sm12 md3 lg3>
          <h3 class="balanceUser">
            Acc : {{ getUserInfo.balance | currency }}
          </h3>
          <!-- Toggle between two components -->
          <fullscreenchart v-if="!isHidden"></fullscreenchart>
          <fullscreencurrentbet
            v-else
            :desserts="desserts"
          ></fullscreencurrentbet>
          <v-layout pa-3>
            <v-flex xs3 sm3 md3 lg3>
              <span class="seticon">
                <i class="fa fa-user fa-2x iconcolor" />
                <span>{{
                  dataliveBetAll.totalUsers ? dataliveBetAll.totalUsers : 0
                }}</span>
              </span>
            </v-flex>
            <v-flex xs3 sm3 md3 lg3>
              <span class="seticon">
                <i class="fa fa-gamepad fa-2x iconcolor" />
                <span>{{
                  dataliveBetAll.totalBets ? dataliveBetAll.totalBets : 0
                }}</span>
              </span>
            </v-flex>
            <v-flex xs3 sm3 md3 lg3>
              <span class="seticon">
                <i class="fa fa-money fa-2x iconcolor" />
                <span>{{
                  dataliveBetAll.totalAmount ? dataliveBetAll.totalAmount : 0
                }}</span>
              </span>
            </v-flex>
            <v-flex xs3 sm3 md3 lg3 mb-1>
              <v-btn
                @click="isHidden = !isHidden"
                color="buttonGreensmall"
                class="curretbet-btn"
                >{{ $t("menu.current bet") }}</v-btn
              >
            </v-flex>
          </v-layout>
        </v-flex>

        <!-- live Chart -->

        <v-flex xs12 class="text-xs-center">
          <footerBet lg12 md12></footerBet>
          <v-layout class="fullroadMap elevation-4" style="margin-top:-40px;">
            <v-flex xs12 sm12 md12 lg12 wrap pt-2>
              <v-layout>
                <v-flex xs12 sm12 md6 lg6>
                  <trendMapFullScreen
                    :index="0"
                    :dataArray="getRoadMap"
                  ></trendMapFullScreen>
                </v-flex>
                <v-flex xs12 sm12 md6 lg6>
                  <trendMapFullScreen
                    :index="1"
                    :dataArray="getRoadMap"
                  ></trendMapFullScreen>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12 sm12 md6 lg6>
                  <trendMapFullScreen
                    :index="2"
                    :dataArray="getRoadMap"
                  ></trendMapFullScreen>
                </v-flex>
                <v-flex xs12 sm12 md6 lg6>
                  <trendMapFullScreen
                    :index="3"
                    :dataArray="getRoadMap"
                  ></trendMapFullScreen>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              rigth
              fab
              @click="$router.go(-1)"
              class="fullscreenclose"
              dark
              v-on="on"
              title="Full Screen"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </template>
          <span>Close Full Screen</span>
        </v-tooltip>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import betButton from "~/components/modern/betButton";
import chartApp from "~/components/modern/chart";
import footerBet from "~/components/modern/footerbet";
import trendMapFullScreen from "~/components/modern/trendMapFullScreen";
import fullscreenchart from "~/components/modern/fullscreenchart";
import fullscreencurrentbet from "~/components/modern/fullscreencurrentbet";

export default {
  async validate({ params, store }) {
    return store.getters.getCheckStock(params.id);
  },
  layout: "fullscreen",
  data() {
    return {
      routeParamID: this.$route.params.id,
      dialogOtherstock: false,
      //winner mqrquee
      winner: [],
      pauseTime: 2000,
      pauseOnHover: false,
      scrollSpeed: 30,
      showSpeed: 20,
      chartData: [],
      isShow: false,
      isHidden: false,
      chartData: [],
      chartDatas: [],
      rule: [],
      rulenew: [],
      ruleold: [],
      msg: "",
      dataliveBetAll: {},
      stockId: "",
      desserts: []
    };
  },
  created() {
    this.getSotckId();
    this.asyncRoadMap(this.getStockUUIDByStockName(this.$route.params.id));
  },
  beforeDestroy() {
    window.Echo.leave(
      `roadMap.${this.getStockUUIDByStockName(this.routeParamID)}.${
        this.getPortalProviderUUID
      }`
    );
  },
  mounted() {
    this.fetch();
    // socket new api
    this.listenForBroadcast(
      {
        channelName: `roadMap.${this.getStockUUIDByStockName(
          this.$route.params.id
        )}.${this.getPortalProviderUUID}`,
        eventName: "roadMap"
      },
      ({ data }) => {
        this.setLiveRoadMap(data.data.roadMap[0]);
      }
    );
    // this.getwinuser();
    setTimeout(() => {
      // this.getliveBetCount();
      this.getliveAll();
    }, 1000);

    setInterval(() => {
      // this.getliveBetCount();
      this.getliveAll();
    }, 1000);
    console.log(
      // this.getLotteryDraw($route.params.id)
      //   |
      this.getStockLoop("btc1")
    );
  },

  components: {
    betButton,
    chartApp,
    footerBet,
    trendMapFullScreen,
    fullscreenchart,
    fullscreencurrentbet
  },
  computed: {
    ...mapGetters([
      "getStockUUIDByStockName",
      "getPortalProviderUUID",
      "getUserInfo",
      "getLastDraw",
      "getRoadMap",
      "getStockById",
      "lotterydraw",
      "getStockLoop",
      "getStockLastDraw",
      "getStockCrawlerData",
      "getStockChart",
      "getLiveTime",
      "getLivePrice",
      "headers",
      "getUserUUID"
    ])
  },
  methods: {
    ...mapMutations(["setLiveRoadMap"]),
    ...mapActions(["asyncRoadMap"]),
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    test() {
      console.warn(this.$router.history);
    },
    formatToPrice(value) {
      return `$ ${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
    },
    async getSotckId() {
      try {
        let stcokId = await this.$axios.$get(
          `/api/fetchStockOnly?apikey=${this.$store.state.auth_token}`
        );
        stcokId.data.forEach(element => {
          if (element.stockName == "btc1") {
            this.stockId = element.stockId;
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    // async getliveBetCount() {
    //   try {
    //     const res = await this.$axios.$get(
    //       `/api/liveBetCount?stock=${this.stockId}&loop=${this.getLoop(
    //         "btc1"
    //       )}&apikey=${this.$store.state.auth_token}`
    //     );
    //     if (res.status == false) {
    //       console.log("No Data");
    //       return;
    //     }
    //     for (let i = 0; i < res.data.length; i++) {
    //       this.rulenew = res.data[i].totalUsers;
    //     }
    //     if (
    //       res.data.length != 0 ||
    //       res.data.length > this.chartData.length ||
    //       this.rulenew > this.ruleold
    //     ) {
    //       // console.log("Okkk");
    //       // this.msg = this.$root.$t('msg.betting');
    //       if (this.rulenew == undefined) return;
    //       if (
    //         (this.isShow == true && res.data.length > this.chartData.length) ||
    //         this.rulenew > this.ruleold
    //       ) {
    //         this.chartData = res.data;
    //         this.isShow = false;
    //         for (let i = 0; i < res.data.length; i++) {
    //           this.ruleold = res.data[i].totalUsers;
    //         }
    //       } else {
    //         this.chartData = res.data;
    //         this.isShow = true;
    //       }
    //     } else {
    //       // console.log("Nooo");
    //       // this.msg = this.$root.$t('msg.nobetting');
    //       // this.chartData = []

    //       if (this.chartData.length != 4 || this.chartData.length == null) {
    //         this.isShow = false;
    //       } else {
    //         this.isShow = true;
    //       }
    //       this.chartData = [
    //         {
    //           rule: "bothdigit-big",
    //           totalAmount: "1",
    //           totalUsers: 1
    //         },
    //         {
    //           rule: "firstdigit-big",
    //           totalAmount: "2",
    //           totalUsers: 1
    //         },
    //         {
    //           rule: "lastdigit-big",
    //           totalAmount: "3",
    //           totalUsers: 1
    //         },
    //         {
    //           rule: "twodigit-big",
    //           totalAmount: "4",
    //           totalUsers: 1
    //         }
    //       ];
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async getliveAll() {
      try {
        const res = await this.$axios.$get(
          `/api/liveBetAll?stock=${this.stockId}&loop=1
          )}&apikey=${this.$store.state.auth_token}`
        );
        if (res.status == false) {
          console.log("No Data");
          return;
        }
        this.dataliveBetAll = res.data[0];
        // console.log(res.data)
      } catch (error) {
        console.log(error);
      }
    },
    async fetch() {
      try {
        // afer moumted call the functions this method will run the fetch the data from API
        const data1 = {
          // before we call the data we should make the object to the send the request with the API
          portalProviderUUID: this.getPortalProviderUUID, // get the portal provider uuid from computed that we call from vuex
          userUUID: this.getUserUUID, // get the userUUID with the this object
          version: config.version, // version of API
          betResult: [-1, 0, 1], // -1= pending, pending that mean is betting
          limit: "20", // limit the data we the data come will come only the 20 that we limit in this case
          offset: "0" // offset or skip the data
        };
        const { data } = await this.$axios.post(
          "http://uattesting.equitycapitalgaming.com/webApi/getAllBets", // after finish crawl the every API will the the baseURL from AXIOS
          data1, // data object
          {
            headers: {
              Authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh" // basic AUTH before send, becase the backend they will check
            }
          }
        );
        this.desserts = data.data; // after will get the respone the object or array that come with will be equal the array that we create in the data funtion.
        console.log(data, "current betttt");
      } catch (error) {
        console.log(data, "current betttt");
      }
    }
  }
};
</script>

<style scoped>
.balanceUser {
  float: right;
  margin: 10px 20px;
}
.chartDesgin {
  margin-top: 10px;
  padding: 5px 5px;
  background-color: #fff;
  border-radius: 10px;
}

.fullscreenclose {
  position: fixed !important;
  border-radius: 180px;
  bottom: 18px;
  right: 30px;
  width: 40px;
  height: 40px;
  color: #fff;
  background: linear-gradient(
    215deg,
    rgba(156, 44, 205, 1) 35%,
    rgba(121, 59, 204, 1) 100%
  );
}

.fullscreenclose .v-icon {
  font-weight: 800;
  font-size: 30px;
}

.lastdraw {
  font-size: 14px;
  border: 1.5px solid #4b65ff;
  border-radius: 10px;
  font-size: 22px;
  padding: 2px 6px;
  font-weight: 400;
}

.betclose {
  font-size: 14px;
  border: 1.5px solid #ef076a;
  border-radius: 10px;
  font-size: 22px;
  padding: 2px 6px;
  font-weight: 400;
}

.lottery {
  font-size: 14px;
  border: 1.5px solid #01e3bf;
  border-radius: 10px;
  font-size: 22px;
  padding: 2px 6px;
  font-weight: 400;
}

.setborder span {
  font-size: 14px;
  line-height: 10px;
}

.setborder {
  text-align: justify;
}

.seticon {
  border: 2px solid #b4b2b2;
  border-radius: 10px;
  padding: 8px 10px;
  /*height: 25px;
  min-width: 25px !important; */
}

.seticon i {
  color: #545352;
  font-size: 15px;
}

.seticon span {
  font-weight: 600;
  color: #545352;
  font-size: 15px;
}

.fullroadMap {
  border-top: 10px solid #092968;
  border-left: 2px solid #dddddd;
  border-right: 2px solid #dddddd;
  border-radius: 10px;
}
</style>
