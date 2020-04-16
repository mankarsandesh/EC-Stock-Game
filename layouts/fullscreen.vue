<template>
  <v-app>
    <div style="height:100%">
      <nuxt />
    </div>
    <!-- Chat Windows-->  
   
   <invitation
        :gameUUID="getGameUUIDByStockName($route.params.id)"
        :key="$route.name"
      />

  </v-app>
</template>

<script>
import invitation from "~/components/invitation";
import { mapGetters } from "vuex";
export default {
  components: {
    invitation
  },
  computed: {
    ...mapGetters(["getGameUUIDByStockName"])
  }
};
</script>
