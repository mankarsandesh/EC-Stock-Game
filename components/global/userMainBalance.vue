<template>
  <span>
    {{ checkCurrency(getUserCurrency) }}    
    <!-- {{ getUserBalance }} -->
    <animated-number
      :value="getUserBalance"
      :formatValue="formatToPrice"
      class="balance"
    />
  </span>
</template>
<script>
import AnimatedNumber from "animated-number-vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import config from "../../config/config.global";
import utils from "~/mixin/utils";
export default {
  components: {
    AnimatedNumber
  },
  data() {
    return {
      logoutDialog: false,
      dialogConfirm: false,
      profileImage: "",
      dialogprofile: false,
      isShow: ""
    };
  },
  // Call Helper Function
  mixins: [utils],
  created() {
    this.connectUserBalanceSocket();
  },
  computed: {
    ...mapGetters(["getUserBalance", "getUserCurrency","getUserUUID"])
  },
  methods: {
    ...mapActions(["setUserBalance"]),
    formatToPrice(value) {
      return `${Number(value)
        .toFixed(2)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
    },
    listenUserBalance({ channelName, eventName }, callback) {
      window.Echo.channel(channelName).listen(eventName, callback);
    },
    connectUserBalanceSocket() {
      this.listenUserBalance(
        {
          channelName: `balanceUpdate.${this.getUserUUID}`,
          eventName: "balanceUpdate"
        },
        ({ data }) => {
          try {  
            if (data.status) {
              this.setUserBalance(data.data.userBalance);
            } else {
              throw new Error(this.$root.$t("error.general"));
            }
          } catch (ex) {
            console.log(ex);
          }
        }
      );
    }
  }
};
</script>

<style scoped></style>
