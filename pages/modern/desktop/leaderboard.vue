<template>
  <div>
    <v-layout row wrap>
     
      <v-flex xs12 md12 style="margin-top:100px;">
        <v-window  vertical>
          <v-window-item>
                  <leaderBoard/>        
          </v-window-item>
        </v-window>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import leaderBoard from "~/components/modern/leaderboard.vue";
export default {
  layout: "desktopModern",
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