<template>
  <v-flex xs12 class="mt-3">
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
          <tr
            v-for="(item, index) in getStockListPrice[0]"
            :key="item.stockUUID"
          >
            <td>
              <b>{{ item.stockName }}</b>
            </td>
            <td
              v-if="item.stockStatus == 'Closed'"
              :style="{ color: 'red' }"
            >
              Closed
            </td>
            <td
              v-if="item.stockStatus !== 'Closed'"
              v-html="
                getStockListPrice.length > 1
                  ? $options.filters.livePriceColor(
                      item.stockPrice,
                      getStockListPrice[1][index].stockPrice
                    )
                  : item.stockPrice
              "
            ></td>
            <td class="text-left">
              <a
                :href="item.referenceUrl"
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
import config from "../../../config/config.global";
export default {
  props: ["itemss"],
  computed: {
    ...mapGetters(["getStockListPrice"])
  }
};
</script>

