<template>
  <div xs2>
    <section class="breadcrumbs">
      <v-container md10>
        <v-parallax dark height="150">
          <v-layout align-center row>
            <v-flex xs6>
              <div class="flex-container">
                <div
                  class="profile-img-container"
                  @click="$router.push('/modern/desktop/profile/')"
                >
                  <div class="profile-crowd">
                    <v-icon dark>home</v-icon>
                  </div>
                  <img
                    width="100%"
                    height="100%"
                    src="http://159.138.47.250/images/user/profile/5e819b9c77b7720200330151124.jpg"
                    class="grey darken-4"
                  />
                </div>
                <div
                  class="profile-name-container"
                  @click="$router.push('/modern/desktop/profile/')"
                >
                  <span class="profile-name-tittle">Jack Maa</span>
                  <span>Last active 2 hours ago</span>
                </div>
              </div>
            </v-flex>
            <v-flex xs8 class="text-end">
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;
                "
              >
                <span style="flex-grow: wrap; font-weight: bold;">
                  History period:
                </span>
                <div style="flex-grow: wrap; width: 150px; margin: 0 10px;">
                  <v-select
                    v-model="filter"
                    height="15px"
                    dense
                    hide-details
                    :items="items"
                    solo
                  ></v-select>
                </div>

                <Button
                  style="flex-grow: wrap;"
                  linkItem="linkItem2"
                  btnTitle="follow"
                />
              </div>
            </v-flex>
          </v-layout>
        </v-parallax>
      </v-container>
    </section>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 mt-3>
          <div class="container-content">
            <div class="box-container">
              <div class="cul-box" style="color: #7e57c2;">
                <v-icon color="#7e57c2" :size="50">home</v-icon>
                <span class="number-box">95%</span>
                <span class="des-title text-uppercase">wining rate</span>
              </div>
              <div class="cul-box cul-box-green">
                <v-icon color="#ace6af" :size="50">home</v-icon>
                <span class="number-box">1200</span>
                <span class="des-title text-uppercase">total bets</span>
              </div>
              <div class="cul-box cul-box-red">
                <v-icon color="#f28691" :size="50">home</v-icon>
                <span class="number-box">995</span>
                <span class="des-title text-uppercase">followers</span>
              </div>
              <div class="cul-box cul-box-yellow">
                <v-icon color="#ffd682" :size="50">home</v-icon>
                <span class="number-box">100000</span>
                <span class="des-title text-uppercase">wining amount</span>
              </div>
            </div>
            <div class="pt-5 stock-history">
              <h2 class="text-uppercase">online history chart</h2>
              <div class="stock-history-container">
                <VueApexCharts
                  type="bar"
                  height="350"
                  :options="chartOptions"
                  :series="series"
                />
              </div>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
import Button from "~/components/Button";
import VueApexCharts from "vue-apexcharts";

export default {
  layout: "desktopModern",
  components: {
    Button,
    VueApexCharts,
  },
  data() {
    return {
      filter: "1 Week",
      items: ["1 Week", "1 Month", "3 Month", "6 Month"],
      series: [
        {
          data: [21, 22, 10, 28, 16, 0, 0, 0, 0],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            },
          },
        },
        colors: ["#2E93fA", "#66DA26", "#546E7A", "#E91E63", "#FF9800"],
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [
            "2020-03-30",
            "2020-03-31",
            "2020-04-01",
            "2020-04-02",
            "2020-04-03",
            "2020-04-04",
            "2020-04-05",
            "2020-04-06",
            "2020-04-07",
          ],
          labels: {
            style: {
              fontSize: "12px",
            },
          },
        },
      },
    };
  },
};
</script>
<style scoped>
.stock-history-container {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 0 3px gray;
  border-radius: 5px;
}
.des-title {
  color: black !important;
  font-weight: 500;
}
.number-box {
  font-size: 40px;
  font-weight: bolder;
}
.box-container {
  display: flex;
  width: 100%;
}
.cul-box:first-child {
  margin-left: 0;
}
.cul-box {
  padding: 15px;
  border-radius: 10px;
  border: #c0acef solid 3px;
  background-color: #fff;
  margin: 15px;
  width: 180px;
  height: 180px;
  box-shadow: 0 0 2px #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
}
.cul-box-green {
  border-color: #ace6af !important;
  color: #ace6af;
}
.cul-box-yellow {
  border-color: #ffd682 !important;
  color: #ffd682;
}
.cul-box-red {
  border-color: #f28691 !important;
  color: #f28691;
}
.container-content {
  padding-top: 25px;
  display: flex;
  width: 100%;
  flex-direction: column;
}
.profile-crowd {
  position: absolute;
  z-index: 1;
  min-width: 30px;
  min-height: 30px;
  border-radius: 50%;
  border: #fff solid 1px;
  background-color: #8b4448;
  top: -12px;
  right: -9px;
  padding: 2px;
}
.profile-img-container {
  cursor: pointer;

  position: relative;
  border: gray solid 3px;
  border-radius: 5px;
  height: 100px;
  width: 100px;
  box-shadow: 0 0 5px #fff;
}
.profile-name-tittle {
  font-weight: bolder;
  font-size: 22px;
}
.flex-container {
  display: flex;
  align-items: center;
}
.profile-name-container {
  display: flex;
  cursor: pointer;
  flex-direction: column;
  position: relative;
  top: -15px;
  padding-left: 12px;
}
</style>
