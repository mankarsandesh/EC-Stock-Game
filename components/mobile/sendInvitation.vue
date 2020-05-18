<template>
  <div>
    <v-flex>
      <v-list subheader class="topWrap">
        <v-list-tile>
          <v-list-tile-content>
            <b>{{$t("invitation.followBet")}}</b>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list two-line class="bodyChat">
        <template>
          <v-flex v-if="globalInvitation.length == 0" style="margin-top:200px;">
            <h2 class="text-center" style="color:#a3a3a3;">{{$t("invitation.noInvitation")}}</h2>
          </v-flex>
        </template>
        <template v-for="item in globalInvitation">
          <v-list-tile :key="item.index" avatar class="userList">
            <nuxt-link :to="'/modern/userprofile/' + item.userUUID">
              <v-list-tile-avatar>
                <img :src="userImgProfile(item.userImage)" />
              </v-list-tile-avatar>
            </nuxt-link>

            <v-list-tile-content v-if="item.category.some(element => element == 3)" class="ranking">
              <v-list-tile-title>
                <span
                  v-if="item.category[0] == 3 && item.category.length == 1"
                  class="label"
                >{{ $t("invitation.winningRank") }}</span>

                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">#{{ item.Rank }}</span>
                  </template>
                  <span>{{ $t("invitation.userRank") }}</span>
                </v-tooltip>
              </v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-content
              v-if="item.category.some(element => element == 2)"
              class="followcount"
            >
              <v-list-tile-title>
                <span
                  v-if="item.category[0] == 2 && item.category.length == 1"
                  class="label"
                >{{ $t("invitation.totalFollower") }}</span>

                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">{{ item.followerCount }}</span>
                  </template>
                  <span>{{ $t("invitation.userFollowCount") }}</span>
                </v-tooltip>
              </v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-content v-if="item.category.some(element => element == 1)" class="winRate">
              <v-list-tile-title>
                <span
                  v-if="item.category[0] == 1 && item.category.length == 1"
                  class="label"
                >{{ $t("invitation.winningRate") }}</span>

                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">#{{ item.winRate }}</span>
                  </template>
                  <span>{{ $t("invitation.userWinRate") }}</span>
                </v-tooltip>
              </v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn
                v-bind:class="[
                  item.userUUID == getUserUUID
                    ? 'buttonGreensmall'
                    : 'buttonGreensmall'
                ]"
                v-on:click="
                  followUser(
                    item.username,
                    item.userImage,
                    item.userUUID,
                    item.isFollowing
                  )
                "
                dark
              >
                {{
                item.userUUID == getUserUUID
                ? $t("useraction.yourself")
                : $t("useraction.follow")
                }}
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
    </v-flex>
    <div class="messageChat">
      <v-flex col-md-12>
        <v-layout justify-center>
          <v-flex v-for="(item, index) in categoryName" v-bind:key="index" pl-3>
            <!-- {{ item.value == 'Win Bets' ? 'itswin' : 'Total Followers' ? 'itsfollow' : 'ser rank'}} -->
            <!-- {{ item.value == 'Total Followers' ? 'itsfollow' : 'isdfcdfvdss'}} -->
            <v-checkbox :height="5" v-model="selectCategory" :label="item.value" :value="item.id"></v-checkbox>
          </v-flex>
        </v-layout>

        <v-btn class="buttonInvitation" @click="sendInvitation()">
          {{$t("invitation.sendInvitation")}} &nbsp;
          <i class="fa fa-paper-plane"></i>
        </v-btn>
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
            this.FolloworNot == 1 ? $t("useraction.followBet") : $t("useraction.unFollowBet")
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
export default {
  data() {
    return {
      selectCategory: [],
      categoryName: [
        {
          id: "1",
          value: this.$root.$t("invitation.winBets")
        },
        {
          id: "2",
          value: this.$root.$t("invitation.totalFollower")
        },
        {
          id: "3",
          value: this.$root.$t("invitation.userRank")
        }
      ],
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
  mounted() {
    // Users List Invitaion Socket
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
    // Send Top Player Users Invitation
    async sendInvitation() {
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
        } catch (ex) {
          this.setSnackBarError(true);
        }
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
.userList {
  border-bottom: 1px solid #dddddd;
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
.userList .winRate {
  color: #42c851;
  font-weight: 800;
  text-align: center;
}
.label {
  color: #585757;
  font-size: 14px;
}
.buttonInvitation {
  padding: 8px;
  width: 96%;
  color: #fff !important;
  border-radius: 3px;
  background-image: linear-gradient(to right, #0bb177 30%, #2bb13a 51%);
  text-align: center;
  height: 40px;
}
.bodyChat {
  padding-top: 10px;
  border-bottom: 1px solid #dddddd;
  background-color: #f4f4f4;
  height: 500px;
  text-align: left;
  overflow: scroll;
  overflow-x: hidden;
  border-radius: 4px;
  margin-top: 10px;
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
