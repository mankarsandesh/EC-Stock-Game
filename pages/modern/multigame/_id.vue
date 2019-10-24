<template>
  <div>
    <v-layout wrap class="pt-5">
      <multigame :stockid="$route.params.id" class="pr-0"></multigame>
      <!-- <multigame v-for="(stockid,index) in stockShow" :class="index%2==0 ?'pl-0':'pr-0'" :key="index" :stockid="stockid"></multigame> -->
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
      stockShow: ["usindex", "SH000001","usindex", "SH000001","usindex", "SH000001"],
      stockSelect: []
    };
  },
};
</script>