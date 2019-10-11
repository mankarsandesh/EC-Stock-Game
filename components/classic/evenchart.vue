<template>
<div class="text-xs-center">
    <canvas ref="planetchart" class="set-height"></canvas>
    <v-progress-linear :indeterminate="true" color="blue darken-3" v-show="!load"></v-progress-linear>
</div>
</template>

<script>
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

            let datas = [];
            let labelss = [];
            let lastdraw = [];
            let pointBackgroundColor = [];
            let value_no;
            let num;

            this.StockData.forEach(element => {
                let no_firsts = element.PT[element.PT.length - 2].toString();
                let no_lasts = element.PT[element.PT.length - 1].toString();

                let no_first = parseInt(no_firsts);
                let no_last = parseInt(no_lasts);
                let no_both = no_first + no_last;
                let no_two = parseInt(no_first + '' + no_last);

                if (this.checkStock == 'bsf') {
                    value_no = no_first
                    num = value_no >= 5
                } else if (this.checkStock == 'bsl') {
                    value_no = no_last
                    num = value_no >= 5
                } else if (this.checkStock == 'bsb') {
                    value_no = no_both
                    num = value_no >= 8
                } else if (this.checkStock == 'bst') {
                    value_no = this.setZero(no_two, 2)
                    num = value_no >= 50
                } else if (this.checkStock == 'oef') {
                    value_no = no_first
                    num = value_no % 2 == 0
                } else if (this.checkStock == 'oel') {
                    value_no = no_last
                    num = value_no % 2 == 0
                } else if (this.checkStock == 'oeb') {
                    value_no = no_both
                    num = value_no % 2 == 0
                } else if (this.checkStock == 'oet') {
                    value_no = this.setZero(no_two, 2)
                    num = value_no % 2 == 0
                }

                let date = new Date(element.created_at.replace(/-/g, "/"));
                labelss.push(this.setZero(date.getMonth() + 1, 2) + "/" + this.setZero(date.getDate(), 2) + " " + this.setZero(date.getHours(), 2) + ':' + this.setZero(date.getMinutes(), 2));
                datas.push(value_no);
                pointBackgroundColor.push(num ? "blue" : "red");
                lastdraw.push({
                    id: element.id
                });

            })
            let datalastdraw = lastdraw[lastdraw.length - 1];
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
                        borderDashOffset: 0.5,
                        pointBackgroundColor: pointBackgroundColor,
                        pointHoverRadius: 10,
                        pointRadius: 10
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
            }

            const ctx = this.$refs.planetchart;
            const mychart = new Chart(ctx, config);

            ///////////////////////////////////////////
            const socket = openSocket('https://websocket-timer.herokuapp.com')
            socket.on('time', data => {
                let times, calculating;
                if (this.$route.params.id.split('-')[1] == 'btc1') {
                    times = data.btc1.timer
                    calculating = 38
                } else if (this.$route.params.id.split('-')[1] == 'btc5') {
                    times = data.btc5.timer
                    calculating = 238
                } else if (this.$route.params.id.split('-')[1] == 'usindex') {
                    times = data.usindex.timer
                    calculating = 238
                } else {
                    times = data.SH000001.timer
                    calculating = 238
                }

                if (times == calculating) {
                    startInterval()
                }
            })
            let _this = this;

            function startInterval() {
                let items = [];
                let value_no;
                let num;
                _this.StockData.forEach(elements => {
                    let no_firsts = elements.PT[elements.PT.length - 2].toString();
                    let no_lasts = elements.PT[elements.PT.length - 1].toString();

                    let no_first = parseInt(no_firsts);
                    let no_last = parseInt(no_lasts);
                    let no_both = no_first + no_last;
                    let no_two = parseInt(no_first + '' + no_last);

                    if (_this.checkStock == 'bsf') {
                        value_no = no_first
                        num = value_no >= 5
                    } else if (_this.checkStock == 'bsl') {
                        value_no = no_last
                        num = value_no >= 5
                    } else if (_this.checkStock == 'bsb') {
                        value_no = no_both
                        num = value_no >= 8
                    } else if (_this.checkStock == 'bst') {
                        value_no = _this.setZero(no_two, 2)
                        num = value_no >= 50
                    } else if (_this.checkStock == 'oef') {
                        value_no = no_first
                        num = value_no % 2 == 0
                    } else if (_this.checkStock == 'oel') {
                        value_no = no_last
                        num = value_no % 2 == 0
                    } else if (_this.checkStock == 'oeb') {
                        value_no = no_both
                        num = value_no % 2 == 0
                    } else if (_this.checkStock == 'oet') {
                        value_no = _this.setZero(no_two, 2)
                        num = value_no % 2 == 0
                    }
                    items.push({
                        id: elements.id,
                        date: elements.created_at.replace(/-/g, "/"),
                        value: value_no,
                        color: num
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
                    config.data.datasets[0].pointBackgroundColor.push(dataItems.color ? "blue" : "red");
                    mychart.update();
                }

            }

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
