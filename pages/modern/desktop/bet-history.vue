<template>
  <div>
    <breadcrumbs title="Bet History" linkItem="current-bet" titlebtn="current-bet" />
    <v-container>
      <bethistory :head="head" :desserts="desserts" />
    </v-container>
  </div>
</template>

<script>
import bethistory from "~/components/modern/betHistory";
import breadcrumbs from "~/components/breadcrumbs";
import { mapState } from "vuex";
export default {
  layout: "desktopModern",
  components: {
    breadcrumbs,
    bethistory
  },
  data() {
    return {
      head: [
        { text: "UUID", value: "UUID" },
        { text: "betID", value: "betID" },
        { text: "ruleName", value: "ruleName" },
        { text: "betAmount", value: "betAmount" },
        { text: "rollingAmount", value: "rollingAmount" },
        { text: "payout", value: "payout" },
        { text: "betResult", value: "betResult" },
        { text: "createdDate", value: "createdDate" },
        { text: "createdTime", value: "createdTime" },
        { text: "gameID", value: "gameID" },
        { text: "gamePID", value: "gamePID" },
        { text: "stockName", value: "stockName" },
        { text: "gameStartDate", value: "gameStartDate" },
        { text: "gameStartTime", value: "gameStartTime" },
        { text: "gameStatus", value: "gameStatus" },
        
      ],
      desserts: []
    };
  },
  computed: {
    ...mapState(["portalProviderUUID", "headers"]) //get 2 data from vuex first, in the computed
  },
  mounted() {
    this.fetch(); // after this component render done, this will call the function from method
  },
  methods: {
    async fetch() {
      // afer moumted call the functions this method will run the fetch the data from API
      const data1 = {
        // before we call the data we should make the object to the send the request with the API
        portalProviderUUID: this.portalProviderUUID, // get the portal provider uuid from computed that we call from vuex
        userUUID: "102e29ca-24ac-42e8-b680-ccc33e5e761e", // get the userUUID with the this object
        version: "0.1", // version of API
        betResult: [-1, 0, 1], // -1= pending, 0= lose , 1 = win
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
    }
  }
};
</script>

<style>
</style>