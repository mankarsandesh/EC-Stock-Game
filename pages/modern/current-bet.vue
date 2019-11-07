<template>
  <div>
    <!-- sort -->
    <SlideMenu ref="refslide" title="sort" :right="true">
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

        <!--sort amount -->
        <v-divider></v-divider>
        <v-list-tile class="pt-2">
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">amount</v-list-tile-title>
          </v-list-tile-content>
          <v-spacer></v-spacer>
          <v-btn icon class="hidden-xs-only" @click.stop="drawer = !drawer">
            <v-icon class="icon-primary">done</v-icon>
          </v-btn>
        </v-list-tile>
        <!--sort status -->
        <v-divider></v-divider>
        <v-list-tile class="pt-2">
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">status</v-list-tile-title>
          </v-list-tile-content>
          <v-spacer></v-spacer>
          <v-btn icon class="hidden-xs-only" @click.stop="drawer = !drawer">
            <v-icon class="icon-primary">done</v-icon>
          </v-btn>
        </v-list-tile>
        <!--sort payout -->
        <v-divider></v-divider>
        <v-list-tile class="pt-2">
          <v-list-tile-content>
            <v-list-tile-title class="text-uppercase">payout</v-list-tile-title>
          </v-list-tile-content>
          <v-spacer></v-spacer>
          <v-btn icon class="hidden-xs-only" @click.stop="drawer = !drawer">
            <v-icon class="icon-primary">done</v-icon>
          </v-btn>
        </v-list-tile>
      </v-list>
    </SlideMenu>
    <!-- end sort -->
    <v-divider></v-divider>
    <v-toolbar class="light-toobar pa-1+">
      <h1 class="text-primary text-uppercase" >current bet</h1>
      <v-spacer></v-spacer>

      <v-btn icon class="hidden-xs-only" @click="$router.go(-1)">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-toolbar>
    <v-toolbar color="#003e70" class="white--text pa-0">
      <v-layout row wrap class="pa-0">
        <v-flex xs6 class="text-center border-right d-flex justify-center"></v-flex>

        <v-flex xs6 class="d-flex justify-center text-center">
          <v-btn text flat @click="sortClick">
            <span class="uppercase-text white--text">sort</span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-toolbar>
    <!-- content -->
    <v-list class="text-primary px-4" v-for="(i,index) in 5" :key="index">
      <v-layout wrap px-4 pb-2>
        <v-flex xs12>
          <h2 class="text-uppercase">stockname united 01</h2>
        </v-flex>
        <v-flex xs12>
          <span class="text-uppercase pr-3">GameID: 0104239720</span>
          <span class="text-uppercase "><span class="span-border pl-3">Bet ID: 0340033330104230720181552</span></span>
        </v-flex>
        <v-flex xs12 class="pt-3">
          <v-layout>
            <v-flex>
              <ul>
                <li>
                  <span class="text-uppercase">Amount</span>
                </li>
                <li>
                  <span><b>$1200.00</b></span>
                </li>
              </ul>
            </v-flex>
            <v-flex>
              <ul>
                <li>
                  <span class="text-uppercase">Status</span>
                </li>
                <li>
                  <span><b>Pending</b></span>
                </li>
              </ul>
            </v-flex>
            <v-flex>
              <ul>
                <li>
                  <span class="text-uppercase">Payout</span>
                </li>
                <li>
                  <span><b>Pending</b></span>
                </li>
              </ul>
            </v-flex>
          </v-layout>
        </v-flex>
       
      </v-layout>
       <v-divider class="dashed" v-if="index < 4"></v-divider>
    </v-list>

    <v-layout row wrap py-3 justify-center>
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
import SlideMenu from "~/components/SlideMenu.vue";

export default {
  
  components: {
    SlideMenu
  },
  data() {
    return {};
  },
  methods: {
    sortClick() {
      this.$refs.refslide.showMenu();
    }
  }
};
</script>

<style scoped>
.span-border{
    border-left: 1px solid gray
}
</style>