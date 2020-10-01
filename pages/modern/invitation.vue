<template>
  <div>
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <v-container>
      <sendInvitation :key="getLocale" />
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import sendInvitation from "~/components/mobile/sendInvitation";
export default {
  computed: {
    ...mapGetters(["getLocale"])
  },
  components: {
    sendInvitation
  }
};
</script>
