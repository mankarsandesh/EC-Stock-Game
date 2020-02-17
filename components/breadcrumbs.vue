<template>
  <section class="breadcrumbs">
    <v-container>
      <v-layout row class="justify-between">
        <h3 class="display-2 white--text">{{title}}</h3>
        <Button v-if="linkItem" :linkItem="linkItem" btnTitle="View bet history" />
      </v-layout>
    </v-container>
  </section>
</template>
<script>
import Button from "~/components/Button";
export default {
  components: {
    Button
  },
  props: ["linkItem", "title"]
};
</script>
