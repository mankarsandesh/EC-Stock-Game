<template>
  <div>
    <v-flex xs12 style="margin:0 auto;">  
        <v-layout row>
            <v-flex xs12 grow pa-1>
            <p class="float-left md12">
                <span class="title" xs10 sm10>{{$t('leaderboard.Top 10 Leaders')}}</span> (last updated 1 minutes ago)
            </p>
            </v-flex>
        </v-layout>    
        <v-flex grow pa-1 xs12 class="text-lg-right ranking">
          <span class="text-uppercase font-weight-bold">
            <v-icon small>event</v-icon>{{$t('leaderboard.weekly rankings')}}
          </span>
          <span class="text-uppercase font-weight-bold">
            <v-icon small>event</v-icon>{{$t('leaderboard.weekly rankings')}}
          </span>
        </v-flex>
      
      <v-data-table  class="userRow">
        <template v-slot:headers="headers">
            <tr class="border-radius-10">
                <th>{{$t('leaderboard.user')}}</th>
                <th>{{$t('leaderboard.winning rate')}}</th>
                <th>{{$t('leaderboard.Bets')}}</th>
                <th>{{$t('leaderboard.winning amount')}}</th>
                <th>{{$t('leaderboard.follow')}}</th>
            </tr>
        </template>
            <!-- <template v-slot:items="item"> -->
                <!-- <td>{{item.item.betID}}</td>
                <td>{{item.item.gameID}}</td>
                <td>{{item.item.ruleName}} - ({{item.item.payout}}) {{item.item.stockName}} / {{item.item.loop}}</td>
                <td>{{item.item.createdTime}}</td>
                <td>{{item.item.betAmount | toCurrency}}</td>
                <td>{{item.item.payout}}</td>
                <td v-if="item.item.betResult == 'win'">
                    <v-chip color="green" text-color="white">{{item.item.betResult}}</v-chip>
                </td>
                <td v-if="item.item.betResult == 'lose'">
                    <v-chip color="red" text-color="white">{{item.item.betResult}}</v-chip>
                </td>
                <td v-if="item.item.betResult == 'pending'">
                    <v-chip color="yellow " text-color="black">{{item.item.betResult}}...</v-chip>
                </td> -->
            <!-- </template> -->
            <template>
                <th>
                    <img style="vertical-align:middle" class="pimage" src="https://placehold.it/60x60" />
                    <span class="subtitle-1 text-uppercase">Ritesh Naik</span>
                </th>
            </template>
            
        

      </v-data-table>
    </v-flex>
    <v-dialog v-model="dialog" width="600" style="border:radius:20px; !important">
      <v-card class="followup">
        <h3 class="title font-weight-bold" style="text-align:center;color:#0b2a68;">FOLLOW BET</h3>

        <v-card-text style="text-align:center;">
          <img class="pimage" src="https://placehold.it/60x60" width="120px" />
          <h3 class="subtitle-1 text-uppercase text-center pt-2">Ritesh Naik</h3>
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
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      followby: ["Follow by Amount", "Follow by Rate"]
    };
  },
  mounted() {
   
  },
  methods: {
    ...mapActions(["asyTopPlayer"])
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
  border: 1px solid #dddddd;
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