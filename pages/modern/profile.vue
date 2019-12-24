<template>
<div>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar class="pa-1 light-toobar">
                <v-toolbar-title class="text-uppercase text-primary">
                    <h2>{{$t('msg.'+title)}}</h2>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="dialog = false">
                    <v-icon color="text-primary">clear</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-layout column px-5 pt-3>
                <v-flex xs-12 pt-2>
                    <label class="text-primary">
                        <h3>{{$t('msg.'+title)}}</h3>
                       
                    </label>
                <v-text-field :label="val"   v-model="val" single-line outline full-width color="#003e70" ></v-text-field>
                    <!-- <v-select v-if="title == 'gender'" :items="gender" v-model="filedName" outline></v-select> -->
                </v-flex>
                <v-flex xs-12 pt-2>
                    <label class="text-primary">
                        <h3>Privacy </h3>
                    </label>
                    <!-- <v-text-field label="EVERY ONE CAN SEE" single-line outline full-width color="#003e70"></v-text-field> -->
                    <v-select :items="itemstest" v-model= "privacy" outline></v-select>
                </v-flex>
            </v-layout>

            <!-- apply button -->

            <v-layout style="bottom: 0;position: fixed;width: 100%; background-color:#003e70">
                <v-btn block color="#003e70"  @click="saveData"  large class="white--text">save</v-btn>
            </v-layout>

        </v-card>
    </v-dialog>
    <!-- profile -->
    <v-divider></v-divider>
    <v-toolbar class="pa-3 light-toobar">
        <v-avatar color="indigo" size="58">
            <v-icon dark>account_circle</v-icon>
        </v-avatar>
        <div class="pl-4 text-primary">
            <ul>
                <li>
                    <b>{{$t('msg.Balance')}}: {{formatToPrice(getBalance)}}</b>
                </li>
                <li>
                    <b>{{$t('msg.online')}} {{$t('msg.Status')}} : {{setTime(getOnlimeTime.todayOnline,0)}}</b>
                </li>
            </ul>
        </div>
    </v-toolbar>
    <v-divider></v-divider>

    <v-list two-line class="mx-4">
        <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>

            <v-divider class="dashed" v-else-if="item.divider" :key="index"></v-divider>

            <v-list-tile v-else :key="item.title" avatar class="mt-2">
                <!-- <v-list-tile-avatar>
            <img :src="item.avatar" />
          </v-list-tile-avatar>-->
                <v-layout row wrap>
                    <!-- <v-list-tile-content> -->
                    <v-flex xs8>
                        <v-list-tile-title class="text-primary" v-html=" $t('msg.'+item.title)"></v-list-tile-title>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs4 style="text-align: end" v-if="item.title != 'Balance'&& item.title != 'rolling'">
                        <v-icon @click="dialog = true, edit(item.title, item.info)">edit</v-icon>
                    </v-flex>

                    <v-list-tile-sub-title class="pt-2">
                        <v-layout row wrap>
                            <span v-if="item.info != null">{{item.info}}</span>
                             <span v-if="item.info == null">No Data</span>
                        </v-layout>
                    </v-list-tile-sub-title>
                    <!-- </v-list-tile-content> -->
                </v-layout>
            </v-list-tile>
        </template>
    </v-list>
    <!-- online history -->
    <v-divider></v-divider>
    <v-toolbar class="pa-3 light-toobar">
        <v-toolbar-title class="text-uppercase text-primary">{{$t('profile.online history')}}</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon @click="getdialog = true,getcomonent('onlinehistory')" >
            <v-icon color="text-primary">add</v-icon>
        </v-btn>
    </v-toolbar>
    <!-- stock analysis -->
    <v-divider></v-divider>
    <v-toolbar class="pa-3 light-toobar">
        <v-toolbar-title class="text-uppercase text-primary">{{$t('profile.stock analysis')}}</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon @click="getdialog = true,getcomonent('stockAnalysis')">
            <v-icon color="text-primary">add</v-icon>
        </v-btn>
    </v-toolbar>

    <v-dialog v-model="getdialog" fullscreen hide-overlay>
        <v-card>
            <v-toolbar class="pa-1 light-toobar">
                <v-toolbar-title class="text-uppercase text-primary">
                    <h3 v-if="iscomonent == 'onlinehistory'">{{$t('profile.online history')}}</h3>
                    <h3 v-else>{{$t('profile.stock analysis')}}</h3>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="getdialog = false">
                    <v-icon color="text-primary">clear</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-layout column  pt-3>
                <onlinehistory v-if="iscomonent == 'onlinehistory'" />
                <stockAnalysis v-else />
            </v-layout>

        </v-card>
    </v-dialog>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
import onlinehistory from "~/components/modern/profile/onlineHistory"
import stockAnalysis from "~/components/modern/profile/stockAnalysis"
export default {
    components: {
        onlinehistory,
        stockAnalysis
    },
    computed: {
        ...mapGetters(["getBalance", "getUserName", "getOnlimeTime"])
    },
    data() {
        return {
            privacy : "Only Me",
            filedName: "Male",
            gender : ["Male","Female"],
            itemstest: ["Only Me", "Everyone Can See"],
            dialog: false,
            getdialog: false,
            items: [],
            title: "",
            val: "",
            iscomonent: ""
        };
    },
    mounted() {
    console.log("created");
    console.log(this.getUserName);
        setTimeout(() => {
            this.items = [
                //   { header: 'Today' },
                {
                    title: "name",
                    info: this.getUserName.name
                },
                {
                    divider: true,
                    inset: true
                },
                {
                    title: "gender",
                    info: this.getUserName.gender
                },
                {
                    divider: true,
                    inset: true
                },
                {
                    title: "email",
                    info: this.getUserName.email
                },
                {
                    divider: true,
                    inset: true
                },
                {
                    title: "membership",
                    info: this.getUserName.memberShip
                },
                {
                    divider: true,
                    inset: true
                },
                {
                    title: "country",
                    info: this.getUserName.country
                },
                {
                    divider: true,
                    inset: true
                },
                {
                    title: "Balance",
                    info: this.formatToPrice(this.getUserName.userBalance)
                },
                {
                    divider: true,
                    inset: true
                },
                {
                    title: "rolling",
                    info: this.formatToPrice(this.getUserName.rolling)
                }
            ];
        }, 1000);
    },
    methods: {
        saveData(){
          console.log(this.val);
          console.log(this.privacy);
          console.log(this.getUserName.userId);  
            },
        getcomonent(val) {
            this.iscomonent = val;
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
        edit(title, val) {
            this.title = title;
            this.val = val;
        },
        formatToPrice(value) {
            return `$ ${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
        }
    }
};
</script>

<style scoped>
.dashed {
    border-top: 1px dashed !important;
    opacity: 0.4 !important;
}
.v-toolbar__title{
    font-size: 15px !important;
}
.v-list--two-line .v-list__tile {
    height: 60px;
}
/* .v-icon .material-icons theme--light{
    color: rgb(255, 255, 255);
    font-size: 42px;
    background-color: #003e70;
    padding: 7px 3px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
} */
.dot:before {
    content: ".";
    color: "gray";
    font-weight: 900;
    border: 3px;
}
</style>
