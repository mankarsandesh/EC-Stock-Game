<template>
  <div>
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <v-container>
      <leaderBoardHeader />
      <leaderboardUserlist />  
    </v-container>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import leaderboardUserlist from "~/components/mobile/leaderboard/leaderboardUserlist";
import leaderBoardHeader from "~/components/mobile/leaderboard/leaderboardHeader";
export default {
  components: {
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