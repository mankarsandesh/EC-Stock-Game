<template>
<div>
    <v-tabs-items>
        <v-tab-item>
            <v-card flat>
                <v-expansion-panel v-model="panel" expand>
                    <v-expansion-panel-content class="bg-color">
                        <template v-slot:header>
                            <div> {{$t('menu.rule')}}</div>
                        </template>
                        <v-card>
                            <h1 class="jumbotron-heading text-center">
                                EC Gaming Rules Description</h1>
                            <p class="lead text-muted text-center">
                                Our site utilizes different stocks with references to construct a stimulating, uncontrollable game. We provide four main game types (BIG/SMALL, EVEN/ODD, UP/MID/LOW and NUMBERS) based on the chosen stocks, all game results depend on the two specific decimals according to our rules..
                            </p>

                            <v-btn>result introduction</v-btn>
                            <p class="lead text-muted text-center">
                                e.g. Assuming a stock resulting in 1234.56, all our game types would only take decimal ‘56’ as result; In the case the result is now serving as ‘56’, we define decimal ‘5’ as ‘first digit’ result; decimal ‘6’ as ‘last digit’ result; decimals ‘5’ and ‘6’ together as ‘two-digit’ result; Other than these, we are also appointing the outcome of ‘5 + 6’ as ‘both digits’ result, which is ‘11’; .
                            </p>
                            <v-expansion-panel v-model="panels1" expand>
                                <v-expansion-panel-content class="bg-color">
                                    <template v-slot:header>
                                        <div> First Digit(????. ??)</div>
                                    </template>
                                    <v-card>
                                        <table>
                                            <tr>
                                                <td class="text-left"> <span class="text-primary font-weight-bold">SMALL</span> – 0, 1, 2, 3, 4;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-success font-weight-bold">BIG</span> – 5, 6, 7, 8, 9;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-purple font-weight-bold">EVEN</span> – 0, 2, 4, 6, 8;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-warning font-weight-bold">ODD</span> – 1, 3, 5, 7, 9;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-bluelight font-weight-bold">UP</span> – 0, 1, 2, 3;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-info font-weight-bold">MIDDLE</span> – 4, 5, 6;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-secondary font-weight-bold">LOW</span> – 7, 8, 9;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-danger font-weight-bold">NUMBER</span> – 0, 1, 2, 3, 4, 5, 6, 7, 8, 9;</td>
                                            </tr>

                                        </table>
                                    </v-card>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel v-model="panels2" expand>
                                <v-expansion-panel-content class="bg-color">
                                    <template v-slot:header>
                                        <div> Last Digit(????.? ?)</div>
                                    </template>
                                    <v-card>
                                        <table>
                                            <tr>
                                                <td class="text-left"> <span class="text-primary font-weight-bold">SMALL</span> – 0, 1, 2, 3, 4;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-success font-weight-bold">BIG</span> – 5, 6, 7, 8, 9;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-purple font-weight-bold">EVEN</span> – 0, 2, 4, 6, 8;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-warning font-weight-bold">ODD</span> – 1, 3, 5, 7, 9;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-bluelight font-weight-bold">UP</span> – 0, 1, 2, 3;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-info font-weight-bold">MIDDLE</span> – 4, 5, 6;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-secondary font-weight-bold">LOW</span> – 7, 8, 9;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-danger font-weight-bold">NUMBER</span> – 0, 1, 2, 3, 4, 5, 6, 7, 8, 9;</td>
                                            </tr>

                                        </table>

                                    </v-card>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel v-model="panels3" expand>
                                <v-expansion-panel-content class="bg-color">
                                    <template v-slot:header>
                                        <div> Both Digit(????.? ?+?=?)</div>
                                    </template>
                                    <v-card>
                                        <table>
                                            <tr>
                                                <td class="text-left"> <span class="text-primary font-weight-bold">SMALL</span> – 1, 2, 3, 4, 5, 6, 7, 8, 9;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-success font-weight-bold">BIG</span> – 10, 11, 12, 13, 14, 15, 16, 17, 18;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-success font-weight-bold">TIE</span> – 0;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-purple font-weight-bold">EVEN</span> – 0, 2, 4, 6, 8, 10, 12, 14, 16, 18;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-warning font-weight-bold">ODD</span> – 1, 3, 5, 7, 9, 11, 13, 15, 17;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-bluelight font-weight-bold">UP</span> – 0, 1, 2, 3, 4, 5;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-info font-weight-bold">MIDDLE</span> – 6, 7, 8, 9, 10, 11;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-secondary font-weight-bold">LOW</span> – 12, 13, 14, 15, 16, 17, 18;</td>
                                            </tr>
                                            <tr>
                                                <td class="text-left"><span class="text-danger font-weight-bold">NUMBER</span> – 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18;</td>
                                            </tr>
                                        </table>
                                    </v-card>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel v-model="panels4" expand>
                                <v-expansion-panel-content class="bg-color">
                                    <template v-slot:header>
                                        <div> Two Digit(????. ??)</div>
                                    </template>
                                    <v-card>
                                        <table class="table table-hover">
                                            <tbody>
                                                <tr class="text-left">
                                                    <td class="text-left">
                                                        <span class="text-primary font-weight-bold">SMALL</span>
                                                        <span class="text-dark">– 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50;</span>
                                                    </td>
                                                </tr>
                                                <tr class="text-left">
                                                    <td class="text-left">
                                                        <span class="text-success font-weight-bold">BIG</span>
                                                        <span class="text-dark">– 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99;</span>
                                                    </td>
                                                </tr>
                                                <tr class="text-left">
                                                    <td class="text-left">
                                                        <span class="text-primary font-weight-bold">EVEN</span>
                                                        <span class="text-secondary">–00;;</span>
                                                    </td>
                                                </tr>
                                                <tr class="text-left">
                                                    <td class="text-left">
                                                        <span class="text-purple font-weight-bold">EVEN</span>
                                                        <span class="text-dark">
                                                            – 00, 02, 04, 06, 08, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98;
                                                            ODD – 01, 03, 05, 07, 09, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99;
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr class="text-left">
                                                    <td class="text-left">
                                                        <span class="text-warning font-weight-bold">ODD</span>
                                                        <span class="text-dark">– 01, 03, 05, 07, 09, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 97, 99;</span>
                                                    </td>
                                                </tr>
                                                <tr class="text-left">
                                                    <td class="text-left">
                                                        <span class="text-bluelight font-weight-bold">UP</span>
                                                        <span class="text-dark">– 00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33;</span>
                                                    </td>
                                                </tr>
                                                <tr class="text-left">
                                                    <td class="text-left">
                                                        <span class="text-info font-weight-bold">MIDDLE</span>
                                                        <span class="text-dark">– 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66;</span>
                                                    </td>
                                                </tr>
                                                <tr class="text-left">
                                                    <td class="text-left">
                                                        <span class="text-secondary font-weight-bold">LOW</span>
                                                        <span class="text-dark">– 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99;</span>
                                                    </td>
                                                </tr>
                                                <tr class="text-left">
                                                    <td class="text-left">
                                                        <span class="text-danger font-weight-bold">NUMBER</span>
                                                        <span class="text-dark">– 00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99;</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </v-card>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-card>
        </v-tab-item>
    </v-tabs-items>

</div>
</template>

<script>
export default {
    layout: 'classic',
    data() {
        return {
            panel: [true],
            panels1: [true],
            panels2: [true],
            panels3: [true],
            panels4: [true],
        }
    }
}
</script>

<style scoped>
.flex-column {
    flex-direction: column !important;
}
</style>
