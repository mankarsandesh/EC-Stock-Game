<template>
  <div>
    <v-layout>
      <v-flex pa-2 class="headerStockBar">{{ $t("msg.stockResult") }}</v-flex>
    </v-layout>
    <v-layout>
      <!-- bet result -->
      <v-flex xs12>
        <div class="table-responsive">
          <!-- <h3 class="title" v-show="getStockResult.code == 500">There are no Data</h3> -->
          <table class="table">
            <tr>
              <th>{{ $t("msg.Stock Name") }}</th>
              <th>{{ $t("msg.Time") }}</th>
              <th>{{ $t("msg.Result") }}</th>
            </tr>
            <tr v-for="(data, index) in getStockResult" :key="index"  v-show="getStockResult.length > 0">
              <td>
                <nuxt-link :to="'/modern/desktop/' + data.stockName"
                  >{{ $t(`stockname.${data.stockName}`) }}
                </nuxt-link>
              </td>
              <td class="text-xs-center">{{ data.stockTimestamp }}</td>
              <td class="text-xs-center">{{ data.stockValue }}</td>
            </tr>
          </table>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import config from "../../config/config.global";
export default {
  data() {
    return {
      selected: 1,
      getStockResult: []
    };
  },
  computed: {
    ...mapState(["portalProviderUUID", "headers", "userUUID"]) //get 2 data from vuex first, in the computed
  },
  mounted() {
    this.stockResult();
  },

  methods: {
    onlyTime(value) {
      let d = value.split(" ");
      return d[1];
    },
    async stockResult() {
      const dataSend = {
        portalProviderUUID: this.portalProviderUUID, // get the portal provider uuid from computed that we call from vuex
        version: config.version // version of API
      };
      const { data } = await this.$axios.post(
        "http://uattesting.equitycapitalgaming.com/webApi/getAllStock", // after finish crawl the every API will the the baseURL from AXIOS
        dataSend, // data object
        {
          headers: config.header
        }
      );
      console.log(data);
      console.log("Stock Resdult");
      this.getStockResult = data.data;
    }
  }
};
</script>
<style scoped>
.betTab {
  border-top: 1px solid #dddddd;
}
.activeTab {
  background-color: #0b2a68;
  color: #fff;
}
table {
  border-collapse: collapse;
  width: 100%;
  border-right: #ddd;
}
td a {
  color: #003e70 !important;
}
th {
  background-color: #cccccc;
}
th {
  text-transform: capitalize;
  padding: 5px;
}
td {
  font-weight: 400;
  text-align: center;
  padding: 5px;
  border: 1px solid #ddd;
}
.flex-cursor {
  cursor: pointer;
  height: 100%;
  width: 100%;
}
.table-responsive {
  overflow: hidden;
}
</style>
