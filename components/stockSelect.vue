<template>
  <v-layout wrap>
    <v-flex md3>
      <v-autocomplete
        v-model="stock"
        :items="stocks"
        label="select stock"
        prepend-icon="bar_chart"
        full-width
        solo
        color="blue"
      />
    </v-flex>
    <v-flex md3>
      <v-autocomplete
        v-model="stockName"
        :items="stockNames"
        label="cyto Currency"
        prepend-icon="category"
        color="green"
        full-width
        solo
        id="stockName"
      />
    </v-flex>
    <v-flex md3>
      <v-autocomplete
        v-model="minute"
        :items="minutes"
        label="minute"
        prepend-icon="category"
        color="red"
        full-width
        solo
        id="minute"
      />
    </v-flex>
    <v-flex md3>
      <v-text-field
        v-model="gameId"
        label="game id"
        prepend-icon="category"
        color="blue"
        full-width
        solo
        disabled
        id="gameId"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex"; // impor the vuex library frist, before use vuex
export default {
  props: ["items"], // receive the value from props
  data: () => ({
    stock: null,
    stockName: null,
    minute: null,
    gameId: null,
    minutes: [],
    stockNames: []
  }),
  watch: {
    stock(value) {
      //watch the v-model of stock
      if (value !== null) {
        //check the v-model is empty or not
        this.selectStocks(value); // call the functions with 1 argument ( stock name )
        $("#stockName").click(); // Tell the jquery to click or make the event the click after we get the respone from the method above
      }
    },
    stockName(value) {
      // watch the stockname
      if (value !== null) {
        // check the stock name is empty of not
        this.getStockName(value); // call the method getstockNmae with 1 argument to get find the data
        $("#minute").click(); // call the minute the box show up
      }
    },
    minute(value) {
      // watch the minute v-model
      if (value !== null) {
        this.getMinutes(); //after the minute model is not null we call the getMinute functions
        // check minute model is empty or not by the condition
        $("#gameId").click(); // call the jquery to call the method click to show up the game id up
      }
    },
    gameId(value) {
      // watch the game id model
      if (value !== null) {
        // check model if game id is empty or not by the condition
        return alert('This is the Game ID : ' + value); // run your logic after condition is true
      }
    }
  },

  computed: {
    // call the data from vuex by using the mapGetters
    stocks() {
      let types = []; // create one contrnac for push the data
      this.items.map(item => {
        if (item.gameUUID !== null && item.gameUUID !== "") {
          // we cam use many ways to loop the data, in this case i use map
          types.push(item.type); // we have to push the respone in the array example: ['china','usd']
        }
      });
      return types;
    }
  },
  methods: {
    //get the stock
    selectStocks(value) {
      // select the stock by receive 1 arguemtn
      this.stockNames = []; // clear the stockNames before receive the new value
      this.stockName = null; // clear the stockName model to be null first before get new data
      this.items.map(item => {
        // loop the stock data from vuex the we use mapGetter to get in the computed
        if (item.type === value) {
          // compare the value is equal or not
          return this.stockNames.push(item.stockName);
        }
      });
    },

    // get the stock name
    getStockName(val) {
      // receive the getStockName by reveive the One argument
      this.minute = null; // set minute to null first before add the new value
      this.minutes = []; // Also set the munutes array to be null first
      this.items.map(items => {
        // we map the data or loop by using the map
        // now we loop the items.stockName we have to loop again
        if (items.stockName == val) {
          // check the items.name equal value the we reveive from the argument
          // if the condition is true or Match we loop the loop the stock
          this.minutes.push(items.loop + " Minutes"); // than we return the than add new data to the minutes array
        }
      });
    },
    // get the munute of game
    getMinutes() {
      // the called from the watch life cycel
      this.gameId = null; // clear the value frist, because sometime they change the stock name or minute play, that we clear
      this.items.map(items => {
        // loop the value frist
        if (items.stockName == this.stockName) {
          // than make the code is compare is equal or not
          const split = items.gameUUID.split("-").join(""); // if the value is true, split the -- and make is join together
          this.gameId = split; // after we split than make the gameId instanc is equal new value
        }
      });
    }
  }
};
</script>

<style>
</style>