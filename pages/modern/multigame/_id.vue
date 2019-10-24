<template>
  <div>
    <v-layout wrap>
      <multigame :stockid="$route.params.id"></multigame>
      <multigame v-for="stockid in stockShow" :key="stockid" :stockid="stockid"></multigame>
    </v-layout>
  </div>
</template>
<script>

import multigame from "~/components/modern/multigame";
export default {
  layout: "desktopModern",
  components: {
    multigame
  },
  data() {
    return {
      stockShow: ["usindex", "SH000001"],
      stockSelect: []
    };
  },
  
};
</script>