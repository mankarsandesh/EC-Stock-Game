<template>
  <v-layout wrap pa-2 v-if="dataArray.length > 0">
    <v-flex lg2 md2 pt-5>
      <v-select
        v-model="trendType"
        :items="typeItems"
        :height="10"
        solo
        class="rounded-card"
        
      ></v-select>
      <v-select
        v-model="which_one"
        :items="which_oneItem"
        solo
        class="rounded-card"
        
      ></v-select>
    </v-flex>
    <v-flex lg10 md10>
      <trendMap
        v-if="which_one !== ''"
        :dataArray="dataArray"
        :key="
          dataArray[dataArray.length - 1].stockTimeStamp +
            '-' +
            trendType +
            '-' +
            which_one
        "
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
  props: {
    dataArray: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      trendType: null,
      selectedType: "",
      typeItems: ["firstDigit", "lastDigit", "bothDigit", "twoDigit"],
      which_oneItem: ["B/S", "O/E", "U/L", "NUM"],
      which_one: "B/S"
    };
  },
  components: {
    trendMap
  },
  computed: {},
  mounted() {
    this.trendType = this.typeItems[this.index];
  },
  methods: {},
  watch: {
    // which_one() {
    //   alert(this.which_one);
    // }
  }
};
</script>
