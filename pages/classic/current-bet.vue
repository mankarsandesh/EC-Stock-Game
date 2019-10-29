<template>
<v-tabs-items>
    <v-tab-item>
        <v-card flat>
            <v-expansion-panel v-model="panel" expand>
                <v-expansion-panel-content class="bg-color">
                    <template v-slot:header>
                        <div> {{$t('menu.current bet')}}</div>
                    </template>
                    <v-flex xs6 sm2>
                        <v-select :items="items" label="Sort by:" solo></v-select>
                    </v-flex>
                    <v-card>

                        <v-progress-linear :indeterminate="true" color="blue darken-3" v-show="!load"></v-progress-linear>
                        <table>
                            <tr>
                                <th>{{$t('msg.BetId')}}</th>
                                <th>{{$t('msg.gameid')}}</th>
                                <th>{{$t('msg.Betdetail')}}</th>
                                <th>{{$t('msg.Time')}}</th>
                                <th>{{$t('msg.amount')}}</th>
                                <th>{{$t('msg.payout')}}</th>
                                <th>{{$t('msg.Bet Status')}}</th>
                            </tr>
                            <tr v-for="(data ,index) in CurrentBet" :key="index">
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
                                <td>{{data.payoutAmount}}</td>
                                <td>{{data.betStatus}}</td>
                            </tr>

                            <tr>
                                <td>{{$t('msg.Total This Page')}}</td>
                                <td colspan="3">0</td>
                                <td>{{formatToPrice(0)}}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>{{$t('msg.Total')}}</td>
                                <td colspan="3">{{colspan}}</td>
                                <td>{{formatToPrice(sumTotalAll)}}</td>
                                <td></td>
                                <td></td>
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
    layout: 'classic',
    data() {
        return {
            panel: [true],
            items: ["day", "weeks", "months", "years"],
            load: false,
            CurrentBet: null,
            stockName: null,
            stockId: null,
            sumTotalAll: 0,
            colspan: 0
        }
    },
    mounted() {
        setTimeout(() => {
            this.load = true
        }, 1000)
        this.getCurrentBet()
        this.getSotckId()
    },
    methods: {
        async getCurrentBet() {
            let CurrentBet = await this.$axios.$get(this.$store.state.urltest + '/api/fetchCurrentBet?apikey=' + localStorage.apikey)
            console.log(CurrentBet.data)
            for (let i = 0; i < CurrentBet.data.length; i++) {
                this.sumTotalAll += CurrentBet.data[i].betAmount
            }
            this.colspan = CurrentBet.data.length;
            return this.CurrentBet = CurrentBet.data
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

<style scoped>
.position-unset {
    position: unset;
}
</style>
