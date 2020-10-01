<template>
  <div>
    <v-layout row justify-center id="footerBet-guide">
      <v-flex lg2 md2 xs2 class="amount">
        <div>
          <animated-number
            :value="getFooterBetAmount"
            :formatValue="formatToPrice"
            :duration="1000"
          />
        </div>
      </v-flex>
      <v-flex lg5 md5 xs3 class="chipsdiv">
        <v-layout row>
          <v-flex class="text-center">
            <v-avatar
              size="65"
              v-for="(item, key) in imgChip"
              :key="key"
              v-bind:class="[
                getFooterBetAmount == getCoinsModern[key] ? 'activeChips' : '',
                'chips'
              ]"
            >
              <v-img
                @click="setFooterBetAmount(getCoinsModern[key])"
                :src="item.img"
                :width="item.width"
                :alt="item.title"
                :class="item.color"
                class="chipImg"
              >
                <span class="setpricechip">{{ getCoinsModern[key] }}</span>
              </v-img>
            </v-avatar>
          </v-flex>
          <v-flex style="align-self:center">
            <input
              type="number"
              :min="10"
              v-model="betValue"
              class="input-bet"
            />
            <v-btn
              :disabled="!parseInt(this.betValue)"
              class="buttonGreensmall"
              dark
              small
              @click="betValueUpdate()"
              >Okay</v-btn
            >
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex lg3 md3 xs2 class="betButton">
        <div>
          <v-btn
            :disabled="!parseInt(this.getTempMultiGameBetAmount)"
            class="buttonGreensmall"
            dark
            @click="confirmBet()"
            >{{ $t("msg.confirmBet") }}</v-btn
          >
          <v-btn class="buttonCancel" @click="cancelBet()">
            {{ $t("msg.cancel") }}
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import chips from "~/data/chips";
import config from "../../config/config.global";
import Betting from "~/helpers/betting";
import AnimatedNumber from "animated-number-vue";
export default {
  components: {
    AnimatedNumber
  },
  data() {
    return {
      isSending: false,
      dialog: false,
      texts: this.$root.$t("msg.confirmBet"),
      imgChip: chips.chipsData,
      betValue: 0
    };
  },
  computed: {
    ...mapGetters([
      "getGameUUIDByStockName",
      "getAllSelectedBetDataGameWise",
      "getCoinsModern",
      "getFooterBetAmount",
      "getTempMultiGameBetAmount",
      "getUserInfo",
      "getUserBalance",
      "gettempMultiGameBetData"
    ])
  },

  methods: {
    ...mapMutations([
      "CLEAR_SELECT_BETTING",
      "CLEAR_TEMP_MULTI_GAME_BET_DATA",
      "CLEAR_TEMP_CHIPS_IMAGE",
      "CLEAR_BET_VALUE_FOOTER_BET"
    ]),
    ...mapActions([
      "setFooterBetAmount",
      "clearDataMultiGameBet",
      "sendBetting",
      "confirmTempMultiGameBetData",
      "clearTempMultiGameBetData",
      "clearTempChips",
      "clearBetValueFooterBet"
    ]),
    betValueUpdate() {
      this.setFooterBetAmount(parseInt(this.betValue));
    },
    async confirmBet() {
      try {
        if (
          parseInt(this.getTempMultiGameBetAmount) <=
            parseInt(this.getUserBalance) &&
          parseInt(this.getTempMultiGameBetAmount) > 0
        ) {
          this.isSending = true;
          this.texts = this.$root.$t("msg.sending");
          this.sendBetting(this.getGameUUIDByStockName(this.$route.params.id));
          this.setFooterBetAmount(0);
          this.isSending = false;
          this.clearTempMultiGameBetData();
        } else {
          await Betting.cancelBettingClear(this.gettempMultiGameBetData);
          this.clearTempMultiGameBetData();
          this.$swal({
            type: "error",
            title: config.error.lowBalance,
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then(result => {
            if (result.value) {
              // this.CLEAR_TEMP_MULTI_GAME_BET_DATA(); // Clear Temp Multi Game Bet Data
              // this.CLEAR_TEMP_CHIPS_IMAGE(); // Clear temp Chips Image
              // this.CLEAR_BET_VALUE_FOOTER_BET(); // Clear Bet Value
              // this.CLEAR_SELECT_BETTING(); // Clear Select Betting
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    //use for cancel the bet
    async cancelBet() {
      try {
        this.isSending = false;
        await Betting.cancelBettingClear(this.gettempMultiGameBetData);

        await this.CLEAR_TEMP_MULTI_GAME_BET_DATA(); // Clear Temp Multi Game Bet Data
        await this.CLEAR_TEMP_CHIPS_IMAGE(); // Clear temp Chips Image
        await this.CLEAR_BET_VALUE_FOOTER_BET(); // Clear Bet Value
        await this.CLEAR_SELECT_BETTING(); // Clear Select Betting
      } catch (error) {
        console.log(error);
      }
    },

    formatToPrice(value) {
      return `$ ${value.toFixed(2)}`;
    }
  }
};
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.input-bet:focus {
  outline: none;
}

.input-bet {
  border: 1px solid #dddddd;
  font-size: 18px;
  color: #545353;
  font-weight: 800;
  width: 100px;
  padding: 4px 5px;
  text-align: center;
  border-radius: 8px;
}
.activeChips {
  box-shadow: 0 10px 10px -6px #333;
}
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
  margin: 2px 8px;
  border: 2px solid #dddddd;
}
.chipImg {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  width: 75px;
  height: 75px;
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
