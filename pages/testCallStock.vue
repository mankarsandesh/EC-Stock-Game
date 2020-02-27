<template>
  <v-container class="mt-3">
    <stockSelect />
  </v-container>
</template>

<script>
import stockSelect from "~/components/stockSelect";
import { mapActions, mapState } from "vuex";
export default {
  layout: "desktopModern",

  components: {
    stockSelect
  },
  data: () => ({
    stock: []
  }),
  // computed: {
  //   ...mapState(["portalProviderUUID", "headers"])
  // },
  // async created() {
  //   const { data } = await this.$axios.$post(
  //     "http://uattesting.equitycapitalgaming.com/webApi/getStock",
  //     { portalProviderUUID: this.portalProviderUUID },
  //     { headers: this.headers }
  //   );
  //   console.log(data);
  // },

};
</script>


