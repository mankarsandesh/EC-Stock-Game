<template>
  <v-flex xs12 class="mt-3">
    <div class="v-table__overflow">
      <table class="v-datatable v-table theme--light">
        <thead>
          <tr>
            <th>{{$t('msg.Stock Name')}}</th>
            <th>{{$t("msg.liveprice")}}</th>
            <th class="text-left">{{$t("msg.reference")}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in stocklist[0]" :key="item.stockUUID">
            <td>{{item.stockName}}</td>
            <td v-if="item.stockOpenOrClosed == 'Closed!'" :style="{ color: 'red' }">Closed</td>
            <td 
              v-if="item.stockOpenOrClosed !== 'Closed!'"
              v-html="stocklist.length > 1 ? $options.filters.livePriceColor(item.stockPrice , stocklist[1][index].stockPrice) : item.stockPrice"
            >
            </td>
            <td class="text-left">
              <a
                :href="item.referenceUrl"
                target="_blank"
                style="overflow-y: auto; white-space: nowrap;"
              >
                <b>{{item.referenceUrl}}</b>
              </a>
            </td>            
          </tr>  
        </tbody>
      </table>
    </div>
  </v-flex>
</template>
<script>
import { mapGetters,mapState} from "vuex";
import config from '../../../config/config.global';
export default {
  props: ["itemss"],
  data() {
    return {
      items: ["day", "weeks", "months", "years"],
      last_price: 0,
      stockStatus: false,
      currentPrice: false,
      head: [
        { text: "stock name", value: "stockName" },
        { text: "live price", value: "stockOpenOrClosed" },
        { text: "reference", value: "referenceUrl" }
      ],
      stocklist: []
    };
  },
  mounted() {
    this.listenForBroadcast(
      {
        channelName: `stockList.${this.getPortalProviderUUID}`,
        eventName: "stockList"
      },
      ({ data }) => {
        this.stocklist.unshift(data.data.stockData);
        if(this.stocklist.length > 2) {
          this.stocklist.pop();
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
      return this.stocklist.sort(compare);
    }
  },
  computed: {
    ...mapGetters(["getPortalProviderUUID", "getStockListTimer"])
  },
  methods: {  
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },

    // checkStock(value) {

    //   let close = {};
    //   if (value == "") {
    //     close = "Close";
    //     this.stockStatus = true;
    //   } else if (value) {
    //     if (this.last_price > value) {
    //       this.currentPrice = false;
    //     } else {         
    //       this.currentPrice = true;
    //     }
    //     this.last_price = value;
    //     close = value;
    //   } else {
    //     close = "NO DATA";
    //   }
    //   return close;
    // }
  }
};
</script>
