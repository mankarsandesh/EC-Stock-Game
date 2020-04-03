import config from "../../../config/config.global";

const state = {
    multiGameBet: [],
    multiGameBetsend: [],
    footerBetAmount: 0,
    // store data betting
    onGoingBet: [],
    isSendBetting: false,
}

const mutations = {
    PUSH_DATA_MULTI_GAME_BET(state, payload) {
        state.multiGameBet.push(payload);
        state.multiGameBetsend.push(payload);
    },
    CLEAR_DATA_MULTI_GAME_BET_SEND(state) {
        state.multiGameBetsend = [];
    },
    CLEAR_DATA_MULTI_GAME_BET(state) {
        state.multiGameBet = [];
        state.footerBetAmount = 0;
        state.onGoingBet = [];
        // console.warn(state.multiGameBet);
    },
    REMOVE_ALL_FOOTER_BET(state) {
        state.multiGameBet = [];
    },
    SET_FOOTER_BET_AMOUNT(state, payload) {
        state.footerBetAmount = parseInt(payload);
    },
    // push data to on going bet
    PUSH_DATA_ON_GOING_BET(state, payload) {
        state.onGoingBet.splice(0, 0, payload);
    },
    SET_IS_SEND_BETTING(state, value) {
        state.isSendBetting = value;
    },
}

const actions = {
    pushDataMultiGameBet({ commit }, payload) {
        commit('PUSH_DATA_MULTI_GAME_BET', payload);
    },
    clearDataMultiGameBet({ commit }) {
        commit('CLEAR_DATA_MULTI_GAME_BET');
    },
    removeAllFooterBet({ commit }) {
        commit('REMOVE_ALL_FOOTER_BET');
    },
    setFooterBetAmount({ commit }, payload) {
        commit('SET_FOOTER_BET_AMOUNT', payload);
    },
    pushDataOnGoingBet({ commit }, payload) {
        commit('PUSH_DATA_ON_GOING_BET', payload);
    },
    // send bet data for multigame and footer bet on full screen
    async sendBetting(context) {
        // set sendbetting = true
        // to show loading
        try {
          context.commit("SET_IS_SEND_BETTING", true);
          const betDatas = context.state.multiGameBetsend;
          if (betDatas.length == 0) {
            context.commit("SET_IS_SEND_BETTING", false);
            this._vm.$swal({
              type: "error",
              title: `Sorry, No Betting...!`,
              showConfirmButton: false,
              timer: 1500
            });
            return;
          }
          const res = await this.$axios.$post(
            config.storeBet.url,
            {
              portalProviderUUID: context.state.portalProviderUUID,
              userUUID: context.state.userUUID,
              version: config.version,
              betData: betDatas
            },
            {
              headers: config.header
            }
          );
          if (res.status && res.code == 200) {
            context.dispatch("asynUserInfo");
            console.log(res);
            context.commit("SET_IS_SEND_BETTING", false);
            context.commit("CLEAR_DATA_MULTI_GAME_BET_SEND");
            this._vm.$swal({
              type: "success",
              title: res.message,
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            context.commit("SET_IS_SEND_BETTING", false);
            this._vm.$swal({
              type: "error",
              title: `error ${res.message}`,
              showConfirmButton: true
            });
          }
        } catch (ex) {
          console.error(ex);
          context.commit("SET_IS_SEND_BETTING", false);
        }
    }
}

const getters = {
    getMultiGameBet(state) {
        return state.multiGameBet;
    },
    // get multiGameBet length
    getMultiGameBetLength(state) {
        return state.multiGameBet.length;
    },
    // get amount of betting already confirmed and not confirm show on multi game and full screen
    getAllBettingAmount(state) {
        let amount1 = state.onGoingBet
          .map(x => x.betAmount)
          .reduce((a, b) => a + b, 0);
        let amount2 = state.multiGameBet
          .map(x => x.betAmount)
          .reduce((a, b) => a + b, 0);
        return amount1 + amount2;
    },
    getAmountBettingByStockId: state => gameUUID => {
        function getAmount(object) {
          // find stockname
          if (object.findIndex(x => x.gameUUID === gameUUID) == -1) return 0;
          let result = object
            .filter(x => x.gameUUID === gameUUID)
            .map(x => x.betAmount)
            .reduce((a, b) => a + b, 0);
          return parseInt(result);
        }
        return getAmount(state.multiGameBet);
    },
    // get bet amount for ech game rule to show on chip
    getAmountMultiGameBet: state => data => {
        // get total bottom bet amount
        function getAmount(object) {
          // check gameUUID is exist or not,if not return 0
          if (object.findIndex(x => x.gameUUID == data.gameUUID) == -1)
            return 0;
          // get data by gameUUID and store in 'oneGameUUID'
          let oneGameUUID = object.filter(x => x.gameUUID === data.gameUUID);
          // check there is ruleid in gameUUID or not,if no has return 0
          if (oneGameUUID.findIndex(x => x.ruleID === data.ruleID) == -1)
            return 0;
          // get gameUUID by from 'oneGameUUID'
          let result = oneGameUUID
            .filter(x => x.ruleID === data.ruleID)
            .map(x => x.betAmount)
            .reduce((a, b) => a + b, 0);
          return parseInt(result);
        }
        function getAmounts(object) {
          // find stockId
          if (object.findIndex(x => x.stock === data.ruleID) == -1) return 0;
          // get data by stockId
          let stockIdObject = object.filter(x => x.stock === data.ruleID);
          // check rule in stockId
          if (stockIdObject.findIndex(x => x.rule === data.ruleID) == -1)
            return 0;
          // get amount by rule
          let result = stockIdObject
            .filter(x => x.rule === data.ruleID)
            .map(x => x.betAmount)
            .reduce((a, b) => a + b, 0);
          return parseInt(result);
        }
        return getAmount(state.multiGameBet);
    },
    getAmountBetSpecificNumber: state => data => {
        let start = 2000;
        let end = 2000;
        if (data.ruleID === "firstdigit") {
          start = 8;
          end = 17;
        } else if (data.ruleID === "lastdigit") {
          start = 25;
          end = 34;
        } else if (data.ruleID === "bothdigit") {
          start = 149;
          end = 167;
        } else {
          start = 42;
          end = 141;
        }
        function getAmount(object) {
          let count = 9;
          // find stockId
          if (object.findIndex(x => x.gameUUID === data.gameUUID) == -1)
            return 0;
          // get data by stockId
          let stockIdObject = object.filter(x => x.gameUUID === data.gameUUID);
          // check rule in stockId
          // if (stockIdObject.findIndex(x => x.betId === data.betId) == -1) return 0
          // get amount by rule
          let result = 0;
          for (let i = 0; i <= count; i++) {
            result =
              result +
              stockIdObject
                .filter(x => x.ruleID >= start && x.ruleID <= end)
                .map(x => x.betAmount)
                .reduce((a, b) => a + b, 0);
          }
          return result;
        }
        return getAmount(state.multiGameBet);
        //  + getAmount(state.onGoingBet);
    },
    checkFooterBet(state) {
        if (state.footerBetAmount == 0) {
          return false;
        } else {
          return true;
        }
    },
    getFooterBetAmount(state) {
        return state.footerBetAmount;
    },
    // get amount of betting that already confirm
    getBettingAmount(state) {
        return state.onGoingBet
          .map(x => x.betAmount)
          .reduce((a, b) => a + b, 0);
      },
      
    // get data betting
    getOnGoingBet(state) {
        return state.onGoingBet;
    },
    //get betting data
    getOnBetting(state) {
        return state.onGoingBet;
    },
    getIsSendBetting(state) {
        return state.isSendbetting;
    },
    getBetAmountRuleID: state => data => {
        return 0
    },
}

export default {
    state,
    mutations,
    actions, 
    getters
}