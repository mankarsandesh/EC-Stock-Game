<template>
  <div>
    <v-layout>
      <v-flex
        pa-2
        class="text-xs-center text-uppercase text-white flex-cursor pa-0"
        style=" background-color: #003e70"
        @click="switchIsShowBet(true)"
      >
        <span>bet result</span>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex
        pa-2
        class="text-xs-center text-uppercase text-white flex-cursor"
        style=" background-color: #33658d"
        @click="switchIsShowBet(false)"
      >
        <span>all results</span>
      </v-flex>
    </v-layout>
    <v-layout>
      <!-- bet result -->
      <v-flex xs12 v-if="isShowBet">
        <table class="table table-responsive bet-result">
          <tr>
            <th>Stock name</th>
            <th>Time</th>
            <th>Result</th>
          </tr>
          <tr v-for="(data,index) in getStockList" :key="index">
            <td>
              <nuxt-link :to="'/modern/desktop/'+data.id">{{ data.stockname }}</nuxt-link>
            </td>
            <td class="text-xs-right">{{ onlyTime(getStockById(data.id).timeLastDraw)}}</td>
            <td class="text-xs-right">{{getStockById(data.id).lastDraw}}</td>
          </tr>
        </table>
      </v-flex>
      <!-- all result -->
      <v-flex xs12 v-else>
        <table class="table table-responsive all-result">
          <tr>
            <th>ID</th>
            <th>Stock</th>
            <th>Result</th>
            <th>Gold amount</th>
          </tr>
          <tr v-for="(data,index) in getStockList" :key="index">
            <td></td>
            <td class="text-xs-right">{{ data.stockname }}</td>
            <td class="text-xs-right">{{getStockById(data.id).lastDraw}}</td>
            <td class="text-xs-right">{{getStockById(data.id).lastDraw}}</td>
          </tr>
        </table>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isShowBet: true
    };
  },
  computed: {
    ...mapGetters(["getStockList", "getLotteryDraw", "getStockById"])
  },
  methods: {
    switchIsShowBet(boolean) {
      this.isShowBet = boolean;
    },
    onlyTime(value) {
      let d = value.split(" ");
      return d[1];
    }
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
.flex-cursor {
  cursor: pointer;
  height: 100%;
  width: 100%;
}
</style>