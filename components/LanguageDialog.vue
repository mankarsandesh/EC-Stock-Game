<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card class="pa-3">
      <v-card-title class="headline">Choose Language</v-card-title>
      <v-layout class="card-flag">
        <v-flex xs6 class="d-block card-flag" v-for="(item,index) in lang" :key="index">
          <country-flag :country="item.country" size="big" />
          <v-radio-group v-model="value" row>
            <v-radio :value="item.value" @click="changeLange(item.value)"></v-radio>
          </v-radio-group>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";

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
          country: "us",
          value: "us"
        },
        {
          country: "cn",
          value: "cn"
        }
      ]
    };
  },
  created() {},
  computed: {
    ...mapGetters(["getlocale"]),
    value() {
      return this.getlocale;
    }
  },
  methods: {
    ...mapMutations(["SET_LANG"]),
    showDialog() {
      this.dialog = true;

    },
    changeLange(value) {
      this.SET_LANG(value);
      this.dialog = false;
      this.$i18n.locale = this.getlocale
    }
  }
};
</script>