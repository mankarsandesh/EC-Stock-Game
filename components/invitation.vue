<template>
  <popper
    trigger="click"
    :options="{
      placement: 'bottom-top',
      modifiers: { offset: { offset: '65px' } }
    }"
  >
    <div class="popper">
      <div id="headerChat">
        <span
          class="tabs"
          @click="activeTab('world')"
          :class="{ active: tabActiveName === 'world' }"
        >
          <a href="#">EC World</a>
        </span>
        <span
          class="tabs"
          @click="activeTab('chanel')"
          v-if="isShowChanel"
          :class="{ active: tabActiveName === 'chanel' }"
        >
          <a href="#">Game Channel</a>
        </span>
      </div>
      <!-- conversation area -->
      <div class="chatRoom">
        <!-- for EC World -->
        <div v-if="tabActiveName === 'world'">
          <div class="conve-container">
            <div class="filter">
              <span v-for="item in filterNames" :key="item.name">
                <span class="rank filterSpan">
                  {{ item.value }}
                </span>
              </span>
            </div>
            <v-snackbar
              v-model="snackbar"
              :bottom="y === 'bottom'"
              :color="color"
              :left="x === 'left'"
              :multi-line="mode === 'multi-line'"
              :right="x === 'right'"
              :timeout="timeout"
              :top="y === 'top'"
              :vertical="mode === 'vertical'"
            >
              {{ text }}
              <v-btn dark text @click="snackbar = false">
                Close
              </v-btn>
            </v-snackbar>
            <div class="bodyChat">
              <div
                class="msgUser "
                v-for="data in globalInvitation"
                :key="data.index"
              >
                <div class="messageChatView">
                  <div style="width:30%;">
                    <v-img
                      class="userImage"
                      :src="imgProfile(data.userImage)"
                      aspect-ratio="1"
                      max-height="120"
                      max-width="120"
                    >
                    </v-img>
                    <span class="ranking">
                      <v-tooltip left>
                        <template v-slot:activator="{ on }">
                          <span v-on="on">#{{ data.Rank }} </span>
                        </template>
                        <span>User Rank</span>
                      </v-tooltip>
                    </span>
                  </div>
                  <div style="width:20%;">
                    <span class="followcount">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <span v-on="on">{{ data.followerCount }} </span>
                        </template>
                        <span>User Follow Count</span>
                      </v-tooltip>
                    </span>
                  </div>
                  <div style="width:50%;">
                    <span class="winRate">
                      <v-tooltip right>
                        <template v-slot:activator="{ on }">
                          <span v-on="on">{{ data.winRate }} </span>
                        </template>
                        <span>User Win Rate</span>
                      </v-tooltip>
                    </span>

                    <v-btn
                      v-if="getUserUUID != data.userUUID"
                      class="following"
                      v-on:click="
                        followUser(
                          null,
                          null,
                          data.userUUID,
                          '0'
                        )
                      "
                      >Follow</v-btn>
                       <v-btn
                      v-if="getUserUUID == data.userUUID"
                      class="following">Yourself</v-btn>

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
          </div>
        </div>

        <v-dialog v-model="dialog" width="500" class="followDialog">
          <followBet
            :username="this.username"
            :userImage="this.userImage"
            :FollowerUserUUID="this.FollowUserUUID"
            :isFollowing="this.FolloworNot"
          />
        </v-dialog>
        <!-- for game chanel  -->
        <chanelChat
          v-show="tabActiveName === 'chanel'"
          :gameUUID="gameUUID"
          :key="gameUUID"
        ></chanelChat>
      </div>
    </div>
    <v-btn rigth fab slot="reference" class="liveChat">
      <v-icon>chat</v-icon>
    </v-btn>
  </popper>
</template>
<script>
import popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import io from "socket.io-client";
import moment from "moment";
import config from "../config/config.global";
import chanelChat from "./chanelChat";
import followBet from "../components/modern/follow/followBet";
let name = "btc5";
export default {
  components: {
    chanelChat,
    followBet,
    popper,
    config
  },
  props: {
    gameUUID: {
      type: String
    }
  },
  data() {
    return {
      color: "",
      mode: "",
      snackbar: false,
      text: "Send Invitation to users.",
      timeout: 2000,
      x: null,
      y: "top",
      filterNames: [
        { name: "", value: "Filter" },
        { name: "rank", value: "Winning Rank" },
        { name: "rate", value: "Winning Rate" },
        { name: "follow", value: "Winning Followers" }
      ],
      FolloworNot: "",
      FollowUserUUID: "",
      username: "",
      userImage: "",
      dialog: false,
      profilePic: "/no-profile-pic.jpg",
      selectedFruits: [],
      currentRoute: "",
      messageInput: "",
      pageActiveChanel: [
        "modern-desktop-id",
        "modern-multigame-id",
        "modern-fullscreen-id"
      ],
      tabActiveName: "world",
      globalInvitation: [],
      connectClient: [],
      totoalUserCount: 0,
      userId: 0
    };
  },
  computed: {
    icon() {
      if (this.likesAllFruit) return "mdi-close-box";
      if (this.likesSomeFruit) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
    ...mapGetters([
      "getPortalProviderUUID",
      "getUserUUID",
      "getStockType",
      "getStockGameId"
    ]),
    isShowChanel() {
      if (this.pageActiveChanel.includes(this.$route.name)) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    console.log(this.getUserUUID);
     console.log(this.getPortalProviderUUID);
    // Global Wise
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
        console.log(this.globalInvitation);
        this.scrollDown();
      }
    );
  },
  updated() {
    this.scrollDown();
  },
  created() {
    this.currentRoute = this.$route.name;
    //reset chat messgae
    this.messageInput = "";
  },
  methods: {
    // Send Invitation
    async sendInvitation() {
      try {
        const sendData = {
          portalProviderUUID: this.getPortalProviderUUID,
          userUUID: this.getUserUUID,
          category: [1],
          version: config.version
        };
        console.log(sendData, "Send Invitation");
        const res = await this.$axios.$post(
          config.getUserInvitation.url,
          sendData,
          {
            headers: config.header
          }
        );
        this.snackbar = true;
      } catch (ex) {
        console.log(ex.message);
      }
    },
    // fetch default image or from server image
    imgProfile(userImage) {
      return userImage === null
        ? "/no-profile-pic.jpg"
        : `${config.apiDomain}/` + userImage;
    },
    followUser(username, userImage, userUUID, method) {
      this.username = username;
      this.FollowUserUUID = userUUID;
      this.FolloworNot = method;
      this.userImage = this.imgProfile(userImage);
      this.dialog = true;
    },
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllFruit) {
          this.selectedFruits = [];
        } else {
          this.selectedFruits = this.fruits.slice();
        }
      });
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
    activeTab(value) {
      this.tabActiveName = value;
    }
  }
};
</script>

<style scoped>
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
  color: #fff !important;
  border-radius: 5px;
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
  width: 400px;
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
  padding: 2px 3px;
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
  margin: 6px 12px;
  color: #42c851;
  font-weight: 800;
  text-align: center;
}
.msgUser .followcount {
  float: left;
  text-align: center;
  font-size: 20px;
  margin: 6px 20px;
  color: #5f70b1;
  font-weight: 800;
}
.msgUser .winRate {
  float: left;
  font-size: 20px;
  margin: 6px;
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
  width: 30px;
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
  height: 400px;
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
  width: 92%;
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
