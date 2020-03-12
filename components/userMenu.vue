<template>
  <div style="z-index:100">
    <v-menu offset-y :close-on-content-click="false" :min-width="180">
      <template v-slot:activator="{ on }">
        <v-btn flat v-on="on" v-show="isShow == 'classic'">
          <v-icon size="30">account_circle</v-icon>
        </v-btn>
        <v-btn flat v-on="on" v-show="isShow == 'modern'">
          <v-avatar size="40">
            <img :src="imgProfile" />
          </v-avatar>          
          <div class="userLogoutMenu">
            <span>{{getUserInfo.firstName}} {{getUserInfo.lastName}}</span>
            <span>            
              <animated-number
                :value="getUserInfo.balance"
                :formatValue="formatToPrice"
                class="balance"
              />
            </span>
          </div>
          <i class="fa fa-caret-down" />
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          @click="$router.push('/modern/desktop/profile/basicinfo');"
          v-show="isShow == 'modern'"
        >
          <i class="fa fa-user fa-2x margin-right-5" />
          <v-list-tile-title>{{$t('menu.profile')}}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          @click="$router.push('/modern/desktop/profile/onlinehistory');"
          v-show="isShow == 'modern'"
        >
          <i class="fa fa-hourglass-half fa-15x margin-right-5" />
          <v-list-tile-title>{{$t('profile.online history')}}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          @click="$router.push('/modern/desktop/profile/stockanalysis');"
          v-show="isShow == 'modern'"
        >
          <i class="fa fa-line-chart fa-15x margin-right-5" />
          <v-list-tile-title>{{$t('profile.stock analysis')}}</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="getLogout()">
          <i class="fa fa-lock fa-2x margin-right-5" />
          <v-list-tile-title>Sign Out</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
import AnimatedNumber from "animated-number-vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  components: {
    AnimatedNumber
  },
  data() {
    return {
      dialogprofile: false,
      isShow: ""
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
    imgProfile() {
      return this.getUserInfo.profileImage === ""
        ? "/no-profile-pic.jpg"
        : "http://uattesting.equitycapitalgaming.com/" +
            this.getUserInfo.profileImage;
    }
  },
  mounted() {
    this.isShow = location.pathname.split("/")[1];
  },
  methods: {
    formatToPrice(value) {
      return `${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "1,")}`;
    },
    getLogout() {
      this.$swal({
        title: "Are you sure?",
        text: "Did you leave the EC Gaming page?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes, Logout!",
        cancelButtonText: "No, Cancel Logout!",
        closeOnConfirm: false,
        closeOnCancel: false
      }).then(isConfirm => {
        if (isConfirm.value) {
          this.$swal({
            title: "Good Bye EC Gaming!",
            type: "success",
            showConfirmButton: false,
            timer: 1500
          }).then(Confirm => {
            this.$store.state.auth_token = [];
            localStorage.apikey = [];
            window.close();
          });
        } else {
          this.$swal({
            title: "Cancelled Logout",
            type: "error",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.v-menu__content {
  border-radius: 15px;
}
.v-list {
  padding: 0px;
}
.userLogoutMenu {
  font-size: 12px;
  float: left;
  text-align: left;
  padding: 10px 20px;
  display: inline-grid;
}
.userLogoutMenu .balance {
  color: #003f70;
  font-size: 16px;
}
.v-list__tile i {
  font-size: 16px;
}
.v-list__tile .v-list__tile__title {
  margin-left: 5px;
  text-transform: capitalize;
  font-size: 14px;
}
.fa-15x {
  font-size: 1.45em;
}

.margin-right-5 {
  margin-right: 5px;
}

.v-avatar {
  -webkit-box-align: center;
  align-items: center;
  border-radius: 50%;
  display: -webkit-inline-box;
  display: inline-flex;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  text-align: center;
  vertical-align: middle;
  border: 2px solid;
}
</style>
