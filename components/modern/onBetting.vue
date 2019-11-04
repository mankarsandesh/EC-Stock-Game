<template>
  <v-layout column wrap >
    <v-flex
      pa-2
      class="text-xs-center text-uppercase text-white flex-cursor pa-0"
      style=" background-color: #003e70"
    >betting</v-flex>
    <v-flex class="text-xs-center" style="overflow:auto; max-height:350px;">
      <h3 v-show="getOnGoingBet.length<=0" class="pa-5">no betting</h3>
      <!-- v-show="getOnGoingBet.length>0" -->

      <v-list three-line class="pa-0"  v-show="getOnGoingBet.length>0">
        <template v-for="(data, index) in getOnGoingBet" class="pa-0">
          <v-divider :key="index" v-if="index>0"></v-divider>

          <v-list-tile :key="data.index" avatar >
            <span class="pr-1">{{ index+1}}.</span>

            <v-list-tile-content >
              <span class="current-bet">
                <ul>
                  <li>
                    <span><i>ID</i></span>
                    <span style="color:blue">{{ data.betId }}</span>
                    <span>-  {{data.betTime}}</span>
                  </li>
                  <li><span>Bet </span><span style="color:darkblue">${{data.betAmount}}</span> on<span class="text-uppercase"> {{data.rule}}</span></li>
                  <li>Stock name: <span> {{data.stock}}</span> - {{data.loops}} minute loop</li>
                </ul>
              </span>
              <!-- <v-list-tile-title >Amount:{{5000}}<span class="text-uppercase">(firstdigit-mid)</span></v-list-tile-title>
              <v-list-tile-sub-title>Stock:btc1</v-list-tile-sub-title> -->
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-flex>
    <v-flex
      pa-2
      class="text-xs-center text-uppercase text-white flex-cursor pa-0"
      style=" background-color: #003e70"
    >$ {{getBettingAmount}}</v-flex>
  </v-layout>
</template>

<script>
import { mapGetters} from 'vuex'
export default {
  data() {
    return {
    };
  },
  computed:{
    ...mapGetters([
      "getOnGoingBet",
      "getBettingAmount"
    ])
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  border-right: #ddd;
  text-transform: uppercase;
}

td a {
  color: #003e70 !important;
}
th {
  background-color: #cccccc;
}

th,
td {
  text-align: center;
  padding: 8px;
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
.current-bet{
  font-size: 12px;
  color: #000
}
ul{
  padding:0
}

</style>