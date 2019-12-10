<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 md2>
        <v-item-group v-model="window" class="shrink mr-4" mandatory tag="v-flex">
          <v-item v-for="n in tabs" :key="n">
            <div slot-scope="{ active, toggle }">
              <v-btn
                :input-value="active"
                block
                class="main-btn"
                @click="toggle"
              >{{$t('profile.' + n)}}</v-btn>
            </div>
            
          </v-item>
        </v-item-group>
      </v-flex>
      <v-flex xs12 md10>
        <v-window v-model="window" class="elevation-1" vertical>
          <!-- Baic Information -->
          <v-window-item>
            <basicInfo />
          </v-window-item>
          <!-- Baic Information -->

          <!-- stock analysis -->
          <v-window-item>
            <onlineHistoy />
          </v-window-item>
          <!-- stock analysis -->

          <!-- Online history -->
          <v-window-item>
            <stockAnalysis />
          </v-window-item>
          <!-- Online history -->
        </v-window>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
import basicInfo from "~/components/modern/profile/baicInfo";
import onlineHistoy from "~/components/modern/profile/onlineHistory";
import stockAnalysis from "~/components/modern/profile/stockAnalysis";
export default {
  layout: "desktopModern",
  components: {
    basicInfo,
    onlineHistoy,
    stockAnalysis
  },
  data() {
    return {
      window: 0,
      tabs: ["basic info", "online history", "stock analysis"],
      active: null
    };
  },
  mounted(){

  },
  methods: {
    ...mapMutations(["setIsLoadingStockGame"])
  }
};
</script>