<template>
<div>
    <v-divider></v-divider>
    <!-- filter -->

    <v-toolbar class="light-toobar">
        <h1 class="text-primary text-uppercase">Annoucement</h1>
        <v-spacer></v-spacer>

        <v-btn icon @click="$router.go(-1)">
            <v-icon>clear</v-icon>
        </v-btn>
    </v-toolbar>
    <v-list three-line :class="{'mx-4':isHorizontal}">
        <template v-for="(data, index) in getAnnoucement">
            <v-divider class="dashed" v-if="index>0" :key="index"></v-divider>
            <v-list-tile :key="data" avatar class="mt-2">
                <v-list-tile-content>

                    <!-- </nuxt-link> -->
                    <v-list-tile-sub-title class="pt-2">
                        <v-layout row wrap>
                            <v-flex xs12>
                                <ul>

                                    <li class="text-primary">
                                        <h3>{{data.title}}</h3>
                                    </li>
                                    <li class="text-primary">{{data.messageContent}}</li>
                                    <li>{{data.created_at}}</li>
                                </ul>

                            </v-flex>
                        </v-layout>
                    </v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
    </v-list>

</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
import SlideMenu from "~/components/SlideMenu.vue";
export default {
    components: {
        SlideMenu
    },
    data() {
        return {
            dateFormat: '2018-12-24',
            checkbox1: false,
            isSearch: false,
            focusSearch: false,
        };

    },
    mounted() {
        this.asyannoucement()
    },
    computed: {
        ...mapGetters(["getAnnoucement"]),
        isHorizontal() {
            let w = window.innerWidth;
            let h = window.innerHeight;
            if (w > h) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        ...mapActions(["asyannoucement"]),
    }
};
</script>

<style>
.light-toobar h1 {
    padding: 0px 20px;
}
</style>
