<template>
  <v-layout column wrap>
    <v-btn
      class="buttonGreen"
      :to="'/modern/desktop//current-bet'"    
    >{{$t('msg.View All Results')}}</v-btn>

    <v-flex pa-2 class="headerStockBar">{{$t('msg.betting')}}</v-flex>

    <v-flex class="text-xs-center" style="overflow:auto; max-height:380px;">

      <h3 v-show="getOnGoingBet.length<=0" class="pa-5">{{$t('msg.nobetting')}}</h3>
      <!-- v-show="getOnGoingBet.length>0" -->

      <v-list three-line class="pa-0" v-show="getOnGoingBet.length>0">
        <template v-for="(data, index) in getOnGoingBet" class="pa-0">
          <v-divider :key="index" v-if="index>0"></v-divider>

          <v-list-tile :key="data.index" avatar>
            <v-list-tile-content>
              <span class="current-bet">
               <table>
                  <tr>
                    <td>Bet ID</td>
                    <td>{{ data.betId }}</td>
                  </tr>
                  <tr>
                    <td>Date & Time</td>
                    <td>{{data.betTime}}</td>
                  </tr>
                  <tr>
                    <td>Bet</td>
                    <td>${{data.betAmount}} on {{data.rule}}</td>
                  </tr>
                  <tr>
                    <td>Stock name:</td>
                    <td>{{$t('stockname.'+getStockIdtoStockName(data.stock))}}
                    - {{data.loops}} {{$t('msg.minute')}} {{$t('msg.loop')}}</td>
                  </tr>

                </table>
              </span>
              <!-- <v-list-tile-title >Amount:{{5000}}<span class="text-uppercase">(firstdigit-mid)</span></v-list-tile-title>
              <v-list-tile-sub-title>Stock:btc1</v-list-tile-sub-title>-->
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-flex>
    <v-flex
      pa-2
      class="totalAmount "
      >$ {{getBettingAmount}}</v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "getOnGoingBet",
      "getBettingAmount",
      "getStockIdtoStockName"
    ])
  }
};
</script>

<style scoped>
.current-bet{
padding: 10px 0px;
  width: 100%;
}
table{
 
  width: 100%;
  border:none;
  
}
table tr{
  width: 100%;
}
table tr td:first-child{
  width: 40%;
}

.current-bet {
  font-size: 12px;
  color: #000;
}

</style>