<template>
  <div>
    <breadcrumbs
      title="Announcement"
      linkItem="gamerule"
      titlebtn="Game Rule"
    />
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 md12>
          <announcement :head="head" :desserts="desserts" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
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
      head: [
        { text: "title", value: "title" },
        { text: "date", value: "createdAt" },
        { text: "preview", value: "message" }
      ],
      desserts: []
    };
  },
  created() {
    this.fetch();
  },
  computed: {
    ...mapState(["portalProviderUUID"])
  },
  methods: {
    ...mapMutations(["setIsLoadingStockGame"]),
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
        this.desserts = data;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
