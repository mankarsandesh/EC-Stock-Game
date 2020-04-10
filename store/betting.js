import config from "../config/config.global";

const state = () => ({
  multiGameBet: [], // Store multi game bet
  multiGameBetSend: [], // Store multi game bet send
  footerBetAmount: 0, // Store footer bet amount
  onGoingBet: [], // store data betting
  isSendBetting: false
});

const mutations = {
  PUSH_DATA_MULTI_GAME_BET(state, payload) {
    state.multiGameBet.push(payload);
    state.multiGameBetSend.push(payload);
  },
  CLEAR_DATA_MULTI_GAME_BET_SEND(state) {
    state.multiGameBetSend = [];
  },
  CLEAR_DATA_MULTI_GAME_BET(state) {
    state.multiGameBet = [];
    state.footerBetAmount = 0;
    state.onGoingBet = [];
  },
  REMOVE_ALL_FOOTER_BET(state) {
    state.multiGameBet = [];
  },
  SET_FOOTER_BET_AMOUNT(state, payload) {
    state.footerBetAmount = parseInt(payload);
  },
  PUSH_DATA_ON_GOING_BET(state, payload) {
    state.onGoingBet.splice(0, 0, payload);
  },
  SET_IS_SEND_BETTING(state, value) {
    state.isSendBetting = value;
  }
};

const actions = {
  // Push data to multi game bet
  pushDataMultiGameBet({ commit }, payload) {
    commit("PUSH_DATA_MULTI_GAME_BET", payload);
  },
  // Clear data from multi game bet
  clearDataMultiGameBet({ commit }) {
    commit("CLEAR_DATA_MULTI_GAME_BET");
  },
  // Clear data from footer bet
  removeAllFooterBet({ commit }) {
    commit("REMOVE_ALL_FOOTER_BET");
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
  // Send bet data for multi game and footer bet on full screen
  async sendBetting(context) {
    console.log(context.state.multiGameBetSend);
    try {
      context.commit("SET_IS_SEND_BETTING", true);
      const betDatas = context.state.multiGameBetSend;
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
          portalProviderUUID: context.rootState.provider.portalProviderUUID,
          userUUID: context.rootState.provider.userUUID,
          version: config.version,
          betData: betDatas
        },
        {
          headers: config.header
        }
      );
      if (res.status && res.code == 200) {
        context.dispatch("setUserData", "provider");
        context.commit("SET_IS_SEND_BETTING", false);
        context.commit("CLEAR_DATA_MULTI_GAME_BET_SEND");
        let i = 0;
        let len = res.data.length;

        for (i; i < len; i++) {
          console.log(res.data[i], "final data");
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
          type:
            resultStatus.success >= resultStatus.failed ? "success" : "error",
          title: `<span style="color:green"> bet success ${resultStatus.success} </span> <span style="color:red;padding-left:10px"> bet failed ${resultStatus.failed} </span>`,
          showConfirmButton: true
        });
      } else {
        throw new Error(res.message);
      }
    } catch (ex) {
      this._vm.$swal({
        type: "error",
        title: `${ex.message}`,
        showConfirmButton: true
      });
      console.error(ex);
      context.commit("SET_IS_SEND_BETTING", false);
    }
  }
};

const getters = {
  // Get multi game bet
  getMultiGameBet(state) {
    return state.multiGameBet;
  },
  // Get multi game bet length
  getMultiGameBetLength(state) {
    return state.multiGameBet.length;
  },
  // Get amount of betting that has been confirmed
  getAllBettingAmount(state) {
    let amount1 = state.onGoingBet
      .map(x => x.betAmount)
      .reduce((a, b) => a + b, 0);
    let amount2 = state.multiGameBet
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
    return getAmount(state.multiGameBet);
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
    function getAmounts(object) {
      // find stockId
      if (object.findIndex(x => x.stock === data.ruleID) == -1) return 0;
      // get data by stockId
      let stockIdObject = object.filter(x => x.stock === data.ruleID);
      // check rule in stockId
      if (stockIdObject.findIndex(x => x.rule === data.ruleID) == -1) return 0;
      // get amount by rule
      let result = stockIdObject
        .filter(x => x.rule === data.ruleID)
        .map(x => x.betAmount)
        .reduce((a, b) => a + b, 0);
      return parseInt(result);
    }
    return getAmount(state.multiGameBet);
  },
  // Get amount of specific bet number
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
      if (object.findIndex(x => x.gameUUID === data.gameUUID) == -1) return 0;
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
  // check the footer bet amount
  checkFooterBet(state) {
    if (state.footerBetAmount == 0) {
      return false;
    } else {
      return true;
    }
  },
  // Get the footer bet amount
  getFooterBetAmount(state) {
    return state.footerBetAmount;
  },
  // Get amount of betting that has already been confirm
  getBettingAmount(state) {
    return state.onGoingBet.map(x => x.betAmount).reduce((a, b) => a + b, 0);
  },

  // Get on going bet data
  getOnGoingBet(state) {
    return state.onGoingBet;
  },
  // Get Is send betting status
  getIsSendBetting(state) {
    return state.isSendBetting;
  },
  // Get amount by rule id
  getBetAmountRuleID: state => data => {
    return 0;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
