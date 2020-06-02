<template>
  <section class="breadcrumbs">
    <v-container>
      <v-parallax dark height="130" class="parallax" >
        <v-layout align-center justify-center>
          <v-flex md5 lg5>
            <h3 class="title">{{ title }}</h3>
          </v-flex>
          <v-flex md5 lg5 class="text-right">
            <v-btn
              v-if="linkItem"
              class="buttonGreen"
              :to="'/modern/desktop/' + linkItem"
              dark
              >{{ titlebtn }}</v-btn
            >

            <v-btn
              v-if="linkItem2"
              class="buttonGreen"
              :to="'/modern/desktop/' + linkItem2"
              dark
              >{{ titlebtn2 }}</v-btn
            >
          </v-flex>
        </v-layout>
      </v-parallax>
    </v-container>
  </section>
</template>
<script>
import Button from "~/components/Button";
export default {
  components: {
    Button
  },
  props: ["linkItem", "linkItem2", "title", "titlebtn", "titlebtn2"]
};
</script>
<style scoped>
.title {
  font-size: 30px !important;
}
.parallax .v-parallax__image{
  display: contents !important;
}
</style>
