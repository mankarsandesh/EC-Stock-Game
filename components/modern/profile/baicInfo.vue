<template>
  <div>
    <v-flex xs12 class="pt-5">
      <v-layout row>
        <v-flex xs6 sm6 md4 lg3>
          <div class="amount_container">
            <div class="decorator_card decorator_card_green"></div>
            <span>account balance</span>
            <br />
            <span class="amount">1.615,36</span>
            <span class="title_currentcy">kip</span>
          </div>
        </v-flex>
        <v-flex xs6 sm6 md4 lg3>
          <div class="amount_container">
            <div class="decorator_card decorator_card_blue"></div>

            <span>rolling amount</span>
            <br />
            <span class="amount">1.615,36</span>
            <span class="title_currentcy">kip</span>
          </div>
        </v-flex>
        <v-flex xs6 sm6 md4 lg3>
          <div class="amount_container">
            <div class="decorator_card decorator_card_red"></div>

            <span>due amount</span>
            <br />
            <span class="amount">1.615,36</span>
            <span class="title_currentcy">kip</span>
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
                  <label for="fname">player ID</label>
                </div>
                <div class="col-85">
                  <input disabled type="text" id="fname" name="firstname" placeholder="188" />
                </div>
              </div>
              <div class="row">
                <div class="col-15">
                  <label for="lname">name</label>
                </div>
                <div class="col-85">
                  <input type="text" id="lname" name="lastname" placeholder="Your last name.." />
                  <span class="icon-container">
                    <v-icon :size="20" color="#bdbdbd" @click="iconClick($event)">edit</v-icon>
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="col-15">
                  <label for="country">gender</label>
                </div>
                <div class="col-85">
                  <select id="country" name="country">
                    <option value="australia">Australia</option>
                    <option value="canada">Canada</option>
                    <option value="usa">USA</option>
                  </select>
                  <span class="icon-container">
                    <v-icon :size="20" color="#bdbdbd">arrow_drop_down</v-icon>
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="col-15">
                  <label for="country">email</label>
                </div>
                <div class="col-85">
                  <input type="text" id="lname" name="lastname" placeholder="mackychinma@gmail.com" />
                </div>
              </div>
              <div class="row">
                <div class="col-15">
                  <label for="country">follow me</label>
                </div>
                <div class="col-85">
                  <select id="country" name="country">
                    <option value="australia">Australia</option>
                    <option value="canada">Canada</option>
                    <option value="usa">USA</option>
                  </select>
                  <span class="icon-container">
                    <v-icon :size="20" color="#bdbdbd">arrow_drop_down</v-icon>
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="col-15">
                  <label for="country">country</label>
                </div>
                <div class="col-85">
                  <select id="country" name="country">
                    <option value="australia">Australia</option>
                    <option value="canada">Canada</option>
                    <option value="usa">USA</option>
                  </select>
                  <span class="icon-container">
                    <v-icon :size="20" color="#bdbdbd">arrow_drop_down</v-icon>
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="col-15"></div>
                <div class="col-85">
                  <v-btn class="btn_save">save</v-btn>
                  <v-btn class="btn_cancel">cancel</v-btn>
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
import axios from "axios";
import popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
import uploadprofile from "./UploadFile";
export default {
  methods: {
    iconClick(e) {
      e.target.parentElement.parentElement.firstElementChild.focus();
    }
  }
};
</script>

<style scoped>
/* .......form....... */
label {
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
</style>
