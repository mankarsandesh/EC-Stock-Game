<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 md2>
        <v-item-group v-model="window" class="shrink mr-4" mandatory tag="v-flex">
          <v-item v-for="n in tabs" :key="n">
            <div slot-scope="{ active, toggle }">
              <v-btn :input-value="active" block class="main-btn" @click="toggle">{{$t('menu.'+n)}}</v-btn>
            </div>
          </v-item>
        </v-item-group>
      </v-flex>
      <v-flex xs12 md10>
        <v-window v-model="window" class="elevation-1" vertical>
          <!-- Baic Information -->
          <v-window-item>
            <Histoy />
          </v-window-item>
          <!-- Baic Information -->

          <!-- stock analysis -->
          <v-window-item>
            <currentbet />
          </v-window-item>
          <!-- stock analysis -->
        </v-window>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import currentbet from "~/components/classic/currentbetinfo";
import Histoy from "~/components/classic/historyinfo";
export default {
  layout: "desktopModern",
  components: {
    currentbet,
    Histoy
  },
  data() {
    return {
      window: 0,
      tabs: ["history", "current bet"],
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