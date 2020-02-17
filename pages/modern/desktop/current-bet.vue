<template>
  <div>
    <breadcrumbs title="Current Bet" linkItem="bet-history" />
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 md12>
          <currentbet />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import currentbet from "~/components/classic/currentbetinfo";
import breadcrumbs from "~/components/breadcrumbs";
export default {
  layout: "desktopModern",
  components: {
    currentbet,
    breadcrumbs
  },
  data() {
    return {
      window: 0,
      tabs: ["current bet", "history"],
      active: null
    };
  }
};
</script>