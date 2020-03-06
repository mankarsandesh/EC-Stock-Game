<template>
  <popper
    trigger="click"
    :options="{
                      placement: 'top-end',
                       modifiers: { offset: { offset: '55px' } }
                }"
  >
    <div class="popper">
      <div id="headerChat">
        <span class="tabs" v-on:click="tab1" v-bind:class="{ active: isActivetab1 }">
          <a href="#">All Channel</a>
        </span>
        <span
          class="tabs"
          v-on:click="tab2"
          v-show="getGameChannel"
          v-bind:class="{ active: isActivetab2 }"
        >
          <a href="#">Game Channel</a>
        </span>
      </div>

      <div class="chatRoom">
        <div v-if="allChannel">
          <div id="bodyChat" class="messages">
            <div id="messagechannel" v-for="data in getMessages" :key="data.index" class="msguser">
              <div class="messageChatview">
                <a href="#">{{data.name}}</a>
                <span>{{data.date}}</span>
                <p class="msgbody">{{data.message}}</p>
              </div>
            </div>
          </div>

          <div id="messageCHat">
            <input resize="none" v-model="message" placeholder="Say Somthing..." />
            <span v-on:click="sendMsg" class="btn">
              <i class="fa fa-paper-plane"></i>
            </span>
          </div>
        </div>

        <div v-if="betChannel">
          <div id="bodyChat">
            <div class="msguser" v-for="data in getMessagesGame" :key="data.index">
              <div class="messageChatview">
                <a href="#">{{data.name}}</a>
                <span>10 minutes ago</span>
                <p class="msgbody">{{data.message}}</p>
              </div>
            </div>
          </div>

          <div id="messageCHat">
            <input resize="none" v-model="messageGame" placeholder="Say Somthing..." />
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
import { mapGetters, mapActions, mapMutations } from "vuex";
import io from "socket.io-client";
import VueChatScroll from "vue-chat-scroll";
let name = "btc5";
export default {
  components: {
    popper,
    VueChatScroll
  },
  data() {
    return {
      getGameChannel: true,
      newmessages: [],
      portalProviderUUID: "f267680f-5e7f-4e40-b317-29a902e8adb7",
      gameUUID: "4578b4cc-82f0-4ebf-9b58-70bbacfc7ed8",
      userUUID: "c127dd04-cfed-4dc4-8fe9-797b8d78003c",
      uniqueUserID: Math.floor(Math.random() * (999 - 100 + 1) + 100),
      isActivetab1: true,
      isActivetab2: false,
      allChannel: true,
      betChannel: false,
      Messagedata: [],
      message: null,
      messageGame: null,
      getMessages: [],
      getMessagesGame: [],
      allmessageGame: [],
      connectClient: [],
      totoalUserCount: 0,
      userId: 0,
      socketLiveStockInput: {
        channelName:
          "messageSend.f267680f-5e7f-4e40-b317-29a902e8adb7.4578b4cc-82f0-4ebf-9b58-70bbacfc7ed8",
        eventName: "messageSend"
      }
      // username : this.getUserName.name
    };
  },
  computed: {
    ...mapGetters(["getUserName", "getStockType"])
  },
  mounted() {
    // Global Channel
    this.listenForBroadcast(
      {
        channelName: `messageSend.${this.portalProviderUUID}.global`,
        eventName: "messageSend"
      },
      ({ data }) => {
        data.data.forEach(element => {         
          this.getMessages.push({
            name: `user ${this.uniqueUserID}`,
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
        channelName: `messageSend.${this.portalProviderUUID}.${this.gameUUID}`,
        eventName: "messageSend"
      },
      ({ data }) => {
        data.data.forEach(element => {
          this.getMessagesGame.push({
            name: `user ${this.uniqueUserID}`,
            userId: element.userUUID,
            message: element.message,
            date: element.date
          });
        });
      }
    );

    this.asynUserInfo();
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
  created() {
  },
  methods: {
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    ...mapActions(["asymessages", "asymessagesGame", "asynUserInfo"]),
    tab1: function(event) {
      this.betChannel = false;
      this.allChannel = true;
      this.isActivetab1 = true;
      this.isActivetab2 = false;
    },
    tab2: function(event) {
      this.allChannel = false;
      this.betChannel = true;
      this.isActivetab2 = true;
      this.isActivetab1 = false;
    },
    // Global Channel for all Ssers
    sendMsg: function(event) {
      if (this.message) {
        this.$axios
          .$post(
            "http://uattesting.equitycapitalgaming.com/webApi/messages/send",
            {
              portalProviderUUID: this.portalProviderUUID,
              userUUID: this.userUUID,
              gameUUID: this.gameUUID,
              chatType: "2",
              message: this.message,
              version : "0.1"
            },
            {
              headers: {
                Authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh"
              }
            }
          )
          .then(response => {
            console.log(response.data);
          });

        console.log("Message Send");
        this.message = "";
      }
    },
    sendMsgGame: function(event) {
      if (this.messageGame) {
        this.$axios
          .$post(
            "http://uattesting.equitycapitalgaming.com/webApi/messages/send",
            {
              portalProviderUUID: this.portalProviderUUID,
              userUUID: this.userUUID,
              gameUUID: this.gameUUID,
              chatType: "1",
              message: this.messageGame,
              version : "0.1"
            },
            {
              headers: {
                Authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh"
              }
            }
          )
          .then(response => {
            console.log(response.data);
          });
        console.log("Send Game Message");
        console.log(this.messageGame);
        this.messageGame = "";
      }
    }
  }
};
</script>

<style scoped>
.liveChat {
  position: fixed;
  right: 60px;
  bottom: 20px;
  width: 60px;
  height: 60px;
  color: #fff;
  background-color: #2aaf3e !important;
}
.popper {
  width: 400px;
  border-radius: 15px;
  border: 1px solid #dddddd;
}
.livechatImg {
  text-align: center;
  border-radius: 6px;
  width: 30px;
  height: 30px;
  margin: 20% auto;
  background-color: #fff;
  /* border: 1px solid red; */
}

.liveChatBUtton {
  text-align: center;
  background-color: #2aaf3e;
  width: 50px;
  height: 50px;
  border-radius: 180px;
}

.chatRoom {
  height: 600px;
  width: 100%;
  /* margin-r: 300px; */
  padding: 10px 10px;
  border-radius: 5px;
  background-color: #fff;
}

#headerChat {
  height: 45px;
  /* border: 1px solid #333; */
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
  height: 40px;
  width: 40px;
  font-size: 16px;
}

#headerChat .tabs {
  text-align: center;
  width: 50%;
  /* border:1px solid red; */
  float: left;
}

#headerChat .tabs a {
  font-weight: 500;
  text-transform: uppercase;
  width: 100%;
  /* border-top-right-radius: 20px; */
  font-size: 18px;
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
  height: 480px;
  text-align: left;
  padding: 10px 0px;
  overflow: scroll;
  overflow-x: hidden;
  border-radius: 4px;
  margin-bottom: 10px;
  /* border: 1px solid #cccccc; */
}

#messageCHat {
  background-color: #fff;
  height: 45px;
  padding: 0px 10px;
  /* border: 1px solid red; */
  width: 100%;
  display: inline-flex;
}

.msguser {
  border: 1px solid #cecece;
  background-color: #f5f4f4;
  padding: 10px 15px 0px;
  overflow: auto;
  border-radius: 8px;
  max-width: 350px;
  margin: 10px 10px;
  text-align: justify;
  /* border:1px solid red; */
  /* box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2) */
}
.msguser span {
  background-color: #ced1d0;
  border-radius: 20px;
  padding: 2px 8px;
  float: right;
  font-size: 12px;
}
.msguser p {
  float: left;
  width: 100%;
  margin-bottom: 5px;
}

.msguser a {
  width: 50%;
  text-transform: capitalize;
  font-weight: 600;
  float: left;
  color: #003e70;
}

.msgbody {
  color: #7f7e7e;
}
#messageCHat {
  margin-top: 10px;
  border: 1px solid #d3d2d2;
  border-radius: 10px;
}
#messageCHat input {
  float: left;
  width: 100%;
  padding: 5px;
  margin-right: 0px;
  font-size: 15px;
  height: 40px;
  resize: none;
  color: #003e70;
}

#messageCHat input:focus {
  outline: none;
}

#messageCHat .btn {
  padding: 5px 10px;
  color: #d3d2d2;
  cursor: pointer;
  font-size: 20px;
  border-radius: 40rem;
  margin-top: 0px;
}
#messageCHat .btn:hover {
  color: #003e70;
}

/* width */
::-webkit-scrollbar {
  width: 12px;
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
