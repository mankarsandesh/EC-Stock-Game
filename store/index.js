import Vuex from "vuex";
import payouts from "../data/json/payout";
import config from "../config/config.global";

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      stockCategory: [],
      gameStockId: null,
      authUser: {},
      activeGameChannel: true,
      loader: false,
      userLoginData: {},
      isLoadingStockGame: false,
      auth_token: (localStorage.apikey =
        "JXb6nICLMNnyYkQEio75j7ijdcj8LT2c3PcqyJtYCPknbM0DcfYpZQ0OuIvPYJXSFexqVh4NjUxtQNMX"),
      isLoadingAnnoucement: [],
      isLoadingHistory: [],
      // set portal provider and user UUID for authentication
      portalProviderUUID: "ef60e64b-dc17-4ff1-9f22-a177c6f1c204",
      userUUID: "dfdcb1e4-2275-4026-8efd-cafc79cc6f44",
      // end set portal provider and user UUID for authentication
      roadMap: [],
      userData: {},
      payout: {},
      OnlineTime: "",
      footerBetAmount: 0,
      // store data betting
      onGoingBet: [],
      // store data betting that not confirm yet (multi game and fullscreen mode)
      multiGameBet: [],
      multiGameBetsend: [],
      // store staock id to display on multi game
      stockMultigame: [],
      locales: ["cn", "us", "th", "la"],
      locale: localStorage.getItem("lang"),
      coins_modern: [],
      // multi game
      isSendBetting: false,
      payout: payouts,
      stocks2: [
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
      stockListTimer: []
    }),
    mutations: {
      SET_STOCK_CATEGORY(state, payload) {
        state.stockCategory = payload;
      },
      //new api
      setGameID(state, payload) {
        state.gameStockId = payload;
      },
      setAuth(state, payload) {
        state.authUser = payload;
      },
      setStockListTimer(state, payload) {
        state.stockListTimer.splice(0, 0, payload);
        if (state.stockListTimer.length === 3) {
          state.stockListTimer.pop();
        }
      },
      setLiveRoadMap(state, payload) {
        state.roadMap.push(payload);
      },
      // end new api
      setUserData(state, payload) {
        state.userData = payload;
      },
      setGameChannelShow(state, value) {
        state.activeGameChannel = value;
      },
      setIsLoadingStockGame(state, value) {
        state.isLoadingStockGame = value;
      },
      setIsSendBetting(state, value) {
        state.isSendBetting = value;
      },
      setUserLoginData(state, payload) {
        state.userLoginData = payload;
      },
      // store api_token in vuex auth_token
      setAuth_token(state, token) {
        state.auth_token = token;
      },
      // add more stock to multi game
      addStockMultigame(state, stockId) {
        if (state.stockMultigame.includes(stockId)) return;
        state.stockMultigame.push(stockId);
      },
      // push data to on going bet
      pushDataOnGoingBet(state, payload) {
        state.onGoingBet.splice(0, 0, payload);
      },
      // push data to on going bet
      pushDataMultiGameBet(state, payload) {
        state.multiGameBet.push(payload);
        state.multiGameBetsend.push(payload);
      },
      clearDataMultiGameBetsend(state) {
        state.multiGameBetsend = [];
      },
      clearDataMultiGameBet(state) {
        state.multiGameBet = [];
        state.footerBetAmount = 0;
        state.onGoingBet = [];
        // console.warn(state.multiGameBet);
      },
      removeAllFooterBet(state) {
        state.multiGameBet = [];
      },
      // store coin in localStorage payload must be "String array" '["100", "500", "1000", "5000", "10000"]'
      setCoins_modern(state) {
        state.coins_modern = JSON.parse(localStorage.getItem("coinModern"));
      },
      // set language
      SET_LANG(state, locale) {
        if (state.locales.includes(locale)) {
          state.locale = locale;
        }
        localStorage.setItem("lang", locale);
      },
      setOnlineTime(state, payload) {
        state.OnlineTime = payload;
      },
      setFooterBetAmount(state, payload) {
        state.footerBetAmount = parseInt(payload);
      },
      setAnouncement(state, payload) {
        state.isLoadingAnnoucement = payload;
      },
      setHistory(state, payload) {
        state.isLoadingHistory = payload;
      },
      setTopPlayer(state, payload) {
        state.isLoadingTopPlayer = payload;
      }
    },
    actions: {
      // new api
      async asyncRoadMap(context, stockUUID) {
        context.state.roadMap = [];
        try {
          const res = await this.$axios.$post(
            "http://uattesting.equitycapitalgaming.com/webApi/getRoadMap",
            {
              portalProviderUUID: context.state.portalProviderUUID,
              limit: 50,
              stockUUID: [stockUUID],
              version: config.version
            },
            {
              headers: config.header
            }
          );
          if (res.code === 200) {
            let readyData = res.data[0].roadMap.reverse();
            context.state.roadMap = readyData;
          } else {
            throw new Error();
          }
        } catch (ex) {
          console.log(ex.message);
        }
      },
      async asyncStocks(context) {
        try {
          const res = await this.$axios.$post(
            "http://uattesting.equitycapitalgaming.com/webApi/getStock",
            {
              portalProviderUUID: context.state.portalProviderUUID,
              version: config.version
            },
            {
              headers: config.header
            }
          );
          if (res.code === 200) {
            context.state.stocks2 = res.data;
          } else {
            throw new Error();
          }
        } catch (ex) {
          console.log(ex);
          // this.$router.push("/error");
        }
      },
      // get user info from api
      async asynUserInfo(context) {
        try {
          const res = await this.$axios.$post(
            "http://uattesting.equitycapitalgaming.com/webApi/getUserProfile",
            {
              portalProviderUUID: context.state.portalProviderUUID,
              userUUID: context.state.userUUID,
              version: config.version
            },
            {
              headers: config.header
            }
          );
          if (res.code === 200) {
            let userInfo = res.data;
            context.commit("setUserData", userInfo);
          } else {
            console.log(res);
          }
        } catch (ex) {
          console.error(ex);
          // alert(ex)
        }
      },

      // end new api
      async asyncPayout(context) {
        try {
          // const respayoutinitial = await this.$axios.$get(
          //     `/api/payoutinitial2?stockId=7&apikey=${context.getters.getAuth_token}`
          // );
          // const res = await this.$axios.$post(
          //     `/api/gameRuleStock?stockId=7&apikey=${context.getters.getAuth_token}`
          // );
          // console.log(res)
          // context.state.payout = res.data;
          // console.log(context.state.payout)
          // context.commit("setUserData", {name:userInfo})
        } catch (ex) {
          console.error(ex);
          // alert(ex)
        }
      },
      // end get user info from api
      async sendBetting(context) {
        context.commit("setIsSendBetting", true);
        // console.warn("sendBetting...");
        const betData = {
          data: [...context.state.multiGameBetsend]
        };
        if (betData.data.length == 0) {
          context.commit("setIsSendBetting", false);
          this._vm.$swal({
            type: "error",
            title: `Sorry, No Betting...!`,
            showConfirmButton: false,
            timer: 1500
          });
          return;
        }
        // console.log(betData)
        try {
          const res = await this.$axios.$post(
            `/api/storebet?apikey=${context.getters.getAuth_token}`,
            betData
          );
          // console.log("res./.......");
          // console.log(res);
          // console.log("res...........");
          if (res.status) {
            context.commit("setIsSendBetting", false);
            context.commit("clearDataMultiGameBetsend");
            this._vm.$swal({
              type: "success",
              title: "Confirm!",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            context.commit("setIsSendBetting", false);
            this._vm.$swal({
              type: "error",
              title: `error ${res.message}`,
              showConfirmButton: true
            });
          }
        } catch (ex) {
          console.error(ex);
          context.commit("setIsSendBetting", false);
        }
      },
      // to get Annoucement
      async asyannoucement(context) {
        try {
          // const res = await this.$axios.$post(`/api/storebet?apikey=${context.getters.getAuth_token}`, betData)
          const res = await this.$axios.$get(
            `/announcements?apikey=${context.getters.getAuth_token}`
          );
          // console.log(res);
          context.commit("setAnouncement", res.data);
          // console.log("Sandesh");
        } catch (error) {
          console.log(error);
        }
      },
      // to get User bet History
      async asyhistory(context) {
        try {
          // const res = await this.$axios.$post(`/api/storebet?apikey=${context.getters.getAuth_token}`, betData)
          const res = await this.$axios.$get(
            `/fetchHistoryBet?apikey=${context.getters.getAuth_token}`
          );
          // console.log(res);
          // console.log("SANDESH");
          context.commit("setHistory", res.data);
        } catch (error) {
          console.log(error);
        }
      },
      async OnlineTime(context) {
        try {
          let res = await this.$axios.$get(
            `/api/me/online?method=profile&apikey=${context.getters.getAuth_token}`
          );
          context.commit("setOnlineTime", res.data);
        } catch (error) {
          console.log(error);
        }
      }
    },
    getters: {
      getGameUUIDByStockName: state => stockName => {
        let loopIndex = 0;
        if (stockName === "btc1" || stockName === "btc5") {
          stockName = "btc";
        }
        if (stockName === "btc5") {
          loopIndex = 1;
        }
        let result = "suss";
        if (state.stockCategory.length > 0) {
          for (let i = 0; i < state.stockCategory.length; i++) {
            for (let j = 0; j < state.stockCategory[i].stocks.length; j++) {
              console.log(state.stockCategory[i].stocks[j].stockName);
              if (state.stockCategory[i].stocks[j].stockName === stockName) {
                return state.stockCategory[i].stocks[j].loops[loopIndex].gameID;
              } else {
                console.log(state.stockCategory[i].stocks[j].stockName);
              }
            }
          }
        } else {
          result = "stockCategory length = 0";
        }
        return result;
      },
      getStockCategory(state) {
        return state.stockCategory;
      },
      getStockGameId(state) {
        return state.gameStockId;
      },
      // new api
      getAllStocks(state) {
        return state.stocks2;
      },
      getStockLoop: state => stockName => {
        let result = null;
        for (let i = 0; i < state.stocks2.length; i++) {
          if (state.stocks2[i].stockName === stockName) {
            result = state.stocks2[i].loop;
            break;
          }
        }
        return result;
      },
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
      getStockListTimer(state) {
        return state.stockListTimer;
      },
      getStockUUIDByStockName: state => stockName => {
        let result = null;
        for (let i = 0; i < state.stocks2.length; i++) {
          if (state.stocks2[i].stockName === stockName) {
            result = state.stocks2[i].stockUUID;
            break;
          }
        }
        return result;
      },
      getRoadMap(state) {
        return state.roadMap;
      },
      getLastDraw(state) {
        return state.roadMap.length > 0
          ? state.roadMap[state.roadMap.length - 1].stockValue
          : "...";
      },
      // end new api
      getGameChannel(state) {
        return state.activeGameChannel;
      },
      getPortalProviderUUID(state) {
        return state.portalProviderUUID;
      },
      getUserUUID(state) {
        return state.userUUID;
      },
      getPayout: state => gameRule => {
        {
          // console.log(state.payout[gameRule])
          return state.payout[gameRule];
        }
      },

      checkAuth(state) {
        if (
          state.auth_token === "" ||
          state.auth_token == null ||
          state.auth_token == undefined
        ) {
          return false;
        } else {
          return true;
        }
      },
      getHistory(state) {
        return state.isLoadingHistory;
      },
      // get user info
      getUserInfo(state) {
        return state.userData;
      },
      // get user name
      getUserName(state) {
        return state.userData;
      },
      getAnnoucement(state) {
        return state.isLoadingAnnoucement;
      },
      getIsLoadingStockGame(state) {
        return state.isLoadingStockGame;
      },

      getIsSendBetting(state) {
        return state.isSendbetting;
      },
      getOnlimeTime(state) {
        return state.OnlineTime;
      },
      // get auth_token
      getPortalProviderUser(state) {
        // sessionStorage.setItem("userData", JSON.stringify(userData));
        if (sessionStorage.getItem("userData") !== null) {
          const formData = JSON.parse(sessionStorage.getItem("userData"));
        }
        return state.formData;
      },
      // get auth_token
      getAuth_token(state) {
        return state.auth_token;
      },
      // check stock in multi game if exits disable button
      checkMultigameExistAndDisable: state => data => {
        if (!data.isMultigame) return "";
        const result = state.stockMultigame.includes(data.stockId);
        if (result) return "pointer-events: none";
        else return "";
      },
      // check stock in multi game if exits show icon "check"
      checkMultigameExistAndShowIcon: state => data => {
        if (!data.isMultigame) return false;
        const result = state.stockMultigame.includes(data.stockId);
        if (result) return true;
        else return false;
      },
      // get stock id to show in multi game
      getStockMultigame(state) {
        return state.stockMultigame;
      },
      // get amount of betting that already confirm
      getBettingAmount(state) {
        return state.onGoingBet
          .map(x => x.betAmount)
          .reduce((a, b) => a + b, 0);
      },
      // get amount of betting already confirmed and not confirm
      getAllBettingAmount(state) {
        let amount1 = state.onGoingBet
          .map(x => x.betAmount)
          .reduce((a, b) => a + b, 0);
        let amount2 = state.multiGameBet
          .map(x => x.amount)
          .reduce((a, b) => a + b, 0);
        return amount1 + amount2;
      },
      // get multiGameBet length
      getMultiGameBetLength(state) {
        return state.multiGameBet.length;
      },
      // get data betting
      getOnGoingBet(state) {
        return state.onGoingBet;
      },
      getAmountBettingByStockId: state => stockId => {
        function getAmount(object) {
          // find stockname
          if (object.findIndex(x => x.stockId === stockId) == -1) return 0;
          let result = object
            .filter(x => x.stockId === stockId)
            .map(x => x.amount)
            .reduce((a, b) => a + b, 0);
          return parseInt(result);
        }

        function getAmountbet(object) {
          // find stockname
          console.log("i am here 12");
          console.log(object);
          if (object.findIndex(x => x.stock === stockId) == -1) return 0;
          let result = object
            .filter(x => x.stock === stockId)
            .map(x => x.betAmount)
            .reduce((a, b) => a + b, 0);
          return parseInt(result);
        }
        return getAmount(state.multiGameBet) + getAmountbet(state.onGoingBet);
      },
      // to show ship and amount on bet button
      getAmountMultiGameBet: state => data => {
        // console.log(state.multiGameBet)
        function getAmount(object) {
          // find stockId
          if (object.findIndex(x => x.stockId === data.stockId) == -1) return 0;
          // get data by stockId
          let stockIdObject = object.filter(x => x.stockId === data.stockId);
          // check rule in stockId
          if (stockIdObject.findIndex(x => x.gameRule === data.gameRule) == -1)
            return 0;
          // get amount by rule
          let result = stockIdObject
            .filter(x => x.gameRule === data.gameRule)
            .map(x => x.amount)
            .reduce((a, b) => a + b, 0);
          return parseInt(result);
        }

        function getAmountbet(object) {
          // find stockname
          if (object.findIndex(x => x.stock === stockId) == -1) return 0;
          let result = object
            .filter(x => x.stock === stockId)
            .map(x => x.betAmount)
            .reduce((a, b) => a + b, 0);
          return parseInt(result);
        }
        return getAmount(state.multiGameBet) + getAmountbet(state.onGoingBet);
      },
      // to show ship and amount on bet button
      getAmountMultiGameBet: state => data => {
        // console.log(state.multiGameBet)
        function getAmount(object) {
          // find stockId
          if (object.findIndex(x => x.stockId === data.stockId) == -1) return 0;
          // get data by stockId
          let stockIdObject = object.filter(x => x.stockId === data.stockId);
          // check rule in stockId
          if (stockIdObject.findIndex(x => x.gameRule === data.gameRule) == -1)
            return 0;
          // get amount by rule
          let result = stockIdObject
            .filter(x => x.gameRule === data.gameRule)
            .map(x => x.amount)
            .reduce((a, b) => a + b, 0);
          return parseInt(result);
        }
        function getAmounts(object) {
          // find stockId
          if (object.findIndex(x => x.stock === data.stockId) == -1) return 0;
          // get data by stockId
          let stockIdObject = object.filter(x => x.stock === data.stockId);
          // check rule in stockId
          if (stockIdObject.findIndex(x => x.rule === data.gameRule) == -1)
            return 0;
          // get amount by rule
          let result = stockIdObject
            .filter(x => x.rule === data.gameRule)
            .map(x => x.betAmount)
            .reduce((a, b) => a + b, 0);
          return parseInt(result);
        }
        return getAmount(state.multiGameBet) + getAmounts(state.onGoingBet);
      },
      getAmountBetSpecificNumber: state => data => {
        function getAmount(object) {
          let count = 9;
          // find stockId
          if (object.findIndex(x => x.stock === data.stockId) == -1) return 0;
          // get data by stockId
          let stockIdObject = object.filter(x => x.stock === data.stockId);
          // check rule in stockId
          // if (stockIdObject.findIndex(x => x.betId === data.betId) == -1) return 0
          // get amount by rule
          let result = 0;
          for (let i = 0; i <= count; i++) {
            result =
              result +
              stockIdObject
                .filter(x =>
                  x.rule.toLowerCase().includes(`${data.gameRule}-${i}`)
                )
                .map(x => x.betAmount)
                .reduce((a, b) => a + b, 0);
          }
          // .map(x => x.amount).reduce((a, b) => a + b, 0)
          return result;
        }
        return getAmount(state.multiGameBet) + getAmount(state.onGoingBet);
      },
      //get betting data
      getOnBetting(state) {
        return state.onGoingBet;
      },
      // get data betting that not confirn=m yet "available on fullscreen mode and multi game"
      getMultiGameBet(state) {
        return state.multiGameBet;
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
      // get chip amount
      getCoins_modern(state) {
        return state.coins_modern;
      },
      // check stockId in state "stocks" is exist or not
      getCheckStock: state => stockname => {
        let result = false;
        state.stocks2.forEach(element => {
          if (element.stockName === stockname) {
            result = true;
          }
        });
        return result;
      },
      // get current language
      getlocale(state) {
        return state.locale;
      }
    }
  });
};

export default createStore;
