<template>
  <div>
    <v-layout row justify-center class="footerBet">
      <v-flex xs2 class="amount">
        <div>{{ formatToPrice(getAllBettingAmount) }}</div>
      </v-flex>
      <v-flex xs3 class="chipsdiv">
        <v-layout row>
          <v-flex class="text-center">
            <v-avatar
              size="70"
              v-for="(item, key) in imgChip"
              :key="key"
              class="chips"
            >
              <v-img
                @click="setFooterBetAmount(getCoins_modern[key])"
                :src="item.img"
                :width="item.width"
                :alt="item.title"
                :class="item.color"
                class="chipImg"
              >
                <span class="setpricechip">{{ getCoins_modern[key] }}</span>
              </v-img>
            </v-avatar>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs2 class="betButton">
        <div>
          <v-btn class="buttonGreen" dark @click="getSending()">{{
            $t("msg." + texts)
          }}</v-btn>
          <v-btn class="buttonCancel" @click="clearDataMultiGameBet()">{{
            $t("msg.cancel")
          }}</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      isSending: false,
      texts: "confirm",
      imgChip: [
        {
          title: "Danger",
          img: "/chip/danger.png",
          width: "55"
        },
        {
          title: "Primary",
          img: "/chip/primary.png",
          width: "55"
        },
        {
          title: "success",
          img: "/chip/success.png",
          width: "60"
        },
        {
          title: "warning",
          img: "/chip/warning.png",
          width: "60"
        },
        {
          title: "black",
          img: "/chip/black.png",
          width: "80"
        }
      ]
    };
  },
  methods: {
    ...mapActions(["sendBetting"]),
    ...mapMutations(["setFooterBetAmount", "clearDataMultiGameBet"]),
    formatToPrice(value) {
      return `$ ${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
    },
    getSending() {
      this.isSending = true;
      this.texts = "sending";
      setTimeout(() => {
        this.sendBetting();
        this.isSending = false;
        this.texts = "confirm";
      }, 1200);
    }
  },
  computed: {
    ...mapGetters([
      "getCoins_modern",
      "checkFooterBet",
      "getAllBettingAmount",
      "getMultiGameBetLength",
      "getIsSendBetting"
    ])
  }
};
</script>

<style scoped>
.footerBet {
  box-shadow: 0 -5px 5px -5px #333;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  padding: 5px 10px;
  width: 100%;
  z-index: 99;
}
svg {
  position: fixed;
  z-index: 1000;
  bottom: 0;
  width: 60%;
  align-self: center;
}

.amount div {
  margin: 10px -15px;
  padding: 8px;
  color: #615f60;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-size: 30px;
  text-align: left;
  vertical-align: center;
  background-color: #fff;
}
.chipsdiv {
  padding: 5px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;

  background-color: #fff;
}
.betButton div {
  padding: 8px;
  margin: 10px -18px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  background-color: #fff;
}
.chips {
  cursor: pointer;
  margin: 2px 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4) !important;
  -webkit-transition: -webkit-transform 0.8s ease-in-out;
  transition: transform 0.8s ease-in-out;
}
.chips:hover {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4) !important;
  -ms-transform: rotate(360deg); /* IE 9 */
  transform: rotate(360deg);
}
.chipImg {
  color: #333;
  font-size: 24px;
}

.st0 {
  clip-path: url(#SVGID_2_);
}
.st1 {
  fill: #ffffff;
}
.st2 {
  fill: #c1272d;
}
.st3 {
  font-family: "MyriadPro-Regular";
}
.st4 {
  font-size: 9.7577px;
}
.st5 {
  font-size: 13.0102px;
}
.st6 {
  font-size: 11.3839px;
}
</style>
