<template>
<div class="text-xs-center">
    {{msg}}
    <canvas ref="planetchart" class="set-height" v-show="isShow"></canvas>
    <v-progress-linear :indeterminate="true" color="blue darken-3" v-show="!isShow"></v-progress-linear>
</div>
</template>

<script>
import {
    Line,
    mixins
} from 'vue-chartjs'
import VueCharts from "vue-chartjs";
import io from "socket.io-client";
import Chart from 'chart.js';
const socket = io("https://node-liveprice.herokuapp.com");
export default {
    data() {
        return {
            load: false,
            stockname: [],
            betamount: [],
            chartData: [],
            isShow: true,
            msg:""
        }
    },
    mounted() {
        socket.on("liveprice1", data => {
            console.log(data.data);
            if (data.data.length != 0) {
                this.chartData = data.data;
                this.msg = "Stock Open";
                console.log("ritesh");
                if(this.isShow == false)
                this.getChart()
            } else {
                this.chartData = " ";
                this.msg = "Stock Close";
                 if(this.isShow == false)
                this.getChart()
            }
        });
        this.getChart()
    },
    methods: {
        getChart() {
            console.log(this.chartData)
            if (this.chartData == '') return this.isShow = false;

            this.chartData.forEach(element => {
                this.isShow = true
                this.stockname.push(element.rule);

                this.betamount.push(element.totalAmount);
            });

            var config = {
                type: "horizontalBar",
                data: {
                    labels: this.stockname,
                    datasets: [{
                        data: this.betamount,
                        label: 'Amount',
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
    height: 900px;
}

.v-progress-circular {
    margin: 1rem
}
</style>
