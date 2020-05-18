<template>
  <v-layout>
    <v-flex lg6>
      <v-btn color="primary" @click="betWin">Play Sound betWin</v-btn>
      <v-btn color="primary" @click="betTing">Play Sound betTing</v-btn>
    </v-flex>
    <v-flex lg6>
      <v-card>
        <h1>Hello</h1>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Sound from "~/helpers/sound";
export default {
  methods: {
    async betWin() {
      try {
        await Sound.winBet();
      } catch (error) {
        console.log(error);
      }
    },
    async betTing() {
      try {
        await Sound.betTing();
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
</style>