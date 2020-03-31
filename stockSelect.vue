<template>
  <v-layout wrap class="select-stock mt-2">
    <v-flex md3>
      <v-select
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
      ></v-select>
    </v-flex>
    <v-flex md3>
      <v-select
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
      ></v-select>
    </v-flex>
    <v-flex md3>
      <v-select
        v-model="minute"
        :items="minutes"
        label="Minute"
        prepend-icon="navigate_next"
        color="red"
        full-width
        solo
        hide-details
        item-text="loopName"
        item-value="loopName"
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
      </v-select>
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
import { mapGetters, mapMutations } from "vuex"; // impor the vuex library frist, before use vuex
export default {
  data() {
    return {
      stockSocket: false,
      stock: "",
      stockName: "",
      minute: "",
      gameId: "",
      items: [],
      minutes: [],
      stockNames: []
    };
  },
  watch: {
    stock(value) {
      if (this.stockSocket) {
        this.stockSocket = false;
      } else {
        if (value !== "") {
          this.stockName = "";
          this.stockNames = value.stocks;
          $("#stockName").click();
        }
        this.stockSocket = true;
      }
    },
    stockName(value) {
      if (this.stockSocket) {
        if (value !== "") {
          this.minute = "";
          this.minutes = value.loops;
          $("#minute").click();
        }
      } else {
        this.stockSocket = false;
      }
    },
    minute(value) {
      if (this.stockSocket) {
        if (value !== "") {
          this.gameId = "";
          this.gameId = value.gameID;
          $("#gameId").click();
        }
      } else {
        this.stockSocket = false;
      }
    },
    gameId(value) {
      if (this.stockSocket) {
        if (value !== "") {
          if (this.stock.type == "crypto") {
            this.$router.replace(
              `/modern/desktop/${this.stockName.stockName}${this.minute.loopName}`
            );
          } else {
            this.$router.replace(`/modern/desktop/${this.stockName.stockName}`);
          }
        }
      } else {
        this.stockSocket = false;
      }
    },
    getStockCategory(val) {
      this.items = val;
      this.updateGameUUID(val);
    }
  },
  created() {
    this.getActiveGamesByCategory();
  },
  mounted() {},
  computed: {
    ...mapGetters(["getStockCategory"])
  },
  methods: {
    ...mapMutations(["setGameID", "SET_STOCK_CATEGORY"]),
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
        this.getGameUUID(data);
        this.SET_STOCK_CATEGORY(data);
        this.items = data;
      } catch (error) {
        console.log(error);
      }
    },
    getGameUUID(items) {
      let stockURL = this.$route.params.id;
      let stockURLName = stockURL.substring(0, stockURL.length - 1);
      let stockURLLoop = stockURL.substr(stockURL.length - 1);
      const crypto = items.find(item => {
        if (item.type === "crypto") {
          if (item.stocks.find(({ stockName }) => stockName === stockURLName)) {
            this.stock = item.type;
            item.stocks.map(stockN => {
              this.stockName = stockN.stockName;
              this.stockNames.push(stockN.stockName);
              stockN.loops.map(minute => {
                if (minute.loopName == stockURLLoop) {
                  this.minute = minute.loopName;
                  this.minutes.push(minute);
                  this.gameId = minute.gameID;
                }
              });
            });
          }
        } else {
          if (item.stocks.find(({ stockName }) => stockName === stockURL)) {
            this.stock = item.type;
            item.stocks.map(stockN => {
              if (stockN.stockName == stockURL) {
                this.stockName = stockN.stockName;
                this.stockNames.push(stockN.stockName);
                stockN.loops.map(minute => {
                  this.minute = minute.loopName;
                  this.minutes.push(minute);
                  this.gameId = minute.gameID;
                });
              }
            });
          }
        }
      });
      this.stockSocket = true;
    },
    updateGameUUID(items) {
      console.log("==============STOCK SOCKET===============");
      let stockURL = this.$route.params.id;
      let stockURLName = stockURL.substring(0, stockURL.length - 1);
      let stockURLLoop = stockURL.substr(stockURL.length - 1);
      const crypto = items.find(item => {
        if (item.type === "crypto") {
          if (item.stocks.find(({ stockName }) => stockName === stockURLName)) {
            item.stocks.map(stockN => {
              stockN.loops.map(minute => {
                if (minute.loopName == stockURLLoop) {
                  this.gameId = minute.gameID;
                  this.setGameID(minute.gameID);
                  console.log("STOCK TYPE : " + item.type);
                  console.log("STOCK NAME : " + stockN.stockName);
                  console.log("STOCK LOOP : " + minute.loopName);
                  console.log("GAME STATUS : " + minute.gameStatus);
                  console.log("GAME UUID : " + minute.gameID);
                }
              });
            });
          }
        } else {
          if (item.stocks.find(({ stockName }) => stockName === stockURL)) {
            item.stocks.map(stockN => {
              if (stockN.stockName == stockURL) {
                stockN.loops.map(minute => {
                  this.gameId = minute.gameID;
                  this.setGameID(minute.gameID);
                  console.log("STOCK TYPE : " + item.type);
                  console.log("STOCK NAME : " + stockN.stockName);
                  console.log("STOCK LOOP : " + minute.loopName);
                  console.log("GAME STATUS : " + minute.gameStatus);
                  console.log("GAME UUID : " + minute.gameID);
                });
              }
            });
          }
        }
      });
      console.log("==============STOCK SOCKET===============");
    }
  }
};
</script>

<style>
</style>
