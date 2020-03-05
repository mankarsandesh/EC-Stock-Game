<template>
<div>
    <v-divider></v-divider>

    <!-- <breadcrumbs title="Stock list" linkItem="announcement" titlebtn="announcement" linkItem2="rule" titlebtn2="game rule" /> -->

    <!-- search -->
    <v-layout row wrap>
        <v-flex xs12 class="d-flex">
            <v-select class="border-round mt-2" hide-details :items="items" placeholder="Sort By :" v-model="itemss"></v-select>
        
            <v-btn @click="goSearch" class="main-btn mx-3" style="border-radius:8px;">go</v-btn>
        </v-flex>
    </v-layout>
    <!-- end serach -->
    <v-layout row wrap>
        <v-flex xs12>
            <sotkclist1 />
        </v-flex>
    </v-layout>
    <v-layout row wrap pb-3 justify-center>
        <v-flex xs5 class="text-center d-flex">
            <v-btn color="#8291b2" class="text-uppercase mt-4 text-white">{{$t("stock-list.load more")}}</v-btn>
        </v-flex>
    </v-layout>
    <!-- back to top -->
    <!-- <back-to-top bottom="22px" right="22px" visibleoffset="150">
      <v-icon color="#fff" size="35">keyboard_arrow_up</v-icon>
    </back-to-top> -->
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
import breadcrumbs from "~/components/mobile/mobilebreadcrumbs";
import sotkclist1 from "~/components/mobile/stocklist1";
export default {
    components: {
        breadcrumbs,
        sotkclist1
    },
    data() {
        return {
            items: ["day", "weeks", "months", "years", "all"],
            itemss: ""
        };
    },
    computed: {
        ...mapGetters(["getStockList", "getLivePrice", "getPreviousPrice"]),
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

        goSearch() {
            alert("You're right");
        }
    },
    created() {
        this.active = false;
    }
};
</script>

<style scoped>
.v-btn:not(.v-btn--depressed):not(.v-btn--flat) {
    /* will-change: box-shadow; */
    box-shadow: none !important;
    border-radius: 0;
}

/* .v-label{
    color:#003e70 !important
} */
.v-input--selection-controls__input .v-label {
    color: rgb(218, 25, 25) !important;
}

.input-group--disabled.input-group--select label {
    color: rgb(35, 224, 215) !important;
}

.v-input__control .v-input__slot .v-text-field__slot input {
    margin-top: 0 !important;
}

a {
    color: blue;
    text-decoration: underline;
}
</style>
