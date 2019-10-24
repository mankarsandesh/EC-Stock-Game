<template>
  <div style="margin-bottom:250px">
    <v-layout wrap class="pt-5">
      <multigame :stockid="$route.params.id" class="pr-0"></multigame>
      <multigame v-for="(stockid,index) in stockShow" :class="index%2==0 ?'pl-0':'pr-0'" :key="index" :stockid="stockid"></multigame>
    
    </v-layout>
   <footerBetMultigame></footerBetMultigame>
  </div>
</template>
<script>

import multigame from "~/components/modern/multigame";

import footerBetMultigame from "~/components/modern/footerBetMultigame";

export default {
  layout: "desktopModern",
  components: {
    multigame,
    footerBetMultigame
  },
  data() {
    return {
      stockShow: ["usindex", "SH000001"],
      stockSelect: []
    };
  },
};
</script>