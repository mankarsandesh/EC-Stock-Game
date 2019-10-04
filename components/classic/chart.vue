<template>
<div class="text-xs-center">
    <line-chart :chart-data="datacollection" :options="defaultOptions" class="set-height" v-if="load"></line-chart>
    <v-progress-linear :indeterminate="true" color="blue darken-3" v-else></v-progress-linear>
    <!-- <button @click="clear()">add data</button> -->
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
    // props:["stocks","checkStock","StockData"],
    props: {
        stocks: {
            type: String,
            default: 'btc1'
        },
        checkStock: {
            type: String,
            default: 'live'
        },
        StockData: {
            type: Array,
            required: true

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
            this.url(this.stocks);
            let datas = this.data;
            let labelss = this.labels;
            let self = this;
            if (this.StockData === "") {
                return
            } else {
                this.load = true
            }

            // this.api = "http://159.138.54.214/api/btc1";
            // this.$axios(this.api).then(response => {

            this.StockData.forEach(element => {
                let date = new Date(element.created_at.replace(/-/g, "/"));
                labelss.push(this.setZero(date.getMonth() + 1, 2) + "/" + this.setZero(date.getDate(), 2) + " " + this.setZero(date.getHours(), 2) + ':' + this.setZero(date.getMinutes(), 2));
                datas.push(parseFloat(element.PT));
            })

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

            this.datacollection = {
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
                        pointRadius: 1
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
                    tooltips: {
                        bodySpacing: 4,
                        xPadding: 12,
                        intersect: false,
                        mode: "index",

                        callbacks: {
                            label: function (tooltipItem, data) {
                                if (self.stocks === "usindex") {
                                    return ("value: " + tooltipItem.yLabel.toFixed(4));
                                } else {
                                    return ("value: " + tooltipItem.yLabel.toFixed(2));
                                }

                            }
                        }
                    }
                }

            // const socket = openSocket('https://websocket-timer.herokuapp.com')
            // socket.on('time', data => {
            //     let times, calculating;
            //     if (this.$route.params.id.split('-')[1] == 'btc1') {
            //         times = data.btc1.timer
            //         calculating = 41
            //     } else if (this.$route.params.id.split('-')[1] == 'btc5') {
            //         times = data.btc5.timer
            //         calculating = 241
            //     } else if (this.$route.params.id.split('-')[1] == 'usindex') {
            //         times = data.usindex.timer
            //         calculating = 241
            //     } else {
            //         times = data.SH000001.timer
            //         calculating = 241
            //     }

            //     if (times == calculating) {
            //         startInterval()
            //     }
            // })

            // function startInterval() {
            //     console.log("add new data")
            //     datas = []
            //     labelss = []
            //     let items = [];
            //     self.$axios.get(self.api).then(function (response) {
            //         self.StockData.forEach(elements => {
            //             items.push({
            //                 date: elements.created_at.replace(/-/g, "/"),
            //                 value: elements.PT,
            //             });
            //         });

            //         let dataItems = items[items.length - 1];

            //         let date = new Date(dataItems.date);
            //         let labelss = self.setZero(date.getMonth() + 1, 2) + "/" + self.setZero(date.getDate(), 2) + " " + self.setZero(date.getHours(), 2) + ':' + self.setZero(date.getMinutes(), 2);
            //         labelss.push(labelss);
            //         datas.push(dataItems.value);
            //         // new data to chart
            //         // self.datacollection.labels.push(labelss);
            //         // self.datacollection.datasets[0].data.push(dataItems.value);
            //         // self.datacollection.update();
            //         // self.renderChart(self.data, self.options)
            //         // console.log(labelss)
            //         // console.log(dataItems.value)
            //     });
            // }

            // }).catch(function (error) {
            //     console.warn(error);
            // });
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
