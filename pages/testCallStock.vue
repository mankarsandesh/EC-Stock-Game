<template>
  <v-container class="mt-3">
    <stockSelect :items="SelectStockItems.data" />
  </v-container>
</template>

<script>
import stockSelect from "~/components/stockSelect";
import { mapActions, mapState } from "vuex";
export default {
  layout: "desktopModern",
  components: {
    stockSelect
  },
  data: () => ({
    stock: [],
    SelectStockItems: []
  }),
  mounted() {
    this.listenForBroadcast(
      {
        channelName:
          "getActiveGamesByCategory.0c0de128-e2bd-41f1-a8ec-40a57c72bae5",
        eventName: "getActiveGamesByCategory"
      },
      ({ data }) => {
        this.SelectStockItems = data;
        console.log(data);
      }
    );
  },

  computed: {
    ...mapState(["portalProviderUUID", "headers"])
  },
  methods: {
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    }
  }
};
</script>
