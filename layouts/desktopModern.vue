<template>
  <div>
    <!-- tutorial start -->
    <DesktopTutorial />
    <!-- tutorial  end -->

    <v-app style=" background-color: #f4f5fd;">
      <div class="text-xs-center container-loading loading" v-if="getIsLoadingStockGame">
        <v-progress-circular
          style="top: calc(100% - 68%);"
          :size="100"
          :width="10"
          color="#ffffff"
          indeterminate
        ></v-progress-circular>
      </div>
      <v-toolbar class="toolbarMenu" style="background-color:#FFF;">
        <v-container fluid class="navbar">
          <v-toolbar-title>
            <v-img src="/logo.png" @click="$router.push('/modern/desktop/btc1')" class="logoStyle"></v-img>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-xs-only text-s1 toolBar">
            <v-btn flat v-for="item in menu" :key="item.title" :to="item.to" class="menuItem">
              <i :class="item.icon" />
              <span>&nbsp;{{ $t(`menu.${item.title}`) }}</span>
            </v-btn>
            <div class="layout-btn">
              <v-btn class="btn-langage" text flat @click="$refs.language.showDialog()">
                <countryFlag :country="countryflag" size="normal" />
                <span>&nbsp;{{ $t(`msg.${language[getLocale]}`) }}</span>
                <i class="fa fa-caret-down" style="margin: 0 -6px 0px 8px;" />
              </v-btn>
            </div>
            <userMenu class="layout-logout" />
            <v-menu bottom offset-y>
              <template v-slot:activator="{ on }">
                <span v-on="on" flat id="notification" class="menuItemNotification">
                  <i class="fa fa-bell-o fa-2x" />
                  <span class="badge">{{ messagesCount }}</span>
                </span>
              </template>
              <v-list id="notificationTab">
                <v-list-tile
                  v-if="winnerList.length == 0"
                  class="noNotification"
                >There are no Notification.</v-list-tile>
                <v-list-tile
                  v-for="(item, i) in winnerList"
                  :key="i"
                  class="mainNotification"
                  @click="$router.push(pageLink(item.type))"
                >
                  <div class="userImage">
                    <i class="fa fa-user-o fa-1x" />
                  </div>
                  <div class="messageBody">
                    <div class="title">{{ item.title }}</div>
                    <div class="description">{{ item.message }}</div>
                    <div class="dateTime">{{ item.createdAt }}</div>
                  </div>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-toolbar-items>
        </v-container>
      </v-toolbar>

      <languageDialog ref="language" />
      <v-content>
        <nuxt />
      </v-content>
      <!-- invitation Windows-->
      <invitation
        :gameUUID="getGameUUIDByStockName($route.params.id)"
        :stockName="$route.params.id"
        :key="$route.name"
      />
      <!-- <invitation Windows /> -->
    </v-app>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AnimatedNumber from "animated-number-vue";
import menu from "~/data/menudesktop";
import countryFlag from "vue-country-flag";
import languageDialog from "~/components/LanguageDialog";
import winnerMarquee from "~/components/modern/winnerMarquee";
import welcomeUser from "~/components/welcomeUser";
import openSocket from "socket.io-client";
import i18n from "vue-i18n";
import lottie from "lottie-web";
import invitation from "~/components/invitation";
import userMenu from "~/components/userMenu";
import config from "~/config/config.global";
import log from "roarr";
import secureStorage from "../plugins/secure-storage";
import DesktopTutorial from "~/components/modern/tutorial/desktopTutorial";

export default {
  components: {
    DesktopTutorial,
    invitation,
    countryFlag,
    languageDialog,
    winnerMarquee,
    welcomeUser,
    userMenu,
    AnimatedNumber
  },
  data() {
    return {
      isShowTutorial: true,
      messagesCount: 2,
      activeClass: null,
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
      winnerList: [],
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
      timeout: 3000,
      language: config.language
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
    pageLink(type) {
      return type == 3
        ? "/modern/desktop/profile/follower/"
        : "/modern/desktop/notification";
    },
    ...mapActions(["setGameChannelShow"]),
    async fetchNotification() {
      try {
        var reqBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          userUUID: this.getUserUUID,
          version: config.version
        };
        var { data } = await this.$axios.post(
          config.getUserNotification.url,
          reqBody,
          {
            headers: config.header
          }
        );
        if (data.status) {
          this.messagesCount = data.data.length;
          this.winnerList = data.data.reverse();
        } else {
          throw new Error(config.error.general);
        }
      } catch (ex) {
        console.log(ex);
        log.error(
          {
            req: reqBody,
            res: data,
            page: "layouts/desktopModern.vue",
            apiUrl: config.getUserNotification.url,
            provider: secureStorage.getItem("PORTAL_PROVIDERUUID"),
            user: secureStorage.getItem("USER_UUID")
          },
          ex.message
        );
      }
    }
  },
  computed: {
    ...mapGetters([
      "getGameUUIDByStockName",
      "getPortalProviderUUID", // Get Portalprovider
      "getUserUUID", // Get UserUUID
      "getLocale",
      "getIsLoadingStockGame"
    ]),
    countryflag() {
      return this.getLocale;
    }
  }
};
</script>
<style scoped>
.noNotification {
  color: #333;
}
#notificationTab {
  padding: 10px 10px 0px 10px;
  overflow: scroll;
  z-index: 9999;
  height: 320px;
  width: 350px;
  background-color: #fff;
}
.mainNotification {
  background-color: #fff;
  cursor: pointer;
  padding: 15px 0px;
  float: left;
  width: 100%;
  border-bottom: 1px solid #dddddd;
}

.userImage {
  float: left;
  width: 10%;
  font-size: 18px;
}
.userImage i {
  margin: 10px -8px;
  width: 30px;
  height: 30px;
  background-color: #d1ecf1;
  border-radius: 180px;
  padding: 5px;
  text-align: center;
}
.messageBody {
  padding: 0px 6px;
  /* border:1px solid; */
  float: left;
  width: 90%;
}
.title {
  font-size: 14px !important;
  width: 100%;
  color: #003f70;
}
.description {
  font-size: 12px;
  color: #333;
}
.dateTime {
  font-size: 12px;
  color: #636363;
}
.v-menu__content {
  z-index: 9999 !important;
}

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
