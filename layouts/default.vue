<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      right
      class="side-bar"
    >
      <v-list>
        <!-- Close button cross mark for mobile responsive side bar -->
        <v-btn icon @click="drawer = !drawer" style="float: right;">
          <v-icon>clear</v-icon>
        </v-btn>
        <div v-for="(item, i) in menu" :key="i">
          <v-list-tile
            :to="item.to"
            router
            exact
            class="text-primary text-uppercase"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{
                $t(`menu.${item.title}`)
              }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>
        </div>
        <v-list-tile @click="getLogout()">
          <v-list-tile-content>
            <v-list-tile-title>{{ $t("profile.signout") }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      :clipped-left="clipped"
      class="pa-3 text-primary light-toobar setheight"
    >
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
      <languageDialog ref="language" />

      <mobileLogout size="normal" />
      <v-toolbar-side-icon @click="drawer = !drawer" :elevation="0" />
    </v-toolbar>

    <div
      class="title-layout"
      v-show="
        isShow == 'history' ||
          isShow == 'stock-list' ||
          isShow == 'current-bet' ||
          isShow == 'notification' ||
          isShow == 'rule' ||
          isShow == 'leaderboard' ||
          isShow == 'setting'
      "
    >
      <h2 class="text-uppercase" v-show="isShow == 'history'">
        {{ $t("menu.history") }}
      </h2>
      <h2 class="text-uppercase" v-show="isShow == 'stock-list'">
        {{ $t("menu.stock list") }}
      </h2>
      <h2 class="text-uppercase" v-show="isShow == 'current-bet'">
        {{ $t("menu.current bet") }}
      </h2>
      <h2 class="text-uppercase" v-show="isShow == 'notification'">
        {{ $t("menu.notification") }}
      </h2>
      <h2 class="text-uppercase" v-show="isShow == 'rule'">
        {{ $t("menu.rule") }}
      </h2>
      <h2 class="text-uppercase" v-show="isShow == 'leaderboard'">
        {{ $t("menu.leaderboard") }}
      </h2>
      <h2 class="text-uppercase" v-show="isShow == 'setting'">
        {{ $t("menu.setting") }}
      </h2>
      <v-btn
        to="/modern/history"
        v-show="isShow == 'current-bet'"
        class="buttonGreen"
        style="float: right; top: -98%;"
        >{{ $t("menu.history") }}</v-btn
      >
    </div>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-snackbar v-model="snackbar"  :timeout="timeout" >
      {{ getSnackBarError }}
      <v-btn color="pink" text @click="setSnackBarError('')">
        Close
      </v-btn>
    </v-snackbar>

    <app-dialogs-confirm
      v-on:dialogStatus="dialogStatus"
      :dialogConfirm="dialogConfirm"
      title="Are you sure to logout?"
      content="Hope to see you as soon, BYE BYE"
    />
  </v-app>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

import menu from "~/data/menuMobile";

import countryFlag from "vue-country-flag";
import languageDialog from "~/components/mobile/LanguageDialog";
import welcomeUser from "~/components/welcomeUser";
import openSocket from "socket.io-client";
import mobileLogout from "~/components/mobile/mobileLogout";
import AppDialogsConfirm from "~/components/dialogsConfirm";
import i18n from "vue-i18n";
import secureStorage from "../plugins/secure-storage";
import Button from "~/components/Button";
export default {
  components: {
    AppDialogsConfirm,
    countryFlag,
    languageDialog,
    welcomeUser,
    mobileLogout,
    Button
  },
  data() {
    return {
      snackbar : this.getSnackBarError,
      dialogConfirm: false,
      clipped: false,
      drawer: false,
      fixed: false,
      menu: menu,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "EC gaming",
      isShow: "",
      timeout:6000
    };
  },
  watch :{
    getSnackBarError(){
      if(this.snackbar){
        setTimeout(() => {  this.setSnackBarError(""); },this.timeout);
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.isShow = location.pathname.split("/")[2];
    });
  },
  methods: {
    showSnackBar(){
    },
    ...mapActions(["setSnackBarError"]),
    getLogout() {
      this.dialogConfirm = true;
    },
    dialogStatus(value) {
      if (value) {
        secureStorage.removeItem("AUTH");
        const URL = secureStorage.getItem("referrerURL");
        location.href = "http://" + URL;
        this.dialogConfirm = false;
      }
      this.dialogConfirm = false;
    }
  },
  computed: {
    ...mapGetters(["getLocale", "getSnackBarError"]),
    countryflag() {
      return this.getLocale;
    }
  }
};
</script>

<style scoped>
.light-toobar {
  background-color: #fff !important;
}
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
.side-bar {
  z-index: 101;
  width: 250px !important;
}
</style>
