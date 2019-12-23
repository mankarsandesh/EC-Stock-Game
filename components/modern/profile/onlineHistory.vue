<template>
<div>
    
    <v-window v-model="window" class="elevation-1" vertical > 
        <!-- Baic Information -->
        <v-window-item >

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
            <v-select style="width:120px;" hide-details :items="items" :label="$t('msg.sortby')" solo ></v-select>
        </v-flex>
        <v-flex xs6 md3>
             <v-btn    class="my-btn go" style=""> {{$t('msg.go')}}</v-btn>
        </v-flex>   
        
       

        <v-flex xs12>
            <v-card class="mx-auto">
                <Online-Chart></Online-Chart>
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
            items: ["day", "weeks", "months", "years"],
            time: "00:00",
            playerId: ""
        };
    },
    mounted() {
        this.fetchAll()
    },
    computed: {
        ...mapGetters(["getBalance", "getUserName", "getOnlimeTime"])
    },
    methods: {
        async fetchAll() {
            let res = await this.$axios.$get('/api/me?apikey=' + this.$store.state.auth_token)
            // console.log(res);
            this.playerId = res.data.userApiId
        },
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
        }

    },
};
</script>
