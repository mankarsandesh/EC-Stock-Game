<template>
  <v-container fluid grid-list-lg fill-height class="image-bg">
    <v-fade-transition mode="out-in">
      <v-layout align-center column>
        <v-img src="/bg/group33.png" width="500" height="100" />
        <div class="errorBox" v-if="messageError">
          <h4 v-for="(data, index) in messageError" :key="index">{{ data }}</h4>
        </div>
        <div class="preloader-wrap">
          <div class="percentage" id="precent"></div>
          <div class="loader">
            <div class="trackbar">
              <div class="loadbar"></div>
            </div>
            <div class="glow"></div>
          </div>
        </div>
      </v-layout>
    </v-fade-transition>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import config from "../config/config.global";
import { isMobile } from "mobile-device-detect";
export default {
  layout: "nolayout",
  middleware: "getApiKey",

  data() {
    return {
      getUserAuthInfo: "",
      authUser: "",
      referrerURL: document.referrer.match(/:\/\/(.[^/]+)/)[1],
      stockname: "btc1",
      linkto: "",
      portalProviderUUID: this.$route.query.portalProviderUUID,
      portalProviderUserID: this.$route.query.portalProviderUserID,
      balance: this.$route.query.balance,
      userData: [],
      messageError: []
    };
  },
  mounted() {
    if (!this.portalProviderUUID) {
      const error = "portalProviderUUID field is Missing";
      this.messageError.push(error);
    }
    if (!this.portalProviderUserID) {
      const error = "portalProviderUserID field is Missing";
      this.messageError.push(error);
    }
    if (!this.balance) {
      const error = "balance field is Missing";
      this.messageError.push(error);
    }
    if (!this.referrerURL) {
      const error = "Somthing Wrong.";
      this.messageError.push(error);
    }
    this.checlUserAuth();
  },
  watch: {
    "$screen.width"() {
      if (this.$screen.width <= 1204) {
        this.linkto = "modern";
      } else {
        this.linkto = "/modern/desktop/" + stockname;
      }
    }
  },
  computed: {
    ...mapGetters(["getPortalProviderUUID", "getUserUUID"])
  },
  methods: {
    async checlUserAuth() {
      try {
        const userData = {
          portalProviderUUID: this.portalProviderUUID,
          portalProviderUserID: this.portalProviderUserID,
          version: 0.1,
          ip: "225.457.454.123",
          domain: this.referrerURL,
          balance: this.balance
        };
        console.log(userData);
        const { data } = await this.$axios.post(
          config.userLoginAuth.url, // after finish crawl the every API will the the baseURL from AXIOS
          userData, // data object
          {
            headers: config.header
          }
        );
        console.log(data);
        if (data.status) {
          const userInfo = {
            authUser: config.authUser,
            authPassword: config.authPassword,
            portalProviderUUID: this.portalProviderUUID,
            userId: data.data[0].userUUID,
            redirect: this.referrerURL
          };
          this.setPortalProviderUUID(userInfo.portalProviderUUID);
          this.setUserUUID(userInfo.userId);
          localStorage.setItem(
            "PORTAL_PROVIDERUUID",
            userInfo.portalProviderUUID
          );
          localStorage.setItem("USER_UUID", userInfo.userId);
          localStorage.setItem("REFERERN_URL", userInfo.redirect);
          let objJsonStr = JSON.stringify(userInfo);
          let buff = new Buffer(objJsonStr);
          let base64data = buff.toString("base64");
          if (userInfo.authUser && userInfo.authPassword) {
            if (userInfo.portalProviderUUID && userInfo.userId) {
              let buffDecode = new Buffer(base64data, "base64");
              let authData = buffDecode.toString("ascii");
              this.setAuth(authData);
              localStorage.setItem("AUTH", JSON.stringify(base64data));
              this.getProgress();
              this.linkto = isMobile
                ? "/modern"
                : "/modern/desktop/" + this.stockname;
              // location.reload(true);
            } else {
              const error = "Portal Provider OR userID is Missing...";
              this.messageError.push(error);
            }
          } else {
            const error = "Authication authUser & authPassword is Missing.";
            this.messageError.push(error);
          }
        } else {
          const error = "Somthing Wrong Please check.";
          this.messageError.push(error);
        }
        // location.reload(true);
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions(["setAuth", "setPortalProviderUUID", "setUserUUID"]),

    getProgress() {
      let seft = this;
      let width = 100,
        perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
        EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
        time = parseInt((EstimatedTime / 1000) % 60) * 100;
      // Loadbar Animation
      $(".loadbar").animate(
        {
          width: width + "%"
        },
        time
      );
      // Loadbar Glow Animation
      $(".glow").animate(
        {
          width: width + "%"
        },
        time
      );

      // Percentage Increment Animation
      let PercentageID = $("#precent"),
        start = 0,
        end = 100,
        durataion = time;
      animateValue(PercentageID, start, end, durataion);

      function animateValue(id, start, end, duration) {
        let range = end - start,
          current = start,
          increment = end > start ? 1 : -1,
          stepTime = Math.abs(Math.floor(duration / range)),
          obj = $(id);

        let timer = setInterval(function() {
          current += increment;
          //   $(obj).text(current + "%");  //sHOW BY %
          $(obj).text("lOADING..."); // SHOW BY LOADING
          obj.innerHTML = current;
          if (current == end) {
            clearInterval(timer);
            window.location = "/modern/desktop/btc1";
            // seft.$router.push("/modern/desktop/btc1");
            // seft.$router.push("/dashboard?stockname=" + seft.stockname);
          }
        }, stepTime);
      }

      // Fading Out Loadbar on Finised
      setTimeout(function() {
        $(".preloader-wrap").fadeOut(100);
      }, time);
    }
  }
};
</script>
<style scoped>
.errorBox {
  background-color: #fff;

  margin-bottom: 20px;
}
.errorBox h2 {
  color: #333;
}
</style>

