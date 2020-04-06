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
            <div class="bodyChat">
              <div class="msgUser">
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
                    <span class="userStatus">Winning Rank</span>
                  </div>
                  <div>
                    <span class="ranking">1</span>
                  </div>
                  <div>
                    <v-btn class="view">View</v-btn>
                  </div>
                  <div>
                    <v-btn class="follow">Follow</v-btn>
                  </div>
                </div>
              </div>
               <div class="msgUser">
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
                    <span class="userStatus">Winning Rank</span>
                  </div>
                  <div>
                    <span class="ranking">1</span>
                  </div>
                  <div>
                    <v-btn class="view">View</v-btn>
                  </div>
                  <div>
                    <v-btn class="follow">Follow</v-btn>
                  </div>
                </div>
              </div>
            </div>

            <div class="messageChat">
              <v-flex col-md-6>
                <div id="categoryShow" v-if="showCategory == true">
                  <span>
                    <v-checkbox
                      v-for="n in items1"
                      :key="n"
                      v-model="checkbox"
                      :label="`${n.toString()}`"
                    ></v-checkbox>
                  </span>
                </div>
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
let name = "btc5";
export default {
  components: {
    chanelChat,
    popper,
    config,
  },
  props: {
    gameUUID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      profilePic: "/no-profile-pic.jpg",
      checkbox: "",
      selectedFruits: [],
      showCategory: false,
      items1: ["Winning Rank", "Winning Rate", " Total followers"],
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
      "getUserName",
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
    clickCategory() {
      console.log("hello");
      this.showCategory = true;
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
  /* margin-r: 300px; */
  padding: 2px 3px;
  border-radius: 5px;
  background-color: #fff;
}

.msgUser {
  border: 1px solid #cecece;
  background-color: #f5f4f4;
  padding: 5px;
  overflow: auto;
  border-radius: 8px;
  max-width: 370px;
  text-align: justify;
  margin:5px 0px;
}

.messageChatView div {
  float: left;
}
.messageChatView .userImage {
  border-radius: 180px;
  width: 40px;
  height: 40px;
  float: left;
}
.messageChatView .userStatus {
  float: left;
  margin: 10px 5px;
}
.messageChatView .ranking {
  float: left;
  margin: 10px 3px;
  border-radius: 180px;
  background-color: #333;
  color: #fff;
  width: 20px;
  height: 20px;
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
  margin: 10px 4px;
}
.messageChatView .follow {
  float: left;
  background-image: linear-gradient(to right, #0bb177 30%, #2bb13a 51%);
  border-radius: 6px;
  color: #fff;
  box-shadow: none;
  height: 25px;
  width: 30px;
  font-size: 12px;
  margin: 10px 4px;
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
  height: 430px;
  text-align: left;
  overflow: scroll;
  overflow-x: hidden;
  border-radius: 4px;
  margin-bottom: 10px;
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
