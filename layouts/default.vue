<template>
<v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed right style="z-index:101">
        <v-list v-if="!isHidden">
            <!-- Close button cross mark for mobile responsive side bar -->
            <v-btn icon @click.stop="drawer = !drawer" style="float: right;">
                <v-icon>clear</v-icon>
            </v-btn>
            <div v-for="(item, i) in menu" :key="i">
                <v-list-tile :to="item.to" router exact class="text-primary text-uppercase">
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ $t(`menu.${item.title}`) }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
            </div>
        </v-list>
    </v-navigation-drawer>

    <v-toolbar :clipped-left="clipped" class="pa-1 text-primary light-toobar setheight">
        <v-flex class="pa-2">
            <nuxt-link to="/modern">
                <v-toolbar-title>
                    <v-img width="30" src="/favicon.png"></v-img>
                </v-toolbar-title>
            </nuxt-link>
        </v-flex>

        <v-spacer></v-spacer>

        <button flat @click="$refs.language.showDialog()">
            <countryFlag :country="countryflag" size="normal" />
        </button>
        <languageDialog ref="language"></languageDialog>

        <Logout size="normal" />
        <v-toolbar-side-icon @click="drawer = !drawer" :elevation="0" />
    </v-toolbar>

    <div class="title-layout" v-show="isShow == 'history' || isShow == 'stock-list'||isShow == 'current-bet' ||isShow == 'announcement' ||isShow == 'rule' || isShow == 'leaderboard' ||isShow == 'setting'">
        <h2 class="text-uppercase" v-show="isShow == 'history'">{{ $t('menu.history') }}</h2>
        <h2 class="text-uppercase" v-show="isShow == 'stock-list'">{{ $t('menu.stock list') }}</h2>
        <h2 class="text-uppercase" v-show="isShow == 'current-bet'">{{ $t('menu.current bet') }}</h2>
        <h2 class="text-uppercase" v-show="isShow == 'announcement'">{{ $t('menu.announcement') }}</h2>
        <h2 class="text-uppercase" v-show="isShow == 'rule'">{{ $t('menu.rule') }}</h2>
        <h2 class="text-uppercase" v-show="isShow == 'leaderboard'">{{ $t('menu.leaderboard') }}</h2>
        <h2 class="text-uppercase" v-show="isShow == 'setting'">{{ $t('menu.setting') }}</h2>
        <v-btn to="/modern/history" v-show="isShow == 'current-bet'" class="buttonGreen" style="float: right; top: -98%;">{{$t('menu.history')}}</v-btn>
        <v-btn to="/modern/current-bet" v-show="isShow == 'history'" class="buttonGreen" style="float: right; top: -98%;">{{$t('menu.current bet')}}</v-btn>
        <v-btn to="/modern/announcement" v-show="isShow == 'stock-list'" class="buttonGreen" style="float: right; top: -98%;">{{$t('menu.announcement')}}</v-btn>
        <v-btn to="/modern/rule" v-show="isShow == 'announcement'" class="buttonGreen" style="float: right; top: -98%;">{{$t('menu.rule')}}</v-btn>
        <v-btn to="/modern/leaderboard" v-show="isShow == 'rule'" class="buttonGreen" style="float: right; top: -98%;">{{$t('menu.leaderboard')}}</v-btn>
        <v-btn to="/modern/setting" v-show="isShow == 'leaderboard'" class="buttonGreen" style="float: right; top: -98%;">{{$t('menu.setting')}}</v-btn>
    </div>
    <v-content>
        <v-container pa-1>
            <nuxt />
        </v-container>
    </v-content>
</v-app>
</template>

<script>
import {
    mapGetters
} from "vuex";

import menu from "~/data/menu";

import countryFlag from "vue-country-flag";
import languageDialog from "~/components/LanguageDialog";
import welcomeUser from "~/components/welcomeUser";

import openSocket from "socket.io-client";
import Logout from "../components/mobileLogout";

import i18n from "vue-i18n";

import Button from "~/components/Button";
export default {
    components: {
        countryFlag,
        languageDialog,
        welcomeUser,
        Logout,
        Button
    },
    data() {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            menu: menu,
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: "EC gaming",
            isShow: ""
        };
    },

    created() {},
    mounted() {
        setInterval(() => {
            this.isShow = location.pathname.split("/")[2]
        })

    },
    methods: {},
    computed: {
        ...mapGetters(["getBalance", "getlocale"]),
        countryflag() {
            return this.getlocale;
        }
    }
};
</script>

<style scoped>
.layout-logout {
    display: flex;
    border: 1px solid #ccc;
    border-bottom: none;
    border-top: none;
    border-right: none;
}

.title-layout {
    background: url("/bg/Inner-page-banner.png");
    background-size: cover;
    height: 45px;
    width: 100%;
    color: white;
    padding: 5px 0px 0px 45px;
}
</style>
