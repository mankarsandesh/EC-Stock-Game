<template>
  <div id="chat-container">
    <div id="chat-container-header">
      <div
        @click="changeChatCannel(true)"
        :class="
          isActiveEcWorld
            ? 'chat-header-item chat-header-item-active'
            : 'chat-header-item'
        "
      >
        EC World
      </div>
      <div
        @click="changeChatCannel(false)"
        :class="
          !isActiveEcWorld
            ? 'chat-header-item chat-header-item-active'
            : 'chat-header-item'
        "
      >
        BTC1
      </div>
    </div>
    <div id="chatting-content" v-if="globalInvitation.length > 0">
      <div
        class="chat-message-container"
        v-for="(chat, index) in globalInvitation"
        :key="index"
      >
        <div>
          <v-avatar :size="40">
            <img :src="userImgProfile(chat.userImage)" alt="John" />
          </v-avatar>
        </div>
        <!-- content catalog -->
         <!-- bet win -->
        <div class="pl-2">
          <div
            class="ranking"
            v-if="chat.category.some(element => element == 1)"
          >
            <v-list-tile-title>
              <span
                v-if="chat.category[0] == 1 && chat.category.length == 1"
                class="label"
                >{{ $t("invitation.winningRate") }}</span
              >

              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <span v-on="on">#{{ chat.Rank }}</span>
                </template>
                <span>{{ $t("invitation.userWinRate") }}</span>
              </v-tooltip>
            </v-list-tile-title>
          </div>
        </div>
        <!-- bet win -->
        <!-- rank -->
        <div class="pl-2">
          <div
            class="ranking"
            v-if="chat.category.some(element => element == 3)"
          >
            <v-list-tile-title>
              <span
                v-if="chat.category[0] == 3 && chat.category.length == 1"
                class="label"
                >{{ $t("invitation.winningRank") }}</span
              >

              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <span v-on="on">#{{ chat.Rank }}</span>
                </template>
                <span>{{ $t("invitation.userRank") }}</span>
              </v-tooltip>
            </v-list-tile-title>
          </div>
        </div>
        <!-- rank -->
        <!-- follow count -->
        <div class="pl-2">
          <div
            class="followcount"
            v-if="chat.category.some(element => element == 2)"
          >
            <v-list-tile-title>
              <span
                v-if="chat.category[0] == 2 && chat.category.length == 1"
                class="label"
                >{{ $t("invitation.totalFollower") }}</span
              >

              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <span v-on="on">#{{ chat.Rank }}</span>
                </template>
                <span>{{ $t("invitation.userFollowCount") }}</span>
              </v-tooltip>
            </v-list-tile-title>
          </div>
        </div>
        <!-- follow count -->

        <!-- content -->

        <div>
          <button class="btn-follow">follow</button>
        </div>
      </div>
    </div>
    <div id="my-poper" v-if="isShowCatalog">
      <ul class="pa-0">
        <li
          @click="clickCatalogItem(item)"
          class="item-catalog"
          v-for="(item, index) in catalog"
          :key="index"
        >
          <input type="checkbox" :checked="selectedCatalog.includes(item)" />
          <label for="vehicle1">{{ item.title }}</label>
        </li>
      </ul>
    </div>
    <div id="bottom-button">
      <!-- <span>Invitation allow 3 request per hour</span> -->
      <div class="invitation-button">
        <div class="catalog-container" @click="isShowCatalog = !isShowCatalog">
          <span class="catalog-selected">
            <span v-for="(item, index) in selectedCatalog" :key="index">
              {{ index === 0 ? item.title : "/ " + item.title }}
            </span>
          </span>
          <span style="position: relative;top: 3px;">
            <v-icon color="#fff">fa-caret-down</v-icon>
          </span>
        </div>
        <div @click="sendInvitation()">
          <span class="text-uppercase">
            send invitations
          </span>
          <v-icon color="#fff">fa-paper-plane</v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
import { mapState, mapGetters, mapActions } from "vuex";
import config from "~/config/config.global";
import followBet from "~/components/mobile/follow/followBet";

export default {
  mixins: [clickaway],
  components: {
    followBet
  },
  data() {
    return {
      isShowCatalog: false,
      isActiveEcWorld: true,
      catalog: [
        {
          id: "1",
          title: "Win Bets"
        },
        {
          id: "2",
          title: "Total Follower"
        },
        {
          id: "3",
          title: "Rank"
        }
      ],
      selectedCatalog: [],
      globalInvitation: []
    };
  },
  mounted() {
    // Users List Invitaion Socket
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
        console.log(newData);
        this.globalInvitation.push(newData);
        this.scrollDown();
      }
    );
  },
  computed: {
    ...mapGetters(["getPortalProviderUUID", "getUserUUID", "getStockGameId"]),
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
    }) //get 2 data from vuex first, in the computed
  },
  methods: {
    changeChatCannel(value) {
      this.isActiveEcWorld = value;
    },
    clickCatalogItem(object) {
      if (!this.selectedCatalog.includes(object)) {
        this.selectedCatalog.push(object);
      } else {
        this.selectedCatalog.splice(
          this.selectedCatalog.findIndex(
            item => item.title.toLowerCase() === object.title.toLowerCase()
          ),
          1
        );
      }
    },
    // Set Error from SnackBar
    ...mapActions(["setSnackBarError"]),
    // Send Top Player Users Invitation
    async sendInvitation() {
      if (this.selectedCatalog.length > 0) {
        try {
          const reqBody = {
            portalProviderUUID: this.getPortalProviderUUID,
            userUUID: this.getUserUUID,
            category: this.selectedCatalog.map(e => e.id),
            version: config.version
          };
          const res = await this.$axios.$post(
            config.getUserInvitation.url,
            reqBody,
            {
              headers: config.header
            }
          );
          if (res.code == 400) {
            this.invitationError = res.message[0];
          }
        } catch (ex) {
          this.setSnackBarError(true);
        }
      } else {
        this.invitationError = "Please Select Category";
      }
    },
    // After more Invitation Come Scroll Down Automatically
    scrollDown() {
      $("#chatting-content")
        .stop()
        .animate({ scrollTop: $("#chatting-content")[0].scrollHeight }, 1000);
    },
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    // fetch default image or from server image
    userImgProfile(userImage) {
      return userImage === null
        ? this.defaultImage
        : `${config.apiDomain}/` + userImage;
    },
    // Close Follow Bet Popup
    closeFollowBet() {
      this.followDialog = false;
    },
    // Follow and Unfollow User
    followUser(username, userImage, userUUID, method) {
      if (this.getUserUUID != userUUID) {
        this.username = username;
        this.FollowUserUUID = userUUID;
        method == 0 ? (this.FolloworNot = 1) : (this.FolloworNot = 2);
        this.userImage = this.userImgProfile(userImage);
        this.followDialog = true;
      }
    }
  }
};
</script>

<style scoped>
button {
  outline: none;
}
.btn-follow {
  padding: 5px 25px;
  background: linear-gradient(
    to right,
    rgba(10, 177, 118, 1) 0%,
    rgba(14, 177, 30, 1) 100%
  );
  border-radius: 5px;
  color: #fff;
  text-transform: uppercase;
}
.chat-message-container {
  display: flex;
  background-color: #fff;
  margin: 5px;
  border-radius: 9px;
  border: red solid 1px;
  padding: 5px 10px;
  align-items: center;
  position: relative;
  justify-content: space-between;
}
.item-catalog {
  padding: 8px;
  width: 100%;
  border-bottom: #e8e8e8 solid 1px;
  cursor: pointer;
}
input {
  cursor: pointer;
}
.item-catalog:last-child {
  border-bottom: none;
}
.item-catalog:hover {
  background-color: #e8e8e8;
}
#chat-container {
  position: fixed;
  z-index: 1000000;
  height: 60%;
  width: 450px;
  bottom: 50px;
  right: 70px;
  background-color: #fff;
  border: green solid 1px;
  border-radius: 5px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3) !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#chat-container-header {
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.2);
}
.chat-header-item {
  height: 50px;
  line-height: 50px;
  width: 50%;
  text-align: center;
  font-weight: bolder;
  font-size: 18px;
  cursor: pointer;
  background-color: #fff;
}
.chat-header-item-active {
  color: #fff;
  background-color: #2baf3e;
}
#chatting-content {
  display: flex;
  flex-direction: column;
  height: 80%;
  position: relative;
  overflow-y: auto;
  background-color: #f4f4f4;
}
/* width */
#chatting-content::-webkit-scrollbar {
  width: 2px;
}

/* Handle */
#chatting-content::-webkit-scrollbar-thumb {
  background: #2baf3e;
}

#bottom-button {
  height: 80px;
  line-height: 80px;
  display: flex;
  justify-content: center;
}
.invitation-button {
  display: flex;
  height: 50px;
  width: 85%;
  line-height: 50px;
  background: linear-gradient(
    to right,
    rgba(10, 177, 118, 1) 0%,
    rgba(14, 177, 30, 1) 100%
  );
  border-radius: 5px;
  color: #fff;
  text-align: center;
}
.invitation-button > div {
  width: 50%;
  cursor: pointer;
}
.invitation-button > div:first-child {
  border-right: #e8e8e8 solid 1px;
  font-weight: bold;
}
.invitation-button > div:last-child {
  font-weight: bolder;
}
.catalog-selected {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.catalog-container {
  display: flex;
  padding: 0 4px;
  justify-content: space-between;
}
#my-poper {
  position: absolute;
  display: block;
  background-color: #fff;
  opacity: 1 !important;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3) !important;
  width: 175px;
  bottom: 90px;
  left: 40px;
  border: #e8e8e8 solid 1px;
}
#my-poper:after,
#my-poper:before {
  top: 100%;
  left: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

#my-poper:after {
  border-color: rgba(213, 213, 213, 0);
  border-top-color: #fff;
  border-width: 2px;
  margin-left: -2px;
}
#my-poper:before {
  border-color: rgba(245, 245, 245, 0);
  border-top-color: #fff;
  border-width: 8px;
  margin-left: -8px;
}
</style>
