<template>
  <v-container class="mt-3">
    <stockSelect :items="stock" />
  </v-container>
</template>

<script>
import stockSelect from "~/components/stockSelect";
import { mapActions, mapState } from "vuex";
import Echo from "laravel-echo";
export default {
  layout: "desktopModern",
  components: {
    stockSelect
  },
  data: () => ({
    stock: [],
     socketLiveStockInput: {
        channelName: "liveStockData.btc5",
        eventName: "liveStockData"
      }
  }),
  async created() {
    // this.getStock();
    const { data } = await this.$axios.$post(
      "http://uattesting.equitycapitalgaming.com/webApi/getStock",
      { portalProviderUUID: this.portalProviderUUID },
      { headers: this.headers }
    );
    this.stock = data;
  },
  mounted() {
    // this.listenForBroadcast(this.socketLiveStockInput, ({ data }) => {
    //   console.log(data);    
    // });
  },
  computed: {
    ...mapState(["portalProviderUUID", "headers"])
  },
  // methods: {
  //   getStock: (
  //     hostName = "http://uattesting.equitycapitalgaming.com",
  //     port = 6001
  //   ) => {
  //     window.io = require("socket.io-client");
  //     window.Pusher = require("pusher-js");

  //     if (typeof io !== "undefined") {
  //       try {
  //         window.Echo = new Echo({
  //           broadcaster: "pusher",
  //           key: "CC21128A312FAF7817C93D1B51CB9", // SERVER_KEY = CC21128A312FAF7817C93D1B51CB9 ,Local Key = 6E591671FA45AE32B4AC2CB5BFA69
  //           wsHost: hostName,
  //           wsPort: port,
  //           disableStats: true,
  //           auth: {
  //             headers: { Authorization: "Basic dG5rc3VwZXI6VGVzdDEyMyEs=" }
  //           }
  //         });
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     }
  //   },
  //   listenForBroadcast({ channelName, eventName }, callback) {
  //     window.Echo.channel(channelName).listen(eventName, callback);
  //   }
  // }
};
</script>
