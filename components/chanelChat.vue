<template>
  <div class="conve-container">
    <div class="bodyChat">
      <div
        class="messageChatView noRecord"
        v-if="conversationChanel.length == 0"
      >
        <i class="fa fa-bell"></i>
        <p>There are no users Invitaion in {{ stockName }} Channel.</p>
      </div>

      <div v-for="data in conversationChanel" :key="data.index" class="msgUser">
        <div class="messageChatView">
          <div style="width:30%;">
            <nuxt-link :to="'/modern/desktop/userprofile/' + data.userUUID">
              <v-img
                class="userImage"
                :src="defaultImage"
                aspect-ratio="1"
                max-height="120"
                max-width="120"
              >
              </v-img>
            </nuxt-link>
            <span class="ranking">
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <span v-on="on">#{{ data.Rank }} </span>
                </template>
                <span>User Rank</span>
              </v-tooltip>
            </span>
          </div>
          <div style="width:15%;">
            <span class="followcount">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ data.followerCount }} </span>
                </template>
                <span>User Follow Count</span>
              </v-tooltip>
            </span>
          </div>
          <div style="width:55%;">
            <span class="winRate">
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <span v-on="on">{{ data.winRate }}% </span>
                </template>
                <span>User Win Rate</span>
              </v-tooltip>
            </span>

            <v-btn
              v-if="getUserUUID != data.userUUID"
              class="following"
              v-on:click="followUser(null, null, data.userUUID, 0)"
              >Follow</v-btn
            >
            <v-btn v-if="getUserUUID == data.userUUID" class="following"
              >Yourself</v-btn
            >
          </div>
        </div>
      </div>
    </div>

    <div class="messageChat">
      <v-flex col-md-12>
        <v-btn class="buttonInvitation" @click="sendInvitation()"
          >Send Invitation &nbsp;<i class="fa fa-paper-plane"></i
        ></v-btn>
      </v-flex>
    </div>
    <!-- Follow Dialog -->
    <v-dialog v-model="dialog" width="500" class="followDialog">
      <followBet
        :username="this.username"
        :userImage="defaultImage"
        :FollowerUserUUID="this.FollowUserUUID"
        :isFollowing="this.FolloworNot"
        @followBetClose="closeFollowBet"
      />
    </v-dialog>
  </div>
</template>

<script>
import config from "~/config/config.global";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import followBet from "~/components/modern/follow/followBet";
import log from "roarr";

export default {
  components: {
    followBet
  },
  props: {
    gameUUID: {
      type: String
    },
    stockName: {
      type: String
    }
  },
  data() {
    return {
      FolloworNot: "",
      FollowUserUUID: "",
      username: "",
      userImage: "",
      dialog: false,
      defaultImage: "/no-profile-pic.jpg",
      messageInput: "",
      conversationChanel: []
    };
  },
  methods: {
     // Close Follow Bet Popup
    closeFollowBet(){
      this.dialog = false;
    },
    // Send follow user Data and Open Popup
    followUser(username, userImage, userUUID, method) {
      this.username = username;
      this.FollowUserUUID = userUUID;
      if (method == 0) {
        this.FolloworNot = 1;
      } else {
        this.FolloworNot = 2;
      }
      this.userImage = this.imgProfile(userImage);
      this.dialog = true;
    },
    // Fetch default image or from server image
    imgProfile(userImage) {
      return userImage === null
        ? "/no-profile-pic.jpg"
        : `${config.apiDomain}/` + userImage;
    },
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
    // Channel for gameUUDI
    async sendInvitation() {
      try {
        var reqBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          userUUID: this.getUserUUID,
          gameUUID: this.gameUUID,
          category: [1, 2, 3],
          version: config.version
        };       
        var res = await this.$axios.$post(
          config.getUserInvitation.url,
          reqBody,
          {
            headers: config.header
          }
        );
        if (res.status) {
          this.snackbar = true;
        } else {
          throw new Error(config.error.general);
        }
      } catch (ex) {
        console.log(ex.message);
        log.error(
          {
            req: reqBody,
            res,
            page: "components/channelChat.vue",
            apiUrl: config.getUserInvitation.url,
            provider: localStorage.getItem("PORTAL_PROVIDERUUID"),
            user: localStorage.getItem("USER_UUID")
          },
          ex.message
        );
      }
    }
  },
  mounted() {
    this.scrollDown();
    this.listenForBroadcast(
      {
        channelName: `messageSend.${this.getPortalProviderUUID}.${this.gameUUID}`,
        eventName: "messageSend"
      },
      ({ data }) => {
        const objectArray = Object.entries(data.data);
        let newData = [];
        objectArray.forEach(([key, value]) => {
          newData[key] = value;
        });
        this.conversationChanel.push(newData);
        this.scrollDown();
      }
    );
  },
  computed: {
    ...mapGetters(["getPortalProviderUUID", "getUserUUID"]),
    isShowChanel() {
      if (this.pageActiveChanel.includes(this.$route.name)) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.noRecord {
  text-align: center;
  font-size: 16px;
  padding-top: 50%;
  color: #777777;
}
.noRecord i {
  font-size: 24px;
}
.followDialog {
  width: 600px;
  border-radius: 10px;
  padding: 10px;
}
.followup {
  padding: 15px 30px;
  border-radius: 20px;
}
.followup h4 {
  color: #65686f;
}
.conve-container {
  position: relative;
  display: flex;
  flex-direction: column;
}
.buttonInvitation {
  margin-top: -1px;
  color: #fff !important;
  border-radius: 3px;
  background-image: linear-gradient(to right, #0bb177 30%, #2bb13a 51%);
  font-size: 14px;
  width: 100%;
}
.liveChat {
  z-index: 999;
  position: fixed;
  right: 0px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  color: #fff;
  background-color: #2aaf3e !important;
}
.popper {
  width: 370px;
  border-radius: 10px;
  border: 1px solid #dddddd;
}
.liveChatImg {
  text-align: center;
  border-radius: 6px;
  width: 30px;
  height: 30px;
  margin: 20% auto;
  background-color: #fff;
  /* border: 1px solid red; */
}

.liveChatButton {
  text-align: center;
  background-color: #2aaf3e;
  width: 50px;
  height: 50px;
  border-radius: 180px;
}

.chatRoom {
  height: 500px;
  width: 100%;
  padding: 2px 3px;
  border-radius: 5px;
  background-color: #fff;
}

.msgUser {
  padding: 2px 0px;
  overflow: auto;
  border-radius: 8px;
  max-width: 375px;
  text-align: justify;
  margin: 5px 0px;
  background-color: #fff;
  border: 1px solid #dddddd;
}
.filter {
  margin-top: 10px;
}

.filter .filterSpan {
  font-weight: 600;
  cursor: pointer;
  border-radius: 4px;
  padding: 5px;
  margin: 10px 5px;
  font-size: 12px;
  color: #8d8c8c;
}
.follow {
  border: 1px solid orange;
}
.rank {
  border: 1px solid #c6b2f0;
}
.rate {
  border: 1px solid green;
}
.messageChatView div:first-child {
  border: none;
}
.messageChatView div {
  cursor: pointer;
  float: left;
  text-align: center;
  border-left: 1px solid #dddddd;
  height: 50px;
  padding: 5px 4px;
}

.messageChatView .userImage {
  border-radius: 180px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  float: left;
  border: 1px solid #dddddd;
}
.messageChatView .userStatus {
  float: left;
  margin: 12px 5px;
  font-size: 13px;
  color: #8d8c8c;
  font-weight: 800;
}
.msgUser .ranking {
  float: left;
  font-size: 20px;
  margin: 6px 8px;
  color: #42c851;
  font-weight: 800;
  text-align: center;
}
.msgUser .followcount {
  float: left;
  text-align: center;
  font-size: 20px;
  margin: 6px 15px;
  color: #5f70b1;
  font-weight: 800;
}
.msgUser .winRate {
  float: left;
  font-size: 20px;
  margin: 6px 0px;
  color: #ed4560;
  font-weight: 800;
  text-align: center;
}
.messageChatView .following {
  float: right;
  background-image: linear-gradient(to right, #0bb177 30%, #2bb13a 51%);
  border-radius: 6px;
  color: #fff;
  box-shadow: none;
  height: 24px;
  width: 28px;
  margin-top: 10px;
  font-size: 13px;
}
#headerChat {
  height: 45px;
}
#headerChat span:first-child a {
  border-top-left-radius: 15px;
}
#headerChat span:last-child a {
  border-top-right-radius: 15px;
}

#headerChat .tabs span {
  background-color: #fff;
  color: #333;
  padding: 0px 4px;
  height: 30px;
  width: 30px;
  font-size: 14px;
}

#headerChat .tabs {
  text-align: center;
  width: 50%;
  float: left;
}

#headerChat .tabs a {
  font-weight: 500;
  text-transform: uppercase;
  width: 100%;
  /* border-top-right-radius: 20px; */
  font-size: 13px;
  float: left;
  padding: 10px 15px;

  color: #333;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2) !important;
}

#headerChat .active a {
  color: #fff;
  background-image: linear-gradient(to right, #0bb177 30%, #2bb13a 51%);
  background-color: #003e70 !important;
}

.bodyChat {
  padding-top: 10px;
  border-bottom: 1px solid #dddddd;
  background-color: #f4f4f4;
  height: 435px;
  text-align: left;
  overflow: scroll;
  overflow-x: hidden;
  border-radius: 4px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.msgBody {
  color: #7f7e7e;
}
.messageChat {
  width: 95%;
  bottom: 7px;
  background-color: #fff;
}

/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 7px #acacac;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #acacac;
  border-radius: 15px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #2c6b9e;
}
</style>
