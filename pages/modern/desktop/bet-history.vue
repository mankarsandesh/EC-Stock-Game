<template>
  <div>
    <breadcrumbs title="Bet History" linkItem="current-bet" titlebtn="current-bet" />
    <fillterHistory />
    <bethistory :head="head" :desserts="desserts" />
  </div>
</template>

<script>
import bethistory from "~/components/modern/betHistory";
import breadcrumbs from "~/components/breadcrumbs";
import fillterHistory from "~/components/modern/fillterHistory";
import { mapState } from "vuex";
import config from "../../../config/config.global";
export default {
  layout: "desktopModern",
  components: {
    breadcrumbs,
    fillterHistory,
    bethistory
  },
  data() {
    return {
      head: [
        { text: "bet ID", value: "betID" },
        { text: "game ID", value: "gameID" },
        { text: "bet detail", value: "ruleName" },
        { text: "time", value: "createdTime" },
        { text: "payout", value: "payout" },
        { text: "bet status", value: "gameStatus" },
         { text: "payout amount", value: "payoutamount" },
        { text: "amount", value: "betAmount" },       
        { text: "rolling", value: "rollingAmount" }
      ],
      desserts: []
    };
  },
  computed: {
    ...mapState(["portalProviderUUID","userUUID"]) //get 2 data from vuex first, in the computed
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
        userUUID: this.userUUID, // get the userUUID with the this object
        version: config.version, // version of API
        betResult: [0, 1], // -1= pending, 0= lose , 1 = win
        limit: "20", // limit the data we the data come will come only the 20 that we limit in this case
        offset: "0" // offset or skip the data
      };
      const { data } = await this.$axios.post(
        config.getAllBets.url, // after finish crawl the every API will the the baseURL from AXIOS
        data1, // data object
        {
          headers: config.header
        }
      );
      this.desserts = data.data; // after will get the respone the object or array that come with will be equal the array that we create in the data funtion
    }
  }
};
</script>

<style>
</style>