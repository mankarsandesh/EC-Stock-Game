import secureStorage from '~/plugins/secure-storage'
import { mapActions } from "vuex";
const jsonResult = require('~/data/result') // define the json result for the compare 

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

        /**
         *
         *
         * @param {*} items
         */
        async updateBet(items) {
            try {
                // active-firstdigit
                // select the class of the paret button
                // parent the button
                if (!$("#" + items.id.split("-")[0]).hasClass(items.class)) {
                    $("#" + items.id.split("-")[0]).addClass(items.class)
                }
                // small button
                $("#" + items.id).addClass(items.betRule);
            } catch (error) {
                console.error(error)
            }

        },


        findItemBetting() {
            const array = secureStorage.getItem("itemBetting")
            jsonResult.resultBet.map((items, index) => {
                if (array) {
                    array.map((item, index) => {
                        if (item.class === items.type) {
                            if (!$("#" + item.id.split("-")[0]).hasClass(item.class)) {
                                $("#" + item.id.split("-")[0]).addClass(item.class)
                            }
                        }
                        if (!$("#" + item.id).hasClass(item.class + ' ' + item.id.split("-")[1])) {
                            $("#" + item.id).addClass(item.class + ' ' + item.id.split("-")[1])

                        }
                    })
                }

            })


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