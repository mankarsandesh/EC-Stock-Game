<template>
  <div>
    <v-form @submit.prevent="updateProfile">
      <div class="d-between">
        <v-avatar size="170">
          <img src="/v.png" v-if="profile.avatar == null" alt />
          <img v-else :src="profile.avatar" alt />
        </v-avatar>

        <p>
          Online status : {{setTime(time.todayOnline, 0)}}
          <span>current balance : {{formatToPrice(userBalance)}}</span>
        </p>
      </div>

      <v-flex lg12>
        <table class="table table-striped">
          <tbody>
            <tr>
              <th scope="row" class="row">player id</th>
              <td>{{profile.userId}}</td>
              <td>
                <v-select
                  hide-details
                  v-model="profile.idSelect"
                  :items="selects"
                  label="EVERYONE CAN SEE"
                ></v-select>
              </td>
            </tr>
            <tr>
              <th scope="row" class="row">nickname</th>
              <td>
                {{profile.name}}
                <v-btn icon>
                  <v-icon>edit</v-icon>
                </v-btn>
              </td>
              <td>
                <v-select
                  hide-details
                  v-model="profile.nameSelect"
                  :items="selects"
                  label="EVERYONE CAN SEE"
                ></v-select>
              </td>
            </tr>
            <tr>
              <th scope="row" class="row">gender</th>
              <td>
                <v-select hide-details v-model="profile.genderSelect" :items="genders" label="Male"></v-select>
              </td>
              <td>
                <v-select
                  hide-details
                  v-model="profile.gender"
                  :items="selects"
                  label="EVERYONE CAN SEE"
                ></v-select>
              </td>
            </tr>
            <tr>
              <th scope="row" class="row">email</th>

              <td>
                {{profile.email}}
                <v-btn icon>
                  <v-icon>edit</v-icon>
                </v-btn>
              </td>
              <td>
                <v-select
                  hide-details
                  v-model="profile.emailSelect"
                  :items="selects"
                  label="EVERYONE CAN SEE"
                ></v-select>
              </td>
            </tr>
            <tr>
              <th scope="row" class="row">membership</th>

              <td>{{profile.memberShip}}</td>
              <td>
                <v-select
                  hide-details
                  v-model="profile.membershipSelect"
                  :items="selects"
                  label="EVERYONE CAN SEE"
                ></v-select>
              </td>
            </tr>
            <tr>
              <th scope="row" class="row">country</th>
              <td>
                <v-select
                  hide-details
                  v-model="profile.country"
                  :items="countselects"
                  label="China"
                ></v-select>
              </td>
              <td>
                <v-select
                  hide-details
                  v-model="profile.countrySelect"
                  :items="selects"
                  label="EVERYONE CAN SEE"
                ></v-select>
              </td>
            </tr>
            <tr>
              <th scope="row" class="row">balance</th>
              <td>{{profile.userBalance}}</td>
              <td>
                <v-select
                  hide-details
                  v-model="profile.balanceSelect"
                  :items="selects"
                  label="China"
                ></v-select>
              </td>
            </tr>
            <tr>
              <th scope="row" class="row">rolling</th>
              <td>$1795.00</td>
              <td>
                <v-select
                  hide-details
                  v-model="profile.rollingSelect"
                  :items="selects"
                  label="EVERYONE CAN SEE"
                ></v-select>
              </td>
            </tr>
          </tbody>
        </table>
        <v-flex>
          <v-btn class="my-btn">save</v-btn>
          <v-btn class="my-btn cancel">cancel</v-btn>
        </v-flex>
      </v-flex>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      selects: ["EVERYONE CAN SEE", "ONLY ME"],
      genders: ["MALE", "FEMALE"],
      countselects: [],
      profile: {
        avatar: "",
        country: "",
        created_at: "",
        currencyId: "",
        email: "",
        gender: "",
        id: "",
        lastActivity: "",
        lastLoginAt: "",
        memberShip: "",
        name: "",
        portalProvider: "",
        rolling: "",
        totalBet: "",
        totalOnlineTime: "",
        userApiId: "",
        userBalance: "",
        userId: "",
        userIp: "",
        userStatus: "",
        rolling: "",
        // value from select
        idSelect: "",
        nameSelect: "",
        genderSelect: "",
        emailSelect: "",
        membershipSelect: "",
        countrySelect: "",
        balanceSelect: "",
        rollingSelect: ""
      },
      time: "",
      userBalance: ""
    };
  },
  created() {
    this.fetchAll();
  },
  mounted() {
    this.getOnlineTime();
  },
  methods: {
    formatToPrice(value) {
      return `$ ${Number(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
    },
    async fetchAll() {
      let res = await this.$axios.$get(
        "/api/me?apikey=" + localStorage.apikey
      );
      this.userBalance = res.userBalance;
      console.log(res);
    },
    async getOnlineTime() {
      let dataGet = await this.$axios.$get(
        "/api/me/online?method=profile&apikey=" + localStorage.apikey
      );
      this.time = dataGet.data;
    },
    setTime(seconds, val) {
      let days = Math.floor(seconds / (24 * 60 * 60));
      seconds -= days * (24 * 60 * 60);
      let hours = Math.floor(seconds / (60 * 60));
      seconds -= hours * (60 * 60);
      let minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;
      if (val == 1) {
        return (
          (0 < days ? days + this.$root.$t("msg.days") + ", " : "") +
          hours +
          this.$root.$t("msg.hours") +
          ", " +
          minutes +
          this.$root.$t("msg.minute")
        );
      } else {
        return (
          hours +
          this.$root.$t("msg.hours") +
          ", " +
          minutes +
          this.$root.$t("msg.minute")
        );
      }
    }
  }
};
</script>
