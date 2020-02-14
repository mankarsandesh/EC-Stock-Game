<template>
  <div>
    <v-layout row wrap>
      <v-flex xs3 class="pt-5" style="background-color:white">
        <div class="profile_head text-xs-center">
          <div class="image_container">
            <v-avatar color="black" :size="90">
              <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar" />
            </v-avatar>
            <div class="camera_container">
              <button class="btn_camera">
                <v-icon color="black" :size="20">photo_camera</v-icon>
              </button>
            </div>
          </div>
          <h1>Naresh kathad</h1>
          <p>Online Status : 2hours</p>
        </div>
        <div class="profile_menu">
          <ul class="pa-3">
            <li
              :class="menu.class"
              @click="setActiveMenu(index)"
              v-for="(menu,index) in profileMenu"
              :key="index"
            >{{menu.title}}</li>
          </ul>
        </div>
      </v-flex>
      <v-flex xs9>
        <v-flex xs12 class="pt-5">
          <v-layout row>
            <v-flex xs6 sm6 md4 lg3>
              <div class="amount_container">
                <div class="decorator_card decorator_card_green"></div>
                <span>account balance</span>
                <br />
                <span class="amount">1.615,36</span>
                <span class="title_currentcy">kip</span>
              </div>
            </v-flex>
            <v-flex xs6 sm6 md4 lg3>
              <div class="amount_container">
                <div class="decorator_card decorator_card_blue"></div>

                <span>rolling amount</span>
                <br />
                <span class="amount">1.615,36</span>
                <span class="title_currentcy">kip</span>
              </div>
            </v-flex>
            <v-flex xs6 sm6 md4 lg3>
              <div class="amount_container">
                <div class="decorator_card decorator_card_red"></div>

                <span>due amount</span>
                <br />
                <span class="amount">1.615,36</span>
                <span class="title_currentcy">kip</span>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 pt-3>
          <v-layout>
            <v-flex>
              <div class="display_component"></div>
            </v-flex>
            <!-- change component here when click menu  -->
            <v-flex xs12 pt-5 pl-5>
              <basicInfo></basicInfo>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
import basicInfo from "~/components/modern/profile/baicInfo";
import onlineHistoy from "~/components/modern/profile/onlineHistory";
import stockAnalysis from "~/components/modern/profile/stockAnalysis";
export default {
  layout: "desktopModern",
  components: {
    basicInfo,
    onlineHistoy,
    stockAnalysis
  },
  data() {
    return {
      profileMenu: [
        {
          title: "basic information",
          class: "menu_title_active",
          component: <basicInfo />
        },
        { title: "online history", class: "menu_title" },
        { title: "stock analysis", class: "menu_title" },
        { title: "my followers", class: "menu_title" },
        { title: "my notification", class: "menu_title" },
        { title: "setting", class: "menu_title" },
        { title: "sign out", class: "menu_title" }
      ],
      window: 0,
      active: null
    };
  },
  mounted() {},
  methods: {
    setActiveMenu(index) {
      this.profileMenu.forEach(element => {
        element.class = "menu_title";
      });
      this.profileMenu[index].class = "menu_title_active";
    },
    ...mapMutations(["setIsLoadingStockGame"])
  }
};
</script>

<style scoped>
.btn_camera {
  background-color: #ffffff;
  border-radius: 50%;
  padding: 6px;
  box-shadow: 0px 2px 5px rgb(145, 145, 145);
}
.btn_camera:focus {
  outline: none;
}
.image_container {
  position: relative;
}
.camera_container {
  position: absolute;
  margin-top: -32px;
  margin-left: 166px;
}
.profile_menu {
  margin-bottom: 100%;
}
.display_component {
  height: 550px;
  width: 5px;
  background: linear-gradient(to bottom, #6713cd 20%, #9b19a8 51%);
}
li {
  cursor: pointer;
  border-radius: 18px;
}
.menu_title {
  margin: 10px;
  padding: 15px;
  padding-left: 20px;
  text-transform: uppercase;
  font-weight: bold;
}
.menu_title_active {
  background: linear-gradient(to right, #2e7d32 20%, #39b01e 51%);
  margin: 10px;
  padding: 10px;
  padding-left: 20px;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
}
.amount_container {
  background-color: white;
  color: black;
  padding: 10px 0 10px 0;
  margin-left: 20px;
  box-shadow: 0px 2px 5px rgb(145, 145, 145);
  border-radius: 15px;
  border-left-width: 1px;
  border-left-color: green;
  text-align: center;
  text-transform: capitalize;
  line-height: 1.1;
}
.amount {
  font-size: 32px;
  font-weight: bold;
  position: relative;
}
.title_currentcy {
  color: #888888;
  font-size: 14px;
  text-transform: uppercase;
  padding-left: 5px;
  position: absolute;
}
.decorator_card {
  position: absolute;
  height: 35px;
  width: 5px;
  border-radius: 10px;
  margin-top: 8px;
  margin-left: -2px;
}
.decorator_card_green {
  background-color: #39b01e;
}
.decorator_card_blue {
  background-color: #1e45b0;
}
.decorator_card_red {
  background-color: #b01e1e;
}
</style>
  