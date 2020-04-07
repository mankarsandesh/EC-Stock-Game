<template>
  <div class="conve-container">
    <div class="bodyChat">
      <div v-for="data in conversationChanel" :key="data.index" class="msgUser">
        <div class="messageChatView">
          <a href="#">{{ data.name }}</a>
          <span>{{ new Date(data.date).toString().slice(4, 24) }}</span>
          <p class="msgBody">{{ data.message }}</p>
        </div>
      </div>
    </div>

    <div class="messageChat">
      <input
        resize="none"
        v-model="messageInput"
        placeholder="Say Somthing..."
        @keyup.enter="sendMsgChanel"
      />
      <span @click="sendMsgChanel" class="btn">
        <i class="fa fa-paper-plane"></i>
      </span>
    </div>
  </div>
</template>

<script>
import config from "../config/config.global";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";

export default {
  props: {
    gameUUID: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      messageInput: "",
      conversationChanel: []
    };
  },
  methods: {
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
              version: config.version
            },
            {
              headers: config.header
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
        data.data.forEach(element => {
          this.conversationChanel.push({
            name: element.userName,
            userUUID: element.getUserUUID,
            message: element.message,
            date: element.date
          });
        });
        this.scrollDown();
      }
    );
  },
  computed: {
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
  }
};
</script>

<style scoped>
.conve-container {
  position: relative;
  display: flex;
  flex-direction: column;
}
.liveChat {
  z-index: 999;
  position: fixed;
  right: 12px;
  bottom: 20px;
  width: 50px;
  height: 50px;
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

.bodyChat {
  background-color: redff;
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
.messageChat {
  position: fixed;
  bottom: 7px;
  background-color: #fff;
  height: 35px;
  padding: 0px 10px;
  width: 97%;
  display: inline-flex;
  border-radius: 5px;
  border: 1px solid #d3d2d2;
}

.messageChat input {
  float: left;
  width: 100%;
  padding: 5px;
  margin-right: 0px;
  font-size: 12px;
  height: 30px;
  resize: none;
  color: #003e70;
}

.messageChat input:focus {
  outline: none;
}

.messageChat .btn {
  padding: 5px 10px;
  color: #d3d2d2;
  cursor: pointer;
  font-size: 16px;
  margin-top: 0px;
}
.messageChat .btn:hover {
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
