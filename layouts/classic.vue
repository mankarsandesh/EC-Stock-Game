<template>
<div>
    <!-- <div ref="svgContainer" class="isLoading" v-if="getStockNewData($route.params.id).length == ''"></div> -->

    <v-toolbar fixed app light class="light-toobar">
        <v-container mx-auto py-0 px-0>
            <v-layout>
                <v-toolbar-title>
                    <nuxt-link to="/classic/l-btc1-live">
                        <v-img width="100" src="\logo.png" @click="loadchart()"></v-img>
                    </nuxt-link>
                </v-toolbar-title>
                <v-spacer />
                <v-toolbar-items v-if="$vuetify.breakpoint.smAndDown">
                    <v-btn text flat @click="$refs.language.showDialog()">
                        <countryFlag :country="countryflag" size="normal" />
                    </v-btn>
                    <v-toolbar-side-icon @click="dialog = !dialog" :elevation="0" />
                </v-toolbar-items>
                <template v-else>
                    <v-btn flat text v-for="(item, i) in menu" :key="i" :to="item.to" router exact>{{ $t(`menu.${item.title}`) }}</v-btn>
                    <v-btn text flat @click="$refs.language.showDialog()">
                        <countryFlag :country="countryflag" size="normal" />
                    </v-btn>
                    <languageDialog ref="language"></languageDialog>
                </template>

                <v-menu offset-y :close-on-content-click="false" :nudge-width="150">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" flat icon v-on="on">
                            <v-icon size="30">account_circle</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-tile>
                            <v-list-tile-title>Tnk1</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-title>Profile</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-title>Sing Out</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-layout>
        </v-container>
    </v-toolbar>

    <v-app>
        <v-toolbar class="pa-1 text-primary light-toobar">
            <v-container>
                <v-tabs icons-and-text>
                    <v-spacer></v-spacer>
                    <v-btn text flat @click="$refs.language.showDialog()">
                        <countryFlag :country="countryflag" size="normal" />
                    </v-btn>
                    <languageDialog ref="language"></languageDialog>
                    <v-toolbar-side-icon @click="drawer = !drawer" :elevation="0" />
                </v-tabs>
            </v-container>
        </v-toolbar>

        <div class="navbar container" v-if="ischangechartview">
            <ul class="main-navigation">
                <li v-for="(stock,index) in navList" :key="index" :class="stock.name == tab ? 'active':''">
                    <a href="#">
                        <span>
                            {{$t('navlist.'+stock.name)}}
                            <span class="show-icon">
                                <i class="fa fa-caret-down"></i>
                            </span>
                        </span>
                    </a>
                    <ul>
                        <li v-for="(stockType,index) in stock.children" :key="index" :class="stockType.url.split('-')[0]+stockType.url.split('-')[1] == $route.params.id.split('-')[0]+$route.params.id.split('-')[1] ? 'active':''">
                            <a router @click="$router.push('/classic/'+stockType.url), loadchart()">
                                <span>{{ $t('stockname.'+stockType.name) }}{{ stockType.name == 'btc1' ? ' 1 '+$t('msg.minute'):stockType.name == 'btc5' ? ' 5 '+$t('msg.minute'):'' }}</span>
                                <span class="show-icon">
                                    <i class="fa fa-caret-right"></i>
                                </span>
                            </a>
                            <ul>
                                <li v-for="(stockName,index) in stockType.childrens" :key="index" :class="stockName.url == $route.params.id ? 'active':''">
                                    <a router @click="$router.push('/classic/'+stockName.url), loadchart()">
                                        <span>{{ $t('listCS.'+stockName.name) }}</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        <!-- <v-toolbar align-center justify-center class="nav-tab"> -->
        <!-- <v-container mx-auto py-0 px-0> -->
        <!-- <v-layout v-if="ischangechartview">
                    <v-tabs v-model="tab" color="#384e63" grow>
                        <v-tabs-slider color="yellow"></v-tabs-slider>
                        <v-tab v-for="(items1,idx1) in navList" :key="idx1">
                            <v-menu open-on-hover offset-y transition="slide-y-transition">
                                <template v-slot:activator="{ on }">
                                    <v-btn flat dark color="white" v-on="on">{{ $t('navlist.'+items1.name )}}</v-btn>
                                </template>
                                <v-list v-if="items1.children">
                                    <v-list-tile v-for="(items2, idx2 ) in items1.children" :key="idx2">
                                        <v-menu open-on-hover offset-x transition="slide-x-transition">
                                            <template v-slot:activator="{on}">
                                                <nuxt-link :to="'/classic/'+items2.url">
                                                    <v-btn flat dark color="black" v-on="on" @click="loadchart()">{{ $t('stockname.'+items2.name) }}{{ items2.name == 'btc1' ? ' 1 '+$t('msg.minute'):items2.name == 'btc5' ? ' 5 '+$t('msg.minute'):'' }}</v-btn>
                                                </nuxt-link>
                                            </template>
                                            <v-list v-if="items2.childrens">
                                                <v-list-tile v-for="(items3, idx3 ) in items2.childrens" :key="idx3">
                                                    <v-list-tile-title>
                                                        <span router @click="$router.push('/classic/'+items3.url), loadchart()">{{ $t('listCS.'+items3.name) }}</span>
                                                    </v-list-tile-title>
                                                </v-list-tile>
                                            </v-list>
                                        </v-menu>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>
                        </v-tab>
                    </v-tabs>
                </v-layout> -->
        <!-- test -->
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Menu</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list>
                    <v-list-tile v-for="(item, i) in menu" :key="i" @click="dialog = false, item.title == 'home' ? '' : mbdialog = true, switch1 = item.to">
                        <v-list-tile-title>{{ $t(`menu.${item.title}`) }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-dialog>

        <v-dialog v-model="mbdialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>

                <v-toolbar>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn icon flat color="error" dark @click="mbdialog = false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list v-if="switch1.split('-')[3] == 'currentbet'">
                    <currentbet />
                </v-list>
                <v-list v-else-if="switch1.split('-')[3] == 'history'">
                    <history />
                </v-list>
                <v-list v-else-if="switch1.split('-')[3] == 'gameresult'">
                    <gameresult />
                </v-list>
                <v-list v-else-if="switch1.split('-')[3] == 'announcement'">
                    <announcement />
                </v-list>
                <v-list v-else-if="switch1.split('-')[3] == 'rule'">
                    <rule />
                </v-list>
                <v-list v-else-if="switch1.split('-')[3] == 'setting'">
                    <setting />
                </v-list>
                <v-list v-else>

                </v-list>
            </v-card>
        </v-dialog>
        <!-- </v-container> -->
        <!-- </v-toolbar> -->

        <v-content pa-0 sx-0>
            <div class="btn-chart-change set-chart-change" v-if="!$vuetify.breakpoint.smAndDown">
                <button @click="ischangechartview = !ischangechartview">
                    <span class="text-orientation">{{$t('msg.changechartview')}}</span>
                </button>
            </div>
            <button class="open off" @click="ischangechartview = !ischangechartview" hidden></button>

            <!-- charts -->
            <v-tabs-items v-model="tab">
                <v-container pa-0 v-if="show1">
                    <livechart :StockData="getStockNewData($route.params.id)" :checkStock="checkStock" v-if="checkStock == 'live' && ischangechartview" />
                    <liveevens :StockData="getStockNewData($route.params.id)" :checkStock="checkStock" v-else-if="checkStock !== 'live' && ischangechartview" />

                    <div v-else>
                        <v-tabs class="bg-colors" v-model="currentItems" color="transparent" fixed-tabs slider-color="yellow" grow>
                            <v-tab class="text-sm-left text-whites" @click="loadtable()" v-for="(baccarat1, idx1) in baccarat" :key="idx1" :href="'#tab-' + baccarat1.name">{{ $t('gamemsg.'+baccarat1.name) }}</v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="currentItems">
                            <v-tab-item v-for="(baccarat1, idx3) in baccarat" :key="idx3" :value="'tab-' + baccarat1.name">
                                <v-card flat>
                                    <v-tabs class="bg-colors" v-model="currentItemss" color="transparent" fixed-tabs slider-color="yellow" grow>
                                        <v-tab class="text-sm-left text-whites" @click="loadtable()" v-for="(baccarat2, idx11) in baccarat1.children" :key="idx11" :href="'#' + baccarat2.name">{{ $t('gamemsg.'+baccarat2.name) }}</v-tab>
                                    </v-tabs>
                                    <baccarats :chtable="baccarat1.namech" :chlists="baccarat1.namech+'-'+currentItemss" :dataArray="getStockNewData($route.params.id)" v-if="showtable" />
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </div>
                </v-container>
            </v-tabs-items>
            <!-- end charts -->

            <!-- Data Lastdraw and Timer -->
            <v-container pa-2>
                <v-layout>
                    <v-flex xs12 sm12>
                        <div class="float-right">
                            <dataslastdraw :StockData="getStockNewData($route.params.id)" :Reference="getReference($route.params.id)" :checkStock="checkStock" v-if="show1" />
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
            <!-- Data Lastdraw and Timer -->

            <v-container pa-0 pb-1 :style="$vuetify.breakpoint.smAndDown ? 'margin-top: -8.5%;':''">
                <v-layout class="remove-flex">
                    <v-flex xs12 sm3 pl-1 pr-1>
                        <listleft />
                    </v-flex>
                    <v-flex xs12 sm9>
                        <nuxt />
                    </v-flex>
                </v-layout>
            </v-container>

            <v-container pa-0 pb-2>
                <v-footer color="#384e63" height="80">
                    <v-flex text-xs-center xs12 white--text>
                        &copy; Copyright {{ new Date().getFullYear() }} TNK - All Rights Reserved
                    </v-flex>

                </v-footer>
            </v-container>
        </v-content>
    </v-app>
    <v-btn v-scroll="onScroll" :class="$vuetify.breakpoint.smAndDown ? 'scrolltop':''" v-show="fab" small fab dark fixed bottom right color="blue" @click="toTop">
        <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions,
    mapMutations
} from "vuex";

import countryFlag from "vue-country-flag";
import languageDialog from "~/components/LanguageDialog";
import openSocket from "socket.io-client";
import i18n from "vue-i18n";
import livechart from "~/components/classic/livechart";
import liveevens from "~/components/classic/evenchart";
import dataslastdraw from "~/components/classic/dataslastdraw";
import listleft from "~/components/classic/list-left";

import stockbtc from "~/data/json/menustockbtc.json";
import stockusindex from "~/data/json/menustockusindex.json";
import stockchina from "~/data/json/menustockchina.json";

import baccarat from "~/data/json/baccarat.json";
import baccarats from "~/components/classic/baccarats";
import navbar from "~/components/classic/navbar";

import currentbet from "~/pages/classic/current-bet";
import history from "~/pages/classic/history";
import gameresult from "~/pages/classic/game-result";
import announcement from "~/pages/classic/announcement";
import rule from "~/pages/classic/rule";
import setting from "~/pages/classic/setting";
import lottie from "lottie-web";
export default {
    components: {
        countryFlag,
        languageDialog,
        livechart,
        liveevens,
        listleft,
        dataslastdraw,
        baccarats,
        navbar,

        currentbet,
        history,
        gameresult,
        announcement,
        rule,
        setting,
    },
    data() {
        return {
            mbdialog: false,
            switch1: "",
            currentItemss: null,
            urrentItemss: null,
            currentItems: "tab-Big-Small",
            menu: [],
            stockbtc: stockbtc,
            stockusindex: stockusindex,
            stockchina: stockchina,
            navList: null,
            checkStockList: null,
            stockname: "btc1",
            checkStock: "live",
            tab: null,
            show1: true,
            clipped: false,
            drawer: false,
            right: true,
            rightDrawer: false,
            title: "EC gaming",
            ischangechartview: true,
            baccarat: baccarat,
            showtable: true,

            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            fab: false,
            isLoad: true
        };
    },
    created() {
        this.setLanguage();
    },
    mounted() {
        lottie.loadAnimation({
            container: this.$refs.svgContainer, // the dom element that will contain the animation
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "https://assets7.lottiefiles.com/packages/lf20_JbdOay.json" // the path to the animation json
        });
        $("#switch").text(this.switch1)
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 2000);
        this.loadchart();
        this.getMenu();
        $(".isLoadChart").click(() => {
            this.loadchart();
        });
        // this.asynInitCallApi();
        // websocket broadcast live time and timer
        const socket = openSocket("https://websocket-timer.herokuapp.com");
        socket.on("time", data => {
            this.getNavbar(data);
            this.getAtivetab();
        });
    },
    computed: {
        ...mapGetters([
            "getBalance",
            "getStockLength",
            "getlocale",
            "getStockNewData",
            "getReference",
            "getstockname"
        ]),
        countryflag() {
            return this.getlocale;
        }

    },
    methods: {
        ...mapActions(["asynInitCallApi"]),
        ...mapMutations(["SET_LANG", "SET_TIME"]),
        setLanguage() {
            let lang = localStorage.getItem("lang");
            if (lang == null) {
                this.SET_LANG("cn");
                localStorage.setItem("lang", this.getlocale);
            }
        },
        getNavbar(data) {
            if (data.usindex.timer != 'close' && data.sh000001.timer == 'close') {
                this.navList = this.stockusindex
            } else if (data.usindex.timer != 'close' && data.sh000001.timer != 'close') {
                this.navList = this.stockchina
            } else {
                this.navList = this.stockbtc
            }
        },
        getMenu() {
            let mn =
                this.$route.params.id.split("-")[0] +
                "-" +
                this.$route.params.id.split("-")[1] +
                "-" +
                this.$route.params.id.split("-")[2];
            this.menu = [{
                    icon: "apps",
                    title: "home",
                    to: "/classic/" + mn
                },
                {
                    icon: "bubble_chart",
                    title: "current bet",
                    to: "/classic/" + mn + "-currentbet"
                },
                {
                    icon: "bubble_chart",
                    title: "history",
                    to: "/classic/" + mn + "-history"
                },
                {
                    icon: "bubble_chart",
                    title: "game result",
                    to: "/classic/" + mn + "-gameresult"
                },
                {
                    icon: "bubble_chart",
                    title: "rule",
                    to: "/classic/" + mn + "-rule"
                },
                {
                    icon: "bubble_chart",
                    title: "announcement",
                    to: "/classic/" + mn + "-announcement"
                },
                {
                    icon: "bubble_chart",
                    title: "setting",
                    to: "/classic/" + mn + "-setting"
                }
            ];
        },
        loadchart() {
            this.show1 = false;
            this.getMenu();
            setTimeout(() => {
                this.show1 = true;
                this.stockname = this.$route.params.id.split("-")[1];
                this.checkStock = this.$route.params.id.split("-")[2];
            }, 100);
            setTimeout(() => {
                this.$vuetify.goTo(0)
            }, 1500);
        },
        loadtable() {
            this.showtable = false;
            setTimeout(() => {
                this.showtable = true;
                this.stockname = this.$route.params.id.split("-")[1];
                this.checkStock = this.$route.params.id.split("-")[2];
            }, 100);
        },
        getAtivetab() {
            this.checkStockList = this.$route.params.id.split("-")[0] + "-" + this.$route.params.id.split("-")[1];
            if (this.checkStockList == "l-" + this.$route.params.id.split("-")[1]) this.tab = "live Stock";
            else if (this.checkStockList == "st-usindex") this.tab = "Us Stock";
            else if (this.checkStockList == "st-btc1" || this.checkStockList == "st-btc5") this.tab = "Cypto Currency";
            else this.tab = "China Stocck";
        },
        onScroll(e) {
            if (typeof window === 'undefined') return
            const top = window.pageYOffset || e.target.scrollTop || 0
            this.fab = top > 20
        },
        toTop() {
            this.$vuetify.goTo(0)
        }
    }

};
</script>

<style scoped>
.scrolltop {
    bottom: 15%;
}
.isLoading{
    z-index: 10000;
    position: absolute;
    background-color: #374c60ed;
    height: 100%;
    width: 100%;
    pointer-events: none;
}

.btn-chart-change {
    width: 1.5% !important;
    position: absolute;
    top: 4%;
    z-index: 1;
    background: #ec008c;
    background: linear-gradient(to right, #384e63, #5b80a4);
    color: #fff;
    border-radius: 10px;
    border: none;
    text-transform: capitalize;
    padding: 3px 7px;
}

@media only screen and (min-width: 1920px) {
    .set-chart-change {
        left: 4.7%;
    }
}

@media only screen and (min-width: 2260px) {
    .set-chart-change {
        left: 12.9%;
    }
}

.text-orientation {
    writing-mode: vertical-lr;
    text-orientation: mixed;
}

.total_classic {
    background: linear-gradient(to right, #e91e63, #ff5722);
    color: #fff;
    border: none;
    text-transform: capitalize;
}

.float-right {
    float: right;
}

.Reference {
    border: 1px solid #ffc107;
    padding: 4px 10px;
    border-radius: 10px;
    cursor: pointer;
    background-color: #384e63;
    color: #fff;
}

.timer {
    border: 1px solid #ffc107;
    padding: 4px 6px;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
}

.btn-countdown {
    background-color: transparent;
    width: 100%;
    padding: 4px;
    font-size: 0.8rem;
    border-color: #ff9b39;
    border-radius: 5px;
}

.btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn:not(:disabled):not(.disabled) {
    cursor: pointer;
}

/* ////////////////////////////////////////////// */

.active {
    border-bottom-style: inset;
    border-bottom-color: #ffd332;
}

.navbar {
    padding: 0 !important;
    flex: 0 1 4% !important;
    text-transform: uppercase;
}

.show-icon {
    position: absolute;
    right: 10px;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
    background: #384e63;
}

ul li {
    display: block;
    width: 100%;
    position: relative;
    float: left;
    background: #384e63;
}

li ul {
    display: none;
    min-width: 61%;
}

ul li a {
    display: block;
    width: 100%;
    padding: 0.6em;
    text-decoration: none;
    white-space: nowrap;
    color: #fff;
}

ul li a:hover {
    background: #384e63;
}

li:hover>ul {
    display: block;
    position: absolute;
}

li:hover li {
    float: none;
}

li:hover a {
    background: #384e63;
}

li:hover li a:hover {
    background: #1b405f;
}

.main-navigation {
    display: -webkit-box;
    width: 25%;
    /* text-align: center; */
}

.main-navigation li ul li {
    border-top: 0;
    z-index: 1000;
}

ul ul ul {
    left: 100%;
    top: 0;
}

ul:before,
ul:after {
    content: " ";
    /* 1 */
    display: table;
    /* 2 */
}

ul:after {
    clear: both;
}
</style>
