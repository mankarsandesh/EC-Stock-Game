<template>
  <div>
    <v-layout class="mx-5 my-3 bettingModel" column>
      <v-flex>
        <h3>
          {{ $t("msg.bettingOn") }}
          <span class="text-uppercase">
            {{
            isNaN(betId.split("-")[1])
            ? $t("gamemsg." + betId.split("-")[0]) +
            " - " +
            $t("gamemsg." + betId.split("-")[1])
            : $t("gamemsg." + betId.split("-")[0]) +
            " - " +
            betId.split("-")[1]
            }}
          </span>
        </h3>
      </v-flex>
      <v-flex class="pt-1 text-uppercase betHeading">
        <span>
          {{ $t("msg.stockName") }}: {{ $t(`stockName.${stockName}`) }} -
          {{ getStockLoop(stockName) }} {{ $t("msg.minute") }}
        </span>
        |
        <span>
          {{ $t("msg.payout") }}:
          {{ $store.state.game.payout[parseInt(payout)].dynamicOdds }}
        </span>
      </v-flex>
      <v-flex>
        <v-layout row>
          <v-flex class="py-3 text-center">
            <v-avatar size="70" v-for="(item, key) in imgChip" :key="key" class="chips">
              <v-img
                @click="coinClick(getCoinsModern[key])"
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
            <v-btn color="error" @click="clear">{{ $t("msg.clear") }}</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="py-1 betHeading">
        <span>{{ $t("msg.min") }} = $100 , {{ $t("msg.max") }} = $10000</span>
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
import Sound from "~/helpers/sound";
import { mapGetters, mapActions, mapMutations } from "vuex";
import result from "~/data/result";
import config from "~/config/config.global";
import chips from "~/data/chips";
import log from "roarr";
import secureStorage from "../../plugins/secure-storage";
import { BetResult } from "~/mixin/betResult";

export default {
  props: ["stockName", "ruleid", "loop", "betId", "payout", "betWin"],
  mixins: [BetResult],
  data() {
    return {
      confirmDisabled: false,
      betValue: 100,
      imgChip: chips.chipsData
    };
  },
  computed: {
    ...mapGetters([
      "getStockLoop",
      "getGameUUIDByStockName",
      "getCoinsModern",
      "getPortalProviderUUID",
      "getUserUUID",
      "getLastDraw",
      "getUserInfo",
      "getUserBalance"
    ])
  },
  watch: {
    getLastDraw(val) {
      // sending the data to process on the helper♦
      this.betResult(val, this.stockName, this.betId, this.betWin);
    }
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
    ...mapActions(["pushDataOnGoingBet", "setGameId", "setUserData"]),
    coinClick(value) {
      let amount = parseInt(value);
      this.betValue = this.betValue + amount;
    },
    async sendBetting(betData) {
      try {
        var reqBody = {
          portalProviderUUID: this.getPortalProviderUUID,
          userUUID: this.getUserUUID,
          version: config.version,
          betData: [betData]
        };
        var res = await this.$axios.$post(config.storeBet.url, reqBody, {
          headers: config.header
        });
        if (res.status && res.data[0].status) {
          this.setUserData();
          this.closePopper();
          let OnGoingdata = {
            betUUID: res.data[0].betUUID,
            gameUUID: res.data[0].gameUUID,
            ruleName: res.data[0].ruleName,
            payout: res.data[0].payout,
            betDate: res.data[0].createdDate,
            betTime: res.data[0].createdTime,
            betAmount: res.data[0].betAmount,
            stockName: this.$props.stockName
          };
          this.pushDataOnGoingBet(OnGoingdata);
          this.$swal({
            type: "success",
            title: this.$root.$t("msg.confirm"),
            showConfirmButton: false,
            timer: 1000
          });
        } else {
          if (res.status) {
            throw new Error(config.error.general);
          } else {
            throw new Error(config.error.general);
          }
        }
      } catch (ex) {
        this.confirmDisabled = false;
        this.$swal({
          type: "error",
          title: ex.message,
          showConfirmButton: true,
          timer: 1000
        });
        log.error(
          {
            req: reqBody,
            res,
            page: "components/modern/betModal.vue",
            apiUrl: config.storeBet.url,
            provider: secureStorage.getItem("PORTAL_PROVIDERUUID"),
            user: secureStorage.getItem("USER_UUID")
          },
          ex.message
        );
      }
    },
    confirmBet() {
      if (parseInt(this.betValue) > parseInt(this.getUserBalance)) {
        this.$swal({
          type: "error",
          title: config.error.lowBalance,
          timer: 1000,
          showConfirmButton: true
        });
      } else {
        const betStore = {
          id: this.stockName + this.betId,
          class: this.betId.split("-")[0],
          betAmount: this.betValue
        };

        this.storeBetOnLocalStroge(betStore);

        let data = {
          gameUUID: this.getGameUUIDByStockName(this.stockName),
          ruleID: this.ruleid,
          betAmount: this.betValue
        };

        if (this.betValue > 0) {
          Sound.betTing();
          const stockDetail = {
            stock: this.stockName,
            betRule: this.betId
          };

          this.$emit("update-bet", stockDetail);

          this.confirmDisabled = true;
          this.sendBetting(data);
          $("#" + this.stockName + this.betId).addClass(
            this.betId.split("-")[0] + " " + this.betId.split("-")[1]
          );
        }
      }
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
  margin: 0px 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
}
.chips:hover {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4) !important;
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
  font-size: 18px;
  color: #545353;
  font-weight: 800;
  width: 100px;
  padding: 4px 5px;
  text-align: center;
  border-radius: 8px;
}

.setpricechip {
  color: #333;
  font-size: 12px;
  font-weight: 600;
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
