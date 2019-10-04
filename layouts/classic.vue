<template>
<v-app>
    <v-toolbar class="pa-1 text-primary light-toobar">
        <v-container>
            <v-tabs icons-and-text>
                <v-flex pt-3>
                    <nuxt-link to="/classic/l-btc1-live">
                        <v-toolbar-title>
                            <v-img width="100" src="\logo.png" @click="loadchart()"></v-img>
                        </v-toolbar-title>
                    </nuxt-link>
                </v-flex>
                <v-tab v-for="(item, i) in menu" :key="i" :to="item.to" router exact>{{ $t(`menu.${item.title}`) }}</v-tab>
                <v-spacer></v-spacer>
                <v-btn text flat @click="$refs.language.showDialog()">
                    <countryFlag :country="countryflag" size="normal" />
                </v-btn>
                <languageDialog ref="language"></languageDialog>
                <v-toolbar-side-icon @click="drawer = !drawer" :elevation="0" />
            </v-tabs>
        </v-container>
    </v-toolbar>

    <v-toolbar align-center justify-center>
        <v-tabs v-model="tab" color="cyan" grow>
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab v-for="(items1,idx1) in navList" :key="idx1">
                <v-menu open-on-click offset-y transition="slide-x-transition">
                    <template v-slot:activator="{ on }">
                        <v-btn flat dark color="white" v-on="on">{{ $t('navlist.'+items1.name )}}</v-btn>
                    </template>
                    <v-list v-if="items1.children">
                        <v-list-tile v-for="(items2, idx2 ) in items1.children" :key="idx2">
                            <v-menu open-on-hover offset-x transition="slide-x-transition">
                                <template v-slot:activator="{on}">
                                    <nuxt-link :to="'/classic/'+items2.url">
                                        <v-btn flat dark color="black" v-on="on" @click="loadchart()">{{ items2.name }}</v-btn>
                                    </nuxt-link>
                                </template>
                                <v-list v-if="items2.childrens">
                                    <v-list-tile v-for="(items3, idx3 ) in items2.childrens" :key="idx3">
                                        <v-list-tile-title>
                                            <span router @click="$router.push('/classic/'+items3.url), loadchart()">{{ items3.name }}</span>
                                        </v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-tab>
        </v-tabs>
    </v-toolbar>

    <v-content pa-0>
        <!-- charts -->
        <v-tabs-items v-model="tab">
            <v-container pa-0 v-if="show1">
                <livechart :stocks="StockName" :StockData="getStockNewData($route.params.id)" :checkStock="checkStock" v-if="checkStock == 'live'" />
                <liveevens :stocks="StockName" :checkStock="checkStock" v-if="checkStock !== 'live'" />
            </v-container>
        </v-tabs-items>
        <!-- end charts -->

        <!-- Data Lastdraw and Timer -->
        <v-container>
            <div class="float-right">
                <dataslastdraw :stocks="StockName" :StockData="getStockNewData($route.params.id)" :Reference="getReference($route.params.id)" :checkStock="checkStock" v-if="show1" />
            </div>
        </v-container>
        <!-- Data Lastdraw and Timer -->

        <v-container>
            <v-layout class="remove-flex">
                <v-flex xs12 sm3 pr-2>
                    <listleft />
                </v-flex>
                <v-flex xs12 sm9>
                    <nuxt />
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</v-app>
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
import livechart from "~/components/classic/chart";
import liveevens from "~/components/classic/charts";
import dataslastdraw from "~/components/classic/dataslastdraw";
import listleft from "~/components/classic/list-left";
import navList from "~/data/json/menu.json";
export default {
    components: {
        countryFlag,
        languageDialog,
        livechart,
        liveevens,
        listleft,
        dataslastdraw
    },
    data() {
        return {
            items: ["web", "shopping", "videos", "images", "news"],
            text: "Lorem i",
            navList: navList,
            checkStockList: null,
            StockName: "btc1",
            checkStock: "live",
            tab: null,
            tab1: null,
            tab2: null,
            show1: true,
            clipped: false,
            drawer: false,
            fixed: false,
            menu: [],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: "EC gaming"
        };
    },

    created() {
        this.setLanguage();
    },
    mounted() {
        this.loadchart();
        this.getMenu();
        // this.asynInitCallApi();

        // websocket broadcast live time aand timer
        const socket = openSocket("https://websocket-timer.herokuapp.com");
        socket.on("time", data => {
            this.getAtivetab();
        });
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
                    title: "stock list",
                    to: "/classic/" + mn + "gameresult"
                },
                {
                    icon: "bubble_chart",
                    title: "announcement",
                    to: "/classic/" + mn + "announcement"
                },
                {
                    icon: "bubble_chart",
                    title: "rule",
                    to: "/classic/" + mn + "rule"
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
                this.StockName = this.$route.params.id.split("-")[1];
                this.checkStock = this.$route.params.id.split("-")[2];
                this.getMenu();
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
    },
    computed: {
        ...mapGetters([
            "getBalance",
            "getStockLength",
            "getlocale",
            "getStockNewData",
            "getReference",
            "getStockName"
        ]),
        countryflag() {
            return this.getlocale;
        }
    }
};
</script>

<style scoped>
.total_classic {
    background: linear-gradient(to right, #e91e63, #ff5722);
    color: #fff;
    border: none;
    text-transform: capitalize;
}

.float-right {
    float: right;
}

/* GHELLEOEEO */
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
