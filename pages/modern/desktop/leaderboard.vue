<template>
  <div>
    <breadcrumbs
      title="Leaderboard"
      linkItem="bet-history"
      titlebtn="bet-history"
    />
    <v-container mb-5>
      <leaderBoardHeader />
      <leaderboardUserlist />
    </v-container>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import leaderboardUserlist from "~/components/modern/leaderboard/leaderboardUserlist";
import leaderBoardHeader from "~/components/modern/leaderboard/leaderboardHeader";
import breadcrumbs from "~/components/breadcrumbs";
export default {
  layout: "desktopModern",
  components: {
    breadcrumbs,
    'leaderboardUserlist': leaderboardUserlist,
    leaderBoardHeader
  },
  data() {
    return {
      tabs: ["history", "current bet"],
      active: null
    };
  }
};
</script>
