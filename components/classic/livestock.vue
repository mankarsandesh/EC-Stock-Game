<template>
<div class="text-xs-center">
    <canvas ref="planetchart" class="set-height"></canvas>
    <v-progress-linear :indeterminate="true" color="blue darken-3" v-show="!load"></v-progress-linear>
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
    data() {
        return {
            load: false,
            stockname: [],
            betwon: []
        }
    },
    mounted() {
        this.getChart()
        setInterval(() => {
            if (this.load == false)
                this.getChart()
        }, 1000)
    },
    methods: {
        async getChart() {
            let dataGet = await this.$axios.$get('/api/me/online?method=chart&apikey=' + this.$store.state.auth_token)
            // console.log(dataGet)

            dataGet.data.forEach(element => {
                this.load = true
                this.stockname.push(element.da_te);
                let totalSeconds = parseInt(element.timeOnline);
                let hours = Math.floor(totalSeconds / 3600);
                totalSeconds %= 3600;
                let minutes = Math.floor(totalSeconds / 60);
                let minutes2 = minutes < 10 ? "0" + minutes : minutes;
                let seconds = totalSeconds % 60;

                this.betwon.push(hours + "." + minutes2);
            });

            var config = {
                type: "horizontalBar",
                data: {
                    labels: this.stockname,
                    datasets: [{
                        data: this.betwon,
                        label: 'Proficiency',
                        // fill: false,
                        backgroundColor: "blue",
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
                        text: 'Chartjs Horizontal Bar Chart Playground'
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

        }
    }
}
</script>

<style scoped>
.set-height {
    height: 300px;
}

.v-progress-circular {
    margin: 1rem
}
</style>
