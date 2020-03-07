<template>
  <v-container class="mt-3">
    <stockSelect :items="SelectStockItems.data" />
  </v-container>
</template>

<script>
import stockSelect from "~/components/stockSelect";
import { mapActions, mapState } from "vuex";
import Echo from "laravel-echo";
import SelectStockItems from "~/data/json/current-bet";
export default {
  layout: "desktopModern",
  components: {
    stockSelect
  },
  data: () => ({
    stock: [],
    SelectStockItems
  }),
  mounted() { 
    // this.setUpSocketIO();
    // this.listenForBroadcast(
    //   {
    //     channelName: "stockList.f267680f-5e7f-4e40-b317-29a902e8adb7",
    //     eventName: "stockList"
    //   },
    //   ({ data }) => {
    //     this.stock = data.data.stockData;
    //   }
    // );
  },

  computed: {
    ...mapState(["portalProviderUUID", "headers"])
  },
  methods: {
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    setUpSocketIO(
      hostName = "uattesting.equitycapitalgaming.com",
      port = 6001
    ) {
      window.io = require("socket.io-client");
      window.Pusher = require("pusher-js");

      if (typeof io !== "undefined") {
        try {
          window.Echo = new Echo({
            broadcaster: "pusher",
            key: "CC21128A312FAF7817C93D1B51CB9", // SERVER_KEY = CC21128A312FAF7817C93D1B51CB9 ,Local Key = 6E591671FA45AE32B4AC2CB5BFA69
            wsHost: hostName,
            wsPort: port,
            disableStats: true,
            auth: {
              headers: { Authorization: "Basic dG5rc3VwZXI6VGVzdDEyMyEs=" }
            }
          });
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  }
};
</script>
