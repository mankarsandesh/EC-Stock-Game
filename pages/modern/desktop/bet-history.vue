<template>
  <div>
    <breadcrumbs title="Bet History" linkItem="current-bet" />
    <v-container>
      <v-layout row class="justify-center">
        <v-flex xs12 md12>
          <h1>This is the Main page of bet histoy</h1>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import breadcrumbs from "~/components/breadcrumbs";

export default {
  layout: "desktopModern",
  components: {
    breadcrumbs
  }
};
</script>

<style>
</style>