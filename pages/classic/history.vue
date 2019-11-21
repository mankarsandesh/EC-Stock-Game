<template>
<v-tabs-items>
    <v-tab-item>
        <v-card flat>
            <v-expansion-panel v-model="panel" expand>
                <v-expansion-panel-content class="bg-color">
                    <template v-slot:header>
                        <div>{{$t('menu.history')}}</div>
                    </template>
                    <v-card flat>
                        <v-layout row wrap>
                            <v-flex xs5 md2>
                                <v-menu v-model="from" :close-on-content-click="false" :nudge-right="0" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="datefrom" prepend-icon="event" readonly v-on="on" single-line hide-details></v-text-field>
                                    </template>
                                    <v-date-picker v-model="datefrom" @input="from = false"></v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-flex xs5 md2>
                                <v-menu v-model="to" :close-on-content-click="false" :nudge-right="0" transition="scale-transition" offset-y full-width min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="dateto" prepend-icon="event" readonly v-on="on" single-line hide-details></v-text-field>
                                    </template>
                                    <v-date-picker v-model="dateto" @input="to = false"></v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-flex xs3 md1>
                                <v-btn @click="dateSearch()" single-line hide-details>go</v-btn>
                            </v-flex>
                            <v-flex xs3 md1 mr-1>
                                <v-select hide-details :items="itemspage" v-model="itemspages"></v-select>
                            </v-flex>
                            <v-flex xs3 md3 mr-1>
                                <v-text-field v-model="search" append-icon="search" single-line hide-details></v-text-field>
                            </v-flex>
                            <v-flex xs6 md2 mr-1>
                                <v-select hide-details single-line :items="items" label="Sort By :" v-model="itemss"></v-select>
                            </v-flex>
                        </v-layout>
                        <v-progress-linear :indeterminate="true" color="blue darken-3" v-show="!load"></v-progress-linear>

                        <v-data-table :headers="headers" hide-actions :search="search" :items="history" :pagination.sync="pagination" ref="table" class="elevation-1">
                            <template v-slot:items="props">
                                <td>{{props.item.betId}}</td>
                                <td>{{props.item.gameId}}</td>
                                <td>
                                    {{props.item.rule.split("-")[1] >= 0 ? $t('gamemsg.'+props.item.rule.split("-")[0])+' - '+props.item.rule.split("-")[1]: $t('gamemsg.'+props.item.rule.split("-")[0])+' - '+$t('gamemsg.'+props.item.rule.split("-")[1])}}
                                    ({{props.item.payoutAmount}})
                                    <span v-for="(datas,index) in StockName" :key="index" v-if="props.item.stock == datas.stockId">
                                        {{$t('stockname.'+datas.stockName)}}
                                    </span>
                                    {{props.item.loops}} {{$t('msg.minute')}}
                                </td>
                                <td>{{props.item.betTime}}</td>
                                <td>{{props.item.betAmount}}</td>
                                <td><span :style="props.item.rollingAmount < 0 ? 'color: red;':'color: green;'">{{props.item.rollingAmount}}</span></td>

                            </template>
                            <template slot="footer">
                                <tr>
                                    <td>{{$t('msg.Total This Page')}}</td>
                                    <td colspan="3">
                                        <span class="text-xs-right" v-for="(column, key) in headers" :key="key">
                                            <span v-if="column.page">{{ total1(column) }}</span>
                                        </span></td>
                                    <td>
                                        <span class="text-xs-right" v-for="(column, key) in headers" :key="key">
                                            <strong v-if="column.total">{{ formatToPrice(total1(column)) }}</strong>
                                        </span></td>
                                    <td>
                                        <span class="text-xs-right" v-for="(column, key) in headers" :key="key">
                                            <strong v-if="column.totals" :style="total1(column) < 0 ? 'color: red;':''">{{ formatToPrice(total1(column)) }}</strong>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{{$t('msg.Total')}}</td>
                                    <td colspan="3">{{pagination.totalItems}}</td>
                                    <td><strong>{{formatToPrice(sumTotalbetAmount)}}</strong></td>
                                    <td><strong :style="sumTotalrollingAmount < 0 ? 'color: red;':''">{{formatToPrice(sumTotalrollingAmount)}}</strong></td>
                                </tr>

                            </template>
                        </v-data-table>
                        <div class="text-xs-center pt-2" v-if="pages != 0 ">
                            <v-pagination v-model="pagination.page" :length="pages" color="blue"></v-pagination>
                        </div>

                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-card>
    </v-tab-item>
</v-tabs-items>
</template>

<script>
export default {
    layout: "classic",
    data() {
        return {
            panel: [true],
            dateto: new Date().toISOString().substr(0, 10),
            datefrom: new Date().toISOString().substr(0, 10),
            from: false,
            to: false,
            items: ["day", "weeks", "months", "years"],
            itemss: 'day',
            itemspage: [5, 10, 25, 50, 100],
            itemspages: 10,
            load: false,
            history: [],
            StockName: null,
            stockId: null,
            sumTotalbetAmount: 0,
            sumTotalrollingAmount: 0,
            page: 1,
            search: "",
            pagination: {
                sortBy: 'day'
            },
            selected: [],
            headers: [{
                    text: this.$root.$t('msg.BetId'),
                    align: "center",
                    sortable: false,
                    value: "betId",
                    total: false,
                },
                {
                    text: this.$root.$t('msg.gameid'),
                    sortable: false,
                    align: "center",
                    value: "gameId",
                    total: false,
                },
                {
                    text: this.$root.$t('msg.Betdetail'),
                    sortable: false,
                    align: "center",
                    value: "page",
                    page: true,
                },
                {
                    text: this.$root.$t('msg.Time'),
                    sortable: false,
                    align: "center",
                    value: "betTime",
                    total: false,
                },
                {
                    text: this.$root.$t('msg.amount'),
                    sortable: false,
                    align: "center",
                    value: "betAmount",
                    total: true,
                },
                {
                    text: this.$root.$t('msg.payout'),
                    sortable: false,
                    align: "center",
                    value: "rollingAmount",
                    totals: true,
                }
            ],

        };
    },
    mounted() {
        this.gethistory(null)
        this.getSotckId()
        this.pagination.rowsPerPage = 10
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

            if (val == 'day') {
                datefrom = yf + '-' + mf + '-' + d
            } else if (val == 'weeks') {
                datefrom = yf + '-' + mf + '-' + d
            } else if (val == 'months') {
                datefrom = yf + '-' + ml + '-' + d
            } else {
                datefrom = yl + '-' + mf + '-' + d
            }

            let dates = {
                start: this.dateto,
                end: datefrom,
                week: w
            }
            console.log(dates)
            return this.gethistory(dates)
        },
        itemspages(val) {
            this.pagination.rowsPerPage = val
        }
    },
    computed: {
        pages() {
            if (this.pagination.totalItems == null || this.pagination.rowsPerPage == null) return 0
            return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        }
    },
    methods: {
        total1(column) {
            const table = this.$refs.table
            //console.log('table',table);
            return table ? table.filteredItems.reduce((s, i) => {
                return s + parseFloat(i[column.value], 10)
            }, 0) : 0
        },
        dateSearch() {
            let date = {
                start: this.datefrom,
                end: this.dateto,
                week: ''
            }
            console.log(date)
            return this.gethistory(date)
        },
        async gethistory(val) {
            let history = await this.$axios.$get('/api/fetchHistoryBet?apikey=' + this.$store.state.auth_token)
            if (history.data == null) return
            // console.log(history.data)

            this.load = true;

            for (let i = 0; i < history.data.length; i++) {
                // console.log(history.data[i].betTime)
                // console.log(i)
                if (val != null) {
                    this.history = []
                    this.sumTotalbetAmount = 0
                    this.sumTotalrollingAmount = 0
                    this.pagination.totalItems = 0
                    if (history.data[i].betTime.split(" ")[0] == val.start || history.data[i].betTime.split(" ")[0] == val.end || new Date(history.data[i].betTime).getDay() == val.week) {
                        setTimeout(() => {
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
                            this.sumTotalbetAmount += history.data[i].betAmount
                            this.sumTotalrollingAmount += history.data[i].rollingAmount
                        }, 100)
                    } else if (history.data[i].betTime.split(" ")[0] !== val.start && history.data[i].betTime.split(" ")[0] !== val.end) {
                        this.history = []
                    }
                } else {
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
                    this.sumTotalbetAmount += history.data[i].betAmount
                    this.sumTotalrollingAmount += history.data[i].rollingAmount
                }
            }
            // return this.history = history.data
        },
        formatToPrice(value) {
            return `$ ${Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
        },
        async getSotckId() {
            let stcokId = await this.$axios.$get('/api/fetchStockOnly?apikey=' + this.$store.state.auth_token)
            return this.StockName = stcokId.data

        },
    }
}
</script>

<style scoped>
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
    color: #000000 !important;
    font-size: 1.2rem;
    padding: 11px;
}
</style>
