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
    props: ["stocks", "checkStock", "StockData"],
    data() {
        return {
            load: false,
        }
    },
    mounted() {
        setTimeout(() => {
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
        getChart() {
            if (this.StockData === "") {
                return
            } else {
                this.load = true
            }
            let _this = this;
            let labelss = [];
            let datas = [];
            let lastdraw = [];
            this.StockData.forEach(element => {
                let date = new Date(element.created_at.replace(/-/g, "/"));
                labelss.push(this.setZero(date.getMonth() + 1, 2) + "/" + this.setZero(date.getDate(), 2) + " " + this.setZero(date.getHours(), 2) + ':' + this.setZero(date.getMinutes(), 2));
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

            const config = {
                type: 'line',
                data: {
                    labels: labelss,
                    datasets: [{
                        data: datas,
                        label: "value",
                        fill: true,
                        borderColor: "#00c0ef",
                        borderWidth: 1.5,
                        borderDashOffset: 0.0,
                        pointBackgroundColor: "#00c0ef",
                        pointBorderColor: "rgba(255,255,255,0)",
                        pointHoverBackgroundColor: "#00c0ef",
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
                    barPercentage: 1.6,
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
                        // text: 'LOADS'
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
                            display: false,
                            reverse: false,
                            position: 'right',
                        }, {
                            gridLines: {
                                display: true
                            },
                            scaleLabel: {
                                display: false
                            },
                            ticks: {
                                display: true,
                                reverse: false,
                                position: 'left',
                                beginAtZero: true,
                                suggestedMin: min,
                                suggestedMax: max,
                                maxTicksLimit: 6,
                            }
                        }]
                    },
                    tooltips: {
                        bodySpacing: 4,
                        xPadding: 12,
                        intersect: false,
                        mode: "index",
                        callbacks: {
                            label: function (tooltipItem, data) {
                                if (_this.stocks === "usindex") {
                                    return (_this.$t('msg.price') + tooltipItem.yLabel.toFixed(4));
                                } else {
                                    return (_this.$t('msg.price') + tooltipItem.yLabel.toFixed(2));
                                }

                            }
                        }
                    }
                }
            }

            const ctx = this.$refs.planetchart;
            const mychart = new Chart(ctx, config);

            ///////////////////////////////////////////
            const socket = openSocket('https://websocket-timer.herokuapp.com')
            socket.on('time', data => {
                let times, calculating;
                if (this.$route.params.id.split('-')[1] == 'btc1') {
                    times = data.btc1.timer
                    calculating = 39
                } else if (this.$route.params.id.split('-')[1] == 'btc5') {
                    times = data.btc5.timer
                    calculating = 239
                } else if (this.$route.params.id.split('-')[1] == 'usindex') {
                    times = data.usindex.timer
                    calculating = 239
                } else {
                    times = data.SH000001.timer
                    calculating = 239
                }

                if (times == calculating) {
                    startInterval()
                }
            })

            function startInterval() {
                let items = [];
                _this.StockData.forEach(elements => {
                    items.push({
                        id: elements.id,
                        date: elements.created_at.replace(/-/g, "/"),
                        value: elements.PT,
                    });
                });
                let dataItems = items[items.length - 1];
                if (datalastdraw.id != dataItems.id) {
                    let date = new Date(dataItems.date);
                    let dd1 = date.getDate();
                    let dd = dd1 < 10 ? "0" + dd1 : dd1;
                    let mm1 = date.getMonth() + 1;
                    let mm = mm1 < 10 ? "0" + mm1 : mm1;
                    let Hourss = date.getHours();
                    let Hours = Hourss < 10 ? "0" + Hourss : Hourss;
                    let Minutess = date.getMinutes();
                    let Minutes = Minutess < 10 ? "0" + Minutess : Minutess;
                    date = dd + "/" + mm + " " + Hours + ":" + Minutes;

                    // console.log("add New Data")
                    // console.log(date)
                    // console.log(dataItems.value)

                    config.data.labels.push(date);
                    config.data.datasets[0].data.push(dataItems.value);
                    mychart.update();
                }

            }

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
