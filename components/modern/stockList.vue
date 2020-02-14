<template>
  <div>
    <v-layout>
      <v-flex pa-2 class="headerStockBar">{{$t('menu.stock list')}}</v-flex>
    </v-layout>
    <div class="table-responsive">
      <table class="table">
        <tr>
          <th width="20%">{{$t('msg.Stock Name')}}</th>
          <th>{{$t("msg.liveprice")}}</th>
          <th>{{$t("msg.Status")}}</th>
          <th>{{$t("msg.Countdown")}}</th>
        </tr>
        <tr  v-for="(data,index) in getStockList" :key="index">
          <td>
            <nuxt-link :to="'/modern/desktop/'+data.id">{{ $t(`stockname.${data.stockname}`) }}{{ data.stockname == 'btc1' ? '1':data.stockname == 'btc5' ? '5':'' }}</nuxt-link>
          </td>
          <td
            v-html="$options.filters.livePriceColor(getLivePrice(data.id),getPreviousPrice(data.id) )"
          ></td>
          <td style="font-size: 0.8rem;">{{getLotteryDraw(data.id) | betstatus(getStockById(data.id).loop)}}</td>
          <td>{{getLotteryDraw(data.id) | lotterydraw(getStockById(data.id).loop)}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "getStockList",
      "getLotteryDraw",
      "getStockById",
      "getLivePrice",
      "getPreviousPrice"
    ])
  },
  data() {
    return {};
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