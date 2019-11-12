<template>
<v-layout>
    <v-flex>
        <span class="timer">{{datelastdraw}} {{$t('msg.gameid')}}: {{gameid}}</span>

        <a :href="Reference" class="Reference" target="_blank">{{$t('msg.reference')}}</a>
        <span class="timer total_classic" :title="datalastdraw" v-if="load">{{dataslastdraw}}</span>
        <v-progress-circular :size="16" :width="1" color="blue darken-3" indeterminate v-else></v-progress-circular>
        <span :class="time == '00:05' || time == '00:03' || time == '00:01' || time == $t('msg.calculating') || time == $t('msg.marketclosed') ? 'timer color-timer':'timer'">{{time}}</span>

        <button class="timer" @click="ischangechartview = !ischangechartview" v-if="$vuetify.breakpoint.smAndDown">
            <i class="fa fa-table" aria-hidden="true" v-show="!ischangechartview" @click="getonview()"></i>
            <i class="fa fa-area-chart" aria-hidden="true" v-show="ischangechartview" @click="getoffview()"></i>
        </button>

    </v-flex>
</v-layout>
</template>

<script>
import openSocket from "socket.io-client";
export default {
    props: ["checkStock", "stocks", "StockData", "Reference"],
    data() {
        return {
            ischangechartview: false,
            datalastdraw: "0000.00",
            datelastdraw: "0000-00-00 00:00",
            load: false,
            time: this.$root.$t('msg.loading'),
            gameid: null,
            TimeNow: "00:00",
            DateNow: "0000-00-00",
            week: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
        };
    },
    mounted() {
        this.getdata()
        setInterval(() => {
            if (this.load == false) this.getdata()
        }, 1000)
        const socket = openSocket("https://websocket-timer.herokuapp.com");
        socket.on("time", data => {
            // this.getTimeNow();
            let times;
            let calculat;
            let lasttime;
            if (this.stocks == "btc1") {
                times = data.btc1.timer;
                calculat = 40;
                lasttime = 38
            } else if (this.stocks == "btc5") {
                times = data.btc5.timer;
                calculat = 240;
                lasttime = 238;
            } else if (this.stocks == "usindex") {
                times = data.usindex.timer;
                calculat = 240;
                lasttime = 238;
            } else {
                times = data.SH000001.timer;
                calculat = 240;
                lasttime = 238;
            }

            if (times > calculat) {
                this.time = this.$root.$t('msg.calculating');
            } else if (times == "close") {
                this.time = this.$root.$t('msg.marketclosed');
            } else {
                this.time = this.$root.$t('msg.betnow') + ':' + this.setZero(Math.floor(times / 60), 2) + ":" + this.setZero((times % 60) % 60, 2);
            }

            if (times == lasttime) {
                this.getdata();
            }
        });
    },
    methods: {
        getonview() {
            $(".open")[0].click()
        },
        getoffview() {
            $(".off")[0].click()
        },
        getTimeNow() {
            let Zone = new Date().toLocaleString("china", {
                timeZone: "Asia/Shanghai"
            });
            var cd = new Date(Zone)
            this.TimeNow =
                this.setZero(cd.getHours(), 2) + ":" +
                this.setZero(cd.getMinutes(), 2) + ":" +
                this.setZero(cd.getSeconds(), 2);
            this.DateNow =
                this.setZero(cd.getFullYear(), 4) + "-" +
                this.setZero(cd.getMonth() + 1, 2) + "-" +
                this.setZero(cd.getDate(), 2) //+ " " + 
            //this.week[cd.getDay()];
        },
        setZero(num, digit) {
            var zero = "";
            for (var i = 0; i < digit; i++) {
                zero += "0";
            }
            return (zero + num).slice(-digit);
        },
        formatToPrice(value) {
            if (this.$route.params.id.split('-')[1] == 'usindex') {
                return `${Number(value).toFixed(4)}`;
            } else {
                return `${Number(value).toFixed(2)}`;
            }
        },
        getdata() {
            if (this.StockData == "") return;

            this.load = true;
            let items = [];
            let value_no;
            this.StockData.forEach(element => {
                items.push({
                    PT: this.formatToPrice(element.PT),
                    gameid: element.gameid,
                    date: element.created_at.replace(/-/g, "/")
                });
            });
            let elements = items[items.length - 1];
            this.datalastdraw = elements.PT;
            let cd = new Date(elements.date)
            this.datelastdraw =
                this.setZero(cd.getFullYear(), 4) + "-" +
                this.setZero(cd.getMonth() + 1, 2) + "-" +
                this.setZero(cd.getDate(), 2) + " " +
                this.setZero(cd.getHours(), 2) + ":" +
                this.setZero(cd.getMinutes(), 2);
            this.gameid = elements.gameid;
            let no1 = elements.PT[elements.PT.length - 2];
            let no2 = elements.PT[elements.PT.length - 1];

            if (this.checkStock == "bsf") {
                value_no = no1;
            } else if (this.checkStock == "bsl") {
                value_no = no2;
            } else if (this.checkStock == "bsb") {
                value_no = parseInt(no1) + parseInt(no2);
            } else if (this.checkStock == "bst") {
                value_no = this.setZero(parseInt(no1) + "" + parseInt(no2), 2);
            } else if (this.checkStock == "oef") {
                value_no = no1;
            } else if (this.checkStock == "oel") {
                value_no = no2;
            } else if (this.checkStock == "oeb") {
                value_no = parseInt(no1) + parseInt(no2);
            } else if (this.checkStock == "oet") {
                value_no = this.setZero(parseInt(no1) + "" + parseInt(no2), 2);
            } else {
                value_no = no1 + " + " + no2 + " = " + parseInt(parseInt(no1) + parseInt(no2));
            }
            this.dataslastdraw = value_no;
        }
    }
};
</script>

<style scoped>
.total_classic {
    background: linear-gradient(to right, #e91e63, #ff5722);
    color: #fff;
    border: none;
    text-transform: capitalize;
}

.float-right {
    float: right;
}

.Reference {
    border: 1px solid #ffc107;
    padding: 5px 6px;
    border-radius: 10px;
    font-size: 1.1rem;
    cursor: pointer;
    background-color: #384e63;
    color: #fff;
}

.timer {
    border: 1px solid #ffc107;
    padding: 3px 6px;
    border-radius: 10px;
    font-size: 1.1rem;
    cursor: pointer;
    display: inline-table;
}

.color-timer {
    background-color: red;
    color: white;
}

.round-number {
    border: 2px solid #fff;
    padding: 3px;
    border-radius: 50%;
}
</style>
