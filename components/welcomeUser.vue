<template>
<div>
    <h4>
        {{$t('home.welcome')}}
        <span class="warning--text">{{getUserName.name}},</span> {{$t('home.yourcurrentbalanceis')}}
        <span class="warning--text">{{formatToPrice(getBalance)}}</span>
        {{$t('home.goodluck')}}！
        <span :style="'padding: 0% 2%;color:'+color" v-if="snackbar"><i class="fa fa-bell" style="color: yellow;" v-if="betPrice>0"/> {{text}} {{formatToPrice(betPrice)}}</span>
     
    </h4>
</div>
</template>

<script>
import openSocket from "socket.io-client";
import {
    mapGetters
} from "vuex";
export default {
    computed: {
        ...mapGetters(["getBalance", "getUserName"])
    },
    data() {
        return {
            text: "",
            color: "",
            betPrice: "",
            snackbar: false
        }
    },
    mounted(){
      this.getTime()
    },
    methods: {
        formatToPrice(value) {
            return `$ ${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
        },
        getTime() {
            const socket = openSocket("https://apitimer.herokuapp.com");
            socket.on("time", data => {
                let times, calculating, alert;
                if (this.$route.params.id == "btc1") {
                    times = data.btc1.timer;
                    calculating = 41;
                } else if (this.$route.params.id == "btc5") {
                    times = data.btc5.timer;
                    calculating = 241;
                } else if (this.$route.params.id == "usindex") {
                    times = data.usindex.timer;
                    calculating = 241;
                } else {
                    times = data.sh000001.timer;
                    calculating = 241;
                }
                
                if (times == calculating - 3) {
                    this.alertOutCome()
                    setTimeout(()=>{
                      this.snackbar = false
                    },10000)
                }
            });
        },
        async alertOutCome() {
            let totalPayout = await this.$axios.$get('/api/me/totalPayout?apikey=' + this.$store.state.auth_token)
            // console.log(totalPayout)
            if (totalPayout.status == false) return;
            this.snackbar = true;
            this.betPrice = totalPayout.data
            if (totalPayout.data > 0) {
                this.text = this.$root.$t('msg.winbet');
                this.color = "#FFFFFF";
                this.playSound('/voice/winbet.mp3')
            } else {
                this.text = this.$root.$t('msg.losebet');
                this.color = "red";
            }
        },
        playSound(sound) {
            if (sound) {
                let audio = new Audio(sound);
                audio.play();
            }
        }
    }
};
</script>

<style scoped>
.warning--text {
    text-transform: capitalize;
}
</style>
