<template>
  <div>
    <breadcrumbs title="Leaderboard" linkItem="bet-history" titlebtn="bet-history" />
    <v-container>
       <leaderBoard/>   
    </v-container>
  </div>
</template>


<script>
import {mapMutations} from 'vuex'
import leaderBoard from "~/components/modern/leaderboard";
import breadcrumbs from "~/components/breadcrumbs";
export default {
  layout: "desktopModern",
  components: {
    breadcrumbs,
    leaderBoard
  },
  data() {
      return {
      tabs: ["history", "current bet"],
      active: null
    };
    
  },
  mounted(){

  },
  methods:{
   
  }
};
</script>