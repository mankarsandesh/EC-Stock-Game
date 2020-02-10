<template>
<div>
    <v-container class="pa-0">
        <v-toolbar height="60" color="#fff" style="justify-content: center !importan;">
            <v-toolbar-title>
                <v-img width="158" src="/logo.png"></v-img>
            </v-toolbar-title>
            <v-spacer />
            <v-toolbar-items class="hidden-xs-only text-s1 macky-color" v-if="!$vuetify.breakpoint.smAndDown">
                <v-btn text flat @click="$refs.language.showDialog()">
                    <countryFlag :country="countryflag" size="normal" />
                </v-btn>
                <v-list class="pa-0">
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img src="https://randomuser.me/api/portraits/men/85.jpg">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>{{getUserName.name}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <v-btn color="primary" @click="getLogout()" flat text icon>
                    <v-icon size="30">logout</v-icon>
                </v-btn>
            </v-toolbar-items>

            <v-btn text flat @click="$refs.language.showDialog()" v-if="$vuetify.breakpoint.smAndDown">
                <countryFlag :country="countryflag" size="normal" />
            </v-btn>
            <v-btn color="primary" @click="getLogout()" flat text icon v-if="$vuetify.breakpoint.smAndDown">
                <v-icon size="30">logout</v-icon>
            </v-btn>
        </v-toolbar>
        <languageDialog ref="language"></languageDialog>
    </v-container>

    <div class="bg-primary">
        <v-container fluid style="display: flex; padding-top: 2%;">
            <v-layout row justify-center align-center>
                <v-flex>
                    <div class="row justify-center align-center" style="display: flex;">
                        <img src="/logoder.png" style=" width: 30%; height: 30%;" v-if="!$vuetify.breakpoint.smAndDown">
                        <img src="/logoder.png" style=" width: 40%; height: 40%;" v-if="$vuetify.breakpoint.smAndDown">
                    </div>
                    <div class="row d-flex justify-center align-center">
                        <h1 class="text-center dashboard" style="color: aliceblue;">{{$t('msg.ChooseTheVersionToPlay')}}</h1>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container fluid fill-height>
            <v-layout row justify-center align-center>
                <v-flex xs6 sm3 px-2 class="card-mode classic">
                    <nuxt-link :to="stockname == '' ? '/classic/l-btc1-live':'/classic/l-'+stockname+'-live'">
                        <img src="/bg/classic.png" alt="mode classic">
                        <span class="font-size dashboard">{{$t('msg.ClassicVersion')}}</span>
                    </nuxt-link>
                </v-flex>
                <v-flex xs6 sm3 px-2 class="card-mode modern">
                    <nuxt-link :to="linkto">
                        <img src="/bg/modern.png" alt="mode modern">
                        <span class="font-size dashboard">{{$t('msg.ModernVersion')}}</span>
                    </nuxt-link>
                </v-flex>
            </v-layout>
        </v-container>

        <!-- <svg class="footer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f9e9c4" fill-opacity="1" d="M0,96L30,112C60,128,120,160,180,149.3C240,139,300,85,360,85.3C420,85,480,139,540,170.7C600,203,660,213,720,224C780,235,840,245,900,213.3C960,181,1020,107,1080,106.7C1140,107,1200,181,1260,186.7C1320,192,1380,128,1410,96L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z" />
        </svg> -->
        <v-layout class="copyright">
            <v-flex class="company-name">TNK</v-flex>
            <v-flex class="version-app">Version 1.0.0</v-flex>
        </v-layout>
    </div>

    <div class="preloader-wrap">
        <div class="imgsload">
            <img src="/logoder.png" alt class="setsize" />
        </div>
        <div class="percentage" id="precent"></div>
        <div class="loader">
            <div class="trackbar">
                <div class="loadbar"></div>
            </div>
            <div class="glow"></div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapGetters,
    mapMutations
} from "vuex";
import {
    isMobile
} from "mobile-device-detect";
import countryFlag from "vue-country-flag";
import languageDialog from "~/components/LanguageDialog";
import Logout from "~/components/Logout";
export default {
    layout: "nolayout",
    // middleware: 'getApiKey',
    components: {
        countryFlag,
        languageDialog,
        Logout
    },
    data() {
        return {
            stockname: "btc1",
            linkto: ''
        };
    },
    mounted() {
        this.getProgress();
        this.linkto = isMobile ? "/modern" : "/modern/desktop/" + this.stockname;
    },
    created() {
        this.stockname = window.location.search.split('?')[1].split('=')[1].split('&')[0];
        // console.log(this.stockname)
    },
    watch: {
        "$screen.width"() {
            if (this.$screen.width <= 1204) {
                this.linkto = "modern";
            } else {
                this.linkto = "/modern/desktop/" + stockname;
            }
        }
    },
    computed: {
        ...mapGetters([
            "getlocale", "getUserName"
        ]),
        countryflag() {
            return this.getlocale;
        }
    },
    methods: {
        getProgress() {
            let width = 100,
                perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
                EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
                time = parseInt((EstimatedTime / 1000) % 60) * 100;

            // Loadbar Animation
            $(".loadbar").animate({
                    width: width + "%"
                },
                time
            );

            // Loadbar Glow Animation
            $(".glow").animate({
                    width: width + "%"
                },
                time
            );

            // Percentage Increment Animation
            let PercentageID = $("#precent"),
                start = 0,
                end = 100,
                durataion = time;
            animateValue(PercentageID, start, end, durataion);

            function animateValue(id, start, end, duration) {
                let range = end - start,
                    current = start,
                    increment = end > start ? 1 : -1,
                    stepTime = Math.abs(Math.floor(duration / range)),
                    obj = $(id);

                let timer = setInterval(function () {
                    current += increment;
                    $(obj).text(current + "%");
                    //obj.innerHTML = current;
                    if (current == end) {
                        clearInterval(timer);
                    }
                }, stepTime);
            }

            // Fading Out Loadbar on Finised
            setTimeout(function () {
                $(".preloader-wrap").fadeOut(100);
            }, time);
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
};
</script>

<style lang="css" scoped>
body,
.container,
.light-toobar {
    background-color: transparent !important;
}

.classic {
    background-image: url("/bg/bg_premium.png");
    background-repeat: round;
}

.modern {
    background-image: url("/bg/bg_premium.png");
    background-repeat: round;
}

.font-size {
    color: #FFF;
    font-size: 1.6rem;
    display: block;
    font-family: fantasy;
}

.imgsload {
    text-align: center;
    margin-top: 12%;
}

.preloader-wrap {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    background: #003f70;
    z-index: 200;
}

.percentage {
    z-index: 100;
    border: 1px solid #ccc;
    text-align: center;
    color: #fff;
    line-height: 30px;
    font-size: 15px;
}

@media only screen and (max-width: 414px) {

    .loader,
    .percentage {
        height: 30px;
        max-width: 75%;
        border: 2px solid #ffc107;
        border-radius: 20px;
        font-weight: 300;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }

    .setsize {
        width: 380px !important;
    }

    .imgsload {
        text-align: center;
        margin-top: 42% !important;
    }
}

@media only screen and (max-width: 812px) {

    .loader,
    .percentage {
        height: 30px;
        max-width: 75%;
        border: 2px solid #ffc107;
        border-radius: 20px;
        font-weight: 300;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }

    .setsize {
        width: 380px !important;
    }

    .imgsload {
        text-align: center;
        margin-top: 2%;
    }
}

@media only screen and (min-width: 1024px) {

    .loader,
    .percentage {
        height: 30px;
        max-width: 40%;
        border: 2px solid #ffc107;
        border-radius: 20px;
        font-weight: 300;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }

    .setsize {
        width: 35% !important;
    }

    .imgsload {
        text-align: center;
        margin-top: 9%;
    }
}

.loader:after,
.percentage:after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.trackbar {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    color: #fff;
    text-align: center;
    line-height: 30px;
    overflow: hidden;
    position: relative;
    opacity: 0.99;
}

.loadbar {
    width: 0%;
    height: 100%;
    background: repeating-linear-gradient(45deg,
            #ffc107,
            #ffc107 10px,
            #ffc107 10px,
            #ffc107 20px);
    /* Stripes Background Gradient */
    box-shadow: 0px 0px 14px 1px #ffc107;
    position: absolute;
    top: 0;
    left: 0;
    animation: flicker 5s infinite;
    overflow: hidden;
}

.glow {
    width: 0%;
    height: 0%;
    border-radius: 20px;
    box-shadow: 0px 0px 60px 10px #ffc107;
    position: absolute;
    bottom: -5px;
    animation: animation 5s infinite;
}

@keyframes animation {
    10% {
        opacity: 0.9;
    }

    30% {
        opacity: 0.86;
    }

    60% {
        opacity: 0.8;
    }

    80% {
        opacity: 0.75;
    }
}

.wrap {
    background-position: left top;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
}
</style>
