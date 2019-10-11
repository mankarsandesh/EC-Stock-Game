<template>
<v-card tile flat color="red lighten-2">
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
                    <tr>
                        <td class="text-left"> <i class="fa fa-circle-o text-danger"></i> <b>{{$t('msg.Stock')}}</b>: US dollar Index <b>{{$t('msg.Time')}}</b>: 5 minute <b>{{$t('msg.Result')}}</b> 98.8156</td>
                    </tr>
                    <tr>
                        <td class="text-left"> <i class="fa fa-circle-o text-danger"></i> <b>Stock</b>: BTC/USDT <b>Time</b>: 5 minute <b>Result</b> 7835.60</td>
                    </tr>
                    <tr>
                        <td class="text-left"><i class="fa fa-circle-o text-danger"></i> <b>Stock</b>: BTC/USDT <b>Time</b>: 1 minute <b>Result</b> 7838.22</td>
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
                    <tr>
                        <td class="text-left">
                            <b>{{$t('msg.Time')}}</b>: 2019-10-07 11:20:01<br>
                            <b>{{$t('msg.BetId')}}</b>: 0010106201910071020002<br>
                            <b>{{$t('msg.Amount')}}</b>: 100 ( FirstDigit-Big )<br>
                            <b>{{$t('msg.Stock')}}</b>: BTC/USDT ( 1 )<br>
                            <b>{{$t('msg.gameid')}}</b>: 01062019100710200</td>
                    </tr>
                    <tr>
                        <td class="text-left">
                            <b>Time</b> 2019-10-07 11:20:24<br>
                            <b>BetId</b>: 0010106201910071021005<br>
                            <b>Amount</b>: 100 ( FirstDigit-Small )<br>
                            <b>Stock</b>: BTC/USDT ( 1 )<br>
                            <b>gameid</b>: 01062019100710210</td>
                    </tr>
                    <tr>
                        <td class="text-left">
                            <b>Time</b> 2019-10-07 11:21:19<br>
                            <b>BetId</b>: 0010106201910071025002<br>
                            <b>Amount</b>: 100 ( FirstDigit-Big )<br>
                            <b>Stock</b>: BTC/USDT ( 5 )<br>
                            <b>gameid</b>: 01062019100710250</td>
                    </tr>
                </table>

            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
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
