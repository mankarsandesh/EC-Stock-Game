<template>
  <div>
    <v-flex mb-5>
      <v-list subheader class="topWrap">
        <v-list-tile>
          <v-list-tile-content>
            <b>{{ $t("invitation.followBet") }}</b>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list two-line class="bodyChat" id="bodyChat">
        <template>
          <v-flex v-if="globalInvitation.length == 0" style="margin-top:50px;">
            <h2 class="text-center" style="color:#a3a3a3;">
              {{ $t("invitation.noInvitation") }}
            </h2>
          </v-flex>
        </template>
        <template v-for="item in globalInvitation">
          <v-list-tile :key="item.index" avatar class="userList">
            <nuxt-link :to="'/modern/userprofile/?id=' + item.userUUID">
              <v-list-tile-avatar :size="48">
                <img
                  :src="userImgProfile(item.userImage)"
                  class="profileImage"
                />
              </v-list-tile-avatar>
            </nuxt-link>

            <v-list-tile-content
              v-if="item.category.some(element => element == 3)"
              class="ranking"
            >
              <v-list-tile-title class="numberCenter">
                <span
                  v-if="item.category[0] == 3 && item.category.length == 1"
                  class="label"
                  >{{ $t("invitation.winningRank") }}</span
                >

                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">#{{ item.rank }}</span>
                  </template>
                  <span>{{ $t("invitation.userRank") }}</span>
                </v-tooltip>
              </v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-content
              v-if="item.category.some(element => element == 2)"
              class="followcount"
            >
              <v-list-tile-title class="numberCenter">
                <span
                  v-if="item.category[0] == 2 && item.category.length == 1"
                  class="label"
                  >{{ $t("invitation.totalFollower") }}
                </span>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">{{ item.followerCount }}</span>
                  </template>
                  <span>{{ $t("invitation.userFollowCount") }}</span>
                </v-tooltip>
              </v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-content
              v-if="item.category.some(element => element == 1)"
              class="winRate"
            >
              <v-list-tile-title class="numberCenter">
                <span
                  v-if="item.category[0] == 1 && item.category.length == 1"
                  class="label"
                  >{{ $t("invitation.winningRate") }}</span
                >

                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">{{ item.winRate }}%</span>
                  </template>
                  <span>{{ $t("invitation.userWinRate") }}</span>
                </v-tooltip>
              </v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn
                class="buttonGreensmall"
                @click="
                  followUser(item.username, item.userImage, item.userUUID, 0)
                "
                dark
              >
                {{
                  item.userUUID == getUserUUID
                    ? $t("userAction.yourself")
                    : $t("userAction.follow")
                }}
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
    </v-flex>
    <div class="messageChat">
      <v-flex col-md-12>
        <v-layout class="errorMessage">
          <v-flex> {{ this.invitationError }} </v-flex>
        </v-layout>
        <div class="catalog-container" v-if="CatValue.length > 0">
          <div
            class="catalog-item"
            v-for="(item, index) in categoryName"
            :key="index"
          >
            <v-checkbox
              class="invite-catalog"
              justify-center
              color="green"
              :height="4"
              v-model="selectCategory"
              :label="item.value + ': ' + CatValue[index]"
              :value="item.id"
            ></v-checkbox>
            <!-- CatValue[index] -->
          </div>
        </div>

        <div id="buttonInvitation" @click="sendInvitation()">
          {{ $t("invitation.sendInvitation") }} &nbsp;
          <i class="fa fa-paper-plane"></i>
        </div>
      </v-flex>
    </div>
    <!-- Follow and UnFollow Dialog box-->
    <v-dialog
      v-model="followDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar card dark style="background-color:#2cb13b;">
          <v-btn icon dark @click="followDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>
            {{
              this.FolloworNot == 1
                ? $t("userAction.followBet")
                : $t("userAction.unFollowBet")
            }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <followBet
          :username="this.username"
          :userImage="this.userImage"
          :FollowerUserUUID="this.FollowUserUUID"
          :isFollowing="this.FolloworNot"
          @followBetClose="closeFollowBet"
        />
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import config from "~/config/config.global";
import followBet from "~/components/mobile/follow/followBet";
import secureStorage from "../../plugins/secure-storage";
export default {
  data() {
    return {
      invitationError: "",
      selectCategory: [],
      categoryName: [
        {
          id: "1",
          value: window.$nuxt.$root.$t("invitation.winBets")
        },
        {
          id: "2",
          value: window.$nuxt.$root.$t("invitation.totalFollower")
        },
        {
          id: "3",
          value: window.$nuxt.$root.$t("invitation.userRank")
        }
      ],
      CatValue: [],
      globalInvitation: [],
      defaultImage: "/no-profile-pic.jpg",
      FolloworNot: "",
      FollowUserUUID: "",
      method: "",
      username: "",
      userImage: "",
      followDialog: false
    };
  },
  components: {
    followBet
  },
  created() {
    this.fetchUserInvitation();
  },
  mounted() {
    this.scrollDown();
    // Users List Invitation Socket
    this.listenForBroadcast(
      {
        channelName: `messageSend.${this.getPortalProviderUUID}.global`,
        eventName: "messageSend"
      },
      ({ data }) => {
        const objectArray = Object.entries(data.data);
        let newData = [];
        objectArray.forEach(([key, value]) => {
          newData[key] = value;
        });
        this.globalInvitation.push(newData);
        this.scrollDown();
      }
    );
  },
  computed: {
    ...mapGetters(["getPortalProviderUUID", "getUserUUID", "getStockGameId"]),
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
    }) //get 2 data from vuex first, in the computed
  },
  methods: {
    // Set Error from SnackBar
    ...mapActions(["setSnackBarError"]),
    // fetch Users Invitation
    async fetchUserInvitation() {
      try {
        const reqBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          userUUID: this.getUserUUID,
          version: config.version
        };
        const res = await this.$axios.$post(
          config.getUserInvitationDetails.url,
          reqBody,
          {
            headers: config.header
          }
        );
        if (res.code == 200) {
          this.CatValue = [
            Math.round(res.data["winRate"]) + "%",
            res.data["followerCount"],
            "#" + res.data["rank"]
          ];
        } else if (res.code == 202) {
          this.$swal({
            type: "error",
            title: this.$root.$t("popupMsg.sessionExpired"),
            confirmButtonText: this.$root.$t("popupMsg.okLogout"),
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then(result => {
            if (result.value) {
              const URL = secureStorage.getItem("referrerURL");              
                secureStorage.removeItem("USER_UUID");
                secureStorage.removeItem("PORTAL_PROVIDERUUID");
                secureStorage.removeItem("userSessionID");  
              location.href = URL;
            }
          });
        } else {
          this.messageError = true;
        }
      } catch (ex) {
        this.setSnackBarError(true);
      }
    },
    // Send Top Player Users Invitation
    async sendInvitation() {
      this.invitationError = "";
      if (this.selectCategory.length > 0) {
        try {
          const reqBody = {
            portalProviderUUID: this.getPortalProviderUUID,
            userUUID: this.getUserUUID,
            category: this.selectCategory,
            version: config.version
          };
          const res = await this.$axios.$post(
            config.getUserInvitation.url,
            reqBody,
            {
              headers: config.header
            }
          );
          if (res.code == 400) {
            this.invitationError = res.message[0];
          }
        } catch (ex) {
          this.setSnackBarError(true);
        }
      } else {
        this.invitationError = this.$root.$t("invitation.selectCategoryError");
      }
    },
    // After more Invitation Come Scroll Down Automatically
    scrollDown() {
      $(".bodyChat")
        .stop()
        .animate(
          {
            scrollTop: $(".bodyChat")[0].scrollHeight
          },
          1000
        );
    },
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    // fetch default image or from server image
    userImgProfile(userImage) {
      return userImage === null
        ? this.defaultImage
        : `${config.apiDomain}/` + userImage;
    },
    // Close Follow Bet Popup
    closeFollowBet() {
      this.followDialog = false;
    },
    // Follow and Unfollow User
    followUser(username, userImage, userUUID, method) {
      if (this.getUserUUID != userUUID) {
        this.username = username;
        this.FollowUserUUID = userUUID;
        method == 0 ? (this.FolloworNot = 1) : (this.FolloworNot = 2);
        this.userImage = this.userImgProfile(userImage);
        this.followDialog = true;
      }
    }
  }
};
</script>
<style scoped>
.catalog-container {
  display: flex;
  border-top: #f1f1f1 solid 2px;
}
.catalog-item {
  border-right: #f1f1f1 solid 1px;
}
.catalog-item:last-child {
  border-right: none !important;
}
.invite-catalog {
  font-size: 12px !important;
}
.profileImage {
  border-radius: 5px;
}
.messageChat {
  background-color: #fff;
  position: fixed;
  width: 100%;
  bottom: 0;
}
.errorMessage {
  text-align: center;
  color: red;
  text-transform: capitalize;
}
.userList {
  border-bottom: 1px solid #dddddd;
  border-top: 1px solid #dddddd;
}
.userList .ranking {
  color: #42c851;
  font-weight: 800;
  text-align: center;
}
.userList .followcount {
  color: #5f70b1;
  font-weight: 800;
  text-align: center;
}
.numberCenter {
  text-align: center;
}
.userList .winRate {
  color: #ed4561;
  font-weight: 800;
  text-align: center;
}
.label {
  color: #585757;
  font-size: 14px;
}
#buttonInvitation {
  position: relative;
  width: 100%;
  color: #fff !important;
  background-image: linear-gradient(to right, #0bb177 30%, #2bb13a 51%);
  text-align: center;
  height: 50px;
  line-height: 50px;
}

#buttonInvitation:after,
#buttonInvitation:before {
  bottom: 100%;
  left: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

#buttonInvitation:after {
  border-color: rgba(11, 177, 119, 0);
  border-bottom-color: #0bb177;
  border-width: 8px;
  margin-left: -8px;
}
#buttonInvitation:before {
  border-color: rgba(11, 177, 119, 0);
  border-bottom-color: #0bb177;
  border-width: 8px;
  margin-left: -8px;
}

.bodyChat {
  background-color: #ffffff;
  height: 90vh;
  margin-bottom: 100px;
  text-align: left;
  overflow: scroll;
  overflow-x: hidden;
  border-radius: 4px;
}
.topWrap {
  background-color: #2bb13a;
  color: #ffffff;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 14px;
  height: 45px;
}
.ranking span:hover {
  color: green;
  cursor: pointer;
}
</style>
