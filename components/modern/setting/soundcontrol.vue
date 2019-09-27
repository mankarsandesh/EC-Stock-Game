<template>
  <div>
    <v-card class="my-bg pa-5">
      <v-layout row wrap justify-center></v-layout>
      <v-switch label="music" v-model="switch1" inset></v-switch>
      <v-slider v-model="length" color="#003e70" min="1" max="15" label="Custom length"></v-slider>
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
      switch1: true,
      length: 5
    };
  }
};
</script>