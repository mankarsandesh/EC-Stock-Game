<template>
  <div v-if="stockAnalysis.length>0">
    <v-flex xs12 class="pt-5 pl-5">
      <div>
        <h2 class="title_menu">stock analysis</h2>
        <v-divider></v-divider>
      </div>
    </v-flex>
    <v-flex xs12 pt-3 pl-5>
      <v-layout row>
        <!-- select start date  -->
        <v-flex xs6 sm6 md3 lg3 pr-5>
          <div class="date_picker_container" @click="isShowDateStart = !isShowDateStart">
            <div class="title_date_picker">
              <span>from</span>
            </div>
            <div class="date_picker">
              <span class="select_date">{{ startDate }}</span>
              <span class="icon_date">
                <v-icon>date_range</v-icon>
              </span>
            </div>
          </div>
          <div style="position:absolute;z-index:1">
            <v-date-picker
              v-if="isShowDateStart"
              v-model="startDate"
              @input="isShowDateStart = false"
            ></v-date-picker>
          </div>
        </v-flex>
        <!-- select end date -->
        <v-flex xs6 sm6 md3 lg3 pr-5>
          <div class="date_picker_container" @click="isShowDateEnd = !isShowDateEnd">
            <div class="title_date_picker">
              <span>to</span>
            </div>
            <div class="date_picker">
              <span class="select_date">{{ endDate }}</span>
              <span class="icon_date">
                <v-icon>date_range</v-icon>
              </span>
            </div>
          </div>
          <div style="position:absolute;z-index:1">
            <v-date-picker v-if="isShowDateEnd" v-model="endDate" @input="isShowDateEnd = false"></v-date-picker>
          </div>
        </v-flex>
        <!-- go button -->
        <v-flex xs6 sm6 md2 lg1>
          <div class="date_picker_container">
            <div class="title_date_picker">
              <span></span>
            </div>
            <button>GO</button>
          </div>
        </v-flex>
        <v-flex xs6 sm6 md3 lg3 pl-5>
          <div class="date_picker_container">
            <div class="title_date_picker">
              <span>Sort By</span>
            </div>
            <div class="date_picker">
              <!-- sort by  -->
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <span class="select_date">2020-02-12</span>
                  <span class="icon_date">
                    <v-icon v-on="on">arrow_drop_down</v-icon>
                  </span>
                </template>
                <v-list>
                  <v-list-tile v-for="(item, index) in items" :key="index">
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 sm12 md10 lg10 class="pt-5 pl-5">
      <div class="chart_container">
        <div class="chart-map-color">
          <span v-for="(stock,index) in stocks" :key="index">
            <span class="circle-color" :style="{backgroundColor:colors[0][index]}"></span>
            <span style="margin-right:10px" class="text-uppercase">{{stock}}</span>
          </span>
        </div>
        <apexchart type="bar" height="480vh" :options="chartOptions" :series="series"></apexchart>
      </div>
    </v-flex>
  </div>
</template>

<script>
import apexchart from "vue-apexcharts";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import date from "date-and-time";

// set color win and lose color in bar chart
let index = 0;
let barColor = [
  ["#67c9d3", "#f75b54", "#fcc624", "#1a237e", "#d81b60", "#ff6f00", "#01579b"], // win color
  ["#81eaf5", "#f9a5a3", "#fddf84", "#7986cb", "#f06292", "#ffb74d", "#90caf9"] // loss color
];
export default {
  components: {
    apexchart: apexchart
  },
  created() {
    const now = date.format(new Date(), "YYYY-MM-DD");
    const last2week = date.addDays(new Date(), -14);
    this.startDate = date.format(last2week, "YYYY-MM-DD");
    this.endDate = now;
    this.getStockAnalysis();
  },
  computed: {},
  destroyed() {
    index = 0; // reset index
  },
  updated() {
    index = 0; // reset index
  },

  data() {
    return {
      stockAnalysis: [],
      colors: barColor,
      isShowDateStart: false,
      isShowDateEnd: false,
      startDate: "",
      endDate: "",
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" }
      ],

      chartOptions: {
        colors: [
          function({ value, seriesIndex, w }) {
            let color = "";
            color = barColor[index][seriesIndex];
            if (seriesIndex == 2 && index == 0) {
              color = barColor[index][seriesIndex];
              index = 1;
            }
            return color;
          }
        ],
        grid: {
          show: true,
          borderColor: "#90A4AE",
          strokeDashArray: 0,
          position: "back",
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          },
          row: {
            colors: undefined,
            opacity: 0.5
          },
          column: {
            colors: undefined,
            opacity: 0.5
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        },
        dataLabels: {
          enabled: false
        },
        chart: {
          type: "bar",
          stacked: true,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            distributed: true
          }
        },
        xaxis: {
          labels: {
            show: false
          },
          type: "datetime",
          categories: [
            "01/01/2011 GMT",
            "01/02/2011 GMT",
            "01/03/2011 GMT",
            "01/04/2011 GMT",
            "01/05/2011 GMT",
            "01/06/2011 GMT",
            "01/07/2011 GMT",
            "01/08/2011 GMT",
            "01/09/2011 GMT",
            "01/10/2011 GMT"
          ]
        },
        legend: {
          itemMargin: {
            horizontal: 10,
            vertical: 10
          },
          show: false,
          position: "top",
          horizontalAlign: "right",
          offsetX: 40
        },
        fill: {
          opacity: 1
        }
      }
    };
  },
  computed: {
    ...mapGetters(["getPortalProviderUUID", "getUserUUID"]),
    stocks() {
      let stocks = [];
      this.stockAnalysis.forEach(element => {
        stocks.push(element.stockName);
      });
      return stocks;
    },
    series() {
      let win = [];
      let loss = [];
      this.stockAnalysis.forEach(element => {
        win.push(element.winCount);
        loss.push(element.lossCount);
      });
      return [
        {
          name: "win",
          data: win
        },
        {
          name: "loss",
          data: loss
        }
      ];
    }
  },
  methods: {
    async getStockAnalysis() {
      try {
        const res = await this.$axios.$post(
          "http://uattesting.equitycapitalgaming.com/webApi/getUserBetAnalysis",
          {
            portalProviderUUID: this.getPortalProviderUUID,
            userUUID: this.getUserUUID,
            version: 1,
            dateRangeFrom: this.startDate,
            dateRangeTo: this.endDate
          },
          {
            headers: {
              Authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh"
            }
          }
        );
        if (res.code === 200) {
          this.stockAnalysis = res.data;
          console.log(res.data);
        } else {
          throw new Error(res.message);
        }
      } catch (ex) {
        console.log(ex.message);
      }
    }
  }
};
</script>

<style scoped>
li {
  list-style-type: none;
}
.chart-map-color {
  position: relative;
  float: right;
  margin-top: 15px;
  display: inline-block;
}
.circle-color {
  position: relative;
  display: inline-block;
  top: 2px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
button {
  background-color: green;
  padding: 10px;
  width: 60px;
  color: #ffffff;
  border-radius: 10px;
  font-weight: bold;
}
button:focus {
  outline: none;
}
.title_menu {
  padding-bottom: 15px;
  text-transform: capitalize;
  color: #353333;
}
.date_picker_container {
  text-transform: capitalize;
  cursor: pointer;
}
.chart_container {
  background-color: white;
  color: black;
  padding: 10px;
  box-shadow: 0px 2px 5px rgb(145, 145, 145);
  border-radius: 10px;
  width: 100%;
  min-height: 550px;
}
.date_picker {
  background-color: white;
  color: black;
  padding: 10px;
  box-shadow: 0px 2px 5px rgb(145, 145, 145);
  border-radius: 10px;
  position: relative;
}
.title_date_picker {
  padding-left: 10px;
  padding-bottom: 5px;
  color: #353333;
  text-transform: uppercase;
  min-height: 30px;
}
.icon_date {
  float: right;
  margin-top: -2px;
}
.select_date {
  text-transform: uppercase;
}
</style>
