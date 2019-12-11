<template>
  <div>
    <v-layout>
      <v-flex pa-2 class="head-result-stock">{{$t('menu.stock list')}}</v-flex>
    </v-layout>
    <div class="table-responsive">
      <table class="table">
        <tr>
          <th>{{$t('msg.Stock Name')}}</th>
          <th>{{$t("msg.liveprice")}}</th>
          <th>{{$t("msg.Status")}}</th>
          <th>{{$t("msg.Countdown")}}</th>
        </tr>
        <tr v-for="(data,index) in getStockList" :key="index">
          <td>
            <nuxt-link :to="'/modern/desktop/'+data.id">{{ $t(`stockname.${data.stockname}`) }}</nuxt-link>
          </td>
          <td
            v-html="$options.filters.livePriceColor(getLivePrice(data.id),getPreviousPrice(data.id) )"
          ></td>
          <td>{{getLotteryDraw(data.id) | betstatus(getStockById(data.id).loop)}}</td>
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
  text-align: center;
  padding: 1px 5px 1px 5px;
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
.table-responsive {
    overflow: auto;
}
</style>