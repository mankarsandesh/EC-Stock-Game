<template>
  <div>
    <bethistory :userBetHistory="userBetHistory" />
  </div>
</template>

<script>
import bethistory from "~/components/mobile/bethistory";
import breadcrumbs from "~/components/breadcrumbs";
import { mapState } from "vuex";
import config from "../../config/config.global";
import log from "roarr";

export default {
  layout: "default",
  components: {
    breadcrumbs,
    bethistory
  },
  data() {
    return {
      userBetHistory: []
    };
  },
  computed: {
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
    }) //get 2 data from vuex first, in the computed
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      // afer moumted call the functions this method will run the fetch the data from API
      try {
        var reqBody = {
          portalProviderUUID: this.portalProviderUUID,
          userUUID: this.userUUID,
          version: config.version,
          betResult: [0, 1],
          limit: "20",
          offset: "0"
        };
        var { data } = await this.$axios.post(config.getAllBets.url, reqBody, {
          headers: config.header
        });
        if (data.status) {
          this.userBetHistory = data.data;
        } else {
          throw new Error(config.error.general);
        }
      } catch (ex) {
        console.log(ex);
        log.error(
          {
            req: reqBody,
            res: data,
            page: this.$options.name,
            apiUrl: config.getAllBets.url,
            provider: localStorage.getItem("PORTAL_PROVIDERUUID"),
            user: localStorage.getItem("USER_UUID")
          },
          ex.message
        );
      }
    }
  }
};
</script>

<style></style>
