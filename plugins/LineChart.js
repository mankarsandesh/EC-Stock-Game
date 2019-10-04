import { Line, mixins } from 'vue-chartjs'
import VueCharts from "vue-chartjs";
import zoom from "chartjs-plugin-zoom";
const { reactiveProp } = mixins

export default {
    extends: Line,
    mixins: [mixins.reactiveProp],
    props: ["options", "chartData"],
    mounted() {
        this.renderChart(this.chartData, this.options)
    },

}