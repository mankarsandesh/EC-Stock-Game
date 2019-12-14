<template>
  <v-app>
    <div v-show="getStockCrawlerData($route.params.id).length == ''" class="container-loading">
      <div class="loading"></div>
      <div ref="svgContainer"></div>
    </div>
    <div class="text-xs-center container-loading loading" v-if="getIsLoadingStockGame">
      <v-progress-circular class="settop" :size="100" :width="10" color="#ffffff" indeterminate></v-progress-circular>
    </div>

    <v-container
      fluid
      pa-0
      style="background-color: #003e70 !important;max-height: 40px; !important"
    >
      <v-container pa-0>
        <v-toolbar color="#003e70" class="white--text">
          <v-layout wrap style="margin-top:-10px;">
            <v-flex xs4>
              <welcome-user></welcome-user>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs5 class="text-xs-right">
              <winnerMarquee
                :scrollSpeed="scrollSpeed"
                :showSpeed="showSpeed"
                :pauseOnHover="pauseOnHover"
                :pauseTime="pauseTime"
                :marqueeList="winner"
                height="36px"
                width="100%"
                color="#f76a24"
                fontSize="14px"
              ></winnerMarquee>
            </v-flex>
          </v-layout>
        </v-toolbar>
      </v-container>
    </v-container>
    <v-container class="pa-0">
      <v-toolbar height="69" color="#fff" style="justify-content: center !importan;">
        <v-toolbar-title>
          <v-img width="158" src="/logo.png"></v-img>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only text-s1 .macky-color">
          <v-btn flat v-for="item in menu" :key="item.title" :to="item.to">
            {{
            $t(`menu.${item.title}`)
            }}
          </v-btn>
          <v-btn text flat @click="$refs.language.showDialog()">
            <countryFlag :country="countryflag" size="normal" />
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <hr />

      <languageDialog ref="language"></languageDialog>

      <v-content>
        <v-container pa-0>
          <nuxt />
        </v-container>
      </v-content>
    </v-container>
    <!-- <v-float dark color="#003e70" >   
  EC
    </v-float>-->

    <chatWindow />
    
    
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

export default {
  components: {
    chatWindow,
    countryFlag,
    languageDialog,
    winnerMarquee,
    welcomeUser
  },
  data() {
    return {
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

  created() {
    // check is full screen or not
    let path = this.$nuxt.$route.name.split("-");
    let isFullscreen = path[1];
    if (isFullscreen === "fullscreen") {
      this.isFullscreen = true;
    } else {
      this.isFullscreen = false;
    }
    //  this.getwinuser()
  },
  mounted() {
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
  created() {},
  methods: {
    ...mapMutations(["setIsLoadingStockGame"])
    //  getwinuser() {
    //    this.$axios.$get("api/getwinuser").then(response => {
    //      console.log("response.....................")
    //      alert(response.data)
    //      console.log("response.......................")
    //       for (let i = 0; i < response.data.length - 1; i++) {
    //         let betID = response.data[i].betID;
    //         let result = response.data[i].result;
    //         let betAmount = response.data[i].betAmount;
    //         let betTime = response.data[i].betTime;
    //         let win = `<span class="text-slide text-white"><span class="text-warning">
    //       <i class="fa fa-bell"></i>
    //       </span>${this.navwin1} ${betID}<span class="text-warning">${result} ${betAmount},
    //       </span> ${this.navwin2} SINA  ${betTime}</span>`
    //         this.winner.push(win);
    //       }
    //     })
    //     .catch(error => {
    //       alert(error)
    //     })
    // }
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
</style>