<template>
  <div>
    <breadcrumbs
      title="Stock List"
      linkItem="announcement"
      linkItem2="gamerule"
      titlebtn="announcement"
      titlebtn2="rule"
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
          ></v-select>
        </v-flex>
        <v-flex xs1 class="d-flex mx-3">
          <v-btn @click="goSearch" class="main-btn">go</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <sotkclist1 />
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
      items: ["day", "weeks", "months", "years", "all"],
      itemss: ""
    };
  },
  computed: {
    ...mapGetters(["getStockList", "getLivePrice", "getPreviousPrice"])
  },
  methods: {
    ...mapMutations(["setIsLoadingStockGame"]),
    goSearch() {
      alert("You're right");
    }
  }
};
</script>