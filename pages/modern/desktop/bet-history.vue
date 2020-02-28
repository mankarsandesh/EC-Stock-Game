<template>
  <div>
    <breadcrumbs title="Bet History" linkItem="current-bet" titlebtn="current-bet" />
    <v-container>
      <v-layout row class="justify-center">
        <v-flex xs12 md12>
          <bethistory />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import bethistory from "~/components/modern/bethistory";
import breadcrumbs from "~/components/breadcrumbs";
import { mapState } from "vuex";
export default {
  layout: "desktopModern",
  components: {
    breadcrumbs,
    bethistory
  },

  computed: {
    ...mapState(["portalProviderUUID", "headers"])
  },
  async created() {
    const data = {
      portalProviderUUID: this.portalProviderUUID,
      userUUID: "102e29ca-24ac-42e8-b680-ccc33e5e761e",
      version: "0.1",
      betResult: [-1,0,1],
      limit: "20",
      offset: "0"
    };
    const repsonse = await this.$axios.$post(
      "http://uattesting.equitycapitalgaming.com/webApi/getAllBets",
      data,
      { headers: this.headers }
    );
    console.log(repsonse);
  }
};
</script>

<style>
</style>
