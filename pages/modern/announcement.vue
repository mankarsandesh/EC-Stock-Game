<template>
<div>
    <v-layout row wrap>
        <v-flex xs12 md12>
            <announcement />
        </v-flex>
    </v-layout>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
import announcement from "~/components/mobile/announcement";

export default {
    components: {
        announcement
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
