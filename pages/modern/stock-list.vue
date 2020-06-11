<template>
  <div>
    <v-layout row wrap mt-2>
      <v-flex xs12>
        <stocklist :sortBy="sortBy" />
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import breadcrumbs from "~/components/mobile/mobilebreadcrumbs";
import stocklist from "~/components/mobile/stocklist";
export default {
  components: {
    breadcrumbs,
    stocklist
  },
  data() {
    return {
      sortBy: ""
    };
  },
  computed: {
    ...mapGetters(["getStockList"]),
    isHorizontal() {
      let w = window.innerWidth;
      let h = window.innerHeight;
      if (w > h) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.v-btn:not(.v-btn--depressed):not(.v-btn--flat) {
  /* will-change: box-shadow; */
  box-shadow: none !important;
  border-radius: 0;
}
/* .v-label{
    color:#003e70 !important
} */
.v-input--selection-controls__input .v-label {
  color: rgb(218, 25, 25) !important;
}

.input-group--disabled.input-group--select label {
  color: rgb(35, 224, 215) !important;
}

.v-input__control .v-input__slot .v-text-field__slot input {
  margin-top: 0 !important;
}

a {
  color: blue;
  text-decoration: underline;
}
</style>
