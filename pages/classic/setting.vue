<template>
  <div>
    <div style=" margin-top: 3%; text-align: center;">
      <v-avatar size="100" v-for="(chip,index) in chips" :key="index">
        <v-img :src="chip.img">
          <input
            type="number"
            min="10"
            max="10000"
            :readonly="isShow != false && index == isOpen ? readonly:''"
            :style="chip.title !== 'black' ? 'color :black': 'color :white'"
            :class="isShow && index == isOpen ? 'btn-setchipsedit':'btn-setchips'"
            v-model="chip.price"
          />
        </v-img>

        <v-btn
          small
          color="warning"
          class="btn-edit"
          @click="EditChip('Edit', index)"
          v-show="!isShow "
        >Edit</v-btn>

        <v-btn
          small
          color="error"
          class="btn-saves"
          @click="EditChip('Save', index), changeChip(title, img, price)"
          v-show="isShow && index == isOpen"
        >Save</v-btn>
      </v-avatar>
    </div>
    <div style="margin-top: 5%; text-align: center;">
      <v-btn color="warning" @click="resetDefault()">reset Default</v-btn>
    </div>
  </div>
</template>

<script>
import chips from "~/data/json/chips.json";
export default {
  data() {
    return {
      chipsReset: chips,
      chips: [],
      isShow: false,
      isOpen: null
    };
  },
  mounted() {
    if (localStorage.chips == null) {
      localStorage.chips = JSON.stringify(this.chipsReset);
      this.chips = JSON.parse(localStorage.chips);
    } else this.chips = JSON.parse(localStorage.chips);
  },
  methods: {
    EditChip(val, index) {
      if (val == "Edit") {
        this.isShow = true;
        this.isOpen = index;
      } else this.isShow = false;
    },
    changeChip(title, img, price) {
      if (price < 10 || price > 10000 || price == null) {
        this.resetDefault();
        return;
      }
      this.chips = JSON.parse(localStorage.chips);
      let index = this.chips.findIndex(x => x.title === title);
      if (index == -1) {
        this.chips.push({
          title: title,
          img: img,
          price: price
        });
      } else this.chips[index].price = price;

      localStorage.chips = JSON.stringify(this.chips);
    },
    resetDefault() {
      this.chips = localStorage.chips = JSON.stringify(this.chipsReset);
      this.chips = JSON.parse(localStorage.chips);
    }
  }
};
</script>

<style scoped>
input[type="number"] {
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.btn-setchips {
  top: 36%;
  position: relative;
  text-align: center;
  width: 64%;
}

.btn-setchipsedit {
  top: 36%;
  position: relative;
  text-align: center;
  width: 64%;
  background-color: silver;
  border-radius: 6px;
}

.btn-saves {
  top: 110%;
  position: absolute;
  text-align: center;
  width: 64%;
  margin-left: 0%;
  /* border-radius: 1rem; */
}

.btn-edit {
  top: 110%;
  position: absolute;
  text-align: center;
  width: 64%;
  margin-left: 0%;
  /* border-radius: 1rem; */
}
</style>
