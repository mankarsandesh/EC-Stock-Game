import config from "../config/config.global";
import secureStorage from "../plugins/secure-storage";
const itemBetting = secureStorage.getItem("itemBetting");
const state = () => ({
    collegeBtnNumber: null,
    chipConfirms: itemBetting ? itemBetting : [],
    multiGameBetSend: [], // Store multi game bet send
    footerBetAmount: 0, // Store footer bet amount
    onGoingBet: [], // store data betting
    isSendBetting: false,
    multiGameFooterBetAmount: 0, // Store multi game footer bet amount
    tempMultiGameBetData: [], // Store temp bet data of multi game until the bet is ent to the server,
    getItemsBetting: [],
    bettingConfirm: itemBetting ? itemBetting : [], // after confirm 
    selectBetting: [] // for select the betting
});

const getters = {
    //  use for get the betting after confirm 
    bettingConfirm: state => state.bettingConfirm,
    // use for get the select betting 
    selectBetting: state => state.selectBetting,

    getItemsBetting: state => state.getItemsBetting,
    // make the college the small bettin digit button 
    getCollegeBtnNumber: state => state.collegeBtnNumber,
    // Get multi game bet
    getMultiGameBet: state => state.chipConfirms,
    // Get multi game bet length
    getMultiGameBetLength: state => state.chipConfirms.length,
    // Get on going bet data
    getOnGoingBet: state => state.onGoingBet,
    // Get Is send betting status
    getIsSendBetting: state => state.isSendBetting,

    getMultiGameFooterBetAmount: state => state.multiGameFooterBetAmount,

    gettempMultiGameBetData: state => state.tempMultiGameBetData,

    getmultiGameBet: state => state.chipConfirms,
    // Get the footer bet amount
    getFooterBetAmount(state) {
        return state.footerBetAmount;
    },
    // Get amount of betting that has been confirmed
    getAllBettingAmount(state) {
        let amount1 = state.onGoingBet
            .map(x => x.betAmount)
            .reduce((a, b) => a + b, 0);
        let amount2 = state.chipConfirms
            .map(x => x.betAmount)
            .reduce((a, b) => a + b, 0);
        return amount1 + amount2;
    },
    // Get amount of betting by stock Id
    getAmountBettingByStockId: state => gameUUID => {
        function getAmount(object) {
            // find stock name
            if (object.findIndex(x => x.gameUUID === gameUUID) == -1) return 0;
            let result = object
                .filter(x => x.gameUUID === gameUUID)
                .map(x => x.betAmount)
                .reduce((a, b) => a + b, 0);
            return parseInt(result);
        }
        return getAmount(state.chipConfirms);
    },
    // Get bet amount for ech game rule to show on chip
    getAmountMultiGameBet: state => data => {
        // get total bottom bet amount
        function getAmount(object) {
            // check gameUUID is exist or not,if not return 0
            if (object.findIndex(x => x.gameUUID == data.gameUUID) == -1) {
                return 0;
            }
            // get data by gameUUID and store in 'oneGameUUID'
            let oneGameUUID = object.filter(x => x.gameUUID === data.gameUUID);
            // check there is rule id in gameUUID or not,if no has return 0
            if (oneGameUUID.findIndex(x => x.ruleID === data.ruleID) == -1) return 0;
            // get gameUUID from 'oneGameUUID'
            let result = oneGameUUID
                .filter(x => x.ruleID === data.ruleID)
                .map(x => x.betAmount)
                .reduce((a, b) => a + b, 0);
            return parseInt(result);
        }
        return getAmount(state.chipConfirms);
    },
    // Get amount of specific bet number
    getAmountBetSpecificNumber: state => data => {
        // get total bottom bet amount
        function getAmount(object) {
            // check gameUUID is exist or not,if not return 0
            if (object.findIndex(x => x.gameUUID == data.gameUUID) == -1) {
                return 0;
            }
            // get data by gameUUID and store in 'oneGameUUID'
            let oneGameUUID = object.filter(x => x.gameUUID === data.gameUUID);
            // check there is rule id in gameUUID or not,if no has return 0
            if (oneGameUUID.findIndex(x => x.specificNumber === data.ruleID) == -1)
                return 0;
            // get gameUUID from 'oneGameUUID'
            let result = oneGameUUID
                .filter(x => x.specificNumber === data.ruleID)
                .map(x => x.betAmount)
                .reduce((a, b) => a + b, 0);
            return parseInt(result);
        }
        return getAmount(state.chipConfirms);
        //  + getAmount(state.onGoingBet);
    },
    // check the footer bet amount
    checkFooterBetAmount(state) {
        if (state.footerBetAmount == 0) {
            return false;
        } else {
            return true;
        }
    },
    // Get amount of betting that has already been confirm
    getBettingAmount(state) {
        return state.onGoingBet.map(x => x.betAmount).reduce((a, b) => a + b, 0);
    },

    // Get amount by rule id
    getBetAmountRuleID: state => data => {
        return 0;
    },
    getTempMultiGameBetAmount(state) {
        if (!state.tempMultiGameBetData.length > 0) {
            return 0;
        }
        let amount = 0;
        state.tempMultiGameBetData.forEach(betData => {
            amount += betData.betAmount;
        });
        return amount;
    },

};
const mutations = {
    SET_MULTI_GAME_FOOTER_BET_AMOUNT(state, payload) {
        state.multiGameFooterBetAmount = payload;
    },
    CLEAR_ITEMS_BETTING(state) {
        state.getItemsBetting = [];
    },
    SET_ITEMS_BETTING(state, payload) {
        state.getItemsBetting.push(payload);
        secureStorage.setItem("itemBetting", state.getItemsBetting)
    },
    SET_COLLEGE_BUTTON_NUMBER(state, payload) {
        state.collegeBtnNumber = payload;
    },
    PUSH_DATA_MULTI_GAME_BET(state, payload) {
        state.chipConfirms.push(payload);
        state.multiGameBetSend.push(payload);
    },
    CLEAR_DATA_MULTI_GAME_BET_SEND(state) {
        console.log('CLEAR_DATA_MULTI_GAME_BET_SEND')
        state.multiGameBetSend = [];
    },
    CLEAR_DATA_MULTI_GAME_BET(state) {
        state.chipConfirms = [];
        state.onGoingBet = [];
    },
    SET_FOOTER_BET_AMOUNT(state, payload) {
        if (state.footerBetAmount + parseInt(payload) > 10000) {
            state.footerBetAmount = parseInt(payload);
        } else {
            state.footerBetAmount += parseInt(payload);
        }
    },
    PUSH_DATA_ON_GOING_BET(state, payload) {
        state.onGoingBet.splice(0, 0, payload);
    },
    SET_IS_SEND_BETTING(state, value) {
        state.isSendBetting = value;
    },

    SET_TEMP_MULTI_GAME_BET_DATA(state, payload) {
        state.selectBetting.push(payload);
        state.tempMultiGameBetData.push(payload);
    },

    CONFIRM_TEMP_MULTI_GAME_BET_DATA(state) {
        state.multiGameBetSend.push(...state.selectBetting);
        state.chipConfirms.push(...state.selectBetting);
        secureStorage.setItem("itemBetting", state.multiGameBetSend)
        state.selectBetting = [];


    },
    CLEAR_TEMP_MULTI_GAME_BET_DATA(state) {
        state.tempMultiGameBetData = [];
    },
    CLEAR_BET_VALUE_FOOTER_BET(state) {
        state.footerBetAmount = 0;
    },
    SET_CONFIRM_BETTING(state, payload) {
        state.chipConfirms.push(payload)
        state.tempMultiGameBetData.push(payload);
        secureStorage.setItem("itemBetting", state.tempMultiGameBetData)
    },

    CONFIRM_BETTING(state, payload) {
        state.chipConfirms.push(payload)
        state.bettingConfirm.push(payload)
        secureStorage.setItem("itemBetting", state.bettingConfirm)
    },

    CLEAR_SELECT_BETTING(state) {
        state.selectBetting = []
    },
};
const actions = {
    // action from after confirm betting
    setConfirmBetting({ commit }, payload) {
        commit("CONFIRM_BETTING", payload)
    },

    setBettingOnConfirm({ commit }, payload) {
        commit("SET_CONFIRM_BETTING", payload)
    },
    clearItemBetting({ commit }) {
        commit("CLEAR_ITEMS_BETTING");
    },
    setItemBetting({ commit }, payload) {
        commit("SET_ITEMS_BETTING", payload);
    },
    setCollegeButtonNumberParent({ commit }) {
        commit("SET_COLLEGE_BUTTON_NUMBER");
    },
    setMultiGameFooterBetAmount({ commit }, payload) {
        commit("SET_MULTI_GAME_FOOTER_BET_AMOUNT", payload);
    },
    // Push data to multi game bet
    pushDataMultiGameBet({ commit }, payload) {
        commit("PUSH_DATA_MULTI_GAME_BET", payload);
    },
    // Clear data from multi game bet
    clearDataMultiGameBet({ commit }) {
        commit("CLEAR_DATA_MULTI_GAME_BET");
    },
    // Set the footer bet amount
    setFooterBetAmount({ commit }, payload) {
        commit("SET_FOOTER_BET_AMOUNT", payload);
    },
    // Push data to ongoing bet
    pushDataOnGoingBet({ commit }, payload) {
        commit("PUSH_DATA_ON_GOING_BET", payload);
    },
    // Clear data from multi game bet send
    clearDataMultiGameBetSend({ commit }) {
        commit("CLEAR_DATA_MULTI_GAME_BET_SEND");
    },
    // Set temporary multi game bet data
    setTempMultiGameBetData({ commit }, payload) {
        commit("SET_TEMP_MULTI_GAME_BET_DATA", payload);
    },
    // Move temporary multi game bet data to multi game bet
    confirmTempMultiGameBetData({ commit }) {
        commit("CONFIRM_TEMP_MULTI_GAME_BET_DATA");
    },
    clearTempMultiGameBetData({ commit }) {
        commit("CLEAR_TEMP_MULTI_GAME_BET_DATA");
    },
    clearBetValueFooterBet({ commit }) {
        commit("CLEAR_BET_VALUE_FOOTER_BET");
    },
    // Send bet data for multi game and footer bet on full screen
    async sendBetting(context) {
        try {
            context.commit("SET_IS_SEND_BETTING", true);
            const betDataFinal = context.state.multiGameBetSend;
            if (betDataFinal.length == 0) {
                context.commit("SET_IS_SEND_BETTING", false);
                this._vm.$swal({
                    type: "error",
                    title: `Sorry, No Betting...!`,
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }
            var reqBody = {
                portalProviderUUID: context.rootState.provider.portalProviderUUID,
                userUUID: context.rootState.provider.userUUID,
                version: config.version,
                betData: betDataFinal
            };
            var res = await this.$axios.$post(config.storeBet.url, reqBody, {
                headers: config.header
            });
            if (res.status && res.code == 200) {
                this.$soundEffect("betting");
                context.dispatch("setUserData", "provider");
                context.commit("CONFIRM_TEMP_MULTI_GAME_BET_DATA");
                context.commit("SET_IS_SEND_BETTING", false);
                // context.commit("CLEAR_DATA_MULTI_GAME_BET_SEND");
                let i = 0;
                let len = res.data.length;
                for (i; i < len; i++) {
                    context.commit("PUSH_DATA_ON_GOING_BET", res.data[i]);
                }
                // check betting false or true
                let resultStatus = {
                    success: 0,
                    failed: 0
                };
                res.data.forEach(element => {
                    if (element.status) {
                        resultStatus.success++;
                    } else {
                        resultStatus.failed++;
                    }
                });
                this._vm.$swal({
                    type: resultStatus.success >= resultStatus.failed ? "success" : "error",
                    title: `<span style="color:green"> bet success ${resultStatus.success} </span> <span style="color:red;padding-left:10px"> bet failed ${resultStatus.failed} </span>`,
                    showConfirmButton: false,
                    timer: 1000
                });
            } else {
                throw new Error(window.$nuxt.$root.$t("error.general"));
            }
        } catch (ex) {

            context.commit("CLEAR_DATA_MULTI_GAME_BET_SEND");

            console.error('Hello am herer')
            console.error(ex.message);
            context.commit("SET_IS_SEND_BETTING", false);
            this._vm.$swal({
                type: "error",
                title: `${ex.message}`,
                showConfirmButton: true
            });
        }
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};