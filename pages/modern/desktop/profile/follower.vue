<template>
  <div>
    <v-flex xs12 class="pt-5 pl-5">
      <div>
        <h2 class="text-uppercase">my followers </h2>
        <v-divider></v-divider>
      </div>
    </v-flex>
    <v-flex xs12 pt-5 pl-5>
      <v-flex xs10>
        <div class="title_container">
          <div
            class="follower_container"
            v-for="(data, index) in followerList"
            :key="index"
          >
            <nuxt-link :to="'/modern/desktop/userprofile/' + data.UUID">
              <img class="userImage" :src="imgProfile(data.profileImage)" />
              <span v-if="data.fullName" class="name">{{ data.fullName }}</span>             
              <span v-if="data.fullName == null" class="name" >{{ data.userName }}</span>                      
            </nuxt-link>
            <div class="followType">
                  <span>
                    <label>Follow by amount :</label>  USD 100
                  </span>
                   <span>
                    <label>Auto Stop Follow winning :</label>  USD 150
                  </span>
              </div>     
            <button class="btn_follow">follow</button>
          </div>
        </div>
      </v-flex>
    </v-flex>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import config from "../../../../config/config.global";
export default {
  data() {
    return {
      followerList: []
    };
  },
  mounted() {
    this.getFolloweList();
  },
  computed: {
    ...mapGetters(["getPortalProviderUUID", "getUserUUID"])
  },
  methods: {
    // fetch default image or from server image
    imgProfile(userImage) {
      return userImage === null
        ? "/no-profile-pic.jpg"
        : `${config.apiDomain}/` + userImage;
    },
    async getFolloweList() {
      try {
        const res = await this.$axios.$post(
          config.getUserFollower.url,
          {
            portalProviderUUID: this.getPortalProviderUUID,
            userUUID: this.getUserUUID,
            followersType: 1,
            version: config.version
          },
          {
            headers: config.header
          }
        );
        console.log(res);
        if (res.code == 200) {
          this.followerList = res.data;
        }
        console.log(res);
      } catch (ex) {
        console.error(ex.message);
      }
    }
  }
};
</script>

<style scoped>
.followType span{
  text-align: center;
  width: 100%;
  display:block;
}
.followType label{
  width: 100%;
  font-weight: 600;
}
.followType{
  margin:15px 5px;
}
.userImage {
  width: 150px;
  height: 150px;
  border-radius: 180px;
  margin: 0 auto;
}
.name {
  margin-top: 10px;
  font-size: 18px;
  color: #013f70;
  display: block;
  width: 100%;
}
.filter_container {
  margin-bottom: 30px;
}
.filter-title {
  font-weight: bold;
  /* font-size: 18px;
  text-transform: uppercase; */
}
.title_container {
  padding-top: 15px;
  padding-bottom: 15px;
  text-transform: capitalize;
}
.follower_container {
  border-radius: 4px;
  border: 1px solid #dddddd;
  background-color: white;
  width: 30%;
  float: left;
  margin: 5px;
  padding: 15px 10px;
  text-align: center;
}
.btn_follow {
  margin-top: 10px;
  font-weight: bold;
  bottom: 4px;
  width: 130px;
  padding: 4px 0px;
  color: #fff;
  text-transform: uppercase;
  background: linear-gradient(to right, #25b175 19%, #2cb121 70%);
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgb(145, 145, 145);
}
.btn_unfollow {
  background: linear-gradient(to right, #898888 19%, #626161 70%);
}
.btn_following {
  background: linear-gradient(to right, #51c6b8 19%, #73d07f 70%);
}
.input-container {
  position: relative;
}
input[type="text"],
select {
  width: 90%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 15px;
  resize: vertical;
  background-color: white;
}
input[type="text"] {
  padding-left: 35px;
}
select {
  padding-right: 35px;
}
.icon-container {
  position: absolute;
  top: 14px;
  right: 45px;
}
.icon-container-search {
  position: absolute;
  left: 10px;
  top: 14px;
}
select {
  cursor: pointer;
}
button:focus,
input:focus,
select:focus {
  outline: none;
}
.btn_go {
  background-color: green;
  padding: 10px;
  width: 60px;
  color: #ffffff;
  border-radius: 10px;
  font-weight: bold;
  text-transform: uppercase;
}
span.tag {
  position: relative;
  color: black;
  /* font-size: 12px; */
  border: 1px solid #cfcfd2;
  border-radius: 5px;
  padding: 2px 10px;
  margin-right: 15px;
}
.close-icon {
  position: absolute;
  border: 1px solid #cfcfd2;
  color: #cfcfd2;
  font-size: 8px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  top: -5px;
  right: -8px;
  text-align: center;
  background-color: white;
  font-weight: 900;
  cursor: pointer;
}

.span_center {
  margin: 0px 80px;
}
</style>
