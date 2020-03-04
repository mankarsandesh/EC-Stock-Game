<template>
<div>
    <!-- filter -->
    <breadcrumbs title="Announcement" linkItem2="rule" titlebtn2="Game rule" />
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 md12>
                <announcement />
            </v-flex>
        </v-layout>
    </v-container>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
import SlideMenu from "~/components/SlideMenu.vue";
import breadcrumbs from "~/components/mobile/mobilebreadcrumbs";
import announcement from "~/components/modern/stocklist/announcement";

export default {
    components: {
        announcement,
        breadcrumbs
    },
    data() {
        return {
            window: 0,
            tabs: ["announcement"],
            active: null
        };
    }
};
</script>

<style>
.light-toobar h1 {
    padding: 0px 20px;
}
</style>
