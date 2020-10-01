<template>
  <v-flex>
    <v-layout row wrap class="pt-1">
      <v-flex xs12 sm12>
        <v-layout>
          <v-flex class="text-xs-center" ma-1>
            <span class="uppercase-text grey--text"
              >{{ $t("msg.lastDraw") }}:
            </span>
            <v-flex flex-style class="lastdraw">
              <h4 class="body-3">
                <span
                  class="text-black"
                  v-html="$options.filters.lastDraw(getLastDraw)"
                ></span>
              </h4>
            </v-flex>
          </v-flex>
          <v-flex class="text-xs-center" ma-1>
            <span class="uppercase-text grey--text"
              >{{ $t("msg.betCloseIn") }}:
            </span>
            <v-flex flex-style class="betclose">
              <h4 class="body-3 uppercase-text text-black">
                {{
                  getTimerByStockName(this.$route.params.id) &&
                    getTimerByStockName(this.$route.params.id)
                      .gameEndTimeCountDownInSec
                      | betclosein(getStockLoop(this.$route.params.id))
                }}
              </h4>
            </v-flex>
          </v-flex>
          <v-flex class="text-xs-center" ma-1>
            <span class="uppercase-text grey--text"
              >{{ $t("msg.lotteryDraw") }}:
            </span>
            <v-flex flex-style class="lottery">
              <h4 class="body-3 uppercase-text text-black">
                {{
                  getTimerByStockName(this.$route.params.id) &&
                    getTimerByStockName(this.$route.params.id)
                      .gameEndTimeCountDownInSec
                      | lotterydraw(getStockLoop(this.$route.params.id))
                }}
              </h4>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getTimerByStockName", "getLastDraw", "getStockLoop"])
  }
};
</script>
<style scoped>
.lastdraw {
  font-size: 15px !important;
  border: 1px solid #4b65ff;
  border-radius: 20px;
  padding: 6px 6px;
  margin: 0px 2px;
  font-weight: 400;
  text-align: center;
}

.betclose {
  font-size: 15px !important;
  border: 1px solid #ef076a;
  border-radius: 20px;
  padding: 6px 8px;
  margin: 0px 2px;
  font-weight: 400;
  text-align: center;
}

.lottery {
  font-size: 15px !important;
  border: 1px solid #01e3bf;
  border-radius: 20px;
  padding: 6px 6px;
  margin: 0px 2px;
  font-weight: 400;
  text-align: center;
}
</style>
