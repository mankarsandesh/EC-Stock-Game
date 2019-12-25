<template>
<div>
    <v-layout>
        <v-flex xs2 pa-2>
            <v-layout column>
                <v-flex xs12 pt-2 style="padding-top:21px !important">
                    <div id="stocklistGuidelines">
                        <stockList></stockList>
                    </div>
                </v-flex>
                <v-flex xs12 pt-2>
                    <div id="betresultGuidelines">
                        <betResultAllResult></betResultAllResult>
                    </div>
                </v-flex>
                <v-flex xs12 pt-2>
                    <div id="bettingGuidelines">
                        <onBetting></onBetting>
                    </div>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs10 pa-2>
            <v-layout>
                <v-flex xs6 style="padding-top:21px">
                    <v-layout column>
                        <v-flex xs12>
                            <div id="selectstockGuideline">
                                <selectStock :stockId="$route.params.id"></selectStock>
                            </div>
                        </v-flex>
                        <v-flex pt-1 v-if="getStockById($route.params.id).stockPrice.length>0">
                            <div id="chartGuideline">
                                <v-flex style="height:421px">
                                    <chartApp :data="getStockById($route.params.id).stockPrice" :time="getStockById($route.params.id).stockTime" :key="getStockById($route.params.id).stockPrice[0]" :stockid="$route.params.id"></chartApp>
                                </v-flex>
                            </div>
                            <v-layout>
                                <v-flex class="layout-bottom">
                                    <div id="fullscreenGuidelines">
                                        <v-btn dark color="#003e70" :to="'/modern/fullscreen/' +$route.params.id">
                                            <v-icon left dark class="ma-0">fullscreen</v-icon>
                                            {{$t('msg.fullscreenmode')}}
                                        </v-btn>
                                    </div>
                                    <div id="multiGuideline">
                                        <v-btn dark :to="'/modern/multigame/' +$route.params.id" color="#003e70">{{$t('msg.Multiplegaming')}}</v-btn>
                                    </div>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex xs6 class="mx-2">
                    <v-layout>
                        <v-flex class="text-xs-center" px-2>
                            <span>{{$t('msg.Lastdraw')}}:</span>
                            <div id="lastDrawGuideline">
                                <v-flex flex-style>
                                    <span v-html="$options.filters.lastDraw(getStockLastDraw($route.params.id))"></span>
                                </v-flex>
                            </div>
                        </v-flex>
                        <!-- <v-spacer></v-spacer> -->
                        <v-flex class="text-xs-center" px-2>

                            <span>{{$t('msg.BetClosein')}}:</span>
                            <div id="betCloseInGuideline">
                                <v-flex flex-style>
                                    <span class="text-yellow">{{getLotteryDraw($route.params.id) | betclosein(getStockLoop($route.params.id))}}</span>

                                </v-flex>
                            </div>
                        </v-flex>
                        <v-flex class="text-xs-center" px-2>
                            <span>{{$t('msg.lotterydraw')}}:</span>
                            <div id="lotteryDrawGuidelines">
                                <v-flex flex-style>
                                    <span class="text-yellow">{{getLotteryDraw($route.params.id) | lotterydraw(getStockLoop($route.params.id))}}</span>
                                </v-flex>
                            </div>
                        </v-flex>
                        <v-flex xs2 class="text-xs-right" style="align-self: flex-end;">
                            <v-btn fab dark small color="#003e70" @click="setTutorial">
                                <v-icon dark size="25">fa-question</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                    <div id="betRuleButton">
                        <betButton :stockName="$route.params.id" :loop="getLoop($route.params.id)"></betButton>
                    </div>
                </v-flex>
            </v-layout>

            <v-flex xs12 v-if="getStockCrawlerData($route.params.id) !== ''">
                <div v-for="(trendType, index) in trendTypes" :key="index">
                    <hr v-if="index > 0" />
                    <div id="trendmapGuidelines">
                        <tableTrendMap></tableTrendMap>
                    </div>
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
    <div ref="guideline" class="overlay">
        <a class="closebtn" @click="closeGuideline()">&times;</a>
    </div>
    <div hidden ref="guidelineContent" class="overlay-content">
        <!-- bet rule title -->
        <div ref="betTitleGuideline" style="position:fixed">
            <div class="d-flex">
                <p class="float-right guideline">Choose which you want to bets</p>
                <div class="arrow float-left line-my">&#8631;</div>
            </div>
        </div>
        <!-- bet rule -->
        <div ref="betguideline" style="position:fixed"></div>
        <!-- fullscreen -->
        <div ref="fullScreenGuideline" style="position:fixed">
            <div class="d-flex">
                <p class="float-right guideline">Click to enter full screen mode</p>
                <div class="arrow float-left line-my">&#8605;</div>
            </div>
        </div>
        <!-- select stock -->
        <div ref="selectGuideline" style="position:fixed">
            <div class="d-flex">
                <p class="float-right guideline">Select other stock games</p>
                <div class="arrow float-left line-my">&#8628;</div>
            </div>
        </div>
        <!-- chart -->
        <div ref="chartGuideline" style="position:fixed;">
            <div class="d-flex">
                <p class="float-right guideline">This is the chart that show a amount of the stock</p>
                <div class="arrow float-left line-my">&#8631;</div>
            </div>
        </div>
        <!-- last draw -->
        <div ref="lastDrawtGuideline" style="position:fixed">
            <div class="d-flex">
                <p class="float-right guideline">The lastest result</p>
                <div class="arrow float-left line-my">&#8628;</div>
            </div>
        </div>
        <!-- stock list -->
        <div ref="stocklistGuideline" style="position:fixed">
            <div class="d-flex">
                <p class="float-right guideline">The stock list</p>
                <div class="arrow float-left line-my">&#8628;</div>
            </div>
        </div>
        <!-- betresult -->
        <div ref="betresultGuideline" style="position:fixed">
            <div class="d-flex">
                <p class="float-right guideline">The bet result</p>
                <div class="arrow float-left line-my">&#8628;</div>
            </div>
        </div>
        <!-- betting -->
        <div ref="bettingGuideline" style="position:fixed">
            <div class="d-flex">
                <p class="float-right guideline">The betting</p>
                <div class="arrow float-left line-my">&#8628;</div>
            </div>
        </div>
        <!-- trendmap -->
        <div ref="trendmapGuideline" style="position:fixed">
            <div class="d-flex">
                <p class="float-left guideline">The bacarats</p>
                <div class="arrow float-left line-my">&#8628;</div>
            </div>
        </div>
        <!-- multi game -->
        <div ref="multigameGuideline" style="position:fixed">
            <div class="d-flex">
                <div class="arrow float-left line-my">&#8630;</div>
                <div>
                    <p class="float-right guideline">Countdown to the result</p>
                </div>
            </div>
        </div>

        <!-- bet close in -->
        <div ref="betCloseInGuideline" style="position:fixed">
            <div class="d-block">
                <div style="position: relative">
                    <p class="float-right guideline">Countdown to close bet</p>
                </div>
                <div class="arrow float-left line-my">&#8601;</div>
            </div>
        </div>
        <!-- lottery draw -->
        <div ref="lotteryDrawGuideline" style="position:fixed">
            <div class="d-flex">
                <div class="arrow float-left line-my">&#8630;</div>
                <div>
                    <p class="float-right guideline">Countdown to the result</p>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import {
    mapActions,
    mapGetters,
    mapMutations
} from "vuex";
import stockList from "~/components/modern/stockList";
import betResultAllResult from "~/components/modern/betResultAllResult";
import onBetting from "~/components/modern/onBetting";
import betButton from "~/components/modern/betButton";
import chartApp from "~/components/modern/chart";
import tableTrendMap from "~/components/modern/tableTrendMap";
import selectStock from "~/components/modern/selectStock";

export default {
    async validate({
        params,
        store
    }) {
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
            fabActions: [{
                    name: 'cache',
                    icon: 'cached'
                },
                {
                    name: 'alertMe',
                    icon: 'add_alert'
                }
            ],
            items: [{
                    title: "Click Me"
                },
                {
                    title: "Click Me"
                },
                {
                    title: "Click Me"
                },
                {
                    title: "Click Me 2"
                }
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
        let vm = this;
        $(document).ready(function () {
            $(window).resize(function () {
                if (vm.$refs.guidelineContent.hidden == false) {
                    vm.setTutorial()
                }
            });
        });
        // setTimeout(() => {
        //     this.setTutorial()
        // }, 1500)
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
        },
        setTutorial() {
            this.$refs.guidelineContent.hidden = false;
            let w = window.innerWidth;

            // bet rule
            let ruleG = $("#betRuleButton").offset();
            let width = $("#betRuleButton").width();
            let height = $("#betRuleButton").height();
            $(this.$refs.betguideline).css("width", width + 5);
            $(this.$refs.betguideline).css("height", height + 5);
            $(this.$refs.betguideline).css("border-style", "solid");
            $(this.$refs.betguideline).css("border-color", "coral");
            $(this.$refs.betguideline).css("left", ruleG.left);
            $(this.$refs.betguideline).css("top", ruleG.top);
            // bet title
            $(this.$refs.betTitleGuideline).css("right", (w - ruleG.left) - 25);
            // $(this.$refs.betTitleGuideline).css("top", ruleG.top + 50);

            // end bet rule

            let selectG = $("#selectstockGuideline").offset();
            $("#selectstockGuideline").css("border-style", "solid");
            $("#selectstockGuideline").css("border-color", "coral");
            $(this.$refs.selectGuideline).css("left", selectG.left);
            $(this.$refs.selectGuideline).css("top", selectG.top - 50);

            let chartG = $("#chartGuideline").offset();
            $("#chartGuideline").css("border-style", "solid");
            $("#chartGuideline").css("border-color", "coral");
            $(this.$refs.chartGuideline).css("left", chartG.left - 370);
            $(this.$refs.chartGuideline).css("top", chartG.top + 20);

            let lastG = $("#lastDrawGuideline").offset();
            $("#lastDrawGuideline").css("border-style", "solid");
            $("#lastDrawGuideline").css("border-color", "coral");
            $(this.$refs.lastDrawtGuideline).css("right", (w - lastG.left) - 60);
            $(this.$refs.lastDrawtGuideline).css("top", lastG.top - 50);

            let stockG = $("#stocklistGuidelines").offset();
            $("#stocklistGuidelines").css("border-style", "solid");
            $("#stocklistGuidelines").css("border-color", "coral");
            $(this.$refs.stocklistGuideline).css("right", (w - stockG.left) - 60);
            $(this.$refs.stocklistGuideline).css("top", stockG.top - 50);

            let betresultG = $("#betresultGuidelines").offset();
            $("#betresultGuidelines").css("border-style", "solid");
            $("#betresultGuidelines").css("border-color", "coral");
            $(this.$refs.betresultGuideline).css("right", (w - betresultG.left) - 60);
            $(this.$refs.betresultGuideline).css("top", betresultG.top - 50);

            let bettingG = $("#bettingGuidelines").offset();
            $("#bettingGuidelines").css("border-style", "solid");
            $("#bettingGuidelines").css("border-color", "coral");
            $(this.$refs.bettingGuideline).css("right", (w - bettingG.left) - 60);
            $(this.$refs.bettingGuideline).css("top", bettingG.top - 50);

            let trendmapG = $("#trendmapGuidelines").offset();
            $("#trendmapGuidelines").css("border-style", "solid");
            $("#trendmapGuidelines").css("border-color", "coral");
            $(this.$refs.trendmapGuideline).css("right", (trendmapG.left) - 310);
            $(this.$refs.trendmapGuideline).css("top", trendmapG.top - 10);

            const fullG = $("#fullscreenGuidelines").offset();
            $("#fullscreenGuidelines").css("border-style", "solid");
            $("#fullscreenGuidelines").css("border-color", "coral");
            $(this.$refs.fullScreenGuideline).css("right", (w - fullG.left) - 30);
            $(this.$refs.fullScreenGuideline).css("top", fullG.top + 20);

            let betG = $("#betCloseInGuideline").offset();
            $("#betCloseInGuideline").css("border-style", "solid");
            $("#betCloseInGuideline").css("border-color", "coral");
            $(this.$refs.betCloseInGuideline).css("left", betG.left + 70);
            $(this.$refs.betCloseInGuideline).css("top", betG.top - 70);

            let multiG = $("#multiGuideline").offset();
            $("#multiGuideline").css("border-style", "solid");
            $("#multiGuideline").css("border-color", "coral");
            $(this.$refs.multigameGuideline).css("left", multiG.left + 150);
            $(this.$refs.multigameGuideline).css("top", multiG.top - 5);

            let lotteryDrawG = $("#lotteryDrawGuidelines").offset();
            $("#lotteryDrawGuidelines").css("border-style", "solid");
            $("#lotteryDrawGuidelines").css("border-color", "coral");
            $(this.$refs.lotteryDrawGuideline).css("left", lotteryDrawG.left + 100);
            $(this.$refs.lotteryDrawGuideline).css("top", lotteryDrawG.top);

            this.$refs.guideline.style.height = "100%";
            document.documentElement.style.overflow = "hidden";
            window.scrollTo(0, 0);

        },
        closeGuideline() {
            $(".fa-question-circle").show();
            this.$refs.guidelineContent.hidden = true;
            this.$refs.guideline.style.height = "0%";
            document.documentElement.style.overflow = "visible";
            $("#selectstockGuideline").css("border-style", "none");
            $("#chartGuideline").css("border-style", "none");
            $("#lastDrawGuideline").css("border-style", "none");
            $("#stocklistGuidelines").css("border-style", "none");
            $("#betresultGuidelines").css("border-style", "none");
            $("#bettingGuidelines").css("border-style", "none");
            $("#trendmapGuidelines").css("border-style", "none");
            $("#fullscreenGuidelines").css("border-style", "none");
            $("#betCloseInGuideline").css("border-style", "none");
            $("#multiGuideline").css("border-style", "none");
            $("#lotteryDrawGuidelines").css("border-style", "none");
        },
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
.layout-bottom {
    position: absolute;
    bottom: calc(100% - 568px);
    display: inherit;
}

.overlay {
    height: 0%;
    width: 100%;
    position: fixed;
    z-index: 10000;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.9);
    overflow-y: hidden;
    transition: 0.5s;
    opacity: 0.7;
}

.overlay-content {
    position: absolute;
    top: 25%;
    width: 100%;
    text-align: center;
    margin-top: 30px;
    opacity: 1;
    z-index: 10001;
    color: #ffffff;
}

.overlay a {
    padding: 8px;
    text-decoration: none;
    font-size: 36px;
    color: #818181;
    display: block;
    transition: 0.3s;
}

.overlay a:hover,
.overlay a:focus {
    color: #f1f1f1;
}

.overlay .closebtn {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 45px;
    font-size: 60px;
}

.border-color-coral {
    border-color: coral;
}

.arrow {
    font-size: 100px;
    color: #f44336 !important;
}

.line-my {
    line-height: 0.3 !important;
}

p.guideline {
    background-color: #ddd;
    color: #000;
    border-radius: 7px;
    padding: 6px;
}

</style>
