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
            >{{ $t(`stockname.${data.stockName}`) }}{{ data.stockName == 'btc5' ? '5':'' }}</nuxt-link>
          </td>
          <td
            v-html="$options.filters.livePriceColor(data.stockPrice ,getStockListTimer[1][index].stockPrice)"
          ></td>
          <td v-if="data.stockOpenOrClosed==='Closed!'">{{data.stockOpenOrClosed}}</td>

          <td v-else>
            <span>{{data.gameEndTimeCountDownInSec | betstatus(getStockLoop(data.stockName))}}</span>
          </td>
          <td>{{data.gameEndTimeCountDownInSec | lotterydraw(getStockLoop(data.stockName)) }}</td>        
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "getStockLoop",
      "getStockListTimer",
      "getStockList",
      "getStockById",
      "getLivePrice",
      "getPreviousPrice"
    ])
  },
  created() {
  },
  methods: {
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

th {
  text-transform: capitalize;
  padding: 5px;
}
td {
  text-align: center;
  padding: 5px;
  border: 1px solid #ddd;
}

.table-responsive {
  overflow: hidden;
}
</style>