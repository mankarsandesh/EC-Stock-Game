<template>
  <div>
    <breadcrumbs
      :title=" $t('breadcrumbs.leaderboard')"
      linkItem="bet-history"
      :titlebtn=" $t('breadcrumbs.betHistory')"
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
