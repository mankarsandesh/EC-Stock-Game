import secureStorage from '~/plugins/secure-storage'
import Sound from "~/helpers/sound";

export const itemBetting = {

    mounted() {
        this.findItemBetting()
    },
    computed: {
        // check bet close using stockOpenOrClosed and timer
        checkBetClose() {
            if (
                this.getTimerByStockName(this.stockID) &&
                this.getTimerByStockName(this.stockID).stockStatus === "Closed"
            ) {
                return true;
            }
            // check 1 or 5 loop
            if (this.getStockLoop(this.stockID) === 5) {
                if (
                    this.getTimerByStockName(this.stockID) &&
                    this.getTimerByStockName(this.stockID).gameEndTimeCountDownInSec == 0
                ) {
                    this.clearDataMultiGameBet(5);
                }
                return (
                    this.getTimerByStockName(this.stockID) &&
                    this.getTimerByStockName(this.stockID).gameEndTimeCountDownInSec <= 60
                );
            } else {
                if (
                    this.getTimerByStockName(this.stockID) &&
                    this.getTimerByStockName(this.stockID).gameEndTimeCountDownInSec == 0
                ) {
                    this.clearDataMultiGameBet(1);
                }
                return (
                    this.getTimerByStockName(this.stockID) &&
                    this.getTimerByStockName(this.stockID).gameEndTimeCountDownInSec <= 20
                );
            }
        }


    },
    methods: {

        /**
         *
         *
         * @param {*} value
         */
        btnNumber(value) {
            value == this.number ? (this.number = null) : (this.number = value);
        },

        updateBet(items) {
            console.log("am here", items)
            const split = items.betRule.split("-");
            // small button
            $("#" + items.stock + items.betRule).addClass(items.betRule);
            // parent the button
            $("#" + items.stock + split[0]).addClass(split[0]);
        },


        findItemBetting() {

            const itemBetting = secureStorage.getItem("itemBetting")

            const array = JSON.parse(itemBetting)

            if (array) {

                array.map((item, index) => {

                    if (!$("#" + item.id).hasClass(item.class + ' ' + item.id.split("-")[1])) {

                        $("#" + item.id).addClass(item.class + ' ' + item.id.split("-")[1])

                    }
                })

            }

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
         */
        storemarkColor(ruleID, id, classe, specific, page, footerAmount) {

            // check the page only full screen can press the bet and color is come 
            // check the valueAmout is  >= 100  

            if (page === "fullscreen") {

                if (footerAmount >= 100) {

                    Sound.betTing();

                    if (!$("#" + id).hasClass(classe)) {

                        $("#" + id).addClass(classe + ' ' + id.split("-")[1])

                    }

                    if (specific !== null) {
                        //  find the parent of small button in specific number
                        const parentBtn = "#" + id.split("-")[0]

                        if (!$(parentBtn).addClass(classe)) {

                            $(parentBtn).addClass(classe)

                        }
                    }

                    // $("#" + ruleID).addClass('bg-btn-first');
                    if (this.checkFooterBetAmount) {
                        let betData = {
                            id: id,
                            class: classe,
                            specificNumber: '',
                            gameUUID: this.getGameUUIDByStockName(this.stockID),
                            ruleID: ruleID,
                            betAmount: this.getFooterBetAmount
                        };


                        this.setTempMultiGameBetData(betData);
                        // this.pushDataMultiGameBet(betData);
                        // console.warn(this.getMultiGameBet);
                    }
                }
            }

        },

    }
}