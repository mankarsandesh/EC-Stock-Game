<template>
  <div>
    <bethistory :userBetHistory="userBetHistory" />
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
      userBetHistory: []
    };
  },
  computed: {
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
      }) //get 2 data from vuex first, in the computed
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      // afer moumted call the functions this method will run the fetch the data from API
      const sendData = {
        portalProviderUUID: this.portalProviderUUID,
        userUUID: this.userUUID,
        version: config.version,
        betResult: [0, 1],
        limit: "20",
        offset: "0"
      };
      const { data } = await this.$axios.post(config.getAllBets.url, sendData, {
        headers: config.header
      });
      this.userBetHistory = data.data;
    }
  }
};
</script>

<style>
</style>