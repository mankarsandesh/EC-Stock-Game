<template>
<v-dialog v-model="dialogStockAnalysis" fullscreen hide-overlay transition="dialog-bottom-transition" light>
    <v-card>
        <v-toolbar flat>
            <v-layout row>
                <v-spacer></v-spacer>
                <v-icon size="20" @click="dialogStockAnalysis=false">close</v-icon>
            </v-layout>
        </v-toolbar>

        <v-flex xs12 md8 class="pt-2 pl-5 pr-5 text-xs-center">
            <div>
                <h2 class="title_menu">{{$t('profile.stock analysis')}}</h2>
                <v-divider></v-divider>
            </div>
        </v-flex>

        <v-flex xs12 md12 v-if="$vuetify.breakpoint.xs" class="profile_head text-xs-center">
            <div class="image_container">
                <v-avatar :size="90">
                    <img :src="imgProfile" alt="img-profile" />
                </v-avatar>
                <span class="camera_container" style="position: absolute; top: 23%;">
                    <v-icon color="black" :size="20">photo_camera</v-icon>
                </span>
                <!-- <span class="blur-img">uploading</span> -->
            </div>
            <h3>{{getUserInfo.firstName}} {{getUserInfo.lastName}}</h3>
            <p>{{$t('profile.online status')}} : {{getUserInfo.currentActiveTime}}</p>
            <v-divider></v-divider>
        </v-flex>

        <v-flex xs12 pt-3>
            <v-layout row>
                <v-flex xs2 md2 v-if="!$vuetify.breakpoint.xs" class="profile_head text-xs-center">
                    <div class="image_container">
                        <v-avatar :size="60">
                            <img :src="imgProfile" alt="img-profile" />
                        </v-avatar>
                        <span class="camera_container" style="position: absolute;top: 32%;left: 12%;">
                            <v-icon color="black" :size="20">photo_camera</v-icon>
                        </span>
                        <!-- <span class="blur-img">uploading</span> -->
                    </div>
                    <h3>{{getUserInfo.firstName}} {{getUserInfo.lastName}}</h3>
                    <p>{{$t('profile.online status')}} : {{getUserInfo.currentActiveTime}}</p>
                </v-flex>
                <!-- select start date  -->
                <v-flex xs5 sm3 mr-1 ml-1>
                    <div class="date_picker_container" @click="isShowDateStart = !isShowDateStart">
                        <div class="title_date_picker">
                            <span>{{$t('msg.from')}}</span>
                        </div>
                        <div class="date_picker">
                            <span class="select_date">{{startDate}}</span>
                            <span class="icon_date">
                                <v-icon>date_range</v-icon>
                            </span>
                        </div>
                    </div>
                    <div style="position:absolute;z-index:1">
                        <v-date-picker v-if="isShowDateStart" v-model="startDate" @input="isShowDateStart = false"></v-date-picker>
                    </div>
                </v-flex>
                <!-- select end date -->
                <v-flex xs5 sm3 mr-1>
                    <div class="date_picker_container" @click="isShowDateEnd = !isShowDateEnd">
                        <div class="title_date_picker">
                            <span>{{$t('msg.to')}}</span>
                        </div>
                        <div class="date_picker">
                            <span class="select_date">{{endDate}}</span>
                            <span class="icon_date">
                                <v-icon>date_range</v-icon>
                            </span>
                        </div>
                    </div>
                    <div style="position:absolute;z-index:1">
                        <v-date-picker v-if="isShowDateEnd" v-model="endDate" @input="isShowDateEnd = false"></v-date-picker>
                    </div>
                </v-flex>

                <v-flex xs1 sm1 ml-1 mr-4>
                    <div class="date_picker_container">
                        <div class="title_date_picker">
                            <span></span>
                        </div>
                        <button class="buttonGreen btn-go">GO</button>
                    </div>
                </v-flex>
                <v-flex xs5 sm4 v-if="!$vuetify.breakpoint.xs">
                    <div class="date_picker_container">
                        <div class="title_date_picker">
                            <span>{{$t('msg.sortby')}}</span>
                        </div>
                        <div class="date_picker">

                            <v-menu offset-y>
                                <template v-slot:activator="{ on }">
                                    <span class="select_date">2020-02-12</span>
                                    <span class="icon_date">
                                        <v-icon v-on="on">arrow_drop_down</v-icon>
                                    </span>
                                </template>
                                <v-list>
                                    <v-list-tile v-for="(item, index) in items" :key="index">
                                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>
                        </div>
                    </div>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex xs12 sm12 pt-3 v-if="$vuetify.breakpoint.xs">
            <v-layout row>
                <v-flex xs3 sm3>
                    <div class="title_date_picker mt-2">
                        <span>{{$t('msg.sortby')}}</span>
                    </div>
                </v-flex>
                <v-flex xs5 sm5>
                    <div class="date_picker_container">
                        <div class="date_picker">
                            <v-menu offset-y>
                                <template v-slot:activator="{ on }">
                                    <span class="select_date">2020-02-12</span>
                                    <span class="icon_date">
                                        <v-icon v-on="on">arrow_drop_down</v-icon>
                                    </span>
                                </template>
                                <v-list>
                                    <v-list-tile v-for="(item, index) in items" :key="index">
                                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                    </v-list-tile>
                                </v-list>
                            </v-menu>
                        </div>
                    </div>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex xs12 sm12 md10 lg10 mt-4>
            <v-layout row>
                <v-flex xs1 sm2>
                </v-flex>
                <v-flex xs10 sm8>
                    <div class="chart_container">
                        <div class="chart-map-color">
                            <span v-for="(color,index) in colors[0]" :key="index">
                                <span class="circle-color" :style="{backgroundColor:color}"></span>
                                <span style="margin-right:10px">{{stocks[index]}}</span>
                            </span>
                        </div>
                        <apexchart type="bar" height="250vh" :options="chartOptions" :series="series"></apexchart>
                    </div>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-card>
</v-dialog>
</template>

<script>
import apexchart from "vue-apexcharts";
import {
    mapGetters,
    mapActions
} from "vuex";
import axios from "axios";
import popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
import uploadprofile from "./UploadFile";
import config from '../../config/config.global';
// set color win and lose color in bar chart
let index = 0;
let barColor = [
    ["#67c9d3", "#f75b54", "#fcc624"],
    ["#81eaf5", "#f9a5a3", "#fddf84"]
];
export default {
    components: {
        apexchart: apexchart
    },
    created() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        let yyyy = today.getFullYear();
        this.startDate = yyyy + "-" + mm + "-" + dd;
        this.endDate = yyyy + "-" + mm + "-" + dd;
    },
    computed: {
        ...mapGetters(["getUserInfo", "getPortalProviderUUID", "getUserUUID", "getUserInfo"]),
        imgProfile() {
            return this.getUserInfo.profileImage == "" || this.getUserInfo.profileImage == undefined ? "/user.png" : `${config.apiDomain}/` + this.getUserInfo.profileImage;
        },
    },
    destroyed() {
        index = 0; // reset index
    },
    updated() {
        index = 0; // reset index
    },

    data() {
        return {
            colors: barColor,
            // match with color by index
            // 'barColor' variable above
            stocks: [
                "US Dollar Index",
                "BTC/USD1",
                "BTC/USD5",
                "SH000001",
                "SZ399001",
                "SZ399415",
                "SH000300"
            ],
            isShowDateStart: false,
            isShowDateEnd: false,
            startDate: "",
            endDate: "",
            items: [{
                    title: "Click Me"
                },
                {
                    title: "Click Me"
                },
                {
                    title: "Click Me"
                },
                {
                    title: "Click Me 2"
                }
            ],
            series: [{
                    name: "win",
                    data: [44, 55, 41]
                },
                {
                    name: "lose",
                    data: [13, 80, 20]
                }
            ],
            chartOptions: {
                colors: [
                    // console.log(this.series)
                    function ({
                        value,
                        seriesIndex,
                        w
                    }) {
                        let color = "";
                        color = barColor[index][seriesIndex];
                        if (seriesIndex == 2 && index == 0) {
                            color = barColor[index][seriesIndex];
                            index = 1;
                        }
                        return color;
                    }
                ],
                grid: {
                    show: true,
                    borderColor: "#90A4AE",
                    strokeDashArray: 0,
                    position: "back",
                    xaxis: {
                        lines: {
                            show: true
                        }
                    },
                    yaxis: {
                        lines: {
                            show: true
                        }
                    },
                    row: {
                        colors: undefined,
                        opacity: 0.5
                    },
                    column: {
                        colors: undefined,
                        opacity: 0.5
                    },
                    padding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }
                },
                dataLabels: {
                    enabled: false
                },
                chart: {
                    type: "bar",
                    stacked: true,
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: "bottom",
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        distributed: true
                    }
                },
                xaxis: {
                    labels: {
                        show: false
                    },
                    type: "datetime",
                    categories: [
                        "01/01/2011 GMT",
                        "01/02/2011 GMT",
                        "01/03/2011 GMT",
                        "01/04/2011 GMT",
                        "01/05/2011 GMT",
                        "01/06/2011 GMT",
                        "01/07/2011 GMT",
                        "01/08/2011 GMT",
                        "01/09/2011 GMT",
                        "01/10/2011 GMT"
                    ]
                },
                legend: {
                    itemMargin: {
                        horizontal: 10,
                        vertical: 10
                    },
                    show: false,
                    position: "top",
                    horizontalAlign: "right",
                    offsetX: 40
                },
                fill: {
                    opacity: 1
                }
            },
            dialogStockAnalysis: false
        };
    },
    methods: {
        showDialogStockAnalysis() {
            this.dialogStockAnalysis = true;
        },
        ...mapActions(["asynUserInfo"]),
        showDialogOnlineHistory() {
            this.dialogOnlineHistory = true;
        },
        async getOnlineHistory() {
            try {
                const res = await this.$axios.$post(
                    config.getUserProfile.url, {
                        portalProviderUUID: this.getPortalProviderUUID,
                        userUUID: this.getUserUUID,
                        dateRangeFrom: "2020-02-02",
                        dateRangeTo: "2020-02-28"
                    }, {
                        headers: {
                            Authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh"
                        }
                    }
                );
                if (res.code === 200) {
                    this.chartData = [1500];
                    this.xaxis = ["2020-02-26"];
                    let result = res.data[0].activeTimeDateWise;
                    console.log("result online chart");
                    console.log(res);
                    console.log("result online chart");
                    result.forEach(element => {
                        this.chartData.push(parseInt(element.activeTimeInMins));
                        this.xaxis.push(element.Date);
                    });
                    console.log(this.chartData);
                    console.log(this.xaxis);
                } else {
                    console.log(res);
                    // alert(res.message);
                }
            } catch (ex) {
                console.error(ex);
                // alert(ex.message);
            }
        }
    },
};
</script>

<style scoped>
.btn-go {
    width: 45px !important;
    height: 42px !important;
    font-size: 16px !important;
}

li {
    list-style-type: none;
}

.chart-map-color {
    position: relative;
    float: right;
    margin-top: 15px;
    display: inline-block;
}

.circle-color {
    position: relative;
    display: inline-block;
    top: 2px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
}

button {
    background-color: green;
    padding: 10px;
    width: 60px;
    color: #ffffff;
    border-radius: 10px;
    font-weight: bold;
}

button:focus {
    outline: none;
}

.title_menu {
    padding-bottom: 15px;
    text-transform: capitalize;
    color: #353333;
}

.date_picker_container {
    text-transform: capitalize;
    cursor: pointer;
}

.chart_container {
    background-color: white;
    color: black;
    padding: 10px;
    box-shadow: 0px 2px 5px rgb(145, 145, 145);
    border-radius: 10px;
    width: 100%;
    min-height: 320px;
}

.date_picker {
    background-color: white;
    color: black;
    padding: 10px;
    box-shadow: 0px 2px 5px rgb(145, 145, 145);
    border-radius: 10px;
    position: relative;
    width: 120px;
}

.title_date_picker {
    padding-left: 10px;
    padding-bottom: 5px;
    color: #353333;
    text-transform: uppercase;
    min-height: 30px;
}

.icon_date {
    float: right;
    margin-top: -2px;
}

.select_date {
    text-transform: uppercase;
}
</style>
