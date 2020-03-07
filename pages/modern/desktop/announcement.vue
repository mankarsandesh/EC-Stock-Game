<template>
  <div>
    <breadcrumbs title="Announcement" linkItem="gamerule" titlebtn="Game Rule" />
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
    ...mapState(["portalProviderUUID", "headers"])
  },
  methods: {
    ...mapMutations(["setIsLoadingStockGame"]),
    async fetch() {
      try {
        const { data } = await this.$axios.$post(
          "http://uattesting.equitycapitalgaming.com/webApi/getAllAnnouncements",
          {
            portalProviderUUID: this.portalProviderUUID,
            version: "0.1"
          },
          {
            headers: {
              Authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh" // basic AUTH before send, because the backend they will check
            }
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