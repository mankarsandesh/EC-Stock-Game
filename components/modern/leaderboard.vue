<template>
  <div>
    
    <v-flex xs6 style="margin:0 auto;">
      <table class="table" >
        <thead class="thead-dark">
          <tr>
            <th scope="col">Player Id</th>
            <th scope="col">Player Name</th>
            <th scope="col">Win Ammount</th>
            <th scope="col">Rank</th>  
            <th scope="col">Date</th>            
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="col">#45646</th>
            <th scope="col">Sandesh Mankar</th>
            <th scope="col">$125555</th>
            <th scope="col">1</th>    
            <th scope="col">20 Nov 2019</th>        
          </tr>
          <tr>
            <th scope="col">#45646</th>
            <th scope="col">Ritesh Naik</th>
            <th scope="col">$$1000</th>
            <th scope="col">2</th>    
            <th scope="col">20 Nov 2019</th>        
          </tr>
          <tr>
            <th scope="col">#45646</th>
            <th scope="col">Tany Singh</th>
            <th scope="col">$4522</th>
            <th scope="col">3</th>    
            <th scope="col">20 Nov 2019</th>        
          </tr>
          <tr>
            <th scope="col">#45646</th>
            <th scope="col">Sandesh Mankar</th>
            <th scope="col">$45678</th>
            <th scope="col">4</th>    
            <th scope="col">20 Nov 2019</th>        
          </tr>
          <tr>
            <th scope="col">#45646</th>
            <th scope="col">Sandesh Mankar</th>
            <th scope="col">$7854</th>
            <th scope="col">5</th>    
            <th scope="col">20 Nov 2019</th>        
          </tr>
          <tr>
            <th scope="col">#45646</th>
            <th scope="col">Sandesh Mankar</th>
            <th scope="col">$4567</th>
            <th scope="col">6</th>    
            <th scope="col">20 Nov 2019</th>        
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