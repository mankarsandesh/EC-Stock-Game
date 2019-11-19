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
        setZero(num, digit) {
            var zero = '';
            for (var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
        formatToPrice(value) {
            if (this.$route.params.id.split('-')[1] == 'usindex') {
                return `${Number(value).toFixed(4)}`;
            } else {
                return `${Number(value).toFixed(2)}`;
            }
        },
        async getChart() {
            let dataGet = await this.$axios.$get( '/api/me/online?method=chart&apikey=' + localStorage.apikey)
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
                type: "line",
                data: {
                    labels: this.stockname,
                    datasets: [{
                        label: "hours",
                        data: this.betwon,
                        fill: true,
                        borderColor: "blue"
                    }]
                },
                options: {
                    elements: {
                        line: {
                            tension: 0
                        },
                        rectangle: {
                            borderWidth: 0,
                            borderSkipped: "bottom"
                        }
                    },
                    responsive: true,
                    legend: {
                        display: false,
                        position: "top"
                    },
                    title: {
                        display: false,
                        text: "online time hours"
                    },
                    pan: {
                        enabled: true,
                        mode: "x" // is panning about the y axis neccessary for bar charts?
                    },
                    zoom: {
                        enabled: true,
                        mode: "x",
                        sensitivity: 1
                    },
                    tooltips: {
                        mode: "index",
                        intersect: false
                    },
                    hover: {
                        mode: "nearest",
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                maxRotation: 0,
                                display: true
                            },
                            stacked: true,
                            scaleLabel: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            stacked: true,
                            gridLines: {
                                display: true
                            },
                            scaleLabel: {
                                display: false
                            },
                            ticks: {
                                display: true
                            }
                        }]
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
