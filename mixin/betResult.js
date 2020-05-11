const jsonResult = require('~/data/result')
import sound from "~/helpers/sound"
import { mapMutations, mapGetters } from 'vuex'
// define a mixin object
export const BetResult = {
    methods: {
        ...mapMutations(["SET_FIRST"]),
        betResult(result, stockName, betID, betWin) { // result, stockName , betID , betWin           
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
                                case 'firstdigit':
                                    this.multipleResult(item, first, stockName, betID, betWin, item.name)
                                    break;
                                case 'lastdigit':
                                    this.multipleResult(item, last, stockName, betID, betWin, item.name)
                                    break;
                                case 'bothdigit':
                                    this.multipleResult(item, bothDigit, stockName, betID, betWin, item.name)
                                    break;
                                case 'twodigit':
                                    this.multipleResult(item, twoDigit, stockName, betID, betWin, item.name)
                                    break;
                                default:
                            }
                        }
                    })

                }
            })
            this.SET_FIRST('Can not find any bet')
        },
        // Multiple Result 
        multipleResult(item, number, stockName, betID, betWin, name) {
            // console.log("This is the item", item)
            // console.log("This is the number", number)
            // console.log("This is the stockName", stockName)
            // console.log("This is the betID", betID)
            // console.log("This is the betWin", betWin)
            // console.log("This is the name", name)
            const specificNumber = "#" + stockName + betID.split("-")[0]
            const result = item.rule.includes(number);
            if (result) {
                sound.winBet(); // sound when user win the bet              
                $("#" + betWin).addClass(betWin);
                $("#" + stockName + betID).addClass(
                    betID.split("-")[0] + "-animation"
                );
                $(specificNumber).addClass(betID.split("-")[0]);
                $(specificNumber + 'Number').addClass(betWin);
                $(specificNumber).addClass(
                    betID.split("-")[0] + "-animation"
                );
                $("#" + this.StockResult).addClass(betID.split("-")[0] + "-animation"); //         
                setTimeout(() => {
                    this.SET_FIRST("You are win")
                    sound.winBet(); // sound when user win the bet
                    $("#" + stockName + betID).removeClass(
                        betID.split("-")[0]
                    );
                    // $("#" + betWin).removeClass(betWin);   // Macky will move the chip
                    $("#" + stockName + betID).removeClass(
                        betID.split("-")[0] + "-animation"
                    );
                    $("#" + this.StockResult).removeClass(betID.split("-")[0] + "-animation"); //   

                    $(specificNumber).removeClass(
                        betID.split("-")[0] + "-animation"
                    );
                    // $(specificNumber + 'Number').removeClass(betWin);  // Macky will move the chip
                    $(specificNumber).removeClass(
                        betID.split("-")[0]);
                }, 5000);
            } else if ($(specificNumber).hasClass(name) == false) {
                this.SET_FIRST('You are lose else if')
                $('#' + stockName + betID).removeClass(betID.split("-")[0]);
                $(specificNumber).removeClass(betID.split("-")[0]);   // remove the chip and bring if user not win
            } else {
                this.SET_FIRST('You are lose in else')
                this.SET_FIRST(null)
                $(stockName + betID).removeClass(betID.split("-")[0]);
                $("#" + this.StockResult).removeClass(betID.split("-")[0]);
                $("#" + stockName + betID).removeClass(
                    betID.split("-")[0]
                );
                $("#" + betWin).removeClass(betWin);
            }
        }
    }
}