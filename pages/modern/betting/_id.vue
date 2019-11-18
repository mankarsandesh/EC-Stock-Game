<template>
  <div>
    <v-layout>
      <v-flex>
        <v-toolbar color="#003e70" class="white--text v-toolbar__content-remove-r">
          <v-layout row wrap class="pa-3">
            <v-flex xs8 sm6>
              <v-layout >
                <v-flex>
                  <span class="uppercase-text white--text">Last draw</span>
                  <h4 v-html="$options.filters.lastDraw(getStockById($route.params.id).lastDraw)"></h4>
                </v-flex>
                <v-flex class="text-xs-center">
                  <span class="uppercase-text white--text">Bet closes in:</span>
                  <h4
                    class="uppercase-text text-yellow"
                  >{{getLotteryDraw($route.params.id) | betclosein(getStockById($route.params.id).loop)}}</h4>
                </v-flex>
                <v-flex class="text-xs-center">
                  <span class="uppercase-text white--text">Lottery draw:</span>
                  <h4
                    class="uppercase-text text-yellow"
                  >{{getLotteryDraw($route.params.id) | lotterydraw(getStockById($route.params.id).loop)}}</h4>
                </v-flex>
              </v-layout>
            </v-flex>
            <!-- <v-spacer></v-spacer> -->
            <v-flex ></v-flex>
            <v-flex xs2 class="border-left text-xs-center">
              <span class="text-uppercase white--text">
                <small>
                  game
                  <br />type
                </small>
              </span>
            </v-flex>
            <v-flex xs2 class="border-left text-xs-center">
              <nuxt-link to="/modern">
                <span class="text-uppercase white--text">
                  <small>
                    other
                    <br />stock
                  </small>
                </span>
              </nuxt-link>
            </v-flex>

          </v-layout>
        </v-toolbar>
      </v-flex>
    </v-layout>
    <!-- betting zone -->
    <v-layout row wrap class="container-bet" >
      <v-flex xs12 sm6 md12 class="border-color-primary"  >

        <v-layout wrap xs6  >
          <v-flex xs1 align-self-center class="text-xs-right" >
            <v-icon
              color="#003e70"
              v-show="isShowTrendMap"
              @click="changeShowTrendMap()"
            >keyboard_arrow_left</v-icon>
          </v-flex>
          <v-flex v-if="isShowTrendMap" xs10 class="text-xs-center py-2"  >
            <trendMap
              :dataArray="getStockCrawlerData($route.params.id)"
              :trendType="trendType"
              :key="getStockCrawlerData($route.params.id)[0].writetime + trendType"
              :isFullscreen="isFullscreen"
              :rowTable="4"
              :lop="30"
            ></trendMap>
          </v-flex>
          <v-flex v-else xs10 class="text-xs-center" >
            <span>
              <h3 class="text-uppercase">{{getStockById($route.params.id).stockname}}</h3>
              <span class="text-primary">
                <span>{{getStockById($route.params.id).loop}}</span> minute game | ID:
                <span>0909090</span>
              </span>
            </span>
            <v-flex pa-2 xs12 class="border-chart">
              <chartMobile
                :data="getStockById($route.params.id).stockPrice"
                :key="getStockById($route.params.id).stockPrice[0]"
              ></chartMobile>
            </v-flex>
          </v-flex>
          <v-flex xs1 align-self-center>
            <v-icon
              v-show="!isShowTrendMap"
              @click="changeShowTrendMap()"
              color="#003e70"
            >keyboard_arrow_right</v-icon>
          </v-flex>
        </v-layout>
        

      </v-flex>

      <v-flex  >
        <div
          class="betClose"
          v-if="checkBetClose  || getLotteryDraw($route.params.id) ==='close' || getLotteryDraw($route.params.id) == null "
        >
          <p>bet close</p>
        </div>
        <v-layout wrap  sm6 >

        <v-tabs slider-color="#003e70"  grow centered style="width:100%;" @change="tabChanged($event)">
          
          <v-tab >first digit</v-tab>
          <v-tab>last digit</v-tab>
          <v-tab>both digit</v-tab>
          <v-tab>two digit</v-tab>

          <!-- First Digit -->

          <v-tab-item xs4>
            <v-layout row align-center justify-center>
              <v-card class="box-click" @click="showBetDialog('firstdigit-small')">
                <v-card-title class="d-block">
                  <h5>small</h5>
                  <span>0 TO 4</span>
                </v-card-title>
              </v-card>
              <v-card class="box-click" @click="showBetDialog('firstdigit-big')">
                <v-card-title class="d-block">
                  <h5>big</h5>
                  <span>5 TO 9</span>
                </v-card-title>
              </v-card>
            </v-layout>
            <v-layout row align-center justify-center>
              <v-card class="box-click" @click="showBetDialog('firstdigit-odd')">
                <v-card-title class="o-even">
                  <h5>odd</h5>
                </v-card-title>
              </v-card>
              <v-card class="box-click" @click="showBetDialog('firstdigit-even')">
                <v-card-title class="o-even">
                  <h5>even</h5>
                </v-card-title>
              </v-card>
              <v-card class="box-click" @click.stop="drawerderfirst = !drawerderfirst">
                <v-card-title class="o-even">
                  <h5>0-9</h5>
                </v-card-title>
              </v-card>
            </v-layout>

            <v-layout row align-center justify-center>
              <v-card class="box-click" @click="showBetDialog('firstdigit-low')">
                <v-card-title class="d-block">
                  <h5>low</h5>
                  <span>0 TO 3</span>
                </v-card-title>
              </v-card>
              <v-card class="box-click" @click="showBetDialog('firstdigit-mid')">
                <v-card-title class="d-block">
                  <h5>mid</h5>
                  <span>4 TO 6</span>
                </v-card-title>
              </v-card>
              <v-card class="box-click" @click="showBetDialog('firstdigit-high')">
                <v-card-title class="d-block">
                  <h5>high</h5>
                  <span>7 TO 9</span>
                </v-card-title>
              </v-card>
            </v-layout>
          </v-tab-item>
          <!-- last digit -->
          <v-tab-item>
            <v-layout row align-center justify-center>
              <v-card class="box-click" @click="showBetDialog('lastdigit-small')">
                <v-card-title class="d-block">
                  <h5>small</h5>
                  <span>0 TO 4</span>
                </v-card-title>
              </v-card>
              <v-card class="box-click" @click="showBetDialog('lastdigit-big')">
                <v-card-title class="d-block">
                  <h5>big</h5>
                  <span>5 TO 9</span>
                </v-card-title>
              </v-card>
            </v-layout>
            <v-layout row align-center justify-center>
              <v-card class="box-click" @click="showBetDialog('lastdigit-odd')">
                <v-card-title class="o-even">
                  <h5>odd</h5>
                </v-card-title>
              </v-card>
              <v-card class="box-click" @click="showBetDialog('lastdigit-even')">
                <v-card-title class="o-even">
                  <h5>even</h5>
                </v-card-title>
              </v-card>
              <v-card class="box-click" @click.stop="drawerderlast = !drawerderlast">
                <v-card-title class="o-even">
                  <h5>0-9</h5>
                </v-card-title>
              </v-card>
            </v-layout>

            <v-layout row align-center justify-center>
              <v-card class="box-click" @click="showBetDialog('lastdigit-low')">
                <v-card-title class="d-block">
                  <h5>low</h5>
                  <span>0 TO 3</span>
                </v-card-title>
              </v-card>
              <v-card class="box-click" @click="showBetDialog('lastdigit-mid')">
                <v-card-title class="d-block">
                  <h5>mid</h5>
                  <span>4 TO 6</span>
                </v-card-title>
              </v-card>
              <v-card class="box-click" @click="showBetDialog('lastdigit-high')">
                <v-card-title class="d-block">
                  <h5>high</h5>
                  <span>7 TO 9</span>
                </v-card-title>
              </v-card>
            </v-layout>
          </v-tab-item>

          <!-- Both Digit -->
          <v-tab-item>
            <v-layout row align-center justify-center>
              <v-card class="box-click" @click="showBetDialog('bothdigit-small')">
                <v-card-title class="d-block">
                  <h5>small</h5>
                  <span>0 TO 9</span>
                </v-card-title>
              </v-card>
              <v-card class="box-click" @click="showBetDialog('bothdigit-tie')">
                <v-card-title class="d-block">
                  <h5>tie</h5>
                  <span>0</span>
                </v-card-title>
              </v-card>

              <v-card class="box-click" @click="showBetDialog('bothdigit-big')">
                <v-card-title class="d-block">
                  <h5>big</h5>
                  <span>9 TO 18</span>
                </v-card-title>
              </v-card>
            </v-layout>

            <v-layout row align-center justify-center>
              <v-card class="box-click" @click="showBetDialog('bothdigit-even')">
                <v-card-title class="o-even">
                  <h5>odd</h5>
                </v-card-title>
              </v-card>
              <v-card class="box-click" @click="showBetDialog('bothdigit-even')">
                <v-card-title class="o-even">
                  <h5>even</h5>
                </v-card-title>
              </v-card>
              <v-card class="box-click" @click.stop="drawerder018 = !drawerder018">
                <v-card-title class="o-even">
                  <h5>0-18</h5>
                </v-card-title>
              </v-card>
            </v-layout>
            <v-layout row align-center justify-center>
              <v-card class="box-click" @click="showBetDialog('bothdigit-low')">
                <v-card-title class="d-block">
                  <h5>low</h5>
                  <span>0 TO 5</span>
                </v-card-title>
              </v-card>
              <v-card class="box-click" @click="showBetDialog('bothdigit-mid')">
                <v-card-title class="d-block">
                  <h5>mid</h5>
                  <span>6 to 11</span>
                </v-card-title>
              </v-card>
              <v-card class="box-click" @click="showBetDialog('bothdigit-high')">
                <v-card-title class="d-block">
                  <h5>high</h5>
                  <span>12 to 18</span>
                </v-card-title>
              </v-card>
            </v-layout>
          </v-tab-item>

          <!-- Both Digit -->

          <!-- TWO Digit -->
          <v-tab-item>
            <v-layout row align-center justify-center>
              <v-card class="box-click" @click="showBetDialog('twodigit-small')">
                <v-card-title class="d-block">
                  <h5>small</h5>
                  <span>00 TO 49</span>
                </v-card-title>
              </v-card>
              <v-card class="box-click" @click="showBetDialog('twodigit-tie')">
                <v-card-title class="d-block">
                  <h5>tie</h5>
                  <span>0</span>
                </v-card-title>
              </v-card>
              <v-card class="box-click" @click="showBetDialog('twodigit-big')">
                <v-card-title class="d-block">
                  <h5>big</h5>
                  <span>50 TO 99</span>
                </v-card-title>
              </v-card>
            </v-layout>
            <v-layout row align-center justify-center>
              <v-card class="box-click" @click="showBetDialog('twodigit-odd')">
                <v-card-title class="o-even">
                  <h5>odd</h5>
                </v-card-title>
              </v-card>
              <v-card class="box-click" @click="showBetDialog('twodigit-even')">
                <v-card-title class="o-even">
                  <h5>even</h5>
                </v-card-title>
              </v-card>
              <v-card class="box-click" @click.stop="drawerder099 = !drawerder099">
                <v-card-title class="o-even">
                  <h5>00-99</h5>
                </v-card-title>
              </v-card>
            </v-layout>

            <v-layout row align-center justify-center>
              <v-card class="box-click" @click="showBetDialog('twodigit-low')">
                <v-card-title class="d-block">
                  <h5>low</h5>
                  <span>0 TO 33</span>
                </v-card-title>
              </v-card>
              <v-card class="box-click" @click="showBetDialog('twodigit-mid')">
                <v-card-title class="d-block">
                  <h5>mid</h5>
                  <span>34 to 66</span>
                </v-card-title>
              </v-card>
              <v-card class="box-click" @click="showBetDialog('twodigit-high')">
                <v-card-title class="d-block">
                  <h5>high</h5>
                  <span>66 to 99</span>
                </v-card-title>
              </v-card>
            </v-layout>
          </v-tab-item>

          <!-- TWO Digit -->
        </v-tabs>
         </v-layout>

         <v-toolbar bottom class="total-bet  bettingFooter"  >
          <span>Total bet : $200.00</span>
        </v-toolbar>


      </v-flex>
    </v-layout>

    <v-dialog
      v-model="bettingDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
      light
    >
      <v-card tile>
        <v-toolbar flat color="white">
          <v-layout row mt-4>
            <div class="d-block">
              <h3 class="text-uppercase">{{ $t(`stockname.${$route.params.id}`) }}</h3>
              <p
                class="text-uppercase"
              >{{getStockLoop($route.params.id)}} MINUTE GAME | {{gameRule}}</p>
            </div>
            <v-spacer></v-spacer>
            <v-btn class="close" flat @click="bettingDialog =false">
              <v-icon size="30">close</v-icon>
            </v-btn>
          </v-layout>
        </v-toolbar>

        <v-card class="mx-auto round-1 mt-3" color="#003e70" raised>
          <h3>Betting on</h3>
          <h1 class="text-uppercase">{{gameRule}}</h1>
        </v-card>
        <p class="text-dest my-0">odd {{odd}}</p>

        <!-- Chip -->
        <v-layout row justify-center>
          <v-flex xs10 class="px-4 text-center">
            <v-avatar
              size="80"
              v-for="(item,key) in imgChip"
              :key="key"
              @click="shipClick(getCoins_modern[key])"
            >
              <v-img class="ma-5" :src="item.img" :alt="item.title">{{getCoins_modern[key]}}</v-img>
            </v-avatar>
          </v-flex>
        </v-layout>
        <v-layout row mb-5 mt-3 justify-center>
          <v-flex xs4 class="px-4 text-center">
            <h5>Amount</h5>
            <v-text-field solo label="200$" clearable v-model="amount"></v-text-field>
          </v-flex>
        </v-layout>
      </v-card>
      <v-toolbar bottom class="modal-bet" @click="reviewbet()">
        <p>review bet</p>
      </v-toolbar>
    </v-dialog>
    <!-- price: "200" -->
    <!-- Review bet  -->
    <v-dialog
      v-model="reviewbetDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
      light
    >
      <v-card tile>
        <v-toolbar flat color="white">
          <v-layout row mt-4>
            <div class="d-block">
              <h3>REVIEW YOUR BET</h3>
              <p>Please confirm your bet below</p>
            </div>
            <v-spacer></v-spacer>
            <v-btn class="close" flat @click="reviewbetDialog =false">
              <v-icon size="30">close</v-icon>
            </v-btn>
          </v-layout>
        </v-toolbar>
        <hr />

        <!-- Chip -->
        <v-container class="w80 mb-5">
          <div class="row d-flex justify-space-between hr">
            <p class="stockName">Stock name</p>
            <p class="stockDetail text-uppercase">{{ $t(`stockname.${$route.params.id}`) }}</p>
          </div>
          <div class="row d-flex justify-space-between hr">
            <p class="stockName">Game ID</p>
            <p class="stockDetail">0909090</p>
          </div>
          <div class="row d-flex justify-space-between hr">
            <p class="stockName">Game Type</p>
            <p class="stockDetail">{{getStockLoop($route.params.id)}} Minute game</p>
          </div>
          <div class="row d-flex justify-space-between hr">
            <p class="stockName">Betting on</p>
            <p class="stockDetail text-uppercase">{{gameRule}}</p>
          </div>
          <div class="row d-flex justify-space-between hr">
            <p class="stockName">Odd</p>
            <p class="stockDetail">1.95</p>
          </div>
          <div class="row d-flex justify-space-between hr">
            <p class="stockName">Amount</p>
            <p class="stockDetail text-uppercase">{{amount}}</p>
          </div>
        </v-container>
      </v-card>
      <v-toolbar bottom class="modal-bet" @click="placeBet">
        <p>Place bet</p>
      </v-toolbar>
    </v-dialog>
    <!-- price: "200" -->
    <!-- End review bet -->
    <!-- Test -->

    <v-navigation-drawer class="drawer-asidebar" right v-model="drawerderfirst" fixed temporary>
      <v-layout row mt-4>
        <div class="d-block">
          <h3 class="text-uppercase">{{ $t(`stockname.${$route.params.id}`) }}</h3>
          <p>{{getStockById($route.params.id).loop}} MINUTE GAME | FIRST DIGT - NUMBER</p>
        </div>
        <v-btn class="close" flat @click="drawerderfirst =! drawerderfirst">
          <v-icon size="30">close</v-icon>
        </v-btn>
      </v-layout>
      <hr class="head-jumbothron" />
      <v-container>
        <v-layout row wrap>
          <v-flex
            xs3
            v-for="(item,index) in 10"
            :key="item"
            @click="showBetDialog(`firstdigit-${index}`)"
          >
            <v-card-title class="box-click-modal o-even">
              <h5>{{index}}</h5>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-container>
    </v-navigation-drawer>

    <v-navigation-drawer class="drawer-asidebar" right v-model="drawerderlast" fixed temporary>
      <v-layout row mt-5>
        <div class="d-block">
          <h3 class="text-uppercase">{{getStockById($route.params.id).stockname}}</h3>
          <p>{{getStockById($route.params.id).loop}} MINUTE GAME | FIRST DIGT - NUMBER</p>
        </div>
        <v-btn class="close" flat @click="drawerderlast =! drawerderlast">
          <v-icon size="30">close</v-icon>
        </v-btn>
      </v-layout>
      <hr class="head-jumbothron" />
      <v-container>
        <v-layout row wrap>
          <v-flex
            xs3
            v-for="(item,index) in 10"
            :key="item"
            @click="showBetDialog(`lastdigit-${index}`)"
          >
            <v-card-title class="box-click-modal o-even">
              <h5>{{index}}</h5>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-container>
    </v-navigation-drawer>

    <v-navigation-drawer class="drawer-asidebar" right v-model="drawerder018" fixed temporary>
      <v-layout row mt-5>
        <div class="d-block">
          <h3 class="text-uppercase">{{getStockById($route.params.id).stockname}}</h3>
          <p>{{getStockById($route.params.id).loop}} MINUTE GAME | FIRST DIGT - NUMBER</p>
        </div>
        <v-btn class="close" flat @click="drawerder018 =! drawerder018">
          <v-icon size="30">close</v-icon>
        </v-btn>
      </v-layout>
      <hr class="head-jumbothron" />
      <v-container>
        <v-layout row wrap>
          <v-flex
            xs3
            v-for="(item,index) in 19"
            :key="item"
            @click="showBetDialog(`bothdigit-${index}`)"
          >
            <v-card-title class="box-click-modal o-even">
              <h5>{{index}}</h5>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-container>
    </v-navigation-drawer>

    <!-- Test -->
    <!-- 0 -99 -->
    <v-navigation-drawer class="drawer-asidebar" right v-model="drawerder099" fixed temporary>
      <v-layout row mt-4>
        <v-tabs slider-color="#003e70" grow centered>
          <v-tab>00 - 19</v-tab>
          <v-tab>20 - 39</v-tab>
          <v-tab>40 - 59</v-tab>
          <v-tab>60 - 79</v-tab>
          <v-tab>80 - 99</v-tab>
          <!-- 0 19 -->
          <v-tab-item>
            <v-container>
              <v-layout row wrap>
                <v-flex
                  xs3
                  v-for="(item,index) in 20"
                  :key="item"
                  @click="showBetDialog(`twodigit-${index < 10 ? '0' + index :index}`)"
                >
                  <v-card-title class="box-click-modal o-even">
                    <h5>{{ index < 10 ? "0" + index :index}}</h5>
                  </v-card-title>
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
          <!-- 0 19 -->
          <!-- 20 39 -->
          <v-tab-item>
            <v-container>
              <v-layout row wrap>
                <v-flex
                  xs3
                  v-for="(item,index) in 40"
                  :key="item"
                  v-show="item > 20"
                  @click="showBetDialog(`twodigit-${index}`)"
                >
                  <v-card-title class="box-click-modal o-even">
                    <h5>{{index}}</h5>
                  </v-card-title>
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
          <!-- 20 39 -->

          <!--40 59 -->
          <v-tab-item>
            <v-container>
              <v-layout row wrap>
                <v-flex
                  xs3
                  v-for="(item,index) in 60"
                  :key="item"
                  v-show="item > 40"
                  @click="showBetDialog(`twodigit-${index}`)"
                >
                  <v-card-title class="box-click-modal o-even">
                    <h5>{{index}}</h5>
                  </v-card-title>
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
          <!--40 59 -->

          <!--60 79 -->
          <v-tab-item>
            <v-container>
              <v-layout row wrap>
                <v-flex
                  xs3
                  v-for="(item,index) in 80"
                  :key="item"
                  v-show="item > 60"
                  @click="showBetDialog(`twodigit-${index}`)"
                >
                  <v-card-title class="box-click-modal o-even">
                    <h5>{{index}}</h5>
                  </v-card-title>
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
          <!--60 79 -->

          <!-- 80 99 -->
          <v-tab-item>
            <v-container>
              <v-layout row wrap>
                <v-flex
                  xs3
                  v-for="(item,index) in 100"
                  :key="item"
                  v-show="item > 80"
                  @click="showBetDialog(`twodigit-${index}`)"
                >
                  <v-card-title class="box-click-modal o-even">
                    <h5>{{index}}</h5>
                  </v-card-title>
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
          <!-- 80 99 -->
        </v-tabs>
      </v-layout>
    </v-navigation-drawer>
    
    <!-- 0 -99 -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import chartMobile from "~/components/chartMobile";
import payout from "~/data/payout";

import trendMap from "~/components/modern/trendMap";

export default {
  async validate({ params, store }) {
    return store.getters.getCheckStock(params.id);
  },
  data() {
    return {
      trendType: "firstdigit",
      isShowTrendMap: false,
      payout_high_mid_low: payout.high_mid_low,
      payout_big_small: payout.big_small,
      payout_09: payout._09,
      payout_18: payout._18,
      payout_99: payout._99,

      stockID: "",
      bettingDialog: false,
      reviewbetDialog: false,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      drawerderfirst: null,
      drawerderlast: null,
      drawerder018: null,
      drawerder099: null,
      imgChip: [
        {
          title: "Danger",
          img: "/chip/danger.png"
        },
        {
          title: "Primary",
          img: "/chip/primary.png"
        },
        {
          title: "success",
          img: "/chip/success.png"
        },
        {
          title: "warning",
          img: "/chip/warning.png"
        },
        {
          title: "black",
          img: "/chip/black.png"
        }
      ],
      odd: null,
      gameRule: "null",
      amount: 0
    };
  },
  mounted() {
    this.stockID = this.$route.params.id;
  },
  components: {
    chartMobile,
    trendMap
  },
  computed: {
    ...mapGetters([
      "getStockById",
      "getLivePrice",
      "getLiveTime",
      "getLotteryDraw",
      "getCheckStock",
      "getStockLoop",
      "getCoins_modern",
      "getStockLoop",
      "getStockCrawlerData"
    ]),
    checkBetClose() {
      if (this.getStockLoop(this.$route.params.id) == 1) {
        return this.getLotteryDraw(this.$route.params.id) > 40;
      } else {
        return this.getLotteryDraw(this.$route.params.id) > 240;
      }
    }
  },
  methods: {
    tabChanged(e) {
      switch (e) {
        case 0:
          this.trendType = "firstDigit";
          break;
        case 1:
          this.trendType = "lastDigit";

          break;
        case 2:
          this.trendType = "bothDigit";

          break;
        case 3:
          this.trendType = "twoDigit";

          break;
        default:
          alert("error");
      }
    },
    changeShowTrendMap() {
      this.isShowTrendMap = !this.isShowTrendMap;
    },
    showBetDialog(rule) {
      this.gameRule = rule;
      this.bettingDialog = true;
    },
    shipClick(value) {
      this.amount = this.amount + parseInt(value);
    },
    reviewbet() {
      this.reviewbetDialog = true;
    },
    placeBet() {
      alert("This is the placeBet");
    }
  },
  watch: {
    // set payout
    gameRule() {
      let payoutArray1 = ["small", "big", "odd", "even"];
      let payoutArray2 = ["high", "mid", "low"];
      let payoutArray3 = ["firstdigit", "lastdigit", "bothdigit", "twodigit"];
      let array = this.gameRule.split("-");

      // check the last one is string or not
      // alert(parseInt(array[1]).isNaN)
      let firstArray = array[0];
      let lastArray = array[1];
      if (Number.isNaN(parseInt(lastArray))) {
        if (payoutArray1.includes(lastArray)) {
          this.odd = this.payout_big_small;
        } else if (payoutArray2.includes(lastArray)) {
          this.odd = this.payout_high_mid_low;
        } else {
          this.odd = "error";
        }
      } else {
        switch (firstArray) {
          case "firstdigit":
            this.odd = this.payout_09;
            break;
          case "lastdigit":
            this.odd = this.payout_09;
            break;
          case "bothdigit":
            this.odd = this.payout_18;
            break;
          case "twodigit":
            this.odd = this.payout_99;
            break;
          default:
            this.odd = "error";
        }
      }
    }
  }
};
</script>
<style lang="css" scoped>
.v-dialog__content.v-dialog__content--active .v-dialog.v-dialog--active {
  position: absolute;
  right: 0px;
  margin: 0px;
  padding: 0px;
  width: 50%;
  max-height: 100% !important;
}
.bettingFooter{
 margin-top:10px;
 color:#FFF; 
 
}
</style>