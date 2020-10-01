<template>
  <div>
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <currentbet
      :currentBets="currentBets"
      :currency="getUserCurrency"
    ></currentbet>
  </div>
</template>

<script>
import currentbet from "~/components/mobile/currentbet";
import config from "~/config/config.global";
import { mapState, mapGetters,mapActions} from "vuex";
import secureStorage from "../../plugins/secure-storage";

export default {
  layout: "",
  components: {
    currentbet
  },
  data() {
    return {
      currentBets: []
    };
  },
  computed: {
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
    }), //get 2 data from vuex first, in the computed
    ...mapGetters(["getUserCurrency"])
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        var reqBody = {
          portalProviderUUID: this.portalProviderUUID,
          userUUID: this.userUUID,
          version: config.version,
          betResult: [-1],         
          offset: "0"
        };
        var { data } = await this.$axios.post(config.getAllBets.url, reqBody, {
          headers: config.header
        });
        if (data.code == 200) {
          this.currentBets = data.data;
        } else if (data.code == 202) {
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
        } else {
          throw new Error(this.$root.$t("error.general"));
        }
      } catch (ex) {
        console.log(ex);
      }
    },    
  }
};
</script>
