<template>
<div>
    <v-menu offset-y :close-on-content-click="false" :nudge-width="150">
        <template v-slot:activator="{ on }">
            <v-btn color="primary" flat icon v-on="on">
                <v-icon size="30">account_circle</v-icon>
            </v-btn>
        </template>
        <v-list>
            <div style="display: inline-grid;justify-items: center;width: 100%;">
                <v-avatar size="90">
                    <img src="/user.png" alt />
                </v-avatar>
                <span>{{getUserName.name}}</span>
                <span>{{getUserName.email}}</span>
            </div>
            <v-list-tile @click="dialogprofile = true" v-show="isShow == 'classic'">
                <v-list-tile-title>Profile</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="$router.push('/modern/desktop/profile');" v-show="isShow == 'modern'">
                <v-list-tile-title>Profile</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="getLogout()">
                <v-list-tile-title>Sing Out</v-list-tile-title>
            </v-list-tile>
        </v-list>
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
import {
    mapGetters,
    mapActions,
    mapMutations
} from "vuex";
import profile from "~/pages/modern/desktop/profile";
export default {
    components: {
        profile
    },
    data() {
        return {
            dialogprofile: false,
            isShow: ""
        }
    },
    computed: {
        ...mapGetters([
            "getUserName"
        ]),
    },
    mounted() {
        this.isShow = location.pathname.split("/")[1]
    },
    methods: {
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
                        this.$store.state.auth_token= [] 
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
