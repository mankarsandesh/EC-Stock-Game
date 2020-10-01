<template>
  <div class="userMenu">
    <v-menu offset-y :close-on-content-click="false" :min-width="180">
      <template v-slot:activator="{ on }">
        <v-btn flat v-on="on">
          <v-avatar size="40">
            <img :src="imgProfile" />
          </v-avatar>
          <div class="userLogoutMenu">
            <span v-if="getUserInfo.firstName == null"
              >{{ getUserInfo.userName }}
            </span>
            <span v-if="getUserInfo.firstName">
              {{ getUserInfo.firstName }} {{ getUserInfo.lastName }}
            </span>
            <span id="userBalance">
              <!-- User Balance fetch from state and Socket                  -->
              <userMainBalance />
            </span>
          </div>
          <i class="fa fa-caret-down" />
        </v-btn>
      </template>
      <v-list>
        <v-list-tile @click="$router.push('/modern/desktop/userprofile/')">
          <i class="fa fa-user fa-2x margin-right-5" />
          <v-list-tile-title>{{ $t("menu.profile") }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          @click="$router.push('/modern/desktop/profile/onlinehistory/')"
        >
          <i class="fa fa-hourglass-half fa-15x margin-right-5" />
          <v-list-tile-title>{{
            $t("profile.onlineHistory")
          }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="$router.push('/modern/desktop/profile/follower/')">
          <i class="fa fa-user fa-2x margin-right-5" />
          <v-list-tile-title>{{ $t("profile.myFollowers") }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="getLogout()">
          <i class="fa fa-lock fa-2x margin-right-5" />
          <v-list-tile-title>{{ $t("profile.signOut") }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-dialog v-model="logoutDialog" persistent max-width="400">
      <v-card class="logout">
        <v-card-title class="headlineh1">{{ $t("logout.sure") }}</v-card-title>
        <v-card-text>{{ $t("logout.bye") }}</v-card-text>
        <v-card-actions>
          <v-btn class="buttonGreen" text @click="dialogStatus">{{
            $t("logout.logout")
          }}</v-btn>
          <v-btn class="buttonCancel" text @click="logoutDialog = false">{{
            $t("logout.cancel")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import AppDialogsConfirm from "~/components/dialogsConfirm";
import { mapGetters, mapActions, mapMutations } from "vuex";
import config from "../config/config.global";
import Cookies from "~/plugins/js-cookie";
import secureStorage from "../plugins/secure-storage";
import utils from "~/mixin/utils";
import userMainBalance from "~/components/global/userMainBalance";

export default {
  components: {
    AppDialogsConfirm,
    userMainBalance
  },
  data() {
    return {
      logoutDialog: false,
      defaultImage: `/no-profile-pic.jpg`,
      dialogConfirm: false,
      profileImage: "",
      dialogprofile: false,
      isShow: ""
    };
  },
  // Call Helper Function
  mixins: [utils],
  computed: {
    ...mapGetters([
      "getUserInfo",
      "getUserBalance",
      "getUserUUID",
      "getUserCurrency"
    ]),
    imgProfile() {
      if (this.getUserInfo.profileImage == null) {
        return `${this.defaultImage}`;
      } else {
        return `${config.apiDomain}/${this.getUserInfo.profileImage}`;
      }
    }
  },
  mounted() {
    this.isShow = location.pathname.split("/")[1];
  },
  methods: {
    ...mapActions(['setUserLogout']),
    getLogout() {
      this.logoutDialog = true;
    },
    async dialogStatus() {   
        const URL = secureStorage.getItem("referrerURL");
        await this.setUserLogout();
        this.dialogConfirm = false;
        location.href = URL;
    }
  }
};
</script>

<style scoped>
.userMenu {
  z-index: 100;
  border-right: 1px solid #dddddd !important;
}
.headlineh1 {
  font-weight: 600;
  font-size: 22px;
  text-align: left;
  color: #0e2b69;
}
.logout {
  padding: 10px 20px;
  border-radius: 10px;
}
#userBalance {
  position: relative;
  color: #003f70;
  font-size: 16px;
}
.v-menu__content {
  border-radius: 15px;
}
.v-list {
  padding: 0px;
}
.userLogoutMenu {
  font-size: 12px;
  float: left;
  text-align: left;
  padding: 10px 20px;
  display: inline-grid;
}
.userLogoutMenu .balance {
  color: #003f70;
  font-size: 16px;
}
.v-list__tile i {
  font-size: 16px;
}
.v-list__tile .v-list__tile__title {
  margin-left: 5px;
  text-transform: capitalize;
  font-size: 14px;
}
.fa-15x {
  font-size: 1.45em;
}

.margin-right-5 {
  margin-right: 5px;
}

.v-avatar {
  -webkit-box-align: center;
  align-items: center;
  border-radius: 50%;
  display: -webkit-inline-box;
  display: inline-flex;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  text-align: center;
  vertical-align: middle;
  border: 2px solid;
}
</style>
