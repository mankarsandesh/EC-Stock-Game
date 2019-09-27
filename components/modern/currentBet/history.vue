<template>
  <div>
    <v-layout row wrap>
      <v-flex xs6 md3>
        <v-menu
          v-model="from"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model="datefrom" label="From" prepend-icon="event" readonly v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="datefrom" @input="from = false"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs6 md3>
        <v-menu
          v-model="to"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field v-model="dateto" label="To" prepend-icon="event" readonly v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="dateto" @input="to = false"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-btn class="my-btn go">go</v-btn>
      <v-flex xs6 md3 class="float-right">
        <p class="ma-0">Exclusive</p>
        <v-select hide-details :items="items" label="Sort By :" solo></v-select>
      </v-flex>
    </v-layout>

    <v-flex xs12>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">game id</th>
            <th scope="col">bet id</th>
            <th scope="col">stock name</th>
            <th scope="col">amount</th>
            <th scope="col">status</th>
            <th scope="col">payout</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 10" :key="n">
            <th scope="row">0104239720185520</th>
            <td>1654231567489421321</td>
            <td>stockname aaabb</td>
            <td>$90.00</td>
            <td>pending</td>
            <td>pending</td>
          </tr>
        </tbody>
      </table>
    </v-flex>
    <v-btn class="main-btn back">
      <v-icon>arrow_back_ios</v-icon>back
    </v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dateto: new Date().toISOString().substr(0, 10),
      datefrom: new Date().toISOString().substr(0, 10),
      from: false,
      to: false,
      items: ["day", "weeks", "months", "years"]
    };
  }
};
</script>