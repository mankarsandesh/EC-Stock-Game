<template>
  <div>
    <v-layout class="mx-5 my-3" column>
      <v-flex>
        <h3>betting on <span class="text-uppercase">{{betId}}</span></h3>
      </v-flex>
      <v-flex class="pt-1">
        <span>Stock Name:   {{ $t(`stockname.${stockName}`) }} -{{loop}}</span>
      </v-flex>
      <v-flex class="pt-1">
        <span>odd: {{payout}}</span>
      </v-flex>
      <v-flex>
        <v-layout row>
          <v-flex class="py-3 text-center">
            <v-avatar size="50" v-for="(item,key) in imgChip" :key="key">
              <v-img
                @click="coinClick(getCoins_modern[key])"
                :src="item.img"
                width="50"
                :alt="item.title"
                :class="item.color"
              >{{getCoins_modern[key]}}</v-img>
            </v-avatar>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex>
        <v-layout row justify-center>
          <v-flex class="pr-1" style="align-self:center">
            <span>Amount</span>
          </v-flex>
          <v-flex style="align-self:center">
            <input type="text" v-model="betValue" class="input-bet" />
          </v-flex>
          <v-flex style="align-self:center">
            <v-btn color="error" @click="clear">clear</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="py-1">
        <span>Max = $5000;Min = $200</span>
      </v-flex>
      <v-divider></v-divider>
      <v-flex xs-12 class="pt-2 text-uppercase">
        <v-btn color="#003e70" dark @click="confirmBet()">confirm</v-btn>
        <v-btn color="#003e70" dark @click="closePopper">close</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters,mapMutations } from "vuex";
export default {
  props: {
    stockName: {
      type: String
    },
    loop: {
      type: Number
    },
    betId: {
      type: String
    },
    payout: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      betValue: 0,
      imgChip: [
        {
          title: "Danger",
          img: "/chip/danger.png"
        },
        {
          title: "Primary",
          img: "/chip/primary.png"
        },
        {
          title: "success",
          img: "/chip/success.png"
        },
        {
          title: "warning",
          img: "/chip/warning.png"
        },
        {
          title: "black",
          img: "/chip/black.png",
          color: "text-white"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["getCoins_modern","getOnBetting"])
  },
  methods: {
    ...mapMutations([
      "pushDataOnGoingBet"
    ]),
    coinClick(value) {
      let amount = parseInt(value);
      this.betValue = this.betValue + amount;
    },
    confirmBet(){
      let data={
        stockName:this.stockName,
        loop:this.loop,
        betId:this.betId,
        betValue:this.betValue,
      }
      this.pushDataOnGoingBet(data)
      console.warn(this.getOnBetting)

    },
    closePopper() {
      $(".closepopper").click();
      this.clear()
    },
    clear() {
      this.betValue = 0;
    }
  }
};
</script>
<style scoped>
.input-bet {
  border: 1px solid black;
  font-size: 15px;
  padding: 10px;
  width: 120px;
}
</style>