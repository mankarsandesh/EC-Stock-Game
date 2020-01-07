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
    props: ["checkStock", "StockData"],
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
        formatToPrice(value) {
            if (this.$route.params.id.split('-')[1] == 'usindex') {
                return `${Number(value).toFixed(4)}`;
            } else {
                return `${Number(value).toFixed(2)}`;
            }
        },
        getChart() {
            if (this.StockData === "") return
            else this.load = true

            let datas = [];
            let labelss = [];
            let lastdraw = [];
            let pointBackgroundColor = [];
            let value_no;
            let num;
            let s = this.$root.$t('stockname.' + this.$route.params.id.split('-')[1]);
            let l = this.$route.params.id.split('-')[1] == 'btc1' ? ' 1 ' : this.$route.params.id.split('-')[1] == 'btc5' ? ' 5 ' : '';
            let title = s + l
            this.StockData.forEach(element => {

                let no_firsts = this.formatToPrice(element.PT)[this.formatToPrice(element.PT).length - 2].toString();
                let no_lasts = this.formatToPrice(element.PT)[this.formatToPrice(element.PT).length - 1].toString();

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

                let date = new Date(element.writetime.replace(/-/g, "/"));
                labelss.push(this.setZero(date.getMonth() + 1, 2) + "/" + this.setZero(date.getDate(), 2) + "-" + this.setZero(date.getHours(), 2) + ':' + this.setZero(date.getMinutes(), 2));
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
            const ctx = this.$refs.planetchart;
            // this.gradient = this.$refs.planetchart.getContext("2d").createLinearGradient(0, 0, 0, 450);
            // this.gradient.addColorStop(0, '#384e63')
            // this.gradient.addColorStop(0.3, '#384e63e0');
            // this.gradient.addColorStop(1, 'rgba(0, 231, 255, 0)');

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
                        // backgroundColor: this.gradient,
                        pointRadius: 10,
                        lineTension: 0.15
                    }]
                },
                options: {
                    responsive: true,
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

            const mychart = new Chart(ctx, config);

            ///////////////////////////////////////////
            // add new data for chart
            setInterval(() => {
                let elements = this.StockData[this.StockData.length - 1]
                if (datalastdraw.id != elements.id) {
                    let no_firsts = elements.PT[elements.PT.length - 2].toString();
                    let no_lasts = elements.PT[elements.PT.length - 1].toString();
                    let value_no, num;
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

                    let date = new Date(elements.writetime.replace(/-/g, "/"));
                    // console.log("add New Data even chart")

                    config.data.labels.push(this.setZero(date.getMonth() + 1, 2) + "/" + this.setZero(date.getDate(), 2) + "-" + this.setZero(date.getHours(), 2) + ':' + this.setZero(date.getMinutes(), 2));
                    config.data.datasets[0].data.push(value_no);
                    config.data.datasets[0].pointBackgroundColor.push(num ? "blue" : "red");
                    mychart.update();
                    datalastdraw.id = elements.id
                }
            }, 1000);

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
