<template>
  <div>
    <v-flex xs8 style="margin:0 auto;">
      <v-layout row>
        <v-flex grow pa-1>
          <p class="float-left md6">
            <span class="title">Top 10 Leaders</span> (last updated 1 minutes ago)
          </p>
        </v-flex>
        <v-flex grow pa-1 class="text-lg-right ranking">
          <span class="text-uppercase font-weight-bold">
            <v-icon small>event</v-icon>WEEKLY RANKINGS
          </span>
          <span class="text-uppercase font-weight-bold">
            <v-icon small>event</v-icon>MONTHLY RANKINGS
          </span>
        </v-flex>
      </v-layout>
      <div v-for="(item,index) in getTopPlayer" :key="index" class="userRow">
        <th>
          <img style="vertical-align:middle" class="pimage" src="https://placehold.it/60x60" />
          <span class="subtitle-1 text-uppercase">Sandesh Mankar</span>
          <!-- <span  style="border:1px solid red;height:30px;width:40px;" class="flag flag-us small-flag"></span>-->
        </th>
        <th>
          <h3 class="header">WINNING RAATE</h3>
          <h4 class="green--text title">{{item.winRate}} %</h4>
        </th>
        <th>
          <h3 class="header">BETS</h3>
          <H4 style="color:#eb0b6e;" class="title">{{item.totalBet}}</H4>
        </th>
        <th>
          <h3 class="header">WINNING AMOUNT</h3>
          <h4 style="color:#0b2a68;" class="title">{{item.totalProfitEarned}}</h4>
        </th>
        <th>
          <v-btn class="buttonGreensmall" @click="dialog = true" dark>{{$t('useraction.followbet')}}</v-btn>
        </th>
      </div>
    </v-flex>
    <v-dialog v-model="dialog" width="600" style="border:radius:20px; !important">
      <v-card class="followup">
        <h3 class="title font-weight-bold" style="text-align:center;color:#0b2a68;">FOLLOW BET</h3>

        <v-card-text style="text-align:center;">
          <img class="pimage" src="https://placehold.it/60x60" width="120px" />
          <h3 class="subtitle-1 text-uppercase text-center pt-2">Sandesh Mankar</h3>
        </v-card-text>

        <v-card-actions >
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
    this.asyTopPlayer();
  },
  methods: {
    ...mapActions(["asyTopPlayer"])
  },
  computed: {
    ...mapGetters(["getTopPlayer"])
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