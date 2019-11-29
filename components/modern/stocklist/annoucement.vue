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
           <tr v-for="(item,index) in getAnnoucement" :key="index">
              <td>{{item.title}}</td>
              <td>{{item.messageContent}}</td>
              <td>{{item.created_at}}</td>
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
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      items: ["day", "weeks", "months", "years"]
    };
  },
  mounted() {
    this.asyannoucement();
  },
  methods: {
    ...mapActions(["asyannoucement"])
  },
  computed: {
    ...mapGetters(["getAnnoucement"])
  }
};
</script>