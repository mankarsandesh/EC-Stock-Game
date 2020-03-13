<template>
<div>
    <meta name="viewport" content= "width=device-width, user-scalable=no">
    <!-- <v-toolbar class="light-toobar">
      <h1 class="text-primary text-uppercase">{{ $t('menu.history') }}</h1>
      <v-spacer></v-spacer>

      <v-btn icon @click="$router.go(-1)">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-toolbar> -->
    <v-layout row wrap id="history">

        <v-flex xs5 sm2 md2 lg2 mr-1 style="float:left;" class="input-text">
            <v-menu v-model="from" :close-on-content-click="false" :nudge-right="0" lazy transition="scale-transition" offset-y full-width min-width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field v-model="datefrom" prepend-icon="event" readonly v-on="on" single-line hide-details></v-text-field>
                </template>
                <v-date-picker v-model="datefrom" @input="from = false"></v-date-picker>
            </v-menu>
        </v-flex>

        <v-flex xs5 sm2 md2 lg2 mr-1 style="float:left;" class="input-text">
            <v-menu v-model="to" :close-on-content-click="false" :nudge-right="0" transition="scale-transition" offset-y full-width min-width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field v-model="dateto" prepend-icon="event" readonly v-on="on" single-line hide-details></v-text-field>
                </template>
                <v-date-picker v-model="dateto" @input="to = false"></v-date-picker>
            </v-menu>
        </v-flex>

        <v-flex xs2 sm1 md1 ml-1 mr-2>
            <button @click="dateSearch()" class="goButton buttonGreen">{{$t('msg.go')}}</button>
        </v-flex>

        <!-- <v-flex xs2 sm2 md2 lg1>
            <v-select label="Limit Total" single-line hide-details :items="itemlimit" v-model="limit" color="#FFF" class="limits text-white"></v-select>
      </v-flex> -->

        <v-flex xs2 sm2 md2 lg1 mr-1 class="input-text">
            <v-select label="Limit Page" single-line hide-details :items="itemspage" v-model="itemspages" color="#FFF" class="selectHistory text-white"></v-select>
        </v-flex>

        <v-flex xs4 sm2 md2 lg2 mr-1 class="input-text">
            <v-text-field single-line hide-details v-model="search" append-icon="search" class="selectHistory text-white" style="padding:4px;"></v-text-field>
        </v-flex>
        <v-flex xs3 sm2 md2 lg2 class="input-text">
            <v-select single-line hide-details :items="items" label="Sort By :" v-model="itemss" class="selectHistory"></v-select>
        </v-flex>
    </v-layout>

    <v-progress-linear :indeterminate="true" color="blue darken-3" v-show="!load"></v-progress-linear>
    <v-data-table
          :headers="head"
          hide-actions
          :items="desserts"
          :pagination.sync="pagination"
          ref="table"
          :search="search"
          class="current-bet"
        >
          <template v-slot:items="item">
            <td>{{item.item.betID}}</td>
            <td>{{item.item.gameID}}</td>
            <td>{{item.item.ruleName}} - ({{item.item.payout}}) {{item.item.stockName}} / {{item.item.loop}}</td>
            <td>{{item.item.createdTime}}</td>
            <td>{{item.item.payout}}</td>
            <td v-if="item.item.betResult == 'win'" class="text-uppercase">
              <v-chip color="green" text-color="white">{{item.item.betResult}}</v-chip>
            </td>
            <td v-if="item.item.betResult == 'lose'">
              <v-chip color="red" text-color="white">{{item.item.betResult}}</v-chip>
            </td>
            <td v-if="item.item.betResult == 'pending'">
              <v-chip color="yellow " text-color="black">{{item.item.betResult}}...</v-chip>
            </td>
            <td>{{item.item.betAmount | toCurrency}}</td>
            <td>{{item.item.rollingAmount}}</td>
          </template>
          <template slot="footer">
            <tr>
              <td>{{$t('msg.Total')}}</td>
              <td colspan="5">{{desserts.length}} bets</td>
              <td>
                <strong>{{TotalAmount | toCurrency}}</strong>
              </td>
              <td>
                <strong>{{TotalRolling | toCurrency}}</strong>
              </td>
            </tr>
          </template>
        </v-data-table>
    <div class="text-xs-center pt-2" v-if="pages != 0 ">
        <v-pagination v-model="pagination.page" :length="pages" color="blue"></v-pagination>
    </div>
</div>
</template>

<script>
export default {
    props: ["head", "desserts"],
    data() {
        return {
            dateto: new Date().toISOString().substr(0, 10),
            datefrom: new Date().toISOString().substr(0, 10),
            from: false,
            to: false,
            items: ["day", "weeks", "months", "years", "all"],
            itemss: "",
            itemspage: [5, 10, 25, 50, 100],
            itemspages: 5,
            load: false,
            history: [],
            StockName: null,
            stockId: null,
            sumTotalbetAmount: 0,
            sumTotalrollingAmount: 0,
            page: 1,
            search: "",
            // pagination: {
            //     sortBy: "day"
            // },
            pagination: {
                page: 1
            },
            itemlimit: [100, 300, 500, "all"],
            limit: "",
            limits: -1,
            selected: [],
            headers: [{
                    text: this.$root.$t("msg.BetId"),
                    align: "center",
                    sortable: false,
                    value: "betId",
                    total: false
                },
                {
                    text: this.$root.$t("msg.gameid"),
                    sortable: false,
                    align: "center",
                    value: "gameId",
                    total: false
                },
                {
                    text: this.$root.$t("msg.Betdetail"),
                    sortable: false,
                    align: "center",
                    value: "page",
                    page: true
                },
                {
                    text: this.$root.$t("msg.Time"),
                    sortable: false,
                    align: "center",
                    value: "betTime",
                    total: false
                },
                {
                    text: this.$root.$t("msg.amount"),
                    sortable: false,
                    align: "center",
                    value: "betAmount",
                    total: true
                },
                {
                    text: this.$root.$t("msg.payout"),
                    sortable: false,
                    align: "center",
                    value: "rollingAmount",
                    totals: true
                }
            ]
        };
    },
    mounted() {
        this.gethistory(null);
        this.getSotckId();
        this.pagination.rowsPerPage = 5;
    },
    watch: {
        itemss(val) {
            // console.log(val)
            let date = new Date();
            let yl = date.getFullYear() - 1;
            let yf = date.getFullYear();
            let ml = date.getMonth();
            let mf = date.getMonth() + 1;
            let w = date.getDay();
            let d = date.getDate();
            let datefrom;

            if (val == "day") {
                datefrom = {
                    start: this.dateto,
                    end: this.dateto
                };
            } else if (val == "weeks") {
                datefrom = {
                    week: this.getWeekNumber(new Date())
                };
            } else if (val == "months") {
                datefrom = {
                    month: mf
                };
            } else if (val == "years") {
                datefrom = {
                    year: yf
                };
            } else if (val == "all") {
                datefrom = "all";
                this.history = [];
                this.sumTotalbetAmount = 0;
                this.sumTotalrollingAmount = 0;
                this.pagination.totalItems = 0;
            }
            // console.log(datefrom)
            return this.gethistory(datefrom);
        },
        itemspages(val) {
            this.pagination.rowsPerPage = val;
        },
        limit(text) {
            if (text == "all") {
                this.limits = -1;
                return this.gethistory(null);
            } else {
                this.limits = text;
                return this.gethistory(null);
            }
        }
    },
    filters: {
        toCurrency(value) {
        // format the value to the curreny
        if (typeof value !== "number") {
            // defind the value is number not string
            return value; // after the value is not a number  we return value out
        }
        var formatter = new Intl.NumberFormat("en-US", {
            // if the value is number
            style: "currency", // you also can change the curreny to other curreny that you like
            currency: "USD", // in this case we choose the USD
            minimumFractionDigits: 0 // minumum the value is not equal than 0
        });
        return formatter.format(value); // after get the currency that you prefer, than we return out with value
        }
    },
    computed: {
        pages() {
            if (
                this.pagination.totalItems == null ||
                this.pagination.rowsPerPage == null
            )
                return 0;
            return Math.ceil(
                this.pagination.totalItems / this.pagination.rowsPerPage
            );
        },
        TotalAmount() {
        // make the new value to make the frontend get this value from the computed
        let total = null; // create the new varible before return
        this.desserts.map(item => {
            // before loading component the computed we defind the value from props
            total += item.betAmount; // after get the value from props, you have the plus the value with the value with lenght
        });
        return total; // after get the value, return the value out.
        },
        TotalRolling() {
        // make the new value to make the frontend get this value from the computed
        let total = null; // create the new varible before return
        this.desserts.map(item => {
            // before loading component the computed we defind the value from props
            total += item.rollingAmount; // after get the value from props, you have the plus the value with the value with lenght
        });
        return total; // after get the value, return the value out.
        }
    },
    methods: {
        setZero(num, digit) {
            var zero = "";
            for (var i = 0; i < digit; i++) {
                zero += "0";
            }
            return (zero + num).slice(-digit);
        },
        getDateArray(start, end) {
            var arr = new Array();
            var dt = new Date(start);
            while (dt <= end) {
                let date = new Date(dt);
                arr.push(
                    date.getFullYear() +
                    "-" +
                    this.setZero(date.getMonth() + 1, 2) +
                    "-" +
                    this.setZero(date.getDate(), 2)
                );
                dt.setDate(dt.getDate() + 1);
            }
            return arr;
        },
        getWeekNumber(d) {
            // Copy date so don't modify original
            d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
            // Set to nearest Thursday: current date + 4 - current day number
            // Make Sunday's day number 7
            d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
            // Get first day of year
            var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            // Calculate full weeks to nearest Thursday
            var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
            // Return array of year and week number
            // return [d.getUTCFullYear(), weekNo];
            return weekNo + "-" + d.getUTCFullYear();
        },

        total1(column) {
            const table = this.$refs.table;
            //console.log('table',table);
            return table ?
                table.filteredItems.reduce((s, i) => {
                    return s + parseFloat(i[column.value], 10);
                }, 0) :
                0;
        },
        dateSearch() {
            let date = {
                start: this.datefrom,
                end: this.dateto
            };
            return this.gethistory(date);
        },

        async gethistory(val) {
            this.history = [];
            this.sumTotalbetAmount = 0;
            this.sumTotalrollingAmount = 0;
            this.pagination.totalItems = 0;
            let history = await this.$axios.$get(
                "/api/fetchHistoryBet?limits=" +
                this.limits +
                "&apikey=" +
                this.$store.state.auth_token
            );
            //    console.log(history)
            if (history.data == null) return;
            // console.log(history.data)
            this.load = true;
            for (let i = 0; i < history.data.length; i++) {
                // console.log(history.data[i].betTime)
                if (val != null && val != "all") {
                    if (
                        this.getDateArray(new Date(val.start), new Date(val.end)).length > 0
                    ) {
                        let getDate = this.getDateArray(
                            new Date(val.start),
                            new Date(val.end)
                        );
                        for (let n = 0; n < getDate.length; n++) {
                            if (history.data[i].betTime.split(" ")[0] == getDate[n]) {
                                setTimeout(() => {
                                    this.sedDataToTable(history, i);
                                });
                            }
                        }
                    } else if (
                        this.getWeekNumber(new Date(history.data[i].betTime)) == val.week ||
                        new Date(history.data[i].betTime).getMonth() + 1 == val.month ||
                        new Date(history.data[i].betTime).getFullYear() == val.year
                    ) {
                        setTimeout(() => {
                            this.sedDataToTable(history, i);
                        });
                    } else {
                        this.history = [];
                    }
                } else {
                    this.sedDataToTable(history, i);
                }
            }
            // return this.history = history.data
        },
        sedDataToTable(history, i) {
            this.history.push({
                page: 1,
                betId: history.data[i].betId,
                gameId: history.data[i].gameId,
                rule: history.data[i].rule,
                payoutAmount: history.data[i].payoutAmount,
                stock: history.data[i].stock,
                loops: history.data[i].loops,
                betTime: history.data[i].betTime,
                betAmount: history.data[i].betAmount,
                rollingAmount: history.data[i].rollingAmount
            });
            this.pagination.totalItems = this.history.length;
            this.sumTotalbetAmount += history.data[i].betAmount;
            this.sumTotalrollingAmount += history.data[i].rollingAmount;
        },
        formatToPrice(value) {
            return `$ ${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
        },
        async getSotckId() {
            let stcokId = await this.$axios.$get(
                "/api/fetchStockOnly?apikey=" + this.$store.state.auth_token
            );
            return (this.StockName = stcokId.data);
        }
    }
};
</script>

<style scoped>
.input-text {
    border-radius: 5px;
    height: 44px;
    border: 1px solid;
}

table thead tr th {
    /* background-color: #003e70; */
    font-size: 1rem;
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

.v-window__container .v-window-item .layout .flex .v-input .v-input__control .bg-colors {
    background-color: #9b2121 !important;
    border-radius: 2px;
}

.v-window__container .v-window-item .layout .flex .v-input .v-input__control .v-input__slot .v-text-field__slot input {
    color: #fff !important;
    font-size: 1.2rem;
    padding: 11px;
}

#history {
    margin-top: 10px;
}

.goButton {
    /* padding: 6px 4px; */
    background-color: #003e70 !important;
    color: #fff;
    height: 100%;
    margin-top: 0px;
    left: -8px;
    width: 100%;
}

.selectHistory {
    /* border:1px solid red !important; */
    /* margin-top: 0px !important; */
    padding: 4px 6px;
    color: #fff !important;
}

.limits {
    /* border:1px solid red !important; */
    margin-top: 8px !important;
    padding: 4px 6px;
    color: #fff !important;
}

.v-text-field .v-label {
    border: 1px solid red !important;
}

.theme--light.v-select .v-select__selections {
    padding: 2px 10px !important;
    color: #fff !important;
}

.theme--light.v-select .v-select__selections {
    color: #fff !important;
}

.v-select__selection--comma {
    color: #fff !important;
}

.border-radius-10 {
    border-radius: 10px;
}
</style>
