<template>
  <v-layout row class="justify-center" mt-2>
    <v-flex xs12 md12>
      <v-data-table
        :items="currentBets"
        :items-per-page="5"
        ref="table"
        :search="search"
        class="current-bet"
      >
        <template v-slot:headers="headers">
          <tr>
            <th scope="col">{{$t('msg.BetId')}}</th>
            <th scope="col">{{$t('msg.gameid')}}</th>
            <th scope="col">{{$t('msg.Betdetail')}}</th>
            <th scope="col">{{$t('msg.Time')}}</th>
            <th scope="col">{{$t('msg.amount')}}</th>
            <th scope="col">{{$t('msg.payout')}}</th>
            <th scope="col">{{$t('msg.Bet Status')}}</th>
          </tr>
        </template>
        <template v-slot:items="item">
          <td>{{ item.item.betUUID }}</td>
          <td>{{ item.item.gameUUID }}</td>
          <td>
            {{ item.item.ruleName }} - ({{ item.item.payout }})
            {{ item.item.stockName }} / {{ item.item.loop }}
          </td>
          <td>{{ item.item.createdDate }} {{ item.item.createdTime }}</td>
          <td>{{ item.item.betAmount | toCurrency }}</td>
          <td>{{ item.item.payout }}</td>
          <td v-if="item.item.betResult == 'win'">
            <v-chip
              color="green"
              text-color="white"
              class="text-uppercase betresult"
            >{{ $t('msg.win') }}</v-chip>
          </td>
          <td v-if="item.item.betResult == 'lose'">
            <v-chip
              color="red"
              text-color="white"
              class="text-uppercase betresult"
            >{{ $t('msg.lose') }}</v-chip>
          </td>
          <td v-if="item.item.betResult == 'pending'">
            <v-chip
              color="yellow "
              text-color="black"
              class="text-uppercase betresult"
            >{{ $t('msg.pending') }}...</v-chip>
          </td>
        </template>
        <template slot="footer">
          <tr>
            <td>{{ $t("msg.Total") }}</td>
            <td colspan="3">{{ currentBets.length }} {{$t('leaderboard.bets')}}</td>
            <td>
              <strong>{{ TotalAmount | toCurrency }}</strong>
            </td>
            <td colspan="2"></td>
          </tr>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["currentBets"],
  data: () => ({
    search: ""
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
  computed: {
    TotalAmount() {
      let total = null;
      this.currentBets.map(item => {
        total += item.betAmount;
      });
      return total;
    }
  }
};
</script>
<style>
.betresult {
  width: auto;
}
</style>
