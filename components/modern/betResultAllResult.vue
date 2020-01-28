<template>
  <div>
    <v-layout>
      <v-flex
        pa-2
        class="text-xs-center text-uppercase text-white flex-cursor pa-0"
        style=" background-color: #003e70"
        @click="switchIsShowBet(true)"
      >
        <span>{{$t('msg.Bet Result')}}</span>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex
        pa-2
        class="text-xs-center text-uppercase text-white flex-cursor"
        style=" background-color: #33658d"
        @click="switchIsShowBet(false)"
      >
        <span>{{$t('msg.All Results')}}</span>
      </v-flex>
    </v-layout>
    <v-layout>
      <!-- bet result -->
      <v-flex xs12 v-if="isShowBet">
        <div class="table-responsive">
          <table class="table">
            <tr>
              <th>{{$t('msg.Stock Name')}}</th>
              <th>{{$t('msg.Time')}}</th>
              <th>{{$t('msg.Result')}}</th>
            </tr>
            <tr v-for="(data,index) in getStockList" :key="index">
              <td>
                <nuxt-link :to="'/modern/desktop/'+data.id">{{ $t(`stockname.${data.stockname}`)}} {{ data.stockname == 'btc1' ? '1':data.stockname == 'btc5' ? '5':'' }}</nuxt-link>
              </td>
              <td class="text-xs-right">{{ onlyTime(getStockById(data.id).timeLastDraw)}}</td>
              <td class="text-xs-right">{{getStockById(data.id).lastDraw}}</td>
            </tr>
          </table>
        </div>
      </v-flex>
      <!-- all result -->
      <v-flex xs12 v-else>
        <div class="table-responsive">
          <table class="table">
            <tr>
              <th>{{$t('msg.gameid')}}</th>
              <th>{{$t('msg.Stock')}}</th>
              <th>{{$t('msg.Result')}}</th>
              <th>{{$t('msg.amount')}}</th>
            </tr>
            <tr v-for="(data,index) in getStockList" :key="index">
              <td></td>
              <td class="text-xs-right">{{ $t(`stockname.${data.stockname}`)}}{{ data.stockname == 'btc1' ? '1':data.stockname == 'btc5' ? '5':'' }}</td>
              <td class="text-xs-right">{{getStockById(data.id).lastDraw}}</td>
              <td class="text-xs-right">{{getStockById(data.id).lastDraw}}</td>
            </tr>
          </table>
        </div>
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