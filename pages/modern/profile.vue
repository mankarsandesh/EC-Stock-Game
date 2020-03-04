<template>
<div>
    <v-flex xs12 v-if="$vuetify.breakpoint.xs">
        <v-layout row>
            <v-flex xs12 sm2 md4 lg3>
                <div class="profile_head text-xs-center">
                    <div class="image_container">
                        <v-avatar :size="90">
                            <img v-if="imageBase64==''" :src="imgProfile" alt="img-profile" />
                            <img :style="{ filter: `blur(${blurValue}px)`}" v-else :src="imageBase64" alt="img-profile" />
                        </v-avatar>
                        <span class="camera_container">
                            <button class="btn_camera">
                                <v-icon color="black" :size="20" @click="cameraClick">photo_camera</v-icon>
                            </button>
                        </span>
                    </div>
                    <h1>{{getUserInfo.firstName}} {{getUserInfo.lastName}}</h1>
                    <p>Online Status : 2hours</p>
                </div>
            </v-flex>
        </v-layout>
    </v-flex>

    <v-flex xs12>
        <v-layout row>
            <v-flex xs2 sm2 md4 lg3 v-if="!$vuetify.breakpoint.xs">
                <div class="profile_head text-xs-center">
                    <div class="image_container">
                        <v-avatar :size="90">
                            <img v-if="imageBase64==''" :src="imgProfile" alt="img-profile" />
                            <img :style="{ filter: `blur(${blurValue}px)`}" v-else :src="imageBase64" alt="img-profile" />
                        </v-avatar>
                        <span class="camera_container">
                            <button class="btn_camera">
                                <v-icon color="black" :size="20" @click="cameraClick">photo_camera</v-icon>
                            </button>
                        </span>
                    </div>
                    <h1>{{getUserInfo.firstName}} {{getUserInfo.lastName}}</h1>
                    <p>Online Status : 2hours</p>
                </div>
            </v-flex>

            <v-flex :class="$vuetify.breakpoint.xs ? 'xs6 sm6' : 'xs4 sm6' " md4 lg3>
                <div class="amount_container">
                    <div class="decorator_card decorator_card_green"></div>
                    <span>account balance</span>
                    <br />
                    <span class="amount">{{123456 | currency}}</span>
                    <span class="title_currentcy">kip</span>
                </div>
            </v-flex>

            <v-flex :class="$vuetify.breakpoint.xs ? 'xs6 sm6' : 'xs4 sm6' " md4 lg3>
                <div class="amount_container">
                    <div class="decorator_card decorator_card_blue"></div>
                    <span>rolling amount</span>
                    <br />
                    <span class="amount">{{161536 | currency}}</span>
                    <span class="title_currentcy">kip</span>
                </div>
            </v-flex>
        </v-layout>
    </v-flex>
    <v-flex xs12>
        <v-layout>
            <v-flex xs12 pt-2 pl-1>
                <div style="margin-top:20px">
                    <form action="/action_page.php" :style="$vuetify.breakpoint.xs ? 'text-align: end;':'text-align: end; margin-left: 22%'">
                        <div class="row">
                            <div class="col-15">
                                <label for="fname">player ID</label>
                            </div>
                            <div class="col-85">
                                <input disabled type="text" id="fname" name="firstname" :value="userData.PID" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-15">
                                <label for="lname">first name</label>
                            </div>
                            <div class="col-85">
                                <input ref="firstname" type="text" :value="userData.firstName" id="lname" name="lastname" placeholder="Your first name" />
                                <span class="icon-container">
                                    <v-icon :size="20" color="#bdbdbd" @click="iconClick($event)">edit</v-icon>
                                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-15">
                                <label for="lname">last name</label>
                            </div>
                            <div class="col-85">
                                <input ref="lastname" type="text" :value="userData.lastName" id="lname" name="lastname" placeholder="Your last name" />
                                <span class="icon-container">
                                    <v-icon :size="20" color="#bdbdbd" @click="iconClick($event)">edit</v-icon>
                                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-15">
                                <label for="country">gender</label>
                            </div>
                            <div class="col-85">
                                <select ref="gender" id="country" name="country">
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                </select>
                                <span class="icon-container">
                                    <v-icon :size="20" color="#bdbdbd">arrow_drop_down</v-icon>
                                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-15">
                                <label for="country">email</label>
                            </div>
                            <div class="col-85">
                                <input ref="email" type="text" :value="userData.email" id="lname" name="lastname" placeholder="mackychinma@gmail.com" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-15">
                                <label for="country">country</label>
                            </div>
                            <div class="col-85">
                                <select ref="country" id="country" name="country">
                                    <option value="china">China</option>
                                    <option value="usa">USA</option>
                                    <option value="thailand">Thailand</option>
                                    <option value="laos">Laos</option>
                                </select>
                                <span class="icon-container">
                                    <v-icon :size="20" color="#bdbdbd">arrow_drop_down</v-icon>
                                </span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-15"></div>
                            <div class="col-85">
                                <v-btn :loading="updating" :disabled="updating" class="btn_save" @click="saveClick()">save</v-btn>
                                <v-btn class="btn_cancel">cancel</v-btn>
                            </div>
                        </div>
                    </form>
                    <div class="row" style="text-align: -webkit-center;">
                        <v-btn :class="$vuetify.breakpoint.xs ? 'btn_save width-100' : 'btn_save width-50' " class="btn_save width-50" block><span class="padding-right-60">online history</span> <i class="fa fa-plus"></i></v-btn>
                        <v-btn :class="$vuetify.breakpoint.xs ? 'btn_save width-100' : 'btn_save width-50' " block><span class="padding-right-60">stock analysis</span> <i class="fa fa-plus"></i></v-btn>
                    </div>

                </div>
            </v-flex>
        </v-layout>
    </v-flex>
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
import uploadprofile from "~/components/modern/profile/UploadFile";

export default {
    data() {
        return {
            updating: false
        };
    },
    mounted() {},
    computed: {
        ...mapGetters(["getUserInfo", "getPortalProviderUUID", "getUserUUID"]),
        userData() {
            let data = {
                ...this.getUserInfo
            };
            return data;
        }
    },
    methods: {
        ...mapActions(["asynUserInfo"]),
        iconClick(e) {
            e.target.parentElement.parentElement.firstElementChild.focus();
        },
        async saveClick() {
            this.updating = true;
            const ref = this.$refs;
            let formData = new FormData();
            formData.append("portalProviderUUID", this.getPortalProviderUUID);
            formData.append("userUUID", this.getUserUUID);
            formData.append("email", ref.email.value);
            formData.append("firstName", ref.firstname.value);
            formData.append("lastName", ref.lastname.value);
            // formData.append("gender", ref.gender.value);
            // formData.append("country", ref.country.value);
            formData.append("version", 1);
            try {
                const res = await this.$axios.$post(
                    "http://uattesting.equitycapitalgaming.com/webApi/updateUserProfile",
                    formData, {
                        headers: {
                            ContentType: "application/json",
                            Authorization: "Basic VG5rc3VwZXI6VGVzdDEyMyE="
                        }
                    }
                );
                if (res.code === 200) {
                    this.asynUserInfo();
                    setTimeout(() => {
                        this.updating = false;
                    }, 1000);
                } else {
                    alert(res.message);
                    this.updating = false;
                    console.log(res);
                }
            } catch (ex) {
                console.error(ex);
                this.updating = false;
                alert(ex.message);
            }
        }
    }
};
</script>

<style scoped>
.padding-right-60 {
    padding-right: 60%;
}
    .width-50{
            width: 50%;
    }
     .width-100{
            width: 100%;
    }

/* .......form....... */
label {
    text-transform: capitalize;
}

input[type="text"]:disabled {
    background-color: #ccc;
}

input[type="text"],
select {
    width: 250px;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 15px;
    resize: vertical;
    background-color: white;
    padding-right: 35px;
}

select {
    cursor: pointer;
}

input:focus,
select:focus {
    outline: none;
}

label {
    padding: 12px 12px 12px 0;
    display: inline-block;
}

.col-15 {
    float: left;
    width: 24%;
    margin-top: 16px;
}

.col-85 {
    position: relative;
    float: left;
    width: auto;
    margin-top: 16px;
}

/* Clear floats after the columns */
.row:after {
    content: "";
    display: table;
    clear: both;
}

.btn_save {
    background-color: #38af3e !important;
    color: white;
    border-radius: 7px;
}

.btn_cancel {
    background-color: #656464 !important;
    color: white;
    border-radius: 7px;
}

.amount_container {
    background-color: white;
    color: black;
    padding: 10px 0 10px 0;
    margin-left: 20px;
    box-shadow: 0px 2px 5px rgb(145, 145, 145);
    border-radius: 15px;
    border-left-width: 1px;
    border-left-color: green;
    text-align: center;
    text-transform: capitalize;
    line-height: 1.1;
}

.amount {
    font-size: 15px;
    font-weight: bold;
    position: relative;
}

.title_currentcy {
    color: #888888;
    font-size: 14px;
    text-transform: uppercase;
    padding-left: 5px;
    position: absolute;
}

.decorator_card {
    position: absolute;
    height: 20px;
    width: 5px;
    border-radius: 10px;
    margin-top: 8px;
    margin-left: -2px;
}

.decorator_card_green {
    background-color: #39b01e;
}

.decorator_card_blue {
    background-color: #1e45b0;
}

.decorator_card_red {
    background-color: #b01e1e;
}

.icon-container {
    position: relative;
    right: 37px;
}

/* loading.... */
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
}

@-moz-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@-webkit-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@-o-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
