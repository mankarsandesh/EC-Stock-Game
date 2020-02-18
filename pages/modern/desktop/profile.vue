<template>
  <div>
    <v-layout row wrap>
      <v-flex xs3 class="pt-5" style="background-color:white">
        <div class="profile_head text-xs-center">
          <div class="image_container">
            <v-avatar :size="90">
              <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar" />
            </v-avatar>
            <span class="camera_container">
              <button class="btn_camera">
                <v-icon color="black" :size="20">photo_camera</v-icon>
              </button>
            </span>
          </div>
          <h1>Naresh kathad</h1>
          <p>Online Status : 2hours</p>
        </div>

        <div class="profile_menu">
          <div class="display_component"></div>
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

      <!-- change component here when click menu  -->
      <v-flex xs9>
        <basicInfo v-if="activeMenu =='basic information'"></basicInfo>
        <onlineHistoy v-if="activeMenu =='online history'"></onlineHistoy>
        <notification v-if="activeMenu =='my notification'"></notification>
        <stockAnalysis  v-if="activeMenu =='stock analysis'"></stockAnalysis>
        <follower  v-if="activeMenu =='my followers'"></follower>
        <setting  v-if="activeMenu =='setting'"></setting>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
import basicInfo from "~/components/modern/profile/baicInfo";
import onlineHistoy from "~/components/modern/profile/onlineHistory";
import notification from "~/components/modern/profile/notification";
import stockAnalysis from "~/components/modern/profile/stockAnalysis";
import follower from "~/components/modern/profile/follower";
import setting from "~/components/modern/profile/setting";
export default {
  layout: "desktopModern",
  components: {
    basicInfo,
    onlineHistoy,
    notification,
    stockAnalysis,
    follower,
    setting
  },
  data() {
    return {
      activeMenu: "basic information",
      profileMenu: [
        {
          title: "basic information",
          class: "menu_title_active"
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
      this.activeMenu = this.profileMenu[index].title;
      this.profileMenu[index].class = "menu_title_active";
    },
    ...mapMutations(["setIsLoadingStockGame"])
  }
};
</script>

<style scoped>
.display_component {
  position: absolute;
  height: 550px;
  width: 8px;
  right: -8px;
  top:-73px;
  background: linear-gradient(to bottom, #6713cd 20%, #9b19a8 51%);
}
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
  margin-top: 56px;
  margin-left: -28px;
}
.profile_menu {
  margin-bottom: 100%;
  position: relative;
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
.v-avatar img {
  box-shadow: 1px 7px 19px rgb(145, 145, 145);
}
</style>
  