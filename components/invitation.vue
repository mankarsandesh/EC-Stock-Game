<template>
  <popper
    trigger="click"
    :options="{
      placement: 'bottom-top',
      modifiers: { offset: { offset: '65px' } },
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
              <b>Filter</b>
              <span class="rank">
                Winning Rank
              </span>
              <span class="rate">
                Winning Rate
              </span>
              <span class="follow">
                Winning Followers
              </span>
            </div>

            <div class="bodyChat">
              <div class="msgUser follow">
                <div class="messageChatView">
                  <div>
                    <v-img
                      class="userImage"
                      :src="profilePic"
                      aspect-ratio="1"
                      max-height="100"
                      max-width="100"
                    >
                    </v-img>
                  </div>
                  <div>
                    <span class="userStatus">Total Follower</span>
                  </div>
                  <div>
                    <span class="ranking">951</span>
                  </div>
                  <div>
                    <v-btn class="view">View</v-btn>
                  </div>
                  <div>
                    <v-btn class="following" v-on:click="followUser()"
                      >Follow</v-btn
                    >
                  </div>
                </div>
              </div>

              <div class="msgUser rank">
                <div class="messageChatView">
                  <div>
                    <v-img
                      class="userImage"
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                      aspect-ratio="1"
                      max-height="100"
                      max-width="100"
                    >
                    </v-img>
                  </div>
                  <div>
                    <span class="userStatus">Winning Rank</span>
                  </div>
                  <div>
                    <span class="ranking">1</span>
                  </div>
                  <div>
                    <v-btn class="view">View</v-btn>
                  </div>
                  <div>
                    <v-btn class="following">Follow</v-btn>
                  </div>
                </div>
              </div>

              <div class="msgUser rate">
                <div class="messageChatView">
                  <div>
                    <v-img
                      class="userImage"
                      src="https://avatars1.githubusercontent.com/u/5690050?s=400&u=c5f7fa635adf05ae5a0431d2518898a66f942662&v=4"
                      aspect-ratio="1"
                      max-height="100"
                      max-width="100"
                    >
                    </v-img>
                  </div>
                  <div>
                    <span class="userStatus">Winning Rate</span>
                  </div>
                  <div>
                    <span class="ranking">95%</span>
                  </div>
                  <div>
                    <v-btn class="view">View</v-btn>
                  </div>
                  <div>
                    <v-btn class="following">Follow</v-btn>
                  </div>
                </div>
              </div>

              <div class="msgUser rate">
                <div class="messageChatView">
                  <div>
                    <v-img
                      class="userImage"
                      src="https://avatars1.githubusercontent.com/u/5690050?s=400&u=c5f7fa635adf05ae5a0431d2518898a66f942662&v=4"
                      aspect-ratio="1"
                      max-height="100"
                      max-width="100"
                    >
                    </v-img>
                  </div>
                  <div>
                    <span class="userStatus">Winning Rate</span>
                  </div>
                  <div>
                    <span class="ranking">95%</span>
                  </div>
                  <div>
                    <v-btn class="view">View</v-btn>
                  </div>
                  <div>
                    <v-btn class="following">Follow</v-btn>
                  </div>
                </div>
              </div>

              <div class="msgUser follow">
                <div class="messageChatView">
                  <div>
                    <v-img
                      class="userImage"
                      :src="profilePic"
                      aspect-ratio="1"
                      max-height="100"
                      max-width="100"
                    >
                    </v-img>
                  </div>
                  <div>
                    <span class="userStatus">Total Follower</span>
                  </div>
                  <div>
                    <span class="ranking">951</span>
                  </div>
                  <div>
                    <v-btn class="view">View</v-btn>
                  </div>
                  <div>
                    <v-btn class="following">Follow</v-btn>
                  </div>
                </div>
              </div>

              <div class="msgUser follow">
                <div class="messageChatView">
                  <div>
                    <v-img
                      class="userImage"
                      :src="profilePic"
                      aspect-ratio="1"
                      max-height="100"
                      max-width="100"
                    >
                    </v-img>
                  </div>
                  <div>
                    <span class="userStatus">Total Follower</span>
                  </div>
                  <div>
                    <span class="ranking">951</span>
                  </div>

                  <div>
                    <v-btn class="following">Follow</v-btn>
                  </div>
                </div>
              </div>

              <div class="msgUser rate">
                <div class="messageChatView">
                  <div>
                    <v-img
                      class="userImage"
                      src="https://avatars1.githubusercontent.com/u/5690050?s=400&u=c5f7fa635adf05ae5a0431d2518898a66f942662&v=4"
                      aspect-ratio="1"
                      max-height="100"
                      max-width="100"
                    >
                    </v-img>
                  </div>
                  <div>
                    <span class="userStatus">Winning Rate</span>
                  </div>
                  <div>
                    <span class="ranking">95%</span>
                  </div>
                  <div>
                    <v-btn class="view">View</v-btn>
                  </div>
                  <div>
                    <v-btn class="following">Follow</v-btn>
                  </div>
                </div>
              </div>
            </div>

            <div class="messageChat">
              <v-flex col-md-6>
                <v-btn class="buttonInvitation"
                  >Send Invitation &nbsp;<i class="fa fa-paper-plane"></i
                ></v-btn>
              </v-flex>
              <v-flex col-md-6>
                <v-btn class="buttonInvitation">
                  Select Category
                </v-btn>
              </v-flex>
            </div>
          </div>
        </div>

        <v-dialog v-model="dialog" width="500" class="followDialog">
          <followBet/>
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
import followBet from '../components/modern/follow/followBet';
let name = "btc5";
export default {
  components: {
    chanelChat,
    popper,
    config,
    followBet
  },
  props: {
    gameUUID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {     
      dialog: false,     
      profilePic: "/no-profile-pic.jpg",
      selectedFruits: [],
      currentRoute: "",
      messageInput: "",
      pageActiveChanel: [
        "modern-desktop-id",
        "modern-multigame-id",
        "modern-fullscreen-id",
      ],
      tabActiveName: "world",
      conversationWorld: [],
      connectClient: [],
      totoalUserCount: 0,
      userId: 0,
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
      "getStockGameId",
    ]),
    isShowChanel() {
      if (this.pageActiveChanel.includes(this.$route.name)) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.listenForBroadcast(
      {
        channelName: `messageSend.${this.portalProviderUUID}.${this.getStockGameId}`,
        eventName: "messageSend",
      },
      ({ data }) => {
        data.data.forEach((element) => {
          this.getMessagesGame.push({
            name: element.userName,
            userId: element.userUUID,
            message: element.message,
            date: element.date,
          });
        });
      }
    );
    // Game Channel Game ID wise
    this.listenForBroadcast(
      {
        channelName: `messageSend.${this.getPortalProviderUUID}.global`,
        eventName: "messageSend",
      },
      ({ data }) => {
        console.log("world Listing");
        console.log(data);
        data.data.forEach((element) => {
          this.conversationWorld.push({
            name: element.userName,
            userUUID: element.getUserUUID,
            message: element.message,
            date: element.date,
          });
        });
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
    followUser() {
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
            scrollTop: $(".bodyChat")[0].scrollHeight,
          },
          1000
        );
    },
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    activeTab(value) {
      this.tabActiveName = value;
    },
    // Global Channel for all Ssers
    async sendMsgWorld() {
      try {
        if (this.messageInput !== "") {
          const res = await this.$axios.$post(
            config.sendMessage.url,
            {
              portalProviderUUID: this.getPortalProviderUUID,
              userUUID: this.getUserUUID,
              chatType: 2,
              message: this.messageInput,
              version: config.version,
            },
            {
              headers: config.header,
            }
          );
          console.log(res);
          if (res.status) {
            this.messageInput = "";
          }
        }
      } catch (ex) {
        this.sendMsgWorld();
        console.log(ex.message);
      }
    },
    // Channel for gameUUDI
    async sendMsgChanel() {
      try {
        if (this.messageInput !== "") {
          const res = await this.$axios.$post(
            config.sendMessage.url,
            {
              portalProviderUUID: this.getPortalProviderUUID,
              userUUID: this.getUserUUID,
              gameUUID: this.gameUUID,
              chatType: 1,
              message: this.messageInput,
              version: config.version,
            },
            {
              headers: config.header,
            }
          );
          if (res.status) {
            this.messageInput = "";
          }
        }
      } catch (ex) {
        this.sendMsgChanel();
        console.log(ex.message);
      }
    },
  },
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
  border-radius: 10px;
  background-image: linear-gradient(to right, #0bb177 30%, #2bb13a 51%);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3) !important;
  font-size: 12px;
  float: right;
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
  padding: 4px;
  overflow: auto;
  border-radius: 8px;
  max-width: 370px;
  text-align: justify;
  margin: 5px 0px;
}
.filter {
  margin-top: 10px;
}
.filter span {
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
.messageChatView div {
  float: left;
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
.follow .ranking {
  float: left;
  font-size: 14px;
  margin: 12px 6px;
  color: green;
  font-weight: 800;
  text-align: center;
}
.rank .ranking {
  float: left;
  text-align: center;
  font-size: 14px;
  margin: 12px 6px;
  background-color: yellowgreen;
  color: #333;
  width: 25px;
  height: 25px;
  border-radius: 180px;
  font-weight: 800;
}
.rate .ranking {
  float: left;
  font-size: 14px;
  margin: 12px 6px;
  color: orange;
  font-weight: 800;
  text-align: center;
}
.messageChatView .view {
  float: left;
  background-image: linear-gradient(to right, #888787 30%, #626161 51%);
  border-radius: 6px;
  color: #fff;
  box-shadow: none;
  height: 25px;
  width: 30px;
  font-size: 12px;
  margin: 10px 3px;
}
.messageChatView .following {
  float: left;
  background-image: linear-gradient(to right, #0bb177 30%, #2bb13a 51%);
  border-radius: 6px;
  color: #fff;
  box-shadow: none;
  height: 25px;
  width: 30px;
  font-size: 12px;
  margin: 10px 3px;
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
  background-color: redff;
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
