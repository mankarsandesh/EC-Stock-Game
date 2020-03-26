<template>
  <div>
    <apexchart type="area" width="100%" height="100%" :options="chartOptions" :series="series" />
  </div>
</template>
<script>
import VueApexCharts from "vue-apexcharts";

export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      series: [
        {
          name: "Price",
          data: this.data
        }
      ],
      chartOptions: {
         zoom: {
          enabled: true,
          type: 'x',  
          autoScaleYaxis: false,  
          zoomedArea: {
            fill: {
              color: '#90CAF9',
              opacity: 0.4
            },
            stroke: {
              color: '#0D47A1',
              opacity: 0.4,
              width: 1
            }
          }
      },
        plotOptions: {
          line: {
            lineHeight: "100%",
            horizontal: true // <---- "true" flip the axis, "100" is not shown anymore
          }
        },
        chart: {
          parentHeightOffset: 0,
          height: 600,
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        brush: {
          target: "chartArea",
          enabled: true
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          //   curve: "smooth",
          lineCap: "butt",
          colors: undefined,
          width: 1,
          dashArray: 0
        },
        grid: {
          padding: {
            left: 0,
            right: 0,
            top: -30,
            bottom: -35
          },
          show: false
        },
        xaxis: {
          show: false,
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          }
        },
        yaxis: {
          show: false,
          labels: {
            show: false
          },
          // tickAmount: 3
          // min: Math.max(...this.data)+10,
          // max: Math.min(...this.data)+10,
        }
      }
    };
  }
};
</script>