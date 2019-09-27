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
          <!-- Baic Information -->
          <v-window-item>
            <currentbet />
          </v-window-item>
          <!-- Baic Information -->

          <!-- stock analysis -->
          <v-window-item>
            <Histoy />
          </v-window-item>
          <!-- stock analysis -->
        </v-window>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import currentbet from "~/components/modern/currentBet/currentBet";
import Histoy from "~/components/modern/currentBet/history";
export default {
  layout: "desktopModern",
  components: {
    currentbet,
    Histoy
  },
  data() {
    return {
      window: 0,
      tabs: ["current bet", "history"],
      active: null
    };
  }
};
</script>