<template>
<div style="z-index:100">
    <v-menu offset-y :close-on-content-click="false" :min-width="180">
        <template v-slot:activator="{ on }">
            <v-btn flat v-on="on" v-show="isShow == 'classic'">
                <v-icon size="30">account_circle</v-icon>
            </v-btn>
            <v-btn flat v-on="on" v-show="isShow == 'modern'">
                <v-avatar size="40">
                    <img src="/user.png" alt />
                </v-avatar>
                <div class="userLogoutMenu">
                    <span>{{getUserName.name}}</span>
                    <span >
                        {{$t('msg.acc')}}:
                        <animated-number :value="getBalance" :formatValue="formatToPrice" class="balance" />
                    </span>
                </div>
                <!-- <i class="fa fa-caret-down" /> -->
            </v-btn>
        </template>
        <!-- <v-list>
            <div v-show="isShow == 'classic'" style="display: inline-grid;justify-items: center;width: 100%;">
                <v-avatar size="90">
                    <img src="/user.png" alt />
                </v-avatar>
                <span>{{getUserName.name}}</span>
                <span>{{getUserName.email}}</span>
            </div>
            <v-list-tile @click="dialogprofile = true" v-show="isShow == 'classic'">
                <v-list-tile-title>Profile</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="$router.push('/modern/profile');" v-show="isShow == 'modern'">
                <i class="fa fa-user fa-2x margin-right-5" />
                <v-list-tile-title> {{$t('menu.profile')}}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="$router.push('/modern/profile');" v-show="isShow == 'modern'">
                <i class="fa fa-hourglass-half fa-15x margin-right-5" />
                <v-list-tile-title> {{$t('profile.online history')}}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="$router.push('/modern/profile');" v-show="isShow == 'modern'">
                <i class="fa fa-line-chart fa-15x margin-right-5" />
                <v-list-tile-title> {{$t('profile.stock analysis')}}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="getLogout()">
                <i class="fa fa-lock fa-2x margin-right-5" />
                <v-list-tile-title> Sign Out</v-list-tile-title>
            </v-list-tile>
        </v-list> -->
    </v-menu>

    <v-dialog v-model="dialogprofile" max-width="1240px">
        <v-card>
            <v-card-actions>
                <v-spacer></v-spacer>
                <button class="cancel" @click="dialogprofile = false">X</button>
            </v-card-actions>
            <v-card-text>
                <profile v-if="dialogprofile" />
            </v-card-text>
        </v-card>
    </v-dialog>

</div>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
import {
    mapGetters,
    mapActions,
    mapMutations
} from "vuex";
import profile from "~/pages/modern/desktop/profile";
export default {
    components: {
        profile,
        AnimatedNumber
    },
    data() {
        return {
            dialogprofile: false,
            isShow: "",
        }
    },
    computed: {
        ...mapGetters([
            "getUserName",
            "getBalance"
        ]),
    },
    mounted() {
        this.isShow = location.pathname.split("/")[1]
    },
    methods: {
        formatToPrice(value) {
            return `$ ${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
        },
        getLogout() {
            this.$swal({
                title: "Are you sure?",
                text: "Did you leave the EC Gaming page?",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes, Logout!",
                cancelButtonText: "No, Cancel Logout!",
                closeOnConfirm: false,
                closeOnCancel: false
            }).then(isConfirm => {
                if (isConfirm.value) {
                    this.$swal({
                        title: "Good Bye EC Gaming!",
                        type: "success",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(Confirm => {
                        this.$store.state.auth_token = []
                        localStorage.apikey = []
                        window.close()
                    })
                } else {
                    this.$swal({
                        title: "Cancelled Logout",
                        type: "error",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
        }
    }
}
</script>

<style scoped>

.v-menu__content{
    border-radius: 15px;
}
.v-list{
    padding: 0px;
}
.userLogoutMenu{
    font-size: 12px;
    float:left;
    text-align: left;

    display: inline-grid;
}
.userLogoutMenu .balance{
    color:#003f70;
    font-size: 16px;
}
.v-list__tile i{
font-size: 6px;
}
.v-list__tile .v-list__tile__title{
    margin-left:5px;
   text-transform: capitalize;
   font-size: 14px;
}
.fa-15x {
    font-size: 1.45em;
}

.margin-right-5 {
    margin-right: 5px;
}


.v-avatar {
    -webkit-box-align: center;
    align-items: center;
    border-radius: 50%;
    display: -webkit-inline-box;
    display: inline-flex;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    text-align: center;
    vertical-align: middle;
    border: 2px solid;
}
</style>