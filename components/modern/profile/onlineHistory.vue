<template>
<div>
    <v-layout row wrap>
        <v-flex xs6 md3>
            <v-menu v-model="from" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field v-model="datefrom" label="From" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="datefrom" @input="from = false"></v-date-picker>
            </v-menu>
        </v-flex>
        <v-flex xs6 md3>
            <v-menu v-model="to" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y full-width min-width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field v-model="dateto" label="To" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="dateto" @input="to = false"></v-date-picker>
            </v-menu>
        </v-flex>
        <v-btn class="my-btn go">go</v-btn>
        <v-flex xs6 md3 class="float-right">
            <v-select hide-details :items="items" label="Sort By :" solo></v-select>
        </v-flex>
        <v-flex xs12>
            <v-card class="mx-auto">
                <h1>Chart here</h1>
            </v-card>
        </v-flex>
        <v-card>
            <v-card-text>player id : {{playerId}}</v-card-text>
            <v-card-text>online time : {{setTime(time.todayOnline, 0)}}</v-card-text>
            <v-card-text>total online : {{setTime(time.totalOnline, 1)}}</v-card-text>
        </v-card>
    </v-layout>
</div>
</template>

<script>
export default {
    data() {
        return {
            dateto: new Date().toISOString().substr(0, 10),
            datefrom: new Date().toISOString().substr(0, 10),
            from: false,
            to: false,
            items: ["day", "weeks", "months", "years"],
            time: "00:00",
            playerId:""
        };
    },
    mounted() {
        this.getOnlineTime()
        this.fetchAll()
    },
    methods: {
        async fetchAll() {
            let res = await this.$axios.$get( '/api/me?apikey=' + this.$store.state.auth_token)
            // console.log(res);
            this.playerId = res.userApiId
        },
        async getOnlineTime() {
            let dataGet = await this.$axios.$get( '/api/me/online?method=profile&apikey=' + this.$store.state.auth_token)
            this.time = dataGet.data
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
