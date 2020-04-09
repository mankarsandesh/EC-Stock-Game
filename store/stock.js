import config from "../config/config.global";
import stock from '../data/stockList'; 
const state = () => ({
  stocks: stock.stockList,
  stockCategory: [], // Store Stocks category
  stockListTimer: [] // Store stock list timer
});

const mutations = {
  SET_STOCK_CATEGORY(state, payload) {
    state.stockCategory = payload;
  },
  SET_STOCK_LIST_TIMER(state, payload) {
    state.stockListTimer.unshift(payload);
    if (state.stockListTimer.length === 3) {
      state.stockListTimer.pop();
    }
  },
  SET_STOCKS_DATA(state, payload) {
    state.stocks = payload;
  }
};

const actions = {
  // Set Stocks data
  async setStocksData(context) {
    try {
      const res = await this.$axios.$post(
        config.getStock.url,
        {
          portalProviderUUID: context.rootState.portalProviderUUID,
          version: config.version
        },
        {
          headers: config.header
        }
      );
      if (res.code === 200) {
        context.commit("SET_STOCKS_DATA", res.data);
      } else {
        throw new Error();
      }
    } catch (ex) {
      console.log(ex);
    }
  },
  // Set stocks category
  setStockCategory({ commit }, payload) {
    commit("SET_STOCK_CATEGORY", payload);
  },
  // Set stock list timer
  setStockListTimer({ commit }, payload) {
    commit("SET_STOCK_LIST_TIMER", payload);
  }
};

const getters = {
  // Get game UUID by stock name
  getGameUUIDByStockName: state => stockName => {
    let loopIndex = 0;
    if (stockName === "btc5") {
      loopIndex = 1;
    }
    if (stockName === "btc1" || stockName === "btc5") {
      stockName = "btc";
    }
    let result = "suss";
    if (state.stockCategory.length > 0) {
      for (let i = 0; i < state.stockCategory.length; i++) {
        for (let j = 0; j < state.stockCategory[i].stocks.length; j++) {
          if (state.stockCategory[i].stocks[j].stockName === stockName) {
            return state.stockCategory[i].stocks[j].loops[loopIndex].gameID;
          }
        }
      }
    } else {
      result = "....";
    }
    return result;
  },
  // Get stock category
  getStockCategory(state) {
    return state.stockCategory;
  },
  // Get all stocks data
  getAllStocks(state) {
    return state.stocks;
  },
  // get stock loop by stock name
  getStockLoop: state => stockName => {
    let result = null;
    for (let i = 0; i < state.stocks.length; i++) {
      if (state.stocks[i].stockName === stockName) {
        result = state.stocks[i].loop;
        break;
      }
    }
    return result;
  },
  // Get stock live price by stock name
  getStockLivePrice: state => stockName => {
    if (!stockName || state.stockListTimer.length <= 0) {
      return null;
    }
    let result = 0;
    for (let i = 0; i < state.stockListTimer[0].length; i++) {
      if (state.stockListTimer[0][i].stockName === stockName) {
        result = state.stockListTimer[0][i].stockPrice;
        break;
      }
    }
    return result;
  },
  // Get stock live time by stock name
  getStockLiveTime: state => stockName => {
    if (!stockName || state.stockListTimer.length <= 0) {
      return null;
    }
    let result = 0;
    for (let i = 0; i < state.stockListTimer[0].length; i++) {
      if (state.stockListTimer[0][i].stockName === stockName) {
        result = state.stockListTimer[0][i].stockTimestamp;
        break;
      }
    }
    return result;
  },
  // Get timer by stock name
  getTimerByStockName: state => stockName => {
    if (!stockName || state.stockListTimer.length <= 0) {
      return null;
    }
    let result = 0;
    for (let i = 0; i < state.stockListTimer[0].length; i++) {
      if (state.stockListTimer[0][i].stockName === stockName) {
        result = state.stockListTimer[0][i];
        break;
      }
    }
    return result;
  },
  // Get the stock list timer
  getStockListTimer(state) {
    return state.stockListTimer;
  },
  // Get stock UUID by stock name
  getStockUUIDByStockName: state => stockName => {
    let result = null;
    for (let i = 0; i < state.stocks.length; i++) {
      if (state.stocks[i].stockName === stockName) {
        result = state.stocks[i].stockUUID;
        break;
      }
    }
    return result;
  },
  // Check if the stock(by stock name) exists in the stocks data
  getCheckStock: state => stockname => {
    let result = false;
    state.stocks.forEach(element => {
      if (element.stockName === stockname) {
        result = true;
      }
    });
    return result;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
