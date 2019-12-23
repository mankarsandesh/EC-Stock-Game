<template>
<div>
    <v-window v-model="window" class="elevation-1" vertical > 
        <!-- Baic Information -->
        <v-window-item >
            <v-layout row wrap >
                <v-flex xs6 md3>
                    <v-menu v-model="from" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="datefrom" :label="$t('msg.from')" prepend-icon="event" readonly v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="datefrom" @input="from = false"></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs6 md3>
                    <v-menu v-model="to" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y full-width min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="dateto" :label="$t('msg.to')" prepend-icon="event" readonly v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="dateto" @input="to = false"></v-date-picker>
                    </v-menu>
                </v-flex>
                 <v-flex xs6 md3 class="sortdiv">
                       
                        <v-select class="selectSort" hide-details :items="items" :label="$t('msg.sortby')" solo></v-select>
                  </v-flex>

                 <v-flex xs6 md3>
                     <v-btn class="my-btn go">{{$t('msg.go')}}</v-btn>                   
                 </v-flex>                


                <v-flex xs12>
                    <v-card class="mx-auto">
                        <Stock-Analysis />
                    </v-card>
                </v-flex>
            </v-layout>
            <!-- <v-layout row wrap class="action">
          <v-flex xs12 sm3 class="py-2 d-flex">
            <v-checkbox
              v-model="won"
              class="won"
              label="Bet Won"
              color="blue"
              value="won"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="lost"
              color="red"
              class="lost"
              label="Bet Lost"
              value="lost"
              hide-details
            ></v-checkbox>
          </v-flex>
        </v-layout> -->
        </v-window-item>
        <!-- Baic Information -->

        <!-- stock analysis -->
        <v-window-item>
            <v-layout row wrap justify-end>
                <v-flex xs2 class="main-select">
                    <p class="ma-0">Exclusive</p>
                    <v-select width="100px" hide-details :items="items" label="Sort By :" solo></v-select>
                </v-flex>
            </v-layout>

            <v-flex xs12>
                <!-- <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">stock name</th>
                <th scope="col">total bet</th>
                <th scope="col">bet won</th>
                <th scope="col">bet lost</th>
                <th scope="col">winrate</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="n in 10" :key="n">
                <th scope="row">stock aaa</th>
                <td>98</td>
                <td>65</td>
                <td>33</td>
                <td>66.3%</td>
              </tr>
            </tbody>
          </table>-->
                <StockAnalysisDetil />
            </v-flex>
        </v-window-item>
        <!-- stock analysis -->
    </v-window>
    <v-item-group v-model="window" class="shrink d-flex" mandatory tag="v-flex">
        <v-item v-show="view">
            <div slot-scope="{ active, toggle }">
                <v-btn :input-value="active" class="main-btn view-chart" @click="toggle">
                    <v-icon>arrow_back_ios</v-icon>{{$t('msg.viewchart')}}
                </v-btn>
            </div>
        </v-item>
        <v-item v-show="more">
            <div slot-scope="{ active, toggle }">
                <v-btn :input-value="active" class="main-btn more-detail" @click="toggle">
                    {{$t('msg.moredetails')}}
                    <v-icon>navigate_next</v-icon>
                </v-btn>
            </div>
        </v-item>
    </v-item-group>
</div>
</template>

<script>
import StockAnalysis from "./Analysischart";
import StockAnalysisDetil from "./Analysis-Details";
export default {
    components: {
        StockAnalysis,
        StockAnalysisDetil
    },
    data() {
        return {
            view: false,
            more: true,
            window: 0,
            active: null,
            won: "",
            lost: "",
            dateto: new Date().toISOString().substr(0, 10),
            datefrom: new Date().toISOString().substr(0, 10),
            from: false,
            to: false,
            items: ["day", "weeks", "months", "years"],
            tabs: [{
                    name: " more details",
                    icon: "navigate_next"
                },
                {
                    name: "view chart",
                    icon: "arrow_back_ios"
                }
            ]
        };
    },
    watch: {
        window(value) {
            if (value == 1) {
                this.view = true;
                this.more = false;
            } else {
                this.view = false;
                this.more = true;
            }
        }
    },
    mounted() {}
};
</script>
<style>
.sortdiv v-label{
  color:#003e70;
}
.selectSort{
  background-color:#003e70 !important;
  color:#FFF;
}
</style>