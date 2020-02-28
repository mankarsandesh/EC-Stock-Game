<template>
  <v-layout row class="justify-center">
    <v-flex xs12 md12>
      <v-data-table
        :headers="head"
        :items="desserts"
       :items-per-page="5"
        ref="table"
        :search="search"
     
      >
        <template v-slot:items="item">
          <td>{{item.item.UUID}}</td>
          <td>{{item.item.betID}}</td>
          <td>{{item.item.ruleName}}</td>
          <td>{{item.item.betAmount}}</td>
          <td>{{item.item.rollingAmount}}</td>
          <td>{{item.item.payout}}</td>
          <td v-if="item.item.betResult == 'win'">
            <v-chip color="green" text-color="white">{{item.item.betResult}}</v-chip>
          </td>
          <td v-if="item.item.betResult == 'lose'">
            <v-chip color="red" text-color="white">{{item.item.betResult}}</v-chip>
          </td>
          <td v-if="item.item.betResult == 'pending'">
            <v-chip color="grey " text-color="white">{{item.item.betResult}}...</v-chip>
          </td>
          <td>{{item.item.createdDate}}</td>
          <td>{{item.item.createdTime}}</td>
          <td>{{item.item.gameID}}</td>
          <td>{{item.item.gamePID}}</td>
          <td>{{item.item.stockName}}</td>
          <td>{{item.item.gameStartDate}}</td>
          <td>{{item.item.gameStartTime}}</td>
          <td>{{item.item.gameStatus}}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["head", "desserts"],
  data:() => ({
       search: '',
  })
};
</script>