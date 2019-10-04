<template>
<div class="text-xs-center">
    <line-chart :chart-data="datacollection" :options="defaultOptions" class="set-height" v-if="load"></line-chart>
    <v-progress-linear :indeterminate="true" color="blue darken-3" v-else></v-progress-linear>
</div>
</template>

<script>
import LineChart from '../../plugins/LineChart'
import openSocket from 'socket.io-client'
import {
    urlapi
} from "../../data/urlapi";
export default {
    layout:'classic',
    mixins: [urlapi],
    components: {
        LineChart
    },
    props: {
        stocks: {
            type: String,
            default: true
        },
        checkStock: {
            type: String,
            default: true
        }
    },
    data() {
        return {
            datacollection: null,
            defaultOptions: null,
            labels: [],
            data: [],
            setval: null,
            load: false,
        }
    },
    mounted() {
        this.getChart()

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
            this.url(this.stocks);
            let datas = this.data;
            let labelss = this.labels;
            let self = this;
            let pointBackgroundColor = [];
            let value_no, num;

            // this.api = "http://159.138.54.214/api/btc1";
            this.$axios(this.api).then(response => {
                this.load = true
                response.data.data.forEach(element => {
                    if (this.checkStock == 'bsf') {
                        value_no = parseFloat(element.no1)
                        num = value_no >= 5
                    } else if (this.checkStock == 'bsl') {
                        value_no = parseFloat(element.no2)
                        num = value_no >= 5
                    } else if (this.checkStock == 'bsb') {
                        value_no = parseFloat(element.no2 + element.no2)
                        num = value_no >= 8
                    } else if (this.checkStock == 'bst') {
                        value_no = parseFloat(element.no2 + '' + element.no2)
                        num = value_no >= 50
                    } else if (this.checkStock == 'oef') {
                        value_no = parseFloat(element.no1)
                        num = value_no % 2 == 0
                    } else if (this.checkStock == 'oel') {
                        value_no = parseFloat(element.no2)
                        num = value_no % 2 == 0
                    } else if (this.checkStock == 'oeb') {
                        value_no = parseFloat(element.no2 + element.no2)
                        num = value_no % 2 == 0
                    } else if (this.checkStock == 'oet') {
                        value_no = parseFloat(element.no2 + '' + element.no2)
                        num = value_no % 2 == 0
                    }
                    let date = new Date(element.writetime.replace(/-/g, "/"));
                    labelss.push(this.setZero(date.getMonth() + 1, 2) + "/" + this.setZero(date.getDate(), 2) + " " + this.setZero(date.getHours(), 2) + ':' + this.setZero(date.getMinutes(), 2));
                    datas.push(value_no);
                    pointBackgroundColor.push(num ? "blue" : "red");
                })

                let mindate = labelss[labelss.length - 20];
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

                this.datacollection = {
                        labels: labelss,
                        datasets: [{
                            data: datas,
                            label: "value",
                            fill: true,
                            borderColor: "#00c0ef",
                            borderWidth: 1.5,
                            borderDashOffset: 0.5,
                            pointBackgroundColor: pointBackgroundColor,
                            pointHoverRadius: 10,
                            pointRadius: 10
                        }]
                    },

                    this.defaultOptions = {
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
                        // tooltips: {
                        //     bodySpacing: 4,
                        //     xPadding: 12,
                        //     intersect: false,
                        //     mode: "index",

                        //     callbacks: {
                        //         label: function (tooltipItem, data) {
                        //             if (self.stocks === "usindex") {
                        //                 return ("value: " + tooltipItem.yLabel.toFixed(4));
                        //             } else {
                        //                 return ("value: " + tooltipItem.yLabel.toFixed(2));
                        //             }

                        //         }
                        //     }
                        // },
                        animation: {
                            duration: 1,
                            onComplete: function () {
                                var chartInstance = this.chart,
                                    ctx = chartInstance.ctx;
                                ctx.font = Chart.helpers.fontString(
                                    Chart.defaults.global.defaultFontSize,
                                    Chart.defaults.global.defaultFontStyle,
                                    Chart.defaults.global.defaultFontFamily
                                );
                                ctx.textAlign = "center";
                                ctx.textBaseline = "bottom";

                                this.data.datasets.forEach(function (dataset, i) {
                                    var meta = chartInstance.controller.getDatasetMeta(i);
                                    meta.data.forEach(function (bar, index) {
                                        var data = dataset.data[index];
                                        ctx.fillText(data, bar._model.x, bar._model.y + 7);
                                        ctx.fillStyle = "#ffffff";
                                    });
                                });
                            }
                        }
                    }

                const socket = openSocket('https://websocket-timer.herokuapp.com')
                socket.on('time', data => {
                    let times, calculating;
                    if (this.$route.params.id.split('-')[1] == 'btc1') {
                        times = data.btc1.timer
                        calculating = 41
                    } else if (this.$route.params.id.split('-')[1] == 'btc5') {
                        times = data.btc5.timer
                        calculating = 241
                    } else if (this.$route.params.id.split('-')[1] == 'usindex') {
                        times = data.usindex.timer
                        calculating = 241
                    } else {
                        times = data.SH000001.timer
                        calculating = 241
                    }

                    if (times == calculating) {
                        startInterval()

                    }

                })

                function startInterval() {
                    let items = [];
                    self.$axios.get(self.api).then(function (response) {
                        response.data.data.forEach(element => {
                            if (self.checkStock == 'bsf') {
                                value_no = parseFloat(element.no1)
                                num = value_no >= 5
                            } else if (self.checkStock == 'bsl') {
                                value_no = parseFloat(element.no2)
                                num = value_no >= 5
                            } else if (self.checkStock == 'bsb') {
                                value_no = parseFloat(element.no2 + element.no2)
                                num = value_no >= 8
                            } else if (self.checkStock == 'bst') {
                                value_no = parseFloat(element.no2 + '' + element.no2)
                                num = value_no >= 50
                            } else if (self.checkStock == 'oef') {
                                value_no = parseFloat(element.no1)
                                num = value_no % 2 == 0
                            } else if (self.checkStock == 'oel') {
                                value_no = parseFloat(element.no2)
                                num = value_no % 2 == 0
                            } else if (self.checkStock == 'oeb') {
                                value_no = parseFloat(element.no2 + element.no2)
                                num = value_no % 2 == 0
                            } else if (self.checkStock == 'oet') {
                                value_no = parseFloat(element.no2 + '' + element.no2)
                                num = value_no % 2 == 0
                            }

                            items.push({
                                date: element.writetime.replace(/-/g, "/"),
                                value: value_no,
                                num: num
                            });
                        });

                        let dataItems = items[items.length - 1];
                        let date = new Date(dataItems.date);
                        let labelss = self.setZero(date.getMonth() + 1, 2) + "/" + self.setZero(date.getDate(), 2) + " " + self.setZero(date.getHours(), 2) + ':' + self.setZero(date.getMinutes(), 2);

                        // new data lastdraw
                        // new data to chart 
                        // self.datacollection.labels.push(labelss);
                        // self.datacollection.datasets[0].data.push(dataItems.value);
                        // self.datacollection.datasets[0].pointBackgroundColor.push(dataItems.num ? "blue" : "red");

                        // console.log(labelss)
                        // console.log(dataItems.value)
                        // console.log(dataItems.num)
                    });
                }

            }).catch(function (error) {
                console.warn(error);
            });
        }
    }
}
</script>

<style scoped>
.set-height {
    height: 350px;
}

.v-progress-circular {
    margin: 1rem
}
</style>
