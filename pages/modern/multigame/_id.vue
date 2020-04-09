<template>
  <div style="margin-bottom:250px">
    <v-layout wrap>
      <v-flex
        xs6
        d-flex
        v-for="(stockid, index) in getStockMultiGame"
        :key="stockid"
      >
        <div class="border-flex">
          <multigame
            :class="index % 2 == 0 ? 'pl-0' : 'pr-0'"
            :stockid="stockid"
          ></multigame>
        </div>
      </v-flex>
      <v-flex
        xs6
        class="pt-5 d-flex align-center"
        v-if="getStockMultiGame.length < 4"
      >
        <div>
          <stockSelect />
        </div>
      </v-flex>
    </v-layout>
    <bottomBetMultigame></bottomBetMultigame>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import multigame from "~/components/modern/multigame";
import stockSelect from "~/components/stockSelect";
import bottomBetMultigame from "~/components/modern/bottomBetMultigame";
export default {
  layout: "desktopModern",
  components: {
    stockSelect,
    multigame,
    bottomBetMultigame
  },
  data() {
    return {};
  },

  mounted() {
    // call this every page that used "dekstopModern" layout to hide loading
    this.setIsLoadingStockGame(false);

    this.addStockMultiGame(this.$route.params.id);
  },
  methods: {
    ...mapActions(["addStockMultiGame", "setIsLoadingStockGame"])
  },
  computed: {
    ...mapGetters(["getStockMultiGame"])
  }
};
</script>

<style scoped>
.border-flex {
  padding: 15px;
  min-height: 550px;
}
</style>
