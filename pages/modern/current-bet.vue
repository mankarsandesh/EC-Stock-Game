<template>
  <div>
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <currentbet :head="head" :currentBets="currentBets"></currentbet>
  </div>
</template>

<script>
import currentbet from "~/components/mobile/currentbet";
import config from "../../config/config.global";
import { mapState } from "vuex";
export default {
  layout: "",
  components: {
    currentbet
  },
  data() {
    return {
      head: [
        {
          text: "bet ID",
          value: "betID",
          sortable: false,
          value: "createdTime"
        },
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
    this.fetch();
  },
  methods: {
    async fetch() {
      const sendData = {
        portalProviderUUID: this.portalProviderUUID,
        userUUID: this.userUUID,
        version: config.version,
        betResult: [-1],
        limit: "20",
        offset: "0"
      };
      const { data } = await this.$axios.post(config.getAllBets.url, sendData, {
        headers: config.header
      });
      this.currentBets = data.data;
    }
  }
};
</script>
