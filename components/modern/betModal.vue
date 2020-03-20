<template>
  <div>
    <v-layout class="mx-5 my-3 bettingModel" column>
      <v-flex>
        <h3>
          {{ $t("msg.bettingon") }}
          <span class="text-uppercase">
            {{
            betId.split("-")[1] >= 0
            ? $t("gamemsg." + betId.split("-")[0]) +
            " - " +
            betId.split("-")[1]
            : $t("gamemsg." + betId.split("-")[0]) +
            " - " +
            $t("gamemsg." + betId.split("-")[1])
            }}
          </span>
        </h3>
      </v-flex>
      <v-flex class="pt-1 text-uppercase betHeading">
        <span>
          {{ $t("msg.Stock Name") }}: {{ $t(`stockname.${stockName}`) }} -
          {{ loop }} minute
        </span>
        |
        <span>
          {{ $t("msg.payout") }}:
          {{ $store.state.payout[parseInt(payout)].dynamicOdds }}
        </span>
      </v-flex>
      <v-flex>
        <v-layout row>
          <v-flex class="py-3 text-center">
            <v-avatar size="70" v-for="(item, key) in imgChip" :key="key" class="chips">
              <v-img
                @click="coinClick(getCoins_modern[key])"
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
      <v-flex>
        <v-layout row justify-center>
          <!-- <v-flex class="pr-1" style="align-self:center">
                    <span>{{$t('msg.amount')}}</span>
          </v-flex>-->
          <v-flex style="align-self:center">
            <input type="number" readonly :min="1" v-model="betValue" class="input-bet" />
          </v-flex>
          <v-flex style="align-self:center">
            <v-btn color="error" @click="clear">{{ $t("msg.Clear") }}</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="py-1 betHeading">
        <span>{{ $t("msg.max") }} = $5000, {{ $t("msg.min") }} = $100</span>
      </v-flex>
      <!-- <v-divider></v-divider> -->
      <v-flex xs-12 class="pt-2 text-uppercase">
        <v-btn
          class="buttonGreen"
          dark
          @click="confirmBet()"
          :disabled="confirmDisabled"
        >{{ $t("msg.confirm") }}</v-btn>
        <v-btn class="buttonCancel" color="#003e70" dark @click="closePopper">
          {{
          $t("msg.cancel")
          }}
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
import config from "../../config/config.global";
export default {
  props: ["stockName", "ruleid", "loop", "betId", "payout"],
  data() {
    return {
      gameUUID: "854fdec3-9b20-469c-8471-b0cd3c39aba3",
      confirmDisabled: false,
      betValue: 0,
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
          width: "70",
          color: "text-white"
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      "getGameUUIDByStockName",
      "getCoins_modern",
      "getOnBetting",
      "getAuth_token",
      "getStockId",
      "getStockGameId"
    ]),
    ...mapState(["portalProviderUUID", "userUUID"]) //get 2 data from vuex first, in the computed
  },
  created() {
    // check is full screen or not
    let path = this.$nuxt.$route.name.split("-");
    let isFullscreen = path[1];
    if (isFullscreen === "fullscreen") {
      this.isFullscreen = true;
    } else {
      this.isFullscreen = false;
    }
    //  this.getwinuser()
  },
  methods: {
    ...mapMutations(["pushDataOnGoingBet", "setGameID"]),
    coinClick(value) {
      let amount = parseInt(value);
      this.betValue = this.betValue + amount;
    },
    async sendBetting(betData) {
      let finalData = betData;
      try {
        const res = await this.$axios.$post(
          "http://uattesting.equitycapitalgaming.com/webApi/storeBet",
          {
            portalProviderUUID: this.portalProviderUUID,
            userUUID: this.userUUID,
            version: config.version,
            betData: [finalData]
          },
          {
            headers: config.header
          }
        );       
        if (res.data.status == true) {
          this.closePopper();
          let OnGoingdata = {
            betUUID: res.data[0].betUUID,
            ruleName: res.data[0].ruleName,
            payout: res.data[0].payout,
            betAmount: res.data[0].betAmount,
            stockName: this.$props.stockName
          };
          this.pushDataOnGoingBet(OnGoingdata);
          this.$swal({
            type: "success",
            title: "Confirm!",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          this.confirmDisabled = false;
          this.$swal({
            type: "error",
            title: `Error ${res.message}`,
            showConfirmButton: true
          });
        }
      } catch (ex) {
        this.confirmDisabled = false;      
        this.$swal({
          type: "error",
          title: `Error ${ex.message}`,
          showConfirmButton: true
        });
      }
    },
    confirmBet() {
      let data = {
        gameUUID: this.getGameUUIDByStockName(this.stockName),
        ruleID: this.ruleid,
        betAmount: this.betValue
      };
      this.confirmDisabled = true;
      this.sendBetting(data);
      $("#" + this.betId).addClass(this.betId.split("-")[0]);
    },
    closePopper() {
      $(".closepopper").click();
      this.clear();
    },
    clear() {
      this.betValue = 0;
      this.confirmDisabled = false;
    }
  }
};
</script>

<style scoped>
.chips {
  margin: 0px 3px;
  -webkit-transition: -webkit-transform 0.8s ease-in-out;
  transition: transform 0.8s ease-in-out;
}
.chips:hover {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4) !important;
  -ms-transform: rotate(360deg); /* IE 9 */
  transform: rotate(360deg);
}
.betHeading {
  font-weight: 500;
  color: #545353;
}
.bettingModel h3 {
  text-transform: capitalize;
  color: #0b2a68;
}
.input-bet:focus {
  outline: none;
}
.input-bet {
  border: 1px solid #dddddd;
  font-size: 15px;
  padding: 8px 10px;
  width: 100px;
  text-align: center;
  border-radius: 8px;
}

.setpricechip {
  color: black;
  font-size: 0.85rem;
}
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
.chipImg {
  cursor: pointer;
}
</style>
