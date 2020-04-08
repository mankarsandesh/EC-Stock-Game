<template>
  <div>
    <h4>
      {{ $t("home.welcome") }}
      <span class="warning--text">{{ getUserName }},</span>
      {{ $t("home.yourcurrentbalanceis") }}
      <span class="warning--text">
        <animated-number value="15000" :formatValue="formatToPrice" />
      </span>
      {{ $t("home.goodluck") }}！
      <span class="slideInLeft" :style="' color:' + color" v-if="snackbar"
        ><i class="fa fa-bell" style="color: yellow;" v-if="betPrice > 0" />
        {{ text }}
        <animated-number :value="betPrice" :formatValue="formatToPrice" />
      </span>
    </h4>
  </div>
</template>

<script>
import AnimatedNumber from "animated-number-vue";
import openSocket from "socket.io-client";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    AnimatedNumber
  },
  computed: {
    ...mapGetters(["getUserName"])
  },
  data() {
    return {
      text: "",
      color: "",
      betPrice: "",
      snackbar: false
    };
  },
  mounted() {
    this.getTime();
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
          this.alertOutCome();
        }
      });
    },
    async alertOutCome() {
      let totalPayout = await this.$axios.$get(
        "/api/me/totalPayout?apikey=" + this.$store.state.provider.authToken
      );
      // console.log(totalPayout)
      if (totalPayout.status == false) return;
      this.snackbar = true;
      this.betPrice = totalPayout.data;
      if (totalPayout.data > 0) {
        this.text = this.$root.$t("msg.winbet");
        this.color = "#17da14";
        this.playSound("/voice/winbet.mp3");
      } else {
        this.text = this.$root.$t("msg.losebet");
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

.slideInLeft {
  padding: 0.6% 2%;
  /* background: #17da14; */
  position: relative;
  animation-name: mymove;
  animation-duration: 3s;
  left: -100px;
  /* border-radius: 3px; */
  /* border: 1px solid; */
}

@keyframes mymove {
  from {
    left: 200px;
  }

  to {
    left: -120px;
  }
}
</style>
