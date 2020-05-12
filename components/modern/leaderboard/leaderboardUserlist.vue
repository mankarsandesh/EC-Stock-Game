<template>
  <div>
    <v-flex style="margin:0px auto;">
      <v-layout row wrap>
        <v-flex grow pa-1>
          <p class="float-left md6 lg8">
            <span class="title">
              {{ $t("leaderboard.top") }} {{ topPlayerData.length }}
              {{ $t("leaderboard.leaders") }}
            </span>
            ({{ this.sortbyName }})
            <i
              v-if="loadingImage"
              class="fa fa-circle-o-notch fa-spin"
              style="font-size:20px;"
            ></i>
          </p>
        </v-flex>
        <v-flex grow pa-1 class="text-lg-right ranking">
          <span
            class="text-uppercase font-weight-bold"
            v-bind:class="{ active: isActiveWeek }"
            v-on:click="sortingBy('weekly')"
          >
            <v-icon small>fa-calendar</v-icon>
            {{ $t("leaderboard.weeklyrankings") }}
          </span>
          <span
            class="text-uppercase font-weight-bold"
            v-bind:class="{ active: isActiveMonth }"
            v-on:click="sortingBy('monthly')"
          >
            <v-icon small>fa-calendar</v-icon>
            {{ $t("leaderboard.monthlyrankings") }}
          </span>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex v-if="topPlayerData.length == 0">
      <h2 class="text-center" style="color:#a3a3a3;">
        {{ $t("leaderboard.nodata") }}
      </h2>
    </v-flex>
    <v-flex v-if="topPlayerData.length > 0">
      <v-flex
        xs12
        md12
        lg12
        xl12
        style="margin:0 auto;"
        v-for="(data, index) in topPlayerData"
        :key="index"
        id="userRow"
      >
        <div class="userRow">
          <div>
            <!-- <span class="rank"> 
            </span> -->
            <nuxt-link :to="'/modern/desktop/userprofile/' + data.userUUID">
              <img class="pimage" :src="userImgProfile(data.userImage)" />
              <span class="subtitle-1 text-uppercase">
                <span class="name">{{ data.username }}</span>
              </span>
            </nuxt-link>
            <!-- <span  style="height:30px;width:40px;" class="flag flag-us small-flag"></span> -->
          </div>
          <div>
            <h3 class="header">{{ $t("leaderboard.winningrate") }}</h3>
            <h4 class="green--text titleText">
              {{ Math.round(data.winRate, 1) }}%
            </h4>
          </div>
          <div>
            <h3 class="header">{{ $t("leaderboard.bets") }}</h3>
            <H4 style="color:#eb0b6e;" class="titleText">
              {{ data.totalWinBets }}
            </H4>
          </div>
          <div>
            <h3 class="header">{{ $t("leaderboard.winningamount") }}</h3>
            <h4 style="color:#0b2a68;" class="titleText">
              ${{ Math.round(data.totalWinAmount, 1) | currency }}
            </h4>
          </div>
          <div v-if="data.isFollowing == 0" style="width:20%;padding-top:30px;">
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
              >{{ $t("useraction.followBet") }}</v-btn
            >
          </div>
          <div v-if="data.isFollowing == 1" style="width:20%;padding-top:30px;">
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
              >{{ $t("useraction.unfollow") }}</v-btn
            >
          </div>
          <div
            v-if="data.isFollowing == -1"
            style="width:20%;padding-top:30px;"
          >
            <v-btn class="buttonGreensmall">
              {{ $t("useraction.yourself") }}
            </v-btn>
          </div>
        </div>
      </v-flex>
    </v-flex>
    <!-- Follow and UnFollow Dialog box-->
    <v-dialog v-model="dialog" width="500" class="followDialog">
      <followBet
        v-if="renderComponent"
        :username="this.username"
        :userImage="this.userImage"
        :FollowerUserUUID="this.FollowUserUUID"
        :isFollowing="this.FolloworNot"
        @followBetClose="closeFollowBet"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import config from "~/config/config.global";
import followBet from "~/components/modern/follow/followBet";
export default {
  components: {
    followBet
  },
  data() {
    return {
      renderComponent: true, // render Follow Bet
      defaultImage: "/no-profile-pic.jpg",
      isActiveWeek: true,
      isActiveMonth: false,
      sortbyName: this.$root.$t("leaderboard.weeklyrankings"),
      loadingImage: false,
      dateFrom: "",
      dateTo: "",
      selectRate: false,
      selectAmount: true,
      topPlayerData: [],
      FolloworNot: "",
      FollowMethod: "",
      FollowUserUUID: "",
      method: "",
      username: "",
      userImage: "",
      dialog: false
    };
    props: ["linkItem"];
  },
  mounted() {
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
    this.leaderBoard();
  },
  computed: {
    // Get 2 data from vuex first, in the computed
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
    }),
    ...mapGetters(["getUserInfo"])
  },
  methods: {
    // Render Follow Bet Component
    forceRerender() {
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    // Close Follow Bet Popup
    closeFollowBet() {
      this.dialog = false;
    },
    // Sorting Weekly and Monthly
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
        this.sortbyName = this.$root.$t("leaderboard.monthlyrankings");
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
        this.sortbyName = this.$root.$t("leaderboard.weeklyrankings");
        this.isActiveMonth = false;
        this.isActiveWeek = true;
        this.leaderBoard();
      }
    },
    // fetch default image or from server image
    userImgProfile(userImage) {
      return userImage === null
        ? this.defaultImage
        : `${config.apiDomain}/` + userImage;
    },
    // Open Dialog box When User Click on Follow Button
    followUser(username, userImage, userUUID, method) {
      this.username = username;
      this.FollowUserUUID = userUUID;
      method == 0 ? (this.FolloworNot = 1) : (this.FolloworNot = 2);
      this.userImage = this.userImgProfile(userImage);
      this.dialog = true;
      this.forceRerender();
    },
    // fetch leaderboard Top Player
    async leaderBoard() {
      this.loadingImage = true;
      try {
        const reqBody = {
          portalProviderUUID: this.portalProviderUUID,
          userUUID: this.userUUID,
          dateRangeFrom: this.dateFrom,
          dateRangeTo: this.dateTo,
          version: config.version
        };
        const { data } = await this.$axios.post(
          config.getLeaderBoard.url,
          reqBody,
          {
            headers: config.header
          }
        );
        this.topPlayerData = data.data;
        this.loadingImage = false;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.followDialog {
  width: 600px;
  border-radius: 10px;
  padding: 10px;
}

.successful {
  width: 10%;
  border: 1px solid;
  text-align: center;
  color: green;
}

.titleText {
  font-size: 24px;
}

.followup {
  padding: 10px;
  border-radius: 20px;
}

.followup h3 {
  text-align: center;
  color: #0b2968;
}

.ranking span:hover {
  color: green;
  cursor: pointer;
}

.ranking span.active {
  color: green;
}

.topHeader p:first-child {
  border: 1px solid;
}

.header {
  font-size: 20px;
  margin-top: 30px;
  color: #6c6c6c;
}

#userRow {
  border-radius: 10px;
}

.userRow {
  width: 100%;
  border: 1px solid #dddddd;
  border-radius: 10px;
  background-color: #ffffff;
  margin: 5px 0px;
  float: left;
}

.userRow:hover {
  background-color: #f7f7f7;
  cursor: pointer;
}

.userRow div {
  text-align: center;
  height: 120px;
  border-right: 1px solid #dddddd;
  width: 20%;
  padding: 5px;
  float: left;
}

.userRow div:first-child .name {
  width: 100%;
  float: left;
  color: #333;
  text-align: center;
  font-size: 14px;
  font-weight: 800;
}

.userRow div:first-child .name span {
  color: #333;
  border-radius: 180px;
  padding: 3px;
  font-size: 14px;
}

.userRow div:first-child img {
  margin-top: 10px;
}

.userRow div:first-child i {
  vertical-align: middle;
  /* border-radius:10px; */
}

.pimage {
  margin-right: 10px;
  width: 50px;
  height: 50px;
  border: 2px solid #dddddd;
  border-radius: 180px;
}
</style>
