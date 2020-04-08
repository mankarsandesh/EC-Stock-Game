<template>
  <div>
    <breadcrumbs
      :title="$t('breadcrumbs.currentBet')"
      linkItem="bet-history"
      :titlebtn="$t('breadcrumbs.betHistory')"
    />
    <v-container>
      <currentBet :currentBets="currentBets" />
    </v-container>
  </div>
</template>
<script>
import currentBet from "~/components/modern/currentBet";
import breadcrumbs from "~/components/breadcrumbs";
import { mapState } from "vuex";
import config from "../../../config/config.global";
export default {
  layout: "desktopModern",
  components: {
    currentBet,
    breadcrumbs,
  },
  data() {
    return {
      currentBets: [],
    };
  },
  computed: {
    ...mapState({
      portalProviderUUID: (state) => state.provider.portalProviderUUID,
      userUUID: (state) => state.provider.userUUID,
    }), //get 2 data from vuex first, in the computed
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        const userData = {
          portalProviderUUID: this.portalProviderUUID,
          userUUID: this.userUUID,
          version: config.version,
          betResult: [-1],
          offset: "0",
        };
        const res = await this.$axios.post(config.getAllBets.url, userData, {
          headers: config.header,
        });
        console.log(res);
        if (res.data.message === "success") {
          this.currentBets = res.data.data;
        } else {
          throw new Error(res.message);
        }
      } catch (ex) {
        this.fetch();
        console.error(ex.message);
      }
    },
  },
};
</script>
