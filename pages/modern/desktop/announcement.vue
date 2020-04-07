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
    }),
  },
  methods: {
    ...mapActions(["setIsLoadingStockGame"]),
    async fetch() {
      try {
        const { data } = await this.$axios.$post(
          config.getAllAnnouncements.url,
          {
            portalProviderUUID: this.portalProviderUUID,
            version: config.version
          },
          {
            headers: config.header
          }
        );
        this.announcementData = data;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
