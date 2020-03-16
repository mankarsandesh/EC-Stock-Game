<template>
  <div>
    <breadcrumbs title="History" :linkItem="false" />
    <v-container>
      <Histoy />
    </v-container>
  </div>
</template>
<script>
import breadcrumbs from "~/components/breadcrumbs";
import { mapMutations } from "vuex";
export default {
  layout: "desktopModern",
  components: {
    Histoy,
    breadcrumbs
  },
  methods: {
    ...mapMutations(["setIsLoadingStockGame"])
  }
};
</script>