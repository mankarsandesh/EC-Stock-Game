<template>
<div>
    <span class="timer">2019-09-25 10:45 {{$t('msg.gameid')}}: 20190925094602</span>
    <span><a :href="linkreference" class="Reference" target="_blank">{{$t('msg.reference')}}</a></span>
    <span class="timer total_classic" v-if="load">{{dataslastdraw}}</span>
    <v-progress-circular :size="15" :width="1" color="blue darken-3" indeterminate v-else></v-progress-circular>
    <span class="timer">{{time}}</span>
</div>
</template>

<script>
import openSocket from 'socket.io-client';
import {
    urlapi
} from "./urlapi.js";
export default {
    layout: "classic",
    mixins: [urlapi],
    props: ['checkStock', 'stocks'],
    data() {
        return {
            dataslastdraw: null,
            load: false,
            time: null
        }
    },
    mounted() {
        this.getdata()
        const socket = openSocket('https://websocket-timer.herokuapp.com')
        socket.on('time', data => {
            let times;
            let calculat;
            if (this.stocks == 'btc1') {
                times = data.btc1.timer
                calculat = 41
            } else if (this.stocks == 'btc5') {
                times = data.btc5.timer
                calculat = 241
            } else if (this.stocks == 'usindex') {
                times = data.usindex.timer
                calculat = 241
            } else {
                times = data.SH000001.timer
                calculat = 241
            }

            if (times > calculat) {
                this.time = this.$t('msg.calculating')
            } else if (times == 'close') {
                this.time = this.$t('msg.marketclosed')
            } else {
                this.time = this.$t('msg.betnow') + ': ' + this.setZero(Math.floor(times / 60), 2) + ":" + this.setZero((times % 60) % 60, 2);
            }

            if (times == calculat) {
                this.getdata()
            }

        })

    },
    methods: {
        setZero(num, digit) {
            var zero = '';
            for (var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
        getdata() {
            this.url(this.stocks);
            // this.api = "http://159.138.54.214/api/btc1";
            this.$axios(this.api).then(response => {
                this.load = true
                let items = [];
                let value_no;
                response.data.data.forEach(element => {
                    items.push({
                        no1: element.no1,
                        no2: element.no2
                    });
                })
                let elements = items[items.length - 1]

                if (this.checkStock == 'bsf') {
                    value_no = elements.no1
                } else if (this.checkStock == 'bsl') {
                    value_no = elements.no2
                } else if (this.checkStock == 'bsb') {
                    value_no = parseInt(elements.no1 + elements.no2)
                } else if (this.checkStock == 'bst') {
                    value_no = this.setZero(parseInt(elements.no1 + '' + elements.no2), 2)
                } else if (this.checkStock == 'oef') {
                    value_no = elements.no1
                } else if (this.checkStock == 'oel') {
                    value_no = elements.no2
                } else if (this.checkStock == 'oeb') {
                    value_no = parseInt(elements.no1 + elements.no2)
                } else if (this.checkStock == 'oet') {
                    value_no = this.setZero(parseInt(elements.no1 + '' + elements.no2), 2)
                } else {
                    value_no = elements.no1 + ' + ' + elements.no2 + ' = ' + parseInt(elements.no1 + elements.no2)
                }
                this.dataslastdraw = value_no
            })
        }

    },

}
</script>

<style scoped>
.total_classic {
    background: linear-gradient(to right, #E91E63, #FF5722);
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
    color: #fff
}

.timer {
    border: 1px solid #ffc107;
    padding: 4px 6px;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
}

.round-number {
    border: 2px solid #FFF;
    padding: 3px;
    border-radius: 50%;
}
</style>
