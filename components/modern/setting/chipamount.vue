<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex v-for="(chip, index) in chips" :key="index">
        <div class="chip-image">
          <v-img :width="90" :src="chip.image" class="chipImage" />
          <input
            :disabled="toggleButtonStatus === 'edit' ? disableInput : false"
            class="input-chip-amount"
            type="number"
            :value="chip.amount"
            :ref="index"
          />
        </div>
        <div class="chip-action">
          <v-btn class="chipamount" text @click="changeChipAmount(chip.chipID)">{{
            $t("msg." + toggleButtonStatus)
          }}</v-btn>
          <div class="min-max" v-show="toggleButtonStatus === 'confirm'">
            <span>{{ $t("msg.min") }} = $100</span>
            <span>{{ $t("msg.max") }} = $10,000</span>
          </div>
        </div>
      </v-flex>
      <v-flex md12 lg12>
        <div class="action-container">
          <div class="pt-3">
            <v-btn
              text
              @click="reset()"
              style="background-color: #fec623!important;border-radius:8px;"
              >{{ $t("msg.resetToDefault") }}</v-btn
            >
            <v-btn class="my-btn buttonCancel" @click="cancelAction()">{{ $t("msg.cancel") }}</v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="snackbar">
      Sucessfully Update Chips Amount.
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
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
      snackbar: false,
      amount: [],
      disableInput: true,
      toggleButtonStatus: "edit"
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
    ...mapActions(["setCoinsModern", "setChips"]),
    changeChipAmount(chipId) {
      if (this.toggleButtonStatus == "edit") {
        this.toggleButtonStatus = "confirm";
        //this.$nextTick(() => this.$refs[chipId][0].focus());
      } else {
        this.saveChipAmount(chipId);
        this.toggleButtonStatus = "edit";
      }
    },
    reset() {
      this.setCoinsModern(["100", "500", "1000", "5000", "10000"]);
      this.toggleButtonStatus = "edit";
    },
    saveChipAmount(chipId) {
      let index = this.chips.findIndex((chip) => chip.chipID == chipId);
      if(index != -1) {
        if(parseInt(this.$refs[index][0].value) >= 100 && this.$refs[index][0].value <= 10000) {
          if(!(this.getCoinsModern.includes(this.$refs[index][0].value))) {
            this.setChips({ index, amount: this.$refs[index][0].value })
            this.toggleButtonStatus = "edit";
            this.snackbar = true;
          } else {
            this.$swal({
            type: "error",
            title: "Chip Amount already exist",
            showConfirmButton: true,
            timer: 1000
          });
          }
        } else {
          this.$swal({
            type: "error",
            title: "Chip amount should be greater than 100 and less than 10000",
            showConfirmButton: true,
            timer: 1000
          });
        }
      } else {
        this.$swal({
          type: "error",
          title: config.error.general,
          showConfirmButton: true,
          timer: 1000
        });
      }
    },
    cancelAction() {
      this.toggleButtonStatus = "edit";
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
  left: 5px;
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
