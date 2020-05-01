<template>
  <div>
    <v-card class="my-bg">
      <v-layout row wrap justify-center class="allchips">
        <v-flex
          class="settingchips"
          xs4
          sm3
          md3
          lg2
          v-for="(item, key) in imgChip"
          :key="key"
          justify-center
        >
          <div class="d-block">
            <v-img :width="item.width" :src="item.img" class="chipImage">
              <v-text-field
                class="setpricechip"
                outlined
                v-model="getCoinsModern[key]"
                :class="item.color"
                :ref="item.id"
              ></v-text-field>
            </v-img>
            <v-card-actions class="justify-center">
              <v-btn class="chipamount" text @click="conOrEClick()">{{
                $t("msg." + conOrE)
              }}</v-btn>
            </v-card-actions>
            <div v-show="conOrE == 'confirm'">
              <v-card-text>{{ $t("msg.min") }} = $200</v-card-text>
              <v-card-text>{{ $t("msg.max") }} = $20,000</v-card-text>
            </div>
          </div>
        </v-flex>
      </v-layout>

      <v-layout row wrap justify-center style="background-color: #f2f4ff;">
        <v-btn
          text
          @click="reset"
          style="background-color: #fec623!important;border-radius:8px;"
          >{{ $t("msg.resettodefault") }}</v-btn
        >
      </v-layout>

      <v-layout row wrap justify-center style="background-color: #f2f4ff;">
        <v-btn class="my-btn buttonGreensmall" @click="saveClick()">{{
          $t("msg.save")
        }}</v-btn>
        <v-btn class="my-btn buttonCancel">{{ $t("msg.cancel") }}</v-btn>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import chips from "~/data/chips";
import secureStorage from "../../plugins/secure-storage";

export default {
  data() {
    return {
      conOrE: "edit",
      imgChip: chips.chipsData
    };
  },
  computed: {
    ...mapGetters(["getCoinsModern"])
  },
  methods: {
    ...mapActions(["setCoinsModern"]),
    conOrEClick() {
      if (this.conOrE == "edit") {
        this.conOrE = "confirm";
      } else {
        this.conOrE = "edit";
      }
    },
    reset() {
      let defaultCoin = ["100", "500", "1000", "5000", "10000"];
      this.$refs.ship1[0].value = defaultCoin[0];
      this.$refs.ship2[0].value = defaultCoin[1];
      this.$refs.ship3[0].value = defaultCoin[2];
      this.$refs.ship4[0].value = defaultCoin[3];
      this.$refs.ship5[0].value = defaultCoin[4];
      if (this.conOrE == "confirm") {
        this.conOrE = "edit";
      }
    },
    saveClick() {
      let ship1 = this.$refs.ship1[0].value;
      let ship2 = this.$refs.ship2[0].value;
      let ship3 = this.$refs.ship3[0].value;
      let ship4 = this.$refs.ship4[0].value;
      let ship5 = this.$refs.ship5[0].value;
      let new_amount = `["${ship1}", "${ship2}", "${ship3}", "${ship4}", "${ship5}"]`;
      secureStorage.setItem("coinsModern", new_amount);
      this.setCoinsModern();
      if (this.conOrE == "confirm") {
        this.conOrE = "edit";
      }
    }
  }
};
</script>

<style scoped>
.setpricechip {
  position: relative;
  left: 6px;
  top: 32%;
  padding-bottom: 2px;
  text-align: center;
  color: black;
  font-size: 1.2rem;
}

input {
  background-color: brown;
}

.settingchips {
  margin: 5px 10px;
  text-align: center;
  clear: both;
}

.allchips {
  margin-top: 30px;
  background-color: #f2f4ff;
}

.chipImage {
  margin: 0 auto;
}

.chipamount {
  margin: 0 auto;
  text-align: center;
  border-radius: 8px;
}

.v-btn {
  font-size: 14px;
  font-weight: 400;
  background-color: #6424b9 !important;
  color: #ffffff !important;
  padding: 4px 10px;
  margin: 4px;
}
</style>
