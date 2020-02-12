<template>
  <popper
    trigger="click"
    :options="{
                      placement: 'top-end',
                       modifiers: { offset: { offset: '55px' } }
                }"
  >
    <div class="popper" style="width:400px;">
      <div class="chatRoom">
        <div id="headerChat">
          <span class="tabs" v-on:click="tab1" v-bind:class="{ active: isActivetab1 }">
            <a href="#">All Channel</a>
          </span>
          <span class="tabs" v-on:click="tab2" v-bind:class="{ active: isActivetab2 }">
            <a href="#">Current Bet</a>
          </span>
        </div>

        <div v-if="allChannel">
          <div id="bodyChat" class="messages">
            <div id="messagechannel" v-for="data in getMessages" :key="data.index" class="msguser">
              <div class="messageChatview">
                <a href="#">{{data.name}}</a>
                <p class="msgbody">{{data.message}}</p>
              </div>
            </div>
          </div>

          <div id="messageCHat">
            <input resize="none" v-model="message" placeholder="Say Somthing..." />
            <v-btn v-on:click="sendMsg" class="btn">
              <i class="fa fa-paper-plane"></i>
            </v-btn>
          </div>
        </div>

        <div v-if="betChannel">
          <div id="bodyChat">
            <div class="msguser" v-for="data in getMessagesGame" :key="data.index">
              <div class="messageChatview">
                <a href="#">{{data.name}}</a>
                <p class="msgbody">{{data.message}}</p>
              </div>
            </div>
          </div>

          <div id="messageCHat">
            <input resize="none" v-model="messageGame" placeholder="Say Somthing..." />
            <v-btn v-on:click="sendMsgGame" class="btn">
              <i class="fa fa-paper-plane"></i>
            </v-btn>
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
import { mapGetters, mapActions } from "vuex";
import io from "socket.io-client";
import VueChatScroll from "vue-chat-scroll";

// export const socket = io("http://159.138.47.250", {
//     transports: ["polling"],
//     query: `userId=123`
// });
// export const socketGame = io("http://159.138.47.250", {
//     transports: ["polling"],
//     path: "/chatgame/socket.io"
// });

export default {
  components: {
    popper,
    VueChatScroll
  },
  data() {
    return {
      isActivetab1: true,
      isActivetab2: false,
      allChannel: true,
      betChannel: false,
      Messagedata: [],
      message: null,
      messageGame: null,
      allmessage: [],
      allmessageGame: [],
      connectClient: [],
      totoalUserCount: 0,
      userId: 0
      // username : this.getUserName.name
    };
  },
  computed: {
    ...mapGetters([
      "getMessages",
      "getMessagesGame",
      "getUserName",
      "getStockType"
    ])
  },
  mounted() {
    this.asymessages();
    this.asymessagesGame();
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
    // console.log(this.getUserName.userId);
    // Socket for Channel
    // console.log("created run");
    // socket.on("new-message-global", data => {
    //     // console.log("created");
    //     // console.log(data);
    //     this.getMessages.push({
    //         name: data.name,
    //         userId: data.userId,
    //         message: data.message
    //     });
    //     // console.log(this.getMessages);
    // });
    // Socket for Game
    // socketGame.on("new-message-game", data => {
    //     // console.log("created Game two");
    //     // console.log(data);
    //     this.getMessagesGame.push({
    //         name: data.name,
    //         userId: data.userId,
    //         message: data.message
    //     });
    // });
    // socket.on("user-count-global", data => {
    //     // console.log("Count");
    //     // console.log(data);
    //     this.totoalUserCount = data;
    // });
    // socket.on('chat-global', (data) => {
    //     // console.log(data);
    // });
    // socketGame.on('chat-game', data => {
    //     // console.log(data);
    // });
  },
  methods: {
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
    sendMsg: function(event) {
      if (this.message) {
        // socket.emit("send-message-global", {
        //     message: this.message,
        //     userId: this.getUserName.userId,
        //     name: this.getUserName.name
        // });
        console.log("Message Send");
        this.message = "";
      }
    },
    sendMsgGame: function(event) {
      if (this.messageGame) {
        // socketGame.emit("send-message-game", {
        //     message: this.messageGame,
        //     userId: this.getUserName.userId,
        //     name: this.getUserName.name,
        //     gameId: 13213
        // });
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
  right: 80px;
  bottom: 20px;
  width: 60px;
  height: 60px;
  color: #fff;
  /* background: radial-gradient(circle at bottom left, transparent 58%, #333 60%); */
  /* background-attachment: fixed; */
  background-color: #2aaf3e !important;
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

#headerChat .tabs span {
  background-color: #fff;
  color: #333;
  padding: 0px 4px;
  height: 40px;
  width: 40px;
  font-size: 16px;
  border-radius: 180px;
}

#headerChat .tabs {
  text-align: center;
  width: 45%;
  margin-right: 10px;
  float: left;
}

#headerChat .tabs a {
  margin-left: 10px;
  width: 100%;
  border-radius: 10px;
  color: #003e70;
  font-size: 16px;
  float: left;
  padding: 5px 10px;
  border: 1px solid #003e70;
}

#headerChat .active a {
  color: #fff;
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
  background: #dcdfe0;
  color: #003e70;
  padding: 3px 15px 0px;
  overflow: auto;
  border-radius: 8px;
  max-width: 350px;
  margin: 10px 10px;
  text-align: justify;
  /* border:1px solid red; */
  /* box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2) */
}

.msguser p {
  margin-bottom: 5px;
}

.msguser a {
  text-transform: capitalize;
  font-weight: 600;
  color: #003e70;
}

.msgbody {
  color: #003e70;
}

#messageCHat input {
  float: left;
  border: 1px solid #084e88;
  width: 90%;
  padding: 5px;
  margin-right: 0px;
  font-size: 15px;
  height: 40px;
  resize: none;
  color: #003e70;
  border-radius: 4px;
}

#messageCHat input:focus {
  outline: none;
}

#messageCHat .btn {
  /* background-color: #003e70; */
  color: #333;
  height: 37px;
  display: table-cell;
  vertical-align: baseline;
  color: #003e70;
  cursor: pointer;
  font-size: 20px;
  border-radius: 40rem;
  border: 1px solid #003e70;
  margin-top: 0px;
}

/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #003e70;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #003e70;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #2c6b9e;
}
</style>
