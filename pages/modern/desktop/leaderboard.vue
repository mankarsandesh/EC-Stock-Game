<template>
  <div>
    <breadcrumbs title="Leaderboard" linkItem="bet-history" titlebtn="bet-history" />
    <v-container>
       <leaderBoardHeader  />   
       <leaderBoard  />   
    </v-container>
  </div>
</template>
<script>
import {mapMutations,mapState} from 'vuex'
import leaderBoard from "~/components/modern/leaderboard/leaderboard";
import leaderBoardHeader from "~/components/modern/leaderboard/leaderboardHeader";
import breadcrumbs from "~/components/breadcrumbs";  
export default {
  layout: "desktopModern",
  components: {
    breadcrumbs,
    leaderBoard,
     leaderBoardHeader
  },
  data() {
      return {
      tabs: ["history", "current bet"],
      active: null,     
    };   
  }
};
</script>