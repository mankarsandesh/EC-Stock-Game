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
                        <!-- <v-layout row wrap>
                            <v-flex xs6 md2 >
                                <v-select hide-details :items="items" label="Sort By :" v-model="pagination.sortBy" solo></v-select>
                            </v-flex>
                        </v-layout> -->
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
                                <td>{{props.item.payoutAmount}}</td>
                                <td>{{props.item.betStatus == 0 ? 'Pending':'Done'}}</td>
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

                                    <td></td>
                                    <td></td>

                                </tr>
                                <tr>
                                    <td>{{$t('msg.Total')}}</td>
                                    <td colspan="3">{{colspan}}</td>
                                    <td><strong>{{formatToPrice(sumTotalbetAmount)}}</strong></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </template>
                        </v-data-table>
                        <div class="text-xs-center pt-2" v-if="pages != 0 ">
                            <v-pagination v-model="pagination.page" :length="pages" color="blue"></v-pagination>
                        </div>
                        <!-- {{pagination}} -->
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
                    value: "payoutAmount",
                    totals: true,
                }, {
                    text: this.$root.$t('msg.Bet Status'),
                    sortable: false,
                    align: "center",
                    value: "betStatus",
                    total: false,
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
            return this.gethistory(date)
        },
        async gethistory(val) {
            let history = await this.$axios.$get('/api/currenctChipBetUser?apikey=' + this.$store.state.auth_token)
            if (history.data == null) return
            // console.log(history.data)

            this.load = true;

            for (let i = 0; i < history.data.length; i++) {
                console.log(history.data[i].betTime)
                if (val != null) {
                    this.history = []
                    this.sumTotalbetAmount = 0
                    this.sumTotalrollingAmount = 0
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
                                payoutAmount: history.data[i].payoutAmount,
                                betStatus: history.data[i].betStatus
                            });

                            this.sumTotalbetAmount += history.data[i].betAmount
                            this.sumTotalrollingAmount += history.data[i].rollingAmount
                            this.colspan = history.data.length;
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
                        payoutAmount: history.data[i].payoutAmount,
                        betStatus: history.data[i].betStatus
                    });

                    this.sumTotalbetAmount += history.data[i].betAmount
                    this.sumTotalrollingAmount += history.data[i].rollingAmount
                    this.colspan = history.data.length;
                }
            }

        },
        formatToPrice(value) {
            return `$ ${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
        },
        async getSotckId() {
            let stcokId = await this.$axios.$get('/api/fetchStockOnly?apikey=' + this.$store.state.auth_token)
            return this.StockName = stcokId.data

        },
    }
}
</script>
