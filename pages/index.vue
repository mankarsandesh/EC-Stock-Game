<template>
  <v-container fluid grid-list-lg fill-height class="image-bg">
    <v-fade-transition mode="out-in">
      <v-layout align-center column>
        <v-img src="/bg/group33.png" width="500" height="100" />
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
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { isMobile } from "mobile-device-detect";
import { CryptoJS } from "crypto-js";
export default {
  layout: "nolayout",
  middleware: "getApiKey",

  data() {
    return {
      stockname: "btc1",
      linkto: "",
      // const userData = this.$route.query;
      userData: {
        authUser: "TNKSuper",
        authPassword: "Test123!",
        portalProviderUUID: "743c7b7d-0166-48be-84c3-375430a3c0ae",
        userId: "dd7060bd-5da1-4f6c-96a2-fc292acd23f8",
        redirect: "www.whitelabel.com"
      }
    };
  },
  mounted() {
    let objJsonStr = JSON.stringify(this.userData);
    let buff = new Buffer(objJsonStr);
    let base64data = buff.toString("base64");

    if (this.userData.authUser && this.userData.authPassword) {
      if (this.userData.portalProviderUUID && this.userData.userId) {
        sessionStorage.setItem("AUTH", JSON.stringify(base64data));
        this.getProgress();
        this.linkto = isMobile
          ? "/modern"
          : "/modern/desktop/" + this.stockname;
      } else {
        console.log("Portal Provider OR userID is Missing..");
      }
    } else {
      console.log("Authication authUser & authPassword is Missing.");
    }
  },
  created() {
    this.stockname = window.location.search
      .split("?")[1]
      .split("=")[1]
      .split("&")[0];
    console.log(this.authUser)

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
    ...mapState(["authUser"])
  },
  methods: {
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
            seft.$router.push("/modern/desktop/btc1");
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