<template>
  <v-layout row class="justify-center">
    <v-flex xs12 md12>
      <v-data-table
        :headers="head"
        :items="desserts"
        :items-per-page="5"
        ref="table"
        :search="search"
        class="current-bet"
      >
        <template v-slot:items="item">
          <td>{{item.item.betID}}</td>
          <td>{{item.item.gameID}}</td>
          <td>{{item.item.ruleName}} - ({{item.item.payout}}) {{item.item.stockName}} / {{item.item.loop}}</td>
          <td>{{item.item.createdTime}}</td>
          <td>{{item.item.betAmount | toCurrency}}</td>
          <td>{{item.item.payout}}</td>
          <td v-if="item.item.betResult == 'win'">
            <v-chip color="green" text-color="white">{{item.item.betResult}}</v-chip>
          </td>
          <td v-if="item.item.betResult == 'lose'">
            <v-chip color="red" text-color="white">{{item.item.betResult}}</v-chip>
          </td>
          <td v-if="item.item.betResult == 'pending'">
            <v-chip color="yellow " text-color="black">{{item.item.betResult}}...</v-chip>
          </td>
        </template>
        <template slot="footer">
          <tr>
            <td>{{$t('msg.Total')}}</td>
            <td colspan="3">{{desserts.length}} bets</td>
            <td>
              <strong>{{TotalAmount | toCurrency}}</strong>
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
  props: ["head", "desserts"],
  data: () => ({
    search: ""
  }),
  filters: {
    toCurrency(value) {  // format the value to the curreny 
      if (typeof value !== "number") { // defind the value is number not string 
        return value;  // after the value is not a number  we return value out
      }
      var formatter = new Intl.NumberFormat("en-US", {  // if the value is number 
        style: "currency",  // you also can change the curreny to other curreny that you like 
        currency: "USD",  // in this case we choose the USD 
        minimumFractionDigits: 0 // minumum the value is not equal than 0
      });
      return formatter.format(value); // after get the currency that you prefer, than we return out with value
    }
  },
  computed: {
    TotalAmount() {  // make the new value to make the frontend get this value from the computed 
      let total = null;  // create the new varible before return  
      this.desserts.map(item => {  // before loading component the computed we defind the value from props
        total += item.betAmount;  // after get the value from props, you have the plus the value with the value with lenght
      });
      return total;  // after get the value, return the value out.
    }
  }
};
</script>



