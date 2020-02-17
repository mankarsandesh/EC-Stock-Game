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
import Histoy from "~/components/classic/historyinfo";
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