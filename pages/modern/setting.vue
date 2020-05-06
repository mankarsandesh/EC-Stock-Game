<template>
  <div>
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <div class="tab-container">
      <div class="tab-item" v-for="(tab, index) in tabs" :key="index">
        <v-btn
          block
          :class="active === index ? 'active-tab' : ''"
          @click="active = index"
        >
          {{ $t("menu." + tabs[index]) }}
        </v-btn>
      </div>
      <div class="tab-content">
        <chipamount v-if="active === 0" />
        <soundcontrol v-else />
      </div>
    </div>
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
      tabs: ["chip amount", "sound control"],
      active: 0
    };
  },
  methods: {
    ...mapActions(["setIsLoadingStockGame"])
  }
};
</script>
<style scoped>
.tab-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.active-tab {
  background-color: #1db42f !important;
  color: aliceblue;
}
.tab-item {
  padding: 0px 35px;
  width: 100%;
}
.tab-content {
  padding-top: 35px;
  margin: 10px;
}
</style>
