<template>
  <v-layout wrap>
    <v-flex md2>
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
    <v-flex md2>
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
    <v-flex md2>
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
    <v-flex md2>
      <v-autocomplete
        v-model="gameId"
        :items="gameIds"
        label="game id"
        prepend-icon="category"
        color="blue"
        full-width
        solo
        id="gameId"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    stock: null,
    stockName: null,
    minute: null,
    gameId: null,
    minutes: [],
    stockNames: [],
    stocks: []
  }),
  mounted() {
    //  we need to call the data frist after loading the component done
    this.getAllStockByType.map(item => {
      // we cam use many ways to loop the data, in this case i use map
      this.stocks.push(item.type); // we have to push the respone in the array example: ['china','usd']
    });
  },
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
        this.getStockName(this.stockName); // call the method getstockNmae with 1 argument to get find the data
        $("#minute").click();
      }
    },
    minute(value) {
      // watch the minute v-model
      if (value !== null) {
        // check minute model is empty or not by the condition
        $("#gameId").click(); // call the jquery to call the method click to show up the game id up
      }
    },
    gameId(value) {
      // watch the game id model
      if (value !== null) {
        // check model if game id is empty or not by the condition
        return alert("You can run now"); // run your logic after condition is true
      }
    }
  },

  computed: {
    ...mapGetters(["getAllStockByType"]), // call the data from vuex by using the mapGetters

    gameIds() {
      return [12312314325345345];
    }
  },
  methods: {
    selectStocks(value) {
      // select the stock by receive 1 arguemtn
      this.stockNames = []; // clear the stockNames before receive the new value
      this.stockName = null; // clear the stockName model to be null first before get new data
      this.getAllStockByType.map(item => {
        // loop the stock data from vuex the we use mapGetter to get in the computed
        if (item.type == value) {
          // compare the data == arguemnt
          item.stockName.forEach(element => {
            // if condition in the above is true, we loop the data, in this case i use forEach for loop data
            return this.stockNames.push(element.name); // the return by stockNames[] we push the new value we get from loop
          });
        }
      });
    },
    //
    getStockName(val) {
      // receive the getStockName by reveive the One argument
      this.minute = null; // set minute to null first before add the new value
      this.minutes = []; // Also set the munutes array to be null first
      this.getAllStockByType.map(item => {
        // we map the data or loop by using the map
        item.stockName.map(item => {
          // now we loop the item.stockName we have to loop again
          if (item.name == val) {
            // check the item.name equal value the we reveive from the argument
            item.loop.map(items => {
              // if the condition is true or Match we loop the loop the stock
             this.minutes.push(items.loop + " Minutes"); // than we return the than add new data to the minutes array
            });
          }
        });
      });
    }
  }
};
</script>

<style>
</style>