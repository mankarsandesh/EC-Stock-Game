<template>
  <div>
    <betButton :stockName="$route.params.id" :loop="getLoop($route.params.id)"></betButton>
  </div>
</template>
<script>
import { mapGetters} from 'vuex'
import betButton from "~/components/modern/betButton";
import chartApp from "~/components/modern/chart";
export default {
  layout: "desktopModern",
  components: {
    betButton,
    chartApp
  },
  computed:{
      ...mapGetters([
          "getLoop"
      ])
  }
};
</script>