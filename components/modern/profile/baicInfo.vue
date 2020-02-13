<template>
  <div>
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
          </div>
        </div>
        <div class="row">
          <div class="col-15">
            <label for="country">email</label>
          </div>
          <div class="col-85">
            <select id="country" name="country">
              <option value="australia">Australia</option>
              <option value="canada">Canada</option>
              <option value="usa">USA</option>
            </select>
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
import uploadprofile from "./UploadFile";
export default {};
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
</style>
