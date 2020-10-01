<template>
  <v-container>
    <v-layout row class="justify-center">
      <v-flex md10 lg10>
        <v-data-table
          hide-actions
          :items="betHistory"
          :pagination.sync="pagination"
          :rows-per-page-items="[rowPageCount]"
          ref="table"
          class="current-bet"
          show-expand
        >
          <template v-slot:headers="headers">
            <tr class="tableStyle">
              <th scope="col" class="bg-colors">{{ $t("msg.betId") }}</th>
              <th scope="col" class="bg-colors">{{ $t("msg.betDetail") }}</th>
              <th scope="col" class="bg-colors">{{ $t("msg.time") }}</th>
              <th scope="col" class="bg-colors">{{ $t("msg.amount") }}</th>
              <th scope="col" class="bg-colors">{{ $t("msg.payout") }}</th>
              <th scope="col" class="bg-colors">{{ $t("msg.betStatus") }}</th>
            </tr>
          </template>
          <template v-slot:items="item">
            <tr>
              <td class="tdborder">
                <div class="gameId">
                  <b>GAME ID:</b> <span class="ecgColor">{{ item.item.id }}</span>
                </div>
              </td>
              <td colspan="4" class="tdborder"></td>
              <td class="tdborder">
                <div style="float:right;width:100%;">
                  <b>Total Bets:</b>
                  <span class="ecgColor"> {{ item.item.data.length }}</span>
                </div>
              </td>            
            </tr>

            <template
              v-for="item in item.item.data"
              @click="clicked(item.betUUID)"
              class="selectRow"
            >
              <tr @click="clicked(item.betUUID)">
                <td>
                  <a href="#">{{ item.betUUID }}</a>
                </td>
                <!-- <td>{{ item.gameUUID }}</td> -->
                <td>
                  {{
                    isNaN(item.ruleName.split("_")[1])
                      ? $t("gamemsg." + item.ruleName.split("_")[0]) +
                        "-" +
                        $t("gamemsg." + item.ruleName.split("_")[1])
                      : $t("gamemsg." + item.ruleName.split("_")[0]) +
                        "-" +
                        item.ruleName.split("_")[1]
                  }}
                  - ({{ item.payout }}) {{ item.stockName }} /
                  {{ item.loop }}
                  {{ $t("msg.minutes") }}
                </td>
                <td>
                  {{ item.createdDate | toStringDate }}
                  {{ item.createdTime }}
                </td>
                <td>
                  {{ checkCurrency(curreny) }}{{ item.betAmount | currency }}
                </td>
                <td v-if="item.betResult == 'win'">
                  <span class="winning"
                    >+{{ checkCurrency(curreny)
                    }}{{ item.rollingAmount | currency }}</span
                  >
                </td>
                <td v-if="item.betResult == 'lose'">
                  <span class="losing"
                    >-{{ checkCurrency(curreny)
                    }}{{ item.betAmount | currency }}</span
                  >
                </td>
                <td
                  v-if="item.isFollowBet == 1"
                  class="text-uppercase text-center"
                >
                  <div class="following">
                    {{ $t("currentBet.byFollowers") }}
                  </div>
                </td>
                <td v-if="item.isFollowBet == 0" class="text-uppercase">
                  <div class="original">{{ $t("currentBet.original") }}</div>
                </td>
              </tr>
              <tr style="display:none;" class="extraInfo" :id="item.betUUID">
                <td colspan="1">
                  <span class="betDraw">{{ $t("betHistory.betDraw") }} : </span>
                  <span
                    class="gameDraw"
                    v-html="$options.filters.lastDraw(item.gameDraw)"
                  ></span>
                </td>
                <td colspan="4" class="allDigit">
                  {{ $t("gamemsg.firstdigit") }}
                  <span
                    v-html="$options.filters.firstDigit(item.gameDraw)"
                  ></span>
                  {{ $t("gamemsg.lastdigit") }}
                  <span
                    v-html="$options.filters.lastDigit(item.gameDraw)"
                  ></span>
                  {{ $t("gamemsg.bothdigit") }}
                  <span
                    v-html="$options.filters.bothDigit(item.gameDraw)"
                  ></span>
                  {{ $t("gamemsg.twodigit") }}
                  <span
                    v-html="$options.filters.twoDigit(item.gameDraw)"
                  ></span>
                </td>
                <td colspan="1" v-if="item.rollingAmount == 0">
                  <!-- <span class="betDraw"
                    >{{ $t("betHistory.yourBalance") }} :</span
                  > -->
                  <span class="lossAmount"
                    >{{ checkCurrency(curreny) }}
                    {{ parseInt(item.tempBalance) | currency }} -
                    {{ checkCurrency(curreny)
                    }}{{ item.betAmount | currency }} =
                    {{ checkCurrency(curreny) }}
                    {{ parseInt(item.tempBalance) - parseInt( item.betAmount ) | currency }}
                  </span>
                </td>
                <td colspan="1" v-if="item.rollingAmount != 0">
                  <!-- <span class="betDraw"
                    >{{ $t("betHistory.yourBalance") }} :</span
                  > -->
                  <span class="winAmount"
                    >{{ checkCurrency(curreny)
                    }}{{ parseInt(item.tempBalance) | currency }} -
                    {{ checkCurrency(curreny)
                    }}{{ item.betAmount | currency }} =
                    {{ checkCurrency(curreny)
                    }}{{ parseInt(item.tempBalance) - parseInt(item.betAmount) | currency }}</span
                  >
                </td>
              </tr>
            </template>
          </template>
          <template slot="no-data">
            <td colspan="7">
              {{ $t("betHistory.noBets") }}
            </td>
          </template>
          <template slot="footer">
            <tr>
              <td>{{ $t("msg.total") }}</td>
              <td colspan="2">
                {{ userBetHistoryOld.length }} {{ $t("leaderBoard.bets") }}
              </td>
              <td>
                <strong>{{ TotalAmount | toCurrency }}</strong>
              </td>
              <td>
                <span
                  class="totalRollingWin"
                  v-if="TotalAmount < TotalRolling"
                  >{{ TotalRolling | toCurrency }}</span
                >
                <span
                  class="totalRollingLoss"
                  v-if="TotalAmount > TotalRolling"
                  >{{ TotalRolling | toCurrency }}</span
                >
              </td>
              <td colspan="1"></td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <v-layout row class="justify-center">
      <v-flex md10 lg10>
        <div class="text-right my-3 my-pagination" v-if="betHistory.length > 4">
          <v-pagination
            v-model="pagination.page"
            color="#1db42f"
            :length="Math.ceil(betHistory.length / rowPageCount)"
          ></v-pagination>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import date from "date-and-time";
import utils from "~/mixin/utils";
import moment from "moment";

export default {
  props: ["userBetHistory", "search", "curreny", "userBetHistoryOld"],
  data() {
    return {
      rowPageCount: 10,
      pagination: {
        page: 1
      }
    };
  },
  filters: {
    //To filter the currency signs in footer.
    toCurrency(value) {
      if (typeof value !== "number") {
        return value;
      }
      var formatter = new Intl.NumberFormat("USD", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0
      });
      return formatter.format(value);
    },
    //To filter the default date format of bet data.
    toStringDate(value) {
      if (value) {
        const now = date.format(new Date(), "YYYY-MM-DD");
        if (value == now) {
          return window.$nuxt.$root.$t("betHistory.today");
        } else {
          return moment(String(value)).format("DD MMM YYYY");
        }
      }
    }
  },
  methods: {
    clicked(betUUID) {
      // $(".extraInfo").hide();
      $("#" + betUUID).toggle();
    }
  },
  // Call Helper
  mixins: [utils],
  computed: {
    //Filter Bet Details Content
    betHistory() {
      return this.userBetHistory.filter(data => {
        return data;
      });
    },

    TotalAmount() {
      let total = null;
      this.userBetHistoryOld.map(item => {
        total += item.betAmount;
      });
      return total;
    },
    TotalRolling() {
      let totalRolling = null;     
      this.userBetHistoryOld.map(item => {
        totalRolling += item.rollingAmount - item.betAmount;
      });
      return totalRolling;
    }
  }
};
</script>
<style scoped>
.totalRollingWin {
  font-weight: 600;
  color: green;
}
.totalRollingLoss {
  font-weight: 600;
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
  margin: 0 auto;
  width: 150px;
  border-radius: 15px;
  padding: 4px 10px;
  color: #333333;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  background-color: #fec623;
}
.following {
  margin: 0 auto;
  width: 150px;
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
  font-size: 14px;
  font-weight: 600;
}
.gameDraw {
  border: 1.5px solid #3a79ff;
  border-radius: 8px;
  padding: 4px 20px;
  font-size: 14px;
  font-weight: 600;
}
.winAmount {
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  font-weight: 600;
}
.lossAmount {
  font-size: 14px;
  color: #333;
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
  font-size: 14px;
  padding: 0px 6px;
  border-radius: 4px;
  margin: 0px 5px;
}
.gameId {
  float: left;
  width: 100%;
}
.ecgColor {
  font-size: 14px;
  font-weight: 400;
  color: #0a4675;
}
.tdborder {
  border: none;
}
</style>
