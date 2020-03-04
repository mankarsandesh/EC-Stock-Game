<template>
  <v-app style=" background-color: #f4f5fd;">
    <div v-if="getStockCrawlerData($route.params.id).length == ''" class="container-loading">
      <div class="text-xs-center loading">
        <v-progress-circular
          style="top: calc(100% - 68%);"
          :size="100"
          :width="10"
          color="#ffffff"
          indeterminate
        ></v-progress-circular>
      </div>
    </div>
    <div class="text-xs-center container-loading loading" v-if="getIsLoadingStockGame">
      <v-progress-circular
        style="top: calc(100% - 68%);"
        :size="100"
        :width="10"
        color="#ffffff"
        indeterminate
      ></v-progress-circular>
    </div>

    <!-- <v-container fluid pa-0 style="background-color: #003e70 !important;max-height: 40px; !important">
        <v-container pa-0>
            <v-toolbar color="#003e70" class="white--text">
                <v-layout wrap style="margin-top:-10px;">
                    <v-flex xs4>
                        <welcome-user></welcome-user>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs5 class="text-xs-right">
                        <winnerMarquee :scrollSpeed="scrollSpeed" :showSpeed="showSpeed" :pauseOnHover="pauseOnHover" :pauseTime="pauseTime" :marqueeList="winner" height="36px" width="100%" color="#f76a24" fontSize="14px"></winnerMarquee>
                    </v-flex>
                </v-layout>
            </v-toolbar>
        </v-container>
    </v-container>-->

    <v-toolbar height="75" class="elevation-3">
      <v-container fluid class="navbar">
        <v-toolbar-title>
          <v-img
            width="158"
            src="/logo.png"
            @click="$router.push('/modern/desktop/btc1')"
            class="logostyle"
          ></v-img>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only text-s1 .macky-color">
          <v-btn flat v-for="item in menu" :key="item.title" :to="item.to">
            <i :class="item.icon" style="margin-right: 3px;" />
            <span>{{$t(`menu.${item.title}`)}}</span>
          </v-btn>
          <div class="layout-btn">
            <v-btn class="btn-currency" text flat>
              <i class="fa fa-dollar icon-dollar" />
              USD
              <i class="fa fa-caret-down" style="margin: 0 -6px 0px 8px;" />
            </v-btn>
          </div>
          <div class="layout-btn">
            <v-btn class="btn-langage" text flat @click="$refs.language.showDialog()">
              <countryFlag :country="countryflag" size="normal" />
              {{$t('msg.chooselanguage')}}
              <i
                class="fa fa-caret-down"
                style="margin: 0 -6px 0px 8px;"
              />
            </v-btn>
          </div>
          <Logout class="layout-logout" />
        </v-toolbar-items>
      </v-container>
    </v-toolbar>

    <languageDialog ref="language" />
    <v-content>
      <nuxt />
    </v-content>

    <!-- Chat Windows-->
    <chatWindow  />
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import menu from "~/data/menudesktop";

import countryFlag from "vue-country-flag";
import languageDialog from "~/components/LanguageDialog";
import winnerMarquee from "~/components/modern/winnerMarquee";
import welcomeUser from "~/components/welcomeUser";
import openSocket from "socket.io-client";
import i18n from "vue-i18n";
import lottie from "lottie-web";
import chatWindow from "~/components/chatWindow";
// import popper from "vue-popperjs";
// import "vue-popperjs/dist/vue-popper.css";

import Logout from "../components/Logout";
export default {
  components: {
    chatWindow,
    countryFlag,
    languageDialog,
    winnerMarquee,
    welcomeUser,
    Logout
  },
  data() {
    return {      
      currency: [{ title: "USD" }, { title: "BATH" }, { title: "KIP" }],
      direction: "top",
      fab: true,
      fling: true,
      hover: false,
      tabs: true,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: "slide-y-reverse-transition",

      //winner mqrquee
      winner: [],
      pauseTime: 2000,
      pauseOnHover: false,
      scrollSpeed: 30,
      showSpeed: 20,

      clipped: false,
      drawer: false,
      fixed: false,
      menu: menu,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "EC gaming",
      isFullscreen: null,
      timeout: 3000
    };
  },
  updated(){
    let path = this.$nuxt.$route.name.split("-");
    let pageName = path[2];   
    if(pageName === "id"){
      this.setGameChannelShow(true);
    }else{
      this.setGameChannelShow(false);
    }
  },
  created() {
   
    // check is full screen or not
    let path = this.$nuxt.$route.name.split("-");
    let isFullscreen = path[1];   
    
    if (isFullscreen === "fullscreen") {
      this.isFullscreen = true;
    } else {
      this.isFullscreen = false;
    }

    console.log("crearted");
  },
  mounted() {
    setInterval(() => {
      this.getwinuser();
    }, 10000);
    this.getwinuser();
    lottie.loadAnimation({
      container: this.$refs.svgContainer, // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://assets10.lottiefiles.com/packages/lf20_logbxj.json" // the path to the animation json
    });
    // setInterval(function() {

    // }, 1000);

    // this.setIsLoadingStockGame(false);
  },
  methods: {
     ...mapMutations(["setGameChannelShow"]),
    getwinuser() {
      this.$axios
        .$get("api/fetchBet")
        .then(response => {
          //  console.log("response.....................")
          // console.log(response.data)
          //  console.log("response.......................")
          let resultStatus = null;
          for (let i = 0; i < response.data.length - 1; i++) {
            let betID = response.data[i].betId;
            let result = response.data[i].result;
            let name = response.data[i].name;
            if (result == "1") {
              resultStatus = "Win";

              //  console.log(resultStatus);
              let betAmount = response.data[i].betAmount;
              let betTime = response.data[i].betTime;
              let win = `
          <span class="text-slide text-white"><span class="text-warning">
          <i class="fa fa-bell"></i>
          </span>Player ${betID}, <span class="text-warning">${resultStatus} ${betAmount},
          </span> ${name}  ${betTime}</span>`;
              this.winner.push(win);
            }
          }
        })
        .catch(error => {
          // alert(error);
        });
    }
  },
  computed: {
    ...mapGetters([
      "getBalance",
      "getlocale",
      "getIsLoadingStockGame",
      "getStockCrawlerData"
    ]),
    countryflag() {
      return this.getlocale;
    }
  }
};
</script>

<style scoped>
.logostyle {
  cursor: pointer;
  margin-left: 15px;
}
.currencySelect i {
  padding-left: 3px;
}
.currencySelect {
  padding: 0px;
}
.currencyName {
  padding-left: -5px;
  cursor: pointer;
}
.currencyMenu:hover {
  cursor: pointer;
  background-color: #dddddd;
}
.currencyMenu {
  cursor: pointer;
  height: 75%;
  padding: 5px;
}
.toolMenu {
  border: 1px solid red;
  width: 100% !important;
  padding: 5px;
}
.v-toolbar__content {
  padding: 0 !important;
  justify-content: center !important;
}

.settop {
  top: 30%;
}

.popper {
  background-color: #333;
  border-radius: 10px;
}

.container-loading {
  position: absolute;
  z-index: 5000;
  width: 100%;
  height: 100%;
}

.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.7;
}

/* This is for documentation purposes and will not be needed in your application */
.v-speed-dial {
  position: absolute;
}

.v-btn--floating {
  position: relative;
}

.v-progress-circular {
  margin: 1rem;
}

.layout-btn {
  padding: 0 5px;
  display: flex;
}

.v-btn {
  /* padding: 0 5px !important; */
  border: 1px solid #ccc;
  border-bottom: none;
  border-top: none;
}

.btn-langage {
  border: 1px solid #ccc;
  height: 48% !important;
  border-radius: 1em;
  display: flow-root;
}
.btn-currency {
  border: 1px solid #ccc;
  height: 48% !important;
  border-radius: 1em;
  display: flow-root;
}

.icon-dollar {
  color: white;
  background: green;
  padding: 6px;
  border-radius: 10em;
  width: 27px;
}

nav .v-toolbar__content .v-toolbar__items a.v-btn--active {
  color: #ffffff;
  background-image: linear-gradient(to right, #0bb177 30%, #2bb13a 51%);
}

.layout-logout {
  display: flex;
  border: 1px solid #ccc;
  border-bottom: none;
  border-top: none;
  border-right: none;
}
</style>
