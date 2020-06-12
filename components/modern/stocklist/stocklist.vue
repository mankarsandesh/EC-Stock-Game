<template>
  <v-flex xs12 class="mt-3" v-if="getStockListPrice.length > 0">
    <div class="v-table__overflow">
      <table>
        <thead>
          <tr>
            <th>{{ $t("msg.stockName") }}</th>
            <th>{{ $t("msg.livePrice") }}</th>
            <th class="text-left">{{ $t("msg.reference") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in stockLists[0]" :key="item.stockUUID">
            <td>
              <nuxt-link :to="'/modern/desktop/' + item.stockName">
                <b>{{ item.stockName.toUpperCase() }}</b>
              </nuxt-link>
            </td>
            <td v-if="item.stockStatus == 'Closed'" :style="{ color: 'red' }">
              Closed
            </td>
            <td
              v-if="item.stockStatus !== 'Closed'"
              v-html="
                stockLists.length > 1
                  ? $options.filters.livePriceColor(
                      item.stockPrice,
                      stockLists[1][index].stockPrice
                    )
                  : item.stockPrice
              "
            ></td>
            <td class="text-left">
              <a
                :href="item.stockReference"
                target="_blank"
                style="overflow-y: auto; white-space: nowrap;"
              >
                <b>{{ item.stockReference }}</b>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </v-flex>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import config from "~/config/config.global";
import stockListVue from "../../../pages/modern/desktop/stock-list.vue";
export default {
  computed: {
    ...mapGetters(["getStockListPrice", "getGameUUIDByStockName"]),
    stockLists() {
      let _this = this;
      function sortByOpenStock(a, b) {
        if (
          (_this.getGameUUIDByStockName(a.stockName) !== undefined) &
          (_this.getGameUUIDByStockName(b.stockName) === undefined)
        ) {
          return -1;
        }
        if (
          (_this.getGameUUIDByStockName(a.stockName) !== undefined) &
          (_this.getGameUUIDByStockName(b.stockName) === undefined)
        ) {
          return 1;
        }
        return 0;
      }
      let stockNewList = [];
      stockNewList.push(this.getStockListPrice[0].sort(sortByOpenStock));
      stockNewList.push(this.getStockListPrice[1].sort(sortByOpenStock));

      return stockNewList;
    }
  }
};
</script>
<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  text-align: center;
  padding: 15px 10px;
  border: 1px solid #dddddd;
  background-color: #fff;
}

th {
  background-color: #fff;
  padding: 10px;
  font-size: 16px;
  color: #8c8c8c;
}
</style>
