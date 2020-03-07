<template>
  <div>
    <v-layout>
      <v-flex
        pa-2
        class="text-xs-center flex-cursor pa-0 betTab"
        :class="{activeTab:selected == 1}"
        @click="switchIsShowBet(true,1)"
      >
        <span>{{$t('msg.stockResult')}}</span>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex
        pa-2
        class="text-xs-center flex-cursor betTab"
        :class="{activeTab:selected == 2}"
        @click="switchIsShowBet(false,2)"
      >
        <span>{{$t('msg.myResult')}}</span>
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
                <nuxt-link
                  :to="'/modern/desktop/'+data.id"
                >{{ $t(`stockname.${data.stockname}`)}} {{ data.stockname == 'btc1' ? '1':data.stockname == 'btc5' ? '5':'' }}</nuxt-link>
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
              <th>{{$t('stock-list.stock name')}}</th>
              <th>{{$t('msg.Result')}}</th>
              <th>{{$t('msg.amount')}}</th>
            </tr>
          
            <tr v-for="(data,index) in myResult" v-show="myResult.length>0" :key="index">
              <td class="text-xs-center">{{ $t(`stockname.${data.stockName}`)}}</td>
              <td class="text-xs-center">{{ $t(`stock-list.${data.betResult}`)}}</td>
              <td class="text-xs-center">{{ data.rollingAmount }}</td>
            </tr>
          </table>
            <h4 v-show="myResult.length<=0" class="pa-3">{{$t('msg.nobetting')}}</h4>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      selected: 1,
      isShowBet: true,
      myResult: []
    };
  },
  computed: {
    ...mapGetters(["getStockList", "getLotteryDraw", "getStockById"]),
    ...mapState(["portalProviderUUID", "headers", "userUUID"]) //get 2 data from vuex first, in the computed
  },
  mounted() {
    this.myresult(); // a
    console.log("MY Resulttt");
    console.log(this.myResult);
    console.log(this.myResult.length);
  },
  methods: {
    switchIsShowBet(boolean, active) {
      this.selected = active;
      console.log(this.selected);
      this.isShowBet = boolean;
    },
    onlyTime(value) {
      let d = value.split(" ");
      return d[1];
    },
    async myresult() {
      // afer moumted call the functions this method will run the fetch the data from API
      const betData = {
        // before we call the data we should make the object to the send the request with the API
        portalProviderUUID: this.portalProviderUUID, // get the portal provider uuid from computed that we call from vuex
        userUUID: this.userUUID, // get the userUUID with the this object
        version: "0.1", // version of API
        betResult: [0, 1], // -1= pending, 0= lose , 1 = win
        limit: "7", // limit the data we the data come will come only the 20 that we limit in this case
        offset: "0" // offset or skip the data
      };
      const { data } = await this.$axios.post(
        "http://uattesting.equitycapitalgaming.com/webApi/getAllBets", // after finish crawl the every API will the the baseURL from AXIOS
        betData, // data object
        {
          headers: {
            Authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh" // basic AUTH before send, becase the backend they will check
          }
        }
      );
      this.myResult = data.data; // after will get the respone the object or array that come with will be equal the array that we create in the data funtion
    }
  }
};
</script>
<style scoped>
.betTab {
  border-top: 1px solid #dddddd;
}
.activeTab {
  background-color: #0b2a68;
  color: #fff;
}
table {
  border-collapse: collapse;
  width: 100%;
  border-right: #ddd;
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
.flex-cursor {
  cursor: pointer;
  height: 100%;
  width: 100%;
}
</style>