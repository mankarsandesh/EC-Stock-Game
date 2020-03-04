<template>
<v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed right style="z-index:101">
        <v-list>
            <div v-for="(item, i) in menu" :key="i">
                <v-list-tile :to="item.to" router exact class="text-primary text-uppercase">
                    <!-- <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>-->
                    <v-list-tile-content>
                        <v-list-tile-title>
                            <!-- {{item.title}} -->
                            {{ $t(`menu.${item.title}`) }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
            </div>
        </v-list>
    </v-navigation-drawer>
    <!-- <v-toolbar height="30" color="#003e70" class="white--text" style="z-index: 100;">
      <v-layout row wrap>
        <v-flex xs12 class="pa-3">
          <welcome-user></welcome-user>
        </v-flex>
      </v-layout>
    </v-toolbar> -->

    <v-toolbar :clipped-left="clipped" class="pa-1 text-primary light-toobar">
        <v-flex class="pa-2">
            <nuxt-link to="/modern">
                <v-toolbar-title>
                    <v-img width="30" src="/logo.png"></v-img>
                </v-toolbar-title>
            </nuxt-link>
        </v-flex>

        <v-spacer></v-spacer>
        <button text flat @click="$refs.language.showDialog()">
            <countryFlag :country="countryflag" size="normal" />
        </button>
        <languageDialog ref="language"></languageDialog>

        <!-- <v-btn class="btn-currency" text flat>
            <i class="fa fa-dollar icon-dollar" />
            USD
            <i class="fa fa-caret-down" style="margin: 0 -6px 0px 8px;" />
        </v-btn> -->
        <Logout class="layout-logout" size="normal" />
        <v-toolbar-side-icon @click="drawer = !drawer" :elevation="0" />
    </v-toolbar>

    <v-content>
        <div class="title-layout" v-show="isShow == 'history' || isShow == 'stock-list'||isShow == 'current-bet' ||isShow == 'announcement'">
            <h2 v-show="isShow == 'history'">{{ $t('menu.history') }}</h2>
            <h2 v-show="isShow == 'stock-list'">{{ $t('menu.stock list') }}</h2>
            <h2 v-show="isShow == 'current-bet'">{{ $t('menu.current bet') }}</h2>
            <h2 v-show="isShow == 'announcement'">{{ $t('menu.announcement') }}</h2>
            <v-flex xs8 class="text-right">
                <Button v-if="linkItem" :linkItem="linkItem" :btnTitle="titlebtn" />
                <Button v-if="linkItem2" :linkItem="linkItem2" :btnTitle="titlebtn2" />
            </v-flex>
        </div>
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
    props: ["linkItem", "linkItem2", "title", "titlebtn", "titlebtn2"],
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
