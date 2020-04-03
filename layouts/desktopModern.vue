<template>
  <v-app style=" background-color: #f4f5fd;">
    <v-toolbar class="notification" xs12 v-if="showNotification">
      <v-flex xs8 class="text-xs-right" style="margin:0px;"></v-flex>
      <v-flex xs4 class="text-xs-right">
        <winnerMarquee
          class="winnerText"
          :scrollSpeed="scrollSpeed"
          :showSpeed="showSpeed"
          :pauseOnHover="pauseOnHover"
          :pauseTime="pauseTime"
          :marqueeList="winner"
          height="30px"
          width="100%"
          color="#f76a24"
          fontSize="13px"
        ></winnerMarquee>
      </v-flex>
      <v-flex xs1 class="text-xs-right closeNotification">
        <i class="fa fa-close fa-2x" @click="showNotification = false" />
      </v-flex>
    </v-toolbar>
    <!-- <div v-if="getStockCrawlerData('btc1').length == ''" class="container-loading">
      <div class="text-xs-center loading">
        <v-progress-circular
          style="top: calc(100% - 68%);"
          :size="100"
          :width="10"
          color="#ffffff"
          indeterminate
        ></v-progress-circular>
      </div>
    </div> -->
    <div
      class="text-xs-center container-loading loading"
      v-if="getIsLoadingStockGame"
    >
      <v-progress-circular
        style="top: calc(100% - 68%);"
        :size="100"
        :width="10"
        color="#ffffff"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-toolbar class="toolbarMenu">
      <v-container fluid class="navbar">
        <v-toolbar-title>
          <v-img
            src="/logo.png"
            @click="$router.push('/modern/desktop/btc1')"
            class="logoStyle"
          ></v-img>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only text-s1 toolBar">
          <v-btn
            flat
            v-for="item in menu"
            :key="item.title"
            :to="item.to"
            class="menuItem"
          >
            <i :class="item.icon" />
            <span>&nbsp;{{ $t(`menu.${item.title}`) }}</span>
          </v-btn>
          <div class="layout-btn">
            <v-btn
              class="btn-langage"
              text
              flat
              @click="$refs.language.showDialog()"
            >
              <countryFlag :country="countryflag" size="normal" />
              <span>&nbsp;{{ $t("msg.chooselanguage") }}</span>
              <i class="fa fa-caret-down" style="margin: 0 -6px 0px 8px;" />
            </v-btn>
          </div>
          <userMenu class="layout-logout" />
          <span
            flat
            @click="showNotification = true"
            id="notification"
            class="menuItemNotification"
          >
            <i class="fa fa-bell-o fa-2x" />
            <span class="badge">{{ messagesCount }}</span>
          </span>
        </v-toolbar-items>
      </v-container>
    </v-toolbar>

    <languageDialog ref="language" />
    <v-content>
      <nuxt />
    </v-content>

    <!-- Chat Windows-->
    <chatWindow
      :gameUUID="getGameUUIDByStockName($route.params.id)"
      :key="$route.name"
    />
    <!-- <chatWindow /> -->
  </v-app>
</template>
<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import AnimatedNumber from "animated-number-vue";
import menu from "~/data/menudesktop";
import countryFlag from "vue-country-flag";
import languageDialog from "~/components/LanguageDialog";
import winnerMarquee from "~/components/modern/winnerMarquee";
import welcomeUser from "~/components/welcomeUser";
import openSocket from "socket.io-client";
import i18n from "vue-i18n";
import lottie from "lottie-web";
import chatWindow from "~/components/chatWindow";
import userMenu from "../components/userMenu";
import config from "../config/config.global";
export default {
  components: {
    chatWindow,
    countryFlag,
    languageDialog,
    winnerMarquee,
    welcomeUser,
    userMenu,
    AnimatedNumber
  },
  data() {
    return {
      messagesCount: 2,
      activeClass: null,
      showNotification: false,
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
  updated() {
    let path = this.$nuxt.$route.name.split("-");
    let pageName = path[2];
    if (pageName === "id") {
      this.setGameChannelShow(true);
    } else {
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
    // console.log("crearted");
  },
  mounted() {
    this.fetchNotification();
    lottie.loadAnimation({
      container: this.$refs.svgContainer, // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://assets10.lottiefiles.com/packages/lf20_logbxj.json" // the path to the animation json
    });
  },
  methods: {
    ...mapMutations(["setGameChannelShow"]),
    async fetchNotification() {  
      const betData = {
        portalProviderUUID: this.getPortalProviderUUID, // get the portal provider uuid from computed that we call from vuex
        userUUID: this.getUserUUID, // get the userUUID with the this object
        version: config.version, // version of API
        betResult: [0, 1], // -1= pending, pending that mean is betting
        limit: "5", // limit the data we the data come will come only the 20 that we limit in this case
        offset: "0" // offset or skip the data
      };
      const { data } = await this.$axios.post(
        config.getAllBets.url, // after finish crawl the every API will the the baseURL from AXIOS
        betData,
        {
          headers: {
            Authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh" // basic AUTH before send, becase the backend they will check
          }
        }
      );
      this.messagesCount = data.data.length;
      for (let i = 0; i < data.data.length - 1; i++) {
        let betID = data.data[i].betID;
        let betResult = data.data[i].betResult;
        let name = data.data[i].name;
        let ruleName = data.data[i].ruleName;
        let betAmount = data.data[i].betAmount;
        let betTime = data.data[i].createdTime;
        let stockName = data.data[i].stockName;
        let win = `<span class="text-slide text-white"><span class="text-warning">
                        <i class="fa fa-bell"></i>
                        </span>Player ${betResult}  ${betAmount} chips on,
                         ${stockName} stock ${ruleName}  ${betTime}</span>`;
        this.winner.push(win);
      }
    }
  },
  computed: {
    ...mapGetters([
      "getGameUUIDByStockName",
      "getPortalProviderUUID", // Get Portalprovider
      "getUserUUID", // Get UserUUID
      "getGameChannel",
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
.winnerText {
  margin-top: -30px;
  font-weight: 800;
  text-transform: uppercase;
}
.badge {
  position: absolute;
  margin-top: -5px;
  margin-left: -15px;
  background-color: red;
  color: #fff;
  border-radius: 180px;
  padding: 1px;
  height: 18px;
  width: 18px;
  font-size: 10px;
  font-weight: 800;
  border: 1px solid #333;
}
.closeNotification {
  margin-right: 10px;
  margin-top: -15px;
  color: #fff;
  cursor: pointer;
}
.menuItemNotification {
  height: 62px !important;
  width: 40px !important;
  text-align: center;
  padding-top: 16px;
  cursor: pointer;
}
.activeNotification {
  color: #ffffff;
  background-color: #2bb13a;
  height: 62px !important;
  width: 50px !important;
  text-align: center;
  padding-top: 16px;
  cursor: pointer;
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
  border-bottom: none;
  border-top: none;
}

.btn-langage {
  border: 1px solid #ccc;
  border-radius: 4px;
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
