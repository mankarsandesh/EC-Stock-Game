<template>
  <v-flex xs12 class="mt-1">
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
          <tr v-for="(item,index) in getStockList" :key="index">
            <td>{{$t(`stockname.${item.stockname}`)}} {{ item.stockname == 'btc1' ? ' 1':item.stockname == 'btc5' ? ' 5':'' }}</td>
            <td
              v-html="$options.filters.livePriceColor(getLivePrice(item.id),getPreviousPrice(item.id))"
            ></td>
            <td class="text-left">
              <a :href="item.urlRef" target="_blank" style="overflow-y: auto; white-space: nowrap;">
                <b>{{item.urlRef}}</b>
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
export default {
  data() {
    return {
      items: ["day", "weeks", "months", "years"]
    };
  },
  computed: {
    ...mapGetters(["getStockList", "getLivePrice", "getPreviousPrice"])
  }
};
</script>
<style scoped>
.bg-colors {
  background-color: #003e70 !important;
}
</style>