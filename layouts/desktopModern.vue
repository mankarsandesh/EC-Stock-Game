<template>
  <div>
    <!-- tutorial start -->
    <DesktopTutorial />
    <!-- tutorial  end -->

    <v-app style=" background-color: #f4f5fd;">
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
      <v-toolbar class="toolbarMenu" style="background-color:#FFF;">
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
                <country-flag :country="getLocale" size="normal" />
                <span
                  >&nbsp;{{ $t(`msg.${language[getLocale].toString()}`) }}</span
                >
                <i class="fa fa-caret-down" style="margin: 0 -6px 0px 8px;" />
              </v-btn>
            </div>
            <userMenu class="layout-logout" />
            <v-menu bottom offset-y>
              <template v-slot:activator="{ on }">
                <span
                  v-on="on"
                  flat
                  id="notification"
                  class="menuItemNotification"
                >
                  <i class="fa fa-bell-o fa-2x" />
                  <span class="badge">{{ winnerList.length }}</span>
                </span>
              </template>
              <v-list id="notificationTab">
                <v-list-tile
                  v-if="winnerList.length == 0"
                  class="noNotification"
                  >{{ $t("notification.noNotification") }}</v-list-tile
                >

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
              <v-list class="footerView">
                <span @click="$router.push('/modern/desktop/notification/')">{{
                  $t("notification.viewAll")
                }}</span>
              </v-list>
            </v-menu>
          </v-toolbar-items>
        </v-container>
      </v-toolbar>

      <languageDialog ref="language" />
      <v-content>
        <nuxt />
      </v-content>
      <chat-box
        :gameUUID="getGameUUIDByStockName($route.params.id)"
        :stockName="$route.params.id"
        :pathName="$route.name"
      ></chat-box>
    </v-app>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AnimatedNumber from "animated-number-vue";
import menu from "~/data/menudesktop";
import countryFlag from "vue-country-flag";
import languageDialog from "~/components/LanguageDialog";
import i18n from "vue-i18n";
import invitation from "~/components/invitation";
import userMenu from "~/components/userMenu";
import chatBox from "~/components/modern/chatBox";
import config from "~/config/config.global";
import log from "roarr";
import secureStorage from "../plugins/secure-storage";
import DesktopTutorial from "~/components/modern/tutorial/desktopTutorial";
import Cookies from "../plugins/js-cookie";

export default {
  components: {
    DesktopTutorial,
    invitation,
    countryFlag,
    languageDialog,
    userMenu,
    AnimatedNumber,
    chatBox
  },
  data() {
    return {
      isShowTutorial: true,
      messagesCount: 0,
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
  beforeDestroy() {
    window.Echo.leaveChannel(`balanceUpdate.${this.getUserUUID}`);
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
    this.connectUserBalanceSocket();
    // console.log("crearted");
  },
  mounted() {
    this.fetchNotification();
  },
  methods: {
    clearNotification() {
      this.fetchNotification();
    },
    pageLink(type) {
      return type == 3
        ? "/modern/desktop/profile/follower/"
        : "/modern/desktop/notification";
    },
    ...mapActions(["setGameChannelShow", "setUserBalance"]),
    listenUserBalance({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    connectUserBalanceSocket() {
      this.listenUserBalance(
        {
          channelName: `balanceUpdate.${this.getUserUUID}`,
          eventName: "balanceUpdate"
        },
        ({ data }) => {
          try {
            var logData = data;
            if (data.status) {
              this.setUserBalance(data.data.userBalance);
            } else {
              throw new Error(config.error.general);
            }
          } catch (ex) {
            console.log(ex);
          }
        }
      );
    },
    // Fetch User Notification
    async fetchNotification() {
      try {
        var reqBody = {
          portalProviderUUID:
            this.getPortalProviderUUID || Cookies.getJSON("portalProviderUUID"),
          userUUID: this.getUserUUID || Cookies.getJSON("userUUID"),
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
          this.winnerList = data.data.reverse();
        } else {
          throw new Error(config.error.general);
        }
      } catch (ex) {
        console.log(ex);
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
    ])
  }
};
</script>
<style scoped>
.footerView {
  border-top: 1px solid #dddddd;
  text-align: center;
  cursor: pointer;
}
.footerView span {
  font-size: 14px;
  color: #003f70;
  font-weight: 400;
  text-align: center;
}
.noNotification {
  color: #333;
}
#notificationTab {
  padding: 10px 10px 0px 10px;
  overflow-x: hidden;
  overflow-y: scroll;
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
  margin-top: -6px;
  margin-left: -15px;
  background-color: red;
  color: #fff;
  border-radius: 180px;
  padding: 1px;
  height: 20px;
  width: 20px;
  font-size: 12px;
  /* font-weight: 800; */
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
::-webkit-scrollbar {
  width: 8px;
  height: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 7px #acacac;
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #acacac;
  border-radius: 7px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #2c6b9e;
}
</style>
