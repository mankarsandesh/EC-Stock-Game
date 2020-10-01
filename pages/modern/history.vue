<template>
  <div>
    <v-layout class="filter-history" align-center justify-center>
      <v-flex xs12 sm12 md5 lg5 pt-3 pl-2>
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md5 xs6> 
            <v-menu
              v-model="from"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="200px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  hide-details
                  v-model="dateFrom"
                  :label="$t('msg.from')"
                    append-icon="fa-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                color="#1db42f"
                :max="maxDate"
                v-model="dateFrom"
                @input="from = false"
                :locale="lang"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm12 md5 xs6 ml-2>
            <v-menu
              v-model="to"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  hide-details
                  v-model="dateTo"
                  :label="$t('msg.to')"
                  append-icon="fa-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                color="#1db42f"
                :max="maxDate"
                v-model="dateTo"
                @input="to = false"
                :locale="lang"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs12 sm12 md2 ml-2 text-center>
            <v-btn class="goButton" @click="searchBetHistory()" small>
              <i v-if="loadingImage" class="fa fa-circle-o-notch fa-spin"></i>
              &nbsp;{{ $t("msg.go") }}
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <bethistory
      :search="search"
      :userBetHistory="userBetHistory"
      @userLimit="loadMoreData"
      :curreny="getUserCurrency"
    />
  </div>
</template>

<script>
import bethistory from "~/components/mobile/bethistory";
import breadcrumbs from "~/components/breadcrumbs";
import { mapState, mapGetters, mapActions } from "vuex";
import config from "~/config/config.global";
import secureStorage from "../../plugins/secure-storage";

export default {
  layout: "default",
  components: {
    breadcrumbs,
    bethistory
  },
  data() {
    return {
      betDataLimit: 10,
       maxDate: new Date().toISOString(),
      today: new Date(),
      sortby: "",
      search: "",
      loadingImage: false,
      dateFrom: "",
      from: false,
      dateTo: "",
      to: false,
      dropdown_font: [
        this.$root.$t("betHistory.today"),
        this.$root.$t("betHistory.thisWeek"),
        this.$root.$t("betHistory.thisMonth")
      ],
      userBetHistory: []
    };
  },
  computed: {
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
    }), //get 2 data from vuex first, in the computed
    // Fet User Currency
    ...mapGetters(["getUserCurrency","getLocale"]),
    lang() {
      if(this.getLocale == "us"){
        return "en-US"
      } else if(this.getLocale == "th") {
        return "th-TH"
      } else if(this.getLocale == "cn") {
        return "zh-CN"
      } else {
        return "la"
      }
    }
  },
  mounted() {
    const lastWeek = new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      this.today.getDate() - 7
    )
      .toISOString()
      .substr(0, 10);
    this.dateFrom = lastWeek;
    this.dateTo = this.today.toISOString().substring(0, 10);
    this.fetchBetHsitory();
  },
  methods: {
    loadMoreData() {
      this.betDataLimit += 10;
      this.fetchBetHsitory();
    },
    // Date Wise Bet History  
    searchBetHistory() {
      this.loadingImage = true;
      if (this.dateFrom && this.dateTo) {
        this.fetchBetHsitory();
      }
    },
    async fetchBetHsitory() {
      try {
        var reqBody = {
          portalProviderUUID: this.portalProviderUUID,
          userUUID: this.userUUID,
          version: config.version,
          betResult: [0, 1],
          dateRangeFrom: this.dateFrom,
          dateRangeTo: this.dateTo,
          limit: this.betDataLimit
        };
        var { data } = await this.$axios.post(config.getAllBets.url, reqBody, {
          headers: config.header
        });
        if (data.code == 200) {
          this.userBetHistory = data.data.reverse();
          this.loadingImage = false;
        } else if (data.code == 202) {
          this.$swal({
            type: "error",
            title: this.$root.$t("popupMsg.sessionExpired"),
            confirmButtonText: this.$root.$t("popupMsg.okLogout"),
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then(result => {
            if (result.value) {
              const URL = secureStorage.getItem("referrerURL");
              secureStorage.removeItem("USER_UUID");
              secureStorage.removeItem("PORTAL_PROVIDERUUID");
              secureStorage.removeItem("userSessionID");
              location.href = URL;
            }
          });
        } else {
          throw new Error(data.message);
          this.loadingImage = false;
        }
      } catch (ex) {
        console.log(ex);
        this.$swal({
          title: ex.message,
          type: "error",
          timer: 2000
        });
        this.loadingImage = false;
      }
    }
  }
};
</script>

<style scoped>
.filter {
  background-color: #fff;
  padding: 25px;
}
.input-text {
  border-radius: 5px;
  height: 44px;
  border: 1px solid;
}
.lose {
  border-radius: 15px;
  padding: 4px 10px;
  color: #fff;
  font-size: 13px;
  text-transform: uppercase;
  background-color: #e05858;
}
.win {
  border-radius: 15px;
  padding: 4px 16px;
  color: #fff;
  font-size: 13px;
  text-transform: uppercase;
  background-color: #2bb13b;
}
.pending {
  border-radius: 15px;
  padding: 4px 16px;
  color: #333;
  font-size: 13px;
  text-transform: uppercase;
  background-color: #fec623;
}

label,
.v-select__selection,
.text-white {
  color: white !important;
}

.toolbar-bg {
  background-color: rgb(22, 83, 136);
}

.toolbar-text {
  background-color: white;
  color: black;
  border-bottom: outset;
}

.v-window__container .v-window-item .layout .flex .v-input {
  margin: 0px;
}

.v-window__container
  .v-window-item
  .layout
  .flex
  .v-input
  .v-input__control
  .bg-colors {
  background-color: #9b2121 !important;
  border-radius: 2px;
}

.v-window__container
  .v-window-item
  .layout
  .flex
  .v-input
  .v-input__control
  .v-input__slot
  .v-text-field__slot
  input {
  color: #fff !important;
  font-size: 1.2rem;
  padding: 11px;
}

.goButtonSmall {
  width: 100px;
}
.betDraw {
  color: #545353;
  font-size: 16px;
  font-weight: 600;
}
.gameDraw {
  border: 1.5px solid #3a79ff;
  border-radius: 8px;
  padding: 4px 20px;
  font-size: 16px;
  font-weight: 600;
}
.winAmount {
  border: 1.5px solid #0eb03e;
  border-radius: 8px;
  padding: 4px 20px;
  font-size: 16px;
  color: #0eb03e;
  font-weight: 600;
}
.lossAmount {
  border: 1.5px solid #fc0020;
  border-radius: 8px;
  padding: 4px 12px;
  font-size: 16px;
  color: #fc0020;
  font-weight: 600;
}
.allDigit {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  text-transform: uppercase;
}
.allDigit span {
  border: 1px solid #a4a4a4;
  color: red;
  font-size: 16px;
  padding: 0px 6px;
  border-radius: 4px;
  margin: 0px 5px;
}
.goButton {
  background-color: #1db42f;
  color: #fff !important;
  font-size: 14px;
  border-radius: 8px;
  height: 30px;
  background: rgba(10, 177, 118, 1);
  background: -moz-linear-gradient(
    left,
    rgba(10, 177, 118, 1) 0%,
    rgba(14, 177, 30, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    right top,
    color-stop(0%, rgba(10, 177, 118, 1)),
    color-stop(100%, rgba(14, 177, 30, 1))
  );
  -webkit-box-shadow: 17px -5px 133px 6px rgba(186, 186, 186, 0.64);
  -moz-box-shadow: 17px -5px 133px 6px rgba(186, 186, 186, 0.64);
  box-shadow: 17px -5px 133px 6px rgba(186, 186, 186, 0.64);
  background: -webkit-linear-gradient(
    left,
    rgba(10, 177, 118, 1) 0%,
    rgba(14, 177, 30, 1) 100%
  );
  background: -o-linear-gradient(
    left,
    rgba(10, 177, 118, 1) 0%,
    rgba(14, 177, 30, 1) 100%
  );
  background: -ms-linear-gradient(
    left,
    rgba(10, 177, 118, 1) 0%,
    rgba(14, 177, 30, 1) 100%
  );
  background: linear-gradient(
    to right,
    rgba(10, 177, 118, 1) 0%,
    rgba(14, 177, 30, 1) 100%
  );
  filter: progid: DXImageTransform.Microsoft.gradient(startColorstr='#0ab176', endColorstr='#0eb11e', GradientType=1);
}
</style>
