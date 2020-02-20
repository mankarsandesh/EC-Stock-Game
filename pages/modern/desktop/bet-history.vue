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
import bethistory from "~/components/classic/bethistory";
import breadcrumbs from "~/components/breadcrumbs";

export default {
  layout: "desktopModern",
  components: {
    breadcrumbs,
    bethistory
  }
};
</script>

<style>
</style>