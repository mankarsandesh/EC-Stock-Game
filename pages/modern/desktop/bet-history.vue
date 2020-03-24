<template>
  <div>
    <breadcrumbs
      title="Bet History"
      linkItem="current-bet"
      titlebtn="current-bet"
    />
    <section class="filter">
      <v-container>
        <v-layout class="filter-history">
          <v-flex xs12 sm12 md6>
            <v-layout>
              <v-flex xs12 sm12 md5>
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
                    <v-text-field
                      hide-details
                      v-model="dateFrom"
                      label="From"
                      append-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    color="#1db42f"
                    v-model="dateFrom"
                    @input="from = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm12 md5>
                <v-menu
                  v-model="to"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      hide-details
                      v-model="dateTo"
                      label="To"
                      append-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    color="#1db42f"
                    v-model="dateTo"
                    @input="to = false"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm12 md2>
                <v-btn class="goButton" @click="searchBetHistory()"> <i v-if="loadingImage" class="fa fa-circle-o-notch fa-spin"></i>&nbsp;Go</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm12 md6>
            <v-layout>
              <v-flex xs6>                
                 <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  placeholder="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-select
                  hide-details
                  :items="dropdown_font"
                  placeholder="Sort By"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <!-- <fillterHistory /> -->
    <bethistory :head="head" :search="search" :userBetHistory="userBetHistory" />
  </div>
</template>

<script>
import bethistory from "~/components/modern/betHistory";
import breadcrumbs from "~/components/breadcrumbs";
import fillterHistory from "~/components/modern/fillterHistory";
import { mapState } from "vuex";
import config from "../../../config/config.global";
export default {
  layout: "desktopModern",
  components: {
    breadcrumbs,
    fillterHistory,
    bethistory
  },
  data() {
    return {
      search : "",
      loadingImage : false,
      dateFrom: "",
      from: false,
      dateTo: "",
      to: false,
      dropdown_font: ["day", "Week", "year"],
      head: [
        {
          text: "bet ID",
          value: "betID",
          sortable: true,
          value: "createdTime"
        },
        { text: "game ID", value: "gameID" },
        { text: "bet detail", value: "ruleName" },
        { text: "time", value: "createdTime" },
        { text: "amount", value: "betAmount" },
        { text: "payout", value: "payout" },
        { text: "bet status", value: "gameStatus" }
      ],
      userBetHistory: []
    };
  },
  computed: {
    ...mapState(["portalProviderUUID", "userUUID"]) //get 2 data from vuex first, in the computed
  },
  mounted() {
    const today = new Date();
    const lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    )
      .toISOString()
      .substr(0, 10);
    this.dateFrom = lastWeek;
    this.dateTo = today.toISOString().substring(0, 10);
    this.fetch();
  },
  methods: {
    searchBetHistory() {
      this.loadingImage = true;
      if (this.dateFrom && this.dateTo) {
        this.fetch();        
      } 
      
    },
    async fetch() {
      const userData = {
        portalProviderUUID: this.portalProviderUUID, // get the portal provider uuid from computed that we call from vuex
        userUUID: this.userUUID, // get the userUUID with the this object
        version: config.version, // version of API
        betResult: [0, 1], // -1= pending, 0= lose , 1 = win
        limit: "50", 
        offset: "0", // offset or skip the data,
        dateRangeFrom: this.dateFrom,
        dateRangeTo: this.dateTo
      };
      const { data } = await this.$axios.post(
        config.getAllBets.url, // after finish crawl the every API will the the baseURL from AXIOS
        userData, // data object
        {
          headers: config.header
        }
      );
      this.userBetHistory = data.data;
       this.loadingImage = false;
    }
  }
};
</script>

<style scoped>
.filter{
  padding: 10px;
}
.goButton{ 
  background-color: #1db42f;
  color: #fff !important;
  font-size: 16px;
  border-radius: 8px;
  height: 40px;
  background: rgba(10, 177, 118, 1);
  background: -moz-linear-gradient(left, rgba(10, 177, 118, 1) 0%, rgba(14, 177, 30, 1) 100%);
  background: -webkit-gradient(left top, right top, color-stop(0%, rgba(10, 177, 118, 1)), color-stop(100%, rgba(14, 177, 30, 1)));
  -webkit-box-shadow: 17px -5px 133px 6px rgba(186, 186, 186, 0.64);
  -moz-box-shadow: 17px -5px 133px 6px rgba(186, 186, 186, 0.64);
  box-shadow: 17px -5px 133px 6px rgba(186, 186, 186, 0.64);
  background: -webkit-linear-gradient(left, rgba(10, 177, 118, 1) 0%, rgba(14, 177, 30, 1) 100%);
  background: -o-linear-gradient(left, rgba(10, 177, 118, 1) 0%, rgba(14, 177, 30, 1) 100%);
  background: -ms-linear-gradient(left, rgba(10, 177, 118, 1) 0%, rgba(14, 177, 30, 1) 100%);
  background: linear-gradient(to right, rgba(10, 177, 118, 1) 0%, rgba(14, 177, 30, 1) 100%);
  filter: progid: DXImageTransform.Microsoft.gradient(startColorstr='#0ab176', endColorstr='#0eb11e', GradientType=1);

}
</style>
