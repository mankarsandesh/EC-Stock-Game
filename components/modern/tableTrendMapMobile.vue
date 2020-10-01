<template>
  <div>
    <trendMap    
      v-if="isShowTrendMap"
      :dataArray="dataArray"
      :trendType="trendType"
      :isFullscreen="false"
      :isDevice="true"
      :key="
        dataArray[dataArray.length - 1].stockTimestamp + trendType + getLocale
      "
      :rowTable="4"
      :lop="30"
    ></trendMap>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import trendMap from "~/components/modern/trendMap";
import Echo from "laravel-echo";
export default {
  data() {
    return {
      isShowTrendMap: true
    };
  },
  props: {
    dataArray: {
      type: Array,
      required: true
    },
    trendType: {
      type: String
    },
  },
  components: {
    trendMap
  },
  methods: {
    ...mapActions(["setRoadMap", "setLiveRoadMap"]),
    // listen socket
    listenForBroadcast({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    // stop listen socket
    stopListenSocket(channel) {
      window.Echo.leave(channel);
    },
    forceRerender() {
      // Remove my-component from the DOM
      this.isShowTrendMap = false;

      // If you like promises better you can
      // also use nextTick this way
      this.$nextTick().then(() => {
        // Add the component back in
        this.isShowTrendMap = true;
      });
    }
  },
  //   beforeDestroy() {
  //     window.Echo.leave(
  //       `roadMap.${this.getStockUUIDByStockName(this.$route.params.id)}.${
  //         this.getPortalProviderUUID
  //       }`
  //     );
  //   },
  mounted() {
    this.setRoadMap(this.getStockUUIDByStockName(this.$route.params.id));
    // Live Road Map From Socket
    this.listenForBroadcast(
      {
        channelName: `roadMap.${this.getStockUUIDByStockName(
          this.$route.params.id
        )}.${this.getPortalProviderUUID}`,
        eventName: "roadMap"
      },
      ({ data }) => {
        try {
          if (data.status) {
            this.setLiveRoadMap(data.data.roadMap[0]);
            this.forceRerender(); // Force Render RoadMap Component
          } else {
            throw new Error(this.$root.$t("error.general"));
          }
        } catch (ex) {
          console.log(ex);
        }
      }
    );
  },
  computed: {
    ...mapGetters([
      "getLocale",
      "getRoadMap",
      "getStockUUIDByStockName",
      "getPortalProviderUUID"
    ])
  }
};
</script>
