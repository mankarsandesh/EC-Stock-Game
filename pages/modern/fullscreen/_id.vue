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
                                <chartApp :data="data.stockPrice" :time="getStockById(data.id).stockTime" :key="getStockById(data.id).stockPrice[0]" :stockid="data.id"></chartApp>
                            </v-card-text>
                        </v-card>
                        <div class="text-primary pt-2">
                            <h3 class="text-uppercase">{{ data.stockname }}</h3>
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
        <v-toolbar color="#003e70" class="white--text" style="height:40px;">
            <v-layout row wrap style="padding:0px 10px;margin-top:-10px;">
                <v-flex xs6 sm6 md6 lg6>
                    <welcome-user></welcome-user>
                </v-flex>
                <!-- <v-spacer></v-spacer> -->
                <v-flex xs6 sm6 md6 lg6 class="text-xs-right">
                    <winnerMarquee :scrollSpeed="scrollSpeed" :showSpeed="showSpeed" :pauseOnHover="pauseOnHover" :pauseTime="pauseTime" :marqueeList="winner" height="30px" width="100%" color="#f76a24" fontSize="12px"></winnerMarquee>
                </v-flex>
            </v-layout>
        </v-toolbar>

        <!-- <v-container  class="bg-fullscreen" style="padding:0;"> -->
        <v-layout pa-1 wrap>
            <v-flex xs4 sm12 md6 lg4>
                <v-layout column>
                    <v-flex>
                        <v-layout xs12>
                            <v-flex xs12 lg4 class="text-xs-center1" style="width:100%;align-self: center;">
                                <span class="text-uppercase text-white1">{{
                    $t(`stockname.${$route.params.id}`)
                  }}</span>
                                <span class="text-yellow">010620190923140800</span>
                            </v-flex>

                            <v-flex xs12 lg8 class="text-xs-right topHeader">
                                <span style="cursor: pointer" class="button">1 {{ $t("msg.minute") }} {{ $t("msg.loop") }}</span>
                                <span style="cursor: pointer" class="button" dark color="#003e70" @click="dialogOtherstock = true">{{ $t("msg.otherstock") }}</span>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs12 sm12 md8 lg8 class="pt-2">
                        <chartApp :data="getStockById($route.params.id).stockPrice" :time="getStockById($route.params.id).stockTime" :key="getStockById($route.params.id).stockPrice[0]" :stockid="$route.params.id"></chartApp>
                    </v-flex>
                    <v-flex>
                        <v-btn dark color="#003e70" @click="$router.go(-1)">
                            <v-icon left dark class="ma-0">exit_to_app</v-icon>{{ $t("msg.exit") }}
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs12 sm12 md5 lg5>
                <v-flex>
                    <v-layout>
                        <v-flex class="text-xs-center" xs3 px-2>
                            <span class="text-gray">{{ $t("msg.Lastdraw") }}:</span>
                            <v-flex flex-style>
                                <h4 v-html="
                      $options.filters.lastDraw(
                        getStockLastDraw($route.params.id)
                      )
                    "></h4>
                            </v-flex>
                        </v-flex>
                        <v-flex class="text-xs-center" xs3 px-2>
                            <span class="text-gray">{{ $t("msg.BetClosein") }}:</span>
                            <v-flex flex-style>
                                <span class="text-yellow">{{
                    getLotteryDraw($route.params.id)
                      | betclosein(getStockLoop($route.params.id))
                  }}</span>
                            </v-flex>
                        </v-flex>
                        <v-flex class="text-xs-center" xs3 px-2>
                            <span class="text-gray">{{ $t("msg.lotterydraw") }}:</span>
                            <v-flex flex-style>
                                <span class="text-yellow">{{
                    getLotteryDraw($route.params.id)
                      | lotterydraw(getStockLoop($route.params.id))
                  }}</span>
                            </v-flex>
                        </v-flex>
                        <v-flex xs3 class="text-xs-right" style="align-self: flex-end;">
                            <!-- <v-btn fab dark small color="#003e70">
                <v-icon dark size="25">fa-question</v-icon>
                </v-btn>-->
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex>
                    <betButton :isFullscreen="true" :stockName="$route.params.id" :loop="getLoop($route.params.id)"></betButton>
                </v-flex>
            </v-flex>
            <v-flex xs12 lg3>
                <div class="text-center">{{ msg }}</div>
                <div style="height: calc(100% - 0%);">
                    <livestock v-if="isShow" :dataGet="chartData"></livestock>
                </div>
                <div class="setborder">
                    <span class="seticon"> <i class="fa fa-user fa-2x iconcolor" />: {{dataliveBetAll.totalUsers}}</span>
                    <span class="seticon"> <i class="fa fa-gamepad fa-2x iconcolor" /> : {{dataliveBetAll.totalBets}}</span>
                    <span class="seticon"> <i class="fa fa-money fa-2x iconcolor" /> : {{ dataliveBetAll.totalAmount ? formatToPrice(dataliveBetAll.totalAmount):formatToPrice(0)}}</span>
                </div>
            </v-flex>
            <!-- live Chart -->

            <v-flex v-if="getStockCrawlerData($route.params.id) !== ''" xs12 class="text-xs-center">
                <footerBet style=""></footerBet>
                <v-layout style="background-color:#003f70">
                    <v-flex xs12 sm12 md12 lg12 wrap>
                        <v-layout>
                            <v-flex xs12 sm12 md6 lg6>
                                <trendMapFullScreen which_one="O/E"></trendMapFullScreen>
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
        </v-layout>
    </v-container>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
import winnerMarquee from "~/components/modern/winnerMarquee";
import welcomeUser from "~/components/welcomeUser";
import betButton from "~/components/modern/betButton";
import chartApp from "~/components/modern/chart";
import footerBet from "~/components/modern/footerbet";
import trendMapFullScreen from "~/components/modern/trendMapFullScreen";
import livestock from "~/components/modern/livestock";

export default {
    layout: "fullscreen",
    data() {
        return {
            which_one: "B/S",
            trendType: "twoDigit",
            dialogOtherstock: false,
            //winner mqrquee
            winner: [
                "<span class='text-white'><i class='fa fa-bell'></i> Player 001201909101330002WIN $10000, WIN SINA 2019-09-10 14:29:36 </span>",
                "<span class='text-white'><i class='fa fa-bell'></i> Player 001201909101330002WIN $10000, WIN SINA 2019-09-10 14:29:36 </span>",
                "<span class='text-white'><i class='fa fa-bell'></i> Player 001201909101330002WIN $10000, WIN SINA 2019-09-10 14:29:36 </span>",
                "<span class='text-white'><i class='fa fa-bell'></i> Player 001201909101330002WIN $10000, WIN SINA 2019-09-10 14:29:36  </span>",
                "<span class='text-white'><i class='fa fa-bell'></i> Player 001201909101330002WIN $10000, WIN SINA 2019-09-10 14:29:36 </span>",
                "<span class='text-white'><i class='fa fa-bell'></i> Player 001201909101330002WIN $10000, WIN SINA 2019-09-10 14:29:36 </span>",
                "<span class='text-white'><i class='fa fa-bell'></i> Player 001201909101330002WIN $10000, WIN SINA 2019-09-10 14:29:36 </span>"
            ],
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
        this.getSotckId()
    },
    mounted() {
        setTimeout(() => {
            this.getliveBetCount()
            this.getliveAll()
        }, 1000);

        setInterval(() => {
            this.getliveBetCount()
            this.getliveAll()
        }, 1000);

    },

    components: {
        winnerMarquee,
        welcomeUser,
        betButton,
        chartApp,
        footerBet,
        trendMapFullScreen,
        livestock
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
        test() {
            console.warn(this.$router.history);
        },
        formatToPrice(value) {
            return `$ ${Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
        },
        async getSotckId() {
            try {
                let stcokId = await this.$axios.$get(`/api/fetchStockOnly?apikey=${this.$store.state.auth_token}`)
                stcokId.data.forEach(element => {
                    if (element.stockName == this.$route.params.id) {
                        this.stockId = element.stockId
                    }
                })
            } catch (e) {
                console.log(e)
            }
        },
        async getliveBetCount() {
            try {
                const res = await this.$axios.$get(`/api/liveBetCount?stock=${this.stockId}&loop=${this.getLoop(this.$route.params.id)}&apikey=${this.$store.state.auth_token}`);
                if (res.status == false) {
                    console.log("No Data");
                    return
                }
                for (let i = 0; i < res.data.length; i++) {
                    this.rulenew = res.data[i].totalUsers
                }
                if (res.data.length != 0 || res.data.length > this.chartData.length || this.rulenew > this.ruleold) {
                    // console.log("Okkk");
                    // this.msg = this.$root.$t('msg.betting');
                    if (this.rulenew == undefined) return
                    if (this.isShow == true && res.data.length > this.chartData.length || this.rulenew > this.ruleold) {
                        this.chartData = res.data;
                        this.isShow = false
                        for (let i = 0; i < res.data.length; i++) {
                            this.ruleold = res.data[i].totalUsers
                        }
                    } else {
                        this.chartData = res.data;
                        this.isShow = true
                    }

                } else {
                    // console.log("Nooo");
                    // this.msg = this.$root.$t('msg.nobetting');
                    // this.chartData = []

                    if (this.chartData.length != 4) {
                        this.isShow = false
                    } else {
                        this.isShow = true
                    }
                    this.chartData = [{
                            "rule": "bothdigit-big",
                            "totalAmount": "1",
                            "totalUsers": 1
                        },
                        {
                            "rule": "firstdigit-big",
                            "totalAmount": "2",
                            "totalUsers": 1
                        },
                        {
                            "rule": "lastdigit-big",
                            "totalAmount": "3",
                            "totalUsers": 1
                        },
                        {
                            "rule": "twodigit-big",
                            "totalAmount": "4",
                            "totalUsers": 1
                        }
                    ]
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getliveAll() {
            try {
                const res = await this.$axios.$get(`/api/liveBetAll?stock=${this.stockId}&loop=${this.getLoop(this.$route.params.id)}&apikey=${this.$store.state.auth_token}`);
                this.dataliveBetAll = res.data[0]
                // console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        },

    }
};
</script>

<style scoped>
.setborder {
    border: 1px solid;
    border-radius: 10px;
    position: relative;
    top: calc(100% - 108%);
    width: calc(200% - 100%);
}

.seticon {
    display: inline-block;
    width: calc(125% - 100%);
    position: relative;
    margin-left: 6px;
    font-family: fantasy;
}

.iconcolor {
    color: #003f70;
}
</style>
