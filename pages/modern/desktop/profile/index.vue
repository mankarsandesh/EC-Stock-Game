<template>
  <div>
    <v-flex xs12 class="pt-5">
      <v-layout row>
        <v-flex xs6 sm6 md6 lg4>
          <div class="amount_container">
            <div class="decorator_card decorator_card_green"></div>
            <span>{{ $t("msg.accountBalance") }}</span>
            <br />
            <span class="amount" v-if="userData.balance != 0">
              {{
              userData.balance | currency
              }}
            </span>
            <span class="amount" v-if="userData.balance == 0">00.00</span>
            <!-- <span class="title_currentcy">USD</span> -->
          </div>
        </v-flex>
        <v-flex xs6 sm6 md6 lg4>
          <div class="amount_container">
            <div class="decorator_card decorator_card_blue"></div>

            <span>{{ $t("msg.rollingAmount") }}</span>
            <br />
            <span class="amount">{{ 161536 | currency }}</span>
            <!-- <span class="title_currentcy">USD</span> -->
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 pt-3>
      <v-layout>
        <v-flex xs12 pt-2 pl-5>
          <div style="margin-top:20px">
            <form action="/action_page.php">
              <div class="row">
                <div class="col-15">
                  <label for="username">
                    {{ $t("profile.username") }}
                    <span class="required">*</span>
                  </label>
                </div>
                <div class="col-85">
                  <input
                    ref="username"
                    type="text"
                    :value="userData.userName"
                    id="username"
                    name="username"
                    placeholder="Type your Username"
                  />
                  <span class="icon-container">
                    <v-icon :size="20" color="#bdbdbd" @click="iconClick($event)">edit</v-icon>
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="col-15">
                  <label for="first-name">{{ $t("profile.firstName") }}</label>
                </div>
                <div class="col-85">
                  <input
                    ref="firstName"
                    type="text"
                    :value="userData.firstName"
                    id="first-name"
                    name="first-name"
                    placeholder="Your first name"
                  />
                  <span class="icon-container">
                    <v-icon :size="20" color="#bdbdbd" @click="iconClick($event)">edit</v-icon>
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="col-15">
                  <label for="last-name">{{ $t("profile.lastName") }}</label>
                </div>
                <div class="col-85">
                  <input
                    ref="lastName"
                    type="text"
                    :value="userData.lastName"
                    id="last-name"
                    name="last-name"
                    placeholder="Your Last Name"
                  />
                  <span class="icon-container">
                    <v-icon :size="20" color="#bdbdbd" @click="iconClick($event)">edit</v-icon>
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="col-15">
                  <label for="gender">
                    {{ $t("profile.gender") }}
                    <span class="required">*</span>
                  </label>
                </div>
                <div class="col-85">
                  <select ref="gender" id="gender" name="gender" :value="userData.gender">
                    <option value="male">{{ $t("profile.male") }}</option>
                    <option value="female">{{ $t("profile.female") }}</option>
                  </select>
                  <span class="icon-container">
                    <v-icon :size="20" color="#bdbdbd">arrow_drop_down</v-icon>
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="col-15">
                  <label for="email">{{ $t("profile.email") }}</label>
                </div>
                <div class="col-85">
                  <input
                    ref="email"
                    type="text"
                    :value="userData.email"
                    id="email"
                    name="email"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-15">
                  <label for="country">
                    {{ $t("profile.country") }}
                    <span class="required">*</span>
                  </label>
                </div>
                <div class="col-85">
                  <select ref="country" id="country" name="country" :value="userData.country">
                    <option value="CHN">China</option>
                    <option value="USA">USA</option>
                    <option value="THA">Thailand</option>
                    <option value="LAO">LAOS</option>
                  </select>
                  <span class="icon-container">
                    <v-icon :size="20" color="#bdbdbd">arrow_drop_down</v-icon>
                  </span>
                </div>
              </div>

              <div class="row">
                <div class="col-15"></div>
                <div class="col-85">
                  <v-btn
                    :loading="updating"
                    :disabled="updating"
                    class="btn_save"
                    @click="saveClick()"
                  >{{ $t("msg.save") }}</v-btn>
                  <v-btn class="btn_cancel">{{ $t("msg.cancel") }}</v-btn>
                </div>
              </div>
            </form>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import config from "~/config/config.global";
import secureStorage from "../../../../plugins/secure-storage";
import log from "roarr";

export default {
  data() {
    return {
      updating: false
    };
  },
  mounted() {
    // alert(process.env.NODE_ENV)
  },
  computed: {
    ...mapGetters(["getUserInfo", "getPortalProviderUUID", "getUserUUID"]),
    userData() {
      let data = this.getUserInfo;
      return data;
    }
  },
  methods: {
    ...mapActions(["setUserData"]),
    iconClick(e) {
      e.target.parentElement.parentElement.firstElementChild.focus();
    },
    async saveClick() {
      this.updating = true;
      const ref = this.$refs;
      var formData = new FormData();
      formData.append("portalProviderUUID", this.getPortalProviderUUID);
      formData.append("userUUID", this.getUserUUID);
      formData.append("email", ref.email.value);
      formData.append("userName", ref.username.value);
      formData.append("firstName", ref.firstName.value);
      formData.append("lastName", ref.lastName.value);
      formData.append("gender", ref.gender.value);
      formData.append("country", ref.country.value);
      formData.append("version", config.version);
      try {
        var res = await this.$axios.$post(
          config.updateUserProfile.url,
          formData,
          {
            headers: config.header
          }
        );
        if (res.status) {
          this.setUserData();
          this.updating = false;
          this.$swal({
            type: "success",
            title: "Successful Information Saved!",
            showConfirmButton: false,
            timer: 1000
          });
        } else {
          this.updating = false;
          throw new Error(res.message[0]);
        }
      } catch (ex) {
        console.error(ex);
        this.updating = false;
        this.$swal({
          title: ex.message,
          type: "error",
          timer: 1000
        });
        log.error(
          {
            req: formData,
            res,
            page: "pages/modern/desktop/profile/index.vue",
            apiUrl: config.updateUserProfile.url,
            provider: secureStorage.getItem("PORTAL_PROVIDERUUID"),
            user: secureStorage.getItem("USER_UUID")
          },
          ex.message
        );
      }
    }
  }
};
</script>

<style scoped>
.required {
  color: red;
}
label {
  font-weight: 600;
  text-transform: capitalize;
}

input[type="text"]:disabled {
  background-color: #ccc;
}

input[type="text"],
select {
  width: 350px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 15px;
  resize: vertical;
  background-color: white;
  padding-right: 35px;
}

select {
  cursor: pointer;
}

input:focus,
select:focus {
  outline: none;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

.col-15 {
  float: left;
  width: 13%;
  margin-top: 16px;
}

.col-85 {
  position: relative;
  float: left;
  width: 87%;
  margin-top: 16px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

.btn_save {
  background-color: #38af3e !important;
  color: white;
  border-radius: 7px;
}

.btn_cancel {
  background-color: #656464 !important;
  color: white;
  border-radius: 7px;
}

.amount_container {
  background-color: white;
  color: black;
  padding: 10px 0 10px 0;
  margin-left: 20px;
  box-shadow: 0px 2px 5px rgb(145, 145, 145);
  border-radius: 15px;
  border-left-width: 1px;
  border-left-color: green;
  text-align: center;
  text-transform: capitalize;
  line-height: 1.1;
}

.amount {
  font-size: 32px;
  font-weight: bold;
  position: relative;
}

.title_currentcy {
  color: #888888;
  font-size: 14px;
  text-transform: uppercase;
  padding-left: 5px;
  position: absolute;
}

.decorator_card {
  position: absolute;
  height: 35px;
  width: 5px;
  border-radius: 10px;
  margin-top: 8px;
  margin-left: -2px;
}

.decorator_card_green {
  background-color: #39b01e;
}

.decorator_card_blue {
  background-color: #1e45b0;
}

.decorator_card_red {
  background-color: #b01e1e;
}

.icon-container {
  position: relative;
  right: 37px;
}

/* loading.... */
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
