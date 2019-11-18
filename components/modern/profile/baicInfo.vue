<template>
<div>
    <div class="d-between">
        <v-avatar size="170">
            <img src="/v.png" alt />
        </v-avatar>

        <p>
            Online status : {{setTime(time.todayOnline, 0)}}
            <span>current balance : {{formatToPrice(userBalance)}}</span>
        </p>
    </div>

    <v-flex lg12>
        <table class="table table-striped">
            <tbody>
                <tr>
                    <th scope="row" class="row">player id</th>
                    <td>z05qd0001</td>
                    <td>EVERYONE CAN SEE</td>
                </tr>
                <tr>
                    <th scope="row" class="row">nickname</th>
                    <td>
                        Jacob
                        <v-btn icon>
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </td>
                    <td>
                        <v-select hide-details v-model="nick" :items="nickselects" label="EVERYONE CAN SEE"></v-select>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="row">gender</th>
                    <td>
                        <v-select hide-details v-model="gen" :items="gendselects" label="Male"></v-select>
                    </td>
                    <td>
                        <v-select hide-details v-model="gender" :items="genderselects" label="EVERYONE CAN SEE"></v-select>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="row">email</th>

                    <td>
                        tnk@gmail.com
                        <v-btn icon>
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </td>
                    <td>
                        <v-select hide-details v-model="email" :items="emails" label="EVERYONE CAN SEE"></v-select>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="row">membership</th>

                    <td>Stock God</td>
                    <td>
                        <v-select hide-details v-model="membership" :items="membershipselects" label="EVERYONE CAN SEE"></v-select>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="row">country</th>
                    <td>
                        <v-select hide-details v-model="count" :items="countselects" label="China"></v-select>
                    </td>
                    <td>
                        <v-select hide-details v-model="country" :items="countryselects" label="EVERYONE CAN SEE"></v-select>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="row">balance</th>
                    <td>$865.00</td>
                    <td>
                        <v-select hide-details v-model="balance" :items="balancesselect" label="China"></v-select>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="row">rolling</th>
                    <td>$1795.00</td>
                    <td>Only me</td>
                </tr>
            </tbody>
        </table>

        <p>{{project}}</p>
        <v-flex>
            <v-btn class="my-btn">save</v-btn>
            <v-btn class="my-btn cancel">cancel</v-btn>
        </v-flex>
    </v-flex>
</div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            selects: ["EVERYONE CAN SEE", "ONLY ME"],
            gender: ["MALE", "FEMALE"],
            nick: "",
            gen: "",
            gender: "",
            email: "",
            membership: "",
            count: "",
            country: "",
            balance: "",
            nickselects: [],
            gendselects: [],
            genderselects: [],
            emails: [],
            membershipselects: [],
            countselects: [],
            countryselects: [],
            balancesselect: [],
            project: "",
            time: "",
            userBalance:""
        };
    },
    created() {
        this.fetchAll();
    },
    mounted() {
        this.getOnlineTime()
    },
    methods: {
        formatToPrice(value) {
            return `$ ${Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
        },
        async fetchAll() {
            let res = await this.$axios.$get( '/api/me?apikey=' + localStorage.apikey)
            this.userBalance = res.userBalance
            console.log(res);
        },
        async getOnlineTime() {
            let dataGet = await this.$axios.$get( '/api/me/online?method=profile&apikey=' + localStorage.apikey)
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
    }
};
</script>
