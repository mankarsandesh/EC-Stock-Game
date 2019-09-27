<template>
  <div>
    <v-card class="my-bg">
      <v-layout row wrap justify-center>
        <v-flex xs6 md3 lg2 v-for="(item,key) in imgChip" :key="key">
          <div class="d-block">
            <v-img width="100" :src="item.img">
              <v-text-field outlined v-model="item.price" :class="item.color"></v-text-field>
            </v-img>
            <v-card-actions>
              <v-btn text>confirm</v-btn>
            </v-card-actions>
            <v-card-text>Min = $200</v-card-text>
            <v-card-text>Max = $20,000</v-card-text>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center>
        <v-btn text>reset to default</v-btn>
      </v-layout>
      <v-layout row wrap justify-center>
        <v-btn class="my-btn">save</v-btn>
        <v-btn class="my-btn cancel">cancel</v-btn>
      </v-layout>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgChip: [
        {
          title: "Danger",
          img: "/chip/danger.png",
          price: "200"
        },
        {
          title: "Primary",
          img: "/chip/primary.png",
          price: "500"
        },
        {
          title: "success",
          img: "/chip/success.png",
          price: "1000"
        },
        {
          title: "warning",
          img: "/chip/warning.png",
          price: "5000"
        },
        {
          title: "black",
          img: "/chip/black.png",
          price: "10000",
          color: "text-white"
        }
      ]
    };
  }
};
</script>