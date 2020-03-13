<template>
  <div>
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <v-container>
       <leaderBoard />   
    </v-container>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import leaderBoard from "~/components/mobile/leaderboard";
export default {
  components: {
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