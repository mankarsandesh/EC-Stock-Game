<template>
  <div>
    <breadcrumbs
      :title="$t('breadcrumbs.stockList')"
      linkItem="announcement"
      linkItem2="gamerule"
      :titlebtn=" $t('breadcrumbs.announcement')"
      :titlebtn2=" $t('breadcrumbs.gamerule')"
    />
    <v-container>
      <v-layout row wrap>
        <v-flex xs3 class="d-flex">
          <v-select
            class="border-round"
            hide-details
            :items="items"
            placeholder="Sort By :"
            v-model="itemss"
            v-on:change="sort(itemss)"
          ></v-select>
        </v-flex>
        <v-flex xs1 class="d-flex mx-3">
          <v-btn @click="goSearch" class="main-btn">{{$t('msg.go')}}</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <stocklist :item="itemss" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import breadcrumbs from "~/components/breadcrumbs";
import { mapMutations, mapGetters } from "vuex";
import stocklist from "~/components/modern/stocklist/stocklist";  
export default {
  layout: "desktopModern",
  components: {
    stocklist,
    breadcrumbs
  },
  data() {
    return {
      items: ["ascending", "descending"],
      itemss: ""
    };
  },
  computed: {
    ...mapGetters(["getStockList", "getLivePrice", "getPreviousPrice"])
  },
  methods: {
    ...mapMutations(["setIsLoadingStockGame"]),
    goSearch() {
      console.log("You press search button");
      // alert("You're right");
    },  
  },
  created() {
    this.active = false;
  }
};
</script>