<template>
  <v-app>
    <div style="height:100%">
      <nuxt />
    </div>
    <!-- Chat Windows-->

    <invitation
      :gameUUID="getGameUUIDByStockName($route.params.id)"
      :stockName="this.stockName"
      :key="$route.name"
    />
  </v-app>
</template>
<script>
import invitation from "~/components/invitation";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      stockName: null
    };
  },
  components: {
    invitation
  },
  created() {
    let path = this.$nuxt.$route.fullPath.split("/");
    this.stockName = path[3];
    this.connectUserBalanceSocket();
  },
  computed: {
    ...mapGetters([
      "getGameUUIDByStockName",
      "getUserUUID",
      "getPortalProviderUUID"
    ])
  },
  methods: {
    ...mapActions(["setUserBalance"]),
    listenUserBalance({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    connectUserBalanceSocket() {
      this.listenUserBalance(
        {
          channelName: `balanceUpdate.${this.getUserUUID}`,
          eventName: "balanceUpdate"
        },
        ({ data }) => {
          try {
            var logData = data;
            if (data.status) {
              this.setUserBalance(data.data.userBalance);
              console.log("user balance", data);
            } else {
              throw new Error(config.error.general);
            }
          } catch (ex) {
            console.log(ex);
            log.error(
              {
                channelName: `balanceUpdate.${this.getUserUUID}`,
                eventName: "balanceUpdate",
                res: logData,
                page: "layouts/fullscreen.vue",
                provider: this.getPortalProviderUUID,
                user: secureStorage.getItem("USER_UUID")
              },
              ex.message
            );
          }
        }
      );
    }
  },
  beforeDestroy() {
    window.Echo.leaveChannel(`balanceUpdate.${this.getUserUUID}`);
  }
};
</script>
