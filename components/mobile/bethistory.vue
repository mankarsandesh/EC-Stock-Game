<template>
  <div>
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <v-layout row wrap id="history">
      <v-flex xs4 sm2 md2 lg2 mr-1 mt-2 mb-2 style="float:left;" class="input-text">
        <v-menu
          v-model="from"
          :close-on-content-click="false"
          :nudge-right="0"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="dateFrom"
              prepend-icon="event"
              readonly
              v-on="on"
              single-line
              hide-details
            ></v-text-field>
          </template>
          <v-date-picker v-model="dateFrom" @input="from = false"></v-date-picker>
        </v-menu>
      </v-flex>

      <v-flex xs4 sm2 md2 lg2 mr-1 ml-1 mt-2 mb-2 style="float:left;" class="input-text">
        <v-menu
          v-model="to"
          :close-on-content-click="false"
          :nudge-right="0"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="dateTo"
              prepend-icon="event"
              readonly
              v-on="on"
              single-line
              hide-details
            ></v-text-field>
          </template>
          <v-date-picker v-model="dateTo" @input="to = false"></v-date-picker>
        </v-menu>
      </v-flex>

      <v-flex xs3 sm1 md1 ml-1 mr-2 mt-2 mb-2>
        <button class="goButton buttonGreen">{{ $t("msg.go") }}</button>
      </v-flex>

      <v-flex xs5 sm5 md2 lg2 mr-2 mt-2 mb-2 class="input-text">
        <v-text-field
          single-line
          hide-details
          v-model="search"
          append-icon="search"
          class="selectHistory text-white"
          style="padding:4px;"
        ></v-text-field>
      </v-flex>
      <v-flex xs5 sm5 md2 lg2 mt-2 mb-2 class="input-text">
        <v-select
          single-line
          hide-details
          :items="items"
          label="Sort By :"
          v-model="itemss"
          class="selectHistory"
        ></v-select>
      </v-flex>
    </v-layout>

    <v-data-table
      :headers="head"
      hide-actions
      :items="userBetHistory"
      :pagination.sync="pagination"
      ref="table"
      :search="search"
      class="bg-colors"
      scope="col"
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
            <span class="win">{{ $t('msg.win') }}</span>
          </td>
          <td v-if="item.item.betResult == 'lose'">
            <span class="lose">{{ $t('msg.lose') }}</span>
          </td>
          <td v-if="item.item.betResult == 'pending'">
            <span class="pending">{{ $t('msg.pending') }}...</span>
          </td>
        </tr>
        <tr style="display:none;" class="extraInfo" :id="item.item.betUUID">
          <td colspan="2">
            <span class="betDraw">{{$t('bethistory.betdraw')}} :</span>
            <span class="gameDraw" v-html="$options.filters.lastDraw(item.item.gameDraw)"></span>
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
            <span class="betDraw">{{$t('bethistory.yourloosingamount')}} :</span>
            <span class="lossAmount">{{ item.item.betAmount }}</span>
          </td>
          <td colspan="3" v-if="item.item.rollingAmount != 0">
            <span class="betDraw">{{$t('bethistory.yourwinningamount')}} :</span>
            <span class="winAmount">{{ item.item.rollingAmount }}</span>
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
    <div class="text-right my-3 my-pagination" v-if="userBetHistory.length > 4">
      <v-pagination v-model="pagination.page" color="#1db42f" :length="10"></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ["head", "userBetHistory"],
  data() {
    return {
      dateTo: new Date().toISOString().substr(0, 10),
      dateFrom: new Date().toISOString().substr(0, 10),
      from: false,
      to: false,
      items: ["day", "weeks", "months", "years", "all"],
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
.input-text {
  border-radius: 5px;
  height: 44px;
  border: 1px solid;
}
.lose {
  border-radius: 15px;
  padding: 4px 10px;
  color: #fff;
  font-size: 13px;
  text-transform: uppercase;
  background-color: #e05858;
}
.win {
  border-radius: 15px;
  padding: 4px 16px;
  color: #fff;
  font-size: 13px;
  text-transform: uppercase;
  background-color: #2bb13b;
}
.pending {
  border-radius: 15px;
  padding: 4px 16px;
  color: #333;
  font-size: 13px;
  text-transform: uppercase;
  background-color: #fec623;
}

label,
.v-select__selection,
.text-white {
  color: white !important;
}

.toolbar-bg {
  background-color: rgb(22, 83, 136);
}

.toolbar-text {
  background-color: white;
  color: black;
  border-bottom: outset;
}

.v-window__container .v-window-item .layout .flex .v-input {
  margin: 0px;
}

.v-window__container
  .v-window-item
  .layout
  .flex
  .v-input
  .v-input__control
  .bg-colors {
  background-color: #9b2121 !important;
  border-radius: 2px;
}

.v-window__container
  .v-window-item
  .layout
  .flex
  .v-input
  .v-input__control
  .v-input__slot
  .v-text-field__slot
  input {
  color: #fff !important;
  font-size: 1.2rem;
  padding: 11px;
}

.goButton {
  /* padding: 6px 4px; */
  background-color: #003e70 !important;
  color: #fff;
  height: 100%;
  margin-top: 0px;
  left: -8px;
  width: 100%;
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
