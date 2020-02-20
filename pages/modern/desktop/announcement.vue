<template>
  <div>
    <breadcrumbs title="Announcement" linkItem="gamerule" titlebtn="Game Rule" />
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 md12 >
           <announcement />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import breadcrumbs from "~/components/breadcrumbs";
import announcement from "~/components/modern/stocklist/announcement";

export default {
  layout: "desktopModern",
  components: {
    announcement,
    breadcrumbs
  },
  data() {
    return {
      window: 0,
      tabs: ["announcement"],
      active: null
    };
  },
  methods:{
    ...mapMutations([
      "setIsLoadingStockGame"
    ])
  }
};
</script>