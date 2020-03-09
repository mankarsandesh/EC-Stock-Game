<template>
  <div>
    <v-flex xs12 style="margin:0 auto;"   v-for="(data,index) in topPlayerData" :key="index">
      <tr class="userRow"  style="border:1px solid #333;">
        <th>
           <i class="fa fa-crown fa-2x" style="margin-right: 3px;" />
          <img style="vertical-align:middle" class="pimage" src="https://placehold.it/60x60" />
          <span class="subtitle-1 text-uppercase">Sandesh</span>
          <!-- <span  style="border:1px solid red;height:30px;width:40px;" class="flag flag-us small-flag"></span>-->
        </th>
        <th>
          <h3 class="header">WINNING RAATE</h3>
          <h4 class="green--text title">{{data.winRate}} %</h4>
        </th>
        <th>
          <h3 class="header">BETS</h3>
          <H4 style="color:#eb0b6e;" class="title">{{data.totalWinBets}}</H4>
        </th>
        <th>
          <h3 class="header">WINNING AMOUNT</h3>
          <h4 style="color:#0b2a68;" class="title">{{data.totalWinAmount}}</h4>
        </th>
        <th>
          <v-btn class="buttonGreensmall " @click="dialog = true" dark>{{$t('useraction.followbet')}}</v-btn>
        </th>
      </tr>
    </v-flex>
    <v-dialog v-model="dialog" width="600" style="border:radius:20px; !important">
      <v-card class="followup">
        <h3 class="title font-weight-bold" style="text-align:center;color:#0b2a68;">FOLLOW BET</h3>
        <v-card-text style="text-align:center;">
          <img class="pimage" src="https://placehold.it/60x60" width="120px" />
          <h3 class="subtitle-1 text-uppercase text-center pt-2">Sandesh Mankar</h3>
        </v-card-text>
        <v-card-actions>
          <v-flex lg6 pr-4>
            <v-select :items="followby" label="Follow by Amount" solo></v-select>
          </v-flex>
          <v-flex lg3 pr-2>
            <v-text-field solo label="1000" append-icon="money"></v-text-field>
          </v-flex>
          <v-flex lg3 pl-3 pb-3>
            <v-btn color="buttonGreensmall" text @click="dialog = false">Follow</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      topPlayerData: [],
      dialog: false,
      followby: ["Follow by Amount", "Follow by Rate"]
    };
  },
  mounted() {
    this.leaderBoard();
  },
  computed: {
    ...mapState(["portalProviderUUID", "headers", "userUUID"]) //get 2 data from vuex first, in the computed
  },
  methods: {
    async leaderBoard() {
      const LeaderBoardData = {
        portalProviderUUID: this.portalProviderUUID, 
        userUUID: this.userUUID, 
        version: "0.1", 
        limit: "10" 
      };
      try {
        const { data } = await this.$axios.post(
          "http://uattesting.equitycapitalgaming.com/webApi/getLeaderBoard", 
          LeaderBoardData, 
          {
            headers: {
              Authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh" 
            }
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
.userRow {
  border:1px solid blue;
  border-radius: 10px;
  background-color: #ffffff;
  margin: 5px 0px;
  padding: 10px 0px;
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
  border-radius: 180px;
}
</style>