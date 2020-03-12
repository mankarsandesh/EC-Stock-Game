<template>
  <div>
    <breadcrumbs
      title="Stock List"
      linkItem="announcement"
      linkItem2="gamerule"
      titlebtn="announcement"
      titlebtn2="game rule"
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
          <v-btn @click="goSearch" class="main-btn">go</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <sotkclist1 :item="itemss" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import breadcrumbs from "~/components/breadcrumbs";
import { mapMutations, mapGetters } from "vuex";
import sotkclist1 from "~/components/modern/stocklist/stocklist1";  
export default {
  layout: "desktopModern",
  components: {
    sotkclist1,
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