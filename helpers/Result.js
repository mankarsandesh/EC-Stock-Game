const jsonResult = require('~/data/result')
import sound from "~/helpers/sound"
class Result {
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
                                this.multipleResult(item, first, stockName, betID, betWin)
                                break;
                            case 'lastdigit':
                                this.multipleResult(item, last, stockName, betID, betWin)
                                break;
                            case 'bothdigit':
                                this.multipleResult(item, bothDigit, stockName, betID, betWin)
                                break;
                            case 'twodigit':
                                this.multipleResult(item, twoDigit, stockName, betID, betWin)
                                break;
                            default:
                        }
                    }
                })

            }
        })
    }

    // Multiple Result 
    multipleResult(item, number, stockName, betID, betWin) {
        const result = item.rule.includes(number);
        if (result) {
            sound.winBet(); // sound when user win the bet
            console.log('This is the stock name', stockName)
            $("#" + betWin).addClass(betWin);
            $("#" + stockName + betID).addClass(
                betID.split("-")[0] + "-animation"
            );
            setTimeout(() => {
                sound.winBet(); // sound when user win the bet
                $("#" + stockName + betID).removeClass(
                    betID.split("-")[0]
                );
                $("#" + betWin).removeClass(betWin);
                $("#" + stockName + betID).removeClass(
                    betID.split("-")[0] + "-animation"
                );
            }, 5000);
        } else {
            $("#" + stockName + betID).removeClass(
                betID.split("-")[0]
            );
            $("#" + betWin).removeClass(betWin);
        }

    }



    // get the stock detail from the bet button
    getIdStock(stock) {
        $("#" + stock).addClass("vongkeo"); //       
    }
}

export default Result = new Result


