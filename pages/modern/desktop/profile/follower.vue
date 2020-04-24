<template>
  <div>
    <v-flex xs12 class="pt-5 pl-5">
      <div>
        <h2 class="text-uppercase">{{$t('profile.myfollowers')}} ({{ this.countFollower }})</h2>
        <v-divider></v-divider>
      </div>
    </v-flex>
    <v-flex xs12 pt-5 pl-5>
      <v-flex xs10>
        <div class="title_container">
          <h3 class="text-black" v-if="followerEmpty == true">
            {{$t('profile.noFollowers')}}
          </h3>
          <div
            class="follower_container"
            v-for="(data, index) in followerList"
            :key="index"
          >
            <nuxt-link :to="'/modern/desktop/userprofile/' + data.UUID">
              <img class="userImage" :src="defaultImage" />
              <span v-if="data.fullName" class="name">{{ data.fullName }}</span>
              <span v-if="data.fullName == null" class="name">{{
                data.userName
              }}</span>
            </nuxt-link>
            <button
              v-if="data.isFollowing == 0"
              class="btn_follow"
              v-on:click="
                followUserBet(data.userName, data.userImage, data.UUID, 0)
              "
            >
              {{$t('leaderboard.follow')}}
            </button>
            <button
              v-if="data.isFollowing == 1"
              class="btn_unfollow"
              v-on:click="
                followUserBet(data.userName, data.userImage, data.UUID, 1)
              "
            >
              unfollow
            </button>
          </div>
        </div>
      </v-flex>
    </v-flex>

    <!-- Follow Dialog -->
  <v-dialog v-model="dialog" width="500" class="followDialog">
      <followBet      
        :username="this.username"
        :userImage="this.userImage"
        :FollowerUserUUID="this.FollowUserUUID"
        :isFollowing="this.FolloworNot"
      />
  </v-dialog>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import config from "~/config/config.global";
import followBet from "~/components/modern/follow/followBet";
export default {
  data() {
    return {
      followerEmpty: false,
      username: "",
      FollowUserUUID: "",
      FolloworNot: "",
      userImage: "",
      dialog: false,
      active: null,
      followerList: [],
      countFollower: 0,
      defaultImage: "/no-profile-pic.jpg"
    };
  },
  components: {
    followBet
  },
  mounted() {
    this.getFollowerList();
  },
  computed: {
    ...mapGetters(["getPortalProviderUUID", "getUserUUID"])
  },
  methods: {
    // Follow User Bet
    followUserBet: function(username, userImg, userUUID, method) {
      this.username = username;
      this.FollowUserUUID = userUUID;
      method == 0 ? this.FolloworNot = 1 : this.FolloworNot = 2;     
      this.userImage = userImg ? this.imgProfile(userImg) : this.defaultImage;
      this.dialog = true;
    },
    // fetch default image or from server image
    imgProfile(userImg) {
      return userImg === null
        ? this.defaultImage
        : `${config.apiDomain}/` + userImg;
    },
    async getFollowerList() {
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
        if (res.code == 200) {
          this.followerList = res.data;
          this.countFollower = res.data.length;

          if (this.countFollower == 0) {
            this.followerEmpty = true;
          } else {
            this.followerEmpty = false;
          }
        } else {
          this.followerEmpty = true;
        }
      } catch (ex) {
        console.error(ex.message);
      }
    }
  }
};
</script>

<style scoped>
.followType span {
  text-align: center;
  width: 100%;
  display: block;
}

.followType label {
  width: 100%;
  font-weight: 600;
}

.followType {
  margin: 15px 5px;
}

.userImage {
  width: 100px;
  height: 100px;
  border-radius: 180px;
  margin: 0 auto;
}

.name {
  margin-top: 10px;
  font-size: 18px;
  color: #013f70;
  display: block;
  width: 100%;
  text-transform: capitalize;
}

.title_container {
  padding-top: 15px;
  padding-bottom: 15px;
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
  bottom: 10px;
  width: 130px;
  padding: 4px 0px;
  color: #fff;
  text-transform: uppercase;
  background: linear-gradient(to right, #25b175 19%, #2cb121 70%);
  border-radius: 15px;
}

.btn_unfollow {
  margin-top: 10px;
  font-weight: bold;
  bottom: 10px;
  width: 130px;
  padding: 4px 0px;
  color: #fff;
  text-transform: uppercase;
  background-image: linear-gradient(to right, #888787 19%, #626161 70%);
  border-radius: 15px;
}
</style>
