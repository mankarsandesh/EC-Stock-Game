<template>
  <v-layout wrap class="select-stock mt-2">
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
          //check the v-model is empty or not
          // call the functions with 1 argument ( stock name )
          $("#stockName").click(); // Tell the jquery to click or make the event the click after we get the respone from the method above
          this.stockSocket = true;
        }
      }
    },
    stockName(value) {
      if (this.stockSocket) {
        if (value !== "") {
          $("#minute").click();
          this.minute = "";
          this.minutes = value.loops;
        }
      } else {
        this.stockSocket = false;
      }
    },
    minute(value) {
      if (this.stockSocket) {
        if (value !== "") {
          $("#gameId").click();
          this.gameId = "";
          this.gameId = value.gameID;
        }
      } else {
        this.stockSocket = false;
      }
    },
    gameId(value) {
      if (this.stockSocket) {
        if (value !== "") {
          if (this.stock.type == "crypto") {
            console.log(this.stockName.stockName + this.minute.loopName);
            this.$router.replace(
              `/modern/multigame/${this.stockName.stockName}${this.minute.loopName}`
            );
          } else {
            this.$router.replace(`/modern/multigame/${this.stockName.stockName}`);
          }
          this.setGameID(value);
          // check model if game id is empty or not by the condition
          // run your logic after condition is true
        }
      } else {
        this.stockSocket = false;
      }
    },
    getStockCategory(val) {
      this.items = val;
      console.log("Is will be error");
      console.log(val);
      // this.getGameUUID(val);
    }
  },
  created() {
    this.getActiveGamesByCategory();
  },
  computed: {
    ...mapGetters(["getStockCategory"])
  },
  methods: {
    ...mapMutations(["setGameID"]),
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
        this.getGameUUID(data); // pass 1 argrument by method
        this.items = data;
      } catch (error) {
        console.log(error);
      }
    },
    getGameUUID(items) {
      items.forEach(element => {
        // loop the data that receive from the getActiveGamesByCategory function
        element.stocks.map(item => {
          if (element.type === "crypto") {
            var data = this.$route.params.id; // get the stock from URL
            var stockName = data.substring(0, data.length - 1); // split we get only the stock name
            var stockLoop = data.substr(data.length - 1); // => "1"; // get the loop
            // console.log(stockName, stockLoop);
            // binding the data to the element after loop
            if (item.stockName === stockName) {
              console.log(item.stockName === stockName);
              //   // compare the data is equal the stockNmae that we
                item.loops.map(loop => {
                  // loop the loop minuste
                  if (loop.loopName == stockLoop) {
                    this.stockNames = [];
                    this.minutes = [];
                    this.stock = element.type;
                    this.stockName = item.stockName;
                    this.stockNames.push(item.stockName);
                    this.minute = loop.loopName;
                    this.minutes.push(loop);
                    this.gameId = loop.gameID;
                    this.stockSocket = true;
                    this.setGameID(loop.gameID);
                    console.log("STOCK STATUS : " + loop.gameStatus);
                    console.log("STOCK TYPE : " + element.type);
                    console.log("STOCK NAME : " + item.stockName);
                    console.log("LOOP : " + loop.loopName);
                    console.log("GAME UUID : " + loop.gameID);
                  }
                });
            }
          } else {
            if (item.stockName === this.$route.params.id) {
              item.loops.map(loop => {
                this.stockNames = [];
                this.minutes = [];
                this.stock = element.type;
                this.stockName = this.$route.params.id;
                this.stockNames.push(item.stockName);
                this.minute = loop.loopName;
                this.minutes.push(loop);
                this.gameId = loop.gameID;
                this.stockSocket = true;
                this.setGameID(loop.gameID);
                console.log("STOCK STATUS : " + loop.gameStatus);
                console.log("STOCK TYPE : " + element.type);
                console.log("STOCK NAME : " + item.stockName);
                console.log("LOOP : " + loop.loopName);
                console.log("GAME UUID : " + loop.gameID);
              });
            }
          }
        });
      });
    }
  }
};
</script>

<style>
</style>
