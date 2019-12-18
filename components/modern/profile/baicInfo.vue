<template>
<div>
    <v-form @submit.prevent="updateProfile">

        <div class="success" v-if="succesFiled == true">
            {{ this.succesMessage }}
        </div>

        <div class="d-between">
            <v-avatar size="170">
                <img src="/v.png" v-if="profile.avatar == null" alt />
                <img v-else :src="profile.avatar" alt />
            </v-avatar>
        </div>
        <p style="float:right;">
            {{$t('msg.online')}} {{$t('msg.Status')}} : {{setTime(getOnlimeTime.todayOnline, 0)}}
            <span>{{$t('msg.currentbalance')}} : {{formatToPrice(profile.userBalance)}}</span>
        </p>

        <v-flex lg12>
            <table class="table table-striped">
                <tbody>
                    <tr>
                        <th scope="row" class="row">{{$t('msg.playerid')}}</th>
                        <td>{{profile.userApiId}}</td>
                        <td>
                            <v-select hide-details v-model="profile.idSelect" :items="selects" :label="$t('msg.everyonecansee')"></v-select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="row">{{$t('msg.name')}}</th>
                        <td>
                            {{profile.name}}
                            <!-- <v-btn icon>
                                <v-icon>edit</v-icon>
                            </v-btn> -->
                        </td>
                        <td>
                            <v-select hide-details v-model="profile.nameSelect" :items="selects" :label="$t('msg.everyonecansee')"></v-select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="row">{{$t('msg.gender')}}</th>
                        <td>
                            <v-select class="select" hide-details v-model="profile.genderSelect" :items="genders" :label="$t('msg.'+profile.gender)"></v-select>
                        </td>
                        <td>
                            <v-select hide-details v-model="profile.gender" :items="selects" :label="$t('msg.everyonecansee')"></v-select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="row">{{$t('msg.email')}}</th>
                        <td>
                            {{profile.email}}
                            <!-- <v-btn icon>
                                <v-icon>edit</v-icon>
                            </v-btn> -->
                        </td>
                        <td>
                            <v-select hide-details v-model="profile.emailSelect" :items="selects" :label="$t('msg.everyonecansee')"></v-select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="row">{{$t('msg.membership')}}</th>

                        <td>{{profile.memberShip}}</td>
                        <td>
                            <v-select hide-details v-model="profile.membershipSelect" :items="selects" :label="$t('msg.everyonecansee')"></v-select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="row">{{$t('msg.country')}}</th>
                        <td>
                            <v-select class="select" hide-details v-model="profile.country" :items="countrySelects" :label="profile.countrySelects"></v-select>
                        </td>
                        <td>
                            <v-select hide-details v-model="profile.countrySelects" :items="selects" :label="$t('msg.everyonecansee')"></v-select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="row">{{$t('msg.Balance')}}</th>
                        <td>{{formatToPrice(profile.userBalance)}}</td>
                        <td>
                            <v-select hide-details v-model="profile.balanceSelect" :items="selects" :label="$t('msg.everyonecansee')"></v-select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="row">{{$t('msg.rolling')}}</th>
                        <td>$1795.00</td>
                        <td>
                            <v-select hide-details v-model="profile.rollingSelect" :items="selects" :label="$t('msg.everyonecansee')"></v-select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <v-flex>
                <v-btn class="my-btn" type="submit">{{$t('msg.save')}}</v-btn>
                <v-btn class="my-btn cancel">{{$t('msg.cancel')}}</v-btn>
            </v-flex>
        </v-flex>
    </v-form>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
import axios from "axios";
export default {
    data() {
        return {
            succesMessage: "User info Successfully Updated",
            succesFiled: false,
            selects: ["EVERYONE CAN SEE", "ONLY ME"],
            countrySelects: ['China', 'Laos'],
            genders: ["male", "female"],
            countselects: [],
            profile: {
                avatar: "",
                country: "",
                created_at: "",
                currencyId: "",
                email: "",
                gender: "",
                id: "",
                lastActivity: "",
                lastLoginAt: "",
                memberShip: "",
                name: "",
                portalProvider: "",
                rolling: "",
                totalBet: "",
                totalOnlineTime: "",
                userApiId: "",
                userBalance: "",
                userId: "",
                userIp: "",
                userStatus: "",
                rolling: "",
                // value from select
                idSelect: "",
                nameSelect: "",
                genderSelect: "",
                emailSelect: "",
                membershipSelect: "",
                countrySelect: "",
                balanceSelect: "",
                rollingSelect: ""
            },
            time: "",
        };
    },

    computed: {
        ...mapGetters(["getBalance", "getUserName", "getOnlimeTime"])
    },
    mounted() {
        this.profile = this.getUserName;
    },

    methods: {
        ...mapActions(["asynUserInfo"]),
        formatToPrice(value) {
            return `$ ${Number(value)
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
        },
        async updateProfile() {
            this.DataProfile = {
                name: this.profile.name,
                email: this.profile.email,
                gender: this.profile.gender,
                country: this.profile.country,
                portalProvider: this.profile.portalProvider,
                avatar: this.profile.avatar,
                memberShip: this.profile.memberShip
            }
            console.log(this.DataProfile)

            let res = await this.$axios.$post("/api/me/editProfile?apikey=" + this.$store.state.auth_token, this.DataProfile);
            console.log(res);
            res.status ? this.asynUserInfo() : '';
            this.succesFiled = true;
            this.succesMessage = "User info Successfully Updated";
        },

        setTime(seconds, val) {
            let days = Math.floor(seconds / (24 * 60 * 60));
            seconds -= days * (24 * 60 * 60);
            let hours = Math.floor(seconds / (60 * 60));
            seconds -= hours * (60 * 60);
            let minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;
            if (val == 1) {
                return (
                    (0 < days ? days + this.$root.$t("msg.days") + ", " : "") +
                    hours +
                    this.$root.$t("msg.hours") +
                    ", " +
                    minutes +
                    this.$root.$t("msg.minute")
                );
            } else {
                return (
                    hours +
                    this.$root.$t("msg.hours") +
                    ", " +
                    minutes +
                    this.$root.$t("msg.minute")
                );
            }
        }
    }
};
</script>

<style scoped>
table tr td {
    text-transform: capitalize;
}

.select {
    width: 100px;
    margin: 0 auto;
}

.success {
    background-color: #4caf50;
    padding: 10px;
    margin: 5px;
    font-size: 18px;
    color: #333;
}
</style>
