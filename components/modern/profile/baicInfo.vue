<template>
<div>
    <div :class="colors" v-if="succesFiled">
        {{ this.succesMessage }}
    </div>

    <div class="d-between">
        <v-tooltip right>
            <template #activator="{ on: tooltip }">
                <v-avatar size="150" @click="dialog = !dialog">
                    <img v-on="{ ...tooltip }" :src="profile.avatar" v-if="profile.avatar != null" alt />
                    <img v-on="{ ...tooltip }" src="/user.png" v-else alt />
                </v-avatar>
            </template>
            <span>Edit Profile Picture</span>
        </v-tooltip>
    </div>

    <v-dialog v-model="dialog" max-width="450" persistent>
        <v-card>
            <v-card-title class="headline">Update Image Profile</v-card-title>
            <v-card-text style="text-align: center;">
                <uploadprofile />
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat="flat" @click.native="dialog = false,UpLoadimage('upload')">UpLoad</v-btn>
                <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <p style="float:right; color: #003e70;">
        {{$t("msg.online")}} {{$t("msg.Status")}} : {{setTime(getOnlimeTime.todayOnline, 0)}}
        <span>{{$t("msg.currentbalance")}} : {{formatToPrice(getBalance)}}</span>
    </p>

    <v-form @submit.prevent="updateProfile" v-show="isShow">
        <v-flex lg12>
            <table class="table table-striped">
                <tbody>
                    <tr>
                        <th scope="row" class="row">{{$t("msg.playerid")}}</th>
                        <td>{{profile.userApiId}}</td>
                        <td>
                            <v-select hide-details v-model="profile.idSelect" :items="selects" :label="$t('msg.everyonecansee')"></v-select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="row">{{$t("msg.name")}}</th>
                        <td>
                            {{profile.name}}
                            <popper trigger="click" :options="{placement: 'top-end',modifiers: { offset: { offset: '45px' } }}">
                                <div class="popper padding-4">
                                    <v-text-field v-model="profile.name" required></v-text-field>
                                </div>
                                <v-btn icon slot="reference">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                            </popper>
                        </td>
                        <td>
                            <v-select hide-details v-model="profile.nameSelect" :items="selects" :label="$t('msg.everyonecansee')"></v-select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="row">{{$t("msg.gender")}}</th>
                        <td>
                            <v-select class="select" v-if="profile.gender == 'male'" hide-details v-model="profile.genderSelect" :items="genders" :label="$t('msg.male')"></v-select>
                            <v-select class="select" v-else hide-details v-model="profile.genderSelect" :items="genders" :label="$t('msg.female')"></v-select>
                        </td>
                        <td>
                            <v-select hide-details v-model="profile.gender" :items="selects" :label="$t('msg.everyonecansee')"></v-select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="row">{{$t("msg.email")}}</th>
                        <td>
                            {{profile.email}}
                            <popper trigger="click" :options="{placement: 'top-end',modifiers: { offset: { offset: '45px' } }}">
                                <div class="popper padding-4">
                                    <v-text-field v-model="profile.email" required></v-text-field>
                                </div>
                                <v-btn icon slot="reference">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                            </popper>
                        </td>
                        <td>
                            <v-select hide-details v-model="profile.emailSelect" :items="selects" :label="$t('msg.everyonecansee')"></v-select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="row">{{$t("msg.membership")}}</th>
                        <td>{{profile.memberShip}} Stock God</td>
                        <td>
                            <v-select hide-details v-model="profile.membershipSelect" :items="selects" :label="$t('msg.everyonecansee')"></v-select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="row">{{$t("msg.country")}}</th>
                        <td>
                            <v-select class="select" hide-details v-model="profile.country" :items="countrySelects" :label="profile.countrySelect"></v-select>
                        </td>
                        <td>
                            <v-select hide-details v-model="profile.countrySelect" :items="selects" :label="$t('msg.everyonecansee')"></v-select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="row">{{$t('msg.Currency')}}</th>
                        <td>
                            USD
                        </td>
                        <td>
                            <v-select hide-details v-model="profile.countrySelect" :items="selects" :label="$t('msg.everyonecansee')"></v-select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="row">{{$t("msg.Balance")}}</th>
                        <td>{{formatToPrice(profile.userBalance)}}</td>
                        <td>
                            <v-select hide-details v-model="profile.balanceSelect" :items="selects" :label="$t('msg.everyonecansee')"></v-select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="row">{{$t("msg.rolling")}}</th>
                        <td>{{formatToPrice(profile.rolling)}}</td>
                        <td>
                            <v-select hide-details v-model="profile.rollingSelect" :items="selects" :label="$t('msg.everyonecansee')"></v-select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <v-flex>
                <v-btn class="my-btn" type="submit">{{$t("msg.save")}}</v-btn>
                <v-btn class="my-btn cancel">{{$t("msg.cancel")}}</v-btn>
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
import popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
import uploadprofile from "./UploadFile"
export default {
    components: {
        popper,
        uploadprofile
    },
    data() {
        return {
            succesMessage: "User info Successfully Updated",
            succesFiled: false,
            selects: [this.$root.$t('msg.everyonecansee'), this.$root.$t("msg.onlyme")],
            countrySelects: ['China', 'Laos'],
            genders: [this.$root.$t("msg.male"), this.$root.$t("msg.female")],
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
            dialog: false,
            colors: "",
            isShow: false
        };
    },

    computed: {
        ...mapGetters(["getBalance", "getUserName", "getOnlimeTime"])
    },
    mounted() {
        setTimeout(() => {
            this.profile = this.getUserName;
            this.isShow = true
        }, 1500);
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
                gender: this.profile.genderSelect ? this.profile.genderSelect : this.profile.gender,
                country: this.profile.country
                // portalProvider: this.profile.portalProvider,
                // avatar: this.profile.avatar,
                // memberShip: this.profile.memberShip
            }
            if (this.getUserName.name !== this.DataProfile.name || this.getUserName.email !== this.DataProfile.email || this.getUserName.gender !== this.DataProfile.gender) {
                let res = await this.$axios.$post("/api/me/editProfile?apikey=" + this.$store.state.auth_token, this.DataProfile);
                console.log(res);
                res.status ? this.asynUserInfo() : '';
                this.succesFiled = true;
                this.succesMessage = res.status ? "User info Successfully Updated" : "User info Update Failed!";
                this.colors = res.status ? "success" : "error"
                setTimeout(() => {
                    this.succesFiled = false
                }, 2000)
            }
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
        },
        UpLoadimage(val) {
            $("#Submit").click()[0]
        },

    }
};
</script>

<style scoped>
table tr td {
    text-transform: capitalize;
}

.float-left {
    float: left;
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

.error {
    background-color: red;
    padding: 10px;
    margin: 5px;
    font-size: 18px;
    color: #333;
}

.images {
    display: -webkit-box !important;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: baseline;
    align-items: baseline;
}

.padding-4 {
    padding: 4px;
}
</style>
