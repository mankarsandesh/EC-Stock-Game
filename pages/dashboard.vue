<template>
  <v-container grid-list-md text-xs-center fluid grid-list-lg fill-height class="bg-gmaeType">
    <v-container>
      <v-layout row wrap align-center justify-center>
        <v-flex xs12>
          <h1 class="display-1">{{$t('msg.ChooseTheVersionToPlay')}}</h1>
        </v-flex>
        <v-flex xs12>
          <v-img src="/bg/gameType.png"></v-img>
        </v-flex>
        <v-layout row wrap align-center justify-space-around>
          <v-btn
            :to="stockname == '' ? '/classic/l-btc1-live':'/classic/l-'+stockname+'-live'"
            :large="$vuetify.breakpoint.smAndUp"
            :small="$vuetify.breakpoint.smAndDown"
            color="red"
            class="white--text"
          >{{$t('msg.ClassicVersion')}}</v-btn>
          <v-btn
            :to="linkto"
            :large="$vuetify.breakpoint.smAndUp"
            :small="$vuetify.breakpoint.smAndDown"
            color="green"
            class="white--text"
          >{{$t('msg.ModernVersion')}}</v-btn>
        </v-layout>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { isMobile } from "mobile-device-detect";
import countryFlag from "vue-country-flag";
import languageDialog from "~/components/LanguageDialog";
import Logout from "~/components/Logout";
export default {
  layout: "nolayout",
  // middleware: 'getApiKey',
  components: {
    countryFlag,
    languageDialog,
    Logout
  },
  data() {
    return {
      stockname: "btc1",
      linkto: ""
    };
  },
  mounted() {
    this.linkto = isMobile ? "/modern" : "/modern/desktop/" + this.stockname;
  },
  created() {
    this.stockname = window.location.search
      .split("?")[1]
      .split("=")[1]
      .split("&")[0];
    // console.log(this.stockname)
  },
  watch: {
    "$screen.width"() {
      if (this.$screen.width <= 1204) {
        this.linkto = "modern";
      } else {
        this.linkto = "/modern/desktop/" + stockname;
      }
    }
  },
  computed: {
    ...mapGetters(["getlocale", "getUserName"]),
    countryflag() {
      return this.getlocale;
    }
  },
  methods: {}
};
</script>
