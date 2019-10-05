<template>
  <div>
    <v-layout>
      <v-flex pa-2 class="head-result-stock">stock lists</v-flex>
    </v-layout>
    <table class="result-table">
      <tr>
        <th>Stock name</th>
        <th>Live Price</th>
        <th>Status</th>
        <th>Countdown</th>
      </tr>
      <tr v-for="(data,index) in getStockList" :key="index">
        <td>
          <nuxt-link :to="'/modern/desktop/'+data.id">
          {{ $t(`stockname.${data.stockname}`) }}
          </nuxt-link>
        </td>
        <td v-html="$options.filters.livePriceColor(getLivePrice(data.id),getPreviousPrice(data.id) )"></td>
        <td>{{getLotteryDraw(data.id) | betstatus(getStockById(data.id).loop)}}</td>
        <td>{{getLotteryDraw(data.id) | lotterydraw(getStockById(data.id).loop)}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getStockList", "getLotteryDraw", "getStockById","getLivePrice","getPreviousPrice"])
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
  padding: 8px;
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>