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
        v-model="stock_name"
        :items="stock_names"
        label="cyto Currency"
        prepend-icon="category"
        color="green"
        full-width
        solo
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
        hint="Based on the selected category"
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
      />
    </v-flex>
  </v-layout>
</template>

<script>
import Stock from "~/data/json/stock";
export default {
  data: () => ({
    stock: null,
    stock_name: null,
    minute: null,
    gameId: null,
    minutes: [],
    stocks: [],
    stockName: []
  }),

  mounted() {
    Stock.map(item => {
      this.stocks.push(item.type);
    });
  },
  computed: {
    // select stock name
    stock_names() {
      let nameType = [];
      Stock.find(item => {
        if (item.type == this.stock) {
          item.stock_name.map(item => {
            this.minutes = item.type;
            nameType.push(item.name);
          });
        }
      });
      return nameType;
    },

    // Game id select from stock, but now is example data
    gameIds() {
      return [12312314325345345];
    }
  }
};
</script>

<style>
</style>