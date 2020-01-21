<template>
<div>

    <v-window class="elevation-1" vertical>
        <!-- Baic Information -->
        <v-window-item>

            <v-layout row wrap>
                <v-flex xs6 md3>
                    <v-menu v-model="from" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="datefrom" :label="$t('msg.from')" prepend-icon="event" readonly v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="datefrom" @input="from = false"></v-date-picker>
                    </v-menu>

                </v-flex>
                <v-flex xs6 md3>
                    <v-menu v-model="to" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y full-width min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="dateto" :label="$t('msg.to')" prepend-icon="event" readonly v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="dateto" @input="to = false"></v-date-picker>
                    </v-menu>

                </v-flex>
                <v-flex xs6 md3>
                    <v-btn @click="dateSearch" class="my-btn go" style="margin-left: -60%;"> {{$t('msg.go')}}</v-btn>
                </v-flex>
                <v-flex xs6 md3>
                    <v-select small hide-details :items="items" v-model="itemss" :label="$t('msg.sortby')" solo></v-select>
                </v-flex>

                <v-flex xs12>
                    <v-card class="mx-auto">
                        <Online-Chart :stockname="stockname" :betwon="betwon" v-if="isShow"></Online-Chart>
                    </v-card>
                </v-flex>
                <v-card>
                    <v-card-text>{{$t('msg.playerid')}} : {{getUserName.userApiId}}</v-card-text>
                    <v-card-text>{{$t('msg.online')}} {{$t('msg.Time')}} : {{setTime(getOnlimeTime.todayOnline, 0)}}</v-card-text>
                    <v-card-text>{{$t('msg.Total')}} {{$t('msg.online')}} : {{setTime(getOnlimeTime.totalOnline, 1)}}</v-card-text>
                </v-card>

            </v-layout>

        </v-window-item>
    </v-window>

</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
import OnlineChart from "./onlinechart";
export default {
    components: {
        OnlineChart
    },
    data() {
        return {
            dateto: new Date().toISOString().substr(0, 10),
            datefrom: new Date().toISOString().substr(0, 10),
            from: false,
            to: false,
            items: ["day", "weeks", "months", "years", "all"],
            time: "00:00",
            window: "",
            stockname: [],
            betwon: [],
            itemss: "",
            isShow: false
        };
    },
    mounted() {
        this.getonlinehistory(null)

    },
    computed: {
        ...mapGetters(["getBalance", "getUserName", "getOnlimeTime"])
    },
    watch: {
        itemss(val) {
            // console.log(val)
            let date = new Date();
            let yl = date.getFullYear() - 1;
            let yf = date.getFullYear();
            let ml = date.getMonth();
            let mf = date.getMonth() + 1;
            let w = date.getDay();
            let d = date.getDate();
            let datefrom;

            if (val == 'day') {
                datefrom = {
                    start: this.dateto,
                    end: this.dateto
                }
            } else if (val == 'weeks') {
                datefrom = {
                    week: this.getWeekNumber(new Date())
                }
            } else if (val == 'months') {
                datefrom = {
                    month: mf
                }
            } else if (val == 'years') {
                datefrom = {
                    year: yf
                }
            } else if (val == 'all') {
                datefrom = "all"
            }
            // console.log(datefrom)
            return this.getonlinehistory(datefrom)
        },
    },
    methods: {
        setTime(seconds, val) {
            let days = Math.floor(seconds / (24 * 60 * 60));
            seconds -= days * (24 * 60 * 60);
            let hours = Math.floor(seconds / (60 * 60));
            seconds -= hours * (60 * 60);
            let minutes = Math.floor(seconds / (60));
            seconds -= minutes * (60);
            if (val == 1) {
                return ((0 < days) ? (days + this.$root.$t('msg.days') + ", ") : "") + hours + this.$root.$t('msg.hours') + ", " + minutes + this.$root.$t('msg.minute');
            } else {
                return hours + this.$root.$t('msg.hours') + ", " + minutes + this.$root.$t('msg.minute');
            }
        },
        setZero(num, digit) {
            var zero = '';
            for (var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
        getDateArray(start, end) {
            var arr = new Array();
            var dt = new Date(start);
            while (dt <= end) {
                let date = new Date(dt)
                arr.push(date.getFullYear() + "-" + this.setZero(date.getMonth() + 1, 2) + "-" + this.setZero(date.getDate(), 2));
                dt.setDate(dt.getDate() + 1);
            }
            return arr;
        },
        getWeekNumber(d) {
            // Copy date so don't modify original
            d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
            // Set to nearest Thursday: current date + 4 - current day number
            // Make Sunday's day number 7
            d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
            // Get first day of year
            var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            // Calculate full weeks to nearest Thursday
            var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
            // Return array of year and week number
            // return [d.getUTCFullYear(), weekNo];
            return weekNo + '-' + d.getUTCFullYear();
        },
        dateSearch() {
            let date = {
                start: this.datefrom,
                end: this.dateto
            }
            return this.getonlinehistory(date)
        },
        async getonlinehistory(val) {
            this.stockname = []
            this.betwon = []
            let onlinehistory = await this.$axios.$get('/api/me/online?method=chart&apikey=' + this.$store.state.auth_token)
            if (onlinehistory.data == "") return;
            
            for (let i = 0; i < onlinehistory.data.length; i++) {
                if (val != null && val != 'all') {
                    if (this.getDateArray(new Date(val.start), new Date(val.end)).length > 0) {
                        let getDate = this.getDateArray(new Date(val.start), new Date(val.end))
                        for (let n = 0; n < getDate.length; n++) {
                            if (onlinehistory.data[i].date.split(" ")[0] == getDate[n]) {
                                this.getsenddata(onlinehistory, i)
                            }
                        }
                    } else if (this.getWeekNumber(new Date(onlinehistory.data[i].date)) == val.week ||
                        new Date(onlinehistory.data[i].date).getMonth() + 1 == val.month ||
                        new Date(onlinehistory.data[i].date).getFullYear() == val.year) {
                        this.getsenddata(onlinehistory, i)
                    }

                } else {
                    this.getsenddata(onlinehistory, i)
                }

            }

        },
        getsenddata(onlinehistory, i) {
            this.isShow = false
            setTimeout(() => {
                this.isShow = true
            }, 500)
            this.stockname.push(onlinehistory.data[i].date);
            let totalSeconds = parseInt(onlinehistory.data[i].timeOnline);

            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let minutes2 = minutes < 10 ? "0" + minutes : minutes;
            let seconds = totalSeconds % 60;
            this.betwon.push(hours + "." + minutes2);
        }

    },
};
</script>
