<template>
  <div class="bg-primary">
    <div class="row d-flex justify-center align-center">
      <h1 class="text-center">Choose Game ModeDer</h1>
    </div>

    <v-container fluid fill-height>
      <v-layout row justify-center align-center>
        <v-flex xs6 px-2>
          <nuxt-link to="/classic/l-btc1-live">
            <v-card class="card-mode">
              <h2>Classic</h2>
            </v-card>
          </nuxt-link>
        </v-flex>
        <v-flex xs6 px-2>
          <nuxt-link to="/modern">
            <v-card class="card-mode">
              <h2>Modern</h2>
            </v-card>
          </nuxt-link>
        </v-flex>
      </v-layout>
    </v-container>

    <svg class="footer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="#f9e9c4"
        fill-opacity="1"
        d="M0,96L30,112C60,128,120,160,180,149.3C240,139,300,85,360,85.3C420,85,480,139,540,170.7C600,203,660,213,720,224C780,235,840,245,900,213.3C960,181,1020,107,1080,106.7C1140,107,1200,181,1260,186.7C1320,192,1380,128,1410,96L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
      />
    </svg>
    <v-layout class="copyright">
      <v-flex class="company-name">TNK</v-flex>
      <v-flex class="version-app">Version 1.0.0</v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  layout: "nolayout"
};
</script>

<style lang="css" scoped>
body,
.container,
.light-toobar {
  background-color: transparent !important;
}
</style>