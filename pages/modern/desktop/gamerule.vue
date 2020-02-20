<template>
  <div xs2>
    <breadcrumbs
      title="Rule"     
      linkItem2="announcement"     
      titlebtn2="announcement"
    />
    <v-container>      
      <v-layout row wrap>
        <v-flex xs2>
          
        </v-flex>
        <v-flex xs8>
          <rules />
        </v-flex>
        <v-flex xs2>
          
        </v-flex>
      </v-layout>     
    </v-container>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
import rules from "~/components/modern/stocklist/rules";
import breadcrumbs from "~/components/breadcrumbs";
export default {
  layout: "desktopModern",
  components: {
    rules,
    breadcrumbs
  }
};
</script>