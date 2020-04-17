<template>
  <div v-if="dataArray.length > 0">
    <v-layout wrap row class="justify-center">
      <v-flex xs1 md1 lg1 xl1 v-if="!isFullscreen" mt-5>
        <v-layout>
          <v-flex xs9>
            <v-btn
              block
              class="text-white firstDigit"
              color="#003e70"
              @click="changeChartType('firstDigit')"
              >{{ $t("gamemsg.firstdigit") }}</v-btn
            >
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex
            class="text-xs-center triangle-right"
            v-show="activeType == 'firstDigit'"
          ></v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs9>
            <v-btn
              block
              class="text-white lastDigit"
              color="#003e70"
              @click="changeChartType('lastDigit')"
              >{{ $t("gamemsg.lastdigits") }}</v-btn
            >
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex
            class="triangle-right"
            v-show="activeType == 'lastDigit'"
          ></v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs9>
            <v-btn
              block
              class="text-white bothDigit"
              color="#003e70"
              @click="changeChartType('bothDigit')"
              >{{ $t("gamemsg.bothdigits") }}</v-btn
            >
          </v-flex>
          <v-spacer></v-spacer>

          <v-flex
            class="triangle-right"
            v-show="activeType == 'bothDigit'"
          ></v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs9>
            <v-btn
              block
              class="text-white twoDigit"
              color="#003e70"
              @click="changeChartType('twoDigit')"
              >{{ $t("gamemsg.twodigits") }}</v-btn
            >
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex
            class="triangle-right"
            v-show="activeType == 'twoDigit'"
          ></v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs9 md10 lg10 xl10>
        <v-layout row wrap>
          <v-flex xs12 lg12 md12>
            <trendMap
              :dataArray="dataArray"
              :trendType="activeType"
              :isFullscreen="isFullscreen"
              :key="dataArray[dataArray.length - 1].stockTimeStamp + activeType"
            ></trendMap>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-tooltip>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          :to="'/modern/multigame/' + $route.params.id"
          right
          fab
          class="multiGame"
          dark
          v-on="on"
        >
          <i
            style="font-size:26px;"
            class="fa fa-gamepad"
            aria-hidden="true"
          ></i>
        </v-btn>
      </template>
      <span>Multiple Game</span>
    </v-tooltip>
  </div>
</template>

<script>
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
  z-index: 999;
  position: fixed;
  right: 0px;
  bottom: 80px;
  color: #fff;
  width: 50px;
  height: 50px;
  font-size: 12px !important;
  background: linear-gradient(to right, #19b9ff 20%, #3a79ff 51%);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3) !important;
  padding: 0px 9px;
}
.triangle-right {
  width: 0;
  height: 0;
  border-top: 18px solid transparent;
  border-left: 20px solid #2754af;
  border-bottom: 18px solid transparent;
  align-self: center;
}
</style>
