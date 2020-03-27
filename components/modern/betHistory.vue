<template>
  <v-container>
    <v-layout row class="justify-center">
      <v-flex xs12 md12>
        <v-data-table
          :headers="head"
          hide-actions
          :items="userBetHistory"
          :pagination.sync="pagination"
          ref="table"
          :search="search"
          class="current-bet"
          show-expand
        >
          <template v-slot:items="item">
            <tr @click="clicked(item.item.betUUID)" class="selectRow">
              <td>{{ item.item.betUUID }}</td>
              <td>{{ item.item.gameUUID }}</td>
              <td>
                {{ item.item.ruleName }} - ({{ item.item.payout }})
                {{ item.item.stockName }} / {{ item.item.loop }}
              </td>
              <td>{{ item.item.createdDate }} {{ item.item.createdTime }}</td>
              <td>{{ item.item.betAmount | toCurrency }}</td>
              <td>{{ item.item.payout }}</td>
              <td v-if="item.item.betResult == 'win'" class="text-uppercase">
                <span class="win">{{ item.item.betResult }}</span>
              </td>
              <td v-if="item.item.betResult == 'lose'">
                <span class="lose">{{ item.item.betResult }}</span>
              </td>
              <td v-if="item.item.betResult == 'pending'">
                <span class="pending">{{ item.item.betResult }}...</span>
              </td>
            </tr>
            <tr style="display:none;" class="extraInfo" :id="item.item.betUUID">
              <td colspan="2">
                <span class="betDraw">{{$t('bethistory.betdraw')}} :</span>
                <span
                  class="gameDraw"
                  v-html="$options.filters.lastDraw(item.item.gameDraw)"
                ></span>
              </td>
              <td colspan="2" class="allDigit">
                {{$t('gamemsg.firstdigit')}}
                <span
                  v-html="$options.filters.firstDigit(item.item.gameDraw)"
                ></span>
                {{$t('gamemsg.lastdigit')}}
                <span
                  v-html="$options.filters.lastDigit(item.item.gameDraw)"
                ></span>
                {{$t('gamemsg.bothdigit')}}
                <span
                  v-html="$options.filters.bothDigit(item.item.gameDraw)"
                ></span>
                {{$t('gamemsg.twodigit')}}
                <span
                  v-html="$options.filters.twoDigit(item.item.gameDraw)"
                ></span>
              </td>
              <td colspan="3" v-if="item.item.rollingAmount == 0">
                <span class="betDraw"> {{$t('bethistory.yourloosingamount')}} : </span
                ><span class="lossAmount"> {{ item.item.betAmount }} </span>
              </td>
              <td colspan="3" v-if="item.item.rollingAmount != 0">
                <span class="betDraw"> {{$t('bethistory.yourwinningamount')}} : </span
                ><span class="winAmount"> {{ item.item.rollingAmount }} </span>
              </td>
            </tr>
          </template>

          <template slot="footer">
            <tr>
              <td>{{ $t("msg.Total") }}</td>
              <td colspan="4">{{ userBetHistory.length }} bets</td>
              <td>
                <strong>{{ TotalAmount | toCurrency }}</strong>
              </td>
              <td>
                <strong>{{ TotalRolling | toCurrency }}</strong>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <div class="text-right my-3 my-pagination" v-if="userBetHistory.length > 4">
      <v-pagination
        v-model="pagination.page"
        color="#1db42f"
        :length="10"
      ></v-pagination>
    </div>
  </v-container>
</template>
<script>
export default {
  props: ["head", "userBetHistory","search"],
  data: () => ({
    pagination: {
      page: 1
    }
  }),
  filters: {
    toCurrency(value) {    
      if (typeof value !== "number") {       
        return value; 
      }
      var formatter = new Intl.NumberFormat("en-US", {        
        style: "currency",
        currency: "USD", 
        minimumFractionDigits: 0
      });
      return formatter.format(value); 
    }
  },
  methods: {
    clicked(betUUID) {
      $(".extraInfo").hide();
      $("#" + betUUID).show();
    }
  },
  computed: {
    TotalAmount() {     
      let total = null; 
      this.userBetHistory.map(item => {       
        total += item.betAmount; 
      });
      return total; 
    },
    TotalRolling() {     
      let total = null; 
      this.userBetHistory.map(item => {    
        total += item.rollingAmount; 
      });
      return total; 
    }
  }
};
</script>
<style scoped>
.selectRow {
  cursor: pointer;
}
.extraInfo {
  padding: 10px;
  height: 70px;
  background-color: #f3f3f3;
}
.lose {
  border-radius: 15px;
  padding: 4px 10px;
  color: #fff;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  background-color: #e05858;
}
.win {
  border-radius: 15px;
  padding: 4px 16px;
  color: #fff;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  background-color: #2bb13b;
}
.pending {
  border-radius: 15px;
  padding: 4px 16px;
  color: #333;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  background-color: #fec623;
}
.betDraw {
  color: #545353;
  font-size: 16px;
  font-weight: 600;
}
.gameDraw {
  border: 1.5px solid #3a79ff;
  border-radius: 8px;
  padding: 4px 20px;
  font-size: 16px;
  font-weight: 600;
}
.winAmount {
  border: 1.5px solid #0eb03e;
  border-radius: 8px;
  padding: 4px 20px;
  font-size: 16px;
  color: #0eb03e;
  font-weight: 600;
}
.lossAmount {
  border: 1.5px solid #fc0020;
  border-radius: 8px;
  padding: 4px 12px;
  font-size: 16px;
  color: #fc0020;
  font-weight: 600;
}
.allDigit {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  text-transform: uppercase;
}
.allDigit span {
  border: 1px solid #a4a4a4;
  color: red;
  font-size: 16px;
  padding: 0px 6px;
  border-radius: 4px;
  margin: 0px 5px;
}
</style>
