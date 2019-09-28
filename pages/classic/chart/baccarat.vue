<template>
<div>
    {{chtable}} ==>> {{chlists}}
    <v-layout wrap>
        <v-flex xs12 pb-2>
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile" v-show="which_one=='B/S' || which_one==true ">
                <!-- <div v-show="isFullscreen">
                    <span class="countBig text-white"></span>
                    <span class="countSmall text-white"></span>
                </div> -->
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tablebsTwo">
                        <tr v-for="tr in rowTable">
                            <td v-for="td in 500" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>

        <v-flex xs12 pb-2>
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile" v-show="which_one=='O/E' || which_one==true ">
                <!-- <div v-show="isFullscreen">
                    <span class="countOdd text-white"></span>
                    <span class="countEven text-white"></span>
                </div> -->
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tableOETwo">
                        <tr v-for="tr in rowTable">
                            <td v-for="td in 300" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>
        <v-flex xs12 pb-2>
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile" v-show="which_one=='U/L' || which_one==true ">
                <!-- <div v-show="isFullscreen">
                    <span class="countUpper text-white"></span>
                    <span class="countMiddle text-white"></span>
                    <span class="countLower text-white"></span>
                </div> -->
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tablebUMLTwo">
                        <tr v-for="tr in rowTable">
                            <td v-for="td in 900" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>
        <v-flex xs12 pb-2>
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile" v-show="which_one=='NUM' || which_one==true ">
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
                        <tr v-for="tr in rowTable">
                            <td v-for="td in 100" style="border:1px solid #000000;"></td>
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
        // dataArray: {
        //     type: Array,
        //     required: true
        // },
        //first,last,both,two
        // chlist: {
        //     type: String,
        //     required: true
        // },
        rowTable: {
            type: Number,
            default: 6
        },
        chtable: String,
        chlists: String,
        // tbdatachart: String,
        which_one: {
            default: true
        },
        isFullscreen: Boolean
    },
    data() {
        return {
            url: "",
            trent: [],
            trentNumber: [],
            trentOE: [],
            trentUML: [],
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
        }
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
            this.trent = [];
            this.trentNumber = [];
            this.trentOE = [];
            this.trentUML = [];
            //bs
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 500; j++) {
                    this.$refs.tablebsTwo.children[i].children[j].textContent = "";
                    this.$refs.tablebsTwo.children[i].children[j].className = "";
                }
            }
            //oe
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 300; j++) {
                    this.$refs.tableOETwo.children[i].children[j].textContent = "";
                    this.$refs.tableOETwo.children[i].children[j].className = "";
                }
            }
            //uml
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 900; j++) {
                    this.$refs.tablebUMLTwo.children[i].children[j].textContent = "";
                    this.$refs.tablebUMLTwo.children[i].children[j].className = "";
                }
            }
            //number
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
            // setTimeout(function() {
            let lop =
                $(".my-coltabledivlast")
                .first()
                .width() - 30;
            let valuebs = $(_this.$refs.tablebsTwo).find(".mystylelast")[0]
                .offsetLeft;
            let valueoe = $(_this.$refs.tableOETwo).find(".oestylelast")[0]
                .offsetLeft;
            let valueuml = $(_this.$refs.tablebUMLTwo).find(".umlstylelast")[0]
                .offsetLeft;
            let valuenum = $(_this.$refs.tableNumberTwo).find(".numScroll")[0]
                .offsetLeft;
            $(_this.$refs.tablebsTwo).scrollLeft(valuebs - lop);
            $(_this.$refs.tableOETwo).scrollLeft(valueoe - lop);
            $(_this.$refs.tablebUMLTwo).scrollLeft(valueuml - lop);
            $(_this.$refs.tableNumberTwo).scrollLeft(valuenum - lop);
            // }, 1000);
        },
        // sleep(milliseconds) {
        //   return new Promise(resolve => setTimeout(resolve, milliseconds));
        // },
        getTableChartBS() {
            // if (response.data.data === "") return;
            this.clearTrendMap();

            this.apis = "http://159.138.54.214/api/datahistory/BTCUSDT1";
            this.$axios(this.apis).then(response => {
                console.log(response.data)
                let n = 0;
                response.data.forEach(element => {

                    n++;
                    if (this.chtable == "bs") {
                        this.gameID.push(
                            element.gameid + "\n" + element.PT + "\n" + element.created_at
                        );
                        //bigsmall
                        if (this.chlists == "First Digit") {
                            let rs = element.PT[element.PT.length - 2].toString();
                            let firstlast = parseInt(rs);

                            if (firstlast < 5) {
                                this.trent.push(0);
                            } else {
                                this.trent.push(1);
                            }
                        } else if (this.chlists == "Last Digit") {
                            let rs = element.PT[element.PT.length - 1].toString();
                            let firstlast = parseInt(rs);
                            if (firstlast < 5) {
                                this.trent.push(0);
                            } else {
                                this.trent.push(1);
                            }
                        } else if (this.chlists == "Both Digit") {
                            let rs = parseInt(element.PT[element.PT.length - 2]) + parseInt(element.PT[element.PT.length - 1]);
                            let firstlast = parseInt(rs);
                            if (firstlast < 9) {
                                this.trent.push(0);
                            } else {
                                this.trent.push(1);
                            }
                        } else if (this.chlists == "Two Digit") {
                            let rs = element.PT[element.PT.length - 2].toString() + element.PT[element.PT.length - 1].toString();
                            let firstlast = parseInt(rs);
                            if (firstlast < 49) {
                                this.trent.push(0);
                            } else {
                                this.trent.push(1);
                            }
                        }

                        if (n == response.data.length) {
                            this.tablechartBS();
                            return;
                        }

                    } else if (this.chtable == "oe") {
                        this.gameID.push(element.gameid + "\n" + element.PT + "\n" + element.created_at);
                        // odd even
                        if (this.chlists == "First Digit") {
                            let rs = element.PT[element.PT.length - 2].toString();
                            let firstlast = parseInt(rs);

                            this.trentOE.push(firstlast % 2);
                        } else if (this.chlists == "Last Digit") {
                            let rs = element.PT[element.PT.length - 1].toString();
                            let firstlast = parseInt(rs);
                            this.trentOE.push(firstlast % 2);
                        } else if (this.chlists == "Both Digit") {
                            let rs = parseInt(element.PT[element.PT.length - 2]) + parseInt(element.PT[element.PT.length - 1]);
                            let firstlast = parseInt(rs);
                            this.trentOE.push(firstlast % 2);
                        } else if (this.chlists == "Two Digit") {
                            let rs = element.PT[element.PT.length - 2].toString() + element.PT[element.PT.length - 1].toString();
                            let firstlast = parseInt(rs);
                            this.trentOE.push(firstlast % 2);
                        }

                        if (n == response.data.length) {
                            this.tablechartOE();
                            return;
                        }

                    } else if (this.chtable == "hml") {
                        this.gameID.push(element.gameid + "\n" + element.PT + "\n" + element.created_at);
                        // hml
                        if (this.chlists == "First Digit") {
                            let rs = element.PT[element.PT.length - 2].toString();
                            let firstlast = parseInt(rs);

                            if (firstlast >= 0 && firstlast <= 3) {
                                this.trentUML.push(0);
                            } else if (firstlast >= 4 && firstlast <= 6) {
                                this.trentUML.push(1);
                            } else if (firstlast >= 7 && firstlast <= 9) {
                                this.trentUML.push(2);
                            }
                        } else if (this.chlists == "Last Digit") {
                            let rs = element.PT[element.PT.length - 1].toString();
                            let firstlast = parseInt(rs);
                            if (firstlast >= 0 && firstlast <= 3) {
                                this.trentUML.push(0);
                            } else if (firstlast >= 4 && firstlast <= 6) {
                                this.trentUML.push(1);
                            } else if (firstlast >= 7 && firstlast <= 9) {
                                this.trentUML.push(2);
                            }
                        } else if (this.chlists == "Both Digit") {
                            let rs = parseInt(element.PT[element.PT.length - 2]) + parseInt(element.PT[element.PT.length - 1]);
                            let firstlast = parseInt(rs);
                            if (firstlast >= 0 && firstlast <= 6) {
                                this.trentUML.push(0);
                            } else if (firstlast >= 7 && firstlast <= 12) {
                                this.trentUML.push(1);
                            } else if (firstlast >= 13 && firstlast <= 18) {
                                this.trentUML.push(2);
                            }
                        } else if (this.chlists == "Two Digit") {
                            let rs = element.PT[element.PT.length - 2].toString() + element.PT[element.PT.length - 1].toString();
                            let firstlast = parseInt(rs);
                            if (firstlast >= 0 && firstlast <= 33) {
                                this.trentUML.push(0);
                            } else if (firstlast >= 34 && firstlast <= 66) {
                                this.trentUML.push(1);
                            } else if (firstlast >= 67 && firstlast <= 99) {
                                this.trentUML.push(2);
                            }
                        }

                        if (n == response.data.length) {
                            this.tablechartUML();
                            return;
                        }
                    } else if (this.chtable == "sn") {
                        this.gameID.push(element.gameid + "\n" + element.PT + "\n" + element.created_at);
                        // sn
                        if (this.chlists == "First Digit") {
                            let rs = element.PT[element.PT.length - 2].toString();
                            let firstlast = parseInt(rs);

                            this.trentNumber.push(firstlast);
                        } else if (this.chlists == "Last Digit") {
                            let rs = element.PT[element.PT.length - 1].toString();
                            let firstlast = parseInt(rs);
                            this.trentNumber.push(firstlast);
                        } else if (this.chlists == "Both Digit") {
                            let rs = parseInt(element.PT[element.PT.length - 2]) + parseInt(element.PT[element.PT.length - 1]);
                            let firstlast = parseInt(rs);
                            this.trentNumber.push(firstlast);
                        } else if (this.chlists == "Two Digit") {
                            let rs = element.PT[element.PT.length - 2].toString() + element.PT[element.PT.length - 1].toString();
                            let firstlast = parseInt(rs);
                            this.trentNumber.push(firstlast);
                        }

                        if (n == response.data.length) {
                            this.tablechartnumber();
                            return;
                        }
                    }

                });
            });
        },
        tablechartBS() {
            let countBig = 0;
            let countSmall = 0;
            console.log(this.$refs);
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
                    if (this.trent.length == s) {
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
                    if (s == this.trent.length) {
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
                        if (this.trent.length !== s) {
                            this.$refs.tablebsTwo.children[i].cells[
                                j
                            ].textContent = this.trent[s];

                            this.$refs.tablebsTwo.children[i].cells[j].title = this.gameID[s];
                            //gogogo
                        }
                    } else if (this.trent[s] == this.trent[s - 1]) {
                        // check is equal or not

                        //check the row it emtry or not if it emtry add
                        if (this.$refs.tablebsTwo.children[i].cells[j].textContent == "") {
                            this.$refs.tablebsTwo.children[i].cells[
                                j
                            ].textContent = this.trent[s];

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
                                    this.trent[s] ==
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
                                    ].textContent = this.trent[s];
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
                                if (this.trent[s] == this.trent[s + 1]) {
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
                                    ].textContent = this.trent[s + 1];

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
        tablechartOE() {
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
                    if (this.trentOE.length == s) {
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
                    if (s == this.trentOE.length) {
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
                        if (this.trentOE.length !== s) {
                            this.$refs.tableOETwo.children[i].cells[
                                j
                            ].textContent = this.trentOE[s];

                            this.$refs.tableOETwo.children[i].cells[j].title = this.gameID[s];
                            //gogogo
                        }
                    } else if (this.trentOE[s] == this.trentOE[s - 1]) {
                        // check is equal or not

                        //check the row it emtry or not if it emtry add
                        if (this.$refs.tableOETwo.children[i].cells[j].textContent == "") {
                            this.$refs.tableOETwo.children[i].cells[
                                j
                            ].textContent = this.trentOE[s];
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
                                    this.trentOE[s] ==
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
                                    ].textContent = this.trentOE[s];
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
                                if (this.trentOE[s] == this.trentOE[s + 1]) {
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
                                    ].textContent = this.trentOE[s + 1];

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
        tablechartUML() {
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
                    if (this.trentUML.length == s) {
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
                    if (s == this.trentUML.length) {
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
                        if (this.trentUML.length !== s) {
                            this.$refs.tablebUMLTwo.children[i].cells[
                                j
                            ].textContent = this.trentUML[s];

                            this.$refs.tablebUMLTwo.children[i].cells[j].title = this.gameID[
                                s
                            ];
                        }
                    } else if (this.trentUML[s] == this.trentUML[s - 1]) {
                        // check is equal or not

                        //check the row it emtry or not if it emtry add
                        if (
                            this.$refs.tablebUMLTwo.children[i].cells[j].textContent == ""
                        ) {
                            this.$refs.tablebUMLTwo.children[i].cells[
                                j
                            ].textContent = this.trentUML[s];

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
                                    this.trentUML[s] ==
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
                                    ].textContent = this.trentUML[s];

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
                                if (this.trentUML[s] == this.trentUML[s + 1]) {
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
                                    ].textContent = this.trentUML[s + 1];

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
        tablechartnumber() {
            //   console.log("let go");
            let s = -1;
            for (let j = 0; j < 100; j++) {
                for (let k = 0; k < this.rowTable; k++) {
                    s++;
                    if (s == this.trentNumber.length) {
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
                            for (let i = 0; i < this.trentNumber.length; i++) {
                                let num = this.trentNumber[i];
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
                        case "First Digit":
                            big = 5;
                            break;
                        case "Last Digit":
                            big = 5;
                            break;
                        case "Both Digit":
                            big = 9;
                            break;
                        case "Two Digit":
                            big = 50;
                            break;
                    }
                    if (this.trentNumber[s] < big) {
                        this.$refs.tableNumberTwo.children[k].children[j].className =
                            "small-number";
                    } else {
                        this.$refs.tableNumberTwo.children[k].children[j].className =
                            "big-number";
                    }
                    if (this.chlist === "Both Digit" || this.chlist === "Two Digit") {
                        this.$refs.tableNumberTwo.children[k].children[j].textContent =
                            this.trentNumber[s] < 10 ?
                            "0" + this.trentNumber[s] :
                            this.trentNumber[s];
                    } else {
                        this.$refs.tableNumberTwo.children[k].children[
                            j
                        ].textContent = this.trentNumber[s];
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
