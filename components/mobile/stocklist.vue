<template>
  <v-flex xs12 class="mb-3">
    <v-list three-line>
      <template v-for="(item, index) in getStockListPrice[0]">
        <v-list-tile :key="item.stockUUID">
          <v-list-tile-content>
            <v-list-tile-sub-title
              class="heading"
              v-html="item.stockName"
            ></v-list-tile-sub-title>
            <v-list-tile-sub-title
              v-if="item.stockStatus == 'Closed'"
              :style="{ color: 'red' }"
            >
              Closed
            </v-list-tile-sub-title>
            <v-list-tile-sub-title
              v-if="item.stockStatus !== 'Closed'"
              v-html="
                getStockListPrice.length > 1
                  ? $options.filters.livePriceColor(
                      item.stockPrice,
                      getStockListPrice[1][index].stockPrice
                    )
                  : item.stockPrice
              "
            ></v-list-tile-sub-title>
            <v-list-tile-sub-title>
              <a :href="item.referenceUrl" target="_blank">
                <b>{{ item.stockReference }}</b>
              </a>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider :key="index"></v-divider>
      </template>
    </v-list>
  </v-flex>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import config from "~/config/config.global";
export default {
  computed: {
    ...mapGetters(["getStockListPrice"])
  }
};
</script>
<style scoped>
.heading {
  font-size: 20px;
  font-weight: 600;
}
.bg-colors {
  background-color: #003e70 !important;
}
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
