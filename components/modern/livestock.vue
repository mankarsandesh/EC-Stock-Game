<template>
<div>
    <canvas ref="planetchart" class="set-height"></canvas>
</div>
</template>

<script>
import {
    Line,
    mixins
} from 'vue-chartjs'
import VueCharts from "vue-chartjs";
import Chart from 'chart.js';
export default {
    props: ["dataGet"],
    data() {
        return {
            load: false,
            stockname: [],
            betwon: [],
        }
    },
    mounted() {
        this.dataGet.forEach(element => {
            this.stockname.push(element.rule);
            this.betwon.push(element.totalAmount);
        });
        this.gradient = this.$refs.planetchart.getContext("2d").createLinearGradient(255, 0, 0, 0);
        this.gradient.addColorStop(0, "#003f70");
        this.gradient.addColorStop(1, "#ffffff");

        var config = {
            type: "horizontalBar",
            data: {
                labels: this.stockname,
                datasets: [{
                    data: this.betwon,
                    label: this.$root.$t('msg.amount'),
                    // fill: false,
                    backgroundColor: this.gradient,
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,

                legend: {
                    display: false,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Stock Live Data'
                },
                tooltips: {
                    enabled: false
                },
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                },
                tooltips: {
                    mode: "index",
                    intersect: false
                },
                hover: {
                    mode: "nearest",
                    intersect: true
                }
            }
        };

        const ctx = this.$refs.planetchart;
        const mychart = new Chart(ctx, config);
    },

}
</script>

<style scoped>
.set-height {
    height: 300px;
}
</style>
