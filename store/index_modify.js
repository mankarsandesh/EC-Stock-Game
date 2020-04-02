import Vuex from "vuex";
import payouts from "../data/json/payout";
import config from "../config/config.global";

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      clearRoadMap: false,
      authUser: {},
      activeGameChannel: true,
      loader: false,
      userLoginData: {},  
      isLoadingStockGame: false,
      auth_token: (localStorage.apikey =
        "JXb6nICLMNnyYkQEio75j7ijdcj8LT2c3PcqyJtYCPknbM0DcfYpZQ0OuIvPYJXSFexqVh4NjUxtQNMX"),
      // set portal provider and user UUID for authentication
      portalProviderUUID: localStorage.getItem("PORTAL_PROVIDERUUID"),
      userUUID: localStorage.getItem("USER_UUID"),
      // end set portal provider and user UUID for authentication
      roadMap: [],
      userData: {},
      payout: {},
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
    }),
    mutations: {
      SET_PORTAL_PROVIDER_UUID(state, payload) {
        state.portalProviderUUID = payload;
      },
      SET_USER_UUID(state, payload) {
        state.userUUID = payload;
      },
      SET_CLEAR_ROAD_MAP(state, payload) {
        state.clearRoadMap = payload;
      },
      //new api
      setAuth(state, payload) {
        state.authUser = payload;
      },
      setLiveRoadMap(state, payload) {
        state.roadMap.push(payload);
      },
      // end new api
      setUserData(state, payload) {      
        state.userData = payload;
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
      setFooterBetAmount(state, payload) {
        state.footerBetAmount = parseInt(payload);
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
            config.getRoadMap.url,
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
      // get user info from api
      async asynUserInfo(context) {
        try {
          const res = await this.$axios.$post(
            config.getUserProfile.url,
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
      // send bet data for multigame and footer bet on full screen
      async sendBetting(context) {
        // set sendbetting = true
        // to show loading
        try {
          context.commit("setIsSendBetting", true);
          const betDatas = context.state.multiGameBetsend;
          if (betDatas.length == 0) {
            context.commit("setIsSendBetting", false);
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
            context.commit("setIsSendBetting", false);
            context.commit("clearDataMultiGameBetsend");
            this._vm.$swal({
              type: "success",
              title: res.message,
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
      }
    },
    getters: {
      clearRoadMap: state => state.clearRoadMap,
      getRoadMap(state) {
        return state.roadMap;
      },
      getLastDraw(state) {
        return state.roadMap.length > 0
          ? state.roadMap[state.roadMap.length - 1].stockValue
          : "...";
      },
      getPortalProviderUUID(state) {
        console.log("check SocketID",state.portalProviderUUID);
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
      // get user info
      getUserInfo(state) {        
        return state.userData;
      },
      // get user name
      getUserName(state) {
        return state.userData;
      },      
      getIsLoadingStockGame(state) {
        return state.isLoadingStockGame;
      },

      getIsSendBetting(state) {
        return state.isSendbetting;
      },
      getPortalProviderUser(state) {
        if (sessionStorage.getItem("userData") !== null) {
          const formData = JSON.parse(sessionStorage.getItem("userData"));
        }
        return state.formData;
      },
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
      // get multiGameBet length
      getMultiGameBetLength(state) {
        return state.multiGameBet.length;
      },
      // get data betting
      getOnGoingBet(state) {
        return state.onGoingBet;
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
      getBetAmountRuleID: state => data => {
        return 0
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
      // get current language
      getlocale(state) {
        return state.locale;
      }
    }
  });
};

export default createStore;
