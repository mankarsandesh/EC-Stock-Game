<template>
<div>
    <!-- {{chtable}} ==>> {{chlists}} -->
    <v-layout wrap>
        <v-flex v-show="chtable=='bs'">
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile">
                <div>
                    <span class="text-blue">{{$t('gamemsg.B')}}</span> =
                    <span class="text-blue">{{countBig}}</span>,
                    <span class="text-red">{{$t('gamemsg.S')}}</span> =
                    <span class="text-red">{{countSmall}}</span>,
                    <span class="text-success">{{$t('msg.Total')}}</span> =
                    <span class="text-success">{{countBig + countSmall}}</span>
                </div>
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tablebsFirst">
                        <tr v-for="tr in rowTable" :key="tr">
                            <td v-for="td in 500" :key="td" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>
        <v-flex v-show="chtable=='oe'">
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile">
                <div>
                    <span class="text-blue">{{$t('gamemsg.O')}}</span> =
                    <span class="text-blue">{{countOdd}}</span>,
                    <span class="text-red">{{$t('gamemsg.E')}}</span> =
                    <span class="text-red">{{countEven}}</span>,
                    <span class="text-success">{{$t('msg.Total')}}</span> =
                    <span class="text-success">{{countOdd+countEven}}</span>
                </div>
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tableOEFirst">
                        <tr v-for="tr in rowTable" :key="tr">
                            <td v-for="td in 300" :key="td" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>
        <v-flex v-show="chtable=='hml'">
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile">
                <div>
                    <span class="text-blue">{{$t('gamemsg.U')}}</span> =
                    <span class="text-blue">{{countUpper}}</span>,
                    <span class="text-red">{{$t('gamemsg.M')}}</span> =
                    <span class="text-red">{{countMiddle}}</span>,
                    <span class="text-success">{{$t('gamemsg.L')}}</span> =
                    <span class="text-success">{{countLower}}</span>,
                    <span class="text-primary">{{$t('msg.Total')}}</span> =
                    <span class="text-primary">{{countUpper+countMiddle+countLower}}</span>
                </div>
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tablebUMLFirst">
                        <tr v-for="tr in rowTable" :key="tr">
                            <td v-for="td in 900" :key="td" style="border:1px solid #000000;"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </v-flex>
        <v-flex v-show="chtable=='sn'">
            <div class="col-12 col-md-12 col-lg-6 col-sm-12 full-screen col-mobile">
                <div ref="sortNumber">
                    <span class></span>
                    <span class></span>
                    <span class></span>
                    <span class></span>
                    <span class></span>
                    <span class></span>
                </div>
                <div class="my-coltabledivlast">
                    <table class="table-responsive" ref="tableNumberFirst">
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
import openSocket from "socket.io-client";
export default {
    layout: "classic",
    props: ["dataArray", "chtable", "chlists", "isFullscreen"],
    data() {
        return {
            url: "",
            trentFirst: [],
            trentOEFirst: [],
            trentUMLFirst: [],
            trentNumberFirst: [],
            gameID: [],
            is_show_bs: true,
            is_show_oe: true,
            is_show_hml: true,
            is_show_num: true,
            rowTable: 6,
            countBig: 0,
            countSmall: 0,
            countOdd: 0,
            countEven: 0,
            countUpper: 0,
            countMiddle: 0,
            countLower: 0
        };
    },
    mounted() {
        setTimeout(() => {
            this.getTableChartBS();
        }, 1000);
        // this.autoScroll();
        this.Timeout();
    },
    watch: {
        chlists() {
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
        Timeout() {
            const socket = openSocket("https://websocket-timer.herokuapp.com");
            socket.on("time", data => {
                let times;
                let calculat;
                if (this.$route.params.id.split('-')[1] == "btc1") {
                    times = data.btc1.timer;
                    calculat = 39;
                } else if (this.$route.params.id.split('-')[1] == "btc5") {
                    times = data.btc5.timer;
                    calculat = 239;
                } else if (this.$route.params.id.split('-')[1] == "usindex") {
                    times = data.usindex.timer;
                    calculat = 239;
                } else {
                    times = data.sh000001.timer;
                    calculat = 239;
                }
                if (times == calculat) {
                    this.getTableChartBS();
                    this.$vuetify.goTo(0)
                }
            });
        },
        clearTrendMap() {
            this.gameID = []
            this.trentFirst = [];
            this.trentOEFirst = [];
            this.trentUMLFirst = [];
            this.trentNumberFirst = [];

            //bs
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 500; j++) {
                    this.$refs.tablebsFirst.children[i].children[j].textContent = "";
                    this.$refs.tablebsFirst.children[i].children[j].className = "";
                }
            }
            //oe
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 300; j++) {
                    this.$refs.tableOEFirst.children[i].children[j].textContent = "";
                    this.$refs.tableOEFirst.children[i].children[j].className = "";
                }
            }
            //uml
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 900; j++) {
                    this.$refs.tablebUMLFirst.children[i].children[j].textContent = "";
                    this.$refs.tablebUMLFirst.children[i].children[j].className = "";
                }
            }
            //number
            for (let i = 0; i < this.rowTable; i++) {
                for (let j = 0; j < 100; j++) {
                    this.$refs.tableNumberFirst.children[i].children[j].textContent = "";
                    this.$refs.tableNumberFirst.children[i].children[j].className = "";
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
                let valuebs = $(_this.$refs.tablebsFirst).find(".mystylelast")[0]
                    .offsetLeft;
                let valueoe = $(_this.$refs.tableOEFirst).find(".oestylelast")[0]
                    .offsetLeft;
                let valueuml = $(_this.$refs.tablebUMLFirst).find(".umlstylelast")[0]
                    .offsetLeft;
                let valuenum = $(_this.$refs.tableNumberFirst).find(".numScroll")[0]
                    .offsetLeft;
                $(_this.$refs.tablebsFirst).scrollLeft(valuebs - lop);
                $(_this.$refs.tableOEFirst).scrollLeft(valueoe - lop);
                $(_this.$refs.tablebUMLFirst).scrollLeft(valueuml - lop);
                $(_this.$refs.tableNumberFirst).scrollLeft(valuenum - lop);
            }, 1000);
        },
        // sleep(milliseconds) {
        //   return new Promise(resolve => setTimeout(resolve, milliseconds));
        // },
        formatToPrice(value) {
            if (this.$route.params.id.split("-")[1] == "usindex") {
                return `${Number(value).toFixed(4)}`;
            } else {
                return `${Number(value).toFixed(2)}`;
            }
        },
        getTableChartBS() {
            if (this.dataArray === "") return;
            this.clearTrendMap();
            let n = 0;
            let firstlast = "";
            this.dataArray.forEach(element => {
                n++;
                this.gameID.push(
                    element.gameid +
                    "\n" +
                    this.formatToPrice(element.PT) +
                    "\n" +
                    element.created_at
                );
                let no_firsts = this.formatToPrice(element.PT)[
                    this.formatToPrice(element.PT).length - 2
                ].toString();
                let no_lasts = this.formatToPrice(element.PT)[
                    this.formatToPrice(element.PT).length - 1
                ].toString();

                let no_first = parseInt(no_firsts);
                let no_last = parseInt(no_lasts);
                let no_both = no_first + no_last;
                let no_two = parseInt(no_first + "" + no_last);

                if (this.chtable == "oe") {
                    // odd even
                    if (this.chlists == "oe-firstdigit") {
                        this.trentOEFirst.push(no_first % 2);
                    } else if (this.chlists == "oe-lastdigit") {
                        this.trentOEFirst.push(no_last % 2);
                    } else if (this.chlists == "oe-bothdigit") {
                        this.trentOEFirst.push(no_both % 2);
                    } else if (this.chlists == "oe-twodigit") {
                        this.trentOEFirst.push(no_two % 2);
                    }

                    if (n == this.dataArray.length) {
                        this.tablechartOEFirst();
                        return;
                    }
                } else if (this.chtable == "hml") {
                    // hml
                    if (this.chlists == "hml-firstdigit") {
                        if (no_first >= 0 && no_first <= 3) {
                            this.trentUMLFirst.push(0);
                        } else if (no_first >= 4 && no_first <= 6) {
                            this.trentUMLFirst.push(1);
                        } else if (no_first >= 7 && no_first <= 9) {
                            this.trentUMLFirst.push(2);
                        }
                    } else if (this.chlists == "hml-lastdigit") {
                        if (no_last >= 0 && no_last <= 3) {
                            this.trentUMLFirst.push(0);
                        } else if (no_last >= 4 && no_last <= 6) {
                            this.trentUMLFirst.push(1);
                        } else if (no_last >= 7 && no_last <= 9) {
                            this.trentUMLFirst.push(2);
                        }
                    } else if (this.chlists == "hml-bothdigit") {
                        if (no_both >= 0 && no_both <= 6) {
                            this.trentUMLFirst.push(0);
                        } else if (no_both >= 7 && no_both <= 12) {
                            this.trentUMLFirst.push(1);
                        } else if (no_both >= 13 && no_both <= 18) {
                            this.trentUMLFirst.push(2);
                        }
                    } else if (this.chlists == "hml-twodigit") {
                        if (no_two >= 0 && no_two <= 33) {
                            this.trentUMLFirst.push(0);
                        } else if (no_two >= 34 && no_two <= 66) {
                            this.trentUMLFirst.push(1);
                        } else if (no_two >= 67 && no_two <= 99) {
                            this.trentUMLFirst.push(2);
                        }
                    }

                    if (n == this.dataArray.length) {
                        this.tablechartUMLFirst();
                        return;
                    }
                } else if (this.chtable == "sn") {
                    // sn
                    if (this.chlists == "sn-firstdigit") {
                        this.trentNumberFirst.push(no_first);
                    } else if (this.chlists == "sn-lastdigit") {
                        this.trentNumberFirst.push(no_last);
                    } else if (this.chlists == "sn-bothdigit") {
                        this.trentNumberFirst.push(no_both);
                    } else if (this.chlists == "sn-twodigit") {
                        this.trentNumberFirst.push(no_two);
                    }

                    if (n == this.dataArray.length) {
                        this.tablechartnumberFirst();
                        return;
                    }
                } else {
                    if (this.chlists == "bs-lastdigit") {
                        if (no_last < 5) {
                            this.trentFirst.push(0);
                        } else {
                            this.trentFirst.push(1);
                        }
                    } else if (this.chlists == "bs-bothdigit") {
                        if (no_both < 9) {
                            this.trentFirst.push(0);
                        } else {
                            this.trentFirst.push(1);
                        }
                    } else if (this.chlists == "bs-twodigit") {
                        if (no_two < 50) {
                            this.trentFirst.push(0);
                        } else {
                            this.trentFirst.push(1);
                        }
                    } else {
                        if (no_first < 5) {
                            this.trentFirst.push(0);
                        } else {
                            this.trentFirst.push(1);
                        }
                    }

                    if (n == this.dataArray.length) {
                        this.tablechartBSFirst();
                        return;
                    }
                }
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
                        $(this.$refs.tablebsFirst)
                            .find(".mystylelast")[0]
                            .scrollIntoView({
                                block: "nearest",
                                inline: "center"
                            });
                    }
                    // if loop all s it will render B&S and exit all loop
                    if (s == this.trentFirst.length) {
                        for (let i = 0; i < this.rowTable; i++) {
                            // tablebsFirst.children[i].children[""0""]
                            //console.log(this.$refs.tablebsFirst.children[i]);
                            for (let j = 0; j < 300; j++) {
                                if (
                                    this.$refs.tablebsFirst.children[i].children[j]
                                    .textContent === "1"
                                ) {
                                    countBig++;
                                    this.countBig = countBig;
                                    this.$refs.tablebsFirst.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebsFirst.children[i].children[
                                        j
                                    ].textContent = this.$root.$t("gamemsg.B");
                                    this.$refs.tablebsFirst.children[i].children[j].classList.add(
                                        "rs1"
                                    );
                                } else if (
                                    this.$refs.tablebsFirst.children[i].children[j]
                                    .textContent === "0"
                                ) {
                                    countSmall++;
                                    this.countSmall = countSmall;
                                    this.$refs.tablebsFirst.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tablebsFirst.children[i].children[j].classList.add(
                                        "rs0"
                                    );

                                    this.$refs.tablebsFirst.children[i].children[
                                        j
                                    ].textContent = this.$root.$t("gamemsg.S");
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

                            this.$refs.tablebsFirst.children[i].cells[j].title = this.gameID[
                                s
                            ];
                            //gogogo
                        }
                    } else if (this.trentFirst[s] == this.trentFirst[s - 1]) {
                        // check is equal or not

                        //check the row it emtry or not if it emtry add
                        if (
                            this.$refs.tablebsFirst.children[i].cells[j].textContent == ""
                        ) {
                            this.$refs.tablebsFirst.children[i].cells[
                                j
                            ].textContent = this.trentFirst[s];

                            this.$refs.tablebsFirst.children[i].cells[j].title = this.gameID[
                                s
                            ];

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

                        $(this.$refs.tableOEFirst)
                            .find(".oestylelast")[0]
                            .scrollIntoView({
                                block: "nearest",
                                inline: "center"
                            });
                    }
                    // if loop all s it will render B&S and exit all loop
                    if (s == this.trentOEFirst.length) {
                        for (let i = 0; i < this.rowTable; i++) {
                            // tablebsTwo.children[i].children[""0""]
                            //console.log(this.$refs.tablebsTwo.children[i]);
                            for (let j = 0; j < 200; j++) {
                                if (
                                    this.$refs.tableOEFirst.children[i].children[j]
                                    .textContent === "1"
                                ) {
                                    countOdd++;
                                    this.countOdd = countOdd;
                                    this.$refs.tableOEFirst.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tableOEFirst.children[i].children[j].classList.add(
                                        "rs-o"
                                    );

                                    this.$refs.tableOEFirst.children[i].children[
                                        j
                                    ].textContent = this.$root.$t("gamemsg.O");
                                } else if (
                                    this.$refs.tableOEFirst.children[i].children[j]
                                    .textContent === "0"
                                ) {
                                    countEven++;
                                    this.countEven = countEven;
                                    this.$refs.tableOEFirst.children[i].children[j].textContent =
                                        "";
                                    this.$refs.tableOEFirst.children[i].children[j].classList.add(
                                        "rs-e"
                                    );

                                    this.$refs.tableOEFirst.children[i].children[
                                        j
                                    ].textContent = this.$root.$t("gamemsg.E");
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

                            this.$refs.tableOEFirst.children[i].cells[j].title = this.gameID[
                                s
                            ];
                            //gogogo
                        }
                    } else if (this.trentOEFirst[s] == this.trentOEFirst[s - 1]) {
                        // check is equal or not

                        //check the row it emtry or not if it emtry add
                        if (
                            this.$refs.tableOEFirst.children[i].cells[j].textContent == ""
                        ) {
                            this.$refs.tableOEFirst.children[i].cells[
                                j
                            ].textContent = this.trentOEFirst[s];
                            this.$refs.tableOEFirst.children[i].cells[j].title = this.gameID[
                                s
                            ];
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
                        $(this.$refs.tablebUMLFirst)
                            .find(".umlstylelast")[0]
                            .scrollIntoView({
                                block: "nearest",
                                inline: "center"
                            });
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
                                    this.countUpper = countUpper;
                                    this.$refs.tablebUMLFirst.children[i].children[
                                        j
                                    ].textContent = "";
                                    this.$refs.tablebUMLFirst.children[i].children[
                                        j
                                    ].classList.add("rs-u");

                                    this.$refs.tablebUMLFirst.children[i].children[
                                        j
                                    ].textContent = this.$root.$t("gamemsg.U");
                                } else if (
                                    this.$refs.tablebUMLFirst.children[i].children[j]
                                    .textContent === "1"
                                ) {
                                    countMiddle++;
                                    this.countMiddle = countMiddle;
                                    this.$refs.tablebUMLFirst.children[i].children[
                                        j
                                    ].textContent = "";
                                    this.$refs.tablebUMLFirst.children[i].children[
                                        j
                                    ].classList.add("rs-m");

                                    this.$refs.tablebUMLFirst.children[i].children[
                                        j
                                    ].textContent = this.$root.$t("gamemsg.M");
                                } else if (
                                    this.$refs.tablebUMLFirst.children[i].children[j]
                                    .textContent === "0"
                                ) {
                                    countLower++;
                                    this.countLower = countLower;
                                    this.$refs.tablebUMLFirst.children[i].children[
                                        j
                                    ].textContent = "";
                                    this.$refs.tablebUMLFirst.children[i].children[
                                        j
                                    ].classList.add("rs-l");

                                    this.$refs.tablebUMLFirst.children[i].children[
                                        j
                                    ].textContent = this.$root.$t("gamemsg.L");
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

                            this.$refs.tablebUMLFirst.children[i].cells[
                                j
                            ].title = this.gameID[s];
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

                            this.$refs.tablebUMLFirst.children[i].cells[
                                j
                            ].title = this.gameID[s];
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
        //number............................................................
        tablechartnumberFirst() {
            // console.log("let go");
            let s = -1;
            for (let j = 0; j < 100; j++) {
                for (let k = 0; k < this.rowTable; k++) {
                    s++;
                    if (s == this.trentNumberFirst.length) {
                        // auto scroll
                        this.$refs.tableNumberFirst.children[k].children[j].classList.add(
                            "numScroll"
                        );
                        $(this.$refs.tableNumberFirst)
                            .find(".numScroll")[0]
                            .scrollIntoView({
                                block: "nearest",
                                inline: "center"
                            });
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
                    switch (this.chlists) {
                        case "sn-firstdigit":
                            big = 5;
                            break;
                        case "sn-lastdigit":
                            big = 5;
                            break;
                        case "sn-bothdigit":
                            big = 9;
                            break;
                        case "sn-twodigit":
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
                    if (this.chlists === "sn-twodigit") {
                        this.$refs.tableNumberFirst.children[k].children[j].textContent =
                            this.trentNumberFirst[s] < 10 ?
                            "0" + this.trentNumberFirst[s] :
                            this.trentNumberFirst[s];
                    } else {
                        this.$refs.tableNumberFirst.children[k].children[
                            j
                        ].textContent = this.trentNumberFirst[s];
                    }

                    this.$refs.tableNumberFirst.children[k].children[
                        j
                    ].title = this.gameID[s];
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
    background-color: #003f70 !important;
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
    /* font-weight: bolder; */
    color: #fff;
    outline: none;
    background-color: #003f70;
    border-radius: 5rem;
}

.small-number {
    font-size: 16px;
    /* font-weight: bolder; */
    color: #fff;
    outline: none;
    background-color: #ff0000;
    border-radius: 5rem;
}

.rs1,
.rs-e,
.rs-u {
    color: #fff;
    font-size: 16px;
    /* font-weight: bolder; */
    background-color: #003f70;
    border-radius: 5rem;
}

.rs0,
.rs-o,
.rs-l {
    color: #fff;
    font-size: 16px;
    /* font-weight: bolder; */
    background-color: red;
    border-radius: 5rem;
}

.rs-m {
    color: #fff;
    font-size: 16px;
    /* font-weight: bolder; */
    background-color: rgb(8, 214, 77);
    border-radius: 5rem;
}
</style>
