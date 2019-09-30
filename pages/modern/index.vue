<template>
  <div>
    <!-- filter -->
    <SlideMenu ref="refslideleft" title="filter">
      <v-list class="pt-0 text-primary" dense>
        <!-- filter stock name -->
        <v-divider></v-divider>
        <v-list-tile class="pt-2" @click="showfilterStock = !showfilterStock">
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">stock</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <div class="text-uppercase text-primary pa-0" v-show="showfilterStock">
          <v-list-tile>
            <v-list-tile-content class="pl-3 text-color">
              <v-checkbox v-model="checkbox1" color="#003e70" label="china"></v-checkbox>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content class="pl-3 text-primary text-color">
              <v-checkbox
                v-model="checkbox1"
                color="#003e70"
                label="usa"
                style="color:red !important"
              ></v-checkbox>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content class="pl-3 text-primary text-color">
              <v-checkbox v-model="checkbox1" color="#003e70" label="cypto"></v-checkbox>
            </v-list-tile-content>
          </v-list-tile>
        </div>
        <!--filter game type -->
        <v-divider></v-divider>
        <v-list-tile class="pt-2">
          <v-list-tile-content @click="showfilterType = !showfilterType">
            <v-list-tile-title class="text-uppercase">game type</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <div class="text-uppercase text-primary pa-0" v-show="showfilterType">
          <v-list-tile>
            <v-list-tile-content class="pl-3 text-color">
              <v-checkbox v-model="checkbox1" color="#003e70" label="1 minute"></v-checkbox>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content class="pl-3 text-primary text-color">
              <v-checkbox v-model="checkbox1" color="#003e70" label="5 minute"></v-checkbox>
            </v-list-tile-content>
          </v-list-tile>
        </div>

        <v-divider></v-divider>
        <v-list-tile class="py-2">
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">default</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      </v-list>
    </SlideMenu>
    <!-- sort -->
    <SlideMenu ref="refslideright" title="sort" :right="true">
      <v-list class="pt-0 text-primary" dense>
        <!-- sort stock name -->
        <v-divider></v-divider>
        <v-list-tile class="pt-2">
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">stock name</v-list-tile-title>
          </v-list-tile-content>
          <v-spacer></v-spacer>
          <v-btn icon class="hidden-xs-only" @click.stop="drawer = !drawer">
            <v-icon class="icon-primary">done</v-icon>
          </v-btn>
        </v-list-tile>

        <!--sort game type -->
        <v-divider></v-divider>
        <v-list-tile class="pt-2">
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">stock type</v-list-tile-title>
          </v-list-tile-content>
          <v-spacer></v-spacer>
          <v-btn icon class="hidden-xs-only" @click.stop="drawer = !drawer">
            <v-icon class="icon-primary">done</v-icon>
          </v-btn>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="py-2">
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">default</v-list-tile-title>
          </v-list-tile-content>
          <v-spacer></v-spacer>
          <v-btn icon class="hidden-xs-only" @click.stop="drawer = !drawer">
            <v-icon class="icon-primary">done</v-icon>
          </v-btn>
        </v-list-tile>
        <v-divider></v-divider>
      </v-list>
    </SlideMenu>
    <v-toolbar color="#003e70" class="white--text pa-0">
      <v-layout row wrap class="pa-0">
        <v-flex xs6 class="text-center border-right d-flex justify-center">
          <v-btn text flat @click="filterClick">
            <span class="uppercase-text white--text">filter</span>
          </v-btn>
        </v-flex>

        <v-flex xs6 class="d-flex justify-center text-center">
          <v-btn text flat @click="sortClick">
            <span class="uppercase-text white--text">sort</span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-toolbar>

    <v-layout row wrap px-2 pt-2>
      <v-flex pa-2 v-for="(data,index) in getStockChart " :key="index" xs4 sm4 md4>
        <nuxt-link :to="'/modern/betting/' +data.id">
          <v-card class="v-card-style">
            <!-- bet close -->
            <div class="close-bet-chart" v-if="getLotteryDraw(data.id) ==='close'">
              <span class="text-close-bet">market close</span>
            </div>
            <v-card-title class="px-1 py-0" style="font-size:11px">
              <v-layout>
                <v-flex xs6 class="text-xs-left">
                  live TIME
                  <span class="text-primary">{{getLiveTime(data.id)}}</span>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs6 class="text-xs-right" v-if="getLotteryDraw(data.id) >0">
                  live PRICE
                  <span class="text-second">{{getLivePrice(data.id)}}</span>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-text class="pa-0" min-height="156">
              <chartIndex :data="data.stockPrice" :key="data.stockPrice[0]"></chartIndex>
            </v-card-text>
          </v-card>
          <div class="text-primary pt-2">
            <h3 class="text-uppercase">{{data.stockname}}</h3>
            <h4 style="line-height: 1">
              <em>{{data.loop}} minute game</em>
            </h4>
          </div>
        </nuxt-link>
      </v-flex>
    </v-layout>

    <v-layout row wrap pb-3 justify-center>
      <v-flex xs5 class="text-center d-flex">
        <v-btn outline color="#003e70" class="text-uppercase">load more</v-btn>
      </v-flex>
    </v-layout>
    <!-- back to top -->
    <!-- <back-to-top bottom="22px" right="22px" visibleoffset="150">
      <v-icon color="#fff" size="35">keyboard_arrow_up</v-icon>
    </back-to-top> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import chartIndex from "~/components/chartIndex";
import SlideMenu from "~/components/SlideMenu.vue";

export default {
  components: {
    SlideMenu,
    chartIndex
  },
  data() {
    return {
      checkbox1: false,
      showfilterStock: false,
      showfilterType: false
    };
  },
  mounted() {
    console.log(this.getLivePrice);
  },
  watch: {},
  computed: {
    ...mapGetters([
      "getStockChart",
      "getLivePrice",
      "getLiveTime",
      "getLotteryDraw"
    ])
  },
  methods: {
    filterClick() {
      this.$refs.refslideleft.showMenu();
    },
    sortClick() {
      this.$refs.refslideright.showMenu();
    }
  }
};
</script>
<style scoped>
.v-card-style {
  box-shadow: none !important;
  border: 1px solid #003e70;
  border-radius: 0;
}
</style>
