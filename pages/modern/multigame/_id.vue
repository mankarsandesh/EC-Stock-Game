<template>
  <div style="margin-bottom:250px">
    <v-layout wrap class="pt-5">
      <v-flex height="100%" xs6  v-for="(stockid,index) in getStockMultigame" :key="stockid">
        <div class="border-flex">
          <multigame :class="index%2==0 ?'pl-0':'pr-0'" :stockid="stockid"></multigame>
        </div>
      </v-flex>
      <v-flex xs6 flex height="100%">
        <div class="border-flex">
          <selectStock :isMultigame="true" :stockId="$route.params.id"></selectStock>
        </div>
      </v-flex>
    </v-layout>
    <footerBetMultigame></footerBetMultigame>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import multigame from "~/components/modern/multigame";

import footerBetMultigame from "~/components/modern/footerBetMultigame";
import selectStock from "~/components/modern/selectStock";

export default {
  layout: "desktopModern",
  components: {
    multigame,
    footerBetMultigame,
    selectStock
  },
  data() {
    return {
      stockSelect: []
    };
  },
  mounted() {
    this.addStockMultigame(this.$route.params.id);
  },
  methods: {
    ...mapMutations(["addStockMultigame"])
  },
  computed: {
    ...mapGetters(["getStockMultigame"])
  }
};
</script>

<style scoped>
.border-flex {
  border-top: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  padding: 15px;
}
</style>