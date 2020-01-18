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
        <v-expansion-panel v-model="panel" expand>
            <v-expansion-panel-content>
                <template v-slot:header>
                    <div>{{$t('gamemsg.firstdigit')}} (????. ??)</div>
                </template>
                <v-card>
                    <v-card-text class="grey lighten-3">
                        <span class="text-blue">SMALL</span> – 0, 1, 2, 3, 4;
                        <br />
                        <span class="text-success">BIG</span> – 5, 6, 7, 8, 9;
                        <br />
                        <span class="text-purple">EVEN</span> – 0, 2, 4, 6, 8;
                        <br />
                        <span class="text-yellow">ODD</span> – 1, 3, 5, 7, 9;
                        <br />
                        <span class="text-blue-light">UP</span> – 0, 1, 2, 3;
                        <br />
                        <span class="text-blue-dark">MIDDLE</span> – 4, 5, 6;
                        <br />
                        <span class="text-dont-no">LOW</span> – 7, 8, 9;
                        <br />
                        <span class="text-red">NUMBER</span> – 0, 1, 2, 3, 4, 5, 6, 7, 8, 9;
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>

            <v-expansion-panel-content>
                <template v-slot:header>
                    <div>{{$t('gamemsg.lastdigit')}} (????. ??)</div>
                </template>
                <v-card>
                    <v-card-text class="grey lighten-3">
                        <span class="text-blue">SMALL</span> – 0, 1, 2, 3, 4;
                        <br />
                        <span class="text-success">BIG</span> – 5, 6, 7, 8, 9;
                        <br />
                        <span class="text-purple">EVEN</span> – 0, 2, 4, 6, 8;
                        <br />
                        <span class="text-yellow">ODD</span> – 1, 3, 5, 7, 9;
                        <br />
                        <span class="text-blue-light">UP</span> – 0, 1, 2, 3;
                        <br />
                        <span class="text-blue-dark">MIDDLE</span> – 4, 5, 6;
                        <br />
                        <span class="text-dont-no">LOW</span> – 7, 8, 9;
                        <br />
                        <span class="text-red">NUMBER</span> – 0, 1, 2, 3, 4, 5, 6, 7, 8, 9;
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>

            <v-expansion-panel-content>
                <template v-slot:header>
                    <div>{{$t('gamemsg.bothdigit')}} (????.? + ? = ?)</div>
                </template>
                <v-card>
                    <v-card-text class="grey lighten-3">
                        <span class="text-blue">SMALL</span>– 1, 2, 3, 4, 5, 6, 7, 8, 9;
                        <br />
                        <span class="text-success">BIG</span> – 10, 11, 12, 13, 14, 15, 16, 17, 18;
                        <br />
                        <span class="text-success">TIE</span> – 0;
                        <br />
                        <span class="text-purple">EVEN</span> – 0, 2, 4, 6, 8, 10, 12, 14, 16, 18;
                        <br />
                        <span class="text-yellow">ODD</span> – 1, 3, 5, 7, 9, 11, 13, 15, 17;
                        <br />
                        <span class="text-blue-light">UP</span> – – 0, 1, 2, 3, 4, 5;
                        <br />
                        <span class="text-blue-dark">MIDDLE</span> – 6, 7, 8, 9, 10, 11;
                        <br />
                        <span class="text-dont-no">LOW</span> –12, 13, 14, 15, 16, 17, 18;
                        <br />
                        <span class="text-red">NUMBER</span> – 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18;
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
                <template v-slot:header>
                    <div>{{$t('gamemsg.twodigit')}} (????. ??)</div>
                </template>
                <v-card>
                    <v-card-text class="grey lighten-3">
                        <span class="text-blue">SMALL</span> – 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50;
                        <br />
                        <span class="text-success">BIG</span> – 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99;
                        <br />
                        <span class="text-success">TIE</span> – 00;;
                        <br />
                        <span class="text-purple">EVEN</span> – 00, 02, 04, 06, 08, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98;
                        <br />
                        <span class="text-yellow">ODD</span> –01, 03, 05, 07, 09, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99;
                        <br />
                        <span class="text-blue-light">UP</span> – 00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33;
                        <br />
                        <span class="text-blue-dark">MIDDLE</span> – 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66;
                        <br />
                        <span class="text-dont-no">LOW</span> – 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99;
                        <br />
                        <span class="text-red">NUMBER</span> – 00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99;
                    </v-card-text>

                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-card>
</div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            panel: [true]
        };
    }
};
</script>
