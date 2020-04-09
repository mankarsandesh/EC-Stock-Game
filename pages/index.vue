<template>
  <v-container fluid grid-list-lg fill-height class="image-bg">
    <v-fade-transition mode="out-in">
      <v-layout align-center column>
        <v-img src="/bg/group33.png" width="500" height="100" />
        <div class="errorBox" v-if="messageError">
          <h4 v-for="(data, index) in messageError" :key="index">{{ data }}</h4>
        </div>
        <div class="errorBox" v-else>
          <h4 v-for="(data, index) in error_spone" :key="index">{{ data }}</h4>
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
  middleware: ["getApiKey", "checkAuth"],

  data() {
    return {
      getUserAuthInfo: "",
      stockname: "btc1",
      linkto: "",
      error_spone: []
    };
  },
  created() {
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
    ...mapGetters([
      "getPortalProviderUUID",
      "getUserUUID",
      "UserAuth",
      "messageError"
    ])
  },
  methods: {
    async checlUserAuth() {
      try {
        const { data } = await this.$axios.post(
          config.userLoginAuth.url, // after finish crawl the every API will the the baseURL from AXIOS
          this.UserAuth, // data object
          {
            headers: config.header
          }
        );
        console.log(data);
        if (data.status) {
          const userInfo = {
            authUser: config.authUser,
            authPassword: config.authPassword,
            portalProviderUUID: this.UserAuth.portalProviderUUID,
            userId: data.data[0].userUUID,
            redirect: this.UserAuth.referrerURL
          };
          this.setUserUUID(userInfo.userId);
          localStorage.setItem("USER_UUID", userInfo.userId);
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
              this.error_spone.push(error);
            }
          } else {
            const error = "Authication authUser & authPassword is Missing.";
            this.error_spone.push(error);
          }
        } else {
          const error = data.message;
          this.error_spone.push(error);
        }
        // location.reload(true);
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions(["setAuth", "setUserUUID"]),

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
  padding: 5px;
  font-size: 23px;
}
.errorBox h2 {
  color: #333;
}
</style>
