<template>
  <div>
    <v-layout>
      <v-flex pa-2 class="headerStockBar">{{$t('menu.stock list')}}</v-flex>
    </v-layout>

    <div class="table-responsive">
      <table class="table" v-if="getStockListTimer.length===2">
        <tr>
          <th>{{$t('msg.Stock Name')}}</th>
          <th>{{$t("msg.liveprice")}}</th>
          <th>{{$t("msg.Status")}}</th>
          <th>{{$t("msg.Countdown")}}</th>
        </tr>
        <tr v-for="(data,index) in getStockListTimer[0]" :key="index">
          <td>
            <nuxt-link
              :to="'/modern/desktop/'+data.stockName"
            >{{ $t(`stockname.${data.stockName}`) }}{{ data.stockName == 'btc1' ? '1':data.stockName == 'btc5' ? '5':'' }}</nuxt-link>
          </td>
          <td
            v-html="$options.filters.livePriceColor(data.stockPrice ,getStockListTimer[1][index].stockPrice)"
          ></td>
          <td v-if="data.stockOpenOrClosed==='Closed!'">{{data.stockOpenOrClosed}}</td>
          <td v-else>
            <span v-if="data.betCloseTimeCountDownInMins>0">ACCEPTING</span>
            <span v-else>CALCULATING</span>
          </td>
          <td>{{data.gameEndTimeCountDownInMins | lotterydraw(data.stockName) }}</td>
          <!-- <td
            v-html="$options.filters.livePriceColor(getLivePrice(data.id),getPreviousPrice(data.id) )"
          ></td>-->
          <!-- <td
            style="font-size: 0.8rem;"
          >{{getLotteryDraw(data.id) | betstatus(getStockById(data.id).loop)}}</td>
          <td>{{getLotteryDraw(data.id) | lotterydraw(getStockById(data.id).loop)}}</td>-->
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "getStockListTimer",
      "getPortalProviderUUID",
      "getStockList",
      "getLotteryDraw",
      "getStockById",
      "getLivePrice",
      "getPreviousPrice"
    ])
  },
  data() {
    return {};
  },
  created() {
    this.listenForBroadcast(
      {
        channelName: `stockList.${this.getPortalProviderUUID}`,
        eventName: "stockList"
      },
      ({ data }) => {
        this.setStockListTimer(data.data.stockData);
      }
    );
  },
  beforeDestroy() {
    this.stopListenSocket();
  },
  methods: {
    ...mapMutations(["setStockListTimer"]),
    stopListenSocket() {
      window.Echo.leave(`stockList.${this.getPortalProviderUUID}`);
    },
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    }
  }
};
</script>
<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  border-right: #ddd;
  text-transform: uppercase;
}

td a {
  color: #003e70 !important;
}
th {
  background-color: #cccccc;
}

th,
td {
  text-transform: capitalize;
  text-align: center;
  padding: 8px 2px 6px 4px;
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
}

.table-responsive {
  overflow: auto;
}
</style>