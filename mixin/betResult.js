const jsonResult = require("~/data/result");
import sound from "~/helpers/sound";
import { mapMutations, mapGetters } from "vuex";
// define a mixin object
export const BetResult = {
  computed: {
    ...mapGetters(["parentFirst"])
  },
  methods: {
    ...mapMutations(["SET_FIRST"]),
    betResult(result, stockName, betID, betWin) {
      // result, stockName , betID , betWin
      const lastDraw = result.substr(result.length - 2); //get the last two digit
      const first = parseInt(lastDraw.slice(0, 1)); // get the first digit number
      const last = parseInt(lastDraw.slice(1, 2)); // get the last digit number
      const bothDigit = first + last; // get the both digit number
      const twoDigit = lastDraw.slice(0, 1) + lastDraw.slice(1, 2); // git the two digit number
      jsonResult.resultBet.map((items, index) => {
        if ($("#" + stockName + betID).hasClass(items.type)) {
          items.rules.map((item, index) => {
            if ($("#" + stockName + betID).hasClass(item.name)) {
              switch (items.type) {
                case "firstdigit":
                  this.multipleResult(item, first, stockName, betID, betWin);
                  break;
                case "lastdigit":
                  this.multipleResult(item, last, stockName, betID, betWin);
                  break;
                case "bothdigit":
                  this.multipleResult(
                    item,
                    bothDigit,
                    stockName,
                    betID,
                    betWin
                  );
                  break;
                case "twodigit":
                  this.multipleResult(item, twoDigit, stockName, betID, betWin);
                  break;
                default:
              }
            }
          });
        }
      });
      this.SET_FIRST("Can not find any bet");
    },
    // Multiple Result
    multipleResult(item, number, stockName, betID, betWin) {
      const result = item.rule.includes(number);
      if (result) {
        this.findNumber(betID, betWin); // find the name of digit
        sound.winBet(); // sound when user win the bet
        $("#" + betWin).addClass(betWin);
        $("#" + stockName + betID).addClass(betID.split("-")[0] + "-animation");
        $("#" + this.StockResult).addClass(betID.split("-")[0] + "-animation"); //
        setTimeout(() => {
          this.SET_FIRST("You are win");
          sound.winBet(); // sound when user win the bet
          $("#" + stockName + betID).removeClass(betID.split("-")[0]);
          // $("#" + betWin).removeClass(betWin);   // Macky will move the chip
          $("#" + stockName + betID).removeClass(
            betID.split("-")[0] + "-animation"
          );
          $("#" + this.StockResult).removeClass(
            betID.split("-")[0] + "-animation"
          ); //

          $("#" + this.parentFirst).removeClass(
            betID.split("-")[0] + "-animation"
          );
          // $("#" + this.parentFirst + 'Number').removeClass(betWin);  // Macky will move the chip
          $("#" + this.parentFirst).removeClass(betID.split("-")[0]);
        }, 5000);
      } else {
        this.SET_FIRST("You are lose");
        $("#" + this.StockResult).removeClass(betID.split("-")[0]); //
        $("#" + stockName + betID).removeClass(betID.split("-")[0]);
        $("#" + betWin).removeClass(betWin);
        // $("#" + this.parentFirst).removeClass(betID.split("-")[0]);   // remove the chip and bring if user not win
      }
    },

    findNumber(nameRule, betWin) {
      jsonResult.resultBet.map((items, index) => {
        items.rules.map((item, index) => {
          if (item.name === nameRule) {
            $("#" + this.parentFirst).addClass(nameRule.split("-")[0]);
            $("#" + this.parentFirst + "Number").addClass(betWin);
            $("#" + this.parentFirst).addClass(
              nameRule.split("-")[0] + "-animation"
            );
          } else {
            // $("#" + this.parentFirst).removeClass(nameRule.split("-")[0]);
            this.SET_FIRST("You are not bet on the number");
          }
        });
      });
    }
  }
};
