<template>
  <div>
    
    <v-flex xs6 style="margin:0 auto;">
      <table class="table" >
        <thead class="thead-dark">
          <tr>
            <th scope="col">Player Id</th>
            <th scope="col">Player Name</th>
            <th scope="col">Total Bet</th>
            <th scope="col">Win Rate</th>  
            <th scope="col">Total ProfitEarned</th>            
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in getTopPlayer" :key="index">
            <th scope="col">#45646</th>
            <th scope="col">{{item.userId}}</th>
            <th scope="col">{{item.totalBet}}</th>
             <th scope="col">{{item.winRate}}</th>
              <th scope="col">{{item.totalProfitEarned}}</th>
                
          </tr>
         

          
          
          

        </tbody>
        
      </table>
    </v-flex>
    
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      
    };
  },
  mounted() {
    this.asyTopPlayer();
    
  },
  methods: {
    ...mapActions(["asyTopPlayer"])
  },
  computed: {
    ...mapGetters(["getTopPlayer"])
  }
 
};
</script>