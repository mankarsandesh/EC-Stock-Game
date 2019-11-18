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
        <v-select hide-details :items="items" label="Sort By :" solo></v-select>
      </v-flex>
      <v-flex xs12>
        <v-card class="mx-auto">
          <Online-Chart></Online-Chart>
        </v-card>
      </v-flex>
      <v-card>
        <v-card-text>player id : z05qd0001</v-card-text>
        <v-card-text>online time : 3hr 14mins</v-card-text>
        <v-card-text>total online : 1days 12hr 37mins</v-card-text>
      </v-card>
    </v-layout>
  </div>
</template>
<script>
import OnlineChart from "./onlinechart";
export default {
  components: {
    OnlineChart
  },
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