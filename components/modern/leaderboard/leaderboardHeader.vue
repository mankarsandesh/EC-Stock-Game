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
      </v-flex>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
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