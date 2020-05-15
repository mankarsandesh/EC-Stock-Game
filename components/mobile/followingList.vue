<template>
  <div>
    <v-flex>
      <v-list subheader>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              My Following
              <span class="followingCount">{{ followingList.length }} </span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-flex v-if="followingList.length == 0">
          <h2 class="text-center" style="color:#a3a3a3;">
            There are no users in Following List.
          </h2>
        </v-flex>
      </v-list>
      <v-list two-line>
        <template v-for="(item, index) in followingList">
          <v-list-tile :key="item.userName" avatar>
            <nuxt-link :to="'/modern/userprofile/' + item.UUID">
              <v-list-tile-avatar>
                <img :src="userImgProfile(item.profileImage)" />
              </v-list-tile-avatar>
            </nuxt-link>

            <v-list-tile-content style="width:40%;">
              <v-list-tile-title v-html="item.userName"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn
                v-bind:class="[
                  item.isFollowing == 0
                    ? 'buttonGreensmall'
                    : 'buttonCancelSmall'
                ]"
                v-on:click="
                  followUser(
                    item.userName,
                    item.profileImage,
                    item.UUID,
                    item.isFollowing
                  )
                "
                dark
                >{{
                  item.isFollowing == 0
                    ? $t("useraction.follow")
                    : $t("useraction.unfollow")
                }}</v-btn
              >
            </v-list-tile-action>
          </v-list-tile>
          <v-divider
            v-if="index + 1 < followingList.length"
            :key="index"
          ></v-divider>
        </template>
      </v-list>
    </v-flex>

    <!-- Follow and UnFollow Dialog box-->
    <v-dialog
      v-model="followDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar card dark style="background-color:#2cb13b;">
          <v-btn icon dark @click="closeFollowBet">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{
            this.FolloworNot == 1 ? "Follow Bet " : "UnFollow Bet"
          }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <followBet
          :username="this.username"
          :userImage="this.userImage"
          :FollowerUserUUID="this.FollowUserUUID"
          :isFollowing="this.FolloworNot"
          @followBetClose="closeFollowBet"
        />
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import config from "~/config/config.global";
import followBet from "~/components/mobile/follow/followBet";
export default {
  data() {
    return {
      followingList: [],
      defaultImage: "/no-profile-pic.jpg",
      FolloworNot: "",
      FollowUserUUID: "",
      method: "",
      username: "",
      userImage: "",
      followDialog: false
    };
  },
  components: {
    followBet
  },
  mounted() {
    this.getFollowingList();
  },
  computed: {
    ...mapState({
      portalProviderUUID: state => state.provider.portalProviderUUID,
      userUUID: state => state.provider.userUUID
    }) //get 2 data from vuex first, in the computed
  },
  methods: {
    ...mapActions(["setSnackBarMessage"]),
    // fetch default image or from server image
    userImgProfile(userImage) {
      return userImage === null
        ? this.defaultImage
        : `${config.apiDomain}/` + userImage;
    },
    // Close Follow Bet Popup
    closeFollowBet() {
      this.followDialog = false;
      this.getFollowingList();
    },
    // Follow and Unfollow User
    followUser(username, userImage, userUUID, method) {
      this.username = username;
      this.FollowUserUUID = userUUID;
      method == 0 ? (this.FolloworNot = 1) : (this.FolloworNot = 2);
      this.userImage = this.userImgProfile(userImage);
      this.followDialog = true;
    },
    // fetch User Following List
    async getFollowingList() {
      try {
        const reBody = {
          portalProviderUUID: this.portalProviderUUID,
          userUUID: this.userUUID,
          followersType: 2, // Follwing users List
          version: config.version
        };
        const res = await this.$axios.$post(
          config.getUserFollower.url,
          reBody,
          {
            headers: config.header
          }
        );
        console.log(res.data);
        if (res.code == 200) {
          this.followingList = res.data;
        } else {
          this.setSnackBarMessage(config.error.general);
        }
      } catch (ex) {
        this.setSnackBarMessage(config.error.general);
        console.error(ex.message);
      }
    }
  }
};
</script>
<style scoped>
.followingCount {
  background-color: #334599;
  color: #fff;
  border-radius: 5px;
  padding: 5px;
  width: 40px;
  height: 40px;
}
</style>
