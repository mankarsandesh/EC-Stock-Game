<template>
  <div>
    <v-flex
      xs12
      md8
      lg8
      style="margin:0 auto;"
      v-for="(data, index) in topPlayerData"
      :key="index"
      id="userRow"
    >
      <div class="userRow">
        <th>
          <img
            style="vertical-align:middle"
            class="pimage"
            v-bind:src="
              'http://uattesting.equitycapitalgaming.com/' + data.userImage
            "
          />
          <span class="subtitle-1 text-uppercase">{{ data.username }}</span>
          <!-- <span  style="height:30px;width:40px;" class="flag flag-us small-flag"></span> -->
        </th>
        <th>
          <h3 class="header">WINNING RAATE</h3>
          <h4 class="green--text titleText">
            {{ Math.round(data.winRate, 1) }} %
          </h4>
        </th>
        <th>
          <h3 class="header">BETS</h3>
          <H4 style="color:#eb0b6e;" class="titleText">{{
            data.totalWinBets
          }}</H4>
        </th>
        <th>
          <h3 class="header">WINNING AMOUNT</h3>
          <h4 style="color:#0b2a68;" class="titleText">
            {{ Math.round(data.totalWinAmount, 1) }}
          </h4>
        </th>
        <th v-if="data.isFollwing == 0" style="width:20%;">
          <v-btn
            class="buttonGreensmall "
            v-on:click="followUser(data.username,data.userImage,data.userUUID)"
            dark
            >{{ $t("useraction.followbet") }}</v-btn
          >
        </th>
        <th v-if="data.isFollwing == -1" style="width:20%;">
           <v-btn
            class="buttonGreensmall "          
            dark
            >{{ $t("useraction.followbet") }}</v-btn>
        </th>
         <th v-if="data.isFollwing == 2" style="width:20%;">
          <v-btn class="buttonCancel " @click="dialog = true" dark>{{
            $t("useraction.unfollow")
          }}</v-btn>
        </th>
      </div>
    </v-flex>

    <v-dialog
      v-model="dialog"
      width="600"
      style="border:radius:20px; !important"
    >
      <v-card class="followup">
        <h3
          class="title font-weight-bold"
          style="text-align:center;color:#0b2a68;"
        >
          FOLLOW BET
        </h3>
        <v-card-text style="text-align:center;">
          <img class="pimage" v-bind:src="this.userImage" width="140px" />
          <h3 class="subtitle-1 text-uppercase text-center pt-2">
            {{ this.fullname }}
          </h3>
        </v-card-text>
        <v-card-actions>
          <v-flex lg6 pr-4>
            <v-select
              :items="followby"
              label="Follow by Amount"
              v-model="selectedFollow"
              item-text="name"
              item-value="id"
              v-on:change="changeAmountRate($event)"
              solo
            ></v-select>
          </v-flex>
          <v-flex lg3 pr-2>

             <v-text-field solo label="10%" v-if="selectRate" append-icon="money"></v-text-field>
             <v-text-field solo label="100" v-if="selectAmount" @keypress="onlyNumber" append-icon="money"></v-text-field>
          </v-flex>
          <v-flex lg3 pl-3 pb-3>
            <v-btn color="buttonGreensmall" text v-on:click="followThisUser(this.FollowUserUUID)"
              >Follow</v-btn
            >
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
import config from "../../../config/config.global";
export default {
  data() {
    return {   
      selectRate : false,
      selectAmount : true, 
      topPlayerData: [],
      fullname: "",
      userImage: "/no-profile-pic.jpg",
      dialog: false,
      selectedFollow : { id: 1, name: "Follow by Amount" },
      followby: [
        { id: 1, name: "Follow by Amount" },
        { id: 2, name: "Follow by Rate" }
      ]
    };
  },
  mounted() {
    this.leaderBoard();
  },
  computed: {
    ...mapState(["portalProviderUUID", "userUUID"]) //get 2 data from vuex first, in the computed
  },
  methods: {
    onlyNumber($event){
      //console.log($event.keyCode); //keyCodes value
   let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
   if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
      $event.preventDefault();
   }
    },
    followThisUser:function(){

    },   
    changeAmountRate: function() {      
      console.log(this.selectedFollow);
      if(this.selectedFollow == 1){
        this.selectAmount = true;
        this.selectRate = false;
      }else{
         this.selectAmount = false;
         this.selectRate = true;
      }
    },
    followUser: function(username, userImage,userUUID) {
      this.fullname = username;
      this.FollowUserUUID = userUUID;
      this.userImage = "http://uattesting.equitycapitalgaming.com/" + userImage;
      this.dialog = true;
    },
    async leaderBoard() {
      const LeaderBoardData = {
        portalProviderUUID: this.portalProviderUUID,
        userUUID: this.userUUID,
        version: config.version,
        limit: "10"
      };
      try {
        const { data } = await this.$axios.post(
          "http://uattesting.equitycapitalgaming.com/webApi/getLeaderBoard",
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
  width: 80px;
  height: 80px;
  border: 2px solid #dddddd;
  border-radius: 180px;
}
</style>
