import secureStorage from '~/plugins/secure-storage'
import { mapGetters, mapActions } from "vuex";
import Betting from "~/helpers/betting";

export const itemBetting = {
    mounted() {
        this.findItemBetting()
    },
    computed: {
        /**
         *
         *
         * @returns
         */
        checkBetClose() {
            const stockTime = this.getTimerByStockName(this.stockID)
            if (
                stockTime &&
                stockTime.stockStatus === "Closed"
            ) {
                return true;
            }

            if (
                stockTime &&
                stockTime.gameEndTimeCountDownInSec === 0
            ) {
                this.clearTempMultiGameBetData()

                this.clearItemBetting()

                secureStorage.removeItem("itemBetting")
            }



            // check 1 or 5 loop
            if (this.getStockLoop(this.stockID) === 5) {
                if (
                    stockTime &&
                    stockTime.gameEndTimeCountDownInSec === 0
                ) {
                    this.clearDataMultiGameBet(5);
                }
                if (stockTime &&
                    stockTime.gameEndTimeCountDownInSec <= 60) {

                    if (stockTime &&
                        stockTime.gameEndTimeCountDownInSec === 60) {
                        $(".closepopper").click()
                        this.clearTempMultiGameBetData()
                    }
                    return true
                } else {
                    return false
                }

            } else {
                if (
                    stockTime &&
                    stockTime.gameEndTimeCountDownInSec === 0
                ) {
                    this.clearDataMultiGameBet(1);
                }
                if (stockTime &&
                    stockTime.gameEndTimeCountDownInSec <= 20) {

                    if (stockTime &&
                        stockTime.gameEndTimeCountDownInSec === 20) {
                        $(".closepopper").click()
                        this.clearTempMultiGameBetData()
                    }

                    return true
                } else {
                    return false
                }
            }
        }


    },
    methods: {
        ...mapActions([
            "clearTempMultiGameBetData",
            "clearItemBetting",
            "clearTempMultiGameBetData"
        ]),
        /**
         *
         *
         * @param {*} value
         */
        btnNumber(value) {
            value == this.number ? (this.number = null) : (this.number = value);
        },

        updateBet(items) {
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
         * @param {*} stockName
         */
        async storemarkColor(ruleID, id, classe, specific, page, stockName) {
            try {
                // check the page only full screen can press the bet and color is come 
                // check the valueAmout is  >= 100  

                if (page === "fullscreen") {

                    if (this.getFooterBetAmount >= 100) {


                        this.$soundEffect("betting");

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
                                betAmount: this.getFooterBetAmount,
                                stockName: stockName,
                            };
                            this.setTempMultiGameBetData(betData);
                            // this.pushDataMultiGameBet(betData);
                            // console.warn(this.getMultiGameBet);
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            }


        },

    }
}