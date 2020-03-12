import Vuex from "vuex";
import { hostname } from "os";
import payouts from "../data/json/payout";
const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            authUser: {},
            activeGameChannel: true,
            loader: false,
            userLoginData: {},
            headers: {
                Authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh"
            },
            isLoadingStockGame: false,
            auth_token: (localStorage.apikey =
                "JXb6nICLMNnyYkQEio75j7ijdcj8LT2c3PcqyJtYCPknbM0DcfYpZQ0OuIvPYJXSFexqVh4NjUxtQNMX"),
            isLoadingAnnoucement: [],
            isLoadingHistory: [],
            // set portal provider and user UUID for authentication
            portalProviderUUID: "ef60e64b-dc17-4ff1-9f22-a177c6f1c204",
            userUUID: "dfdcb1e4-2275-4026-8efd-cafc79cc6f44",
            Username: "TnkwebApi",
            Password: "Test123!",
            // end set portal provider and user UUID for authentication
            roadMap: [],
            liveChart: [],
            userData: {},
            payout: {},
            balance: "",
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
            // all stocks data
            // if we have new stock available we can add it here with same object format
            liveprice: {
                btc1: {
                    currentPrice: 0,
                    previousPrice: 0
                },
                usindex: {
                    currentPrice: 0,
                    previousPrice: 0
                },
                btc5: {
                    currentPrice: 0,
                    previousPrice: 0
                },
                sh000001: {
                    currentPrice: 0,
                    previousPrice: 0
                },
                sz399001: {
                    currentPrice: 0,
                    previousPrice: 0
                },
                sz399415: {
                    currentPrice: 0,
                    previousPrice: 0
                },
                sh000300: {
                    currentPrice: 0,
                    previousPrice: 0
                }
            },
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
            stocks: {
                sh000001: {
                    url: {
                        crawler: `/api/getCrawlerData?stockId=1&limit=100`,
                        livePrice: ""
                    },
                    stockId: 4,
                    stockname: "sh000001",
                    name: "sh000001",
                    loop: 5,
                    type: "china",
                    crawlerData: "",
                    lastDraw: "",
                    timeLastDraw: "",
                    livePrice: {
                        refLink:
                            "http://finance.sina.com.cn/realstock/company/sh000001/nc.shtml"
                    }
                },
                sz399001: {
                    url: {
                        crawler: `/api/getCrawlerData?stockId=4&limit=100`,
                        livePrice: ""
                    },
                    stockId: 3,
                    stockname: "sz399001",
                    name: "sz399001",
                    loop: 5,
                    type: "china",
                    crawlerData: "",
                    lastDraw: "",
                    timeLastDraw: "",
                    livePrice: {
                        refLink:
                            "http://finance.sina.com.cn/realstock/company/sz399001/nc.shtml"
                    }
                },
                sz399415: {
                    url: {
                        crawler: `/api/getCrawlerData?stockId=3&limit=100`,
                        livePrice: ""
                    },
                    stockId: 2,
                    stockname: "sz399415",
                    name: "sz399415",
                    loop: 5,
                    type: "china",
                    crawlerData: "",
                    lastDraw: "",
                    timeLastDraw: "",
                    livePrice: {
                        refLink:
                            "http://finance.sina.com.cn/realstock/company/sz399415/nc.shtml"
                    }
                },
                sh000300: {
                    url: {
                        crawler: `/api/getCrawlerData?stockId=2&limit=100`,
                        livePrice: ""
                    },
                    stockId: 1,
                    stockname: "sh000300",
                    name: "sh000300",
                    loop: 5,
                    type: "china",
                    crawlerData: "",
                    lastDraw: "",
                    timeLastDraw: "",
                    livePrice: {
                        refLink:
                            "http://finance.sina.com.cn/realstock/company/sh000300/nc.shtml"
                    }
                },
                usindex: {
                    url: {
                        crawler: `/api/getCrawlerData?stockId=5&limit=100`,
                        livePrice: ""
                    },
                    stockId: 5,
                    stockname: "usindex",
                    name: "usindex",
                    loop: 5,
                    type: "usa",
                    crawlerData: "",
                    lastDraw: "",
                    timeLastDraw: "",
                    livePrice: {
                        refLink: "https://finance.sina.com.cn/money/forex/hq/DINIW.shtml"
                    }
                },
                btc5: {
                    url: {
                        crawler: `/api/getCrawlerData?stockId=6&limit=100`,
                        livePrice: ""
                    },
                    stockId: 6,
                    stockname: "btc5",
                    name: "btc",
                    loop: 5,
                    type: "cypto",
                    crawlerData: "",
                    lastDraw: "",
                    timeLastDraw: "",
                    livePrice: {
                        refLink: "https://www.hbg.com/zh-cn/exchange/?s=btc_usdt"
                    }
                },
                btc1: {
                    url: {
                        crawler: `/api/getCrawlerData?stockId=7&limit=100`,
                        livePrice: ""
                    },
                    stockId: 7,
                    stockname: "btc1",
                    name: "btc",
                    loop: 1,
                    type: "cypto",
                    crawlerData: "",
                    lastDraw: "",
                    timeLastDraw: "",
                    livePrice: {
                        refLink: "https://www.hbg.com/zh-cn/exchange/?s=btc_usdt"
                    }
                }
            },
            time: {},
            stockListTimer: []
        }),
        mutations: {
            setAuth(state, payload) {
                state.authUser = payload
            },
            setStockListTimer(state, payload) {
                state.stockListTimer.splice(0, 0, payload);
                if (state.stockListTimer.length === 3) {
                    state.stockListTimer.pop();
                }
            },
            //new api
            setLiveRoadMap(state, payload) {
                state.roadMap.push(payload);
            },
            setLiveChart(state, payload) {
                state.liveChart.push(payload);
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
            // set user balance
            setBalance(state, payload) {
                state.balance = payload;
            },
            setOnlineTime(state, payload) {
                state.OnlineTime = payload;
            },
            SET_TIME(state, payload) {
                state.time = payload;
                // console.log(state.time)
            },
            // set Live price for stocks
            setLivePrice(state, payload) {
                state.liveprice = payload;
                // console.log("liveprice......")
                // console.log(state.liveprice)
                // console.log("liveprice.....")
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
            async asyncChart(context, stockUUID) {
                context.state.liveChart = [];
                try {
                    const res = await this.$axios.$post(
                        "http://uattesting.equitycapitalgaming.com/webApi/getRoadMap",
                        {
                            portalProviderUUID: context.state.portalProviderUUID,
                            limit: 50,
                            stockUUID: [stockUUID],
                            version: 1
                        },
                        {
                            headers: {
                                Authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh"
                            }

                        }
                    );
                    if (res.code === 200) {
                        let readyData = res.data[0].roadMap.reverse();
                        context.state.liveChart = readyData;
                    } else {
                        throw new Error();
                    }
                } catch (ex) {
                    console.log(ex.message);
                }
            },
            async asyncRoadMap(context, stockUUID) {
                context.state.roadMap = [];
                try {
                    const res = await this.$axios.$post(
                        "http://uattesting.equitycapitalgaming.com/webApi/getRoadMap",
                        {
                            portalProviderUUID: context.state.portalProviderUUID,
                            limit: 50,
                            stockUUID: [stockUUID],
                            version: 1
                        },
                        {
                            headers: {
                                Authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh"
                            }
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
                            version: 1
                        },
                        {
                            headers: {
                                Authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh"
                            }
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
                            version: 1
                        },
                        {
                            headers: {
                                Authorization: "Basic VG5rc3VwZXI6VGVzdDEyMyE="
                            }
                        }
                    );
                    if (res.code === 200) {
                        let userInfo = res.data[0];
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
            async balance(context) {
                try {
                    const res = await this.$axios.$get(
                        `/api/me/balance?apikey=${context.getters.getAuth_token}`
                    );
                    if (res.status) {
                        context.commit("setBalance", res.data.balance);
                    }
                } catch (ex) {
                    console.error(ex);
                    // alert(ex)
                }
            },
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
            async asynGetAllStock(context) {
                // console.log("working...");
                // console.log(context.getters.getAuth_token);
                try {
                    const stocks = await this.$axios.$post(
                        `/api/allStockInfo?apikey=${context.getters.getAuth_token}`
                    );
                    const data = stocks.data;
                    // console.log(data);
                    context.state.stocks = Object.assign({}, data);
                    // console.log(context.state.stocks);
                    context.dispatch("asynInitCallApi");
                } catch (ex) {
                    console.error(ex);
                    // alert(ex)
                }
            },
            asynInitCallApi(context) {
                // call crawler api
                for (let i = 0; i < context.getters.getStockLength; i++) {
                    let name = context.getters.getStockKeys[i];
                    let url =
                        context.state.stocks[context.getters.getStockKeys[i]].url.crawler;
                    let payload = {
                        url,
                        name
                    };
                    context.dispatch("asynCrawlerStock", payload);
                }
                context.getters.getStockChart;
            },
            // to get crawler data
            async asynCrawlerStock(context, payload) {
                try {
                    const url = `${payload.url}&apikey=${context.getters.getAuth_token}`;
                    // console.log(url)
                    const name = payload.name;
                    const result = await this.$axios.$get(url);
                    if (result.data.length > 0) {
                        context.state.stocks[name].crawlerData = result.data;
                        context.state.stocks[name].lastDraw =
                            result.data[result.data.length - 1].PT;
                        context.state.stocks[name].timeLastDraw =
                            result.data[result.data.length - 1].writetime;
                        // console.warn(context.state.stocks[name].crawlerData)
                        // console.log(result.data)
                    } else {
                        console.log(result.code);
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            // to get live price
            async asynLivePrice(context, payload) {
                try {
                    const url = payload.url;
                    const name = payload.name;
                    const res = await this.$axios.$get(url);
                    if (res) {
                        context.state.stocks[name].livePrice.currentPrice =
                            res.data.currentPrice;
                        context.state.stocks[name].livePrice.previousPrice =
                            res.data.previousPrice;
                    }
                } catch (error) {
                    console.log(error);
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
            // new api
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
            getLiveChart(state) {
                return state.liveChart;
            },
            getStocks(state) {
                return state.stocks2;
            },
            getLastDraw(state) {
                console.log("getLastDraw");
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

            // get user balance
            getBalance(state) {
                return state.balance;
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
            getAllStockByType(state, getters) {
                let stockData = [];
                let stockType = [];
                // get type for all stocks
                for (let i = 0; i < getters.getStockLength; i++) {
                    const id = getters.getStockKeys[i];
                    const type = state.stocks[id].type;
                    const data = {
                        type: type,
                        stockName: []
                    };
                    if (!stockType.includes(type)) {
                        stockType.push(type);
                        stockData.push(data);
                    }
                }
                // get stock name for all stocks
                let stockName = [];
                for (let i = 0; i < stockType.length; i++) {
                    for (let j = 0; j < getters.getStockLength; j++) {
                        const id = getters.getStockKeys[j];
                        const type = state.stocks[id].type;
                        if (type === stockType[i]) {
                            const name = state.stocks[id].name;
                            const data = {
                                name: name,
                                loop: []
                            };
                            if (!stockName.includes(name)) {
                                stockName.push(name);
                                stockData[i].stockName.push(data);
                            }
                        }
                    }
                }
                // get loop
                let loop = [];
                for (let i = 0; i < stockType.length; i++) {
                    for (let j = 0; j < getters.getStockLength; j++) {
                        const id = getters.getStockKeys[j];
                        const type = state.stocks[id].type;
                        if (type === stockType[i]) {
                            const loop = state.stocks[id].loop;
                            const stockId = state.stocks[id].stockname;
                            const data = {
                                loop: loop,
                                stockId: stockId
                            };
                            // console.warn(data);
                            // console.warn(type);
                            for (let ok = 0; ok < stockData[i].stockName.length; ok++) {
                                const name = stockData[i].stockName[ok].name;
                                stockData[i].stockName[ok].loop.push(data);
                            }
                            // console.log(state.stocks[id]);
                            // console.log("Select");
                        }
                    }
                }
                // console.warn(stockData.stockName);
                return stockData;
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
            },
            // sometimes you  need to get only liveprice -----> believe me ^_^ <------
            getLivePrice: state => id => {
                // console.log("getLivePrice")
                if (id == "") {
                    return;
                }
                const livePrice = state.liveprice[id].currentPrice;
                return livePrice;
            },
            // get previouse price to compare with current price to know to if the price increased or decreased
            getPreviousPrice: state => id => {
                // console.log("getPreviousPrice")
                if (id == "") {
                    return;
                }
                const previousPrice = state.liveprice[id].previousPrice;
                return previousPrice;
            },
            // get loop by stock id "btc1,btc5..."
            getLoop: state => id => {
                if (id == "") {
                    return;
                }
                const loop = state.stocks[id].loop;
                return loop;
            },
            // get stockID by id "btc1,btc5,usindex..." must return number
            getStockId: state => id => {
                if (id == "") {
                    return;
                }
                const StockId = state.stocks[id].stockId;
                return StockId;
            },
            getStockIdtoStockName: state => id => {
                if (id == "") {
                    return;
                }
                let stockname;
                if (id == 7) {
                    stockname = "btc1";
                } else if (id == 5) {
                    stockname = "usindex";
                } else if (id == 6) {
                    stockname = "btc5";
                } else if (id == 1) {
                    stockname = "sh000001";
                } else if (id == 4) {
                    stockname = "sz399001";
                } else if (id == 3) {
                    stockname = "sz399415";
                } else if (id == 2) {
                    stockname = "sh000300";
                }
                const data = state.stocks[stockname].stockname;
                return data;
            },
            // get stock type
            getStockType: state => id => {
                // console.log("getStockType")
                if (id == "") {
                    return;
                }
                const type = state.stocks[id].type;
                return type;
            },
            // get live time
            getLiveTime: state => id => {
                // alert(Object.keys(state.time).length)
                // console.log("getLiveTime")
                if (id == "" || Object.keys(state.time).length == 0) {
                    return;
                }
                const liveTime = state.time[id].now;
                return liveTime;
            },
            // get countdown timer
            getLotteryDraw: state => id => {
                // alert(Object.keys(state.time).length)
                // console.log("getLotteryDraw")
                if (id == "" || Object.keys(state.time).length == 0) {
                    return;
                }
                const lotteryDraw = state.time[id].timer;
                return lotteryDraw;
            },
            getStockLoop: state => id => {
                // console.log("getStockLoop")
                if (id == "") return;
                return state.stocks[id].loop;
            },
            // get last draw
            getStockLastDraw: state => id => {
                // console.log("getStockLastDraw")
                if (id == "") return;
                return state.stocks[id].lastDraw;
            },

            // get stock info by stock id  to show in betting
            getStockById: state => id => {
                // var start = +new Date(); // log start timestamp
                // console.log(start)
                // console.log("getStockById")
                if (id == "") return;
                const stockname = state.stocks[id].stockname;
                const loop = state.stocks[id].loop;
                const type = state.stocks[id].type;
                const lastDraw = state.stocks[id].lastDraw;
                const timeLastDraw = state.stocks[id].timeLastDraw;
                let prices = state.stocks[id].crawlerData;
                let stockPrice = [];
                let stockTime = [];
                for (let j = 0; j < prices.length; j++) {
                    let data = prices[j].PT;
                    let resTime = prices[j].writetime;
                    stockPrice.push(data);
                    stockTime.push(resTime);
                }
                const result = {
                    id,
                    stockname,
                    loop,
                    lastDraw,
                    timeLastDraw,
                    type,
                    stockPrice,
                    stockTime,
                    prices
                };
                // var end = +new Date(); // log end timestamp
                // var diff = end - start;
                // console.log(diff)
                return result;
            },

            // start classic .................................................................
            getStockName: state => id => {
                // console.log("getStockName")
                if (id == "") return;
                let names = id;
                let stock = id.split("-")[1];
                let loop = state.stocks[stock].loop;

                let result = {
                    names,
                    stock,
                    loop
                };
                return result;
            },
            getStockNewData: state => id => {
                // console.log("getStockNewData")
                if (id == "") return;
                let stock = id.split("-")[1];
                let result = [null];
                if (state.stocks[stock].crawlerData.length < 0) {
                    return result;
                }
                result = state.stocks[stock].crawlerData;
                return result;
            },
            getReference: state => id => {
                if (id == "") return;
                let stock = id.split("-")[1];
                let result = [null];
                if (state.stocks[stock].crawlerData.length < 0) {
                    return result;
                }
                result = state.stocks[stock].livePrice.refLink;
                return result;
            },
            // end classic .............................................................

            // get data for display in "/" route
            getStockChart(state, getters) {
                // console.log("getStockChart")
                let result = [];
                for (let i = 0; i < getters.getStockLength; i++) {
                    const id = getters.getStockKeys[i];
                    const stockname = state.stocks[id].stockname;
                    const loop = state.stocks[id].loop;
                    const type = state.stocks[id].type;
                    const lastDraw = state.stocks[id].lastDraw;
                    let prices = state.stocks[id].crawlerData;
                    let stockPrice = [];

                    for (let j = 0; j < prices.length; j++) {
                        let resPrice = prices[j].PT;
                        stockPrice.push(resPrice);
                    }
                    lastDraw = stockPrice[stockPrice.length - 1];
                    const data = {
                        id,
                        stockname,
                        loop,
                        lastDraw,
                        type,
                        stockPrice
                    };
                    result.push(data);
                }

                // console.log(result)
                return result;
            },
            // get some stock poproty to show in stock list page
            getStockList(state, getters) {
                // console.log("getStockList")
                let result = [];
                for (let i = 0; i < getters.getStockLength; i++) {
                    const id = getters.getStockKeys[i];
                    const urlLivePrice = state.stocks[id].url.livePrice;
                    // do not get stock if url live is null
                    if (urlLivePrice == null) {
                        continue;
                    }
                    const stockname = state.stocks[id].stockname;
                    const currentPrice = state.stocks[id].livePrice.currentPrice;
                    const previousPrice = state.stocks[id].livePrice.previousPrice;
                    const urlRef = state.stocks[id].livePrice.refLink;
                    const data = {
                        id,
                        stockname,
                        currentPrice,
                        previousPrice,
                        urlRef
                    };
                    result.push(data);
                }
                return result;
            },
            getStockCrawlerData: state => id => {
                // console.log("getStockCrawlerData")
                let ids = id == undefined || id == "" ? "btc1" : id;
                let result = [null];
                if (state.stocks[ids].crawlerData.length < 0) {
                    return result;
                }
                result = state.stocks[ids].crawlerData;
                return result;
            },
            // get stocks key like 'btc1','btc5','btc1',usindex
            getStockKeys(state) {
                return Object.keys(state.stocks);
            },
            // get how many stocks we have
            getStockLength(state) {
                return Object.keys(state.stocks).length;
            }
        }
    });
};

export default createStore;
