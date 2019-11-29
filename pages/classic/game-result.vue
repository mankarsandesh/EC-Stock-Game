<template>
<v-tabs-items>
    <v-tab-item>
        <v-card flat>
            <v-expansion-panel v-model="panel" expand>
                <v-expansion-panel-content class="bg-color">
                    <template v-slot:header>
                        <div> {{$t('menu.game result')}}</div>
                    </template>
                    <v-card> 
                        <v-progress-linear :indeterminate="true" color="blue darken-3" v-show="!load"></v-progress-linear>
                        <v-flex md6 style="float:left;margin-top:5px;"> 
                                 <navbar /> 
                        </v-flex>

                        <v-flex xs3 md3 mr-1 style="float:right;">
                            <v-text-field v-model="search" label="Search" append-icon="search" class="Historyinput" single-line hide-details></v-text-field>
                        </v-flex>

                        <v-flex xs3 md2 mr-1 style="float:right;">
                            <v-select hide-details :items="itemspage" v-model="itemspages" class="Historyinput"  ></v-select>
                        </v-flex>

                       

                        <span class="stockName" id="stockName" @click="getAllCrawler($event)" hidden></span>
                        <v-data-table :headers="headers" hide-actions :search="search" :items="history" :pagination.sync="pagination" ref="table" class="elevation-1">
                            <template v-slot:items="props">
                                <td>{{$t('stockname.'+ props.item.stockName)}}</td>
                                <td>{{props.item.stockType}}</td>
                                <td> {{formatToNumber(props.item.PT,props.item.stockName) }} </td>
                                <td>{{props.item.writetime}}</td>
                                <td>{{props.item.gameId}}</td>
                            </template>
                        </v-data-table>
                         <div class="text-xs-center pt-2" v-if="pages != 0 " >
                            <v-pagination v-model="pagination.page" :length="pages" color="blue"></v-pagination>
                        </div>

                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-card>
    </v-tab-item>
</v-tabs-items>
</template>

<script>
import navbar from "../../components/classic/navbar"
export default {
    layout: 'classic',
    components: {
        navbar
    },
    data() {
        return {
            panel: [true],
            load: false,
            pagination: {},
            itemspage: [5, 10, 25, 50, 100],
            itemspages: 10,
            search: "",
            selected: [],
            history: [],
            headers: [{
                    text: this.$root.$t('msg.Stock Name'),
                    align: "center",
                    sortable: false,
                    value: "stockName",
                    total: false,
                },
                {
                    text: this.$root.$t('msg.Game Mode'),
                    sortable: false,
                    align: "center",
                    value: "stockType",
                    total: false,
                },
                {
                    text: this.$root.$t('msg.Result'),
                    sortable: false,
                    align: "center",
                    value: "PT",
                    page: false,
                },
                {
                    text: this.$root.$t('msg.result out time'),
                    sortable: false,
                    align: "center",
                    value: "writetime",
                    total: false,
                },
                {
                    text: this.$root.$t('msg.gameid'),
                    sortable: false,
                    align: "center",
                    value: "gameId",
                    total: true,
                }
            ],
        }
    },
    mounted() {

        setTimeout(() => {
            this.load = true
        }, 1000)
        this.getAllCrawler(null)
        this.pagination.rowsPerPage = 10
    },
    watch: {
        itemspages(val) {
            this.pagination.rowsPerPage = val
        }
    },
    computed: {
        pages() {
            if (this.pagination.totalItems == null || this.pagination.rowsPerPage == null) return 0
            return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        }
    },
    methods: {
        formatToNumber(value, s) {
            if (s == 'usindex') {
                return Number(value).toFixed(4);
            } else {
                return Number(value).toFixed(2);
            }
        },
        formatToPrice(value) {
            return `$ ${Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
        },
        total1(column) {
            const table = this.$refs.table
            //console.log('table',table);
            return table ? table.filteredItems.reduce((s, i) => {
                return s + parseInt(i[column.value], 10)
            }, 0) : 0
        },
        async getAllCrawler(val) {
            let DataCrawler = await this.$axios.$get('/api/getAllCrawler?limit=300&apikey=' + this.$store.state.auth_token)
            // console.log(DataCrawler)
            if (DataCrawler.data == null) return
            for (let i = 0; i < DataCrawler.data.length; i++) {
                if (val == null || val.target.innerText == 'allstock') {
                    this.history.push({
                        stockName: DataCrawler.data[i].stockName,
                        stockType: DataCrawler.data[i].stockType,
                        PT: DataCrawler.data[i].PT,
                        writetime: DataCrawler.data[i].writetime,
                        gameId: DataCrawler.data[i].gameId
                    });
                    this.pagination.totalItems = this.history.length;
                } else {
                    if (DataCrawler.data[i].stockName == val.target.innerText) {
                        this.history = []
                        this.pagination.totalItems = 0
                        setTimeout(() => {
                            this.history.push({
                                stockName: DataCrawler.data[i].stockName,
                                stockType: DataCrawler.data[i].stockType,
                                PT: DataCrawler.data[i].PT,
                                writetime: DataCrawler.data[i].writetime,
                                gameId: DataCrawler.data[i].gameId
                            });
                            this.pagination.totalItems = this.history.length;
                        }, 100)
                    } else {
                        this.history = []
                        this.pagination.totalItems = 0
                    }

                }
            }
        }
    }
}
</script>
<style scoped>
.Historyinput{
    padding:4px 6px;
    border:1px solid #384e63;
    border-radius:3px;
}
.elevation-1{
    margin-top:10px;float:left;width:100%;
}

</style>