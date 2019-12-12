<template>
  <div>
    <v-layout row wrap justify-end>
      <v-flex xs2 class="main-select">
        <v-select hide-details :items="items" label="Sort By :" solo></v-select>
      </v-flex>
      <v-btn class="main-btn back mt-3">Go</v-btn>
    </v-layout>

    <v-flex xs12>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">{{$t('msg.Stock Name')}}</th>
            <th scope="col">{{$t("msg.liveprice")}}</th>
            <th scope="col">{{$t("msg.reference")}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in getStockList" :key="index">
            <td>{{item.stockname}}</td>
            <td
              v-html="$options.filters.livePriceColor(getLivePrice(item.id),getPreviousPrice(item.id))"
            ></td>
            <td>
              <a :href="item.urlRef" target="_blank" style="overflow-y: auto; white-space: nowrap;">
                <b>{{item.urlRef}}</b>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </v-flex>
    <v-btn class="main-btn back">
      <v-icon>arrow_back_ios</v-icon>back
    </v-btn>
  </div>
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