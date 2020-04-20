<template>
  <v-flex xs12 class="mt-1">
    <div class="v-table__overflow">
      <table class="v-datatable v-table theme--light">
        <thead>
          <tr>
            <th>{{ $t("msg.Stock Name") }}</th>
            <th>{{ $t("msg.liveprice") }}</th>
            <th class="text-left">{{ $t("msg.reference") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in stocks" :key="index">
            <td>{{ item.stockName }}</td>
            <td
              :class="{ 'text-red': currentPrice, 'text-green': !currentPrice }"
            >
              {{ checkStock(item.stockPrice) }}
            </td>
            <td class="text-left">
              <a
                :href="item.referenceUrl"
                target="_blank"
                style="overflow-y: auto; white-space: nowrap;"
              >
                <b>{{ item.referenceUrl }}</b>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </v-flex>
</template>
<script>
import { mapGetters } from "vuex";
import log from "roarr";

export default {
  props: ["item"],
  data() {
    return {
      items: ["ascending", "descending"],
      last_price: 0,
      stockStatus: false,
      currentPrice: null,
      head: [
        { text: "stock name", value: "stockName" },
        { text: "live price", value: "stockOpenOrClosed" },
        { text: "reference", value: "referenceUrl" }
      ],
      stocks: []
    };
  },
  mounted() {
    this.listenForBroadcast(
      {
        channelName: `stockList.${getPortalProviderUUID}`,
        eventName: "stockList"
      },
      ({ data }) => {
        try {
          var logData = data;
          if (data.status) {
            this.stocks = data.data.stockData;
          } else {
            throw new Error(config.error.general);
          }
        } catch (ex) {
          console.log(ex);
          log.error(
            {
              channel: `stockList.${getPortalProviderUUID}`,
              event: "stockList",
              res: logData,
              page: "components/mobile/stocklist.vue",
              provider: this.getPortalProviderUUID,
              user: localStorage.getItem("USER_UUID")
            },
            ex.message
          );
        }
      }
    );
  },
  watch: {
    item(val) {
      function compare(a, b) {
        if (val == "ascending") {
          if (a.stockName < b.stockName) return -1;
          if (a.stockName > b.stockName) return 1;
          return 0;
        } else {
          if (a.stockName < b.stockName) return 1;
          if (a.stockName > b.stockName) return -1;
          return 1;
        }
      }
      return this.stocks.sort(compare);
    }
  },
  computed: {
    ...mapGetters([
      "getStockList",
      "getLivePrice",
      "getPreviousPrice",
      "getPortalProviderUUID"
    ])
  },
  methods: {
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },

    checkStock(value) {
      let close = {};
      if (value == "") {
        close = "Close";
        this.stockStatus = true;
      } else if (value) {
        if (this.last_price > value) {
          // console.log("DOWN " + value);
          this.currentPrice = false;
        } else {
          // console.log("UP " + value);
          this.currentPrice = true;
        }
        this.last_price = value;
        close = value;
      } else {
        close = "NO DATA";
      }
      return close;
    }
  }
};
</script>
<style scoped>
.bg-colors {
  background-color: #003e70 !important;
}
</style>
