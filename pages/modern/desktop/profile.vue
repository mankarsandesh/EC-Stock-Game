<template>
  <v-container fluid>
    <input @change="uploadImage($event)" type="file" ref="inputFile" hidden />
    <v-layout pt-3 row wrap class="justify-center">
      <v-flex xs12 ms12 lg10 md10>
        <v-layout>
          <v-flex xs4 md3 lg3 xl2 class="pt-5" style="background-color:white">
            <div class="profile_head text-xs-center">
              <div class="image_container">
                <v-avatar :size="90">
                  <img
                    :src="
                      getUserInfo.profileImage
                        ? imgProfile
                        : defaultImage
                    "
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
              <h2 v-if="getUserInfo.firstName == null">
                {{ getUserInfo.userName }}
              </h2>
              <h2 v-if="getUserInfo.firstName" class="text-capitalize">
                {{ getUserInfo.firstName }} {{ getUserInfo.lastName }}
              </h2>
              <p><b> {{ $t("profile.onlinestatus") }} </b>  : Available </p>
            </div>
            <div class="profile_menu">
              <div class="display_component"></div>
              <ul class="pa-3">
                <nuxt-link to="/modern/desktop/profile/">
                  <li
                    :class="
                      '/modern/desktop/profile/' === currentChild
                        ? 'menu_title_active'
                        : 'menu_title'
                    "
                  >
                    {{ $t("profile.basicinfo") }}
                  </li>
                </nuxt-link>
                <nuxt-link to="/modern/desktop/profile/onlinehistory/">
                  <li
                    :class="
                      '/modern/desktop/profile/onlinehistory/' === currentChild
                        ? 'menu_title_active'
                        : 'menu_title'
                    "
                  >
                    {{ $t("profile.onlinehistory") }}
                  </li>
                </nuxt-link>
                <nuxt-link to="/modern/desktop/profile/stockanalysis/">
                  <li
                    :class="
                      '/modern/desktop/profile/stockanalysis/' === currentChild
                        ? 'menu_title_active'
                        : 'menu_title'
                    "
                  >
                    {{ $t("profile.stockanalysis") }}
                  </li>
                </nuxt-link>
                <nuxt-link to="/modern/desktop/profile/follower/">
                  <li
                    :class="
                      '/modern/desktop/profile/follower/' === currentChild
                        ? 'menu_title_active'
                        : 'menu_title'
                    "
                  >
                    {{ $t("profile.myfollowers") }}
                  </li>
                </nuxt-link>
                <nuxt-link to="/modern/desktop/profile/following/">
                  <li
                    :class="
                      '/modern/desktop/profile/following/' === currentChild
                        ? 'menu_title_active'
                        : 'menu_title'
                    "
                  >
                    {{ $t("profile.myfollowing") }}
                  </li>
                </nuxt-link>
                <nuxt-link to="/modern/desktop/profile/notification/">
                  <li
                    :class="
                      '/modern/desktop/profile/notification/' === currentChild
                        ? 'menu_title_active'
                        : 'menu_title'
                    "
                  >
                    {{ $t("profile.mynotification") }}
                  </li>
                </nuxt-link>
                <nuxt-link to="/modern/desktop/profile/setting/">
                  <li
                    :class="
                      '/modern/desktop/profile/setting/' === currentChild
                        ? 'menu_title_active'
                        : 'menu_title'
                    "
                  >
                    {{ $t("profile.setting") }}
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
import { mapActions, mapGetters } from "vuex";
import config from "../../../config/config.global";
export default {
  layout: "desktopModern",
  data() {
    return {
      defaultImage: `/no-profile-pic.jpg`,
      currentChild: "basicinfo",
      blurValue: 5,
      imageBase64: "",
      activeMenu: "online history",
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
      return `${config.apiDomain}/${this.getUserInfo.profileImage}`;
    }
  },
  watch: {
    imageBase64() {
      this.updateProfile();
    }
  },
  methods: {
    ...mapActions(["setUserData"]),
    uploadImage(e) {
      let self = this;
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
      formData.append("profileImage", this.$refs.inputFile.files[0]);
      formData.append("portalProviderUUID", this.getPortalProviderUUID);
      formData.append("userUUID", this.getUserUUID);
      formData.append("version", config.version);
      try {
        const res = await this.$axios.$post(
          config.updateUserProfile.url,
          formData,
          {
            headers: config.header
            // onUploadProgress: progressEvent => {
            //   const totalLength = progressEvent.lengthComputable
            //     ? progressEvent.total
            //     : progressEvent.target.getResponseHeader("content-length") ||
            //       progressEvent.target.getResponseHeader(
            //         "x-decompressed-content-length"
            //       );
            //   if (totalLength !== null) {
            //     this.blurValue = Math.round(totalLength - progressEvent.loaded);
            //   }
            // }
          }
        );
        console.log(res);
        if (res.code === 200) {
          this.blurValue = 0;
          this.setUserData();
        } else {
          throw new Error(Object.values(res.message)[0][0]);
        }
      } catch (ex) {
        this.imageBase64 = "";
        console.error(ex);
        this.$swal({
          title: ex.message,
          type: "error",
          timer: 1000
        });
      }
    }
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
  margin-bottom: 10px;
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
  background-color: #2cb038;
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
