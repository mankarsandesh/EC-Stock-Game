<template>
  <div>
    <v-flex xs12 class="pt-5 pl-5">
      <div>
        <h2 class="text-uppercase">{{ $t("profile.myfollowing") }} ({{ this.countFollwing }})</h2>
        <v-divider></v-divider>
      </div>
    </v-flex>
    <v-flex xs12 pt-5 pl-5>
      <v-flex xs10>
        <div class="title_container">
          <h3 class="text-black onFollower" v-if="followingListEmpty == true">
            <i class="fa fa-user-o fa-2x" />
            <div>{{ $t("profile.noFollowing") }}</div>
          </h3>
          <div class="follower_container" v-for="(data, index) in followingList" :key="index">
            <nuxt-link :to="'/modern/desktop/userprofile/' + data.UUID">
              <img class="userImage" :src="imgProfile(data.profileImage)" />
              <span v-if="data.fullName" class="name">{{ data.fullName }}</span>
              <span v-if="data.fullName == null" class="name">
                {{
                data.userName
                }}
              </span>
            </nuxt-link>
            <div class="followType">
              <span>
                <label>{{ data.followRuleValue[0].name == 'byAmount' ? $t("leaderboard.followbyAmount") : $t("leaderboard.followbyRate") }} :</label>
                {{ data.followRuleValue[0].value }}
              </span>
              <span>
                <label>{{ data.unFollowRuleValue[0].name == 'byWin' ? $t("leaderboard.stopbyWinning") : data.unFollowRuleValue[0].name == 'byLose' ? $t("leaderboard.stopbyLosing") : data.unFollowRuleValue[0].name == 'byTime' ? $t("leaderboard.stopbyTiming") : $t("leaderboard.stopbyBets")}}:</label>
                {{ data.unFollowRuleValue[0].value }}
              </span>
            </div>
            <button
              class="btn_unfollow"
              v-on:click="
                followUserBet(
                  data.userName,
                  data.profileImage,
                  data.UUID,
                  data.isFollowing
                )
              "
            >{{ $t("useraction.unfollow") }}</button>
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
        @followBetClose="closeFollowBet"
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
      username: "",
      userImage: "",
      FollowUserUUID: "",
      FolloworNot: "",
      dialog: false,
      followingListEmpty: false,
      active: null,
      followingList: [],
      countFollwing: 0,
      defaultImage: "/no-profile-pic.jpg"
    };
  },
  components: {
    followBet
  },
  mounted() {
    this.getFollowingList();
  },
  computed: {
    ...mapGetters(["getPortalProviderUUID", "getUserUUID"])
  },
  methods: {
    // Close Follow Bet Popup
    closeFollowBet() {
      this.dialog = false;
    },
    followUserBet: function(username, userImg, userUUID, method) {
      this.username = username;
      this.FollowUserUUID = userUUID;
      method == 0 ? (this.FolloworNot = 1) : (this.FolloworNot = 2);
      this.userImage = userImg ? this.imgProfile(userImg) : this.defaultImage;
      this.dialog = true;
    },
    // fetch default image or from server image
    imgProfile(userImg) {
      return userImg === null
        ? this.defaultImage
        : `${config.apiDomain}/` + userImg;
    },
    // fetch default image or from server image
    async getFollowingList() {
      try {
        const res = await this.$axios.$post(
          config.getUserFollower.url,
          {
            portalProviderUUID: this.getPortalProviderUUID,
            userUUID: this.getUserUUID,
            followersType: 2, // Follwing users List
            version: config.version
          },
          {
            headers: config.header
          }
        );
        if (res.code == 200) {
          this.followingList = res.data;
          this.countFollwing = res.data.length;

          if (this.countFollwing == 0) {
            this.followingListEmpty = true;
          } else {
            this.followingListEmpty = false;
          }
        } else {
          this.followingListEmpty = true;
        }
      } catch (ex) {
        console.error(ex.message);
      }
    }
  }
};
</script>

<style scoped>
.onFollower {
  color: #aeafb0;
  text-align: center;
  font-size: 28px;
  width: 500px;
  margin: 20% auto;
}
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
  box-shadow: 0px 2px 5px rgb(145, 145, 145);
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
