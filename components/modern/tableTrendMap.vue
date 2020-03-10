<template>
  <div v-if="dataArray.length > 0 ">
    <v-layout wrap pa-4 row>
      <v-flex xs1 lg1 v-if="!isFullscreen" style="padding-top:50px;">
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
          <v-flex class="text-xs-center triangle-right" v-show="activeType=='firstDigit'"></v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs9>
            <v-btn
              block
              class="text-white lastDigit"
              color="#003e70"
              @click="changeChartType('lastDigit')"
            >{{$t('gamemsg.lastdigits')}}</v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex class="triangle-right" v-show="activeType=='lastDigit'"></v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs9>
            <v-btn
              block
              class="text-white bothDigit"
              color="#003e70"
              @click="changeChartType('bothDigit')"
            >{{$t('gamemsg.bothdigits')}}</v-btn>
          </v-flex>
          <v-spacer></v-spacer>

          <v-flex class="triangle-right" v-show="activeType=='bothDigit'"></v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs9>
            <v-btn
              block
              class="text-white twoDigit"
              color="#003e70"
              @click="changeChartType('twoDigit')"
            >{{$t('gamemsg.twodigits')}}</v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex class="triangle-right" v-show="activeType=='twoDigit'"></v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="xs10">
        <v-layout row wrap>
          <v-flex xs12 lg12 md12>
            <trendMap
              :dataArray="dataArray"
              :trendType="activeType"
              :isFullscreen="isFullscreen"
              :key="dataArray[dataArray.length -1].stockTimestamp + activeType"
            ></trendMap>
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- <v-flex class="xs1">
        <v-layout row wrap v-if="isShowMultigameButton == 0">
          <v-flex xs12 lg12 md12 ≈>
            
          </v-flex>
        </v-layout>
      </v-flex>-->
    </v-layout>

    <v-btn rigth fab class="multiGame" :to="'/modern/multigame/' +$route.params.id">
      <v-icon>games</v-icon>
    </v-btn>

  </div>
</template>

<script>
import { mapMutations } from "vuex";
import trendMap from "~/components/modern/trendMap";
export default {
  data() {
    return {
      trendTypes: ["firstDigit", "lastDigit", "bothDigit", "twoDigit"],
      trendType: null
    };
  },
  props: {
    index: {
      type: Number
    },
    dataArray: {
      type: Array,
      required: true
    },
    isShowMultigameButton: {
      type: Number,
      required: true
    },
    isFullscreen: {
      type: Boolean,
      default: false
    }
  },
  mounted() {},
  components: {
    trendMap
  },
  computed: {
    activeType() {
      if (this.trendType === null) {
        return this.trendTypes[this.index];
      } else {
        return this.trendType;
      }
    }
  },
  methods: {
    changeChartType(value) {
      this.trendType = value;
    }
  }
};
</script>

<style scoped>
.multiGame {
  position: fixed;
  right:20px;
  bottom:160px;
  color: #fff;
  width: 60px;
  height: 60px;
  font-size: 12px !important;
  background: linear-gradient(to right, #19b9ff 20%, #3a79ff 51%);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3) !important;
  padding: 0px 9px;
}
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
  white-space: pre-line !important;
  height: 60px;
  font-size: 15px;
  background-image: linear-gradient(to right, #19b9ff 20%, #3a79ff 51%);
}
.lastDigit {
  text-align: center;
  border-radius: 10px;
  font-weight: bolder;
  white-space: pre-line !important;
  height: 60px;
  font-size: 15px;
  background-image: linear-gradient(to right, #fcc12c 20%, #fe644a 51%);
}
.bothDigit {
  font-weight: bolder;
  border-radius: 10px;
  white-space: pre-line !important;
  height: 60px;
  /* word-spacing: 80px; */
  font-size: 15px;
  background-image: linear-gradient(to right, #be3095 20%, #e41273 51%);
}
.twoDigit {
  font-weight: bolder;
  border-radius: 10px;
  white-space: pre-line !important;
  height: 60px;
  font-size: 15px;
  background-image: linear-gradient(to right, #25dac2 20%, #0287db 51%);
}
</style>
