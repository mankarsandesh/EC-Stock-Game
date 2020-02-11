<template>
  <div>
    <v-layout wrap pa-4 row style="padding-bottom:0 !important;padding-top:48px !important">
      <v-flex xs2 lg2 v-if="!isFullscreen">
        <v-layout>
          <v-flex xs9>
            <v-btn
              block
              class="text-white firstDigit"
              color="#003e70"
              @click="changeChartType('firstDigit')"
            >{{$t('gamemsg.firstdigit')}}</v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex class="text-xs-center triangle-right" v-show="trendType=='firstDigit'"></v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs9>
            <v-btn
              block
              class="text-white lastDigit"
              color="#003e70"
              @click="changeChartType('lastDigit')"
            >{{$t('gamemsg.lastdigit')}}</v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex class="triangle-right" v-show="trendType=='lastDigit'"></v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs9>
            <v-btn
              block
              class="text-white bothDigit"
              color="#003e70"
              @click="changeChartType('bothDigit')"
            >{{$t('gamemsg.bothdigit')}}</v-btn>
          </v-flex>
          <v-spacer></v-spacer>

          <v-flex class="triangle-right" v-show="trendType=='bothDigit'"></v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs9>
            <v-btn
              block
              class="text-white twoDigit"
              color="#003e70"
              @click="changeChartType('twoDigit')"
            >{{$t('gamemsg.twodigit')}}</v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex class="triangle-right" v-show="trendType=='twoDigit'"></v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="xs10">
        <v-layout row wrap>
          <v-flex xs12 lg12 md12 ≈>
            <trendMap
              :dataArray="getStockCrawlerData($route.params.id)"
              :trendType="trendType"
              :key="getStockCrawlerData($route.params.id)[0].writetime + trendType"
              :isFullscreen="isFullscreen"
            ></trendMap>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import trendMap from "~/components/modern/trendMap";
export default {
  data() {
    return {
      // trendType: "firstDigit"
    };
  },
  props: {
    trendType: {
      type: String,
      default: "firstDigit"
    },
    isFullscreen: {
      type: Boolean,
      default: false
    }
  },
  components: {
    trendMap
  },
  computed: {
    ...mapGetters(["getStockCrawlerData"])
  },
  methods: {
    changeChartType(value) {
      this.trendType = value;
    }
  }
};
</script>
<style scoped>
.triangle-right {
  width: 0;
  height: 0;
  border-top: 18px solid transparent;
  border-left: 20px solid #003e70;
  border-bottom: 18px solid transparent;
  align-self: center;
}

.firstDigit { 
  font-weight: bolder;
  border-radius: 10px;
  background-image: linear-gradient(to right, #19b9ff 20%, #3a79ff 51%);
}
.lastDigit { 
  text-align: center;
  border-radius: 10px;
  font-weight: bolder;  
  background-image: linear-gradient(to right, #fcc12c 20%, #fe644a 51%);
}
.bothDigit { 
  font-weight: bolder;
  border-radius: 10px;
  background-image: linear-gradient(to right, #be3095 20%, #e41273 51%);
}
.twoDigit {  
  font-weight: bolder;
  border-radius: 10px;
  background-image: linear-gradient(to right, #25dac2 20%, #0287db 51%);
}
</style>