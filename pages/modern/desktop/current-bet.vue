<template>
  <div>
    <breadcrumbs
      :title="$t('breadcrumbs.currentBet')"
      linkItem="bet-history"
      :titlebtn="$t('breadcrumbs.betHistory')"
    />
    <v-container>
      <!-- Send Data to currentBet Component -->
      <currentBet :currentBets="currentBets" :currency="getUserCurrency" />
    </v-container>
  </div>
</template>
<script>

import currentBet from "~/components/modern/currentBet";
import breadcrumbs from "~/components/breadcrumbs";
import { mapState, mapGetters,mapActions } from "vuex";
import config from "~/config/config.global";
import secureStorage from "../../../plugins/secure-storage";

export default {
  layout: "desktopModern",
  components: {
    currentBet,
    breadcrumbs
  },
  data() {
    return {
      currentBets: []
    };
  },
  computed: {
    // Get 2 Data from vuex first, in the computed
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
    }),
    ...mapGetters(["getUserCurrency"])
  },
  mounted() {
    this.currentBetData();
  },
  beforeDestroy(){
    this.userActivityAction();
  },
  methods: {
    ...mapActions(["userActivityAction"]),
    async currentBetData() {
      try {
        const reqBody = {
          portalProviderUUID: this.portalProviderUUID,
          userUUID: this.userUUID,
          version: config.version,
          betResult: [-1]
        };
        const { data } = await this.$axios.post(
          config.getAllBets.url,
          reqBody,
          {
            headers: config.header
          }
        );
        if (data.code == 200) {
          this.currentBets = data.data;
        } else if (data.code == 202) {
          this.loadingImage = false;
          this.$swal({
            type: "error",
            title: this.$root.$t("popupMsg.sessionExpired"),
            confirmButtonText: this.$root.$t("popupMsg.okLogout"),
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then(result => {
            if (result.value) {
              const URL = secureStorage.getItem("referrerURL");
              secureStorage.removeItem("USER_UUID");
              secureStorage.removeItem("PORTAL_PROVIDERUUID");
              secureStorage.removeItem("userSessionID");
              location.href = URL;
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
