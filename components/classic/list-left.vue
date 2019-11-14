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
                            {{$t('msg.Player')}} : {{name}}</td>
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
                    <tr v-for="(data,index) in getStockList" :key="index">
                        <td class="text-left">
                            <i class="fa fa-circle-o text-danger"></i>
                            <b>{{$t('msg.Stock')}}</b>: {{ $t('stockname.'+data.stockname) }}{{ data.stockname == 'btc1' ? ' 1 ':data.stockname == 'btc5' ? ' 5 ':'' }} <b>{{$t('msg.Time')}}</b>: {{ onlyTime(getStockById(data.id).timeLastDraw)}} <b>{{$t('msg.Result')}}</b> {{ formatToNumber(getStockById(data.id).lastDraw, data.stockname)}}
                        </td>
                    </tr>

                    <!-- <tr v-for="(data,index) in getStockList" :key="index">
            <td>
              <nuxt-link :to="'/modern/desktop/'+data.id"> {{ $t(`stockname.${data.stockname}`) }}</nuxt-link>
            </td>
            <td class="text-xs-right">{{ onlyTime(getStockById(data.id).timeLastDraw)}}</td>
            <td class="text-xs-right">{{getStockById(data.id).lastDraw}}</td>
          </tr> -->
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
                    <tr v-for="(data,index) in Allresults" :key="index">
                        <td class="text-left">
                            <b>{{$t('msg.Time')}}</b>: {{data.betTime}} <br>
                            <b>{{$t('msg.BetId')}}</b>: {{data.betId}} <br>
                            <b>{{$t('msg.amount')}}</b>:
                            {{data.betAmount}}
                            ({{data.rule.split("-")[1] >= 0 ? $t('gamemsg.'+data.rule.split("-")[0])+' - '+data.rule.split("-")[1]: $t('gamemsg.'+data.rule.split("-")[0])+' - '+$t('gamemsg.'+data.rule.split("-")[1])}})

                            <br>
                            <b>{{$t('msg.Stock')}}</b>: <span v-for="(datas,index) in stockName" :key="index" v-if="data.stock == datas.stockId">
                                {{$t('stockname.'+datas.stockName)}}
                            </span> ({{data.loops}})<br>
                            <b>{{$t('msg.gameid')}}</b>: {{data.gameId}} </td>
                    </tr>

                </table>

            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
    <button class="getupdatebalance" @click="getupdatebalance(), getAllresults()" hidden></button>
</v-card>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
import {
    mapGetters
} from "vuex";
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
            panel3: [0],
            balance: 0,
            name: "",
            stockName: null,
            Allresults: []
        }
    },
    mounted() {
        this.getupdatebalance()
        this.getAllresults()
        this.getSotckId()
        // setInterval(() => {
        //     if (this.Allresults.length != 0) {
        //         this.getAllresults()
        //     }
        // }, 1000)
    },
    created() {
        if (this.$vuetify.breakpoint.smAndDown) {
            this.panel1 = [0]
            this.panel2 = [0]
            this.panel3 = [0]
        } else {
            this.panel1 = [1]
            this.panel2 = [1]
            this.panel3 = [1]
        }
    },
    computed: {
        ...mapGetters(["getStockList", "getLotteryDraw", "getStockById"])
    },
    methods: {
        onlyTime(value) {
            let cd = new Date(value)
            return this.setZero(cd.getHours(), 2) + ":" + this.setZero(cd.getMinutes(), 2);
        },
        formatToPrice(value) {
            return `$ ${Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
        },
        formatToNumber(value, s) {
            if (s == 'usindex') {
                return Number(value).toFixed(4);
            } else {
                return Number(value).toFixed(2);
            }
        },
        setZero(num, digit) {
            var zero = "";
            for (var i = 0; i < digit; i++) {
                zero += "0";
            }
            return (zero + num).slice(-digit);
        },

        async getupdatebalance() {
            let balance = await this.$axios.$get(this.$store.state.urltest + '/api/me?apikey=' + localStorage.apikey)
            this.name = balance.name
            this.balance = balance.userBalance
            // console.log(balance)
            $("#txtbalance").text(this.formatToPrice(this.balance))
            return
        },
        async getSotckId() {
            let stcokId = await this.$axios.$get(this.$store.state.urltest + '/api/fetchStockOnly?apikey=' + localStorage.apikey)
            return this.stockName = stcokId.data
        },
        async getAllresults() {
            let CurrentBet = await this.$axios.$get(this.$store.state.urltest + '/api/fetchCurrentBet?apikey=' + localStorage.apikey)
            // console.log("kkkkkk")
            return this.Allresults = CurrentBet.data

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
