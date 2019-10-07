<template>
<div>
    <v-layout>
        <v-flex>
            <span class="timer">{{DateNow}} {{TimeNow}} {{$t('msg.gameid')}}: {{gameid}}</span>
            <a :href="Reference" class="Reference" target="_blank">{{$t('msg.reference')}}</a>
            <span class="timer total_classic" v-if="load">{{dataslastdraw}}</span>
            <v-progress-circular :size="15" :width="1" color="blue darken-3" indeterminate v-else></v-progress-circular>
            
            <span class="timer" v-if="time == 1">{{$t('msg.calculating')}}</span>
            <span class="timer" v-else-if="time == 0">{{$t('msg.marketclosed')}}</span>
            <span class="timer" v-else>{{ time != $t('msg.loading') ? $t('msg.betnow')+' : ':''}}{{time}}</span>

        </v-flex>
    </v-layout>
</div>
</template>

<script>
import openSocket from "socket.io-client";
export default {
    props: ["checkStock", "stocks", "StockData", "Reference"],
    data() {
        return {
            dataslastdraw: null,
            load: false,
            time: this.$t('msg.loading'),
            gameid: null,
            TimeNow: "00:00",
            DateNow: "0000-00-00",
            week: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
        };
    },
    mounted() {
        this.getdata();
        const socket = openSocket("https://websocket-timer.herokuapp.com");
        socket.on("time", data => {
            this.getTimeNow();
            let times;
            let calculat;
            if (this.stocks == "btc1") {
                times = data.btc1.timer;
                calculat = 41;
            } else if (this.stocks == "btc5") {
                times = data.btc5.timer;
                calculat = 241;
            } else if (this.stocks == "usindex") {
                times = data.usindex.timer;
                calculat = 241;
            } else {
                times = data.SH000001.timer;
                calculat = 241;
            }

            if (times > calculat) {
                this.time = 1;
            } else if (times == "close") {
                this.time = 0;
            } else {
                this.time = this.setZero(Math.floor(times / 60), 2) + ":" + this.setZero((times % 60) % 60, 2);
            }

            if (times == calculat) {
                this.getdata();
            }
        });
    },
    methods: {
        getTimeNow() {
            let now = new Date().toLocaleString("china", {
                timeZone: "Asia/Shanghai"
            });
            var cd = new Date(now);
            this.TimeNow =
                this.setZero(cd.getHours(), 2) +
                ":" +
                this.setZero(cd.getMinutes(), 2) +
                ":" +
                this.setZero(cd.getSeconds(), 2);
            this.DateNow =
                this.setZero(cd.getFullYear(), 4) +
                "-" +
                this.setZero(cd.getMonth() + 1, 2) +
                "-" +
                this.setZero(cd.getDate(), 2); // + ' ' + this.week[cd.getDay()];
        },
        setZero(num, digit) {
            var zero = "";
            for (var i = 0; i < digit; i++) {
                zero += "0";
            }
            return (zero + num).slice(-digit);
        },
        getdata() {
            if (this.StockData == "") return;

            // this.api = "http://159.138.54.214/api/btc1";
            // this.$axios(this.api).then(response => {
            this.load = true;
            let items = [];
            let value_no;
            this.StockData.forEach(element => {
                items.push({
                    PT: element.PT,
                    gameid: element.gameid
                });
            });
            let elements = items[items.length - 1];
            // console.log(elements.gameid)
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
                value_no =
                    no1 + " + " + no2 + " = " + parseInt(parseInt(no1) + parseInt(no2));
            }
            this.dataslastdraw = value_no;
            // })
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
    padding: 4px 10px;
    border-radius: 10px;
    cursor: pointer;
    background-color: #384e63;
    color: #fff;
}

.timer {
    border: 1px solid #ffc107;
    padding: 4px 6px;
    border-radius: 10px;
    font-size: 1.2rem;
    cursor: pointer;
}

.round-number {
    border: 2px solid #fff;
    padding: 3px;
    border-radius: 50%;
}
</style>
