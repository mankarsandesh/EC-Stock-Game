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

                        <v-data-table :headers="headers" hide-actions :search="search" :items="history" :pagination.sync="pagination" class="elevation-1">
                            <template v-slot:items="props">
                                <td>{{props.item.betId}}</td>
                                <td>{{props.item.gameId}}</td>
                                <td>
                                    {{props.item.rule.split("-")[1] >= 0 ? $t('gamemsg.'+props.item.rule.split("-")[0])+' - '+props.item.rule.split("-")[1]: $t('gamemsg.'+props.item.rule.split("-")[0])+' - '+$t('gamemsg.'+props.item.rule.split("-")[1])}}
                                    ({{props.item.payoutAmount}})
                                    <span v-for="(datas,index) in stockName" :key="index" v-if="props.item.stock == datas.stockId">
                                        {{$t('stockname.'+datas.stockName)}}
                                    </span>
                                    {{props.item.loops}} {{$t('msg.minute')}}</td>
                                <td>{{props.item.betTime}}</td>
                                <td>{{props.item.betAmount}}</td>
                                <td><span :style=" props.item.rollingAmount < 0 ? 'color: red;':'color: green;'">{{props.item.rollingAmount}}</span></td>
                            </template>
                        </v-data-table>

                        <table>
                            <!-- <tr>
                                <th>{{$t('msg.BetId')}}</th>
                                <th>{{$t('msg.gameid')}}</th>
                                <th>{{$t('msg.Betdetail')}}</th>
                                <th>{{$t('msg.Time')}}</th>
                                <th>{{$t('msg.amount')}}</th>
                                <th>{{$t('msg.payout')}}</th>
                            </tr>
                            <tr v-for="(data ,index) in history" :key="index">
                                <td>{{data.betId}}</td>
                                <td>{{data.gameId}}</td>
                                <td>
                                    {{data.rule.split("-")[1] >= 0 ? $t('gamemsg.'+data.rule.split("-")[0])+' - '+data.rule.split("-")[1]: $t('gamemsg.'+data.rule.split("-")[0])+' - '+$t('gamemsg.'+data.rule.split("-")[1])}}
                                    ({{data.payoutAmount}})
                                    <span v-for="(datas,index) in stockName" v-if="data.stock == datas.stockId" :key="index">
                                        {{$t('stockname.'+datas.stockName)}}
                                    </span>
                                    {{data.loops}} {{$t('msg.minute')}}</td>
                                <td>{{data.betTime}}</td>
                                <td>{{data.betAmount}}</td>
                                <td><span :style=" data.rollingAmount < 0 ? 'color: red;':'color: green;'">{{data.rollingAmount}}</span></td>
                            </tr> -->

                            <tr>
                                <td>{{$t('msg.Total This Page')}}</td>
                                <td colspan="3">{{pagination.rowsPerPage}}</td>
                                <td>{{formatToPrice(0)}}</td>
                                <td>{{formatToPrice(0)}}</td>
                            </tr>
                            <tr>
                                <td>{{$t('msg.Total')}}</td>
                                <td colspan="3">{{colspan}}</td>
                                <td>{{formatToPrice(sumTotalbetAmount)}}</td>
                                <td>{{formatToPrice(sumTotalrollingAmount)}}</td>
                            </tr>
                        </table>
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
            itemss: "day",
            load: false,
            history: [],
            stockName: null,
            stockId: null,
            sumTotalbetAmount: 0,
            colspan: 0,
            sumTotalrollingAmount: 0,
            page: 1,
            search: "",
            pagination: {},
            selected: [],
            headers: [{
                    text: this.$t('msg.BetId'),
                    align: "center",
                    sortable: false,
                    value: "BetId"
                },
                {
                    text: this.$t('msg.gameid'),
                    sortable: false,
                    align: "center",
                    value: "gameid"
                },
                {
                    text: this.$t('msg.Betdetail'),
                    sortable: false,
                    align: "center",
                    value: "Betdetail"
                },
                {
                    text: this.$t('msg.Time'),
                    sortable: false,
                    align: "center",
                    value: "Time"
                },
                {
                    text: this.$t('msg.amount'),
                    sortable: false,
                    align: "center",
                    value: "amount"
                },
                {
                    text: this.$t('msg.payout'),
                    sortable: false,
                    align: "center",
                    value: "payout"
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
            if (this.colspan == null) return 0
            return Math.ceil(this.colspan / this.pagination.rowsPerPage)
        }
    },
    methods: {
        dateSearch() {
            let date = {
                start: this.datefrom,
                end: this.dateto
            }
            // return this.gethistory(date)
        },
        async gethistory(val) {
            let history = await this.$axios.$get(this.$store.state.urltest + '/api/fetchHistoryBet?apikey=' + localStorage.apikey)

            if (history.data == null) return

            // if (val == this.itemss) {
            //     console.log("weeks")
            //     console.log(val)
            // } else if (val == null) {
            //     console.log("null")
            // } else {
            //     console.log("Date")
            //     console.log(val)
            // }

            // console.log(history.data)
            for (let i = 0; i < history.data.length; i++) {
                this.sumTotalbetAmount += history.data[i].betAmount
                this.sumTotalrollingAmount += history.data[i].rollingAmount
            }

            this.load = true;
            this.colspan = history.data.length;

            history.data.forEach(element => {
                return this.history.push({
                    betId: element.betId,
                    gameId: element.gameId,
                    rule: element.rule,
                    payoutAmount: element.payoutAmount,
                    stock: element.stock,
                    loops: element.loops,
                    betTime: element.betTime,
                    betAmount: element.betAmount,
                    rollingAmount: element.rollingAmount
                });
            });

            // return this.history = history.data
        },
        formatToPrice(value) {
            return `$ ${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
        },
        async getSotckId() {
            let stcokId = await this.$axios.$get(this.$store.state.urltest + '/api/fetchStockOnly?apikey=' + localStorage.apikey)
            return this.stockName = stcokId.data

        },
    }
}
</script>
