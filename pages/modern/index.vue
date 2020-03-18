<template>
  <div>
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <!-- filter -->
    <SlideMenu class="filter-style mt-5" ref="refslideleft" title="filter">
      <v-list class="pt-0 text-primary" dense>
        <!-- filter stock name -->
        <v-divider></v-divider>
        <v-list-tile class="pt-2" @click="showfilterStock = !showfilterStock">
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">
              {{ $t("stock") }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <div class="text-uppercase text-primary pa-0" v-show="showfilterStock">
          <v-list-tile>
            <v-list-tile-content class="pl-3 text-color">
              <v-checkbox
                v-model="checkbox1"
                color="#003e70"
                label="china"
              ></v-checkbox>
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
              <v-checkbox
                v-model="checkbox1"
                color="#003e70"
                label="cypto"
              ></v-checkbox>
            </v-list-tile-content>
          </v-list-tile>
        </div>
        <!--filter game type -->
        <v-divider></v-divider>
        <v-list-tile class="pt-2">
          <v-list-tile-content @click="showfilterType = !showfilterType">
            <v-list-tile-title class="text-uppercase">
              {{ $t("game type") }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <div class="text-uppercase text-primary pa-0" v-show="showfilterType">
          <v-list-tile>
            <v-list-tile-content class="pl-3 text-color">
              <v-checkbox
                v-model="checkbox1"
                color="#003e70"
                label="1 minute"
              ></v-checkbox>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content class="pl-3 text-primary text-color">
              <v-checkbox
                v-model="checkbox1"
                color="#003e70"
                label="5 minute"
              ></v-checkbox>
            </v-list-tile-content>
          </v-list-tile>
        </div>

        <v-divider></v-divider>
        <v-list-tile class="py-2">
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">
              {{ $t("default") }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      </v-list>
    </SlideMenu>
    <!-- sort -->
    <SlideMenu
      class="filter-style mt-5"
      ref="refslideright"
      title="sort"
      :right="true"
    >
      <v-list class="pt-0 text-primary" dense>
        <!-- sort stock name -->
        <v-divider></v-divider>
        <v-list-tile class="pt-2">
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">
              {{ $t("stock-list.stock name") }}
            </v-list-tile-title>
          </v-list-tile-content>
          <v-spacer></v-spacer>
          <!-- <v-btn icon class="hidden-xs-only" @click.stop="drawer = !drawer">
                    <v-icon class="icon-primary">done</v-icon>
          </v-btn>-->
        </v-list-tile>

        <!--sort game type -->
        <v-divider></v-divider>
        <v-list-tile class="pt-2">
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">
              {{ $t("stock type") }}
            </v-list-tile-title>
          </v-list-tile-content>
          <v-spacer></v-spacer>
          <!-- <v-btn icon class="hidden-xs-only" @click.stop="drawer = !drawer">
                    <v-icon class="icon-primary">done</v-icon>
          </v-btn>-->
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile class="py-2">
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">
              {{ $t("default") }}
            </v-list-tile-title>
          </v-list-tile-content>
          <v-spacer></v-spacer>
          <!-- <v-btn icon class="hidden-xs-only" @click.stop="drawer = !drawer">
                    <v-icon class="icon-primary">done</v-icon>
          </v-btn>-->
        </v-list-tile>
        <v-divider></v-divider>
      </v-list>
      <v-spacer></v-spacer>
    </SlideMenu>
    <!-- <v-toolbar class="buttonGreen pa-0" style="margin-top:15px!important;">
        <v-layout row wrap class="pa-0">
              <v-flex xs6 class="text-center border-right d-flex justify-center">            
                  <v-btn text flat @click="filterClick">
                      <span class="uppercase-text white--text">filter</span>
                  </v-btn>
              </v-flex>

              <v-flex xs6 class="d-flex justify-center text-center">
                  <v-btn text flat @click="filterClick">
                      <span class="uppercase-text white--text">filter</span>
                  </v-btn>
              </v-flex>
        </v-layout>
    </v-toolbar>-->
    <div class="text-center mt-3">
      <v-flex order-xs6 class="text-center d-flex justify-center">
        <v-btn text flat @click="filterClick" class="buttonGreen">
          <span class="uppercase-text white--text">{{ $t("filter") }}</span>
        </v-btn>
        <!-- </v-flex>
        <v-flex offset-xs6 class="text-center d-flex justify-center">-->
        <v-btn text flat @click="sortClick" class="buttonGreen">
          <span class="uppercase-text white--text">{{ $t("sort") }}</span>
        </v-btn>
      </v-flex>
    </div>
    <v-layout row wrap px-2 pt-2>
      <v-flex
        pa-2
        v-for="(data, index) in getAllStocks"
        :key="index"
        xs6
        sm4
        md4
      >
        <nuxt-link :to="'/modern/betting/' + data.stockName">
          <v-card class="v-card-style">
            <!-- bet close -->
            <div
              class="close-bet-chart"
              v-if="
                getTimerByStockName(data.stockName) &&
                  getTimerByStockName(data.stockName).stockOpenOrClosed ===
                    'Closed!'
              "
            >
              <span class="text-close-bet">market close</span>
            </div>
            <v-card-title class="px-1 py-0 pa-2" style="font-size:11px;">
              <v-layout>
                <v-flex xs6 class="text-xs-left">
                  {{ $t("msg.livetime") }}:
                  <!-- <span class="text-primary">{{getStockLivePrice(data.stockName)}}</span> -->
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs6 class="text-xs-right">
                  {{ $t("msg.liveprice") }}:
                  <span class="text-primary">{{
                    getStockLivePrice(data.stockName)
                  }}</span>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-text class="pa-0" min-height="156">
              <chartIndex :stockName="data.stockName" class="pa-2"></chartIndex>
            </v-card-text>
          </v-card>
          <div class="pt-2">
            <h3 class="text-primary text-uppercase text-center">
              {{ data.stockName }}
            </h3>
            <h4 style="line-height: 1">
              <div class="text-center">
                <em>{{ data.loop }} minute game</em>
              </div>
            </h4>
          </div>
        </nuxt-link>
      </v-flex>
    </v-layout>

    <v-layout row wrap pb-3 justify-center>
      <v-flex xs5 class="text-center d-flex" style="color:#8291b2">
        <v-btn
          class="text-uppercase white--text"
          style="background-color: #8291b2;border-radius: 15px;"
          >{{ $t("stock-list.load more") }}</v-btn
        >
      </v-flex>
    </v-layout>
    <!-- back to top -->
    <!-- <back-to-top bottom="22px" right="22px" visibleoffset="150">
      <v-icon color="#fff" size="35">keyboard_arrow_up</v-icon>
    </back-to-top>-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import chartIndex from "~/components/mobile/chartIndex";
import SlideMenu from "~/components/mobile/SlideMenu.vue";

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
  mounted() {},
  watch: {},
  computed: {
    ...mapGetters(["getAllStocks", "getTimerByStockName","getStockLivePrice"])
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
  border-radius: 10px;
}

.filter-style {
  height: 66% !important;
  transform: translateX(0px);
  width: 300px !important;
}
</style>
