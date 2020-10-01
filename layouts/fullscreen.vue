<template>
  <v-app pa-0>
    <div style="height:100%">
      <nuxt />
    </div>
    <!-- Chat Windows-->
    <invitaionBox
      :gameUUID="getGameUUIDByStockName($route.params.id)"
      :stockName="$route.params.id"
      :pathName="$route.name"
    ></invitaionBox>
  </v-app>
</template>
<script>
import invitaionBox from "~/components/modern/invitationBox";
import { mapGetters, mapActions } from "vuex";
import config from "../config/config.global";
export default {
  data() {
    return {
      stockName: null
    };
  },
  components: {
    invitaionBox
  },
  created() {
    let path = this.$nuxt.$route.fullPath.split("/");
    this.stockName = path[3];
    // this.connectUserBalanceSocket();
  },
  computed: {
    ...mapGetters([
      "getGameUUIDByStockName",
      "getUserUUID",
      "getPortalProviderUUID"
    ])
  },
  beforeDestroy() {
    window.Echo.leaveChannel(`balanceUpdate.${this.getUserUUID}`);
  }
};
</script>
