<template>
  <v-app>
    <div style="height:100%">
      <nuxt />
    </div>
    <!-- Chat Windows-->  
   
   <invitation
        :gameUUID="getGameUUIDByStockName($route.params.id)"
        :stockName="this.stockName"
        :key="$route.name"
      />

  </v-app>
</template>

<script>
import invitation from "~/components/invitation";
import { mapGetters } from "vuex";
export default {
  data(){
    return{
      stockName : null,
    }
  },
  components: {
    invitation
  },
  computed: {
    ...mapGetters(["getGameUUIDByStockName"])
  },
  created(){   
     let path = this.$nuxt.$route.fullPath.split("/");
     this.stockName = path[3];
  }
};
</script>
