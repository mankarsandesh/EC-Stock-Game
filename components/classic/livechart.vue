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
import openSocket from 'socket.io-client'
export default {
    props: ["StockData"],
    data() {
        return {
            load: false,
        }
    },
    mounted() {
        this.getChart()
        setInterval(() => {
            if (this.load == false) this.getChart()
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
        async getChart() {
            if (this.StockData === "") return
            else this.load = true

            let _this = this;
            let labelss = [];
            let datas = [];
            let lastdraw = [];

            let s = this.$root.$t('stockname.' + this.$route.params.id.split('-')[1]);
            let l = this.$route.params.id.split('-')[1] == 'btc1' ? ' 1 ' : this.$route.params.id.split('-')[1] == 'btc5' ? ' 5 ' : '';
            let title = s + l
            this.StockData.forEach(element => {
                let date = new Date(element.writetime.replace(/-/g, "/"));
                labelss.push(this.setZero(date.getMonth() + 1, 2) + "/" + this.setZero(date.getDate(), 2) + "-" + this.setZero(date.getHours(), 2) + ':' + this.setZero(date.getMinutes(), 2));
                datas.push(parseFloat(element.PT));
                lastdraw.push({
                    id: element.id
                });
            })

            let datalastdraw = lastdraw[lastdraw.length - 1];
            let mindate = labelss[labelss.length - 299];
            let max = datas[0];
            let min = datas[0];

            for (let i = 1; i < datas.length; i++) {
                //  get max
                if (datas[i] > max) {
                    max = datas[i];
                }
                // get min
                if (datas[i] < min) {
                    min = datas[i];
                }
            }
            // console.log(max)
            // console.log(min)
            const ctx = this.$refs.planetchart;
            this.gradient = this.$refs.planetchart.getContext("2d").createLinearGradient(0, 0, 0, 450);

            this.gradient.addColorStop(0, '#88cafb')
            this.gradient.addColorStop(0.95, '#ffffff');
            this.gradient.addColorStop(1, '#ffffff');

            // this.gradient.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
            // this.gradient.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
            // this.gradient.addColorStop(1, 'rgba(0, 231, 255, 0)');

            const config = {
                type: 'line',
                data: {
                    labels: labelss,
                    datasets: [{
                        data: datas,
                        label: "value",
                        fill: true,
                        borderColor: "#0072c7",
                        borderWidth: 1.5,
                        pointBackgroundColor: "#00c0ef",
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointHoverBackgroundColor: "#00c0ef",
                        backgroundColor: this.gradient,
                        pointBorderWidth: 0,
                        pointHoverRadius: 0,
                        pointHoverBorderWidth: 0,
                        pointRadius: 0.5,
                    }]
                },
                options: {
                    responsive: true,
                    barPercentage: 1.6,
                    maintainAspectRatio: false,
                    layout: {
                        // padding: {
                        //     left: 50,
                        //     right: 0,
                        //     top: 0,
                        //     bottom: 0
                        // }
                    },
                    elements: {
                        rectangle: {
                            borderWidth: 0,
                            borderSkipped: "bottom"
                        }
                    },
                    legend: {
                        display: false,
                        position: "top"
                    },
                    title: {
                        display: true,
                        text: this.$root.$t('msg.Stock') + ': ' + title
                    },
                    pan: {
                        enabled: true,
                        mode: "x",
                        speed: 10,
                        threshold: 10
                    },
                    zoom: {
                        enabled: true,
                        drag: false,
                        mode: "x",
                        limits: {
                            max: 10,
                            min: 0.5
                        },
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                maxRotation: 0,
                                display: true,
                                min: mindate,
                                beginAtZero: true,
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display: true
                            },
                            scaleLabel: {
                                display: false
                            },
                            display: true,
                            reverse: false,
                            position: 'left',
                            beginAtZero: true,
                            suggestedMin: min,
                            suggestedMax: max,
                            maxTicksLimit: 6
                        }]
                    },
                    tooltips: {
                        bodySpacing: 4,
                        xPadding: 12,
                        intersect: false,
                        mode: "index",
                        callbacks: {
                            label: function (tooltipItem, data) {
                                if (_this.$route.params.id.split('-')[1] === "usindex")
                                    return (_this.$root.$t('msg.price') + tooltipItem.yLabel.toFixed(4));
                                else
                                    return (_this.$root.$t('msg.price') + tooltipItem.yLabel.toFixed(2));
                            }
                        }
                    }
                }
            }

            const mychart = new Chart(ctx, config);

            // add new data for chart
            setInterval(() => {
                let dataItems = this.StockData[this.StockData.length - 1]
                if (datalastdraw.id != dataItems.id) {
                    let date = new Date(dataItems.writetime.replace(/-/g, "/"));
                    config.data.labels.push(
                        this.setZero(date.getMonth() + 1, 2) + "/" +
                        this.setZero(date.getDate(), 2) + "-" +
                        this.setZero(date.getHours(), 2) + ':' +
                        this.setZero(date.getMinutes(), 2)
                    );
                    // console.log("add new data for chart")
                    config.data.datasets[0].data.push(dataItems.PT);
                    mychart.update();
                    datalastdraw.id = dataItems.id
                }
            }, 1000)
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
