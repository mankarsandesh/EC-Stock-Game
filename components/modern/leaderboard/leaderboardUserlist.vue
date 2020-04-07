<template>
  <div>
    <v-flex xs12 md8 lg8 mt-3 style="margin:0 auto;">
      <v-layout row>
        <v-flex grow pa-1>
          <p class="float-left md6 lg8">
            <span class="title">Top {{ topPlayerData.length }} Leaders </span>
            ({{this.sortbyName}}) <i v-if="loadingImage"  class="fa fa-circle-o-notch fa-spin" style="font-size:20px;"></i>
          </p>
        </v-flex>
        <v-flex grow pa-1 class="text-lg-right ranking">
          <span class="text-uppercase font-weight-bold"  v-bind:class="{ active: isActiveWeek}"  v-on:click="sortingBy('weekly')">
            <v-icon small>event</v-icon> {{ $t("leaderboard.weeklyrankings") }}
          </span>
          <span class="text-uppercase font-weight-bold"  v-bind:class="{ active: isActiveMonth}"  v-on:click="sortingBy('monthly')" >
            <v-icon small>event</v-icon> {{ $t("leaderboard.monthlyrankings") }} 
          </span>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex v-if="topPlayerData.length == 0">
      <h2 class="text-center" style="color:#a3a3a3;">
        There are no top users in Leaderboard.
      </h2>
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
          <div>           
           <img class="pimage" :src="imgProfile(data.userImage)" />
           <span class="subtitle-1 text-uppercase ">
              <span class="name">
                  <span>#{{ data.Rank }}</span>
                  {{ data.username }}
              </span>
           </span>
            <!-- <span  style="height:30px;width:40px;" class="flag flag-us small-flag"></span> -->
          </div>
          <div >
            <h3 class="header" >{{ $t("leaderboard.winningrate") }}</h3>
            <h4 class="green--text titleText">
              {{ Math.round(data.winRate, 1) }} %
            </h4>
          </div>
          <div>
            <h3 class="header">{{ $t("leaderboard.bets") }}</h3>
            <H4 style="color:#eb0b6e;" class="titleText">{{
              data.totalWinBets
            }}</H4>
          </div>
          <div>
            <h3 class="header">{{ $t("leaderboard.winningamount") }}</h3>
            <h4 style="color:#0b2a68;" class="titleText">
              {{ Math.round(data.totalWinAmount, 1) }}
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
              >{{ $t("useraction.followbet") }}
            </v-btn>
          </div>
          <div v-if="data.isFollowing == 1" style="width:20%;padding-top:30px;">
            <v-btn
              class="buttonCancel "
              v-on:click="unfollowUser(data.userUUID)"
              dark
              >{{ $t("useraction.unfollow") }}</v-btn
            >
          </div>
          <div v-if="data.isFollowing == -1" style="width:20%;padding-top:30px;">
            <v-btn class="buttonGreensmall">{{$t('useraction.yourself')}}</v-btn>
          </div>
          
        </div>
      </v-flex>
    </v-flex>

    <v-dialog v-model="dialog" width="600" style="border:radius:20px; !important">
      <v-card class="followup">
        <h3 class="title font-weight-bold" style="text-align:center;color:#0b2a68;">FOLLOW BET</h3>

        <v-card-text style="text-align:center;">
          <img class="pimage" v-bind:src="this.userImage" width="140px" />
          <h3 class="subtitle-1 text-uppercase text-center pt-2">{{ this.username }}</h3>
        </v-card-text>
        <v-flex>
          <p
            v-if="FollwingError"
            v-bind:class="{ 'text-danger': hasError, 'text-sucess': hasSucess }"
          >{{ errorMessage }}</p>
        </v-flex>
        <v-card-actions>
          <v-flex lg6 pr-4>
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
          <v-flex lg3 pl-3 pb-3>
            <v-btn color="buttonGreensmall" text v-on:click="followThisUser()">{{ FollowName }}</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import config from "../../../config/config.global";
export default {
  data() {
    return {    
      isActiveWeek : true,
      isActiveMonth : false,
      sortbyName:"Weekly Ranking", 
      loadingImage : false,
      dateFrom: "",
      dateTo: "",
      hasError: false,
      hasSucess: false,
      FollwingError: false,
      errorMessage: "",
      FollowName: "Follow",
      selectRate: false,
      selectAmount: true,
      topPlayerData: [],
      FolloworNot: "",
      FollowMethod: "",
      FollowUserUUID: "",
      method: "",
      UserfollowType: "",
      amountValue: 100,
      rateValue: 10,
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
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
      }) //get 2 data from vuex first, in the computed
  },
  methods: {   
    sortingBy(sort){      
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
        console.log(this.dateFrom,"datefrom"+this.dateTo);
        this.sortbyName = "Monthly Ranking";
        this.isActiveMonth = true;
        this.isActiveWeek = false;
        this.leaderBoard();
      }else {
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
        console.log(this.dateFrom,"datefrom"+this.dateTo);
        this.sortbyName = "Weekly Ranking";
        this.isActiveMonth = false;
        this.isActiveWeek = true;
        this.leaderBoard();
      }
    },
    imgProfile(userImage) {
      return userImage === null ? "/no-profile-pic.jpg" : `${config.apiDomain}/` + userImage;
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    // Unfollow User
    async unfollowUser(FollowUserUUID) {
      console.log(FollowUserUUID);
      const LeaderBoardData = {
        portalProviderUUID: this.portalProviderUUID,
        userUUID: this.userUUID,
        followToID: FollowUserUUID,
        method: "unfollow",
        version: config.version
      };
      console.log(LeaderBoardData);
      try {
        const { data } = await this.$axios.post(
          config.followUser.url,
          LeaderBoardData,
          {
            headers: config.header
          }
        );
        this.unfollowUser = data;
        location.reload();
        console.log(this.unfollowUser);
      } catch (error) {
        console.log(error);
      }
    },
    async followThisUser() {
      if (this.selectedFollow == "Amount") {
        this.BetValue = this.amountValue;
      } else if (this.selectedFollow == "Rate") {
        this.BetValue = this.rateValue;
      }
      if (this.FolloworNot == 0) {
        this.FollowMethod = "follow";
      } else if (this.FolloworNot == 1) {
        this.FollowMethod = "unfollow";
      }
      if (this.selectedFollow && this.BetValue) {
        if (this.selectedFollow == "Amount") {
          if (this.BetValue < 1000 && this.BetValue > 10) {
            console.log("yesss");
            // Code Run
            this.follwingBetting();
          } else {
            this.FollwingError = true;
            this.hasError = true;
            this.hasSucess = false;
            this.errorMessage =
              "Amount should be Lower then 1000 & Grater then 10";
            console.log(this.BetValue + "no");
          }
        } else if (this.selectedFollow == "Rate") {
          if (this.BetValue < 100 && this.BetValue > 10) {
            // Code Run
            this.follwingBetting();
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
    async follwingBetting() {
      const LeaderBoardData = {
        portalProviderUUID: this.portalProviderUUID,
        userUUID: this.userUUID,
        followToID: this.FollowUserUUID,
        method: this.FollowMethod,
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
        } else {
          console.log(this.followData);
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
    followUser(username, userImage, userUUID, method) {
      this.username = username;
      this.FollowUserUUID = userUUID;
      this.FolloworNot = method;
      this.userImage = this.imgProfile(userImage);
      this.dialog = true;
    },
    async leaderBoard() {
      this.loadingImage = true;  
      try {
        const LeaderBoardData = {
          portalProviderUUID: this.portalProviderUUID,
          userUUID: this.userUUID,
          dateRangeFrom : this.dateFrom,
	        dateRangeTo:this.dateTo,
          version: config.version
        };    
        console.log(LeaderBoardData);   
        const { data } = await this.$axios.post(
          config.getLeaderBoard.url,
          LeaderBoardData,
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
  margin-top:30px;
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
.userRow div{
  text-align: center;
  height: 120px;
  border-right: 1px solid #dddddd;
  width: 20%;
  padding:5px;
  float: left;
}
.userRow div:first-child .name {
 width: 100%;
 float: left;
 color:#333;
 text-align: center;
 font-size: 14px;
 font-weight: 800;
}
.userRow div:first-child .name span {  
  color:#333;
  border-radius: 180px;
  padding:3px;
  font-size: 14px;
}
.userRow div:first-child img {
  margin-top:10px; 
}
.userRow div:first-child i {
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
