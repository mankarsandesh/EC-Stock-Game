<template>
  <div>
    <breadcrumbs title="Current Bet" linkItem="bet-history" titlebtn="bet-history" />
    <v-container>
      <currentBet :head="head" :currentBets="currentBets" />
    </v-container>
  </div>
</template>
<script>
import currentBet from "~/components/modern/currentBet";
import breadcrumbs from "~/components/breadcrumbs"; 
import { mapState } from "vuex";
import config from "../../../config/config.global";
export default {
  layout: "desktopModern",
  components: {
    currentBet,
    breadcrumbs
  },
  data() {
    return {
      head: [
        { text: "bet ID", value: "betID" , sortable: true ,value:'createdTime'},
        { text: "game ID", value: "gameID" },
        { text: "bet detail", value: "ruleName" },
        { text: "time", value: "createdTime" },
        { text: "amount", value: "betAmount" },
        { text: "payout", value: "payout" },
        { text: "bet status", value: "gameStatus" }
      ],
      currentBets: []
    };
  },
  computed: {
    ...mapState(["portalProviderUUID", "userUUID"]) //get 2 data from vuex first, in the computed
  },
  mounted() {
    this.fetch(); // after this component    render done, this will call the function from method
  },
  methods: {
    async fetch() {
      try {
        // afer moumted call the functions this method will run the fetch the data from API
        const userData = {         
          portalProviderUUID: this.portalProviderUUID, // get the portal provider uuid from computed that we call from vuex
          userUUID: this.userUUID, // get the userUUID with the this object
          version: config.version, // version of API
          betResult: [-1], // -1= pending, pending that mean is betting
          limit: "20", // limit the data we the data come will come only the 20 that we limit in this case
          offset: "0" // offset or skip the data
        };
        const { data } = await this.$axios.post(
          config.getAllBets.url, // after finish crawl the every API will the the baseURL from AXIOS
          userData, // data object
          {
            headers: config.header
          }
        );
        this.currentBets = data.data; 
        console.log(this.currentBets);
      } catch (error) {
        console.log(data);
      }
    }
  }
};
</script>

<style>
</style>