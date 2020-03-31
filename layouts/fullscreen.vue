<template>
  <v-app>
    <div style="height:100%">
      <nuxt />
    </div>
    <!-- Chat Windows-->
    <chatWindow
      :gameUUID="getGameUUIDByStockName($route.params.id)"
      :key="$route.name"
    />
    <!-- <chatWindow /> -->
  </v-app>
</template>

<script>
import chatWindow from "~/components/chatWindow";
import { mapGetters } from "vuex";
export default {
  components: {
    chatWindow
  },
  computed: {
    ...mapGetters(["getGameUUIDByStockName"])
  }
};
</script>
