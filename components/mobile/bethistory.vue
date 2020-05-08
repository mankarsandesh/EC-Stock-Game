<template>
  <div>
     <v-list-tile v-if="userBetHistory.length == 0" class="notBets">
            <h3 >
              There are no bets in History Bets.
            </h3>
        </v-list-tile>

    <v-list three-line v-if="userBetHistory.length > 0">
      <template
        v-for="(item, index) in userBetHistory"
        style="margin-bottom:50px;"
      >
        <v-list-tile :key="item.betUUID">
          <v-list-tile-content>
            <v-list-tile-sub-title class="headingTitle">
              {{ item.ruleName }} - ({{ item.payout }}) {{ item.stockName }}
            </v-list-tile-sub-title>
            <v-list-tile-sub-title>
              <span
                class="lastDraw"
                v-html="$options.filters.lastDraw(item.gameDraw)"
              ></span>
            </v-list-tile-sub-title>
            <v-list-tile-sub-title>
              {{ item.createdDate }} {{ item.createdTime }}
            </v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <span v-if="item.rollingAmount == 0" class="lossAmount"
              >-{{ item.betAmount | toCurrency}}</span
            >
            <span v-if="item.rollingAmount != 0" class="winAmount"
              >+{{ item.betAmount | toCurrency }}</span
            >
            <div v-if="item.isFollowBet == 1" class="following">
              by followers
            </div>
            <div v-if="item.isFollowBet == 0" class="original">original</div>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider :key="index"></v-divider>
      </template>
      <div class="footer" v-if="userBetHistory.length > 0">  
        <div>
          <span> {{ userBetHistory.length }} bets</span>
          <span> <strong>Total </strong> :{{ TotalAmount | toCurrency }} </span>
          <span v-if="TotalAmount < TotalRolling">
            <strong>Rolling </strong> :<span style="color:green;">{{
              TotalRolling | toCurrency
            }}</span>
          </span>

          <span v-if="TotalAmount > TotalRolling">
            <strong>Rolling </strong> :<span style="color:red;">{{
              TotalRolling | toCurrency
            }}</span>
          </span>
        </div>
      </div>
    </v-list>
  </div>
</template>
<script>
export default {
  props: ["userBetHistory"],
  data() {
    return {
      rowPageCount: 10,
      dateTo: new Date().toISOString().substr(0, 10),
      dateFrom: new Date().toISOString().substr(0, 10),
      from: false,
      to: false,
      items: ["Today", "This Week", "This Month"],
      itemss: "",
      itemspage: [5, 10, 25, 50, 100],
      itemspages: 5,
      load: false,
      history: [],
      StockName: null,
      stockId: null,
      sumTotalbetAmount: 0,
      sumTotalrollingAmount: 0,
      page: 1,
      search: "",
      pagination: {
        page: 1
      },
      itemlimit: [100, 300, 500, "all"],
      limit: "",
      limits: -1,
      selected: []
    };
  },
  filters: {
    toCurrency(value) {
      if (typeof value !== "number") {
        return value;
      }
      var formatter = new Intl.NumberFormat("en-US", {
        // if the value is number
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0
      });
      return formatter.format(value);
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
  },
  methods: {
    clicked(betUUID) {
      $(".extraInfo").hide();
      $("#" + betUUID).show();
    },
    setZero(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    }
  }
};
</script>
<style scoped>
.footer { 
  width: 100%;
  background-color: #dddddd;
  padding: 10px 0px;
  position: fixed;
  bottom: 0;
  border-top: 2px solid #dddddd;
}
.footer div {
  text-align: center;
  width: 100%;
}
.footer div span {
  text-align: center;
  font-size: 16px;
  margin: 0px 6px;
}
.lastDraw {
  background-color: #dddddd;
  padding: 0px 6px;
  font-weight: 600;
  border-radius: 4px;
}
.headingTitle {
  font-weight: 600;
  color: #003f70 !important;
  font-size: 16px;
}
.totalRollingWin {
  font-weight: 800;
  color: green;
}
.totalRollingLoss {
  font-weight: 800;
  color: red;
}

.winning {
  color: green;
  font-weight: 800;
}
.losing {
  color: red;
  font-weight: 800;
}
.selectRow {
  cursor: pointer;
}
.extraInfo {
  padding: 10px;
  height: 70px;
  background-color: #f3f3f3;
}
.original {
  text-align: right;
  width: 100px;
  color: #fec623;
  font-size: 12px;
  text-transform: lowercase;
  font-weight: 600;
}
.following {
  text-align: right;
  width: 100px;
  color: #2bb13b;
  font-size: 12px;
  text-transform: lowercase;
  font-weight: 600;
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
  font-size: 16px;
  color: #0eb03e;
  font-weight: 600;
}
.lossAmount {
  font-size: 16px;
  color: #d23a4e;
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
