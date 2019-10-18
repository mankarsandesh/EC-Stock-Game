<template>
<v-card>
    <v-expansion-panel v-model="panel1" expand>
        <v-expansion-panel-content v-for="(item,idx1) in items1" :key="idx1">
            <template class="bgtaps" v-slot:header>
                <div><i class="fa fa-info-circle font-size15"></i> {{$t('msg.User Info')}}</div>
            </template>
            <v-card>
                <table>
                    <tr>
                        <td class="text-left">
                            <i class="fa fa-user fa-2x font-size15"></i>
                            {{$t('msg.Player')}} : test</td>
                    </tr>
                    <tr>
                        <td class="text-left">
                            <i class="fa fa-balance-scale fa-2x font-size15"></i>
                            {{$t('msg.Balance')}} :
                            <animated-number :value="balance" :formatValue="formatToPrice" />
                        </td>
                    </tr>
                    <tr>
                        <td class="text-left"><i class="fa fa-thumbs-up fa-2x"></i>
                            {{$t('msg.msinfo')}}
                        </td>
                    </tr>
                </table>
            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel v-model="panel2" expand>
        <v-expansion-panel-content v-for="(item,idx1) in items2" :key="idx1">
            <template class="bgtaps" v-slot:header>
                <div>{{$t('msg.Bet Result')}}</div>
            </template>
            <v-card>
                <table>
                    <tr v-for="(data, index) in getBetresult()">
                        <td class="text-left">
                            <i class="fa fa-circle-o text-danger"></i>
                            <b>{{$t('msg.Stock')}}</b>: {{data.Stock}} <b>{{$t('msg.Time')}}</b>: {{data.Time}} <b>{{$t('msg.Result')}}</b> {{data.Result}}
                        </td>
                    </tr>
                </table>

            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel v-model="panel3" expand>
        <v-expansion-panel-content v-for="(item,idx1) in items3" :key="idx1">
            <template class="bgtaps" v-slot:header>
                <div>{{$t('msg.All Results')}}</div>
            </template>
            <v-card>
                <table>
                    <tr v-for="(data,index) in getAllresults()">
                        <td class="text-left">
                            <b>{{$t('msg.Time')}}</b>: {{data.Time}} <br>
                            <b>{{$t('msg.BetId')}}</b>: {{data.BetId}} <br>
                            <b>{{$t('msg.Amount')}}</b>: {{data.Amount}} <br>
                            <b>{{$t('msg.Stock')}}</b>: {{data.Stock}} <br>
                            <b>{{$t('msg.gameid')}}</b>: {{data.gameid}} </td>
                    </tr>

                </table>

            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
    <button class="getupdatebalance" @click="getupdatebalance(), getAllresults(), getBetresult()" hidden></button>
</v-card>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
export default {
    components: {
        AnimatedNumber
    },
    data() {
        return {
            items1: 1,
            items2: 1,
            items3: 1,
            panel1: [1],
            panel2: [1],
            panel3: [1],
            balance: this.$store.state.balance,
        }
    },
    methods: {
        formatToPrice(value) {
            return `$ ${Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
        },
        getupdatebalance() {
            this.balance = this.$store.state.balance
        },
        getBetresult() {
            let result = [{
                Stock: "US dollar Index",
                Time: "5 minute",
                Result: "98.8156",
            }, {
                Stock: "BTC/USDT",
                Time: "5 minute",
                Result: "7835.60",
            }, {
                Stock: "BTC/USDT",
                Time: "1 minute",
                Result: "7838.22",
            }]
            return result;
        },
        getAllresults() {
            let Response = [{
                    Time: '2019-10-07 11:20:01',
                    BetId: '0010106201910071020002',
                    Amount: '100 ( FirstDigit-Big )',
                    Stock: 'BTC/USDT ( 1 )',
                    gameid: '01062019100710200'
                }, {
                    Time: '2019-10-07 11:20:24',
                    BetId: '0010106201910071021005',
                    Amount: '100 ( FirstDigit-Small )',
                    Stock: 'BTC/USDT ( 1 )',
                    gameid: '01062019100710210'
                },
                {
                    Time: '2019-10-07 11:21:19',
                    BetId: '0010106201910071025002',
                    Amount: '100 ( FirstDigit-Big )',
                    Stock: 'BTC/USDT ( 5 )',
                    gameid: '01062019100710250'
                }
            ]
            return Response;
        }
    },
}
</script>

<style scoped>
.font-size15 {
    font-size: 1.5rem;
}

.text-left {
    text-align: left;
}

.text-danger {
    color: red
}

table {
    border-collapse: collapse;
    width: 100%;
    border-right: #ddd;
    text-transform: uppercase;
}

td a {
    color: #003e70 !important;
}

th {
    background-color: #cccccc;
}

th,
td {
    text-align: center;
    padding: 8px;
    border-right: 1px solid #ddd;
    border-left: 1px solid #ddd;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}
</style>
