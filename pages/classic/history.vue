<template>
<v-tabs-items>
    <v-tab-item>
        <v-card flat>
            <v-expansion-panel v-model="panel" expand>
                <v-expansion-panel-content class="bg-color">
                    <template v-slot:header>
                        <div>{{$t('menu.history')}}</div>
                    </template>
                    <v-card>
                        <v-layout row wrap>
                            <v-flex xs6 md2 pa>
                                <v-menu v-model="from" :close-on-content-click="false" :nudge-right="0" lazy transition="scale-transition" offset-y full-width min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="datefrom" prepend-icon="event" readonly v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="datefrom" @input="from = false"></v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-flex xs6 md2>
                                <v-menu v-model="to" :close-on-content-click="false" :nudge-right="0" transition="scale-transition" offset-y full-width min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field v-model="dateto" prepend-icon="event" readonly v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="dateto" @input="to = false"></v-date-picker>
                                </v-menu>
                            </v-flex>
                            <v-btn class="my-btn go" @click="dateSearch()">go</v-btn>
                            <v-flex xs6 md2 class="float-right">
                                <v-select hide-details :items="items" label="Sort By :" v-model="itemss" solo></v-select>
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
                                            <strong v-if="column.totals" :style="total1(column) < 0 ? 'color: red;':'color: green;'">{{ formatToPrice(total1(column)) }}</strong>
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>{{$t('msg.Total')}}</td>
                                    <td colspan="3">{{colspan}}</td>
                                    <td><strong>{{formatToPrice(sumTotalbetAmount)}}</strong></td>
                                    <td><strong :style="sumTotalrollingAmount < 0 ? 'color: red;':'color: green;'">{{formatToPrice(sumTotalrollingAmount)}}</strong></td>
                                </tr>

                            </template>
                        </v-data-table>
                        <div class="text-xs-center pt-2">
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
            load: false,
            history: [],
            StockName: null,
            stockId: null,
            sumTotalbetAmount: 0,
            colspan: 0,
            sumTotalrollingAmount: 0,
            page: 1,
            search: "",
            pagination: {
                sortBy: 'day'
            },
            selected: [],
            headers: [{
                    text: this.$t('msg.BetId'),
                    align: "center",
                    sortable: false,
                    value: "betId",
                    total: false,
                },
                {
                    text: this.$t('msg.gameid'),
                    sortable: false,
                    align: "center",
                    value: "gameId",
                    total: false,
                },
                {
                    text: this.$t('msg.Betdetail'),
                    sortable: false,
                    align: "center",
                    value: "page",
                    page: true,
                },
                {
                    text: this.$t('msg.Time'),
                    sortable: false,
                    align: "center",
                    value: "betTime",
                    total: false,
                },
                {
                    text: this.$t('msg.amount'),
                    sortable: false,
                    align: "center",
                    value: "betAmount",
                    total: true,
                },
                {
                    text: this.$t('msg.payout'),
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
            let dates;

            if (val == 'day') {
                dates = yf + '-' + mf + '-' + d
            } else if (val == 'weeks') {
                dates = yf + '-' + mf + '-' + d
            } else if (val == 'months') {
                dates = yf + '-' + ml + '-' + d
            } else {
                dates = yl + '-' + mf + '-' + d
            }
            
            console.log(dates)

            // return this.gethistory(val)
        }
    },
    computed: {
        pages() {
            if (this.colspan == null || this.pagination.rowsPerPage == null) return 0
            return Math.ceil(this.colspan / this.pagination.rowsPerPage)
        }
    },
    methods: {
        total1(column) {
            const table = this.$refs.table
            //console.log('table',table);
            return table ? table.filteredItems.reduce((s, i) => {
                return s + parseInt(i[column.value], 10)
            }, 0) : 0
        },
        dateSearch() {
            let date = {
                start: this.datefrom,
                end: this.dateto
            }
            console.log(date)
            // return this.gethistory(date)
        },
        async gethistory(val) {
            let history = await this.$axios.$get(this.$store.state.urltest + '/api/fetchHistoryBet?apikey=' + localStorage.apikey)
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
                    this.colspan = 0
                    if (history.data[i].betTime.split(" ")[0] == val.start || history.data[i].betTime.split(" ")[0] == val.end) {
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
                            this.colspan = this.history.length;
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
                    this.colspan = this.history.length;
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
            let stcokId = await this.$axios.$get(this.$store.state.urltest + '/api/fetchStockOnly?apikey=' + localStorage.apikey)
            return this.StockName = stcokId.data

        },
    }
}
</script>
