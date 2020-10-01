import secureStorage from "~/plugins/secure-storage";
import { mapActions, mapGetters, mapMutations } from "vuex";
const jsonResult = require("~/data/result"); // define the json result for the compare
import Betting from "~/helpers/betting";

export const itemBetting = {
  mounted() {
    this.findItemBetting();
  },

  computed: {
    ...mapGetters([
      "selectBetting",
      "getMultiGameBet",
      "getUserBalance",
      "getAllSelectedBettingAmount",
      "getGameUUIDByStockName"
    ]),   
    /**
     *
     *
     * @returns
     */
    checkBetClose() {
      const stockTime = this.getTimerByStockName(this.stockID);
      if (stockTime && stockTime.stockStatus === "Closed") {
        return true;
      }

      if (stockTime && stockTime.gameEndTimeCountDownInSec === 0) {
        this.clearDataMultiGameBetSend();

        this.clearTempMultiGameBetData();

        this.clearItemBetting();

        secureStorage.removeItem("itemBetting");
      }

      // check 1 or 5 loop
      if (this.getStockLoop(this.stockID) === 5) {
        if (stockTime && stockTime.gameEndTimeCountDownInSec === 0) {
          this.clearDataMultiGameBet(5);
        }
        if (stockTime && stockTime.gameEndTimeCountDownInSec <= 60) {
          if (stockTime && stockTime.gameEndTimeCountDownInSec === 60) {
            this.CLEAR_TEMP_CHIPS_IMAGE();
            //  clear the select betting
            $(".closepopper").click();
            this.clearTempMultiGameBetData();
            $(".confirmBet").removeClass("confirmBet");
          }
          return true;
        } else {
          return false;
        }
      } else {
        if (stockTime && stockTime.gameEndTimeCountDownInSec === 0) {
          this.clearDataMultiGameBet(1);
        }
        if (stockTime && stockTime.gameEndTimeCountDownInSec <= 20) {
          if (stockTime && stockTime.gameEndTimeCountDownInSec === 20) {
            this.CLEAR_TEMP_CHIPS_IMAGE();
            //  clear the select betting
            Betting.clearBettingSelect(this.selectBetting);
            this.CLEAR_SELECT_BETTING();
            this.setCollegeButtonNumberParent(
              "Betting are not confirm have to clear"
            ); // make the button collage
            $(".closepopper").click();
            this.clearTempMultiGameBetData();
            $(".confirmBet").removeClass("confirmBet");
          }
          return true;
        } else {
          return false;
        }
        // return true;
      }
    }
  },
  methods: {
    ...mapMutations(["CLEAR_SELECT_BETTING","CLEAR_TEMP_CHIPS_IMAGE"]),
    ...mapActions([
      "clearTempMultiGameBetData",
      "clearItemBetting",
      "clearTempMultiGameBetData",
      "setCollegeButtonNumberParent",
      "clearDataMultiGameBetSend"
    ]),
    /**
     *
     *
     * @param {*} value
     */
    btnNumber(value) {
      value == this.number ? (this.number = null) : (this.number = value);
    },

    /**
     *
     *
     * @param {*} items
     */
    async updateBet(items) {
      try {
        // parent the button
        if (!$("#" + items.id.split("-")[0]).hasClass(items.class)) {
          $("#" + items.id.split("-")[0]).addClass(items.class);
        }
        // small button
        $("#" + items.id).addClass(items.betRule);
      } catch (error) {
        console.error(error);
      }
    },

    /**
     *
     *
     */
    findItemBetting() {
      const array = secureStorage.getItem("itemBetting");
      jsonResult.resultBet.map((items, index) => {
        if (array) {
          array.map((item, index) => {
            if (item.class === items.type) {
              // console.log("am here in the findItemBetting ", item)
              if (item.specificNumber) {
                //  find and make the parent color button
                if (!$("#" + item.id.split("-")[0]).hasClass(item.class)) {
                  $("#" + item.id.split("-")[0]).addClass(item.class);
                }
                //  find child button with mark color
                if (!$("#" + item.id).hasClass(item.betRule)) {
                  $("#" + item.id).addClass(item.betRule);
                }
              }
            }
            if (
              !$("#" + item.id).hasClass(
                // item.class + " " + item.id.split("-")[1]
              )
            ) {
              $("#" + item.id).addClass(
                // item.class + " " + item.id.split("-")[1]
              );
            }
          });
        }
      });
    },

    async showToolTip() {
      console.log("HelloRoadMap");
      var title = $(this).find(".title");
      console.log(this);
      console.log(title);
      // if (!title.length) {
      //   $(this).append(
      //     '<span class="title">' + $(this).attr("title") + "</span>"
      //   );
      // } else {
      //   title.remove();
      // }
    },

    /**
     *
     *
     * @param {*} ruleID
     * @param {*} id
     * @param {*} classe
     * @param {*} specific
     * @param {*} page
     * @param {*} footerAmount
     * @param {*} stockName
     */
    async storemarkColor(ruleID, id, classe, specific, page, stockName) {
      // ruleID 8
      // id btc1firstdigit - 0
      // classe firstdigit
      // specific firstdigit - 0
      // page fullscreen
      // stockName btc1

      try {
        // check the valueAmout is  >= 100
        if (page === "fullscreen") {
          if (this.getFooterBetAmount >= 10) {
            this.$soundEffect("betting");

            // $("#" + id).addClass("betSelected");
            if (this.checkFooterBetAmount) {
              // Total Confirm Amount
              const TotalAmount = this.getAllSelectedBettingAmount(this.getGameUUIDByStockName(stockName))
                ?  this.getAllSelectedBettingAmount(this.getGameUUIDByStockName(stockName))  + this.getFooterBetAmount
                : 0 + this.getFooterBetAmount;
              // Check current Balance is grater then Footer Bet Amount
              if (this.getUserBalance >= this.getFooterBetAmount) {
                var newBetAmount = this.getFooterBetAmount;
                if (this.getUserBalance <= TotalAmount) {
                  var newBetAmount =
                    this.getFooterBetAmount -
                    (TotalAmount - this.getUserBalance);
                }
                if (newBetAmount > 0) {
                  const betData = {
                    id: id,
                    class: classe,
                    specificNumber: specific,
                    gameUUID: this.getGameUUIDByStockName(this.stockID),
                    ruleID: ruleID,
                    betAmount: newBetAmount,
                    stockName: stockName
                  };
                  this.setTempMultiGameBetData(betData);
                  if (!$("#" + id).hasClass(classe)) {
                    $("#" + id).addClass(classe + " " + id.split("-")[1]);
                  }
                  if (specific !== null) {
                    //  find the parent of small button in specific number
                    const parentBtn = "#" + id.split("-")[0];
                    if (!$(parentBtn).addClass(classe)) {
                      $(parentBtn).addClass(classe);
                    }
                    if (!$("#" + id).hasClass(specific)) {
                      $("#" + id).addClass(specific);
                    }
                  }
                } else {
                  swal({
                    title: window.$nuxt.$root.$t(
                      "notification.insufficientBalance"
                    ),
                    icon: "info",
                    confirmButtonText: window.$nuxt.$root.$t("msg.ok"),
                    showConfirmButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false
                  });
                }
              } else {
                swal({
                  title: window.$nuxt.$root.$t(
                    "notification.insufficientBalance"
                  ),
                  icon: "info",
                  confirmButtonText: window.$nuxt.$root.$t("msg.ok"),
                  showConfirmButton: true,
                  allowOutsideClick: false,
                  allowEscapeKey: false
                });
              }
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
};
