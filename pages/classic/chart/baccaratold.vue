<template>
<div>
    {{chtable}} ==>> {{chlists}}
    <v-layout wrap>
        <v-flex v-show="chlists=='bs-First Digit' ">
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile">
                <!-- <div v-show="isFullscreen">
                    <span class="countBig text-white"></span>
                    <span class="countSmall text-white"></span>
                </div> -->
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tablebsFirst">
                        <tr v-for="tr in rowTable" :key="tr">
                            <td v-for="td in 500" :key="td" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>
        <v-flex v-show="chlists=='bs-Last Digit' ">
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile">
                <!-- <div v-show="isFullscreen">
                    <span class="countBig text-white"></span>
                    <span class="countSmall text-white"></span>
                </div> -->
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tablebsLast">
                        <tr v-for="tr in rowTable" :key="tr">
                            <td v-for="td in 500" :key="td" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>

        <v-flex v-show="chlists=='bs-Both Digit' ">
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile">
                <!-- <div v-show="isFullscreen">
                    <span class="countBig text-white"></span>
                    <span class="countSmall text-white"></span>
                </div> -->
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tablebsBoth">
                        <tr v-for="tr in rowTable" :key="tr">
                            <td v-for="td in 500" :key="td" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>

        <v-flex v-show="chlists=='bs-Two Digit' ">
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile">
                <!-- <div v-show="isFullscreen">
                    <span class="countBig text-white"></span>
                    <span class="countSmall text-white"></span>
                </div> -->
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tablebsTwo">
                        <tr v-for="tr in rowTable" :key="tr">
                            <td v-for="td in 500" :key="td" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>

        <v-flex v-show="chlists=='oe-First Digit' ">
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile">
                <!-- <div v-show="isFullscreen">
                    <span class="countOdd text-white"></span>
                    <span class="countEven text-white"></span>
                </div> -->
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tableOEFirst">
                        <tr v-for="tr in rowTable" :key="tr">
                            <td v-for="td in 300" :key="td" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>
        <v-flex v-show="chlists=='oe-Last Digit' ">
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile">
                <!-- <div v-show="isFullscreen">
                    <span class="countOdd text-white"></span>
                    <span class="countEven text-white"></span>
                </div> -->
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tableOELast">
                        <tr v-for="tr in rowTable" :key="tr">
                            <td v-for="td in 300" :key="td" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>
        <v-flex v-show="chlists=='oe-Both Digit' ">
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile">
                <!-- <div v-show="isFullscreen">
                    <span class="countOdd text-white"></span>
                    <span class="countEven text-white"></span>
                </div> -->
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tableOEBoth">
                        <tr v-for="tr in rowTable" :key="tr">
                            <td v-for="td in 300" :key="td" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>
        <v-flex v-show="chlists=='oe-Two Digit' ">
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile">
                <!-- <div v-show="isFullscreen">
                    <span class="countOdd text-white"></span>
                    <span class="countEven text-white"></span>
                </div> -->
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tableOETwo">
                        <tr v-for="tr in rowTable" :key="tr">
                            <td v-for="td in 300" :key="td" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>
        <v-flex v-show="chlists=='hml-First Digit' ">
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile">
                <!-- <div v-show="isFullscreen">
                    <span class="countUpper text-white"></span>
                    <span class="countMiddle text-white"></span>
                    <span class="countLower text-white"></span>
                </div> -->
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tablebUMLFirst">
                        <tr v-for="tr in rowTable" :key="tr">
                            <td v-for="td in 900" :key="td" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>
        <v-flex v-show="chlists=='hml-Last Digit' ">
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile">
                <!-- <div v-show="isFullscreen">
                    <span class="countUpper text-white"></span>
                    <span class="countMiddle text-white"></span>
                    <span class="countLower text-white"></span>
                </div> -->
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tablebUMLLast">
                        <tr v-for="tr in rowTable" :key="tr">
                            <td v-for="td in 900" :key="td" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>
        <v-flex v-show="chlists=='hml-Both Digit' ">
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile">
                <!-- <div v-show="isFullscreen">
                    <span class="countUpper text-white"></span>
                    <span class="countMiddle text-white"></span>
                    <span class="countLower text-white"></span>
                </div> -->
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tablebUMLBoth">
                        <tr v-for="tr in rowTable" :key="tr">
                            <td v-for="td in 900" :key="td" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>
        <v-flex v-show="chlists=='hml-Two Digit' ">
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile">
                <!-- <div v-show="isFullscreen">
                    <span class="countUpper text-white"></span>
                    <span class="countMiddle text-white"></span>
                    <span class="countLower text-white"></span>
                </div> -->
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tablebUMLTwo">
                        <tr v-for="tr in rowTable" :key="tr">
                            <td v-for="td in 900" :key="td" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>
        <v-flex v-show="chlists=='sn-First Digit' ">
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile">
                <!-- <div v-show="isFullscreen" ref="sortNumber">
                    <span class="text-white"></span>
                    <span class="text-white"></span>
                    <span class="text-white"></span>
                    <span class="text-white"></span>
                    <span class="text-white"></span>
                    <span class="text-white"></span>
                </div> -->
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tableNumberFirst">
                        <tr v-for="tr in rowTable" :key="tr">
                            <td v-for="td in 100" :key="td" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>
        <v-flex v-show="chlists=='sn-Last Digit' ">
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile">
                <!-- <div v-show="isFullscreen" ref="sortNumber">
                    <span class="text-white"></span>
                    <span class="text-white"></span>
                    <span class="text-white"></span>
                    <span class="text-white"></span>
                    <span class="text-white"></span>
                    <span class="text-white"></span>
                </div> -->
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tableNumberLast">
                        <tr v-for="tr in rowTable" :key="tr">
                            <td v-for="td in 100" :key="td" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>
        <v-flex v-show="chlists=='sn-Both Digit' ">
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile">
                <!-- <div v-show="isFullscreen" ref="sortNumber">
                    <span class="text-white"></span>
                    <span class="text-white"></span>
                    <span class="text-white"></span>
                    <span class="text-white"></span>
                    <span class="text-white"></span>
                    <span class="text-white"></span>
                </div> -->
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tableNumberBoth">
                        <tr v-for="tr in rowTable" :key="tr">
                            <td v-for="td in 100" :key="td" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>
        <v-flex v-show="chlists=='sn-Two Digit' ">
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile">
                <!-- <div v-show="isFullscreen" ref="sortNumber">
                    <span class="text-white"></span>
                    <span class="text-white"></span>
                    <span class="text-white"></span>
                    <span class="text-white"></span>
                    <span class="text-white"></span>
                    <span class="text-white"></span>
                </div> -->
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tableNumberTwo">
                        <tr v-for="tr in rowTable" :key="tr">
                            <td v-for="td in 100" :key="td" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>
    </v-layout>
</div>
</template>

<script>
export default {
    props: {
        rowTable: {
            type: Number,
            default: 6
        },
        chtable: String,
        chlists: String,
        isFullscreen: Boolean
    },
    data() {
        return {
            url: "",
            trentFirst: [],
            trentLast: [],
            trentBoth: [],
            trentTwo: [],

            trentOEFirst: [],
            trentOELast: [],
            trentOEBoth: [],
            trentOETwo: [],

            trentUMLFirst: [],
            trentUMLLast: [],
            trentUMLBoth: [],
            trentUMLTwo: [],

            trentNumberFirst: [],
            trentNumberLast: [],
            trentNumberBoth: [],
            trentNumberTwo: [],

            gameID: [],
            is_show_bs: true,
            is_show_oe: true,
            is_show_hml: true,
            is_show_num: true
        };
    },
    mounted() {
        this.getTableChartBS();
        // this.autoScroll();

    },
    watch: {
        chlist() {
            this.getTableChartBS();

        },
        // tbdatachart() {
        //   this.number =
        //     this.tbdatachart[this.tbdatachart.length - 2] +
        //     "" +
        //     this.tbdatachart[this.tbdatachart.length - 1];

        //   let d = this.lastGameID + "\n" + this.tbdatachart + "\n" + this.timeGame;
        //   this.addNew(this.number, d);
        // }
    },
    methods: {
        clearTrendMap() {
            this.trentFirst = [];
            this.trentLast = [];
            this.trentBoth = [];
            this.trentTwo = [];
            this.trentOEFirst = [];
            this.trentOELast = [];
            this.trentOEBoth = [];
            this.trentOETwo = [];
            this.trentUMLFirst = [];
            this.trentUMLLast = [];
            this.trentUMLBoth = [];
            this.trentUMLTwo = [];
            this.trentNumberFirst = [];
            this.trentNumberLast = [];
            this.trentNumberBoth = [];
            this.trentNumberTwo = [];

            //bs
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 500; j++) {
                    this.$refs.tablebsFirst.children[i].children[j].textContent = "";
                    this.$refs.tablebsFirst.children[i].children[j].className = "";
                }
            }
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 500; j++) {
                    this.$refs.tablebsLast.children[i].children[j].textContent = "";
                    this.$refs.tablebsLast.children[i].children[j].className = "";
                }
            }
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 500; j++) {
                    this.$refs.tablebsBoth.children[i].children[j].textContent = "";
                    this.$refs.tablebsBoth.children[i].children[j].className = "";
                }
            }
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 500; j++) {
                    this.$refs.tablebsTwo.children[i].children[j].textContent = "";
                    this.$refs.tablebsTwo.children[i].children[j].className = "";
                }
            }
            //oe
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 300; j++) {
                    this.$refs.tableOEFirst.children[i].children[j].textContent = "";
                    this.$refs.tableOEFirst.children[i].children[j].className = "";
                }
            }
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 300; j++) {
                    this.$refs.tableOELast.children[i].children[j].textContent = "";
                    this.$refs.tableOELast.children[i].children[j].className = "";
                }
            }
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 300; j++) {
                    this.$refs.tableOEBoth.children[i].children[j].textContent = "";
                    this.$refs.tableOEBoth.children[i].children[j].className = "";
                }
            }
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 300; j++) {
                    this.$refs.tableOETwo.children[i].children[j].textContent = "";
                    this.$refs.tableOETwo.children[i].children[j].className = "";
                }
            }

            //uml
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 900; j++) {
                    this.$refs.tablebUMLFirst.children[i].children[j].textContent = "";
                    this.$refs.tablebUMLFirst.children[i].children[j].className = "";
                }
            }
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 900; j++) {
                    this.$refs.tablebUMLLast.children[i].children[j].textContent = "";
                    this.$refs.tablebUMLLast.children[i].children[j].className = "";
                }
            }
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 900; j++) {
                    this.$refs.tablebUMLBoth.children[i].children[j].textContent = "";
                    this.$refs.tablebUMLBoth.children[i].children[j].className = "";
                }
            }
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 900; j++) {
                    this.$refs.tablebUMLTwo.children[i].children[j].textContent = "";
                    this.$refs.tablebUMLTwo.children[i].children[j].className = "";
                }
            }
            //number
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 100; j++) {
                    this.$refs.tableNumberFirst.children[i].children[j].textContent = "";
                    this.$refs.tableNumberFirst.children[i].children[j].className = "";
                }
            }
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 100; j++) {
                    this.$refs.tableNumberLast.children[i].children[j].textContent = "";
                    this.$refs.tableNumberLast.children[i].children[j].className = "";
                }
            }
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 100; j++) {
                    this.$refs.tableNumberBoth.children[i].children[j].textContent = "";
                    this.$refs.tableNumberBoth.children[i].children[j].className = "";
                }
            }
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 100; j++) {
                    this.$refs.tableNumberTwo.children[i].children[j].textContent = "";
                    this.$refs.tableNumberTwo.children[i].children[j].className = "";
                }
            }
        },
        // changeChartType(value) {
        //   this.chlist = value;
        //   this.clearTrendMap();
        //   this.getTableChartBS();
        // },
        autoScroll() {
            let _this = this;
            setTimeout(function () {
                let lop =
                    $(".my-coltabledivlast")
                    .first()
                    .width() - 30;
                let valuebs = $(_this.$refs.tablebsTwo).find(".mystylelast")[0].offsetLeft;
                let valueoe = $(_this.$refs.tableOETwo).find(".oestylelast")[0].offsetLeft;
                let valueuml = $(_this.$refs.tablebUMLTwo).find(".umlstylelast")[0].offsetLeft;
                let valuenum = $(_this.$refs.tableNumberTwo).find(".numScroll")[0].offsetLeft;
                $(_this.$refs.tablebsTwo).scrollLeft(valuebs - lop);
                $(_this.$refs.tableOETwo).scrollLeft(valueoe - lop);
                $(_this.$refs.tablebUMLTwo).scrollLeft(valueuml - lop);
                $(_this.$refs.tableNumberTwo).scrollLeft(valuenum - lop);
            }, 1000);
        },
        // sleep(milliseconds) {
        //   return new Promise(resolve => setTimeout(resolve, milliseconds));
        // },
        getTableChartBS() {
            this.clearTrendMap();
            this.apis = "http://159.138.54.214/api/datahistory/BTCUSDT1";
            this.$axios(this.apis).then(response => {

                let n = 0;
                response.data.forEach(element => {
                    n++;
                    this.gameID.push(element.gameid + "\n" + element.PT + "\n" + element.created_at);

                    if (this.chtable == "bs") {
                        //bigsmall
                        // if (this.chlists == "bs-First Digit") {
                        let rs1 = element.PT[element.PT.length - 2].toString();
                        let firstlast1 = parseInt(rs1);

                        if (firstlast1 < 5) {
                            this.trentFirst.push(0);
                        } else {
                            this.trentFirst.push(1);
                        }
                        // } else if (this.chlists == "bs-Last Digit") {

                        let rs2 = element.PT[element.PT.length - 1].toString();
                        let firstlast2 = parseInt(rs2);
                        if (firstlast2 < 5) {
                            this.trentLast.push(0);
                        } else {
                            this.trentLast.push(1);
                        }
                        // } else if (this.chlists == "bs-Both Digit") {
                        let rs3 = parseInt(element.PT[element.PT.length - 2]) + parseInt(element.PT[element.PT.length - 1]);
                        let firstlast3 = parseInt(rs3);
                        if (firstlast3 < 9) {
                            this.trentBoth.push(0);
                        } else {
                            this.trentBoth.push(1);
                        }
                        // } else if (this.chlists == "bs-Two Digit") {
                        let rs4 = element.PT[element.PT.length - 2].toString() + element.PT[element.PT.length - 1].toString();
                        let firstlast4 = parseInt(rs4);
                        if (firstlast4 < 49) {
                            this.trentTwo.push(0);
                        } else {
                            this.trentTwo.push(1);
                        }
                        // }

                        if (n == response.data.length) {
                            this.tablechartBSFirst();
                            this.tablechartBSLast();
                            this.tablechartBSBoth();
                            this.tablechartBSTwo();
                            return;
                        }

                    } else if (this.chtable == "oe") {
                        // odd even
                        // if (this.chlists == "oe-First Digit") {
                        let rs1 = element.PT[element.PT.length - 2].toString();
                        let firstlast1 = parseInt(rs1);
                        this.trentOEFirst.push(firstlast1 % 2);
                        // } else if (this.chlists == "oe-Last Digit") {
                        let rs2 = element.PT[element.PT.length - 1].toString();
                        let firstlast2 = parseInt(rs2);
                        this.trentOELast.push(firstlast2 % 2);
                        // } else if (this.chlists == "oe-Both Digit") {
                        let rs3 = parseInt(element.PT[element.PT.length - 2]) + parseInt(element.PT[element.PT.length - 1]);
                        let firstlast3 = parseInt(rs3);
                        this.trentOEBoth.push(firstlast3 % 2);
                        // } else if (this.chlists == "oe-Two Digit") {
                        let rs4 = element.PT[element.PT.length - 2].toString() + element.PT[element.PT.length - 1].toString();
                        let firstlast4 = parseInt(rs4);
                        this.trentOETwo.push(firstlast4 % 2);
                        // }

                        if (n == response.data.length) {
                            this.tablechartOEFirst();
                            this.tablechartOELast();
                            this.tablechartOEBoth();
                            this.tablechartOETwo();
                            return;
                        }

                    } else if (this.chtable == "hml") {
                        // hml
                        // if (this.chlists == "hml-First Digit") {
                        let rs1 = element.PT[element.PT.length - 2].toString();
                        let firstlast1 = parseInt(rs1);

                        if (firstlast1 >= 0 && firstlast1 <= 3) {
                            this.trentUMLFirst.push(0);
                        } else if (firstlast1 >= 4 && firstlast1 <= 6) {
                            this.trentUMLFirst.push(1);
                        } else if (firstlast1 >= 7 && firstlast1 <= 9) {
                            this.trentUMLFirst.push(2);
                        }
                        // } else if (this.chlists == "hml-Last Digit") {
                        let rs2 = element.PT[element.PT.length - 1].toString();
                        let firstlast2 = parseInt(rs2);
                        if (firstlast2 >= 0 && firstlast2 <= 3) {
                            this.trentUMLLast.push(0);
                        } else if (firstlast2 >= 4 && firstlast2 <= 6) {
                            this.trentUMLLast.push(1);
                        } else if (firstlast2 >= 7 && firstlast2 <= 9) {
                            this.trentUMLLast.push(2);
                        }
                        // } else if (this.chlists == "hml-Both Digit") {
                        let rs3 = parseInt(element.PT[element.PT.length - 2]) + parseInt(element.PT[element.PT.length - 1]);
                        let firstlast3 = parseInt(rs3);
                        if (firstlast3 >= 0 && firstlast3 <= 6) {
                            this.trentUMLBoth.push(0);
                        } else if (firstlast3 >= 7 && firstlast3 <= 12) {
                            this.trentUMLBoth.push(1);
                        } else if (firstlast3 >= 13 && firstlast3 <= 18) {
                            this.trentUMLBoth.push(2);
                        }
                        // } else if (this.chlists == "hml-Two Digit") {
                        let rs4 = element.PT[element.PT.length - 2].toString() + element.PT[element.PT.length - 1].toString();
                        let firstlast4 = parseInt(rs4);
                        if (firstlast4 >= 0 && firstlast4 <= 33) {
                            this.trentUMLTwo.push(0);
                        } else if (firstlast4 >= 34 && firstlast4 <= 66) {
                            this.trentUMLTwo.push(1);
                        } else if (firstlast4 >= 67 && firstlast4 <= 99) {
                            this.trentUMLTwo.push(2);
                        }
                        // }

                        if (n == response.data.length) {
                            this.tablechartUMLFirst();
                            this.tablechartUMLLast();
                            this.tablechartUMLBoth();
                            this.tablechartUMLTwo();
                            return;
                        }
                    } else if (this.chtable == "sn") {
                        // sn
                        // if (this.chlists == "sn-First Digit") {
                        let rs1 = element.PT[element.PT.length - 2].toString();
                        let firstlast1 = parseInt(rs1);

                        this.trentNumberFirst.push(firstlast1);
                        // } else if (this.chlists == "sn-Last Digit") {
                        let rs2 = element.PT[element.PT.length - 1].toString();
                        let firstlast2 = parseInt(rs2);
                        this.trentNumberLast.push(firstlast2);
                        // } else if (this.chlists == "sn-Both Digit") {
                        let rs3 = parseInt(element.PT[element.PT.length - 2]) + parseInt(element.PT[element.PT.length - 1]);
                        let firstlast3 = parseInt(rs3);
                        this.trentNumberBoth.push(firstlast3);
                        // } else if (this.chlists == "sn-Two Digit") {
                        let rs4 = element.PT[element.PT.length - 2].toString() + element.PT[element.PT.length - 1].toString();
                        let firstlast4 = parseInt(rs4);
                        this.trentNumberTwo.push(firstlast4);
                        // }

                        if (n == response.data.length) {
                            this.tablechartnumberFirst();
                            this.tablechartnumberLast();
                            this.tablechartnumberBoth();
                            this.tablechartnumberTwo();
                            return;
                        }
                    }

                });
            });
        },
        tablechartBSFirst() {
            let countBig = 0;
            let countSmall = 0;
            // console.log(this.$refs);
            // loop table[][]
            var s = -1;
            loop1: for (
                let j = 0; j < this.$refs.tablebsFirst.children[0].children.length; j++
            ) {
                // j = td tag
                loop2: for (
                    let i = 0; i < this.$refs.tablebsFirst.childElementCount; i++
                ) {
                    // auto scroll
                    //set classs to ref the last one
                    if (this.trentFirst.length == s) {
                        this.$refs.tablebsFirst.children[i].children[j].classList.add(
                            "mystylelast"
                        );
                        let lop =
                            $(".my-coltabledivlast")
                            .first()
                            .width() - 130;
                        let valuebs = $(this.$refs.tablebsFirst).find(".mystylelast")[0]
                            .offsetLeft;
                        $(this.$refs.tablebsFirst).scrollLeft(valuebs - lop);

                        // $(this.$refs.tablebsFirst)
                        //   .find(".mystylelast")[0]
                        //   .scrollIntoView({ inline: "end" });
                    }
                    // if loop all s it will render B&S and exit all loop
                    if (s == this.trentFirst.length) {
                        for (let i = 0; i < this.rowTable; i++) {
                            // tablebsFirst.children[i].children[""0""]
                            //console.log(this.$refs.tablebsFirst.children[i]);
                            for (let j = 0; j < 300; j++) {
                                if (
                                    this.$refs.tablebsFirst.children[i].children[j].textContent ===
                                    "1"
                                ) {
                                    countBig++;
                                    $(".countBig").text("Big" + " = " + countBig);
                                    this.$refs.tablebsFirst.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebsFirst.children[i].children[j].textContent =
                                        "B";
                                    this.$refs.tablebsFirst.children[i].children[j].classList.add(
                                        "rs1"
                                    );
                                } else if (
                                    this.$refs.tablebsFirst.children[i].children[j].textContent ===
                                    "0"
                                ) {
                                    countSmall++;
                                    $(".countSmall").text("Small" + " = " + countSmall);
                                    this.$refs.tablebsFirst.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebsFirst.children[i].children[j].classList.add(
                                        "rs0"
                                    );

                                    this.$refs.tablebsFirst.children[i].children[j].textContent =
                                        "S";
                                }
                            }
                        }
                        // $("#isshowtwotable").show()
                        return;
                    }
                    s++;

                    if (i == 0) {
                        // if its a first row it add not check
                        if (this.trentFirst.length !== s) {
                            this.$refs.tablebsFirst.children[i].cells[
                                j
                            ].textContent = this.trentFirst[s];

                            this.$refs.tablebsFirst.children[i].cells[j].title = this.gameID[s];
                            //gogogo
                        }
                    } else if (this.trentFirst[s] == this.trentFirst[s - 1]) {
                        // check is equal or not

                        //check the row it emtry or not if it emtry add
                        if (this.$refs.tablebsFirst.children[i].cells[j].textContent == "") {
                            this.$refs.tablebsFirst.children[i].cells[
                                j
                            ].textContent = this.trentFirst[s];

                            this.$refs.tablebsFirst.children[i].cells[j].title = this.gameID[s];

                            //gogogo
                        } else {
                            if (i - 1 == 0) {
                                //alert("here..........")
                                s--;
                                break;
                            }
                            // turn right if have other one in td tag
                            for (let ok = 1; ok < 20; ok++) {
                                if (
                                    this.trentFirst[s] ==
                                    this.$refs.tablebsFirst.children[i - 1].cells[j].textContent
                                ) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        if (index >= 2) {
                                            this.$refs.tablebsFirst.children[i - index].cells[
                                                j
                                            ].className = "line-t";
                                        }
                                        index--;
                                    }
                                    this.$refs.tablebsFirst.children[i - 1].cells[j].className =
                                        "line-l";
                                    this.$refs.tablebsFirst.children[i - 1].cells[
                                        j + ok
                                    ].className = "line-through";
                                    // end add Line
                                    this.$refs.tablebsFirst.children[i - 1].cells[
                                        j + ok
                                    ].textContent = this.trentFirst[s];
                                    this.$refs.tablebsFirst.children[i - 1].cells[
                                        j + ok
                                    ].title = this.gameID[s];

                                    //gogogo
                                    s++;
                                } else {
                                    s--;
                                    break;
                                }
                            }
                            break;
                        }
                        // turn right *-*
                        if (i == this.rowTable - 1) {
                            for (let k = 1; k < 50; k++) {
                                if (this.trentFirst[s] == this.trentFirst[s + 1]) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        this.$refs.tablebsFirst.children[i - index].cells[
                                            j
                                        ].className = "line-t";
                                        index--;
                                    }
                                    this.$refs.tablebsFirst.children[i].cells[j].className =
                                        "line-l";
                                    this.$refs.tablebsFirst.children[i].cells[j + k].className =
                                        "line-through";
                                    // end add Line
                                    this.$refs.tablebsFirst.children[i].cells[
                                        j + k
                                    ].textContent = this.trentFirst[s + 1];

                                    this.$refs.tablebsFirst.children[i].cells[
                                        j + k
                                    ].title = this.gameID[s + 1];
                                    //gogogo
                                    s++;
                                }
                            }
                        }
                    } else {
                        s--;
                        // console.log("breaking.....");
                        break loop2;
                    }
                }
            }
        },
        tablechartBSLast() {
            let countBig = 0;
            let countSmall = 0;
            // console.log(this.$refs);
            // loop table[][]
            var s = -1;
            loop1: for (
                let j = 0; j < this.$refs.tablebsLast.children[0].children.length; j++
            ) {
                // j = td tag
                loop2: for (
                    let i = 0; i < this.$refs.tablebsLast.childElementCount; i++
                ) {
                    // auto scroll
                    //set classs to ref the last one
                    if (this.trentLast.length == s) {
                        this.$refs.tablebsLast.children[i].children[j].classList.add(
                            "mystylelast"
                        );
                        let lop =
                            $(".my-coltabledivlast")
                            .first()
                            .width() - 130;
                        let valuebs = $(this.$refs.tablebsLast).find(".mystylelast")[0]
                            .offsetLeft;
                        $(this.$refs.tablebsLast).scrollLeft(valuebs - lop);

                        // $(this.$refs.tablebsLast)
                        //   .find(".mystylelast")[0]
                        //   .scrollIntoView({ inline: "end" });
                    }
                    // if loop all s it will render B&S and exit all loop
                    if (s == this.trentLast.length) {
                        for (let i = 0; i < this.rowTable; i++) {
                            // tablebsLast.children[i].children[""0""]
                            //console.log(this.$refs.tablebsLast.children[i]);
                            for (let j = 0; j < 300; j++) {
                                if (
                                    this.$refs.tablebsLast.children[i].children[j].textContent ===
                                    "1"
                                ) {
                                    countBig++;
                                    $(".countBig").text("Big" + " = " + countBig);
                                    this.$refs.tablebsLast.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebsLast.children[i].children[j].textContent =
                                        "B";
                                    this.$refs.tablebsLast.children[i].children[j].classList.add(
                                        "rs1"
                                    );
                                } else if (
                                    this.$refs.tablebsLast.children[i].children[j].textContent ===
                                    "0"
                                ) {
                                    countSmall++;
                                    $(".countSmall").text("Small" + " = " + countSmall);
                                    this.$refs.tablebsLast.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebsLast.children[i].children[j].classList.add(
                                        "rs0"
                                    );

                                    this.$refs.tablebsLast.children[i].children[j].textContent =
                                        "S";
                                }
                            }
                        }
                        // $("#isshowtwotable").show()
                        return;
                    }
                    s++;

                    if (i == 0) {
                        // if its a first row it add not check
                        if (this.trentLast.length !== s) {
                            this.$refs.tablebsLast.children[i].cells[
                                j
                            ].textContent = this.trentLast[s];

                            this.$refs.tablebsLast.children[i].cells[j].title = this.gameID[s];
                            //gogogo
                        }
                    } else if (this.trentLast[s] == this.trentLast[s - 1]) {
                        // check is equal or not

                        //check the row it emtry or not if it emtry add
                        if (this.$refs.tablebsLast.children[i].cells[j].textContent == "") {
                            this.$refs.tablebsLast.children[i].cells[
                                j
                            ].textContent = this.trentLast[s];

                            this.$refs.tablebsLast.children[i].cells[j].title = this.gameID[s];

                            //gogogo
                        } else {
                            if (i - 1 == 0) {
                                //alert("here..........")
                                s--;
                                break;
                            }
                            // turn right if have other one in td tag
                            for (let ok = 1; ok < 20; ok++) {
                                if (
                                    this.trentLast[s] ==
                                    this.$refs.tablebsLast.children[i - 1].cells[j].textContent
                                ) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        if (index >= 2) {
                                            this.$refs.tablebsLast.children[i - index].cells[
                                                j
                                            ].className = "line-t";
                                        }
                                        index--;
                                    }
                                    this.$refs.tablebsLast.children[i - 1].cells[j].className =
                                        "line-l";
                                    this.$refs.tablebsLast.children[i - 1].cells[
                                        j + ok
                                    ].className = "line-through";
                                    // end add Line
                                    this.$refs.tablebsLast.children[i - 1].cells[
                                        j + ok
                                    ].textContent = this.trentLast[s];
                                    this.$refs.tablebsLast.children[i - 1].cells[
                                        j + ok
                                    ].title = this.gameID[s];

                                    //gogogo
                                    s++;
                                } else {
                                    s--;
                                    break;
                                }
                            }
                            break;
                        }
                        // turn right *-*
                        if (i == this.rowTable - 1) {
                            for (let k = 1; k < 50; k++) {
                                if (this.trentLast[s] == this.trentLast[s + 1]) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        this.$refs.tablebsLast.children[i - index].cells[
                                            j
                                        ].className = "line-t";
                                        index--;
                                    }
                                    this.$refs.tablebsLast.children[i].cells[j].className =
                                        "line-l";
                                    this.$refs.tablebsLast.children[i].cells[j + k].className =
                                        "line-through";
                                    // end add Line
                                    this.$refs.tablebsLast.children[i].cells[
                                        j + k
                                    ].textContent = this.trentLast[s + 1];

                                    this.$refs.tablebsLast.children[i].cells[
                                        j + k
                                    ].title = this.gameID[s + 1];
                                    //gogogo
                                    s++;
                                }
                            }
                        }
                    } else {
                        s--;
                        // console.log("breaking.....");
                        break loop2;
                    }
                }
            }
        },
        tablechartBSBoth() {
            let countBig = 0;
            let countSmall = 0;
            // console.log(this.$refs);
            // loop table[][]
            var s = -1;
            loop1: for (
                let j = 0; j < this.$refs.tablebsBoth.children[0].children.length; j++
            ) {
                // j = td tag
                loop2: for (
                    let i = 0; i < this.$refs.tablebsBoth.childElementCount; i++
                ) {
                    // auto scroll
                    //set classs to ref the last one
                    if (this.trentBoth.length == s) {
                        this.$refs.tablebsBoth.children[i].children[j].classList.add(
                            "mystylelast"
                        );
                        let lop =
                            $(".my-coltabledivlast")
                            .first()
                            .width() - 130;
                        let valuebs = $(this.$refs.tablebsBoth).find(".mystylelast")[0]
                            .offsetLeft;
                        $(this.$refs.tablebsBoth).scrollLeft(valuebs - lop);

                        // $(this.$refs.tablebsBoth)
                        //   .find(".mystylelast")[0]
                        //   .scrollIntoView({ inline: "end" });
                    }
                    // if loop all s it will render B&S and exit all loop
                    if (s == this.trentBoth.length) {
                        for (let i = 0; i < this.rowTable; i++) {
                            // tablebsBoth.children[i].children[""0""]
                            //console.log(this.$refs.tablebsBoth.children[i]);
                            for (let j = 0; j < 300; j++) {
                                if (
                                    this.$refs.tablebsBoth.children[i].children[j].textContent ===
                                    "1"
                                ) {
                                    countBig++;
                                    $(".countBig").text("Big" + " = " + countBig);
                                    this.$refs.tablebsBoth.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebsBoth.children[i].children[j].textContent =
                                        "B";
                                    this.$refs.tablebsBoth.children[i].children[j].classList.add(
                                        "rs1"
                                    );
                                } else if (
                                    this.$refs.tablebsBoth.children[i].children[j].textContent ===
                                    "0"
                                ) {
                                    countSmall++;
                                    $(".countSmall").text("Small" + " = " + countSmall);
                                    this.$refs.tablebsBoth.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebsBoth.children[i].children[j].classList.add(
                                        "rs0"
                                    );

                                    this.$refs.tablebsBoth.children[i].children[j].textContent =
                                        "S";
                                }
                            }
                        }
                        // $("#isshowtwotable").show()
                        return;
                    }
                    s++;

                    if (i == 0) {
                        // if its a first row it add not check
                        if (this.trentBoth.length !== s) {
                            this.$refs.tablebsBoth.children[i].cells[
                                j
                            ].textContent = this.trentBoth[s];

                            this.$refs.tablebsBoth.children[i].cells[j].title = this.gameID[s];
                            //gogogo
                        }
                    } else if (this.trentBoth[s] == this.trentBoth[s - 1]) {
                        // check is equal or not

                        //check the row it emtry or not if it emtry add
                        if (this.$refs.tablebsBoth.children[i].cells[j].textContent == "") {
                            this.$refs.tablebsBoth.children[i].cells[
                                j
                            ].textContent = this.trentBoth[s];

                            this.$refs.tablebsBoth.children[i].cells[j].title = this.gameID[s];

                            //gogogo
                        } else {
                            if (i - 1 == 0) {
                                //alert("here..........")
                                s--;
                                break;
                            }
                            // turn right if have other one in td tag
                            for (let ok = 1; ok < 20; ok++) {
                                if (
                                    this.trentBoth[s] ==
                                    this.$refs.tablebsBoth.children[i - 1].cells[j].textContent
                                ) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        if (index >= 2) {
                                            this.$refs.tablebsBoth.children[i - index].cells[
                                                j
                                            ].className = "line-t";
                                        }
                                        index--;
                                    }
                                    this.$refs.tablebsBoth.children[i - 1].cells[j].className =
                                        "line-l";
                                    this.$refs.tablebsBoth.children[i - 1].cells[
                                        j + ok
                                    ].className = "line-through";
                                    // end add Line
                                    this.$refs.tablebsBoth.children[i - 1].cells[
                                        j + ok
                                    ].textContent = this.trentBoth[s];
                                    this.$refs.tablebsBoth.children[i - 1].cells[
                                        j + ok
                                    ].title = this.gameID[s];

                                    //gogogo
                                    s++;
                                } else {
                                    s--;
                                    break;
                                }
                            }
                            break;
                        }
                        // turn right *-*
                        if (i == this.rowTable - 1) {
                            for (let k = 1; k < 50; k++) {
                                if (this.trentBoth[s] == this.trentBoth[s + 1]) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        this.$refs.tablebsBoth.children[i - index].cells[
                                            j
                                        ].className = "line-t";
                                        index--;
                                    }
                                    this.$refs.tablebsBoth.children[i].cells[j].className =
                                        "line-l";
                                    this.$refs.tablebsBoth.children[i].cells[j + k].className =
                                        "line-through";
                                    // end add Line
                                    this.$refs.tablebsBoth.children[i].cells[
                                        j + k
                                    ].textContent = this.trentBoth[s + 1];

                                    this.$refs.tablebsBoth.children[i].cells[
                                        j + k
                                    ].title = this.gameID[s + 1];
                                    //gogogo
                                    s++;
                                }
                            }
                        }
                    } else {
                        s--;
                        // console.log("breaking.....");
                        break loop2;
                    }
                }
            }
        },
        tablechartBSTwo() {
            let countBig = 0;
            let countSmall = 0;
            // console.log(this.$refs);
            // loop table[][]
            var s = -1;
            loop1: for (
                let j = 0; j < this.$refs.tablebsTwo.children[0].children.length; j++
            ) {
                // j = td tag
                loop2: for (
                    let i = 0; i < this.$refs.tablebsTwo.childElementCount; i++
                ) {
                    // auto scroll
                    //set classs to ref the last one
                    if (this.trentTwo.length == s) {
                        this.$refs.tablebsTwo.children[i].children[j].classList.add(
                            "mystylelast"
                        );
                        let lop =
                            $(".my-coltabledivlast")
                            .first()
                            .width() - 130;
                        let valuebs = $(this.$refs.tablebsTwo).find(".mystylelast")[0]
                            .offsetLeft;
                        $(this.$refs.tablebsTwo).scrollLeft(valuebs - lop);

                        // $(this.$refs.tablebsTwo)
                        //   .find(".mystylelast")[0]
                        //   .scrollIntoView({ inline: "end" });
                    }
                    // if loop all s it will render B&S and exit all loop
                    if (s == this.trentTwo.length) {
                        for (let i = 0; i < this.rowTable; i++) {
                            // tablebsTwo.children[i].children[""0""]
                            //console.log(this.$refs.tablebsTwo.children[i]);
                            for (let j = 0; j < 300; j++) {
                                if (
                                    this.$refs.tablebsTwo.children[i].children[j].textContent ===
                                    "1"
                                ) {
                                    countBig++;
                                    $(".countBig").text("Big" + " = " + countBig);
                                    this.$refs.tablebsTwo.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebsTwo.children[i].children[j].textContent =
                                        "B";
                                    this.$refs.tablebsTwo.children[i].children[j].classList.add(
                                        "rs1"
                                    );
                                } else if (
                                    this.$refs.tablebsTwo.children[i].children[j].textContent ===
                                    "0"
                                ) {
                                    countSmall++;
                                    $(".countSmall").text("Small" + " = " + countSmall);
                                    this.$refs.tablebsTwo.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebsTwo.children[i].children[j].classList.add(
                                        "rs0"
                                    );

                                    this.$refs.tablebsTwo.children[i].children[j].textContent =
                                        "S";
                                }
                            }
                        }
                        // $("#isshowtwotable").show()
                        return;
                    }
                    s++;

                    if (i == 0) {
                        // if its a first row it add not check
                        if (this.trentTwo.length !== s) {
                            this.$refs.tablebsTwo.children[i].cells[
                                j
                            ].textContent = this.trentTwo[s];

                            this.$refs.tablebsTwo.children[i].cells[j].title = this.gameID[s];
                            //gogogo
                        }
                    } else if (this.trentTwo[s] == this.trentTwo[s - 1]) {
                        // check is equal or not

                        //check the row it emtry or not if it emtry add
                        if (this.$refs.tablebsTwo.children[i].cells[j].textContent == "") {
                            this.$refs.tablebsTwo.children[i].cells[
                                j
                            ].textContent = this.trentTwo[s];

                            this.$refs.tablebsTwo.children[i].cells[j].title = this.gameID[s];

                            //gogogo
                        } else {
                            if (i - 1 == 0) {
                                //alert("here..........")
                                s--;
                                break;
                            }
                            // turn right if have other one in td tag
                            for (let ok = 1; ok < 20; ok++) {
                                if (
                                    this.trentTwo[s] ==
                                    this.$refs.tablebsTwo.children[i - 1].cells[j].textContent
                                ) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        if (index >= 2) {
                                            this.$refs.tablebsTwo.children[i - index].cells[
                                                j
                                            ].className = "line-t";
                                        }
                                        index--;
                                    }
                                    this.$refs.tablebsTwo.children[i - 1].cells[j].className =
                                        "line-l";
                                    this.$refs.tablebsTwo.children[i - 1].cells[
                                        j + ok
                                    ].className = "line-through";
                                    // end add Line
                                    this.$refs.tablebsTwo.children[i - 1].cells[
                                        j + ok
                                    ].textContent = this.trentTwo[s];
                                    this.$refs.tablebsTwo.children[i - 1].cells[
                                        j + ok
                                    ].title = this.gameID[s];

                                    //gogogo
                                    s++;
                                } else {
                                    s--;
                                    break;
                                }
                            }
                            break;
                        }
                        // turn right *-*
                        if (i == this.rowTable - 1) {
                            for (let k = 1; k < 50; k++) {
                                if (this.trentTwo[s] == this.trentTwo[s + 1]) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        this.$refs.tablebsTwo.children[i - index].cells[
                                            j
                                        ].className = "line-t";
                                        index--;
                                    }
                                    this.$refs.tablebsTwo.children[i].cells[j].className =
                                        "line-l";
                                    this.$refs.tablebsTwo.children[i].cells[j + k].className =
                                        "line-through";
                                    // end add Line
                                    this.$refs.tablebsTwo.children[i].cells[
                                        j + k
                                    ].textContent = this.trentTwo[s + 1];

                                    this.$refs.tablebsTwo.children[i].cells[
                                        j + k
                                    ].title = this.gameID[s + 1];
                                    //gogogo
                                    s++;
                                }
                            }
                        }
                    } else {
                        s--;
                        // console.log("breaking.....");
                        break loop2;
                    }
                }
            }
        },

        //odd even............................................................
        tablechartOEFirst() {
            let countOdd = 0;
            let countEven = 0;
            // loop table[][]
            var s = -1;
            loop1: for (
                let j = 0; j < this.$refs.tableOEFirst.children[0].children.length; j++
            ) {
                // j = td tag
                loop2: for (
                    let i = 0; i < this.$refs.tableOEFirst.childElementCount; i++
                ) {
                    // auto scroll
                    if (this.trentOEFirst.length == s) {
                        this.$refs.tableOEFirst.children[i].children[j].classList.add(
                            "oestylelast"
                        );
                        let lop =
                            $(".my-coltabledivlast")
                            .first()
                            .width() - 130;
                        let valueoe = $(this.$refs.tableOEFirst).find(".oestylelast")[0]
                            .offsetLeft;
                        $(this.$refs.tableOEFirst).scrollLeft(valueoe - lop);

                        // $(this.$refs.tableOEFirst)
                        //   .find(".oestylelast")[0]
                        //   .scrollIntoView({ inline: "end" });
                    }
                    // if loop all s it will render B&S and exit all loop
                    if (s == this.trentOEFirst.length) {
                        for (let i = 0; i < this.rowTable; i++) {
                            // tablebsTwo.children[i].children[""0""]
                            //console.log(this.$refs.tablebsTwo.children[i]);
                            for (let j = 0; j < 200; j++) {
                                if (
                                    this.$refs.tableOEFirst.children[i].children[j].textContent ===
                                    "1"
                                ) {
                                    countOdd++;
                                    $(".countOdd").text("Odd" + " = " + countOdd);
                                    this.$refs.tableOEFirst.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tableOEFirst.children[i].children[j].classList.add(
                                        "rs-o"
                                    );

                                    this.$refs.tableOEFirst.children[i].children[j].textContent =
                                        "O";
                                } else if (
                                    this.$refs.tableOEFirst.children[i].children[j].textContent ===
                                    "0"
                                ) {
                                    countEven++;
                                    $(".countEven").text("Even" + " = " + countEven);
                                    this.$refs.tableOEFirst.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tableOEFirst.children[i].children[j].classList.add(
                                        "rs-e"
                                    );

                                    this.$refs.tableOEFirst.children[i].children[j].textContent =
                                        "E";
                                }
                            }
                        }
                        // this.goOE();
                        return;
                    }
                    //i = tr tag
                    s++;
                    //console.log(`"i" + ${i}`);
                    //console.log(`[${i}][${j}] = ${this.trent[s]}`); /// very good i== <tr> j == <td>

                    if (i == 0) {
                        // if its a first row it add not check
                        if (this.trentOEFirst.length !== s) {
                            this.$refs.tableOEFirst.children[i].cells[
                                j
                            ].textContent = this.trentOEFirst[s];

                            this.$refs.tableOEFirst.children[i].cells[j].title = this.gameID[s];
                            //gogogo
                        }
                    } else if (this.trentOEFirst[s] == this.trentOEFirst[s - 1]) {
                        // check is equal or not

                        //check the row it emtry or not if it emtry add
                        if (this.$refs.tableOEFirst.children[i].cells[j].textContent == "") {
                            this.$refs.tableOEFirst.children[i].cells[
                                j
                            ].textContent = this.trentOEFirst[s];
                            this.$refs.tableOEFirst.children[i].cells[j].title = this.gameID[s];
                            //gogogo
                        } else {
                            if (i - 1 == 0) {
                                //alert("here..........")
                                s--;
                                break;
                            }
                            // turn right if have other one in td tag
                            for (let ok = 1; ok < 20; ok++) {
                                if (
                                    this.trentOEFirst[s] ==
                                    this.$refs.tableOEFirst.children[i - 1].cells[j].textContent
                                ) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        if (index >= 2) {
                                            this.$refs.tableOEFirst.children[i - index].cells[
                                                j
                                            ].className = "line-t";
                                        }
                                        index--;
                                    }
                                    this.$refs.tableOEFirst.children[i - 1].cells[j].className =
                                        "line-l";
                                    this.$refs.tableOEFirst.children[i - 1].cells[
                                        j + ok
                                    ].className = "line-through";
                                    // end add Line
                                    this.$refs.tableOEFirst.children[i - 1].cells[
                                        j + ok
                                    ].textContent = this.trentOEFirst[s];
                                    this.$refs.tableOEFirst.children[i - 1].cells[
                                        j + ok
                                    ].title = this.gameID[s];

                                    //gogogo
                                    s++;
                                } else {
                                    s--;
                                    break;
                                }
                            }
                            break;
                        }
                        // turn right *-*
                        if (i == this.rowTable - 1) {
                            for (let k = 1; k < 50; k++) {
                                if (this.trentOEFirst[s] == this.trentOEFirst[s + 1]) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        this.$refs.tableOEFirst.children[i - index].cells[
                                            j
                                        ].className = "line-t";
                                        index--;
                                    }
                                    this.$refs.tableOEFirst.children[i].cells[j].className =
                                        "line-l";
                                    this.$refs.tableOEFirst.children[i].cells[j + k].className =
                                        "line-through";
                                    // end add Line
                                    this.$refs.tableOEFirst.children[i].cells[
                                        j + k
                                    ].textContent = this.trentOEFirst[s + 1];

                                    this.$refs.tableOEFirst.children[i].cells[
                                        j + k
                                    ].title = this.gameID[s + 1];

                                    //gogogo
                                    s++;
                                }
                            }
                        }
                    } else {
                        s--;
                        // console.log("breaking.....");
                        break loop2;
                    }
                }
            }
        },
        tablechartOELast() {
            let countOdd = 0;
            let countEven = 0;
            // loop table[][]
            var s = -1;
            loop1: for (
                let j = 0; j < this.$refs.tableOELast.children[0].children.length; j++
            ) {
                // j = td tag
                loop2: for (
                    let i = 0; i < this.$refs.tableOELast.childElementCount; i++
                ) {
                    // auto scroll
                    if (this.trentOELast.length == s) {
                        this.$refs.tableOELast.children[i].children[j].classList.add(
                            "oestylelast"
                        );
                        let lop =
                            $(".my-coltabledivlast")
                            .first()
                            .width() - 130;
                        let valueoe = $(this.$refs.tableOELast).find(".oestylelast")[0]
                            .offsetLeft;
                        $(this.$refs.tableOELast).scrollLeft(valueoe - lop);

                        // $(this.$refs.tableOELast)
                        //   .find(".oestylelast")[0]
                        //   .scrollIntoView({ inline: "end" });
                    }
                    // if loop all s it will render B&S and exit all loop
                    if (s == this.trentOELast.length) {
                        for (let i = 0; i < this.rowTable; i++) {
                            // tablebsTwo.children[i].children[""0""]
                            //console.log(this.$refs.tablebsTwo.children[i]);
                            for (let j = 0; j < 200; j++) {
                                if (
                                    this.$refs.tableOELast.children[i].children[j].textContent ===
                                    "1"
                                ) {
                                    countOdd++;
                                    $(".countOdd").text("Odd" + " = " + countOdd);
                                    this.$refs.tableOELast.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tableOELast.children[i].children[j].classList.add(
                                        "rs-o"
                                    );

                                    this.$refs.tableOELast.children[i].children[j].textContent =
                                        "O";
                                } else if (
                                    this.$refs.tableOELast.children[i].children[j].textContent ===
                                    "0"
                                ) {
                                    countEven++;
                                    $(".countEven").text("Even" + " = " + countEven);
                                    this.$refs.tableOELast.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tableOELast.children[i].children[j].classList.add(
                                        "rs-e"
                                    );

                                    this.$refs.tableOELast.children[i].children[j].textContent =
                                        "E";
                                }
                            }
                        }
                        // this.goOE();
                        return;
                    }
                    //i = tr tag
                    s++;
                    //console.log(`"i" + ${i}`);
                    //console.log(`[${i}][${j}] = ${this.trent[s]}`); /// very good i== <tr> j == <td>

                    if (i == 0) {
                        // if its a first row it add not check
                        if (this.trentOELast.length !== s) {
                            this.$refs.tableOELast.children[i].cells[
                                j
                            ].textContent = this.trentOELast[s];

                            this.$refs.tableOELast.children[i].cells[j].title = this.gameID[s];
                            //gogogo
                        }
                    } else if (this.trentOELast[s] == this.trentOELast[s - 1]) {
                        // check is equal or not

                        //check the row it emtry or not if it emtry add
                        if (this.$refs.tableOELast.children[i].cells[j].textContent == "") {
                            this.$refs.tableOELast.children[i].cells[
                                j
                            ].textContent = this.trentOELast[s];
                            this.$refs.tableOELast.children[i].cells[j].title = this.gameID[s];
                            //gogogo
                        } else {
                            if (i - 1 == 0) {
                                //alert("here..........")
                                s--;
                                break;
                            }
                            // turn right if have other one in td tag
                            for (let ok = 1; ok < 20; ok++) {
                                if (
                                    this.trentOELast[s] ==
                                    this.$refs.tableOELast.children[i - 1].cells[j].textContent
                                ) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        if (index >= 2) {
                                            this.$refs.tableOELast.children[i - index].cells[
                                                j
                                            ].className = "line-t";
                                        }
                                        index--;
                                    }
                                    this.$refs.tableOELast.children[i - 1].cells[j].className =
                                        "line-l";
                                    this.$refs.tableOELast.children[i - 1].cells[
                                        j + ok
                                    ].className = "line-through";
                                    // end add Line
                                    this.$refs.tableOELast.children[i - 1].cells[
                                        j + ok
                                    ].textContent = this.trentOELast[s];
                                    this.$refs.tableOELast.children[i - 1].cells[
                                        j + ok
                                    ].title = this.gameID[s];

                                    //gogogo
                                    s++;
                                } else {
                                    s--;
                                    break;
                                }
                            }
                            break;
                        }
                        // turn right *-*
                        if (i == this.rowTable - 1) {
                            for (let k = 1; k < 50; k++) {
                                if (this.trentOELast[s] == this.trentOELast[s + 1]) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        this.$refs.tableOELast.children[i - index].cells[
                                            j
                                        ].className = "line-t";
                                        index--;
                                    }
                                    this.$refs.tableOELast.children[i].cells[j].className =
                                        "line-l";
                                    this.$refs.tableOELast.children[i].cells[j + k].className =
                                        "line-through";
                                    // end add Line
                                    this.$refs.tableOELast.children[i].cells[
                                        j + k
                                    ].textContent = this.trentOELast[s + 1];

                                    this.$refs.tableOELast.children[i].cells[
                                        j + k
                                    ].title = this.gameID[s + 1];

                                    //gogogo
                                    s++;
                                }
                            }
                        }
                    } else {
                        s--;
                        // console.log("breaking.....");
                        break loop2;
                    }
                }
            }
        },
        tablechartOEBoth() {
            let countOdd = 0;
            let countEven = 0;
            // loop table[][]
            var s = -1;
            loop1: for (
                let j = 0; j < this.$refs.tableOEBoth.children[0].children.length; j++
            ) {
                // j = td tag
                loop2: for (
                    let i = 0; i < this.$refs.tableOEBoth.childElementCount; i++
                ) {
                    // auto scroll
                    if (this.trentOEBoth.length == s) {
                        this.$refs.tableOEBoth.children[i].children[j].classList.add(
                            "oestylelast"
                        );
                        let lop =
                            $(".my-coltabledivlast")
                            .first()
                            .width() - 130;
                        let valueoe = $(this.$refs.tableOEBoth).find(".oestylelast")[0]
                            .offsetLeft;
                        $(this.$refs.tableOEBoth).scrollLeft(valueoe - lop);

                        // $(this.$refs.tableOEBoth)
                        //   .find(".oestylelast")[0]
                        //   .scrollIntoView({ inline: "end" });
                    }
                    // if loop all s it will render B&S and exit all loop
                    if (s == this.trentOEBoth.length) {
                        for (let i = 0; i < this.rowTable; i++) {
                            // tablebsTwo.children[i].children[""0""]
                            //console.log(this.$refs.tablebsTwo.children[i]);
                            for (let j = 0; j < 200; j++) {
                                if (
                                    this.$refs.tableOEBoth.children[i].children[j].textContent ===
                                    "1"
                                ) {
                                    countOdd++;
                                    $(".countOdd").text("Odd" + " = " + countOdd);
                                    this.$refs.tableOEBoth.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tableOEBoth.children[i].children[j].classList.add(
                                        "rs-o"
                                    );

                                    this.$refs.tableOEBoth.children[i].children[j].textContent =
                                        "O";
                                } else if (
                                    this.$refs.tableOEBoth.children[i].children[j].textContent ===
                                    "0"
                                ) {
                                    countEven++;
                                    $(".countEven").text("Even" + " = " + countEven);
                                    this.$refs.tableOEBoth.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tableOEBoth.children[i].children[j].classList.add(
                                        "rs-e"
                                    );

                                    this.$refs.tableOEBoth.children[i].children[j].textContent =
                                        "E";
                                }
                            }
                        }
                        // this.goOE();
                        return;
                    }
                    //i = tr tag
                    s++;
                    //console.log(`"i" + ${i}`);
                    //console.log(`[${i}][${j}] = ${this.trent[s]}`); /// very good i== <tr> j == <td>

                    if (i == 0) {
                        // if its a first row it add not check
                        if (this.trentOEBoth.length !== s) {
                            this.$refs.tableOEBoth.children[i].cells[
                                j
                            ].textContent = this.trentOEBoth[s];

                            this.$refs.tableOEBoth.children[i].cells[j].title = this.gameID[s];
                            //gogogo
                        }
                    } else if (this.trentOEBoth[s] == this.trentOEBoth[s - 1]) {
                        // check is equal or not

                        //check the row it emtry or not if it emtry add
                        if (this.$refs.tableOEBoth.children[i].cells[j].textContent == "") {
                            this.$refs.tableOEBoth.children[i].cells[
                                j
                            ].textContent = this.trentOEBoth[s];
                            this.$refs.tableOEBoth.children[i].cells[j].title = this.gameID[s];
                            //gogogo
                        } else {
                            if (i - 1 == 0) {
                                //alert("here..........")
                                s--;
                                break;
                            }
                            // turn right if have other one in td tag
                            for (let ok = 1; ok < 20; ok++) {
                                if (
                                    this.trentOEBoth[s] ==
                                    this.$refs.tableOEBoth.children[i - 1].cells[j].textContent
                                ) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        if (index >= 2) {
                                            this.$refs.tableOEBoth.children[i - index].cells[
                                                j
                                            ].className = "line-t";
                                        }
                                        index--;
                                    }
                                    this.$refs.tableOEBoth.children[i - 1].cells[j].className =
                                        "line-l";
                                    this.$refs.tableOEBoth.children[i - 1].cells[
                                        j + ok
                                    ].className = "line-through";
                                    // end add Line
                                    this.$refs.tableOEBoth.children[i - 1].cells[
                                        j + ok
                                    ].textContent = this.trentOEBoth[s];
                                    this.$refs.tableOEBoth.children[i - 1].cells[
                                        j + ok
                                    ].title = this.gameID[s];

                                    //gogogo
                                    s++;
                                } else {
                                    s--;
                                    break;
                                }
                            }
                            break;
                        }
                        // turn right *-*
                        if (i == this.rowTable - 1) {
                            for (let k = 1; k < 50; k++) {
                                if (this.trentOEBoth[s] == this.trentOEBoth[s + 1]) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        this.$refs.tableOEBoth.children[i - index].cells[
                                            j
                                        ].className = "line-t";
                                        index--;
                                    }
                                    this.$refs.tableOEBoth.children[i].cells[j].className =
                                        "line-l";
                                    this.$refs.tableOEBoth.children[i].cells[j + k].className =
                                        "line-through";
                                    // end add Line
                                    this.$refs.tableOEBoth.children[i].cells[
                                        j + k
                                    ].textContent = this.trentOEBoth[s + 1];

                                    this.$refs.tableOEBoth.children[i].cells[
                                        j + k
                                    ].title = this.gameID[s + 1];

                                    //gogogo
                                    s++;
                                }
                            }
                        }
                    } else {
                        s--;
                        // console.log("breaking.....");
                        break loop2;
                    }
                }
            }
        },
        tablechartOETwo() {
            let countOdd = 0;
            let countEven = 0;
            // loop table[][]
            var s = -1;
            loop1: for (
                let j = 0; j < this.$refs.tableOETwo.children[0].children.length; j++
            ) {
                // j = td tag
                loop2: for (
                    let i = 0; i < this.$refs.tableOETwo.childElementCount; i++
                ) {
                    // auto scroll
                    if (this.trentOETwo.length == s) {
                        this.$refs.tableOETwo.children[i].children[j].classList.add(
                            "oestylelast"
                        );
                        let lop =
                            $(".my-coltabledivlast")
                            .first()
                            .width() - 130;
                        let valueoe = $(this.$refs.tableOETwo).find(".oestylelast")[0]
                            .offsetLeft;
                        $(this.$refs.tableOETwo).scrollLeft(valueoe - lop);

                        // $(this.$refs.tableOETwo)
                        //   .find(".oestylelast")[0]
                        //   .scrollIntoView({ inline: "end" });
                    }
                    // if loop all s it will render B&S and exit all loop
                    if (s == this.trentOETwo.length) {
                        for (let i = 0; i < this.rowTable; i++) {
                            // tablebsTwo.children[i].children[""0""]
                            //console.log(this.$refs.tablebsTwo.children[i]);
                            for (let j = 0; j < 200; j++) {
                                if (
                                    this.$refs.tableOETwo.children[i].children[j].textContent ===
                                    "1"
                                ) {
                                    countOdd++;
                                    $(".countOdd").text("Odd" + " = " + countOdd);
                                    this.$refs.tableOETwo.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tableOETwo.children[i].children[j].classList.add(
                                        "rs-o"
                                    );

                                    this.$refs.tableOETwo.children[i].children[j].textContent =
                                        "O";
                                } else if (
                                    this.$refs.tableOETwo.children[i].children[j].textContent ===
                                    "0"
                                ) {
                                    countEven++;
                                    $(".countEven").text("Even" + " = " + countEven);
                                    this.$refs.tableOETwo.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tableOETwo.children[i].children[j].classList.add(
                                        "rs-e"
                                    );

                                    this.$refs.tableOETwo.children[i].children[j].textContent =
                                        "E";
                                }
                            }
                        }
                        // this.goOE();
                        return;
                    }
                    //i = tr tag
                    s++;
                    //console.log(`"i" + ${i}`);
                    //console.log(`[${i}][${j}] = ${this.trent[s]}`); /// very good i== <tr> j == <td>

                    if (i == 0) {
                        // if its a first row it add not check
                        if (this.trentOETwo.length !== s) {
                            this.$refs.tableOETwo.children[i].cells[
                                j
                            ].textContent = this.trentOETwo[s];

                            this.$refs.tableOETwo.children[i].cells[j].title = this.gameID[s];
                            //gogogo
                        }
                    } else if (this.trentOETwo[s] == this.trentOETwo[s - 1]) {
                        // check is equal or not

                        //check the row it emtry or not if it emtry add
                        if (this.$refs.tableOETwo.children[i].cells[j].textContent == "") {
                            this.$refs.tableOETwo.children[i].cells[
                                j
                            ].textContent = this.trentOETwo[s];
                            this.$refs.tableOETwo.children[i].cells[j].title = this.gameID[s];
                            //gogogo
                        } else {
                            if (i - 1 == 0) {
                                //alert("here..........")
                                s--;
                                break;
                            }
                            // turn right if have other one in td tag
                            for (let ok = 1; ok < 20; ok++) {
                                if (
                                    this.trentOETwo[s] ==
                                    this.$refs.tableOETwo.children[i - 1].cells[j].textContent
                                ) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        if (index >= 2) {
                                            this.$refs.tableOETwo.children[i - index].cells[
                                                j
                                            ].className = "line-t";
                                        }
                                        index--;
                                    }
                                    this.$refs.tableOETwo.children[i - 1].cells[j].className =
                                        "line-l";
                                    this.$refs.tableOETwo.children[i - 1].cells[
                                        j + ok
                                    ].className = "line-through";
                                    // end add Line
                                    this.$refs.tableOETwo.children[i - 1].cells[
                                        j + ok
                                    ].textContent = this.trentOETwo[s];
                                    this.$refs.tableOETwo.children[i - 1].cells[
                                        j + ok
                                    ].title = this.gameID[s];

                                    //gogogo
                                    s++;
                                } else {
                                    s--;
                                    break;
                                }
                            }
                            break;
                        }
                        // turn right *-*
                        if (i == this.rowTable - 1) {
                            for (let k = 1; k < 50; k++) {
                                if (this.trentOETwo[s] == this.trentOETwo[s + 1]) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        this.$refs.tableOETwo.children[i - index].cells[
                                            j
                                        ].className = "line-t";
                                        index--;
                                    }
                                    this.$refs.tableOETwo.children[i].cells[j].className =
                                        "line-l";
                                    this.$refs.tableOETwo.children[i].cells[j + k].className =
                                        "line-through";
                                    // end add Line
                                    this.$refs.tableOETwo.children[i].cells[
                                        j + k
                                    ].textContent = this.trentOETwo[s + 1];

                                    this.$refs.tableOETwo.children[i].cells[
                                        j + k
                                    ].title = this.gameID[s + 1];

                                    //gogogo
                                    s++;
                                }
                            }
                        }
                    } else {
                        s--;
                        // console.log("breaking.....");
                        break loop2;
                    }
                }
            }
        },

        //high middle low............................................................
        tablechartUMLFirst() {
            let countUpper = 0;
            let countMiddle = 0;
            let countLower = 0;
            var s = -1;
            loop1: for (
                let j = 0; j < this.$refs.tablebUMLFirst.children[0].children.length; j++
            ) {
                // j = td tag
                loop2: for (
                    let i = 0; i < this.$refs.tablebUMLFirst.childElementCount; i++
                ) {
                    // auto scroll
                    if (this.trentUMLFirst.length == s) {
                        this.$refs.tablebUMLFirst.children[i].children[j].classList.add(
                            "umlstylelast"
                        );
                        let lop =
                            $(".my-coltabledivlast")
                            .first()
                            .width() - 130;
                        let valueuml = $(this.$refs.tablebUMLFirst).find(".umlstylelast")[0]
                            .offsetLeft;
                        $(this.$refs.tablebUMLFirst).scrollLeft(valueuml - lop);

                        // $(this.$refs.tablebUMLFirst)
                        //   .find(".umlstylelast")[0]
                        //   .scrollIntoView({ inline: "end" });
                    }
                    // if loop all s it will render B&S and exit all loop
                    if (s == this.trentUMLFirst.length) {
                        for (let i = 0; i < this.rowTable; i++) {
                            for (let j = 0; j < 900; j++) {
                                if (
                                    this.$refs.tablebUMLFirst.children[i].children[j]
                                    .textContent === "2"
                                ) {
                                    countUpper++;
                                    $(".countUpper").text("Upper" + " = " + countUpper);
                                    this.$refs.tablebUMLFirst.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebUMLFirst.children[i].children[j].classList.add(
                                        "rs-u"
                                    );

                                    this.$refs.tablebUMLFirst.children[i].children[j].textContent =
                                        "U";
                                } else if (
                                    this.$refs.tablebUMLFirst.children[i].children[j]
                                    .textContent === "1"
                                ) {
                                    countMiddle++;
                                    $(".countMiddle").text("middle" + " = " + countMiddle);
                                    this.$refs.tablebUMLFirst.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebUMLFirst.children[i].children[j].classList.add(
                                        "rs-m"
                                    );

                                    this.$refs.tablebUMLFirst.children[i].children[j].textContent =
                                        "M";
                                } else if (
                                    this.$refs.tablebUMLFirst.children[i].children[j]
                                    .textContent === "0"
                                ) {
                                    countLower++;
                                    $(".countLower").text("lower" + " = " + countLower);
                                    this.$refs.tablebUMLFirst.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebUMLFirst.children[i].children[j].classList.add(
                                        "rs-l"
                                    );

                                    this.$refs.tablebUMLFirst.children[i].children[j].textContent =
                                        "L";
                                }
                            }
                        }
                        // this.goUML();
                        return;
                    }
                    //i = tr tag
                    s++;
                    /// very good i== <tr> j == <td>

                    if (i == 0) {
                        // if its a first row it add not check
                        if (this.trentUMLFirst.length !== s) {
                            this.$refs.tablebUMLFirst.children[i].cells[
                                j
                            ].textContent = this.trentUMLFirst[s];

                            this.$refs.tablebUMLFirst.children[i].cells[j].title = this.gameID[
                                s
                            ];
                        }
                    } else if (this.trentUMLFirst[s] == this.trentUMLFirst[s - 1]) {
                        // check is equal or not

                        //check the row it emtry or not if it emtry add
                        if (
                            this.$refs.tablebUMLFirst.children[i].cells[j].textContent == ""
                        ) {
                            this.$refs.tablebUMLFirst.children[i].cells[
                                j
                            ].textContent = this.trentUMLFirst[s];

                            this.$refs.tablebUMLFirst.children[i].cells[j].title = this.gameID[
                                s
                            ];
                            //gogogo
                        } else {
                            if (i - 1 == 0) {
                                s--;
                                break;
                            }
                            // turn right if have other one in td tag
                            for (let ok = 1; ok < 20; ok++) {
                                if (
                                    this.trentUMLFirst[s] ==
                                    this.$refs.tablebUMLFirst.children[i - 1].cells[j].textContent
                                ) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        if (index >= 2) {
                                            this.$refs.tablebUMLFirst.children[i - index].cells[
                                                j
                                            ].className = "line-t";
                                        }
                                        index--;
                                    }
                                    this.$refs.tablebUMLFirst.children[i - 1].cells[j].className =
                                        "line-l";
                                    this.$refs.tablebUMLFirst.children[i - 1].cells[
                                        j + ok
                                    ].className = "line-through";
                                    // end add Line
                                    this.$refs.tablebUMLFirst.children[i - 1].cells[
                                        j + ok
                                    ].textContent = this.trentUMLFirst[s];

                                    this.$refs.tablebUMLFirst.children[i - 1].cells[
                                        j + ok
                                    ].title = this.gameID[s];

                                    //gogogo
                                    s++;
                                } else {
                                    s--;
                                    break;
                                }
                            }
                            break;
                        }
                        // turn right *-*
                        if (i == this.rowTable - 1) {
                            for (let k = 1; k < 50; k++) {
                                if (this.trentUMLFirst[s] == this.trentUMLFirst[s + 1]) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        this.$refs.tablebUMLFirst.children[i - index].cells[
                                            j
                                        ].className = "line-t";
                                        index--;
                                    }
                                    this.$refs.tablebUMLFirst.children[i].cells[j].className =
                                        "line-l";
                                    this.$refs.tablebUMLFirst.children[i].cells[j + k].className =
                                        "line-through";
                                    // end add Line
                                    this.$refs.tablebUMLFirst.children[i].cells[
                                        j + k
                                    ].textContent = this.trentUMLFirst[s + 1];

                                    this.$refs.tablebUMLFirst.children[i].cells[
                                        j + k
                                    ].title = this.gameID[s + 1];
                                    //gogogo
                                    s++;
                                }
                            }
                        }
                    } else {
                        s--;
                        // console.log("breaking.....");
                        break loop2;
                    }
                }
            }
        },
        tablechartUMLLast() {
            let countUpper = 0;
            let countMiddle = 0;
            let countLower = 0;
            var s = -1;
            loop1: for (
                let j = 0; j < this.$refs.tablebUMLLast.children[0].children.length; j++
            ) {
                // j = td tag
                loop2: for (
                    let i = 0; i < this.$refs.tablebUMLLast.childElementCount; i++
                ) {
                    // auto scroll
                    if (this.trentUMLLast.length == s) {
                        this.$refs.tablebUMLLast.children[i].children[j].classList.add(
                            "umlstylelast"
                        );
                        let lop =
                            $(".my-coltabledivlast")
                            .first()
                            .width() - 130;
                        let valueuml = $(this.$refs.tablebUMLLast).find(".umlstylelast")[0]
                            .offsetLeft;
                        $(this.$refs.tablebUMLLast).scrollLeft(valueuml - lop);

                        // $(this.$refs.tablebUMLLast)
                        //   .find(".umlstylelast")[0]
                        //   .scrollIntoView({ inline: "end" });
                    }
                    // if loop all s it will render B&S and exit all loop
                    if (s == this.trentUMLLast.length) {
                        for (let i = 0; i < this.rowTable; i++) {
                            for (let j = 0; j < 900; j++) {
                                if (
                                    this.$refs.tablebUMLLast.children[i].children[j]
                                    .textContent === "2"
                                ) {
                                    countUpper++;
                                    $(".countUpper").text("Upper" + " = " + countUpper);
                                    this.$refs.tablebUMLLast.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebUMLLast.children[i].children[j].classList.add(
                                        "rs-u"
                                    );

                                    this.$refs.tablebUMLLast.children[i].children[j].textContent =
                                        "U";
                                } else if (
                                    this.$refs.tablebUMLLast.children[i].children[j]
                                    .textContent === "1"
                                ) {
                                    countMiddle++;
                                    $(".countMiddle").text("middle" + " = " + countMiddle);
                                    this.$refs.tablebUMLLast.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebUMLLast.children[i].children[j].classList.add(
                                        "rs-m"
                                    );

                                    this.$refs.tablebUMLLast.children[i].children[j].textContent =
                                        "M";
                                } else if (
                                    this.$refs.tablebUMLLast.children[i].children[j]
                                    .textContent === "0"
                                ) {
                                    countLower++;
                                    $(".countLower").text("lower" + " = " + countLower);
                                    this.$refs.tablebUMLLast.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebUMLLast.children[i].children[j].classList.add(
                                        "rs-l"
                                    );

                                    this.$refs.tablebUMLLast.children[i].children[j].textContent =
                                        "L";
                                }
                            }
                        }
                        // this.goUML();
                        return;
                    }
                    //i = tr tag
                    s++;
                    /// very good i== <tr> j == <td>

                    if (i == 0) {
                        // if its a first row it add not check
                        if (this.trentUMLLast.length !== s) {
                            this.$refs.tablebUMLLast.children[i].cells[
                                j
                            ].textContent = this.trentUMLLast[s];

                            this.$refs.tablebUMLLast.children[i].cells[j].title = this.gameID[
                                s
                            ];
                        }
                    } else if (this.trentUMLLast[s] == this.trentUMLLast[s - 1]) {
                        // check is equal or not

                        //check the row it emtry or not if it emtry add
                        if (
                            this.$refs.tablebUMLLast.children[i].cells[j].textContent == ""
                        ) {
                            this.$refs.tablebUMLLast.children[i].cells[
                                j
                            ].textContent = this.trentUMLLast[s];

                            this.$refs.tablebUMLLast.children[i].cells[j].title = this.gameID[
                                s
                            ];
                            //gogogo
                        } else {
                            if (i - 1 == 0) {
                                s--;
                                break;
                            }
                            // turn right if have other one in td tag
                            for (let ok = 1; ok < 20; ok++) {
                                if (
                                    this.trentUMLLast[s] ==
                                    this.$refs.tablebUMLLast.children[i - 1].cells[j].textContent
                                ) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        if (index >= 2) {
                                            this.$refs.tablebUMLLast.children[i - index].cells[
                                                j
                                            ].className = "line-t";
                                        }
                                        index--;
                                    }
                                    this.$refs.tablebUMLLast.children[i - 1].cells[j].className =
                                        "line-l";
                                    this.$refs.tablebUMLLast.children[i - 1].cells[
                                        j + ok
                                    ].className = "line-through";
                                    // end add Line
                                    this.$refs.tablebUMLLast.children[i - 1].cells[
                                        j + ok
                                    ].textContent = this.trentUMLLast[s];

                                    this.$refs.tablebUMLLast.children[i - 1].cells[
                                        j + ok
                                    ].title = this.gameID[s];

                                    //gogogo
                                    s++;
                                } else {
                                    s--;
                                    break;
                                }
                            }
                            break;
                        }
                        // turn right *-*
                        if (i == this.rowTable - 1) {
                            for (let k = 1; k < 50; k++) {
                                if (this.trentUMLLast[s] == this.trentUMLLast[s + 1]) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        this.$refs.tablebUMLLast.children[i - index].cells[
                                            j
                                        ].className = "line-t";
                                        index--;
                                    }
                                    this.$refs.tablebUMLLast.children[i].cells[j].className =
                                        "line-l";
                                    this.$refs.tablebUMLLast.children[i].cells[j + k].className =
                                        "line-through";
                                    // end add Line
                                    this.$refs.tablebUMLLast.children[i].cells[
                                        j + k
                                    ].textContent = this.trentUMLLast[s + 1];

                                    this.$refs.tablebUMLLast.children[i].cells[
                                        j + k
                                    ].title = this.gameID[s + 1];
                                    //gogogo
                                    s++;
                                }
                            }
                        }
                    } else {
                        s--;
                        // console.log("breaking.....");
                        break loop2;
                    }
                }
            }
        },
        tablechartUMLBoth() {
            let countUpper = 0;
            let countMiddle = 0;
            let countLower = 0;
            var s = -1;
            loop1: for (
                let j = 0; j < this.$refs.tablebUMLBoth.children[0].children.length; j++
            ) {
                // j = td tag
                loop2: for (
                    let i = 0; i < this.$refs.tablebUMLBoth.childElementCount; i++
                ) {
                    // auto scroll
                    if (this.trentUMLBoth.length == s) {
                        this.$refs.tablebUMLBoth.children[i].children[j].classList.add(
                            "umlstylelast"
                        );
                        let lop =
                            $(".my-coltabledivlast")
                            .first()
                            .width() - 130;
                        let valueuml = $(this.$refs.tablebUMLBoth).find(".umlstylelast")[0]
                            .offsetLeft;
                        $(this.$refs.tablebUMLBoth).scrollLeft(valueuml - lop);

                        // $(this.$refs.tablebUMLBoth)
                        //   .find(".umlstylelast")[0]
                        //   .scrollIntoView({ inline: "end" });
                    }
                    // if loop all s it will render B&S and exit all loop
                    if (s == this.trentUMLBoth.length) {
                        for (let i = 0; i < this.rowTable; i++) {
                            for (let j = 0; j < 900; j++) {
                                if (
                                    this.$refs.tablebUMLBoth.children[i].children[j]
                                    .textContent === "2"
                                ) {
                                    countUpper++;
                                    $(".countUpper").text("Upper" + " = " + countUpper);
                                    this.$refs.tablebUMLBoth.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebUMLBoth.children[i].children[j].classList.add(
                                        "rs-u"
                                    );

                                    this.$refs.tablebUMLBoth.children[i].children[j].textContent =
                                        "U";
                                } else if (
                                    this.$refs.tablebUMLBoth.children[i].children[j]
                                    .textContent === "1"
                                ) {
                                    countMiddle++;
                                    $(".countMiddle").text("middle" + " = " + countMiddle);
                                    this.$refs.tablebUMLBoth.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebUMLBoth.children[i].children[j].classList.add(
                                        "rs-m"
                                    );

                                    this.$refs.tablebUMLBoth.children[i].children[j].textContent =
                                        "M";
                                } else if (
                                    this.$refs.tablebUMLBoth.children[i].children[j]
                                    .textContent === "0"
                                ) {
                                    countLower++;
                                    $(".countLower").text("lower" + " = " + countLower);
                                    this.$refs.tablebUMLBoth.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebUMLBoth.children[i].children[j].classList.add(
                                        "rs-l"
                                    );

                                    this.$refs.tablebUMLBoth.children[i].children[j].textContent =
                                        "L";
                                }
                            }
                        }
                        // this.goUML();
                        return;
                    }
                    //i = tr tag
                    s++;
                    /// very good i== <tr> j == <td>

                    if (i == 0) {
                        // if its a first row it add not check
                        if (this.trentUMLBoth.length !== s) {
                            this.$refs.tablebUMLBoth.children[i].cells[
                                j
                            ].textContent = this.trentUMLBoth[s];

                            this.$refs.tablebUMLBoth.children[i].cells[j].title = this.gameID[
                                s
                            ];
                        }
                    } else if (this.trentUMLBoth[s] == this.trentUMLBoth[s - 1]) {
                        // check is equal or not

                        //check the row it emtry or not if it emtry add
                        if (
                            this.$refs.tablebUMLBoth.children[i].cells[j].textContent == ""
                        ) {
                            this.$refs.tablebUMLBoth.children[i].cells[
                                j
                            ].textContent = this.trentUMLBoth[s];

                            this.$refs.tablebUMLBoth.children[i].cells[j].title = this.gameID[
                                s
                            ];
                            //gogogo
                        } else {
                            if (i - 1 == 0) {
                                s--;
                                break;
                            }
                            // turn right if have other one in td tag
                            for (let ok = 1; ok < 20; ok++) {
                                if (
                                    this.trentUMLBoth[s] ==
                                    this.$refs.tablebUMLBoth.children[i - 1].cells[j].textContent
                                ) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        if (index >= 2) {
                                            this.$refs.tablebUMLBoth.children[i - index].cells[
                                                j
                                            ].className = "line-t";
                                        }
                                        index--;
                                    }
                                    this.$refs.tablebUMLBoth.children[i - 1].cells[j].className =
                                        "line-l";
                                    this.$refs.tablebUMLBoth.children[i - 1].cells[
                                        j + ok
                                    ].className = "line-through";
                                    // end add Line
                                    this.$refs.tablebUMLBoth.children[i - 1].cells[
                                        j + ok
                                    ].textContent = this.trentUMLBoth[s];

                                    this.$refs.tablebUMLBoth.children[i - 1].cells[
                                        j + ok
                                    ].title = this.gameID[s];

                                    //gogogo
                                    s++;
                                } else {
                                    s--;
                                    break;
                                }
                            }
                            break;
                        }
                        // turn right *-*
                        if (i == this.rowTable - 1) {
                            for (let k = 1; k < 50; k++) {
                                if (this.trentUMLBoth[s] == this.trentUMLBoth[s + 1]) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        this.$refs.tablebUMLBoth.children[i - index].cells[
                                            j
                                        ].className = "line-t";
                                        index--;
                                    }
                                    this.$refs.tablebUMLBoth.children[i].cells[j].className =
                                        "line-l";
                                    this.$refs.tablebUMLBoth.children[i].cells[j + k].className =
                                        "line-through";
                                    // end add Line
                                    this.$refs.tablebUMLBoth.children[i].cells[
                                        j + k
                                    ].textContent = this.trentUMLBoth[s + 1];

                                    this.$refs.tablebUMLBoth.children[i].cells[
                                        j + k
                                    ].title = this.gameID[s + 1];
                                    //gogogo
                                    s++;
                                }
                            }
                        }
                    } else {
                        s--;
                        // console.log("breaking.....");
                        break loop2;
                    }
                }
            }
        },
        tablechartUMLTwo() {
            let countUpper = 0;
            let countMiddle = 0;
            let countLower = 0;
            var s = -1;
            loop1: for (
                let j = 0; j < this.$refs.tablebUMLTwo.children[0].children.length; j++
            ) {
                // j = td tag
                loop2: for (
                    let i = 0; i < this.$refs.tablebUMLTwo.childElementCount; i++
                ) {
                    // auto scroll
                    if (this.trentUMLTwo.length == s) {
                        this.$refs.tablebUMLTwo.children[i].children[j].classList.add(
                            "umlstylelast"
                        );
                        let lop =
                            $(".my-coltabledivlast")
                            .first()
                            .width() - 130;
                        let valueuml = $(this.$refs.tablebUMLTwo).find(".umlstylelast")[0]
                            .offsetLeft;
                        $(this.$refs.tablebUMLTwo).scrollLeft(valueuml - lop);

                        // $(this.$refs.tablebUMLTwo)
                        //   .find(".umlstylelast")[0]
                        //   .scrollIntoView({ inline: "end" });
                    }
                    // if loop all s it will render B&S and exit all loop
                    if (s == this.trentUMLTwo.length) {
                        for (let i = 0; i < this.rowTable; i++) {
                            for (let j = 0; j < 900; j++) {
                                if (
                                    this.$refs.tablebUMLTwo.children[i].children[j]
                                    .textContent === "2"
                                ) {
                                    countUpper++;
                                    $(".countUpper").text("Upper" + " = " + countUpper);
                                    this.$refs.tablebUMLTwo.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebUMLTwo.children[i].children[j].classList.add(
                                        "rs-u"
                                    );

                                    this.$refs.tablebUMLTwo.children[i].children[j].textContent =
                                        "U";
                                } else if (
                                    this.$refs.tablebUMLTwo.children[i].children[j]
                                    .textContent === "1"
                                ) {
                                    countMiddle++;
                                    $(".countMiddle").text("middle" + " = " + countMiddle);
                                    this.$refs.tablebUMLTwo.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebUMLTwo.children[i].children[j].classList.add(
                                        "rs-m"
                                    );

                                    this.$refs.tablebUMLTwo.children[i].children[j].textContent =
                                        "M";
                                } else if (
                                    this.$refs.tablebUMLTwo.children[i].children[j]
                                    .textContent === "0"
                                ) {
                                    countLower++;
                                    $(".countLower").text("lower" + " = " + countLower);
                                    this.$refs.tablebUMLTwo.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebUMLTwo.children[i].children[j].classList.add(
                                        "rs-l"
                                    );

                                    this.$refs.tablebUMLTwo.children[i].children[j].textContent =
                                        "L";
                                }
                            }
                        }
                        // this.goUML();
                        return;
                    }
                    //i = tr tag
                    s++;
                    /// very good i== <tr> j == <td>

                    if (i == 0) {
                        // if its a first row it add not check
                        if (this.trentUMLTwo.length !== s) {
                            this.$refs.tablebUMLTwo.children[i].cells[
                                j
                            ].textContent = this.trentUMLTwo[s];

                            this.$refs.tablebUMLTwo.children[i].cells[j].title = this.gameID[
                                s
                            ];
                        }
                    } else if (this.trentUMLTwo[s] == this.trentUMLTwo[s - 1]) {
                        // check is equal or not

                        //check the row it emtry or not if it emtry add
                        if (
                            this.$refs.tablebUMLTwo.children[i].cells[j].textContent == ""
                        ) {
                            this.$refs.tablebUMLTwo.children[i].cells[
                                j
                            ].textContent = this.trentUMLTwo[s];

                            this.$refs.tablebUMLTwo.children[i].cells[j].title = this.gameID[
                                s
                            ];
                            //gogogo
                        } else {
                            if (i - 1 == 0) {
                                s--;
                                break;
                            }
                            // turn right if have other one in td tag
                            for (let ok = 1; ok < 20; ok++) {
                                if (
                                    this.trentUMLTwo[s] ==
                                    this.$refs.tablebUMLTwo.children[i - 1].cells[j].textContent
                                ) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        if (index >= 2) {
                                            this.$refs.tablebUMLTwo.children[i - index].cells[
                                                j
                                            ].className = "line-t";
                                        }
                                        index--;
                                    }
                                    this.$refs.tablebUMLTwo.children[i - 1].cells[j].className =
                                        "line-l";
                                    this.$refs.tablebUMLTwo.children[i - 1].cells[
                                        j + ok
                                    ].className = "line-through";
                                    // end add Line
                                    this.$refs.tablebUMLTwo.children[i - 1].cells[
                                        j + ok
                                    ].textContent = this.trentUMLTwo[s];

                                    this.$refs.tablebUMLTwo.children[i - 1].cells[
                                        j + ok
                                    ].title = this.gameID[s];

                                    //gogogo
                                    s++;
                                } else {
                                    s--;
                                    break;
                                }
                            }
                            break;
                        }
                        // turn right *-*
                        if (i == this.rowTable - 1) {
                            for (let k = 1; k < 50; k++) {
                                if (this.trentUMLTwo[s] == this.trentUMLTwo[s + 1]) {
                                    // add Line
                                    let index = i;
                                    while (index >= 0) {
                                        this.$refs.tablebUMLTwo.children[i - index].cells[
                                            j
                                        ].className = "line-t";
                                        index--;
                                    }
                                    this.$refs.tablebUMLTwo.children[i].cells[j].className =
                                        "line-l";
                                    this.$refs.tablebUMLTwo.children[i].cells[j + k].className =
                                        "line-through";
                                    // end add Line
                                    this.$refs.tablebUMLTwo.children[i].cells[
                                        j + k
                                    ].textContent = this.trentUMLTwo[s + 1];

                                    this.$refs.tablebUMLTwo.children[i].cells[
                                        j + k
                                    ].title = this.gameID[s + 1];
                                    //gogogo
                                    s++;
                                }
                            }
                        }
                    } else {
                        s--;
                        // console.log("breaking.....");
                        break loop2;
                    }
                }
            }
        },
        //number............................................................
        tablechartnumberFirst() {
            //   console.log("let go");
            let s = -1;
            for (let j = 0; j < 100; j++) {
                for (let k = 0; k < this.rowTable; k++) {
                    s++;
                    if (s == this.trentNumberFirst.length) {
                        // auto scroll
                        this.$refs.tableNumberFirst.children[k].children[j].classList.add(
                            "numScroll"
                        );
                        let lop =
                            $(".my-coltabledivlast")
                            .first()
                            .width() - 130;
                        let valuenum = $(this.$refs.tableNumberFirst).find(".numScroll")[0]
                            .offsetLeft;
                        $(this.$refs.tableNumberFirst).scrollLeft(valuenum - lop);

                        // $(this.$refs.tableNumberFirst)
                        //   .find(".numScroll")[0]
                        //   .scrollIntoView(false, { inline: "end" });
                        if (this.isFullscreen) {
                            let counts = {};
                            for (let i = 0; i < this.trentNumberFirst.length; i++) {
                                let num = this.trentNumberFirst[i];
                                counts[num] = counts[num] ? counts[num] + 1 : 1;
                            }
                            console.log(counts);
                            let sortable = [];
                            for (let maxSpeed in counts) {
                                sortable.push([maxSpeed, counts[maxSpeed]]);
                            }

                            sortable.sort(function (a, b) {
                                return b[1] - a[1];
                            });
                            console.log(sortable);
                            for (let k = 0; k < 6; k++) {
                                console.log(
                                    (this.$refs.sortNumber.children[k].textContent = `${
                    sortable[k][0]
                  } = ${sortable[k][1]}`)
                                );
                            }
                        }
                        return;
                    }
                    let big = 0;
                    switch (this.chlist) {
                        case "sn-First Digit":
                            big = 5;
                            break;
                        case "sn-Last Digit":
                            big = 5;
                            break;
                        case "sn-Both Digit":
                            big = 9;
                            break;
                        case "sn-Two Digit":
                            big = 50;
                            break;
                    }
                    if (this.trentNumberFirst[s] < big) {
                        this.$refs.tableNumberFirst.children[k].children[j].className =
                            "small-number";
                    } else {
                        this.$refs.tableNumberFirst.children[k].children[j].className =
                            "big-number";
                    }
                    if (this.chlist === "sn-Both Digit" || this.chlist === "sn-Two Digit") {
                        this.$refs.tableNumberFirst.children[k].children[j].textContent =
                            this.trentNumberFirst[s] < 10 ?
                            "0" + this.trentNumberFirst[s] :
                            this.trentNumberFirst[s];
                    } else {
                        this.$refs.tableNumberFirst.children[k].children[
                            j
                        ].textContent = this.trentNumberFirst[s];
                    }

                    this.$refs.tableNumberFirst.children[k].children[j].title = this.gameID[
                        s
                    ];
                }
            }
        },
        tablechartnumberLast() {
            //   console.log("let go");
            let s = -1;
            for (let j = 0; j < 100; j++) {
                for (let k = 0; k < this.rowTable; k++) {
                    s++;
                    if (s == this.trentNumberLast.length) {
                        // auto scroll
                        this.$refs.tableNumberLast.children[k].children[j].classList.add(
                            "numScroll"
                        );
                        let lop =
                            $(".my-coltabledivlast")
                            .first()
                            .width() - 130;
                        let valuenum = $(this.$refs.tableNumberLast).find(".numScroll")[0]
                            .offsetLeft;
                        $(this.$refs.tableNumberLast).scrollLeft(valuenum - lop);

                        // $(this.$refs.tableNumberLast)
                        //   .find(".numScroll")[0]
                        //   .scrollIntoView(false, { inline: "end" });
                        if (this.isFullscreen) {
                            let counts = {};
                            for (let i = 0; i < this.trentNumberLast.length; i++) {
                                let num = this.trentNumberLast[i];
                                counts[num] = counts[num] ? counts[num] + 1 : 1;
                            }
                            console.log(counts);
                            let sortable = [];
                            for (let maxSpeed in counts) {
                                sortable.push([maxSpeed, counts[maxSpeed]]);
                            }

                            sortable.sort(function (a, b) {
                                return b[1] - a[1];
                            });
                            console.log(sortable);
                            for (let k = 0; k < 6; k++) {
                                console.log(
                                    (this.$refs.sortNumber.children[k].textContent = `${
                    sortable[k][0]
                  } = ${sortable[k][1]}`)
                                );
                            }
                        }
                        return;
                    }
                    let big = 0;
                    switch (this.chlist) {
                        case "sn-First Digit":
                            big = 5;
                            break;
                        case "sn-Last Digit":
                            big = 5;
                            break;
                        case "sn-Both Digit":
                            big = 9;
                            break;
                        case "sn-Two Digit":
                            big = 50;
                            break;
                    }
                    if (this.trentNumberLast[s] < big) {
                        this.$refs.tableNumberLast.children[k].children[j].className =
                            "small-number";
                    } else {
                        this.$refs.tableNumberLast.children[k].children[j].className =
                            "big-number";
                    }
                    if (this.chlist === "sn-Both Digit" || this.chlist === "sn-Two Digit") {
                        this.$refs.tableNumberLast.children[k].children[j].textContent =
                            this.trentNumberLast[s] < 10 ?
                            "0" + this.trentNumberLast[s] :
                            this.trentNumberLast[s];
                    } else {
                        this.$refs.tableNumberLast.children[k].children[
                            j
                        ].textContent = this.trentNumberLast[s];
                    }

                    this.$refs.tableNumberLast.children[k].children[j].title = this.gameID[
                        s
                    ];
                }
            }
        },
        tablechartnumberBoth() {
            //   console.log("let go");
            let s = -1;
            for (let j = 0; j < 100; j++) {
                for (let k = 0; k < this.rowTable; k++) {
                    s++;
                    if (s == this.trentNumberBoth.length) {
                        // auto scroll
                        this.$refs.tableNumberBoth.children[k].children[j].classList.add(
                            "numScroll"
                        );
                        let lop =
                            $(".my-coltabledivlast")
                            .first()
                            .width() - 130;
                        let valuenum = $(this.$refs.tableNumberBoth).find(".numScroll")[0]
                            .offsetLeft;
                        $(this.$refs.tableNumberBoth).scrollLeft(valuenum - lop);

                        // $(this.$refs.tableNumberBoth)
                        //   .find(".numScroll")[0]
                        //   .scrollIntoView(false, { inline: "end" });
                        if (this.isFullscreen) {
                            let counts = {};
                            for (let i = 0; i < this.trentNumberBoth.length; i++) {
                                let num = this.trentNumberBoth[i];
                                counts[num] = counts[num] ? counts[num] + 1 : 1;
                            }
                            console.log(counts);
                            let sortable = [];
                            for (let maxSpeed in counts) {
                                sortable.push([maxSpeed, counts[maxSpeed]]);
                            }

                            sortable.sort(function (a, b) {
                                return b[1] - a[1];
                            });
                            console.log(sortable);
                            for (let k = 0; k < 6; k++) {
                                console.log(
                                    (this.$refs.sortNumber.children[k].textContent = `${
                    sortable[k][0]
                  } = ${sortable[k][1]}`)
                                );
                            }
                        }
                        return;
                    }
                    let big = 0;
                    switch (this.chlist) {
                        case "sn-First Digit":
                            big = 5;
                            break;
                        case "sn-Last Digit":
                            big = 5;
                            break;
                        case "sn-Both Digit":
                            big = 9;
                            break;
                        case "sn-Two Digit":
                            big = 50;
                            break;
                    }
                    if (this.trentNumberBoth[s] < big) {
                        this.$refs.tableNumberBoth.children[k].children[j].className =
                            "small-number";
                    } else {
                        this.$refs.tableNumberBoth.children[k].children[j].className =
                            "big-number";
                    }
                    if (this.chlist === "sn-Both Digit" || this.chlist === "sn-Two Digit") {
                        this.$refs.tableNumberBoth.children[k].children[j].textContent =
                            this.trentNumberBoth[s] < 10 ?
                            "0" + this.trentNumberBoth[s] :
                            this.trentNumberBoth[s];
                    } else {
                        this.$refs.tableNumberBoth.children[k].children[
                            j
                        ].textContent = this.trentNumberBoth[s];
                    }

                    this.$refs.tableNumberBoth.children[k].children[j].title = this.gameID[
                        s
                    ];
                }
            }
        },
        tablechartnumberTwo() {
            //   console.log("let go");
            let s = -1;
            for (let j = 0; j < 100; j++) {
                for (let k = 0; k < this.rowTable; k++) {
                    s++;
                    if (s == this.trentNumberTwo.length) {
                        // auto scroll
                        this.$refs.tableNumberTwo.children[k].children[j].classList.add(
                            "numScroll"
                        );
                        let lop =
                            $(".my-coltabledivlast")
                            .first()
                            .width() - 130;
                        let valuenum = $(this.$refs.tableNumberTwo).find(".numScroll")[0]
                            .offsetLeft;
                        $(this.$refs.tableNumberTwo).scrollLeft(valuenum - lop);

                        // $(this.$refs.tableNumberTwo)
                        //   .find(".numScroll")[0]
                        //   .scrollIntoView(false, { inline: "end" });
                        if (this.isFullscreen) {
                            let counts = {};
                            for (let i = 0; i < this.trentNumberTwo.length; i++) {
                                let num = this.trentNumberTwo[i];
                                counts[num] = counts[num] ? counts[num] + 1 : 1;
                            }
                            console.log(counts);
                            let sortable = [];
                            for (let maxSpeed in counts) {
                                sortable.push([maxSpeed, counts[maxSpeed]]);
                            }

                            sortable.sort(function (a, b) {
                                return b[1] - a[1];
                            });
                            console.log(sortable);
                            for (let k = 0; k < 6; k++) {
                                console.log(
                                    (this.$refs.sortNumber.children[k].textContent = `${
                    sortable[k][0]
                  } = ${sortable[k][1]}`)
                                );
                            }
                        }
                        return;
                    }
                    let big = 0;
                    switch (this.chlist) {
                        case "sn-First Digit":
                            big = 5;
                            break;
                        case "sn-Last Digit":
                            big = 5;
                            break;
                        case "sn-Both Digit":
                            big = 9;
                            break;
                        case "sn-Two Digit":
                            big = 50;
                            break;
                    }
                    if (this.trentNumberTwo[s] < big) {
                        this.$refs.tableNumberTwo.children[k].children[j].className =
                            "small-number";
                    } else {
                        this.$refs.tableNumberTwo.children[k].children[j].className =
                            "big-number";
                    }
                    if (this.chlist === "sn-Both Digit" || this.chlist === "sn-Two Digit") {
                        this.$refs.tableNumberTwo.children[k].children[j].textContent =
                            this.trentNumberTwo[s] < 10 ?
                            "0" + this.trentNumberTwo[s] :
                            this.trentNumberTwo[s];
                    } else {
                        this.$refs.tableNumberTwo.children[k].children[
                            j
                        ].textContent = this.trentNumberTwo[s];
                    }

                    this.$refs.tableNumberTwo.children[k].children[j].title = this.gameID[
                        s
                    ];
                }
            }
        }
    }
};
</script>

<style scoped>
.line-through {
    background: transparent url("http://davidrhysthomas.co.uk/linked/strike.png") 0 50% repeat-x;
}

.tooltip-inner {
    text-align: left;
}

.table-responsive {
    /* overflow-x: hidden;
  overflow-y: hidden; */
}

/* .line-t {
  background: transparent url(/images/t.png);
    background-repeat: repeat-y;
    background-size: 100%;
}
.line-l {
  background: transparent url("/images/L.png");
  background-repeat: no-repeat;
  background-size: 100%;
} */
table {
    /* overflow-x: hidden;
  overflow-y: hidden; */
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    display: block;
    overflow-x: hidden;
    white-space: nowrap;
}

td,
tr {
    /* border: 1px solid black; */
    min-width: 26px;
    height: 26px;
    text-align: center;
    padding: 1px !important;
}

.text-edit {
    background-color: transparent;
    color: #003e70;
}

table.table,
tr,
td,
p {
    color: #003e70;
    /* font-weight: 500; */
}

.red {
    text-align: center;
    color: #fff;
    /* font-weight: bold; */
    height: 24px;
    width: 24px;
    background-color: red;
    border-radius: 5rem !important;
    display: inline-block;
    font-size: 14px;
    padding: 0px;
}

.blue {
    text-align: center;
    color: #fff;
    /* font-weight: bold; */
    height: 24px;
    width: 24px;
    background-color: #003f70;
    border-radius: 5rem !important;
    display: inline-block;
    font-size: 14px;
    padding: 0px;
}

.green {
    text-align: center;
    color: #fff;
    /* font-weight: bold; */
    height: 24px;
    width: 24px;
    background-color: rgb(8, 214, 77);
    border-radius: 5rem !important;
    display: inline-block;
    font-size: 14px;
    padding: 0px;
}

.big-number {
    font-size: 16px;
    font-weight: bolder;
    color: #003f70;
    outline: none;
}

.small-number {
    font-size: 16px;
    font-weight: bolder;
    color: #ff0000;
    outline: none;
}

.rs1,
.rs-e,
.rs-u {
    color: #003f70;
    font-size: 16px;
    font-weight: bolder;
}

.rs0,
.rs-o,
.rs-l {
    color: red;
    font-size: 16px;
    font-weight: bolder;
}

.rs-m {
    color: rgb(8, 214, 77);
    font-size: 16px;
    font-weight: bolder;
}
</style>
