<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 md2>
        <v-item-group v-model="window" class="shrink mr-4" mandatory tag="v-flex">
          <v-item v-for="n in tabs" :key="n">
            <div slot-scope="{ active, toggle }">
              <v-btn :input-value="active" block class="main-btn" @click="toggle">{{n}}</v-btn>
            </div>
          </v-item>
        </v-item-group>
      </v-flex>
      <v-flex xs12 md10>
        <v-window v-model="window" class="elevation-1" vertical>
          <!-- stock list -->
          <v-window-item>
            <sotkclist />
          </v-window-item>
          <!-- stock list -->

          <!-- annoucement  -->
          <v-window-item>
            <annoucement />
          </v-window-item>
          <!-- annoucement  -->
          <!-- rules -->
          <v-window-item>
            <rules />
          </v-window-item>
          <!-- rules -->
        </v-window>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import sotkclist from "~/components/modern/stocklist/stocklist";
import annoucement from "~/components/modern/stocklist/annoucement";
import rules from "~/components/modern/stocklist/rules";

export default {
  layout: "desktopModern",
  components: {
    sotkclist,
    annoucement,
    rules
  },
  data() {
    return {
      window: 0,
      tabs: ["stock list", "annoucement", "rules"],
      active: null
    };
  },
   mounted(){
    // call this every page that used "dekstopModern" layout to hide loading
     this.setIsLoadingStockGame(false)
  },
  methods:{
    ...mapMutations([
      "setIsLoadingStockGame"
    ])
  }
};
</script>