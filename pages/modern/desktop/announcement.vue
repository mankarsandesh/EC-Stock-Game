<template>
  <div
  >
    <breadcrumbs title="Announcement" linkItem="bet-history" />
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 md12 >
           <annoucement />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import breadcrumbs from "~/components/breadcrumbs";
import annoucement from "~/components/modern/stocklist/annoucement";
import rules from "~/components/modern/stocklist/rules";

export default {
  layout: "desktopModern",
  components: {
    annoucement,
    rules,
    breadcrumbs
  },
  data() {
    return {
      window: 0,
      tabs: ["announcement", "rule"],
      active: null
    };
  },
   mounted(){

  },
  methods:{
    ...mapMutations([
      "setIsLoadingStockGame"
    ])
  }
};
</script>