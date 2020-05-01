<template>
  <div>
    <breadcrumbs
      :title="$t('breadcrumbs.notification')"
      linkItem="gamerule"
      :titlebtn="$t('breadcrumbs.gamerule')"
    />
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 md12 mt-5>
          <notification :notificationData="notificationData" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import breadcrumbs from "~/components/breadcrumbs";
import notification from "~/components/modern/stocklist/notification";
import config from "~/config/config.global";
import log from "roarr";

export default {
  layout: "desktopModern",
  components: {
    notification,
    breadcrumbs
  },
  data() {
    return {
      window: 0,
      tabs: ["notification"],
      active: null,
      notificationData: []
    };
  },
  async created() {
    await this.fetch();
  },
  computed: {
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
    })
  },
  methods: {
    ...mapActions(["setIsLoadingStockGame"]),
    async fetch() {
      try {
        var reqBody = {
          portalProviderUUID: this.portalProviderUUID,
          userUUID: this.userUUID,
          version: config.version
        };
        var res = await this.$axios.$post(
          config.getUserNotification.url,
          reqBody,
          {
            headers: config.header
          }
        );
        if (res.status) {
          this.notificationData = res.data;
        } else {
          throw new Error(config.error.general);
        }
      } catch (ex) {
        console.log(ex);
        this.$swal({
          title: ex.message,
          type: "error",
          timer: 1000
        });
        log.error(
          {
            req: reqBody,
            res,
            page: "pages/modern/desktop/notification.vue",
            apiUrl: config.getUserNotification.url,
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
