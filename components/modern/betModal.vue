<template>
  <div>
    <v-layout class="mx-5 my-3" column>
      <v-flex>
        <h3>betting on {{betId}}</h3>
      </v-flex>
      <v-flex class="pt-1">
        <span>Stock Name: {{stockName}}-{{loop}}</span>
      </v-flex>
      <v-flex class="pt-1">
        <span>odd: {{payout}}</span>
      </v-flex>
      <v-flex>
        <v-layout row>
          <v-flex class="py-3 text-center">
            <v-avatar size="50" v-for="(item,key) in imgChip" :key="key">
              <img :src="item.img" :alt="item.title" />
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
        <v-btn color="#003e70" dark>confirm</v-btn>
        <v-btn color="#003e70" dark>close</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
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
    payout:{
      type:Number,
      required:true
    }
  },
  data() {
    return {
      betValue: 0,
      imgChip: [
        {
          title: "Danger",
          img: "/chip/danger.png",
          price: "200"
        },
        {
          title: "Primary",
          img: "/chip/primary.png",
          price: "500"
        },
        {
          title: "success",
          img: "/chip/success.png",
          price: "1000"
        },
        {
          title: "warning",
          img: "/chip/warning.png",
          price: "5000"
        },
        {
          title: "black",
          img: "/chip/black.png",
          price: "10000"
        }
      ]
    };
  },
  methods: {
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