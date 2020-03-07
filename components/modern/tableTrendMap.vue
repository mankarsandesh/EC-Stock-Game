<template>
  <div v-if="getRoadMap.length > 0 ">
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
          <v-flex class="text-xs-center triangle-right" v-show="trendType=='firstDigit'"></v-flex>
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
          <v-flex class="triangle-right" v-show="trendType=='lastDigit'"></v-flex>
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

          <v-flex class="triangle-right" v-show="trendType=='bothDigit'"></v-flex>
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
          <v-flex class="triangle-right" v-show="trendType=='twoDigit'"></v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="xs10">
        <v-layout row wrap>
          <v-flex xs12 lg12 md12>
            <trendMap
              :dataArray="getRoadMap"
              :trendType="trendType"
              :isFullscreen="isFullscreen"
              :key="getRoadMap[getRoadMap.length -1].stockTimestamp + trendType"
            ></trendMap>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="xs1">
        <v-layout row wrap v-if="isShowMultigameButton == 0">
          <v-flex xs12 lg12 md12 ≈>
            <v-btn
              class="multiGame"
              :to="'/modern/multigame/' +$route.params.id"
            >{{$t('msg.Multiplegaming')}}</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import trendMap from "~/components/modern/trendMap";
export default {
  data() {
    return {
      // trendType: "firstDigit"
    };
  },
  props: {
    isShowMultigameButton: {
      type: Number,
      required: true
    },
    trendType: {
      type: String,
      default: "firstDigit"
    },
    isFullscreen: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.asyncRoadMap(this.getStockUUIDByStockName(this.$route.params.id));
    // socket new api
    this.listenForBroadcast(
      {
        channelName: `roadMap.${this.getStockUUIDByStockName(this.$route.params.id)}.${this.getPortalProviderUUID}`,
        eventName: "roadMap"
      },
      ({ data }) => {
        console.log("new socket success");
        console.log(data.data.roadMap);
        this.setLiveRoadMap(data.data.roadMap[0]);
        console.log("new socket success");
      }
    );
  },
  components: {
    trendMap
  },
  computed: {
    ...mapGetters([
      "getStockUUIDByStockName",
      "getStockCrawlerData",
      "getRoadMap",
      "getPortalProviderUUID"
    ])
  },
  methods: {
    ...mapMutations(["setLiveRoadMap"]),
    ...mapActions(["asyncRoadMap"]),
    changeChartType(value) {
      this.trendType = value;
    },
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    }
  }
};
</script>

<style scoped>
.multiGame {
  color: #fff;
  margin: 20px 15px;
  font-weight: 600;
  font-size: 12px !important;
  background-image: linear-gradient(to right, #0bb177 30%, #2bb13a 51%);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3) !important;
  padding: 0px 9px;
  border-radius: 10px;
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
