import config from "../config/config.global";

const state = () => ({
  stocks: [
    // Store stocks data
    {
      stockName: "btc1",
      stockUUID: "88778f4f-610b-4ec3-937d-65ef7bf24af5",
      reference: "https://www.hbg.com/zh-cn/exchange/?s=btc_usdt",
      type: "crypto",
      loop: 1,
      gameUUID: "bfa864fb-25ea-4b38-ad62-724cd04ad153",
      crawlData: []
    },
    {
      stockName: "sh000001",
      stockUUID: "e9543b3d-7870-4a5e-975e-fbe228b50f49",
      reference:
        "http://finance.sina.com.cn/realstock/company/sh000001/nc.shtml",
      type: "china",
      loop: 5,
      gameUUID: null,
      crawlData: []
    },
    {
      stockName: "sh000300",
      stockUUID: "56f0d2d4-4d9b-4cfc-bd76-97375b451d7d",
      reference:
        "http://finance.sina.com.cn/realstock/company/sh000300/nc.shtml",
      type: "china",
      loop: 5,
      gameUUID: null,
      crawlData: []
    },
    {
      stockName: "sz399415",
      stockUUID: "0ecce345-8d3b-4fee-bf57-f1bdd6eaa373",
      reference:
        "http://finance.sina.com.cn/realstock/company/sz399415/nc.shtml",
      type: "china",
      loop: 5,
      gameUUID: null,
      crawlData: []
    },
    {
      stockName: "sz399001",
      stockUUID: "636115a3-11cb-4498-a699-1e8ef6d90bce",
      reference:
        "http://finance.sina.com.cn/realstock/company/sz399001/nc.shtml",
      type: "china",
      loop: 5,
      gameUUID: null,
      crawlData: []
    },
    {
      stockName: "usindex",
      stockUUID: "6503b060-414e-4749-bf73-a6b46b488d0d",
      reference: "https://finance.sina.com.cn/money/forex/hq/DINIW.shtml",
      type: "usa",
      loop: 5,
      gameUUID: null,
      crawlData: []
    },
    {
      stockName: "btc5",
      stockUUID: "6231bf0c-2a93-4325-8b42-b7bfcfaaab93",
      reference: "https://www.hbg.com/zh-cn/exchange/?s=btc_usdt",
      type: "crypto",
      loop: 5,
      gameUUID: null,
      crawlData: []
    }
  ],
  stockCategory: [], // Store Stocks category
  stockPrice: [], // Store stock list price
  stockCountdown: [] // Store stock list Countdown
});

const mutations = {
  SET_STOCK_CATEGORY(state, payload) {
    state.stockCategory = payload;
  },
  SET_STOCKS_DATA(state, payload) {
    state.stocks = payload;
  },
  SET_STOCK_COUNTDOWN(state, payload) {
    state.stockCountdown = payload;
  },
  SET_STOCK_PRICE(state, payload) {
    state.stockPrice.unshift(payload);
    if (state.stockPrice.length > 2) {
      state.stockPrice.pop();
    }
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
  // Set stock list price
  setStockPrice({ commit }, payload) {
    commit("SET_STOCK_PRICE", payload);
  },
  // Set stock list countdown
  setStockCountdown({ commit }, payload) {
    commit("SET_STOCK_COUNTDOWN", payload);
  }
};

const getters = {
  // Get game UUID by stock name
  getGameUUIDByStockName: state => stockName => {
    // check is it a btc stock
    let loop = "";
    if (stockName === "btc5") {
      loop = 5;
    } else {
      loop = 1;
    }
    if (stockName === "btc1" || stockName === "btc5") {
      stockName = "btc";
    }
    if (state.stockCategory.length > 0) {
      for (let i = 0; i < state.stockCategory.length; i++) {
        for (let j = 0; j < state.stockCategory[i].stocks.length; j++) {
          if (state.stockCategory[i].stocks[j].stockName === stockName) {
            if (stockName !== "btc") {
              return state.stockCategory[i].stocks[j].loops[0].gameID;
            } else {
              for (
                let a = 0;
                a < state.stockCategory[i].stocks[j].loops.length;
                a++
              ) {
                if (
                  state.stockCategory[i].stocks[j].loops[a].loopName === loop
                ) {
                  return state.stockCategory[i].stocks[j].loops[a].gameID;
                }
              }
            }
          }
        }
      }
    } else {
      return "....";
    }
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
    if (!stockName || state.stockPrice.length == 0) {
      return null;
    }
    return state.stockPrice[0].find(stock => stock.stockName == stockName)
      .stockPrice;
  },
  // Get stock live time by stock name
  getStockLiveTime: state => stockName => {
    if (!stockName || state.stockCountdown.length == 0) {
      return null;
    }
    return state.stockCountdown.find(stock => stock.stockName == stockName)
      .stockTimestamp;
  },
  // Get timer by stock name
  getTimerByStockName: state => stockName => {
    if (!stockName || state.stockCountdown.length == 0) {
      return null;
    }
    return state.stockCountdown.find(stock => stock.stockName == stockName);
  },
  // Get stock list countdown
  getStockListCountdown(state) {
    return state.stockCountdown;
  },
  // Get stock price
  getStockListPrice(state) {
    return state.stockPrice;
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
