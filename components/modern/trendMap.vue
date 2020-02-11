<template>
  <div>
    <v-layout wrap>
      <v-flex
        :class="setClass(' pl-3 pb-5')"
        style="margin-top:10px;"
        v-show="which_one == 'B/S' || which_one == !isFullscreen"
      >
        <div v-show="isFullscreen">
          <span class="countBig text-white"></span>
          <span class="countSmall text-white"></span>
        </div>
        <div class="bs-coltabledivlast">
          <table class="table-responsive" ref="tablebsTwo">
            <tr v-for="tr in rowTable">
              <td v-for="td in BSLength"></td>
            </tr>
          </table>
        </div>
      </v-flex>

      <v-flex
        :class="setClass(' pl-3 pb-5')"
        style="margin-top:10px;"
        v-show="which_one == 'O/E' || which_one == !isFullscreen"
      >
        <div v-show="isFullscreen">
          <span class="countOdd text-white"></span>
          <span class="countEven text-white"></span>
        </div>
        <div class="oe-coltabledivlast">
          <table class="table-responsive" ref="tableOETwo">
            <tr v-for="tr in rowTable">
              <td v-for="td in OELength"></td>
            </tr>
          </table>
        </div>
      </v-flex>

      <v-flex
        :class="setClass('pl-3 pb-5')"
        style="margin-top:10px;"
        v-show="which_one == 'U/L' || which_one == !isFullscreen"
      >
        <div v-show="isFullscreen">
          <span class="countUpper text-white"></span>
          <span class="countMiddle text-white"></span>
          <span class="countLower text-white"></span>
        </div>
        <div class="ul-coltabledivlast">
          <table class="table-responsive" ref="tablebUMLTwo">
            <tr v-for="tr in rowTable">
              <td v-for="td in HMLLength"></td>
            </tr>
          </table>
        </div>
      </v-flex>

      <v-flex
        :class="setClass('pl-3 pb-5')"
        style="margin-top:10px;"
        v-show="which_one == 'NUM' || which_one == !isFullscreen"
      >
        <div v-show="isFullscreen" ref="sortNumber">
          <span class="text-white"></span>
          <span class="text-white"></span>
          <span class="text-white"></span>
          <span class="text-white"></span>
          <span class="text-white"></span>
          <span class="text-white"></span>
        </div>
        <div class="num-coltabledivlast">
          <table class="table-responsive" ref="tableNumberTwo">
            <tr v-for="tr in rowTable">
              <td v-for="td in Numlength"></td>
            </tr>
          </table>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    dataArray: {
      type: Array,
      required: true
    },
    //first,last,both,two
    trendType: {
      type: String,
      default: "firstDigit"
    },
    rowTable: {
      type: Number,
      default: 6
    },
    // tbdatachart: String,
    which_one: {
      default: true
    },
    isFullscreen: {
      type: Boolean,
      default: false
    },
    lop: {
      type: Number,
      default: 130
    }
  },
  data() {
    return {
      BSLength: 100,
      OELength: 100,
      HMLLength: 200,
      Numlength: 100,

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
    var start = +new Date(); // log start timestamp
    // console.log(start);
    this.getTableChartBS();

    var end = +new Date(); // log end timestamp
    var diff = end - start;
    // console.log(diff);

    // this.autoScroll();
  },
  computed: {
    trendMapGrid() {
      if (this.isFullscreen) {
        return "xs12 sm12 md12 lg12";
      } else {
        return "xs12 sm12 md6 lg6";
      }
    }
    // setClass(value){
    //   if(this.$vuetify.breakpoint.md || this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl){
    //     return value
    //   }
    // }
  },
  watch: {
    // trendType() {
    //   this.getTableChartBS();
    // },
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
    setClass(value) {
      if (
        this.$vuetify.breakpoint.md ||
        this.$vuetify.breakpoint.lg ||
        this.$vuetify.breakpoint.xl
      ) {
        return value + this.trendMapGrid;
      } else {
        return this.trendMapGrid;
      }
    },
    clearTrendMap() {
      this.gameID = [];
      this.trent = [];
      this.trentNumber = [];
      this.trentOE = [];
      this.trentUML = [];
      //bs
      for (let i = 0; i < this.rowTable; i++) {
        for (let j = 0; j < this.BSLength; j++) {
          this.$refs.tablebsTwo.children[i].children[j].textContent = null;
          this.$refs.tablebsTwo.children[i].children[j].className = null;
        }
      }
      //oe
      for (let i = 0; i < this.rowTable; i++) {
        for (let j = 0; j < this.OELength; j++) {
          this.$refs.tableOETwo.children[i].children[j].textContent = null;
          this.$refs.tableOETwo.children[i].children[j].className = null;
        }
      }
      //uml
      for (let i = 0; i < this.rowTable; i++) {
        for (let j = 0; j < this.HMLLength; j++) {
          this.$refs.tablebUMLTwo.children[i].children[j].textContent = null;
          this.$refs.tablebUMLTwo.children[i].children[j].className = null;
        }
      }
      //number
      for (let i = 0; i < this.rowTable; i++) {
        for (let j = 0; j < this.Numlength; j++) {
          this.$refs.tableNumberTwo.children[i].children[j].textContent = null;
          this.$refs.tableNumberTwo.children[i].children[j].className = null;
        }
      }
    },
    // changeChartType(value) {
    //   this.trendType = value;
    //   this.clearTrendMap();
    //   this.getTableChartBS();
    // },
    // autoScroll() {
    //   let _this = this;
    //   // setTimeout(function() {
    //   let lop =
    //     $(".my-coltabledivlast")
    //       .first()
    //       .width() - 30;
    //   let valuebs = $(_this.$refs.tablebsTwo).find(".mystylelast")[0]
    //     .offsetLeft;
    //   let valueoe = $(_this.$refs.tableOETwo).find(".oestylelast")[0]
    //     .offsetLeft;
    //   let valueuml = $(_this.$refs.tablebUMLTwo).find(".umlstylelast")[0]
    //     .offsetLeft;
    //   let valuenum = $(_this.$refs.tableNumberTwo).find(".numScroll")[0]
    //     .offsetLeft;
    //   $(_this.$refs.tablebsTwo).scrollLeft(valuebs - lop);
    //   $(_this.$refs.tableOETwo).scrollLeft(valueoe - lop);
    //   $(_this.$refs.tablebUMLTwo).scrollLeft(valueuml - lop);
    //   $(_this.$refs.tableNumberTwo).scrollLeft(valuenum - lop);
    //   // }, 1000);
    // },
    // sleep(milliseconds) {
    //   return new Promise(resolve => setTimeout(resolve, milliseconds));
    // },
    getTableChartBS() {
      if (this.dataArray === "") return;
      this.clearTrendMap();
      let n = 0;
      let firstlast = "";

      var start = +new Date(); // log start timestamp
      // console.log(`${start} good` );
      // console.log(this.dataArray)

      this.dataArray.forEach(element => {
        n++;
        if (this.trendType === "firstDigit") {
          firstlast = element.no1;
          this.gameID.push(
            element.gameId + "\n" + element.PT + "\n" + element.writetime
          );
          //bigsmall
          if (firstlast < 5) {
            this.trent.push(0);
          } else {
            this.trent.push(1);
          }
          //odd even
          this.trentOE.push(firstlast % 2);
          //upper middle lower
          if (firstlast >= 0 && firstlast <= 3) {
            this.trentUML.push(0);
          } else if (firstlast >= 4 && firstlast <= 6) {
            this.trentUML.push(1);
          } else if (firstlast >= 7 && firstlast <= 9) {
            this.trentUML.push(2);
          }

          //number
          this.trentNumber.push(firstlast);
          if (n == this.dataArray.length) {
            // console.log(this.trentUML);
            this.tablechartBS();
            this.tablechartOE();
            this.tablechartUML();
            this.tablechartnumber();
            return;
          }
        } else if (this.trendType === "lastDigit") {
          firstlast = element.no2;
          this.gameID.push(
            element.gameId + "\n" + element.PT + "\n" + element.writetime
          );
          //bigsmall
          if (firstlast < 5) {
            this.trent.push(0);
          } else {
            this.trent.push(1);
          }
          //odd even
          this.trentOE.push(firstlast % 2);
          //upper middle lower
          if (firstlast >= 0 && firstlast <= 3) {
            this.trentUML.push(0);
          } else if (firstlast >= 4 && firstlast <= 6) {
            this.trentUML.push(1);
          } else if (firstlast >= 7 && firstlast <= 9) {
            this.trentUML.push(2);
          }

          //number
          this.trentNumber.push(firstlast);
          if (n == this.dataArray.length) {
            // console.log(this.trentUML);
            this.tablechartBS();
            this.tablechartOE();
            this.tablechartUML();
            this.tablechartnumber();
            return;
          }
        } else if (this.trendType === "bothDigit") {
          let rs = element.no1 + element.no2;
          firstlast = parseInt(rs);
          this.gameID.push(
            element.gameId + "\n" + element.PT + "\n" + element.writetime
          );
          //bigsmall
          if (firstlast < 9) {
            this.trent.push(0);
          } else {
            this.trent.push(1);
          }
          //odd even
          this.trentOE.push(firstlast % 2);
          //upper middle lower
          if (firstlast >= 0 && firstlast <= 6) {
            this.trentUML.push(0);
          } else if (firstlast >= 7 && firstlast <= 12) {
            this.trentUML.push(1);
          } else if (firstlast >= 13 && firstlast <= 18) {
            this.trentUML.push(2);
          }

          //number
          this.trentNumber.push(firstlast);
          if (n == this.dataArray.length) {
            // console.log(this.trentUML);
            this.tablechartBS();
            this.tablechartOE();
            this.tablechartUML();
            this.tablechartnumber();
            return;
          }
        } else if (this.trendType === "twoDigit") {
          let rs = element.no1.toString() + element.no2.toString();
          firstlast = parseInt(rs);
          this.gameID.push(
            element.gameId + "\n" + element.PT + "\n" + element.writetime
          );
          //bigsmall
          if (firstlast <= 49) {
            this.trent.push(0);
          } else {
            this.trent.push(1);
          }
          //odd even
          this.trentOE.push(firstlast % 2);
          //upper middle lower
          if (firstlast >= 0 && firstlast <= 33) {
            this.trentUML.push(0);
          } else if (firstlast >= 34 && firstlast <= 66) {
            this.trentUML.push(1);
          } else if (firstlast >= 67 && firstlast <= 99) {
            this.trentUML.push(2);
          }

          //number
          this.trentNumber.push(firstlast);
          if (n == this.dataArray.length) {
            // console.log(this.trentUML);
            this.tablechartBS();
            this.tablechartOE();
            this.tablechartUML();
            this.tablechartnumber();
            return;
          }
        }
      });
      var end = +new Date(); // log end timestamp
      var diff = end - start;
      // console.log(`${diff} Good`);
    },
    tablechartBS() {
      let countBig = 0;
      let countSmall = 0;
      // console.log(this.$refs);
      // loop table[][]
      var s = -1;
      loop1: for (
        let j = 0;
        j < this.$refs.tablebsTwo.children[0].children.length;
        j++
      ) {
        // j = td tag
        loop2: for (
          let i = 0;
          i < this.$refs.tablebsTwo.childElementCount;
          i++
        ) {
          // auto scroll
          //set classs to ref the last one
          if (this.trent.length == s) {
            this.$refs.tablebsTwo.children[i].children[j].classList.add(
              "mystylelast"
            );
            let lop = this.getClassWidth("bs-coltabledivlast") - this.lop;
            let valuebs = $(this.$refs.tablebsTwo).find(".mystylelast")[0]
              .offsetLeft;
            //  alert(valuebs + "valuebs")

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
              for (let j = 0; j < this.BSLength; j++) {
                if (
                  this.$refs.tablebsTwo.children[i].children[j].textContent ===
                  "1"
                ) {
                  countBig++;
                  $(".countBig").text(
                    this.$root.$t("gamemsg.big") + " = " + countBig
                  );
                  this.$refs.tablebsTwo.children[i].children[j].textContent =
                    "";
                  this.$refs.tablebsTwo.children[i].children[
                    j
                  ].textContent = this.$root.$t("gamemsg.B");
                  this.$refs.tablebsTwo.children[i].children[j].classList.add(
                    "rs1"
                  );
                } else if (
                  this.$refs.tablebsTwo.children[i].children[j].textContent ===
                  "0"
                ) {
                  countSmall++;
                  $(".countSmall").text(
                    this.$root.$t("gamemsg.small") + " = " + countSmall
                  );
                  this.$refs.tablebsTwo.children[i].children[j].textContent =
                    "";
                  this.$refs.tablebsTwo.children[i].children[j].classList.add(
                    "rs0"
                  );

                  this.$refs.tablebsTwo.children[i].children[
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
    getClassWidth(className) {
      let result = 0;
      for (let i = 0; i <= 4; i++) {
        result = $(`.${className}:eq(${i})`).width();
        if (result > 0) {
          break;
        }
      }
      return result;
    },

    //odd even............................................................
    tablechartOE() {
      let countOdd = 0;
      let countEven = 0;
      // loop table[][]
      var s = -1;
      loop1: for (
        let j = 0;
        j < this.$refs.tableOETwo.children[0].children.length;
        j++
      ) {
        // j = td tag
        loop2: for (
          let i = 0;
          i < this.$refs.tableOETwo.childElementCount;
          i++
        ) {
          // auto scroll
          if (this.trentOE.length == s) {
            this.$refs.tableOETwo.children[i].children[j].classList.add(
              "oestylelast"
            );
            let lop = this.getClassWidth("oe-coltabledivlast") - this.lop;
            let valueoe = $(this.$refs.tableOETwo).find(".oestylelast")[0]
              .offsetLeft;
            // alert("OE "+ lop);
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
              for (let j = 0; j < this.OELength; j++) {
                if (
                  this.$refs.tableOETwo.children[i].children[j].textContent ===
                  "1"
                ) {
                  countOdd++;
                  $(".countOdd").text(
                    this.$root.$t("gamemsg.odd") + " = " + countOdd
                  );
                  this.$refs.tableOETwo.children[i].children[j].textContent =
                    "";
                  this.$refs.tableOETwo.children[i].children[j].classList.add(
                    "rs-o"
                  );

                  this.$refs.tableOETwo.children[i].children[
                    j
                  ].textContent = this.$root.$t("gamemsg.O");
                } else if (
                  this.$refs.tableOETwo.children[i].children[j].textContent ===
                  "0"
                ) {
                  countEven++;
                  $(".countEven").text(
                    this.$root.$t("gamemsg.even") + " = " + countEven
                  );
                  this.$refs.tableOETwo.children[i].children[j].textContent =
                    "";
                  this.$refs.tableOETwo.children[i].children[j].classList.add(
                    "rs-e"
                  );

                  this.$refs.tableOETwo.children[i].children[
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
        let j = 0;
        j < this.$refs.tablebUMLTwo.children[0].children.length;
        j++
      ) {
        // j = td tag
        loop2: for (
          let i = 0;
          i < this.$refs.tablebUMLTwo.childElementCount;
          i++
        ) {
          // auto scroll
          if (this.trentUML.length == s) {
            this.$refs.tablebUMLTwo.children[i].children[j].classList.add(
              "umlstylelast"
            );
            let lop = this.getClassWidth("ul-coltabledivlast") - this.lop;
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
              for (let j = 0; j < this.HMLLength; j++) {
                if (
                  this.$refs.tablebUMLTwo.children[i].children[j]
                    .textContent === "2"
                ) {
                  countUpper++;
                  $(".countUpper").text(
                    this.$root.$t("gamemsg.high") + " = " + countUpper
                  );
                  this.$refs.tablebUMLTwo.children[i].children[j].textContent =
                    "";
                  this.$refs.tablebUMLTwo.children[i].children[j].classList.add(
                    "rs-u"
                  );

                  this.$refs.tablebUMLTwo.children[i].children[
                    j
                  ].textContent = this.$root.$t("gamemsg.U");
                } else if (
                  this.$refs.tablebUMLTwo.children[i].children[j]
                    .textContent === "1"
                ) {
                  countMiddle++;
                  $(".countMiddle").text(
                    this.$root.$t("gamemsg.mid") + " = " + countMiddle
                  );
                  this.$refs.tablebUMLTwo.children[i].children[j].textContent =
                    "";
                  this.$refs.tablebUMLTwo.children[i].children[j].classList.add(
                    "rs-m"
                  );

                  this.$refs.tablebUMLTwo.children[i].children[
                    j
                  ].textContent = this.$root.$t("gamemsg.M");
                } else if (
                  this.$refs.tablebUMLTwo.children[i].children[j]
                    .textContent === "0"
                ) {
                  countLower++;
                  $(".countLower").text(
                    this.$root.$t("gamemsg.low") + " = " + countLower
                  );
                  this.$refs.tablebUMLTwo.children[i].children[j].textContent =
                    "";
                  this.$refs.tablebUMLTwo.children[i].children[j].classList.add(
                    "rs-l"
                  );

                  this.$refs.tablebUMLTwo.children[i].children[
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
      for (let j = 0; j < this.Numlength; j++) {
        for (let k = 0; k < this.rowTable; k++) {
          s++;
          if (s == this.trentNumber.length) {
            // auto scroll
            this.$refs.tableNumberTwo.children[k].children[j].classList.add(
              "numScroll"
            );
            let lop = this.getClassWidth("num-coltabledivlast") - this.lop;
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
              // console.log(counts);
              let sortable = [];
              for (let maxSpeed in counts) {
                sortable.push([maxSpeed, counts[maxSpeed]]);
              }

              sortable.sort(function(a, b) {
                return b[1] - a[1];
              });
              // console.log(sortable);
              for (let k = 0; k < 6; k++) {
                // console.log(
                this.$refs.sortNumber.children[
                  k
                ].textContent = `${sortable[k][0]} = ${sortable[k][1]}`;
                // );
              }
            }
            return;
          }
          let big = 0;
          switch (this.trendType) {
            case "firstDigit":
              big = 5;
              break;
            case "lastDigit":
              big = 5;
              break;
            case "bothDigit":
              big = 9;
              break;
            case "twoDigit":
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
          if (this.trendType === "twoDigit") {
            this.$refs.tableNumberTwo.children[k].children[j].textContent =
              this.trentNumber[s] < 10
                ? "0" + this.trentNumber[s]
                : this.trentNumber[s];
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
  background: transparent url("http://davidrhysthomas.co.uk/linked/strike.png")
    0 50% repeat-x;
}

.tooltip-inner {
  text-align: left;
}

.table-responsive {
  /* overflow-x: hidden;
  overflow-y: hidden; */
  border:1px solid #dddddd;
  border-radius:5px;
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
  border-collapse: separate;
  border-spacing: 5px 3px;
}
table td {
  border: 1px solid #dddddd;
  border-radius: 5px;
}

td,
tr {
  /* border: 1px solid black; */
  min-width: 24px;
  height: 24px;
  text-align: center;
  margin: 5px !important;
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
  font-weight: 500;
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
  font-size: 17px;
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
  font-size: 17px;
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
  font-size: 17px;
  padding: 0px;
}

.big-number {
  font-size: 16px;
  font-weight: bolder;
  color: #4871ff;
  outline: none;
  background-color: #d0dafd;
  border: 1px solid #97a9fe !important;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.small-number {
  margin-right: 10px;
  font-size: 16px;
  font-weight: bolder;
  color: #fc4783;
  outline: none;
  background-color: #f6d0e3;
  border: 1px solid #fc4783 !important;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.rs1,
.rs-e,
.rs-u {
  color: #003f70;
  font-size: 16px;
  font-weight: bolder;
  color: #fc4181;
  background-color: #f7d0e3;
  border: 1px solid #fc4181 !important;
}

.rs0,
.rs-o,
.rs-l {
  color: red;
  font-size: 16px;
  font-weight: bolder;
  color: #4b72ff;
  background-color: #d0dafd;
  border: 1px solid #4b72ff !important;
}

.rs-m {
  font-size: 16px;
  font-weight: bolder;
  color: #17b1ca;
  background-color: #c0e6f2;
  border: 1px solid #17b1ca !important;
}

.padding {
  padding-top: 10px;
}
</style>
