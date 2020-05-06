<template>
  <div>
    <v-flex xs12 md10 lg10 mt-3 style="margin:0 auto;">
      <v-layout row>
        <v-flex grow pa-1>
          <p class="float-left md12">
            <span class="title">Top {{ topPlayerData.length }} Leaders</span>
            (last updated 10 minutes ago)
          </p>
        </v-flex>
      </v-layout>

      <v-flex grow pa-1 class="text-lg-right ranking">
        <span
          class="text-uppercase font-weight-bold"
          v-bind:class="{ active: isActiveWeek }"
          v-on:click="sortingBy('weekly')"
        >
          <v-icon small>event</v-icon>
          {{ $t("leaderboard.weeklyrankings") }}
        </span>
        <span
          class="text-uppercase font-weight-bold"
          v-bind:class="{ active: isActiveMonth }"
          v-on:click="sortingBy('monthly')"
        >
          <v-icon small>event</v-icon>
          {{ $t("leaderboard.monthlyrankings") }}
        </span>
      </v-flex>
    </v-flex>

    <v-flex v-if="topPlayerData.length == 0">
      <h2 class="text-center" style="color:#a3a3a3;">There are no top users in Leaderboard.</h2>
    </v-flex>
    <v-flex v-if="topPlayerData.length > 0">
      <v-flex
        xs12
        md10
        lg10
        xl8
        style="margin:0 auto;"
        v-for="(data, index) in topPlayerData"
        :key="index"
        id="userRow"
      >
        <div class="userRow">
          <th style="vertical-align:top;">
            <div>
              <img class="pimage" :src="defaultImage" />
            </div>

            <h6 class="subtitle-1 text-uppercase">{{ data.username }}</h6>
            <!-- <span  style="height:30px;width:40px;" class="flag flag-us small-flag"></span> -->
          </th>
          <th>
            <h5 class="header">{{ $t("leaderboard.winningrate") }}</h5>
            <h6 class="green--text titleText">{{ Math.round(data.winRate, 1) }} %</h6>
          </th>
          <th>
            <h5 class="header">{{ $t("leaderboard.bets") }}</h5>
            <h6 style="color:#eb0b6e;" class="titleText">{{ data.totalWinBets }}</h6>
          </th>
          <th>
            <h5 class="header">{{ $t("leaderboard.winningamount") }}</h5>
            <h6 style="color:#0b2a68;" class="titleText">{{ Math.round(data.totalWinAmount, 1) }}</h6>
          </th>
          <th v-if="data.isFollowing == 0" style="width:20%;">
            <v-btn
              class="buttonGreensmall"
              v-on:click="
                followUser(
                  data.username,
                  data.userImage,
                  data.userUUID,
                  data.isFollowing
                )
              "
              dark
            >{{ $t("useraction.follow") }}</v-btn>
          </th>
          <th v-if="data.isFollowing == 1" style="width:20%;">
            <v-btn
              class="buttonCancel"
              v-on:click="
                followUser(
                  data.username,
                  data.userImage,
                  data.userUUID,
                  data.isFollowing
                )
              "
              dark
            >{{ $t("useraction.unfollow") }}</v-btn>
          </th>
          <th v-if="data.isFollowing == -1" style="width:20%;">
            <v-btn class="buttonGreensmall">
              {{
              $t("useraction.yourself")
              }}
            </v-btn>
          </th>
        </div>
      </v-flex>
    </v-flex>
    <!-- Follow and UnFollow Dialog box-->
    <v-dialog v-model="dialog" width="500" class="followDialog">
      <followBet
        :username="this.username"
        :userImage="this.defaultImage"
        :FollowerUserUUID="this.FollowUserUUID"
        :isFollowing="this.FolloworNot"
        @followBetClose="closeFollowBet"
      />
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import config from "~/config/config.global";
import followBet from "~/components/mobile/follow/followBet";
export default {
  data() {
    return {
      defaultImage: "/no-profile-pic.jpg",
      isActiveWeek: true,
      isActiveMonth: false,
      FollowName: "Follow",
      selectRate: false,
      selectAmount: true,
      topPlayerData: [],
      FolloworNot: "",
      FollowMethod: "",
      FollowUserUUID: "",
      method: "",
      UserfollowType: "",
      amountValue: "100",
      rateValue: "10",
      BetValue: "",
      username: "",
      userImage: "",
      dialog: false,
      selectedFollow: "",
      followby: [
        { id: 1, name: "Follow by Amount", value: "Amount" },
        { id: 2, name: "Follow by Rate", value: "Rate" }
      ]
    };
  },
  components: {
    followBet
  },
  mounted() {
    this.leaderBoard();
  },
  computed: {
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
    }) //get 2 data from vuex first, in the computed
  },
  methods: {
    // Close Follow Bet Popup
    closeFollowBet() {
      this.dialog = false;
    },
    //sorting weekly and Monthly
    sortingBy(sort) {
      if (sort == "monthly") {
        const today = new Date();
        const monthly = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 30
        )
          .toISOString()
          .substr(0, 10);
        this.dateFrom = monthly;
        this.dateTo = today.toISOString().substring(0, 10);
        this.sortbyName = "Monthly Ranking";
        this.isActiveMonth = true;
        this.isActiveWeek = false;
        this.leaderBoard();
      } else {
        const today = new Date();
        const lastWeek = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 7
        )
          .toISOString()
          .substr(0, 10);
        this.dateFrom = lastWeek;
        this.dateTo = today.toISOString().substring(0, 10);
        this.sortbyName = "Weekly Ranking";
        this.isActiveMonth = false;
        this.isActiveWeek = true;
        this.leaderBoard();
      }
    },

    // fetch default image or from server image
    imgProfile(userImage) {
      return userImage === null
        ? "/no-profile-pic.jpg"
        : `${config.apiDomain}/` + userImage;
    },
    followUser(username, userImage, userUUID, method) {
      this.username = username;
      this.FollowUserUUID = userUUID;
      method == 0 ? (this.FolloworNot = 1) : (this.FolloworNot = 2);
      this.userImage = this.imgProfile(userImage);
      this.dialog = true;
    },
    async leaderBoard() {
      try {
        const LeaderBoardData = {
          portalProviderUUID: this.portalProviderUUID,
          userUUID: this.userUUID,
          dateRangeFrom: this.dateFrom,
          dateRangeTo: this.dateTo,
          version: config.version
        };
        const { data } = await this.$axios.post(
          config.getLeaderBoard.url,
          LeaderBoardData,
          {
            headers: config.header
          }
        );

        this.topPlayerData = data.data;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style scoped>
.successful {
  width: 10%;
  border: 1px solid;
  text-align: center;
  color: green;
}
.titleText {
  font-size: 14px;
}
.followup {
  padding: 10px;
  border-radius: 20px;
}
.ranking span:hover {
  color: green;
  cursor: pointer;
}
.topHeader p:first-child {
  border: 1px solid;
}
.header {
  color: #6c6c6c;
}
#userRow {
  border-radius: 10px;
}
.userRow {
  border: 1px solid #dddddd;
  border-radius: 10px;
  background-color: #ffffff;
  margin: 10px 0px;
}
.userRow:hover {
  background-color: #f7f7f7;
  cursor: pointer;
}
.userRow th {
  border-right: 1px solid #dddddd;
  width: 25%;
  padding: 5px;
}
.userRow th:first-child span {
  vertical-align: middle;
}
.userRow th:first-child i {
  vertical-align: middle;
  /* border-radius:10px; */
}
.pimage {
  margin-right: 10px;
  width: 70px;
  height: 70px;
  border: 2px solid #dddddd;
  border-radius: 180px;
}
</style>
