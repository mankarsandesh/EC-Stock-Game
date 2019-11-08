<template>
  <div>
    <v-divider></v-divider>
    <!-- filter -->
    <SlideMenu ref="refslide" title="filter">
      <v-list class="pt-0 text-primary" dense>
        <v-divider></v-divider>
        <v-list-tile class="pt-2">
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">{{ $t('stock') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <div class="text-uppercase text-primary pa-0">
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
        <v-divider></v-divider>
        <v-list-tile class="py-2">
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">{{ $t('default') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      </v-list>
    </SlideMenu>
    <!-- end filter -->
    <v-toolbar class="light-toobar">
      <h1 class="text-primary text-uppercase">{{ $t('menu.stock list') }}</h1>
      <v-spacer></v-spacer>

      <v-btn icon @click="$router.go(-1)">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-toolbar>
    <v-toolbar color="#003e70" class="white--text pa-0">
      <v-layout row wrap class="pa-0">
        <v-flex xs6 class="text-center border-right d-flex justify-center">
          <v-btn text flat @click="filterClick">
            <span class="uppercase-text white--text">{{ $t('filter')}}</span>
          </v-btn>
        </v-flex>

        <v-flex xs6 class="d-flex justify-center text-center">
          <v-btn text flat @click="searchClick">
            <span class="uppercase-text white--text">{{ $t('search')}}</span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-toolbar>
    <!-- search -->
    <v-layout class="pa-0" v-if="isSearch">
      <v-flex xl-12>
        <v-text-field
          full-width
          height="70"
          :placeholder="$t('search stock')"
          solo
          clearable
          single-line
          :autofocus="focusSearch"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <!-- end serach -->
    <v-list three-line :class="{'mx-4':isHorizontal}">
      <template v-for="(data, index) in getStockList">
        <v-divider class="dashed" v-if="index>0" :key="index"></v-divider>
        <v-list-tile :key="data.stockname" avatar class="mt-2">
          <v-list-tile-content>
            <!-- <nuxt-link :to="'/betting/' +data.id"> -->
            <v-list-tile-title
              class="text-primary text-uppercase"
              @click="$router.push('/betting/'+data.id)"
            >{{data.stockname}}</v-list-tile-title>
            <!-- </nuxt-link> -->
            <v-list-tile-sub-title class="pt-2">
              <v-layout row wrap>
                <v-flex xs4>
                  <ul>
                    <li class="text-primary">{{$t("stock-list.live price")}}</li>
                    <li
                      class="text-second"
                      v-html="$options.filters.livePriceColor(getLivePrice(data.id),getPreviousPrice(data.id))"
                    ></li>
                  </ul>
                </v-flex>
                <v-flex xs8>
                  <ul>
                    <li class="text-primary">{{$t("stock-list.reference")}}</li>
                    <li>
                      <a
                        :href="data.urlRef"
                        target="_blank"
                        style="overflow-y: auto; white-space: nowrap;"
                      >
                        <b>{{data.urlRef}}</b>
                      </a>
                    </li>
                  </ul>
                </v-flex>
              </v-layout>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
    <v-layout row wrap pb-3 justify-center>
      <v-flex xs5 class="text-center d-flex">
        <v-btn outline color="#003e70" class="text-uppercase">{{$t("stock-list.load more")}}</v-btn>
      </v-flex>
    </v-layout>
    <!-- back to top -->
    <!-- <back-to-top bottom="22px" right="22px" visibleoffset="150">
      <v-icon color="#fff" size="35">keyboard_arrow_up</v-icon>
    </back-to-top> -->
  </div>
</template>
<script>desh11

import { mapGetters } from "vuex";
import SlideMenu from "~/components/SlideMenu.vue";
export default {
  components: {
    SlideMenu
  },
  data() {
    return {
      checkbox1: false,
      isSearch: false,
      focusSearch: false,
    };
  },
  computed: {
    ...mapGetters(["getStockList","getLivePrice","getPreviousPrice"]),
    isHorizontal() {
      let w = window.innerWidth;
      let h = window.innerHeight;
      if(w>h){
        return true
      }
      else{
        return false
      }
    }
  },
  methods: {
    filterClick() {
      this.$refs.refslide.showMenu();
    },
    searchClick() {
      this.isSearch = !this.isSearch;
      this.focusSearch = !this.focusSearch;
    }
  }
};
</script>
<style scoped>
.v-btn:not(.v-btn--depressed):not(.v-btn--flat) {
  /* will-change: box-shadow; */
  box-shadow: none !important;
  border-radius: 0;
}
/* .v-label{
    color:#003e70 !important
} */
.v-input--selection-controls__input .v-label {
  color: rgb(218, 25, 25) !important;
}

.input-group--disabled.input-group--select label {
  color: rgb(35, 224, 215) !important;
}
.v-input__control .v-input__slot .v-text-field__slot input {
  margin-top: 0 !important;
}
a {
  color: blue;
  text-decoration: underline;
}
</style>