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
                        <table>
                            <tr>
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
                                    <span v-for="(datas,index) in stockName" v-if="data.stock == datas.stockId">
                                        {{$t('stockname.'+datas.stockName)}}
                                    </span>
                                    {{data.loops}} {{$t('msg.minute')}}</td>
                                <td>{{data.betTime}}</td>
                                <td>{{data.betAmount}}</td>
                                <td><span :style=" data.rollingAmount < 0 ? 'color: red;':'color: green;'">{{data.rollingAmount}}</span></td>
                            </tr>

                            <tr>
                                <td>{{$t('msg.Total This Page')}}</td>
                                <td colspan="3">0</td>
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
            history: null,
            stockName: null,
            stockId: null,
            sumTotalbetAmount: 0,
            colspan: 0,
            sumTotalrollingAmount: 0

        };
    },
    mounted() {
        setTimeout(() => {
            this.load = true
        }, 1000)
        this.gethistory(null)
        this.getSotckId()
    },

    methods: {
        dateSearch() {
            let date = {
                start: this.datefrom,
                end: this.dateto
            }
            return this.gethistory(date)
        },
        async gethistory(val) {
            console.log(val)
            let history = await this.$axios.$get(this.$store.state.urltest + '/api/fetchHistoryBet?apikey=' + localStorage.apikey)
            // console.log(history.data)
            for (let i = 0; i < history.data.length; i++) {
                this.sumTotalbetAmount += history.data[i].betAmount
                this.sumTotalrollingAmount += history.data[i].rollingAmount
            }
            this.colspan = history.data.length;
            return this.history = history.data
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
