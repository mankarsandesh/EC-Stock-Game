<template>
<div>
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

        <v-toolbar align-center justify-center class="nav-tab">
            <v-container mx-auto py-0 px-0>

                <v-layout v-if="ischangechartview">
                    <v-tabs v-model="tab" color="cyan" grow>
                        <v-tabs-slider color="yellow"></v-tabs-slider>
                        <v-tab v-for="(items1,idx1) in navList" :key="idx1">
                            <v-menu open-on-hover offset-y transition="slide-y-transition">
                                <template v-slot:activator="{ on }">
                                    <v-btn flat dark color="white" v-on="on">{{ $t('navlist.'+items1.name )}}</v-btn>
                                </template>
                                <v-list v-if="items1.children">
                                    <v-list-tile v-for="(items2, idx2 ) in items1.children" :key="idx2">
                                        <v-menu open-on-hover  offset-x transition="slide-x-transition">
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
                </v-layout>
                <!-- test -->

                <!-- <v-layout v-if="ischangechartview">
                    <v-tabs color="cyan" grow>
                        <v-tabs-slider color="yellow" grow></v-tabs-slider>
                        <v-tab v-for="(item,i) in navList" :key="i" :href="'#' + item.name">
                            {{ $t('navlist.'+item.name) }}
                        </v-tab>

                        <v-tabs-items>
                            <v-tab-item v-for="(item,i) in navList" :key="i" v-model="item.name">
                                <v-card flat>
                                    <v-tabs color="cyan" grow>
                                        <v-tabs-slider color="yellow" grow></v-tabs-slider>
                                        <v-tab v-for="(item2,i) in item.children" :key="i" :href="'#' + item2.name" @click="$router.push('/classic/'+item2.url), loadchart()">
                                            {{$t('stockname.'+item2.name)}}{{ item2.name == 'btc1' ? ' 1 '+$t('msg.minute'):item2.name == 'btc5' ? ' 5 '+$t('msg.minute'):'' }}
                                        </v-tab>

                                        <v-tabs-items>
                                            <v-tab-item v-for="(item2,i) in item.children" :key="i" v-model="item2.name">
                                                <v-card flat>

                                                    <v-tabs color="cyan" grow>
                                                        <v-tabs-slider color="yellow" grow></v-tabs-slider>
                                                        <v-tab v-for="(item3,i) in item2.childrens" :key="i" @click="$router.push('/classic/'+item3.url), loadchart()">
                                                            {{$t('listCS.'+item3.name)}}
                                                        </v-tab>

                                                    </v-tabs>

                                                </v-card>
                                            </v-tab-item>
                                        </v-tabs-items>
                                    </v-tabs>

                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-tabs>
                </v-layout> -->

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
                            <v-list-tile v-for="(item, i) in menu" :key="i" :to="item.to" @click="dialog = false">
                                <v-list-tile-title>{{ $t(`menu.${item.title}`) }}</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-dialog>
            </v-container>
        </v-toolbar>

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
                    <livechart :stocks="stockname" :StockData="getStockNewData($route.params.id)" :checkStock="checkStock" v-if="checkStock == 'live' && ischangechartview" />
                    <liveevens :stocks="stockname" :StockData="getStockNewData($route.params.id)" :checkStock="checkStock" v-else-if="checkStock !== 'live' && ischangechartview" />

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
                                    <baccarats :chtable="baccarat1.namech" :chlists="baccarat1.namech+'-'+currentItemss" :dataArray="getStockNewData($route.params.id)" :stocks="stockname" v-if="showtable" />
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
                            <dataslastdraw :stocks="stockname" :StockData="getStockNewData($route.params.id)" :Reference="getReference($route.params.id)" :checkStock="checkStock" v-if="show1" />
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
            <!-- Data Lastdraw and Timer -->

            <v-container pa-0 pb-1>
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
export default {
    components: {
        countryFlag,
        languageDialog,
        livechart,
        liveevens,
        listleft,
        dataslastdraw,
        baccarats
    },
    data() {
        return {
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
            widgets: false
        };
    },
    created() {
        this.setLanguage();
    },
    mounted() {
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 1000);
        this.loadchart();
        this.getMenu();
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
            if (data.usindex.timer != 'close' && data.SH000001.timer == 'close') {
                this.navList = this.stockusindex
            } else if (data.usindex.timer != 'close' && data.SH000001.timer != 'close') {
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
                this.$route.params.id.split("-")[2] +
                "-";
            this.menu = [{
                    icon: "apps",
                    title: "home",
                    to: "/classic/l-btc1-live"
                },
                {
                    icon: "bubble_chart",
                    title: "current bet",
                    to: "/classic/" + mn + "currentbet"
                },
                {
                    icon: "bubble_chart",
                    title: "history",
                    to: "/classic/" + mn + "history"
                },
                {
                    icon: "bubble_chart",
                    title: "game result",
                    to: "/classic/" + mn + "gameresult"
                },
                {
                    icon: "bubble_chart",
                    title: "rule",
                    to: "/classic/" + mn + "rule"
                },
                {
                    icon: "bubble_chart",
                    title: "announcement",
                    to: "/classic/" + mn + "announcement"
                },
                {
                    icon: "bubble_chart",
                    title: "setting",
                    to: "/classic/" + mn + "setting"
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
                this.getMenu();
            }, 50);
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 1200);
        },
        loadtable() {
            this.showtable = false;
            setTimeout(() => {
                this.showtable = true;
                this.stockname = this.$route.params.id.split("-")[1];
                this.checkStock = this.$route.params.id.split("-")[2];
            }, 50);
        },
        getAtivetab() {
            this.checkStockList =
                this.$route.params.id.split("-")[0] +
                "-" +
                this.$route.params.id.split("-")[1];
            if (this.$route.params.id.split("-")[0] == "l") {
                this.tab = 0;
            } else if (this.checkStockList == "st-usindex") {
                this.tab = 1;
            } else if (
                this.checkStockList == "st-btc1" ||
                this.checkStockList == "st-btc5"
            ) {
                this.tab = 2;
            } else {
                this.tab = 3;
            }
        }
    }

};
</script>

<style scoped>
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
</style>
