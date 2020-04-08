import config from "../config/config.global";

const state = () => ({
    stocks: [           // Store stocks data
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
    stockCategory: [],             // Store Stocks category
    stockListTimer: [],            // Store stock list timer
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
}

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
            context.commit('SET_STOCKS_DATA', res.data);
          } else {
            throw new Error();
          }
        } catch (ex) {
          console.log(ex);
        }
    },
    // Set stocks category
    setStockCategory ({ commit }, payload) {
        commit('SET_STOCK_CATEGORY', payload);
    },
    // Set stock list timer
    setStockListTimer({ commit }, payload) {
        commit('SET_STOCK_LIST_TIMER', payload);
    },
}

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
    },
    
}

export default {
    state,
    mutations,
    actions,
    getters
}