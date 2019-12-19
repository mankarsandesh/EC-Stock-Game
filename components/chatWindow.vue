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
            <a href="#">Channel</a>
          </span>
          <span class="tabs" v-on:click="tab2" v-bind:class="{ active: isActivetab2 }">
            <a href="#">This Game</a>
          </span>
        </div>

        <div v-if="allChannel">
          <div id="bodyChat">
            <div class="msguser" v-for="data in getMessages" :key="data.index">
              <a href="#">{{data.name}} :</a>
              <span class="msgbody">{{data.message}}</span>
            </div>
          </div>

          <div id="messageCHat">
            <input resize="none" v-model="message" placeholder="Type Message" />
            <btn v-on:click="sendMsg">Send</btn>
          </div>
        </div>

        <div v-if="betChannel">
          <div id="bodyChat">
            <div class="msguser" v-for="data in allmessage" :key="data.index">
              <a href="#">{{data.name}} :</a>
              <span class="msgbody">{{data.msg}}</span>
            </div>
          </div>

          <div id="messageCHat">
            <input resize="none" v-model="messageGame" placeholder="Type Message" />
            <btn v-on:click="sendMsgGame">Send</btn>
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
 const socket = io("http://159.138.47.250", {
  transports: ["polling"],
  query: `userId=123`
});

export default {
  components: {
    popper
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
      allmessageGame: [
        {
          name: "Tanver",
          msg: "Hello Bro"
        },
        {
          name: "Sandesh",
          msg: "Hello Sandesh"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["getMessages", "getUserName"])
  },
  mounted() {
    this.asymessages();
    this.asynUserInfo();
   
  },
  created() {
    socket.on("new-message", data => {
      console.log("created");
      console.log(data);
      this.allmessage.push({
        name: data.name,
        userId: data.userId,
        message: data.message
      });
    });
  },
  methods: {
    ...mapActions(["asymessages","asynUserInfo"]),
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
        socket.emit("send-message", {
          message: this.message,
          userId: this.getUserName.userId,
          name: this.getUserName.name
        });
        console.log("Message Send");
        this.message = "";
      }
    },

    sendMsgGame: function(event) {
      cosnole.log("Hello");
      if (this.messageGame) {
        this.Messagedata = { name: "sandesh", msg: this.messageGame };
        console.log(socket.emit);
        console.log("Hello");
        this.messageGame = "";
      }
    }
  }
};
</script>

<style scoped>
.liveChat {
  position: fixed;
  right: 0;
  bottom: 0;
}
.chatRoom {
  height: 600px;
  width: 100%;
  margin-right: 300px;
  padding: 0px 5px;
  border-radius: 5px;
  background-color: #003e70;
}
#headerChat {
  height: 45px;
  border: 1px solid #333;
}

#headerChat span {
  text-align: center;
  width: 50%;
  float: left;
}
#headerChat span a {
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #003e70;
  color: #fff;
  font-size: 20px;
  float: left;
  padding: 5px 10px;
}
#headerChat .active a {
  color: #003e70;
  background-color: #fff !important;
}
#bodyChat {
  background-color: #fff;
  height: 500px;
  text-align: left;
  overflow: scroll;
  border: 1px solid #cccccc;
}

#messageCHat {
  background-color: #fff;
  height: 50px;
}

.msguser {
  font-size: 15px;
  border-radius: 4px;
  border: 1px solid #cccccc;
  margin: 5px 3px;
  padding: 5px 10px;
}
.msguser a {
  font-weight: 800;
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
  height: 50px;
  resize: none;
  color: #003e70;
}
#messageCHat btn {
  background-color: #003e70;
  color: #333;
  width: 20%;
  height: 50px;
  display: table-cell;
  vertical-align: middle;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
}
</style>