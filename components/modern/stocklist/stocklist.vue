<template>
  <div>
    <v-layout row wrap justify-end>
      <v-flex xs2 class="main-select">
        <v-select hide-details :items="items" label="Sort By :" solo></v-select>
      </v-flex>
      <v-btn class="main-btn back mt-3">Go</v-btn>
    </v-layout>

    <v-flex xs12>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">stock name</th>
            <th scope="col">live price</th>
            <th scope="col">reference</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 10" :key="n">
            <td>stockname aaabb</td>
            <td>90.00</td>
            <td>www.facebook.com/tnk</td>
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
      items: ["day", "weeks", "months", "years"]
    };
  }
};
</script>