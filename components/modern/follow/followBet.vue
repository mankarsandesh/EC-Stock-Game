<template>
  <div>
    <v-card class="followup">
      <h3 class="title" style="text-align: center; color: #0b2a68;">
        FOLLOW BET
      </h3>
      <v-card-text style="text-align:center;">
        <img class="pimage" v-bind:src="this.userImage" width="140px" />
        <h3
          class="subtitle-1 text-uppercase text-center pt-2"
          v-if="this.username"
        >
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

      <div v-if="isFollowing == 1">
        <h4 class="subtitle-1 text-uppercase ">Follow By</h4>
        <v-divider></v-divider>
        <v-card-actions>
          <v-flex lg6 pr-4>
            <v-select
              :items="followby"
              label="Select Follow type"
              v-model="selectedFollow"
              item-text="name"
              item-value="id"
              v-on:change="changeAmountRate($event)"
              solo
            ></v-select>
          </v-flex>
          <v-flex lg6 pr-2>
            <v-text-field
              :rules="[
                rules.min(10, rateValue, 'Rate'),
                rules.max(100, rateValue, 'Rate')
              ]"
              solo
              label="10%"
              v-if="selectRate"
              append-icon="money"
              v-model="rateValue"
              @keypress="onlyNumber"
            ></v-text-field>
            <v-text-field
              :rules="[
                rules.min(10, amountValue, 'Amount'),
                rules.max(1000, amountValue, 'Amount')
              ]"
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
              :value="n.id"
              v-on:change="changeAmount(n.value)"
            ></v-radio>

            <v-text-field
              :rules="[
                rulesNew.min(unfollowValue, autoStop),
                rulesNew.max(unfollowValue, autoStop)
              ]"
              solo
              @keypress="onlyNumber"
              v-model="unfollowValue"
            >
              <span slot="append" color="red"> {{ unfollowSign }}</span>
            </v-text-field>
            <v-flex lg12>
              <v-btn
                color="buttonGreensmall"
                v-on:click="followThisUser(FollowerUserUUID, isFollowing)"
                text
                >Follow</v-btn
              >
            </v-flex>
          </v-radio-group>
        </v-card-actions>
      </div>
      <div v-else>
        <v-flex lg12 text-center>
          <v-btn
            color="buttonCancel"
            v-on:click="followThisUser(FollowerUserUUID, isFollowing)"
            text
            >unFollow</v-btn
          >
        </v-flex>
      </div>
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
      // AutoStop Follow Validation 
      rulesNew: {
        min(value, text) {         
          if (text == 3 || text == 4)
            return (value || "") >= 10 || `Amount must be at least 10 USD`;
          else if (text == 5)
            return (value || "") >= 1 || `Time must be at least 1 Days`;
          else return (value || "") >= 1 || `Bet must be at least 1 Bet`;
        },
        max(value, text) {
          if (text == 3 || text == 4)
            return (
              (value || "") <= 1000 || `Amount may not be greater than 1000 USD`
            );
          else if (text == 5)
            return (
              (value || "") <= 10 || `Time may not be greater than 10 Days`
            );
          else
            return (value || "") <= 10 || `Bet may not be greater than 10 Bets`;
        }
      },
      // Follow by Validation
      rules: {
        min(min, v, text) {
          return (v || "") >= min || `${text} must be at least ${min}`;
        },
        max(max, v, text) {
          return (v || "") <= max || `${text} may not be greater than ${max}.`;
        }
      },
      errorMessage: "",
      hasError: false,
      hasSucess: false,
      FollwingError: false,
      unfollowSign: "USD",
      unfollowValue: "100",
      selectAmount: false,
      selectTime: false,
      selectBets: false,
      autoStop: 3,
      amountValue: 100,
      rateValue: 10,
      selectRate: false,
      selectAmount: true,
      selectedFollow: 1,
      followby: [
        { id: 1, name: "Follow by Amount", value: "Amount" },
        { id: 2, name: "Follow by Rate", value: "Rate" }
      ],
      autoStopFollow: [
        { id: 3, name: "Stop by Winning", value: "stopWin" },
        { id: 4, name: "Stop by Losing", value: "stopLoss" },
        { id: 5, name: "Stop by Timing", value: "stopTime" },
        { id: 6, name: "Stop by Bets", value: "stopBets" }
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
    // All Users Follow Bet Validation
    async followThisUser(followerID, followMethod) {
      this.selectedFollow == 1
        ? (this.BetValue = this.amountValue)
        : (this.BetValue = this.rateValue);
      if (
        this.selectedFollow &&
        this.BetValue &&
        this.autoStop &&
        this.unfollowValue
      ) {
        if (this.selectedFollow == 1) {
          this.BetValue <= 1000 && this.BetValue >= 10
            ? this.follwingBetting(followerID, followMethod)
            : this.errorShow(
                true,
                false,
                true,
                "Amount should be Lower then 1000 & Grater then 10"
              );
        } else if (this.selectedFollow == 2) {
          this.BetValue <= 100 && this.BetValue >= 10
            ? this.follwingBetting(followerID, followMethod)
            : this.errorShow(
                true,
                false,
                true,
                "Bet Rate Should be Lower then 100 & Grater then 10"
              );
        } else {
          this.errorShow(true, false, true, "Somthing Wrong! Please check!");
        }
      } else {
        this.errorShow(true, false, true, "Follwing type is not selected");
      }
    },
    // Error Function Common
    errorShow(follingError, sucess, error, message) {
      this.FollwingError = follingError;
      this.hasError = error;
      this.hasSucess = sucess;
      this.errorMessage = message;
    },
    // Follow Users Bet API call
    async follwingBetting(follwerUUID, method) {
      const LeaderBoardData = {
        portalProviderUUID: this.portalProviderUUID,
        userUUID: this.userUUID,
        followToUUID: follwerUUID,
        followBetRule: [
          {
            id: this.selectedFollow,
            value: this.BetValue
          }
        ],
        unFollowBetRule: [
          {
            id: this.autoStop,
            value: this.unfollowValue
          }
        ],
        method: method,
        version: config.version
      };
      try {
        const { data } = await this.$axios.post(
          config.followUser.url,
          LeaderBoardData,
          {
            headers: config.header
          }
        );
        console.log(data);
        if (data.code == 200) {
          this.errorShow(true, true, false, data.message);
          window.setTimeout(function() {
            location.reload();
          }, 2000);
        } else {
          this.errorShow(
            true,
            false,
            true,
            "Somthing Wrong. Please try Again!"
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    // Change Amount Rate Validation
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
    // Change Amount Validation
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
    // Number Validation
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
