<template>
  <div>
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <tableTrendMap :isShowMultigameButton="1"></tableTrendMap>
    <h1>{{getRoadMap}}</h1>
  </div>
</template>

<script>
import tableTrendMap from "~/components/modern/tableTrendMap";

import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    tableTrendMap
  },
  mounted() {
    this.asyncRoadMap("0eb357dc-d15f-4739-96d0-983ab92d94ee");
  },
  computed: {
    ...mapGetters(["getRoadMap"])
  },
  methods: {
    ...mapActions(["asyncRoadMap"])
  }
};
</script>

<style>
</style>