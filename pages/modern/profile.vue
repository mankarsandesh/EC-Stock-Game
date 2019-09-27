<template>
  <div>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar class="pa-1 light-toobar">
          <v-toolbar-title class="text-uppercase text-primary">
            <h2>nickname</h2>
          </v-toolbar-title>
          <v-spacer></v-spacer>
         
            <v-btn icon @click="dialog = false">
              <v-icon color="text-primary">clear</v-icon>
            </v-btn>
         
        </v-toolbar>
        <v-divider></v-divider>
        <v-layout column px-5 pt-3>
          <v-flex xs-12 pt-2>
            <label class="text-primary">
              <h3>Nickname</h3>
            </label>
            <v-text-field
              label="Macky Chinthachanma"
              single-line
              outline
              full-width
              color="#003e70"
            ></v-text-field>
          </v-flex>
          <v-flex xs-12 pt-2>
            <label class="text-primary">
              <h3>Privacy</h3>
            </label>
            <!-- <v-text-field label="EVERY ONE CAN SEE" single-line outline full-width color="#003e70"></v-text-field> -->
            <v-select :items="itemstest" outline></v-select>
          </v-flex>
        </v-layout>

        <!-- apply button -->
        <v-layout style="bottom: 0;position: fixed;width: 100%; background-color:#003e70">
          <v-btn block color="#003e70" large class="white--text">save</v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
    <!-- profile -->
    <v-divider></v-divider>
    <v-toolbar class="pa-3 light-toobar">
      <v-avatar color="indigo" size="58">
        <v-icon dark>account_circle</v-icon>
      </v-avatar>
      <div class="pl-4 text-primary">
        <ul>
          <li>
            <b>Balance: $865.00</b>
          </li>
          <li>
            <b>Online status: 3hr 14mins</b>
          </li>
        </ul>
      </div>
    </v-toolbar>
    <v-divider></v-divider>

    <v-list two-line class="mx-4">
      <template v-for="(item, index) in items">
        <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>

        <v-divider class="dashed" v-else-if="item.divider" :key="index"></v-divider>

        <v-list-tile v-else :key="item.title" avatar class="mt-2">
          <!-- <v-list-tile-avatar>
            <img :src="item.avatar" />
          </v-list-tile-avatar>-->
          <v-layout row wrap>
            <!-- <v-list-tile-content> -->
            <v-flex xs8>
              <v-list-tile-title class="text-primary" v-html="item.title"></v-list-tile-title>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs4 style="text-align: end">
              <v-icon @click="dialog = true">edit</v-icon>
            </v-flex>

            <v-list-tile-sub-title class="pt-2">
              <v-layout row wrap>
                <v-flex xs4>
                  <span>Player ID</span>
                  <span class="dot">EVERYONE CAN SEE</span>
                </v-flex>
              </v-layout>
            </v-list-tile-sub-title>
            <!-- </v-list-tile-content> -->
          </v-layout>
        </v-list-tile>
      </template>
    </v-list>
    <!-- online history -->
    <v-divider></v-divider>
    <v-toolbar class="pa-3 light-toobar">
      <v-toolbar-title class="text-uppercase text-primary">online history</v-toolbar-title>
      <v-spacer></v-spacer>
      
        <v-btn icon @click="dialog = false">
          <v-icon color="text-primary">add</v-icon>
        </v-btn>
      
    </v-toolbar>
    <!-- stock analysis -->
    <v-divider></v-divider>
    <v-toolbar class="pa-3 light-toobar">
      <v-toolbar-title class="text-uppercase text-primary">stock analysis</v-toolbar-title>
      <v-spacer></v-spacer>
      
        <v-btn icon @click="dialog = false">
          <v-icon color="text-primary">add</v-icon>
        </v-btn>
      
    </v-toolbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      itemstest: ["Foo", "Bar", "Fizz", "Buzz"],
      dialog: false,
      items: [
        //   { header: 'Today' },
        {
          title: "WYNN RESORTS LTD",
          subtitle:
            "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        { divider: true, inset: true },
        {
          title: "LINCOLN NATIONAL CORP",
          subtitle:
            "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        { divider: true, inset: true },
        {
          title: "STOCKNAME UNTITLED 08",
          subtitle:
            "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        },
        { divider: true, inset: true },
        {
          title: "Birthday gift",
          subtitle:
            "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
        },
        { divider: true, inset: true },
        {
          title: "Recipe to try",
          subtitle:
            "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
        }
      ]
    };
  }
};
</script>
<style scoped>
.dashed {
  border-top: 1px dashed !important;
  opacity: 0.4 !important;
}
/* .v-icon .material-icons theme--light{
    color: rgb(255, 255, 255);
    font-size: 42px;
    background-color: #003e70;
    padding: 7px 3px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
} */
.dot:before {
  content: ".";
  color: "gray";
  font-weight: 900;
  border: 3px;
}
</style>