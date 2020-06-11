import secureStorage from '~/plugins/secure-storage'

class Betting {
    /**
     *
     *
     * @param {*} items
     * @memberof Betting
     */
    async cancelBettingClear(items) {
            try {
                if (items.length) {
                    items.map(item => {
                        $("#" + item.id.split("-")[0]).removeClass(item.class)
                        if ($("#" + item.id).hasClass(item.class)) {
                            secureStorage.removeItem("itemBetting")
                            $("#" + item.id).removeClass(item.class + ' ' + item.id.split("-")[1])
                        }
                    })
                }
            } catch (error) {
                console.log(error)
            }

        }
        /**
         *
         *
         * @memberof Betting
         */
    async clearBettingFailure() {
            try {

                const array = secureStorage.getItem("itemBetting")

                if (array.length) {

                    array.map(item => {

                        $("#" + item.id.split("-")[0]).removeClass(item.class)

                        if ($("#" + item.id).hasClass(item.class)) {

                            secureStorage.removeItem("itemBetting")

                            $("#" + item.id).removeClass(item.class + ' ' + item.id.split("-")[1])

                        }
                    })

                }

            } catch (error) {
                console.log(error)
            }
        }
        /**
         *
         *
         * @param {*} items
         * @memberof Betting
         */
    clearBettingSelect(items) {
        if (items.length) {
            items.map(item => {
                // betAmount: 100
                // class: "firstdigit"
                // gameUUID: "419bfdf8-720b-4d52-9052-38d8e12d946a"
                // id: "btc1firstdigit-big"
                // ruleID: 1
                // specificNumber: ""
                // stockName: "btc1"

                // Normal button bet
                // firstdigit big
                $("#" + item.id).removeClass(item.class)
                $("#" + item.id).removeClass(item.id.split("-")[1])

                //  parent spcific number 
                $("#" + item.id.split("-")[0]).removeClass(item.class)

                // small button bet
                // firstdigit 0 firstdigit-0
                $("#" + item.id).removeClass(item.class)
                $("#" + item.id).removeClass(item.specificNumber)
            })
        }
    }

}
export default Betting = new Betting