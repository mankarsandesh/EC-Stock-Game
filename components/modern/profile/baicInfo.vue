<template>
  <div>
    <div class="d-between">
      <v-avatar size="170">
        <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt />
      </v-avatar>

      <p>
        Online status : 3 hr 14ins
        <span>current balance : $865.00</span>
      </p>
    </div>

    <v-flex lg12>
      <table class="table table-striped">
        <tbody>
          <tr>
            <th scope="row" class="row">player id</th>
            <td>z05qd0001</td>
            <td>EVERYONE CAN SEE</td>
          </tr>
          <tr>
            <th scope="row" class="row">nickname</th>
            <td>
              Jacob
              <v-btn icon>
                <v-icon>edit</v-icon>
              </v-btn>
            </td>
            <v-select v-model="nick" :items="nickselects" label="EVERYONE CAN SEE"></v-select>
          </tr>
          <tr>
            <th scope="row" class="row">gender</th>

            <td>
              <v-select v-model="gen" :items="gendselects" label="Male"></v-select>
            </td>
            <v-select v-model="gender" :items="genderselects" label="EVERYONE CAN SEE"></v-select>
          </tr>
          <tr>
            <th scope="row" class="row">email</th>

            <td>
              tnk@gmail.com
              <v-btn icon>
                <v-icon>edit</v-icon>
              </v-btn>
            </td>
            <v-select v-model="email" :items="emails" label="EVERYONE CAN SEE"></v-select>
          </tr>
          <tr>
            <th scope="row" class="row">membership</th>

            <td>Stock God</td>
            <v-select v-model="membership" :items="membershipselects" label="EVERYONE CAN SEE"></v-select>
          </tr>
          <tr>
            <th scope="row" class="row">country</th>

            <td>
              <v-select v-model="count" :items="countselects" label="China"></v-select>
            </td>
            <v-select v-model="country" :items="countryselects" label="EVERYONE CAN SEE"></v-select>
          </tr>
          <tr>
            <th scope="row" class="row">balance</th>

            <td>$865.00</td>
            <v-select hide-details v-model="balance" :items="balancesselect" label="China"></v-select>
          </tr>
          <tr>
            <th scope="row" class="row">rolling</th>
            <td>$1795.00</td>
            <td>Only me</td>
          </tr>
        </tbody>
      </table>
      <v-flex>
        <v-btn class="my-btn">save</v-btn>
        <v-btn class="my-btn cancel">cancel</v-btn>
      </v-flex>
    </v-flex>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selects: ["EVERYONE CAN SEE", "ONLY ME"],
      gender: ["MALE", "FEMALE"],
      nick: "",
      gen: "",
      gender: "",
      email: "",
      membership: "",
      count: "",
      country: "",
      balance: "",
      nickselects: [],
      gendselects: [],
      genderselects: [],
      emails: [],
      membershipselects: [],
      countselects: [],
      countryselects: [],
      balancesselect: []
    };
  }
};
</script>