const jsonResult = require('~/data/result') // define the json result for the compare 
import { mapGetters, mapActions } from 'vuex'
export const BetResult = {
    computed: {
        ...mapGetters(["getItemsBetting"])
    },
    methods: {
        ...mapActions([
            "setCollegeButtonNumberParent",
        ]),
        /**
         *
         *
         * @param {*} result
         * @param {*} stockName
         * @param {*} betID
         * @param {*} betWin
         */
        betResult(result, stockName, betID, betWin) {

            // result 9510.87
            // stockName btc1
            // betID firstdigit - big
            // betWin firstdigitWin - big

            const lastDraw = result.substr(result.length - 2);
            const first = parseInt(lastDraw.slice(0, 1));
            const last = parseInt(lastDraw.slice(1, 2));
            const bothDigit = first + last;
            const twoDigit = lastDraw.slice(0, 1) + lastDraw.slice(1, 2);



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
                                    this.multipleResultTwoDigit(item, twoDigit, stockName, betID, betWin, item.name)
                                    break;
                                default:
                            }
                        }
                    })
                }
            })
            this.setCollegeButtonNumberParent('Can not find any bet') // make the button collage 
        },

        /**
         *
         *
         * @param {*} item
         * @param {*} number
         * @param {*} stockName
         * @param {*} betID
         * @param {*} betWin
         * @param {*} name
         */
        multipleResult(item, number, stockName, betID, betWin, name) {

            // item { rule: Array(1), name: "firstdigit-0" }
            // number 9
            // stockName btc1
            // betID firstdigit - 0
            // betWin firstdigitWin - 0
            // name firstdigit - 0

            const specificNumber = "#" + stockName + betID.split("-")[0]
            const result = item.rule.includes(number);
            if (result) {
                this.$soundEffect('win')
                $("#" + betWin).addClass('chip-animation');
                $("#" + stockName + betID).addClass(
                    betID.split("-")[0] + "-animation"
                );
                setTimeout(() => {
                    this.setCollegeButtonNumberParent("You are win") // try to set the difference value 
                    this.$soundEffect('win')
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
                    $("#" + stockName + betID).removeClass(name); // remove the name firstdigit-1 
                    $("#" + stockName + betID).removeClass(number); // remove the number 8
                    $("#" + betWin).removeClass('chip-animation');
                    $(specificNumber + 'Number').removeClass('chip-animation');
                    // this.collectCoin()
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
                this.setCollegeButtonNumberParent('You are lose in else false')
                $("#" + stockName + betID).removeClass(
                    betID.split("-")[0]
                );
                $("#" + stockName + betID).removeClass(name); // remove the name firstdigit-1 
                $("#" + stockName + betID).removeClass(number); // remove the number 8
            } else {
                $(specificNumber + 'Number').removeClass('chip-animation');
                $("#" + stockName + betID).removeClass(name); // remove the name firstdigit-1 
                $("#" + stockName + betID).removeClass(number); // remove the number 8
                this.setCollegeButtonNumberParent('You are lose in else' + specificNumber + '-' + number)
                $(specificNumber).removeClass(
                    betID.split("-")[0]
                );
                $("#" + stockName + betID).removeClass(
                    betID.split("-")[0]
                );
            }
        },

        /**
         *
         *
         * @param {*} item
         * @param {*} number
         * @param {*} stockName
         * @param {*} betID
         * @param {*} betWin
         * @param {*} name
         */
        multipleResultTwoDigit(item, number, stockName, betID, betWin, name) {
            const specificNumber = "#" + stockName + betID.split("-")[0] // create the variable for receive the value
            const result = item.rule.includes(number); // check the value is have or not in the json result
            if (result) {
                this.$soundEffect('win')

                $("#" + betWin).addClass('chip-animation');
                $(specificNumber + 'Number').addClass('chip-animation');
                $("#" + stockName + betID.split("-")[0]).addClass(
                    betID.split("-")[0] + "-animation"
                );
                $("#" + stockName + betID).addClass(
                    betID.split("-")[0] + "-animation"
                );

                setTimeout(() => {
                    this.setCollegeButtonNumberParent("You are win")

                    this.$soundEffect('win')

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

                    // this.collectCoin()
                    $("#" + betWin).removeClass('chip-animation');
                }, 5000);

            } else {
                $(specificNumber + 'Number').removeClass('chip-animation');
                this.setCollegeButtonNumberParent('You are lose in else' + specificNumber + '-' + number)
                $(specificNumber).removeClass(
                    betID.split("-")[0]
                );
                $("#" + stockName + betID).removeClass(
                    betID.split("-")[0]
                );
            }
            $(specificNumber + 'Number').removeClass('chip-animation');
        },


        // collection the coin when user win to the top 
        collectCoin() {
            let elements = document.getElementsByClassName("chip-animation");
            for (let i = 0; i < elements.length; i++) {
                let top =
                    elements[i].offsetParent.offsetParent.offsetTop +
                    elements[i].offsetParent.offsetTop +
                    62 +
                    elements[i].offsetParent.offsetParent.offsetParent.offsetParent
                    .offsetTop;
                let left =
                    elements[i].offsetParent.offsetParent.offsetParent.offsetParent
                    .offsetLeft + elements[i].offsetParent.offsetParent.offsetLeft;
                elements[i].style.position = "fixed";
                elements[i].style.top = top + "px";
                elements[i].style.left = left + "px";

                setTimeout(() => {
                    elements[i].style.transition = "left 1s linear, top 1s linear ";
                    elements[i].style.top =
                        document.getElementById("userBanlance").offsetTop + "px";
                    elements[i].style.left =
                        document.getElementById("userBanlance").offsetParent.offsetParent
                        .offsetLeft + "px";
                }, 1);
                // clear style
                setTimeout(() => {
                    elements[i].style.display = "none";
                    elements[i].style.top = 0;
                    elements[i].style.left = 0;
                    elements[i].style.transition = "left 0s linear, top 0s linear ";
                }, 1200);
            }
        },
    }
}