<template>
  <popper
    trigger="click"
    :options="{
      placement: 'bottom-end',
      modifiers: { offset: { offset: '65px' } }
    }"
  >
    <div class="popper">
      <div id="headerChat">
        <span
          class="tabs"
          v-on:click="tab1"
          v-bind:class="{ active: isActiveTab1 }"
        >
          <a href="#">EC World</a>
        </span>
        <span
          class="tabs"
          v-on:click="tab2"
          v-show="getGameChannel"
          v-bind:class="{ active: isActiveTab2 }"
        >
          <a href="#">Game Channel</a>
        </span>
      </div>

      <div class="chatRoom">
        <div v-if="allChannel">
          <div id="bodyChat" class="messages">
            <div
              id="messageChannel"
              v-for="data in getMessages"
              :key="data.index"
              class="msgUser"
            >
              <div class="messageChatView">
                <a href="#">{{ data.name }}</a>
                <span>{{ new Date(data.date).toString().slice(4, 24) }}</span>
                <p class="msgBody">{{ data.message }}</p>
              </div>
            </div>
          </div>

          <div id="messageChat">
            <input
              resize="none"
              v-model="message"
              placeholder="Say Somthing..."
              v-on:keyup.enter="sendMsg"
            />
            <span v-on:click="sendMsg" class="btn">
              <i class="fa fa-paper-plane"></i>
            </span>
          </div>
        </div>

        <div v-if="betChannel">
          <div id="bodyChat">
            <div
              class="msgUser"
              v-for="data in getMessagesGame"
              :key="data.index"
            >
              <div class="messageChatView">
                <a href="#">{{ data.name }}</a>
                <span>{{ new Date(data.date).toString().slice(4, 24) }}</span>
                <p class="msgBody">{{ data.message }}</p>
              </div>
            </div>
          </div>

          <div id="messageChat">
            <input
              resize="none"
              v-model="messageGame"
              placeholder="Say Somthing..."
              v-on:keyup.enter="sendMsgGame"
            />
            <span v-on:click="sendMsgGame" class="btn">
              <i class="fa fa-paper-plane"></i>
            </span>
          </div>
        </div>
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
import VueChatScroll from "vue-chat-scroll";
import config from "../config/config.global";
let name = "btc5";
export default {
  components: {
    popper,
    VueChatScroll,
    config
  },
  data() {
    return {
      getGameChannel: true,
      newMessages: [],
      gameUUID: "b78548b9-05a1-4a9a-826e-288010df28d0",     
      isActiveTab1: true,
      isActiveTab2: false,
      allChannel: true,
      betChannel: false,
      messageData: [],
      message: null,
      messageGame: null,
      getMessages: [],
      getMessagesGame: [],
      allMessageGame: [],
      connectClient: [],
      totoalUserCount: 0,
      userId: 0
    };
  },
  computed: {
    ...mapGetters(["getUserName", "getStockType","getStockGameId"]),
    ...mapState(["portalProviderUUID", "headers", "userUUID"])
  },
  mounted() {
    // Global Channel
    this.listenForBroadcast(
      {
        channelName: `messageSend.${this.portalProviderUUID}.${this.getStockGameId}`,
        eventName: "messageSend"
      },
      ({ data }) => {
        data.data.forEach(element => {
          console.log("Socket Listing");
          this.getMessagesGame.push({
            name: element.userName,
            userId: element.userUUID,
            message: element.message,
            date: element.date
          });
        });
      }
    );
    // Game Channel Game ID wise
    this.listenForBroadcast(
      {
        channelName: `messageSend.${this.portalProviderUUID}.global`,
        eventName: "messageSend"
      },
      ({ data }) => {
        data.data.forEach(element => {
          this.getMessages.push({
            name: element.userName,
            userId: element.userUUID,
            message: element.message,
            date: element.date
          });
        });
      }
    );
  },
  updated() {
    $("#bodyChat")
      .stop()
      .animate(
        {
          scrollTop: $("#bodyChat")[0].scrollHeight
        },
        1000
      );
  },
  created() {},
  methods: {
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    tab1: function(event) {
      this.betChannel = false;
      this.allChannel = true;
      this.isActiveTab1 = true;
      this.isActiveTab2 = false;
    },
    tab2: function(event) {
      this.allChannel = false;
      this.betChannel = true;
      this.isActiveTab2 = true;
      this.isActiveTab1 = false;
    },
    // Global Channel for all Ssers
    sendMsg: function(event) {
      if (this.message) {
        this.$axios
          .$post(
            config.sendMessage.url,
            {
              portalProviderUUID: this.portalProviderUUID,
              userUUID: this.userUUID,
              chatType: 2,
              message: this.message,
              version: config.version
            },
            {
               headers: config.header
            }
          )
          .then(response => {
            console.log(response.data);
          });
        this.message = "";
      }
    },
    sendMsgGame: function(event) {
      console.log(this.getStockGameId);
      if (this.messageGame) {
        this.$axios
          .$post(
            config.sendMessage.url,
            {
              portalProviderUUID: this.portalProviderUUID,
              userUUID: this.userUUID,
              gameUUID: this.getStockGameId,
              chatType: 1,
              message: this.messageGame,
              version: config.version
            },
            {
              headers: config.header
            }
          )
          .then(response => {
            console.log(response.data);
          });
        this.messageGame = "";
      }
    }
  }
};
</script>

<style scoped>
.liveChat {
  z-index: 999;
  position: fixed;
  right: 12px;
  bottom: 20px;
  width: 50px;
  height:50px;
  color: #fff;
  background-color: #2aaf3e !important;
}
.popper {
  width: 300px;
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
  height: 400px;
  width: 100%;
  /* margin-r: 300px; */
  padding: 2px 3px;
  border-radius: 5px;
  background-color: #fff;
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

#bodyChat {
  background-color: #fff;
  height: 350px;
  text-align: left;
  overflow: scroll;
  overflow-x: hidden;
  border-radius: 4px;
  margin-bottom: 10px;
}

.msgUser {
  border: 1px solid #cecece;
  background-color: #f5f4f4;
  padding: 5px 8px 0px;
  overflow: auto;
  border-radius: 8px;
  max-width: 350px;
  margin: 10px 10px;
  text-align: justify;
}
.msgUser span {
  background-color: #ced1d0;
  border-radius: 20px;
  padding: 2px 8px;
  float: right;
  font-size: 10px;
}
.msgUser p {
  text-align: justify;
  float: left;
  width: 100%;
  margin-top: 2px;
  margin-bottom: 5px;
  font-size: 11px;
}

.msgUser a {
  width: 50%;
  text-transform: capitalize;
  font-weight: 600;
  float: left;
  color: #003e70;
  font-size: 12px;
}

.msgBody {
  color: #7f7e7e;
}
#messageChat {
  background-color: #fff;
  height: 35px;
  padding: 0px 10px;
  width: 100%;
  display: inline-flex;
  border-radius: 5px;
  border: 1px solid #d3d2d2;
}

#messageChat input {
  float: left;
  width: 100%;
  padding: 5px;
  margin-right: 0px;
  font-size: 12px;
  height: 30px;
  resize: none;
  color: #003e70;
}

#messageChat input:focus {
  outline: none;
}

#messageChat .btn {
  padding: 5px 10px;
  color: #d3d2d2;
  cursor: pointer;
  font-size: 16px;
  margin-top: 0px;
}
#messageChat .btn:hover {
  color: #003e70;
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
