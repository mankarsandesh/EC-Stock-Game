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
          <v-flex pa-2 v-for="(data, index) in getStockChart" :key="index" xs6 sm6 md6>
            <nuxt-link :to="'/modern/fullscreen/' + data.id">
              <v-card class="v-card-style">
                <!-- bet close -->
                <div class="close-bet-chart" v-if="getLotteryDraw(data.id) === 'close'">
                  <span class="text-close-bet">market close</span>
                </div>

                <v-card-text class="pa-0" min-height="556">
                  <chartApp
                    :data="data.stockPrice"
                    :time="getStockById(data.id).stockTime"
                    :key="getStockById(data.id).stockPrice[0]"
                    :stockid="data.id"
                  ></chartApp>
                </v-card-text>
              </v-card>
              <div class="pt-2" style="color: white;">
                <h3 class="text-uppercase">{{ $t('stockname.'+data.stockname) }}</h3>
                <h4 style="line-height: 1">
                  <em>{{ data.loop }} minute game</em>
                </h4>
              </div>
            </nuxt-link>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>

    <v-container class="bg-fullscreen" style="padding:0;">
      <!-- <v-toolbar color="#003e70" class="white--text" style="height:40px;">
            <v-layout row wrap style="padding:0px 10px;margin-top:-10px;">
                <v-flex xs6 sm6 md6 lg6>
                    <welcome-user></welcome-user>
                </v-flex>              
                <v-flex xs6 sm6 md6 lg6 class="text-xs-right">
                    <winnerMarquee :scrollSpeed="scrollSpeed" :showSpeed="showSpeed" :pauseOnHover="pauseOnHover" :pauseTime="pauseTime" :marqueeList="winner" height="30px" width="100%" color="#f76a24" fontSize="12px"></winnerMarquee>
                </v-flex>
            </v-layout>
      </v-toolbar>-->

      <!-- <v-container  class="bg-fullscreen" style="padding:0;"> -->
      <v-layout pa-1 wrap>
        <v-flex xs4 sm12 md6 lg4>
          <v-layout column>
            <v-flex>
              <v-layout xs12>
                <v-flex xs12 lg4 class="text-xs-center1" style="width:100%;align-self: center;">
                  <span class="stockname">
                    {{
                    $t(`stockname.${$route.params.id}`)
                    }}
                  </span>
                  <span class="gameid">010620190923140800</span>
                </v-flex>

                <v-flex xs12 lg8 class="text-xs-right topHeader">

                  <v-btn color="buttonRed">1 {{ $t("msg.minute") }} {{ $t("msg.loop") }}</v-btn>
                  <v-btn color="buttonGreen" @click="dialogOtherstock = true" >{{ $t("msg.otherstock") }}</v-btn>

                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 sm12 md8 lg8 class="pt-2 chartDesgin">
              <chartApp
                :data="getStockById($route.params.id).stockPrice"
                :time="getStockById($route.params.id).stockTime"
                :key="getStockById($route.params.id).stockPrice[0]"
                :stockid="$route.params.id"
              ></chartApp>
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
                    v-html=" 
                      $options.filters.lastDraw(
                        getStockLastDraw($route.params.id)
                      )
                    "
                  ></h4>
                </v-flex>
              </v-flex>
              <v-flex class="text-xs-center" xs4 px-2>
                <span class="text-black">{{ $t("msg.BetClosein") }}:</span>
                <v-flex flex-style class="betclose">
                  <span class="text-black">
                    {{
                    getLotteryDraw($route.params.id)
                    | betclosein(getStockLoop($route.params.id))
                    }}
                  </span>
                </v-flex>
              </v-flex>
              <v-flex class="text-xs-center" xs4 px-2>
                <span class="text-black">{{ $t("msg.lotterydraw") }}:</span>
                <v-flex flex-style class="lottery">
                  <span class="text-black">
                    {{
                    getLotteryDraw($route.params.id)
                    | lotterydraw(getStockLoop($route.params.id))
                    }}
                  </span>
                </v-flex>
              </v-flex>
              <!-- <v-flex xs3 class="text-xs-right" style="align-self: flex-end;">
                <v-btn fab dark small color="#003e70">
                <v-icon dark size="25">fa-question</v-icon>
                </v-btn>
              </v-flex> -->
            </v-layout>
          </v-flex>
          <v-flex>
            <betButton
              :isFullscreen="true"
              :stockName="$route.params.id"
              :loop="getLoop($route.params.id)"
            ></betButton>
          </v-flex>
        </v-flex>
        <v-flex xs12 sm12 md3 lg3>
          <h2 font-weight-bold style="text-align:right;color:#013f70;">Acc : $9885555</h2>
          <fullscreenchart></fullscreenchart>

          <div class="setborder">
            <span class="seticon">
              <i class="fa fa-user fa-2x iconcolor" />
              <span>{{dataliveBetAll.totalUsers}}</span>
            </span>
            <span class="seticon">
              <i class="fa fa-gamepad fa-2x iconcolor" />
              <span>{{dataliveBetAll.totalBets}}</span>
            </span>
            <span class="seticon">
              <i class="fa fa-money fa-2x iconcolor" />
              <span>{{ dataliveBetAll.totalAmount ? formatToPrice(dataliveBetAll.totalAmount):formatToPrice(0)}}</span>
            </span>
          </div>
        </v-flex>
        <!-- live Chart -->

        <v-flex v-if="getStockCrawlerData($route.params.id) !== ''" xs12 class="text-xs-center">
          <footerBet style></footerBet>
          <v-layout class="fullroadMap">
            <v-flex xs12 sm12 md12 lg12 wrap>
              <v-layout>
                <v-flex xs12 sm12 md6 lg6>
                  <trendMapFullScreen which_one="B/S"></trendMapFullScreen>
                </v-flex>
                <v-flex xs12 sm12 md6 lg6>
                  <trendMapFullScreen which_one="O/E"></trendMapFullScreen>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12 sm12 md6 lg6>
                  <trendMapFullScreen which_one="U/L"></trendMapFullScreen>
                </v-flex>
                <v-flex xs12 sm12 md6 lg6>
                  <trendMapFullScreen which_one="NUM"></trendMapFullScreen>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-btn rigth fab class="fullscreenclose" @click="$router.go(-1)">
          <v-icon>close</v-icon>
        </v-btn>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import winnerMarquee from "~/components/modern/winnerMarquee";
import welcomeUser from "~/components/welcomeUser";
import betButton from "~/components/modern/betButton";
import chartApp from "~/components/modern/chart";
import footerBet from "~/components/modern/footerbet";
import trendMapFullScreen from "~/components/modern/trendMapFullScreen";
import fullscreenchart from "~/components/modern/fullscreenchart";

export default {
  layout: "fullscreen",
  data() {
    return {
      which_one: "B/S",
      trendType: "twoDigit",
      dialogOtherstock: false,
      //winner mqrquee
      winner: [],
      pauseTime: 2000,
      pauseOnHover: false,
      scrollSpeed: 30,
      showSpeed: 20,
      chartData: [],
      isShow: false,
      chartData: [],
      chartDatas: [],
      rule: [],
      rulenew: [],
      ruleold: [],
      msg: "",
      dataliveBetAll: {},
      stockId: "",
      loop: ""
    };
  },
  created() {
    this.getSotckId();
  },
  mounted() {
    this.getwinuser();
    setTimeout(() => {
      this.getliveBetCount();
      this.getliveAll();
    }, 1000);

    setInterval(() => {
      this.getliveBetCount();
      this.getliveAll();
    }, 1000);
    console.log(
      // this.getLotteryDraw(this.$route.params.id)
      //   |
      this.getStockLoop(this.$route.params.id)
    );
  },

  components: {
    winnerMarquee,
    welcomeUser,
    betButton,
    chartApp,
    footerBet,
    trendMapFullScreen,
    fullscreenchart
  },
  computed: {
    ...mapGetters([
      "getStockById",
      "getLotteryDraw",
      "lotterydraw",
      "getStockLoop",
      "getStockLastDraw",
      "getStockCrawlerData",
      "getLoop",
      "getStockChart",
      "getLiveTime",
      "getLivePrice"
    ])
  },
  methods: {
    getwinuser() {
      this.$axios
        .$get("api/fetchBet")
        .then(response => {
          // console.log("response.....................")
          // console.log(response.data)
          // console.log("response.......................")
          let resultStatus = null;
          for (let i = 0; i < response.data.length - 1; i++) {
            let betID = response.data[i].betId;
            let result = response.data[i].result;
            let name = response.data[i].name;
            if (result == 1) {
              let betAmount = response.data[i].betAmount;
              let betTime = response.data[i].betTime;
              let win = `<span class="text-slide text-white"><span class="text-warning">
          <i class="fa fa-bell"></i>
          </span>Player ${betID}, <span class="text-warning"> Win $${betAmount},
          </span> ${name}  ${betTime}</span>`;
              this.winner.push(win);
            }
          }
        })
        .catch(error => {
          alert(error);
        });
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
          if (element.stockName == this.$route.params.id) {
            this.stockId = element.stockId;
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    async getliveBetCount() {
      try {
        const res = await this.$axios.$get(
          `/api/liveBetCount?stock=${this.stockId}&loop=${this.getLoop(
            this.$route.params.id
          )}&apikey=${this.$store.state.auth_token}`
        );
        if (res.status == false) {
          console.log("No Data");
          return;
        }
        for (let i = 0; i < res.data.length; i++) {
          this.rulenew = res.data[i].totalUsers;
        }
        if (
          res.data.length != 0 ||
          res.data.length > this.chartData.length ||
          this.rulenew > this.ruleold
        ) {
          // console.log("Okkk");
          // this.msg = this.$root.$t('msg.betting');
          if (this.rulenew == undefined) return;
          if (
            (this.isShow == true && res.data.length > this.chartData.length) ||
            this.rulenew > this.ruleold
          ) {
            this.chartData = res.data;
            this.isShow = false;
            for (let i = 0; i < res.data.length; i++) {
              this.ruleold = res.data[i].totalUsers;
            }
          } else {
            this.chartData = res.data;
            this.isShow = true;
          }
        } else {
          // console.log("Nooo");
          // this.msg = this.$root.$t('msg.nobetting');
          // this.chartData = []

          if (this.chartData.length != 4 || this.chartData.length == null) {
            this.isShow = false;
          } else {
            this.isShow = true;
          }
          this.chartData = [
            {
              rule: "bothdigit-big",
              totalAmount: "1",
              totalUsers: 1
            },
            {
              rule: "firstdigit-big",
              totalAmount: "2",
              totalUsers: 1
            },
            {
              rule: "lastdigit-big",
              totalAmount: "3",
              totalUsers: 1
            },
            {
              rule: "twodigit-big",
              totalAmount: "4",
              totalUsers: 1
            }
          ];
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getliveAll() {
      try {
        const res = await this.$axios.$get(
          `/api/liveBetAll?stock=${this.stockId}&loop=${this.getLoop(
            this.$route.params.id
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
    }
  }
};
</script>

<style scoped>
.stockname {
  font-size: 26px;
  font-weight: 600;
  color: #4b65ff;
}
.gameid {
  font-size: 16px;
  color: #333;
  font-weight: 500;
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
  right: 60px;
  width: 60px;
  height: 60px;
  color: #fff;
  background: linear-gradient(
    215deg,
    rgba(156, 44, 205, 1) 35%,
    rgba(121, 59, 204, 1) 100%
  );
}
.fullscreenclose .v-icon {
  font-weight: 800;
  font-size: 45px;
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
 text-align: center;
}

.seticon {
  border:2px solid #b4b2b2;
  border-radius:20px;
  margin:10px 20px;
  padding:8px 20px;
  height: 25px;
}
.seticon i{
  color: #545352;
  font-size: 22px;
}
.seticon span{
  font-weight: 600;
  color: #545352;
  font-size: 22px;
}
.fullroadMap{
  box-shadow: 5px 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  margin-top:50px;
  padding-top:50px;
  border-top:10px solid #092968;
  border-left:2px solid #dddddd;
  border-right:2px solid #dddddd;
  border-radius: 10px;
}

</style>
