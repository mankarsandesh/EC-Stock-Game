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

</style>
