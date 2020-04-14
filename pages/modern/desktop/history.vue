<template>
  <div>
    <breadcrumbs title="History" :linkItem="false" />
    <v-container> </v-container>
  </div>
</template>
<script>
import breadcrumbs from "~/components/breadcrumbs";
import { mapActions } from "vuex";
export default {
  layout: "desktopModern",
  components: {
    breadcrumbs
  },
  methods: {
    ...mapActions(["setIsLoadingStockGame"])
  }
};
</script>
