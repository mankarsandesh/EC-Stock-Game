<template>
  <div>
    <v-layout class="mx-5 my-3 bettingModel" column>
      <v-flex>
        <h3>
          {{ $t("msg.bettingon") }}
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
          {{ $t("msg.Stock Name") }}: {{ $t(`stockname.${stockName}`) }} -
          {{ getStockLoop(stockName) }} minute
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
            <v-avatar
              size="70"
              v-for="(item, key) in imgChip"
              :key="key"
              class="chips"
            >
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
            <input
              type="number"
              readonly
              :min="1"
              v-model="betValue"
              class="input-bet"
            />
          </v-flex>
          <v-flex style="align-self:center">
            <v-btn color="error" @click="clear">{{ $t("msg.Clear") }}</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="py-1 betHeading">
        <span>{{ $t("msg.min") }} = $100 , {{ $t("msg.max") }} = $5000</span>
      </v-flex>
      <!-- <v-divider></v-divider> -->
      <v-flex xs-12 class="pt-2 text-uppercase">
        <v-btn
          class="buttonGreen"
          dark
          @click="confirmBet()"
          :disabled="confirmDisabled"
          >{{ $t("msg.confirm") }}</v-btn
        >
        <v-btn class="buttonCancel" color="#003e70" dark @click="closePopper">
          {{ $t("msg.cancel") }}
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import result from "~/data/result";
import config from "../../config/config.global";
import chips from "../../data/chips";
export default {
  props: ["stockName", "ruleid", "loop", "betId", "payout", "betWin"],
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
      "getLastDraw"
    ])
  },
  watch: {
    getLastDraw(val) {
      const lastDraw = val.substr(val.length - 2);
      const first = parseInt(lastDraw.slice(0, 1));
      const last = parseInt(lastDraw.slice(1, 2));
      const bothdigit = first + last;
      const twoDigit = first + last;
      result.rule_data.map((items, index) => {
        if ($("#" + this.stockName + this.betId).hasClass(items.type)) {
          items.rules.map((item, index) => {
            if ($("#" + this.stockName + this.betId).hasClass(item.name)) {
              /* ----------------------------- // First digit ----------------------------- */

              if (items.type === "firstdigit") {
                const result = item.rule.includes(first);
                if (result) {
                  console.log("You Win first :" + item.name + ":" + first);
                  $("#" + this.betWin).addClass(this.betWin);
                  $("#" + this.stockName + this.betId).addClass(
                    this.betId.split("-")[0] + "-animation"
                  );
                  setTimeout(() => {
                    $("#" + this.stockName + this.betId).removeClass(
                      this.betId.split("-")[0]
                    );
                    $("#" + this.betWin).removeClass(this.betWin);
                    $("#" + this.stockName + this.betId).removeClass(
                      this.betId.split("-")[0] + "-animation"
                    );
                  }, 5000);
                } else {
                  $("#" + this.stockName + this.betId).removeClass(
                    this.betId.split("-")[0]
                  );
                  $("#" + this.betWin).removeClass(this.betWin);
                  console.log("==You==lose==first==" + item.name + "==");
                }
              }

              /* ------------------------------ // Last digit ----------------------------- */

              if (items.type === "lastdigit") {
                const result = item.rule.includes(last);
                if (result) {
                  console.log("You Win last :" + item.name + ":" + last);
                  $("#" + this.betWin).addClass(this.betWin);
                  $("#" + this.stockName + this.betId).addClass(
                    this.betId.split("-")[0] + "-animation"
                  );
                  setTimeout(() => {
                    $("#" + this.stockName + this.betId).removeClass(
                      this.betId.split("-")[0]
                    );
                    $("#" + this.betWin).removeClass(this.betWin);
                    $("#" + this.stockName + this.betId).removeClass(
                      this.betId.split("-")[0] + "-animation"
                    );
                  }, 5000);
                } else {
                  $("#" + this.stockName + this.betId).removeClass(
                    this.betId.split("-")[0]
                  );
                  $("#" + this.betWin).removeClass(this.betWin);
                  console.log("==You==lose==last==" + item.name + "==");
                }
              }

              /* -------------------------------- bothdigit ------------------------------- */

              if (items.type === "bothdigit") {
                const result = item.rule.includes(bothdigit);
                if (result) {
                  console.log(
                    "You Win bothdigit:" + item.name + ":" + bothdigit
                  );
                  $("#" + this.betWin).addClass(this.betWin);
                  $("#" + this.stockName + this.betId).addClass(
                    this.betId.split("-")[0] + "-animation"
                  );
                  setTimeout(() => {
                    $("#" + this.stockName + this.betId).removeClass(
                      this.betId.split("-")[0]
                    );
                    $("#" + this.betWin).removeClass(this.betWin);
                    $("#" + this.stockName + this.betId).removeClass(
                      this.betId.split("-")[0] + "-animation"
                    );
                  }, 5000);
                } else {
                  $("#" + this.stockName + this.betId).removeClass(
                    this.betId.split("-")[0]
                  );
                  $("#" + this.betWin).removeClass(this.betWin);
                  console.log("==You==lose==last==" + item.name + "==");
                }
              }

              /* -------------------------------- tow digit ------------------------------- */
              if (items.type === "twodigit") {
                const result = item.rule.includes(twoDigit);
                if (result) {
                  console.log("You Win twoDigit:" + item.name + ":" + twoDigit);
                  $("#" + this.betWin).addClass(this.betWin);
                  $("#" + this.stockName + this.betId).addClass(
                    this.betId.split("-")[0] + "-animation"
                  );
                  setTimeout(() => {
                    $("#" + this.stockName + this.betId).removeClass(
                      this.betId.split("-")[0]
                    );
                    $("#" + this.betWin).removeClass(this.betWin);
                    $("#" + this.stockName + this.betId).removeClass(
                      this.betId.split("-")[0] + "-animation"
                    );
                  }, 5000);
                } else {
                  $("#" + this.stockName + this.betId).removeClass(
                    this.betId.split("-")[0]
                  );
                  $("#" + this.betWin).removeClass(this.betWin);
                  console.log("==You==lose==last==" + item.name + " ==");
                }
              }
            }
          });
        }
      });
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
        const res = await this.$axios.$post(
          config.storeBet.url,
          {
            portalProviderUUID: this.getPortalProviderUUID,
            userUUID: this.getUserUUID,
            version: config.version,
            betData: [betData]
          },
          {
            headers: config.header
          }
        );
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
            title: "Confirm!",
            showConfirmButton: false,
            timer: 1000
          });
        } else {
          if (res.status) {
            throw new Error(res.data[0].message);
          } else {
            throw new Error(res.message);
          }
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
      if (this.betValue > 0) {
        this.confirmDisabled = true;
        this.sendBetting(data);
        $("#" + this.stockName + this.betId).addClass(
          this.betId.split("-")[0] + " " + this.betId.split("-")[1]
        );
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
  font-size: 18px;
  color: #545353;
  font-weight: 800;
  width: 100px;
  padding: 4px 5px;
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
