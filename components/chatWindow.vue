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
            <a href="#">All Channel <span class="totalCount">{{totoalUserCount}}</span></a>
          </span>
          <span class="tabs" v-on:click="tab2" v-bind:class="{ active: isActivetab2 }">
            <a href="#">This Game</a>
          </span>
        </div>

        <div v-if="allChannel">
          <div id="bodyChat" class="messages" >      
            <div id="messagechannel"  v-for="data in getMessages" :key="data.index" class="msguser" >
              <a href="#">{{data.name}} :</a>
              <span class="msgbody">{{data.message}}</span>
            </div>
          </div>

          <div id="messageCHat">
            <input resize="none" v-model="message" placeholder="Type Message" />
            <btn v-on:click="sendMsg">         
              <i class="fa fa-paper-plane"></i>
            </btn>
          </div>
        </div>

        <div v-if="betChannel">
          <div id="bodyChat">
            <div class="msguser" v-for="data in getMessagesGame" :key="data.index">
              <a href="#">{{data.name}} :</a>
              <span class="msgbody">{{data.message}}</span>
            </div>
          </div>

          <div id="messageCHat">
            <input resize="none" v-model="messageGame" placeholder="Type Message" />
            <btn v-on:click="sendMsgGame">
             <i class="fa fa-paper-plane"></i>
             </btn>
          </div>
        </div>
      </div>
    </div>
    <v-btn color="#013d70" dark rigth fab slot="reference" class="liveChat">EC</v-btn>
  </popper>
</template>
<script>
import popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
import { mapGetters, mapActions } from "vuex";
import io from "socket.io-client";
import VueChatScroll from 'vue-chat-scroll';
<<<<<<< HEAD

=======
>>>>>>> 7ce68b60435d2e8fd6a3efdb3710be18a3ed0d41

 export const socket = io("http://159.138.47.250", {
  transports: ["polling"],
  query: `userId=123`
});
 export const socketGame = io("http://159.138.47.250", {
  transports: ["polling"],path: "/chatgame/socket.io" 
});

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
      connectClient : [],
      totoalUserCount : 0,
      userId : 0,
    };
  },
  computed: {
    ...mapGetters(["getMessages","getMessagesGame","getUserName","getStockType"])
  },
  mounted() {



    this.asymessages();
    this.asymessagesGame();
    this.asynUserInfo();
   
  },
  updated() {
    // this.userId = this.getUserName.userId;
    // alert(this.userId);
    $("#bodyChat").stop().animate({ scrollTop: $("#bodyChat")[0].scrollHeight}, 1000);
  },
  created() {
    

  console.log(this.getUserName.userId);
    // Socket for Channel
    console.log("created run");
    
    socket.on("new-message-global", data => {
      console.log("created");
      console.log(data);
      this.getMessages.push({
        name: data.name,
        userId: data.userId,
        message: data.message
      });
      console.log(this.getMessages);
    });
    // Socket for Game 
    socketGame.on("new-message-game", data => {
      console.log("created Game two");
      console.log(data);
      this.getMessagesGame.push({
        name: data.name,
        userId: data.userId,
        message: data.message
      });
    });


     socket.on("user-count-global", data => {
      console.log("Count");
      console.log(data);
      this.totoalUserCount  = data;
      
    });

    socket.on('chat-global', (data) => {
      console.log(data);
    });
    

    socketGame.on('chat-game', data => {
      console.log(data);
    });
    

},
  methods: {

    


    ...mapActions(["asymessages","asymessagesGame","asynUserInfo"]),
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
        socket.emit("send-message-global", {
          message: this.message,
          userId: this.getUserName.userId,
          name: this.getUserName.name
        });
        console.log("Message Send");
        this.message = "";
      }
    },
    sendMsgGame: function(event) {      
      if (this.messageGame) {        
        socketGame.emit("send-message-game", {
          message: this.messageGame,
          userId: this.getUserName.userId,
          name: this.getUserName.name,
          gameId : 13213
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
  right: 80px;
  bottom: 20px;
}
.chatRoom {
  height: 600px;
  width: 100%;
  margin-right: 300px;
  padding: 0px 5px;
  border-radius: 5px;
  background-color: #FFF;
}
#headerChat {
  height: 45px;
  /* border: 1px solid #333; */
}
#headerChat .tabs span{
  background-color: #FFF;
  color:#333;
  padding:0px 4px;
  height:40px;
  width:40px;
  font-size: 16px;
  border-radius: 180px;
}
#headerChat .tabs {
  text-align: center;
  width: 50%;
  float: left;
}
#headerChat .tabs a {
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
    color: #003e70;
  font-size: 18px;
  float: left;
  padding: 5px 10px;
}
#headerChat .active a {
  color: #FFF;
  background-color: #003e70 !important;
}
#bodyChat {
  background-color: #fff;
  height: 510px;
  text-align: left;
  padding: 10px 0px;
  overflow: scroll;
  overflow-x: hidden;
  border-radius:4px;
  border: 1px solid #cccccc;
}

#messageCHat {
  background-color: #fff;
  height: 40px;
}

.msguser {
 background: white;
   padding: 5px 5px;
  overflow: auto;
  border-radius:4px;
  max-width: 350px;
  margin: 10px 10px;
  /* border:1px solid #333; */
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3)
}
.msguser a {
  text-transform: capitalize;
  font-weight: 600;
  color: #003e70;
}
.msgbody {
  color: #333;
}
#messageCHat input {
  float: left;
  border: 1px solid #cccccc;
  width: 80%;
  padding: 5px;
  font-size: 15px;
  height: 40px;
  resize: none;
  color: #003e70;
}
#messageCHat btn {
  background-color: #003e70;
  color: #333;
  width: 20%;
  height: 40px;
  display: table-cell;
  vertical-align: middle;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
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