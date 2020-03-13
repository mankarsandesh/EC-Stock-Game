<template>
  <v-layout wrap class="select-stock">
    <v-flex md3>
      <v-autocomplete
        v-model="stock"
        :items="items"
        full-width
        solo
        hide-details
        color="blue"
        label="select stock"
        prepend-icon="bar_chart"
        item-text="type"
        item-value="name"
        return-object
      />
    </v-flex>
    <v-flex md3>
      <v-autocomplete
        v-model="stockName"
        :items="stockNames"
        label="Stock Name"
        prepend-icon="navigate_next"
        color="green"
        full-width
        solo
        hide-details
        id="stockName"
        item-text="stockName"
        item-value="name"
        return-object
      />
    </v-flex>
    <v-flex md3>
      <v-autocomplete
        v-model="minute"
        :items="minutes"
        label="Minute"
        prepend-icon="navigate_next"
        color="red"
        full-width
        solo
        hide-details
        item-text="loopName"
        item-value="name"
        return-object
        id="minute"
      >
        <template slot="selection" slot-scope="data">{{ data.item.loopName }} Minutes</template>
        <template v-slot:item="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-tile-content>{{data.loopName}} Minutes</v-list-tile-content>
          </template>
          <template v-else>
            <v-list-tile-content>
              <v-list-tile-title>{{data.item.loopName}} Minutes</v-list-tile-title>
            </v-list-tile-content>
          </template>
        </template>
      </v-autocomplete>
    </v-flex>
    <v-flex md3>
      <v-text-field
        v-model="gameId"
        label="game id"
        prepend-icon="navigate_next"
        color="blue"
        full-width
        solo
        hide-details
        disabled
        id="gameId"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex"; // impor the vuex library frist, before use vuex
export default {
  data: () => ({
    stockSocket: false,
    stock: null,
    stockName: null,
    minute: null,
    gameId: null,
    items: [],
    minutes: [],
    stockNames: []
  }),
  watch: {
    stock(value) {
      //watch the v-model of stock
      if (value !== null) {
        this.stockName = null;
        this.stockNames = value.stocks;
        //check the v-model is empty or not
        // call the functions with 1 argument ( stock name )
        $("#stockName").click(); // Tell the jquery to click or make the event the click after we get the respone from the method above
      }
    },
    stockName(value) {
      // watch the stockname
      if (value !== null) {
        this.minute = null;
        this.minutes = value.loops;
        // check the stock name is empty of not
        // call the method getstockNmae with 1 argument to get find the data
        $("#minute").click(); // call the minute the box show up
      }
    },
    minute(value) {
      let val = null;
      // watch the minute v-model
      if (value !== null) {
        this.gameId = null;
        this.gameId = value.gameID;
        //after the minute model is not null we call the getMinute functions
        // check minute model is empty or not by the condition
        $("#gameId").click(); // call the jquery to call the method click to show up the game id up
        val = value;
        return val + "Minutes";
      }
    },
    gameId(value) {
      // watch the game id model
      if (value !== null) {
        // check model if game id is empty or not by the condition
        return console.log("This is the Game ID : " + value); // run your logic after condition is true
      }
    }
  },
  created() {
    this.getActiveGamesByCategory();
  },
  mounted() {
    this.listenForBroadcast(
      {
        channelName:
          "getActiveGamesByCategory.0c0de128-e2bd-41f1-a8ec-40a57c72bae5",
        eventName: "getActiveGamesByCategory"
      },
      ({ data }) => {
        this.stockSocket = true;
        this.items = data.res.data;
      }
    );
  },
  methods: {
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    async getActiveGamesByCategory() {
      try {
        const { data } = await this.$axios.$post(
          "http://uattesting.equitycapitalgaming.com/webApi/getActiveGamesByCategory",
          {
            portalProviderUUID: "ef60e64b-dc17-4ff1-9f22-a177c6f1c204",
            version: 0.1
          },
          {
            headers: {
              Authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh" // basic AUTH before send, will be check from backend
            }
          }
        );
        this.items = data;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
</style>
