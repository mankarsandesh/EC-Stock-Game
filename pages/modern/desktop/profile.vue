<template>
  <v-container fluid>
    <input @change="readFile($event)" type="file" ref="inputFile" hidden />
    <v-layout pt-3 row wrap class="justify-center">
      <v-flex xs12 ms12 lg10 md10>
        <v-layout>
          <v-flex xs4 md3 lg3 xl2 class="pt-5" style="background-color:white">
            <div class="profile_head text-xs-center">
              <div class="image_container">
                <v-avatar :size="90">
                  <img
                    v-if="imageBase64 == ''"
                    :src="imgProfile"
                    alt="img-profile"
                  />
                  <img
                    :style="{ filter: `blur(${blurValue}px)` }"
                    v-else
                    :src="imageBase64"
                    alt="img-profile"
                  />
                </v-avatar>
                <span class="camera_container">
                  <button class="btn_camera">
                    <v-icon color="black" :size="20" @click="cameraClick"
                      >photo_camera</v-icon
                    >
                  </button>
                </span>
                <!-- <span class="blur-img">uploading</span> -->
              </div>
              <h1>{{ getUserInfo.firstName }} {{ getUserInfo.lastName }}</h1>
              <p>Online Status : 2hours</p>
            </div>
            <div class="profile_menu">
              <div class="display_component"></div>
              <ul class="pa-3">
                <nuxt-link
                  v-for="(menu, index) in profileMenu"
                  :key="index"
                  :to="menu.path"
                >
                  <li
                    :class="
                      menu.path.toLowerCase() === currentChild.toLowerCase()
                        ? ' menu_title_active'
                        : 'menu_title'
                    "
                  >
                    {{ menu.title }}
                  </li>
                </nuxt-link>
              </ul>
            </div>
          </v-flex>

          <!-- change component here when click menu  -->
          <v-flex xs8 sm9 lg10 xl10>
            <nuxt-child />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import config from "../../../config/config.global";
export default {
  layout: "desktopModern",

  data() {
    return {
      currentChild: "basicinfo",
      blurValue: 5,
      imageBase64: "",
      activeMenu: "online history",
      profileMenu: [
        {
          title: "basic information",
          path: "/modern/desktop/profile/"
        },
        {
          title: "online history",
          path: "/modern/desktop/profile/onlinehistory/"
        },
        {
          title: "stock analysis",
          path: "/modern/desktop/profile/stockanalysis/"
        },
        {
          title: "my followers",
          path: "/modern/desktop/profile/follower/"
        },
        {
          title: "my notification",
          path: "/modern/desktop/profile/notification/"
        },
        { title: "setting", path: "/modern/desktop/profile/setting/" }
      ],
      window: 0,
      active: null
    };
  },
  beforeUpdate() {
    // make a active menu
    this.currentChild = this.$route.path;
  },
  created() {
    // make a active menu
    this.currentChild = this.$route.path;
  },
  computed: {
    ...mapGetters(["getUserInfo", "getPortalProviderUUID", "getUserUUID"]),
    imgProfile() {
      return this.getUserInfo.profileImage === "" ? "/no-profile-pic.jpg" : `${config.apiDomain}/${this.getUserInfo.profileImage}`;
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
      let self = this;
      console.log(e.target);
      if (e.target.files && e.target.files[0]) {
        let FR = new FileReader();
        FR.addEventListener("load", function(e) {
          self.imageBase64 = e.target.result;
        });
        FR.readAsDataURL(e.target.files[0]);
      }
    },
    cameraClick() {
      this.$refs.inputFile.click();
    },
    async updateProfile() {
      let formData = new FormData();
      formData.append("profileImage", this.$refs.inputFile.files[0], "file");
      formData.append("portalProviderUUID", this.getPortalProviderUUID);
      formData.append("userUUID", this.getUserUUID);
      formData.append("version", config.version);
      try {
        const res = await this.$axios.$post(
          config.updateUserProfile.url,
          formData,
          {
            headers: config.header,

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
          console.log(res.message);
          this.imageBase64 = "";
        }
      } catch (ex) {
        console.error(ex);
        alert(ex.message);
      }
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
