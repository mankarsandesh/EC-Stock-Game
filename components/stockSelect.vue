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
    console.log(this.getAllStockByType);
    this.getAllStockByType.map(item => {
      this.stocks.push(item.type);
    });
  },
  watch: {
    stock(value) {
      if (value !== null) {
        this.selectStocks(value);
        $("#stockName").click();
      }
    },
    stockName(value) {
      if (value !== null) {
        this.getStockName(this.stockName);
        $("#minute").click();
      }
    },
    minute(value) {
      if (value !== null) {
        $("#gameId").click();
      }
    },
    gameId(value) {
      if (value !== null) {
        return alert("You can run now");
      }
    }
  },

  computed: {
    ...mapGetters(["getAllStockByType"]),

    gameIds() {
      return [12312314325345345];
    }
  },
  methods: {
    selectStocks(value) {
      this.stockNames = [];
      this.stockName = null;
      this.getAllStockByType.map(item => {
        if (item.type == value) {
          item.stockName.forEach(element => {
            return this.stockNames.push(element.name);
          });
        }
      });
    },
    //
    getStockName(val) {     
      this.minute = null;
      this.minutes = [];
      this.getAllStockByType.map(item => {
        item.stockName.map(item => {
          item.loop.map(items => {
            if (items.stockId == val) {
              console.log(val);
              return this.minutes.push(items.loop);
            }            
          });
        });
      });
    }
  }
};
</script>

<style>
</style>