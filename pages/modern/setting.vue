<template>
  <div>
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <v-layout row wrap>
      <v-flex xs12 md2>
        <v-item-group
          v-model="window"
          class="shrink ml-5 mr-5"
          mandatory
          tag="v-flex"
        >
          <v-item v-for="n in tabs" :key="n">
            <div slot-scope="{ active, toggle }">
              <v-btn
                block
                :class="active ? 'setting-btn-active' : 'setting-btn'"
                @click="toggle"
                >{{ $t("menu." + n) }}</v-btn
              >
            </div>
          </v-item>
        </v-item-group>
      </v-flex>
      <v-flex xs12 md10>
        <v-window
          v-model="window"
          class="elevation-1"
          style="color: #f2f4ff!important;"
          vertical
        >
          <!-- rules -->
          <v-window-item>
            <chipamount />
          </v-window-item>
          <!-- rules -->
          <!-- stock list -->
          <v-window-item>
            <soundcontrol />
          </v-window-item>
          <!-- stock list -->
        </v-window>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import chipamount from "~/components/mobile/chipamount";
import soundcontrol from "~/components/mobile/soundcontrol";

export default {
  layout: "default",
  components: {
    chipamount,
    soundcontrol
  },
  data() {
    return {
      window: 0,
      tabs: ["chip amount", "sound control"],
      active: null
    };
  },
  methods: {
    ...mapActions(["setIsLoadingStockGame"])
  }
};
</script>
