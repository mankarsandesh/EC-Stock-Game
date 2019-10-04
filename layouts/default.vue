<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      right
      style="z-index:101"
    >
      <v-list>
        <div v-for="(item, i) in menu" :key="i">
          <v-list-tile :to="item.to" router exact class="text-primary text-uppercase">
            <!-- <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>-->
            <v-list-tile-content>
              <v-list-tile-title>
                <!-- {{item.title}} -->
                {{ $t(`menu.${item.title}`) }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar height="30" color="#003e70" class="white--text" style="z-index: 100;">
      <v-layout row wrap>
        <v-flex xs12>
          <welcome-user></welcome-user>
        </v-flex>
      </v-layout>
    </v-toolbar>

    <v-toolbar :clipped-left="clipped" class="pa-1 text-primary light-toobar">
      <v-flex>
        <nuxt-link to="/modern">
          <v-toolbar-title>
            <v-img width="100" src="/logo.png"></v-img>
          </v-toolbar-title>
        </nuxt-link>
      </v-flex>

      <v-spacer></v-spacer>
      <v-btn text flat @click="$refs.language.showDialog()">
        <countryFlag :country="countryflag" size="normal" />
      </v-btn>
      <languageDialog ref="language"></languageDialog>
      <v-toolbar-side-icon @click="drawer = !drawer" :elevation="0" />
    </v-toolbar>
    <v-content>
      <v-container pa-0>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";

import menu from "~/data/menu";

import countryFlag from "vue-country-flag";
import languageDialog from "~/components/LanguageDialog";
import welcomeUser from "~/components/welcomeUser";

import openSocket from "socket.io-client";

import i18n from "vue-i18n";
export default {
  components: {
    countryFlag,
    languageDialog,
    welcomeUser
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      menu: menu,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "EC gaming"
    };
  },

  created() {

  },
  mounted() {

  },
  methods: {
  },
  computed: {
    ...mapGetters(["getBalance", "getlocale"]),
    countryflag() {
      return this.getlocale;
    }
  }
};
</script>
<style scoped>
</style>
