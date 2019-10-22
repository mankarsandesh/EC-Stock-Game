<template>
  <v-layout wrap>
    <v-flex xs2 px-2 py-3>
      <v-select v-model="trendType" :items="typeItem" :height="10" solo></v-select>
      <v-select v-model="which_one" :items="which_oneItem" solo></v-select>
    </v-flex>
    <v-flex xs10>
      <trendMap
        v-if="which_one !==''"
        :dataArray="getStockCrawlerData($route.params.id)"
        :key="getStockCrawlerData($route.params.id)[0].created_at + '-' + trendType + '-' + which_one"
        :isFullscreen="true"
        :which_one="which_one"
        :trendType="trendType"
      ></trendMap>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapGetters } from "vuex";

import trendMap from "~/components/modern/trendMap";

export default {
  // props: {
  //   which_one: {
  //     type: String,
  //     required: true
  //   },
  //   trendType: {
  //     type: String,
  //     default: "firstDigit"
  //   }
  // },
  data() {
    return {
      typeItem: ["firstDigit", "lastDigit", "bothDigit", "twoDigit"],
      which_oneItem: ["B/S", "O/E", "U/L", "NUM"],
      which_one: "B/S",
      trendType: "firstDigit"
    };
  },
  components: {
    trendMap
  },
  watch: {
    // which_one() {
    //   alert(this.which_one);
    // }
  },
  computed: {
    ...mapGetters(["getStockCrawlerData"])
  }
};
</script>