<template>
  <div xs2>
    <breadcrumbs
      :title="$t('breadcrumbs.rule')"
      linkItem2="announcement"     
      :titlebtn2="$t('breadcrumbs.announcement')"
    />
    <v-container>      
      <v-layout row wrap>
        <v-flex xs12 mt-3>
          <rules />
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