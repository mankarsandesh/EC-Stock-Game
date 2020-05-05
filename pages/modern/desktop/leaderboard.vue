<template>
  <div>
    <breadcrumbs :title="$t('breadcrumbs.leaderboard')" />
    <v-container mb-5>
      <leaderboardUserlist />
    </v-container>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import leaderboardUserlist from "~/components/modern/leaderboard/leaderboardUserlist";
import breadcrumbs from "~/components/breadcrumbs";
export default {
  layout: "desktopModern",
  components: {
    breadcrumbs,
    leaderboardUserlist: leaderboardUserlist
  },
  data() {
    return {
      tabs: ["history", "current bet"],
      active: null
    };
  }
};
</script>
