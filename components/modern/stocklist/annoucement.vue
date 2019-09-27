<template>
  <div>
    <v-flex xs12>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">title</th>
            <th scope="col">preview</th>
            <th scope="col">date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 10" :key="n">
            <td>new stock name</td>
            <td>vfjlskdfjalsjflksdafjsadljflds</td>
            <td>22/02/19</td>
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