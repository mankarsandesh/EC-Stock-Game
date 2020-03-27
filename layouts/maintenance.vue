<template>
  <div>
    <maintenance />
  </div>
</template>
<script>
import maintenance from "~/components/maintenance";
export default {
  layout: "desktopModern",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  // head() {
  //   const title =
  //     this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
  //   return {
  //     title
  //   };
  // },
  components: {
    maintenance
  },
  // data() {
  //   return {
  //     pageNotFound: "Sorry, we're down for scheduled maintenance",
  //     otherError: "An error occurred"
  //   };
  // }
};
</script>

<style scoped>
h1 {
  font-size: 25px;
}
</style>
