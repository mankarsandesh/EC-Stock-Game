<template>
  <div>
    <breadcrumbs
      :title="$t('breadcrumbs.announcement')"
      linkItem="gamerule"
      :titlebtn="$t('breadcrumbs.gamerule')"
    />
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 md12 mt-5>
          <announcement :announcementData="announcementData" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import breadcrumbs from "~/components/breadcrumbs";
import announcement from "~/components/modern/stocklist/announcement";
import config from "../../../config/config.global";
import log from "roarr";
export default {
  layout: "desktopModern",
  components: {
    announcement,
    breadcrumbs
  },
  data() {
    return {
      window: 0,
      tabs: ["announcement"],
      active: null,
      announcementData: []
    };
  },
  created() {
    this.fetch();
  },
  computed: {
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID
    })
  },
  methods: {
    ...mapActions(["setIsLoadingStockGame"]),
    async fetch() {
      try {
        const res = await this.$axios.$post(
          config.getAllAnnouncements.url,
          {
            portalProviderUUID: this.portalProviderUUID,
            version: config.version
          },
          {
            headers: config.header
          }
        );
        if(res.status) {
          this.announcementData = res.data;
        } else {
          throw new Error('Something went Wrong');
        }
      } catch (ex) {
        console.log(ex);
        this.$swal({
          title: ex.message,
          type: "error",
          timer: 1000
        });
        log.error({
          page: this.$options.name,
          provider: localStorage.getItem('PORTAL_PROVIDERUUID'),
          user: localStorage.getItem('USER_UUID')
        }, ex.message);
      }
    }
  }
};
</script>
