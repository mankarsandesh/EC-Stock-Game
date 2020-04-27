<template>
  <div>
    <breadcrumbs
      :title="$t('breadcrumbs.stockList')"
      linkItem="notification"
      linkItem2="gamerule"
      :titlebtn="$t('breadcrumbs.notification')"
      :titlebtn2="$t('breadcrumbs.gamerule')"
    />
    <v-container>
      <v-layout row wrap mt-3>
        <v-flex xs3 class="d-flex">
          <v-select
            class="border-round"
            hide-details
            :items="items"
            :placeholder="$t('msg.sortby')"
          ></v-select>
        </v-flex>
        <v-flex xs1 class="d-flex mx-3">
          <v-btn @click="goSearch" class="buttonGreen">
            {{
            $t("msg.go")
            }}
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <stocklist />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import breadcrumbs from "~/components/breadcrumbs";
import stocklist from "~/components/modern/stocklist/stocklist";
export default {
  layout: "desktopModern",
  components: {
    stocklist,
    breadcrumbs
  },
  data() {
    return {
      items: [
        this.$root.$t("stock-list.ascending"),
        this.$root.$t("stock-list.descending")
      ],
      itemss: ""
    };
  },
  computed: {},
  methods: {
    goSearch() {
      console.log("You press search button");
    }
  },
  created() {
    this.active = false;
  }
};
</script>
