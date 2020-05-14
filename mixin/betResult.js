const jsonResult = require('~/data/result') // define the json result for the compare 
import sound from "~/helpers/sound"   // import the sound helper 
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
            this.SET_FIRST('Can not find any bet') // make the button collage 
        },
        // Multiple Result 
        multipleResult(item, number, stockName, betID, betWin, name) {
            const specificNumber = "#" + stockName + betID.split("-")[0]  // create the variable for receive the value
            // console.log("This is the item", item)
            // console.log("This is the number", number)
            // console.log("This is the stockName", stockName)
            // console.log("This is the betID", betID)
            // console.log("This is the betWin", betWin)
            // console.log("This is the name", name)
            // console.log("This is the specificNumber", specificNumber)
            const result = item.rule.includes(number); // check the value is have or not in the json result
            if (result) {
                sound.winBet(); // sound when user win the bet              
                $("#" + betWin).addClass('chip-animation');
                $("#" + stockName + betID).addClass(
                    betID.split("-")[0] + "-animation"
                );

                setTimeout(() => {
                    this.SET_FIRST("You are win")

                    sound.winBet(); // sound when user win the bet
                    $("#" + stockName + betID).removeClass(
                        betID.split("-")[0]
                    );
                    $("#" + stockName + betID).removeClass(
                        betID.split("-")[0] + "-animation"
                    );
                    $(specificNumber).removeClass(
                        betID.split("-")[0] + "-animation"
                    );
                    $(specificNumber).removeClass(
                        betID.split("-")[0]);

                }, 5000);

            } else if ($(specificNumber + '-' + number).hasClass(betID.split("-")[0])) {
                $(specificNumber).addClass(betID.split("-")[0]);
                $(specificNumber).addClass(
                    betID.split("-")[0] + "-animation"
                );

                $(specificNumber).addClass(
                    betID.split("-")[0]
                );

                $(specificNumber + 'Number').addClass('chip-animation');
                this.SET_FIRST('You are lose in else false')
                console.log('You win from  ', specificNumber + '-' + number)

                $("#" + stockName + betID).removeClass(
                    betID.split("-")[0]
                );
            } else {
                console.log('===========The result is ==========')
                console.log('The result is : ', specificNumber + '-' + number)
                console.log('===========The result is ==========')
                this.SET_FIRST('You are lose in else' + specificNumber + '-' + number)
                $(specificNumber).removeClass(
                    betID.split("-")[0]
                );
                $("#" + stockName + betID).removeClass(
                    betID.split("-")[0]
                );
            }
        }
    }
}
