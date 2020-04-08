<template>
  <div>
    <v-card class="followup">
      <h3 class="title" style="text-align: center; color: #0b2a68;">
        FOLLOW BET
      </h3>
      <v-card-text style="text-align:center;" >
        <img class="pimage" v-bind:src="this.userImage" width="140px" />
        <h3 class="subtitle-1 text-uppercase text-center pt-2" v-if="this.username == null">
          {{ this.username }}
        </h3>
      </v-card-text>
      <v-flex>
        <p
          v-if="FollwingError"
          v-bind:class="{ 'text-danger': hasError, 'text-sucess': hasSucess }"
        >
          {{ errorMessage }}
        </p>
      </v-flex>
      <h4 class="subtitle-1 text-uppercase ">Follow By</h4>
      <v-divider></v-divider>
      <v-card-actions>
        <v-flex lg8 pr-4>
          <v-select
            :items="followby"
            label="Select Follow type"
            v-model="selectedFollow"
            item-text="name"
            item-value="value"
            v-on:change="changeAmountRate($event)"
            solo
          ></v-select>
        </v-flex>
        <v-flex lg3 pr-2>
          <v-text-field
            solo
            label="10%"
            v-if="selectRate"
            append-icon="money"
            v-model="rateValue"
            @keypress="onlyNumber"
          ></v-text-field>
          <v-text-field
            solo
            label="100"
            v-if="selectAmount"
            @keypress="onlyNumber"
            v-model="amountValue"
            append-icon="money"
          ></v-text-field>
        </v-flex>
      </v-card-actions>

      <h4 class="subtitle-1 text-uppercase pt-2">Auto Stop Follow</h4>
      <v-divider></v-divider>
      <v-card-actions>
        <v-radio-group v-model="autoStop" :mandatory="false">
          <v-radio
            v-for="n in autoStopFollow"
            :key="n.id"
            :label="`${n.name}`"
            :value="n.value"
            v-on:change="changeAmount(n.value)"
          ></v-radio>

          <v-text-field
            style="width: 200px;"
            solo
            label="100"
            @keypress="onlyNumber"
            v-model="unfollowValue"
          >
            <span slot="append" color="red"> {{ unfollowSign }}</span>
          </v-text-field>
          <v-flex lg3>
            <v-btn
              color="buttonGreensmall"
              v-on:click="followThisUser(FollowerUserUUID, isFollowing)"
              text
              >Follow</v-btn
            >
          </v-flex>
        </v-radio-group>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import config from "../../../config/config.global";
export default {
  props: ["username", "userImage", "FollowerUserUUID", "isFollowing"],
  data() {
    return {
      errorMessage: "",
      hasError: false,
      hasSucess: false,
      FollwingError: false,
      unfollowSign: "USD",
      unfollowValue: "100",
      selectAmount: false,
      selectTime: false,
      selectBets: false,
      autoStop: "stopWin",
      amountValue: 100,
      rateValue: 10,
      selectRate: false,
      selectAmount: true,
      selectedFollow: "Amount",
      followby: [
        { id: 1, name: "Follow by Amount", value: "Amount" },
        { id: 2, name: "Follow by Rate", value: "Rate" }
      ],
      autoStopFollow: [
        { id: 1, name: "Stop by Winning", value: "stopWin" },
        { id: 2, name: "Stop by Losing", value: "stopLoss" },
        { id: 3, name: "Stop by Timing", value: "stopTime" },
        { id: 4, name: "Stop by Bets", value: "stopBets" }
      ],
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
      conversationWorld: [],
      connectClient: [],
      totoalUserCount: 0,
      userId: 0
    };
  },
  computed: {
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
    }) //get 2 data from vuex first, in the computed
  },
  methods: {
    // All User Validation
    async followThisUser(followerID, followMethod) {
      if (this.selectedFollow == "Amount") {
        this.BetValue = this.amountValue;
      } else if (this.selectedFollow == "Rate") {
        this.BetValue = this.rateValue;
      }

      if (followMethod == 0) {
        this.followingMethod = "follow";
      } else if (this.FolloworNot == 1) {
        this.followingMethod = "unfollow";
      }

      if (this.selectedFollow && this.BetValue) {
        if (this.selectedFollow == "Amount") {
          if (this.BetValue < 1000 && this.BetValue > 10) {
            this.follwingBetting(followerID, followMethod);
            console.log(followMethod);
          } else {
            this.FollwingError = true;
            this.hasError = true;
            this.hasSucess = false;
            this.errorMessage =
              "Amount should be Lower then 1000 & Grater then 10";
          }
        } else if (this.selectedFollow == "Rate") {
          if (this.BetValue < 100 && this.BetValue > 10) {
            console.log(followMethod);
            this.follwingBetting(followerID, followMethod);
          } else {
            this.FollwingError = true;
            this.hasError = true;
            this.hasSucess = false;
            this.errorMessage =
              "Bet Rate Should be Lower then 100 & Grater then 10";
          }
        }
      } else {
        this.FollwingError = true;
        this.hasError = true;
        this.hasSucess = false;
        this.errorMessage = "Follwing type is not selected.";
      }
    },
    // Follow Users API call
    async follwingBetting(follwerUUID, method) {
      const LeaderBoardData = {
        portalProviderUUID: this.portalProviderUUID,
        userUUID: this.userUUID,
        followToID: follwerUUID,
        method: method,
        followType: this.selectedFollow,
        value: this.BetValue,
        version: 1
      };
      try {
        const { data } = await this.$axios.post(
          config.followUser.url,
          LeaderBoardData,
          {
            headers: config.header
          }
        );
        this.followData = data;
        if ((data.status = 200)) {
          this.FollwingError = true;
          this.hasSucess = true;
          this.hasError = false;
          this.errorMessage = data.message;
          this.FollowName = "Following";
          window.setTimeout(function() {
            location.reload();
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    },
    changeAmountRate() {
      this.UserfollowType = this.selectedFollow;
      if (this.selectedFollow == "Amount") {
        this.selectAmount = true;
        this.selectRate = false;
      } else {
        this.selectAmount = false;
        this.selectRate = true;
      }
    },
    changeAmount(value) {
      if (value == "stopWin" || value == "stopLoss") {
        this.unfollowValue = "100";
        this.unfollowSign = "USD";
      } else if (value == "stopTime") {
        this.unfollowValue = "1";
        this.unfollowSign = "Days";
      } else {
        this.unfollowValue = "3";
        this.unfollowSign = "Bets";
      }
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    }
  }
};
</script>

<style scoped>
.followDialog {
  width: 600px;
  border-radius: 10px;
  padding: 5px;
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
.pimage {
  margin-right: 10px;
  width: 80px;
  height: 80px;
  border: 2px solid #dddddd;
  border-radius: 180px;
}
</style>
