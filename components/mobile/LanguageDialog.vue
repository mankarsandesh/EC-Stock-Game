<template>
  <v-dialog
    v-model="dialog"
    max-width="400"
    style="background-color:#fff!important;"
  >
    <v-card class="pa-3">
      <v-card-title class="headline">
        {{ $t("msg.chooseLanguage") }}
      </v-card-title>
      <v-layout class="card-flag">
        <v-flex
          xs6
          class="d-block card-flag"
          v-for="(item, index) in lang"
          :key="index"
        >
          <country-flag :country="item.country" size="big" />
          <!-- <v-radio-group v-model="value" row>
            <v-radio :value="item.value" @click="changeLange(item.value)"></v-radio>
          </v-radio-group> -->
          <div class="radio-container ">
            <input
              :checked="item.value === value"
              @click="changeLange(item.value)"
              type="radio"
              :id="item.value"
              name="radio-group"
            />
            <label :for="item.value"></label>
          </div>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import countryFlag from "vue-country-flag";

export default {
  components: {
    countryFlag
  },
  data() {
    return {
      dialog: false,
      lang: [
        {
          country: "cn",
          value: "cn"
        },
        {
          country: "us",
          value: "us"
        },
        {
          country: "th",
          value: "th"
        },
        {
          country: "la",
          value: "la"
        }
      ]
    };
  },
  created() {},
  computed: {
    ...mapGetters(["getLocale"]),
    value() {
      return this.getLocale;
    }
  },
  methods: {
    ...mapActions(["setLanguage"]),
    showDialog() {
      this.dialog = true;
    },
    changeLange(value) {
      this.setLanguage(value);
      this.dialog = false;
      this.$i18n.locale = this.getLocale;
    }
  }
};
</script>

<style scoped>
.radio-container {
  padding-top: 10px;
  padding-bottom: 15px;
  text-align: center;
}
[type="radio"]:checked,
[type="radio"]:not(:checked) {
  position: absolute;
  left: -9999px;
}
[type="radio"]:checked + label,
[type="radio"]:not(:checked) + label {
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  line-height: 20px;
  display: inline-block;
  color: #666;
}
[type="radio"]:checked + label:before,
[type="radio"]:not(:checked) + label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 18px;
  height: 18px;
  border: solid gray 2px;
  border-radius: 100%;
  background: #fff;
}
[type="radio"]:checked + label:after,
[type="radio"]:not(:checked) + label:after {
  content: "";
  width: 12px;
  height: 12px;
  background: black;
  position: absolute;
  top: 3px;
  left: 3px;
  border-radius: 100%;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
[type="radio"]:not(:checked) + label:after {
  opacity: 0;
  -webkit-transform: scale(0);
  transform: scale(0);
}
[type="radio"]:checked + label:after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}
</style>
