<template>
  <div>
    
    <bethistory :head="head" :desserts="desserts" />
  </div>
</template>

<script>
import bethistory from "~/components/mobile/bethistory";
import breadcrumbs from "~/components/breadcrumbs";
import { mapState } from "vuex";
import config from "../../config/config.global";
export default {
  layout: "default",
  components: {
    breadcrumbs,
    bethistory
  },
  data() {
    return {
      head: [
        { text: this.$root.$t("msg.BetId"), value: "betID" },
        { text: this.$root.$t("msg.gameid"), value: "gameID" },
        { text: this.$root.$t("msg.Betdetail"), value: "ruleName" },
        { text: this.$root.$t("msg.Time"), value: "createdTime" },
        { text: this.$root.$t("msg.payout"), value: "payout" },
        { text: this.$root.$t("msg.Bet Status"), value: "gameStatus" },
        { text: this.$root.$t("msg.amount"), value: "betAmount" },
        { text: this.$root.$t("msg.rolling"), value: "rollingAmount" }
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
      // afer moumted call the functions this method will run the fetch the data from API
      const data1 = {
        // before we call the data we should make the object to the send the request with the API
        portalProviderUUID: this.portalProviderUUID, // get the portal provider uuid from computed that we call from vuex
        userUUID: this.userUUID, // get the userUUID with the this object
        version: config.version, // version of API
        betResult: [-1, 0, 1], // -1= pending, 0= lose , 1 = win
        limit: "20", // limit the data we the data come will come only the 20 that we limit in this case
        offset: "0" // offset or skip the data
      };
      const { data } = await this.$axios.post(
        "http://uattesting.equitycapitalgaming.com/webApi/getAllBets", // after finish crawl the every API will the the baseURL from AXIOS
        data1, // data object
        {
          headers: this.headers
        }
      );
      this.desserts = data.data; // after will get the respone the object or array that come with will be equal the array that we create in the data funtion
    }
  }
};
</script>

<style>
</style>