<template>
  <div>
    <input @change="readFile($event)" type="file" ref="inputFile" hidden />
    <v-layout pt-3 row wrap class="justify-center">
      <v-flex xs12 ms12 lg9>
        <v-layout>
          <v-flex xs4 ms3 lg3 xl2 class="pt-5" style="background-color:white">
            <div class="profile_head text-xs-center">
              <div class="image_container">
                <v-avatar :size="90">
                  <img v-if="imageBase64==''" :src="imgProfile" alt="img-profile" />
                  <img
                    :style="{ filter: `blur(${blurValue}px)`}"
                    v-else
                    :src="imageBase64"
                    alt="img-profile"
                  />
                </v-avatar>
                <span class="camera_container">
                  <button class="btn_camera">
                    <v-icon color="black" :size="20" @click="cameraClick">photo_camera</v-icon>
                  </button>
                </span>
                <!-- <span class="blur-img">uploading</span> -->
              </div>
              <h1>{{getUserInfo.firstName}} {{getUserInfo.lastName}}</h1>
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
          <v-flex xs8 sm9 lg9 xl10>
            <basicInfo v-if="activeMenu =='basic information'"></basicInfo>
            <onlineHistoy v-if="activeMenu =='online history'"></onlineHistoy>
            <notification v-if="activeMenu =='my notification'"></notification>
            <stockAnalysis v-if="activeMenu =='stock analysis'"></stockAnalysis>
            <follower v-if="activeMenu =='my followers'"></follower>
            <setting v-if="activeMenu =='setting'"></setting>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
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
      blurValue: 5,
      imageBase64: "",
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
        { title: "setting", class: "menu_title" }
      ],
      window: 0,
      active: null
    };
  },
  mounted() {},
  computed: {
    ...mapGetters(["getUserInfo", "getPortalProviderUUID", "getUserUUID"]),
    imgProfile() {
      return this.getUserInfo.profileImage === ""
        ? "/no-profile-pic.jpg"
        : "http://uattesting.equitycapitalgaming.com/" +
            this.getUserInfo.profileImage;
    }
  },
  watch: {
    imageBase64() {
      this.updateProfile();
    }
  },
  methods: {
    ...mapActions(["asynUserInfo"]),
    readFile(e) {
      let seft = this;
      console.log(e.target);
      if (e.target.files && e.target.files[0]) {
        let FR = new FileReader();
        FR.addEventListener("load", function(e) {
          seft.imageBase64 = e.target.result;
        });
        FR.readAsDataURL(e.target.files[0]);
      }
    },
    cameraClick() {
      this.$refs.inputFile.click();
    },
    async updateProfile() {
      const ref = this.$refs;
      let formData = new FormData();
      formData.append("email", this.getUserInfo.email);
      formData.append("firstName", this.getUserInfo.firstName);
      formData.append("lastName", this.getUserInfo.lastName);
      // formData.append("gender", this.getUserInfo.gender);
      // formData.append("country", this.getUserInfo.country);
      formData.append("profileImage", this.$refs.inputFile.files[0], "file");
      formData.append("portalProviderUUID", this.getPortalProviderUUID);
      formData.append("userUUID", this.getUserUUID);
      formData.append("version", 1);
      try {
        const res = await this.$axios.$post(
          "http://uattesting.equitycapitalgaming.com/webApi/updateUserProfile",
          formData,
          {
            headers: {
              Authorization: "Basic VG5rc3VwZXI6VGVzdDEyMyE="
            },

            onUploadProgress: progressEvent => {
              console.log("process......");
              const totalLength = progressEvent.lengthComputable
                ? progressEvent.total
                : progressEvent.target.getResponseHeader("content-length") ||
                  progressEvent.target.getResponseHeader(
                    "x-decompressed-content-length"
                  );
              if (totalLength !== null) {
                this.blurValue = Math.round(totalLength - progressEvent.loaded);
              }
            }
          }
        );
        if (res.code === 200) {
          this.blurValue = 0;
        } else {
          alert(res.message);
          console.log(res);
          this.imageBase64 = "";
        }
      } catch (ex) {
        console.error(ex);
        alert(ex.message);
      }
    },

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
  width: 5px;
  right: -5px;
  top: -73px;
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
.blur-img {
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: #39b01e;
  opacity: 0.5;
  left: 114px;
}
.camera_container {
  position: absolute;
  margin-top: 56px;
  margin-left: -28px;
  z-index: 1;
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
img {
  box-shadow: 1px 7px 19px rgb(145, 145, 145) !important;
}
</style>
  