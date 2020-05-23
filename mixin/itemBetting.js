import secureStorage from '~/plugins/secure-storage'
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

            if (itemBetting !== undefined && itemBetting !== null) {

                const keys = Object.values(itemBetting)

                keys.map((item, index) => {

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
         */
        storemarkColor(ruleID, id, classe, specific) {

            console.log("This is the  ruleID", ruleID);

            console.log("This is the  id", id);

            console.log("This is the classe", classe);

            console.log("This is the specific", specific);

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
                    specificNumber: 'devla Media',
                    gameUUID: this.getGameUUIDByStockName(this.stockID),
                    ruleID: ruleID,
                    betAmount: this.getFooterBetAmount
                };
                this.setTempMultiGameBetData(betData);
                // this.pushDataMultiGameBet(betData);
                // console.warn(this.getMultiGameBet);
            }
        },

    }
}