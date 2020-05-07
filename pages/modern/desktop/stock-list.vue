<template>
  <div>
    <breadcrumbs :title="$t('breadcrumbs.stockList')" />
    <v-container>
      <v-layout row wrap mt-3 md6 align-center justify-center>
        <v-flex md10>
          <v-flex md6 class="d-flex">
            <v-select
              v-model="sortBy"
              class="border-round"
              hide-details
              :items="items"
              :placeholder="$t('msg.sortby')"
              :key="$root.$t('stock-list.ascending') + sortBy"
            ></v-select>
          </v-flex>
        </v-flex>
      </v-layout>
      <v-layout row wrap align-center justify-center>
        <v-flex md10 lg10>
          <stocklist :sortBy="sortBy" />
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
      sortBy: "asc"
    };
  },
  computed: {
    // to change select box while language change
    items() {
      return [
        { value: "asc", text: this.$root.$t("stock-list.ascending") },
        { value: "desc", text: this.$root.$t("stock-list.descending") }
      ];
    }
  },
  methods: {
    goSearch() {
      //console.log("You press search button");
    }
  },
  created() {
    this.active = false;
  }
};
</script>
