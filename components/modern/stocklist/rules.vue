<template>
<div>
    <div>
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <h2 class="display-1">EC Gaming Rules description</h2>

                    <span class="subheading">Our site utilizes different stocks with references to construct a stimulating, uncontrollable game. We provide four main game types (BIG/SMALL, EVEN/ODD, UP/MID/LOW and NUMBERS) based on the chosen stocks, all game results depend on the two specific decimals according to our rules.</span>

                    <v-divider class="my-3"></v-divider>

                    <div class="title mb-3">Result introduction!</div>

                    <v-dialog v-model="dialog" width="500">
                        <template v-slot:activator="{ on }">
                            <v-btn color="red lighten-2" dark v-on="on">See more</v-btn>
                        </template>

                        <v-card>
                            <v-card-title class="headline grey lighten-2" primary-title>Introduction</v-card-title>

                            <v-card-text>
                                e.g. Assuming a stock resulting in 1234.
                                <span class="text-red">56</span>, all our game types would only take decimal ‘56’ as result;
                                In the case the result is now serving as
                                <span class="text-red">‘56’</span>,
                                we define decimal
                                <span class="text-red">‘5’</span>, as
                                <span class="text-red">‘first</span>, digit’ result;
                                decimal
                                <span class="text-red">‘56’</span>, ‘6’ as
                                <span class="text-red">‘6’</span>,‘last digit’ result;
                                decimals
                                <span class="text-red">‘5’</span>, and
                                <span class="text-red">‘6’</span>, together as
                                <span class="text-red">two</span>, ‘-digit’ result;
                                Other than these, we are also appointing the outcome of ‘5 + 6’ as
                                <span class="text-red">both</span>, digits’ result, which is
                                <span class="text-red">‘11’</span>,
                                .
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" flat @click="dialog = false">I accept</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    <v-card class="my-bg">
        <onlyrules />
    </v-card>
</div>
</template>

<script>
import onlyrules from "~/components/modern/stocklist/onlyrule";
export default {
    components: {
        onlyrules
    },
    data() {
        return {
            dialog: false,
            panel: [true]
        };
    }
};
</script>
