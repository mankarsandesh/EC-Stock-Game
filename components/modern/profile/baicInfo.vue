<template>
<div>
    <div :class="colors" v-if="succesFiled">
        {{ this.succesMessage }}
    </div>

    <div class="d-between">
        <v-tooltip right>
            <template #activator="{ on: tooltip }">
                <v-avatar size="180" @click="dialog = !dialog">
                    <img v-on="{ ...tooltip }" :src="profile.avatar ? profile.avatar:'/v.png'" alt />
                </v-avatar>
            </template>
            <span>Click Image For Edit</span>
        </v-tooltip>
    </div>

    <v-dialog v-model="dialog" max-width="450" persistent>
        <v-card>
            <v-card-title class="headline">Update Image Profile</v-card-title>
            <v-card-text style="text-align: center;">
                <v-avatar size="200" v-if="imageUrl">
                    <img :src="imageUrl" />
                </v-avatar>
                <br>
                <br>
                <br>
                <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
                <input type="file" id="fileInput" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat="flat" @click.native="dialog = false,UpLoadupdateimage()">UpLoad</v-btn>
                <v-btn color="green darken-1" flat="flat" @click.native="dialog = false, Closeupdate()">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <p style="float:right; color: #003e70;">
        {{$t('msg.online')}} {{$t('msg.Status')}} : {{setTime(getOnlimeTime.todayOnline, 0)}}
        <span>{{$t('msg.currentbalance')}} : {{formatToPrice(getBalance)}}</span>
    </p>

    <v-form @submit.prevent="updateProfile" v-show="this.getUserName != ''">
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
            dialog: false,
            colors: "",
            imageName: '',
            imageUrl: '',
            imageFile: '',
        };
    },

    computed: {
        ...mapGetters(["getBalance", "getUserName", "getOnlimeTime"])
    },
    mounted() {
        setTimeout(() => {
            this.profile = this.getUserName;
        }, 1000);
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
            this.succesMessage = res.status ? "User info Successfully Updated" : "User info Update Failed!";
            this.colors = res.status ? "success" : "error"
            setTimeout(() => {
                this.succesFiled = false
            }, 2000)
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

        pickFile() {
            this.$refs.image.click()
        },

        onFilePicked(e) {
            const files = e.target.files
            this.imageNames = e.target.files[0]
            if (files[0] !== undefined) {
                this.imageName = files[0].name
                if (this.imageName.lastIndexOf('.') <= 0) {
                    return
                }
                const fr = new FileReader()
                fr.readAsDataURL(files[0])
                fr.addEventListener('load', () => {
                    this.imageUrl = fr.result
                    this.imageFile = files[0] // this is an image file that can be sent to server...
                })
            } else {
                this.imageName = ''
                this.imageFile = ''
                this.imageUrl = ''
            }
            console.log(this.imageName)
            console.log(this.imageFile)
            console.log(this.imageUrl)
        },
        Closeupdate() {
            this.imageUrl = '';
            $("input[type=file]").val("");

        },
        async UpLoadupdateimage() {
            if (this.imageUrl == '' || this.imageUrl == null) {
                alert("No Iamge Update")
                return;
            }
            let res = await this.$axios.$post("/api/me/uploadImage?apikey=" + this.$store.state.auth_token, {
                userId: this.getUserName.userId,
                image: this.imageUrl
            });
            console.log(res)
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
</style>
