<template>
  <div>
    <v-layout wrap>
      <v-flex xs6 v-for="count in 8" :key="count">
        <v-layout>
          <v-flex xs12 class="pt-2">
            <h2
              class="text-uppercase"
            >{{$route.params.id}} {{getStockLoop($route.params.id)}} minute loop</h2>
            <chartApp
              :data="getStockById($route.params.id).stockPrice"
              :time="getStockById($route.params.id).stockTime"
              :key="getStockById($route.params.id).stockPrice[0]"
              height="400px"
            ></chartApp>
          </v-flex>
          <v-flex xs12>
            <v-flex>
              <v-layout>
                <v-flex class="text-xs-center" px-2>
                  <span class="text-gray">Last draw:</span>
                  <v-flex flex-style>
                    <h4 v-html="$options.filters.lastDraw(getStockLastDraw($route.params.id))"></h4>
                  </v-flex>
                </v-flex>
                <v-flex class="text-xs-center" px-2>
                  <span class="text-gray">Bet Close in:</span>
                  <v-flex flex-style>
                    <span
                      class="text-yellow"
                    >{{getLotteryDraw($route.params.id) | betclosein(getStockLoop($route.params.id))}}</span>
                  </v-flex>
                </v-flex>
                <v-flex class="text-xs-center" px-2>
                  <span class="text-gray">lottery draw:</span>
                  <v-flex flex-style>
                    <span
                      class="text-yellow"
                    >{{getLotteryDraw($route.params.id) | lotterydraw(getStockLoop($route.params.id))}}</span>
                  </v-flex>
                </v-flex>
                <v-flex xs4 class="text-xs-right" style="align-self: flex-end;">
                  <!-- <v-btn fab dark small color="#003e70">
                <v-icon dark size="25">fa-question</v-icon>
                  </v-btn>-->
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex>
              <betButton
                :isFullscreen="true"
                :stockName="$route.params.id"
                :loop="getStockLoop($route.params.id)"
              ></betButton>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import betButton from "~/components/modern/betButton";
import chartApp from "~/components/modern/chart";
export default {
  layout: "desktopModern",
  components: {
    betButton,
    chartApp
  },
  computed: {
    ...mapGetters([
      "getStockLoop",
      "getStockLastDraw",
      "getLotteryDraw",
      "lotterydraw",
      "getStockById"
    ])
  }
};
</script>