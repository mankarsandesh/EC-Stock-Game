<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
        <v-flex v-for="(chip, index) in chips" :key="index">
            <div class="chip-image">
        <v-img :width="90" :src="chip.image" class="chipImage" />
        <input
          :disabled="conOrE === 'edit' ? disableInput : false"
          class="input-chip-amount"
          type="number"
          :value="chip.amount"
          :ref="chip.chipID"
        />
      </div>
      <div class="chip-action">
        <v-btn class="chipamount" text @click="conOrEClick(chip.chipID)">{{
          $t("msg." + conOrE)
        }}</v-btn>
        <div class="min-max" v-show="conOrE === 'confirm'">
          <span>{{ $t("msg.min") }} = $200</span>
          <span>{{ $t("msg.max") }} = $20,000</span>
        </div>
      </div>
   
        </v-flex>
        <v-flex md12 lg12>
            <div class="action-container">
      <v-btn
        text
        @click="reset()"
        style="background-color: #fec623!important;border-radius:8px;"
        >{{ $t("msg.resettodefault") }}</v-btn
      >
      <div class="pt-3">
        <v-btn class="my-btn buttonGreensmall" @click="saveChipAmount()">{{
          $t("msg.save")
        }}</v-btn>
        <v-btn class="my-btn buttonCancel">{{ $t("msg.cancel") }}</v-btn>
      </div>
    </div>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import chips from "~/data/chips";
import config from "../../../config/config.global";
import secureStorage from "../../../plugins/secure-storage";

export default {
  data() {
    return {
      amount: [],
      disableInput: true,
      conOrE: "edit"
    };
  },
  mounted() {
    this.amount = this.getCoinsModern;
  },
  computed: {
    ...mapGetters(["getCoinsModern"]),
    chips() {
      return [
        {
          chipID: "chip1",
          image: "/chip/danger.png",
          amount: this.getCoinsModern[0]
        },
        {
          chipID: "chip2",
          image: "/chip/primary.png",
          amount: this.getCoinsModern[1]
        },
        {
          chipID: "chip3",
          image: "/chip/success.png",
          amount: this.getCoinsModern[2]
        },
        {
          chipID: "chip4",
          image: "/chip/warning.png",
          amount: this.getCoinsModern[3]
        },
        {
          chipID: "chip5",
          image: "/chip/black.png",
          amount: this.getCoinsModern[4]
        }
      ];
    }
  },
  methods: {
    ...mapActions(["setCoinsModern"]),
    conOrEClick(ref) {
      if (this.conOrE == "edit") {
        this.conOrE = "confirm";
        this.$nextTick(() => this.$refs[ref][0].focus());
      } else {
        this.saveChipAmount();

        this.conOrE = "edit";
      }
    },
    reset() {
      this.setCoinsModern(config.defaultCoinsModern);
      if (this.conOrE == "confirm") {
        this.conOrE = "edit";
      }
    },
    saveChipAmount() {
      let chip1 = this.$refs.chip1[0].value;
      let chip2 = this.$refs.chip2[0].value;
      let chip3 = this.$refs.chip3[0].value;
      let chip4 = this.$refs.chip4[0].value;
      let chip5 = this.$refs.chip5[0].value;
      let new_amount = [chip1, chip2, chip3, chip4, chip5];
      this.setCoinsModern(new_amount);

      this.conOrE = "edit";
    },
    cancel() {
      let chip1 = this.$refs.chip1[0].value;
      let chip2 = this.$refs.chip2[0].value;
      let chip3 = this.$refs.chip3[0].value;
      let chip4 = this.$refs.chip4[0].value;
      let chip5 = this.$refs.chip5[0].value;
      let new_amount = [chip1, chip2, chip3, chip4, chip5];
      this.setCoinsModern(new_amount);
      if (this.conOrE == "confirm") {
        this.conOrE = "edit";
      }
    }
  }
};
</script>

<style scoped>
.action-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.chip-action {
  text-align: center;
  padding-bottom: 25px;
}
.min-max {
  display: flex;
  flex-direction: column;
}
.chip-setting-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.chip-item {
  display: flex;
  flex-direction: column;
  width: 20%;
}
.setpricechip {
  position: relative;
  top: 22%;
  padding: 0;
  text-align: center;
  color: black;
  font-size: 1.2rem;
}
.chip-image {
  position: relative;
  text-align: center;
}
.input-chip-amount {
  font-weight: 600;
  position: relative;
  top: -55px;
  color: black;
  width: 40%;
  left:5px;
  text-align: center;
}
.input-chip-amount:focus {
  outline: none;
}
.settingchips {
  text-align: center;
  font-size: 20px;
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
