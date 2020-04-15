<template>
<div>
  <v-layout row justify-center class="footerBet">
    <v-flex lg2 md2 xs2 class="amount">
      <div>{{ getAllBettingAmount }}</div>
    </v-flex>
    <v-flex lg5 md5 xs3 class="chipsdiv">
      <v-layout row>
        <v-flex class="text-center">
          <v-avatar size="70" v-for="(item, key) in imgChip" :key="key" class="chips">
            <v-img @click="setFooterBetAmount(getCoinsModern[key])" :src="item.img" :width="item.width" :alt="item.title" :class="item.color" class="chipImg">
              <span class="setpricechip">{{ getCoinsModern[key] }}</span>
            </v-img>
          </v-avatar>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex lg3 md3 xs2 class="betButton">
      <div>
        <v-btn class="buttonGreensmall" dark @click="getSending()">{{
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
import {
  mapGetters,
  mapActions
} from "vuex";
import setting from "../modern/setting/chipamout";
import chips from "../../data/chips";
export default {
  components: {
    setting
  },
  data() {
    return {
      isSending: false,
      dialog: false,
      texts: this.$root.$t("msg.confirm"),
      imgChip: chips.chipsData
    };
  },
  methods: {
    ...mapActions([
      "setFooterBetAmount",
      "clearDataMultiGameBet",
      "sendBetting"
    ]),
    getSending() {
      this.isSending = true;
      this.texts = this.$root.$t("msg.sending");
      // setTimeout(() => {
      this.sendBetting();
      this.isSending = false;
      this.texts = this.$root.$t("msg.confirm");
      // }, 1000);
    }
  },
  computed: {
    ...mapGetters(["getCoinsModern", "getAllBettingAmount"])
  }
};
</script>

<style scoped>
.amount div {
  margin: 10px -15px;
  padding: 8px;
  color: #615f60;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-left: 3px solid #aeadad;
  border-top: 3px solid #aeadad;
  border-bottom: 3px solid #aeadad;
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
  border-right: 3px solid #aeadad;
  border-left: 3px solid #aeadad;
  border-top: 3px solid #aeadad;
  border-bottom: 3px solid #aeadad;
  background-color: #fff;
}

.betButton div {
  padding: 8px;
  margin: 10px -18px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-right: 3px solid #aeadad;
  border-top: 3px solid #aeadad;
  border-bottom: 3px solid #aeadad;
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
  -ms-transform: rotate(360deg);
  /* IE 9 */
  transform: rotate(360deg);
}

.chipImg {
  color: #333;
  font-size: 24px;
}

.st0 {
  display: none;
}

.st1 {
  display: inline;
}

.st2 {
  fill: #c1272d;
}

.st3 {
  fill: #003f70;
}

.st4 {
  fill: #ff1d25;
}

.st5 {
  fill: #ffffff;
}

.st6 {
  font-family: "MyriadPro-Regular";
}

.st7 {
  font-size: 7.0968px;
}

.st8 {
  font-size: 11.2821px;
}
</style>
