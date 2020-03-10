<template>
  <div>
    <breadcrumbs title="Current Bet" linkItem="bet-history" titlebtn="bet-history" />
    <v-container>
      <currentBet :head="head" :desserts="desserts" />
    </v-container>
  </div>
</template>
<script>
import currentBet from "~/components/modern/currentBet";
import breadcrumbs from "~/components/breadcrumbs"; 
import { mapState } from "vuex";
export default {
  layout: "desktopModern",
  components: {
    currentBet,
    breadcrumbs
  },
  data() {
    return {
      head: [
        { text: "bet ID", value: "betID" },
        { text: "game ID", value: "gameID" },
        { text: "bet detail", value: "ruleName" },
        { text: "time", value: "createdTime" },
        { text: "amount", value: "betAmount" },
        { text: "payout", value: "payout" },
        { text: "bet status", value: "gameStatus" }
      ],
      desserts: []
    };
  },
  computed: {
    ...mapState(["portalProviderUUID", "headers", "userUUID"]) //get 2 data from vuex first, in the computed
  },
  mounted() {
    this.fetch(); // after this component render done, this will call the function from method
  },
  methods: {
    async fetch() {
      try {
        // afer moumted call the functions this method will run the fetch the data from API
        const data1 = {
          // before we call the data we should make the object to the send the request with the API
          portalProviderUUID: this.portalProviderUUID, // get the portal provider uuid from computed that we call from vuex
          userUUID: this.userUUID, // get the userUUID with the this object
          version: "0.1", // version of API
          betResult: [-1], // -1= pending, pending that mean is betting
          limit: "20", // limit the data we the data come will come only the 20 that we limit in this case
          offset: "0" // offset or skip the data
        };
        const { data } = await this.$axios.post(
          "http://uattesting.equitycapitalgaming.com/webApi/getAllBets", // after finish crawl the every API will the the baseURL from AXIOS
          data1, // data object
          {
            headers: {
              Authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh" // basic AUTH before send, becase the backend they will check
            }
          }
        );
        this.desserts = data.data; // after will get the respone the object or array that come with will be equal the array that we create in the data funtion
      } catch (error) {
        console.log(data);
      }
    }
  }
};
</script>

<style>
</style>