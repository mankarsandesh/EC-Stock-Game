import Vuex from 'vuex'


const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            auth_token: "",
            userData: {},
            footerBetAmount: 0,
            // store data betting
            onGoingBet: [],
            // store data betting that not confirm yet (multi game and fullscreen mode)
            multiGameBet: [],
            // store staock id to display on multi game
            stockMultigame: [],
            locales: ['cn', 'us', 'th', 'la'],
            locale: localStorage.getItem('lang'),
            coins_modern: [],
            // multi game
            isSendBetting: false,
            urltest: "https://159.138.54.214",
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
                SH000001: {
                    currentPrice: 0,
                    previousPrice: 0
                },
                SZ399001: {
                    currentPrice: 0,
                    previousPrice: 0
                },
                SZ399415: {
                    currentPrice: 0,
                    previousPrice: 0
                },
                SH00300: {
                    currentPrice: 0,
                    previousPrice: 0
                }
            },
            stocks: {
                btc1: {
                    url: {
                        crawler: "/api/datahistory/BTCUSDT1",
                        livePrice: "/api/newlivedata/btc"
                    },
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
                },
                usindex: {
                    url: {
                        crawler: "/api/datahistory/US dollar Index",
                        livePrice: "/api/newlivedata/usindex"
                    },
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
                        crawler: "/api/datahistory/BTCUSDT",
                        //  // set liveprice to null for use the same liveprice in  loop 1 above
                        //  // it will not call api
                        //  // it must has loop 1 above  or other loop above
                        livePrice: "/api/newlivedata/btc"
                    },
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
                SH000001: {
                    url: {
                        crawler: "/api/datahistory/SH000001",
                        livePrice: "/api/newlivedata/sh01"
                    },
                    stockname: "SH000001",
                    name: "SH000001",
                    loop: 5,
                    type: "china",
                    crawlerData: "",
                    lastDraw: "",
                    timeLastDraw: "",
                    livePrice: {
                        refLink: "http://finance.sina.com.cn/realstock/company/sh000001/nc.shtml"
                    }
                },
                SZ399001: {
                    url: {
                        crawler: "/api/datahistory/SZ399001",
                        livePrice: "/api/newlivedata/sz01"
                    },
                    stockname: "SZ399001",
                    name: "SZ399001",
                    loop: 5,
                    type: "china",
                    crawlerData: "",
                    lastDraw: "",
                    timeLastDraw: "",
                    livePrice: {
                        refLink: "http://finance.sina.com.cn/realstock/company/sz399001/nc.shtml"
                    }
                },
                SZ399415: {
                    url: {
                        crawler: "/api/datahistory/SZ399415",
                        livePrice: "/api/newlivedata/sz15"
                    },
                    stockname: "SZ399415",
                    name: "SZ399415",
                    loop: 5,
                    type: "china",
                    crawlerData: "",
                    lastDraw: "",
                    timeLastDraw: "",
                    livePrice: {
                        refLink: "http://finance.sina.com.cn/realstock/company/sz399415/nc.shtml"
                    }
                },
                SH00300: {
                    url: {
                        crawler: "/api/datahistory/SH00300",
                        livePrice: "/api/newlivedata/sz300"
                    },
                    stockname: "SH00300",
                    name: "SH00300",
                    loop: 5,
                    type: "china",
                    crawlerData: "",

                    lastDraw: "",
                    timeLastDraw: "",
                    livePrice: {
                        refLink: "http://finance.sina.com.cn/realstock/company/sh000300/nc.shtml"
                    }
                }

            },
            time: {},
        }),
        mutations: {
            setIsSendBetting(state, value) {
                state.isSendBetting = value
            },
            setUserData(state, payload) {
                state.userData = payload
            },

            // store api_token in vuex auth_token
            setAuth_token(state, token) {
                state.auth_token = token
            },
            // add mpre stock to multi game
            addStockMultigame(state, stockId) {
                if (state.stockMultigame.includes(stockId)) return
                state.stockMultigame.push(stockId)
            },
            // push data to on going bet
            pushDataOnGoingBet(state, payload) {
                state.onGoingBet.splice(0, 0, payload)
            },
            // push data to on going bet
            pushDataMultiGameBet(state, payload) {
                state.multiGameBet.push(payload)
            },
            clearDataMultiGameBet(state) {
                state.multiGameBet = []
                state.footerBetAmount = 0
                console.warn(state.multiGameBet)
            },
            removeAllFooterBet(state) {
                state.multiGameBet = []
            },
            // store coin in localStorage payload must be "String array" '["100", "500", "1000", "5000", "10000"]'
            setCoins_modern(state) {
                state.coins_modern = JSON.parse(localStorage.getItem("coinModern"))
            },
            // set language
            SET_LANG(state, locale) {
                if (state.locales.includes(locale)) {
                    state.locale = locale
                }
                localStorage.setItem('lang', locale)
            },
            // set user balance
            setBalance(state, payload) {
                state.balance = payload
            },
            SET_TIME(state, payload) {
                state.time = payload
                    // console.log(state.time)
            },
            // set Live price for stocks
            setLivePrice(state, payload) {
                state.liveprice = payload
                    // console.log("liveprice......")
                    // console.log(state.liveprice)
                    // console.log("liveprice.....")
            },
            setFooterBetAmount(state, payload) {
                state.footerBetAmount = parseInt(payload)
            }
        },
        actions: {
            async makeAuth(context) {
                console.warn("auth working...")
                const body = {
                    client_id: 8,
                    "webToken": "QQcZ3viwlJw9jKbiFI7J5dqqSz8bNFRRSclxM34H",
                    "name": "Macky",
                    "userId": "222333",
                    "balance": 800000,
                    "webId": "0001"
                }
                try {
                    if (sessionStorage.apikey == null) {

                        const res = await this.$axios.$post(`${context.getters.getUrltest}/api/redirect`, body)
                        const token = res.data.token
                        const userRes = await this.$axios.$get(`${context.getters.getUrltest}/api/me?apikey=${token}`)
                        const userData = {
                            name: userRes.name,
                            balance: userRes.userBalance,
                        }
                        context.commit("setAuth_token", token)
                        context.commit("setUserData", userData)
                        console.log("userRes")

                        console.log(token)
                        sessionStorage.apikey = token
                        console.log("userRes")
                    }
                } catch (ex) {
                    console.error(ex)
                    alert(ex)
                }

            },
            async sendBetting(context) {
                context.commit("setIsSendBetting", true)
                console.warn("sendBetting...")
                const betData = {
                        "data": [...context.state.multiGameBet]
                    }
                    // console.log(betData)
                try {
                    const res = await this.$axios.$post(`${context.getters.getUrltest}/api/storebet?apikey=${context.state.auth_token}`, betData)

                    console.log("res./.......")
                    console.log(res)
                    console.log("res...........")
                    if (res.status) {
                        context.commit("setIsSendBetting", false)
                        context.commit("clearDataMultiGameBet")
                        this._vm.$swal({
                            type: "success",
                            title: "Confirm!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        context.commit("setIsSendBetting", false)
                        this._vm.$swal({
                            type: "error",
                            title: `error ${res.message}`,
                            showConfirmButton: true
                        });

                    }
                } catch (ex) {
                    console.error(ex)
                    context.commit("setIsSendBetting", false)


                }

            },
            asynInitCallApi(context) {
                // call crawler api
                for (let i = 0; i < context.getters.getStockLength; i++) {
                    let name = context.getters.getStockKeys[i]
                    let url = context.state.stocks[context.getters.getStockKeys[i]].url.crawler
                    let payload = {
                        url,
                        name
                    }
                    context.dispatch("asynCrawlerStock", payload)
                }
                context.getters.getStockChart
                    // call live price api
                setInterval(function() {
                    for (let i = 0; i < context.getters.getStockLength; i++) {
                        let url = context.state.stocks[context.getters.getStockKeys[i]].url.livePrice
                            // check if one stock has multi loop it will use the same live price
                            // and in states.stocks url live price is setten to "null"
                            // disable first by macky 11:35 02/09/2019
                            // if (url == null) {    
                            //     continue
                            // }
                        let name = context.getters.getStockKeys[i]
                        let payload = {
                            url,
                            name
                        }
                        context.dispatch("asynLivePrice", payload)
                    }
                }, 10000);

            },
            async asynBalance(context) {
                try {

                } catch (error) {
                    console.log(error)
                }
            },
            // to get crawler
            async asynCrawlerStock(context, payload) {
                try {
                    const url = payload.url
                    const name = payload.name
                    const result = await this.$axios.$get(url)
                    if (result) {
                        context.state.stocks[name].crawlerData = result
                        context.state.stocks[name].lastDraw = result[result.length - 1].PT
                        context.state.stocks[name].timeLastDraw = result[result.length - 1].created_at
                            // console.log(context.state.stocks[name].crawlerData)
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            // to get live price
            async asynLivePrice(context, payload) {
                try {
                    const url = payload.url
                    const name = payload.name
                    const res = await this.$axios.$get(url)
                    if (res) {
                        context.state.stocks[name].livePrice.currentPrice = res.data.currentPrice
                        context.state.stocks[name].livePrice.previousPrice = res.data.previousPrice
                    }
                } catch (error) {
                    console.log(error)
                }
            },

        },
        getters: {
            getUrltest(state) {
                return state.urltest
            },
            getIsSendBetting(state) {
                return state.isSendbetting
            },
            // get user name
            getUserName(state) {
                return state.userData.name

            },
            // get user balance 
            getBalance(state) {
                return state.userData.balance
            },

            // get auth_token
            getAuth_token(state) {
                return state.auth_token
            },
            getAllStockByType(state, getters) {
                let stockData = []
                let stockType = []
                    // get type for all stocks
                for (let i = 0; i < getters.getStockLength; i++) {
                    const id = getters.getStockKeys[i]
                    const type = state.stocks[id].type

                    const data = {
                        type: type,
                        stockName: []
                    }
                    if (!stockType.includes(type)) {
                        stockType.push(type)
                        stockData.push(data)
                    }
                }
                // get stock name for all stocks
                let stockName = []
                for (let i = 0; i < stockType.length; i++) {
                    for (let j = 0; j < getters.getStockLength; j++) {
                        const id = getters.getStockKeys[j]
                        const type = state.stocks[id].type
                        if (type === stockType[i]) {

                            const name = state.stocks[id].name
                            const data = {
                                name: name,
                                loop: []
                            }
                            if (!stockName.includes(name)) {
                                stockName.push(name)
                                stockData[i].stockName.push(data)
                            }
                        }
                    }
                }
                // get loop 
                let loop = []
                for (let i = 0; i < stockType.length; i++) {
                    for (let j = 0; j < getters.getStockLength; j++) {
                        const id = getters.getStockKeys[j]
                        const type = state.stocks[id].type
                        if (type === stockType[i]) {

                            const loop = state.stocks[id].loop
                            const stockId = state.stocks[id].stockname
                            const data = {
                                loop: loop,
                                stockId: stockId
                            }

                            console.warn(data)
                            console.warn(type)

                            for (let ok = 0; ok < stockData[i].stockName.length; ok++) {
                                const name = stockData[i].stockName[ok].name
                                stockData[i].stockName[ok].loop.push(data)

                            }
                            // alert(type)
                        }
                    }
                }
                console.warn(stockData.stockName)
                return stockData
            },
            // check stock in multi game if exits disable button
            checkMultigameExistAndDisable: (state) => (data) => {
                if (!data.isMultigame) return ""

                const result = state.stockMultigame.includes(data.stockId)
                if (result)
                    return "pointer-events: none"
                else
                    return ""
            },
            // check stock in multi game if exits show icon "check"
            checkMultigameExistAndShowIcon: (state) => (data) => {
                if (!data.isMultigame) return false
                const result = state.stockMultigame.includes(data.stockId)
                if (result)
                    return true
                else
                    return false
            },
            // get stock id to show in multi game
            getStockMultigame(state) {
                return state.stockMultigame
            },
            // get amount of betting that already confirm
            getBettingAmount(state) {
                return state.onGoingBet.map(x => x.betAmount).reduce((a, b) => a + b, 0)
            },
            // get amount of betting already confirmed and not confirm
            getAllBettingAmount(state) {
                let amount1 = state.onGoingBet.map(x => x.amount).reduce((a, b) => a + b, 0)
                let amount2 = state.multiGameBet.map(x => x.amount).reduce((a, b) => a + b, 0)
                return amount1 + amount2
            },
            // get multiGameBet length
            getMultiGameBetLength(state) {
                return state.multiGameBet.length
            },
            // get data betting
            getOnGoingBet(state) {
                return state.onGoingBet
            },
            getAmountBettingByStockId: (state) => (stockId) => {
                function getAmount(object) {
                    // find stockname 
                    if (object.findIndex(x => x.stockId === stockId) == -1) return 0
                    let result = object.filter(x => x.stockId === stockId).map(x => x.amount).reduce((a, b) => a + b, 0)
                    return parseInt(result)
                }
                return getAmount(state.multiGameBet) + getAmount(state.onGoingBet)
            },
            // to show ship and amount on bet button
            getAmountMultiGameBet: (state) => (data) => {
                function getAmount(object) {
                    // find stockId
                    if (object.findIndex(x => x.stockId === data.stockId) == -1) return 0
                        // get data by stockId
                    let stockIdObject = object.filter(x => x.stockId === data.stockId)
                        // check rule in stockId
                    if (stockIdObject.findIndex(x => x.gameRule === data.gameRule) == -1) return 0
                        // get amount by rule
                    let result = stockIdObject.filter(x => x.gameRule === data.gameRule).map(x => x.amount).reduce((a, b) => a + b, 0)
                    return parseInt(result)
                }
                return getAmount(state.multiGameBet) + getAmount(state.onGoingBet)
            },
            getAmountBetSpecificNumber: (state) => (data) => {
                function getAmount(object) {
                    let count = 9
                        // find stockId 
                    if (object.findIndex(x => x.stockId === data.stockId) == -1) return 0
                        // get data by stockId
                    let stockIdObject = object.filter(x => x.stockId === data.stockId)
                        // check rule in stockId
                        // if (stockIdObject.findIndex(x => x.betId === data.betId) == -1) return 0

                    // get amount by rule
                    let result = 0
                    for (let i = 0; i <= count; i++) {
                        result = result + stockIdObject.filter(x => x.gameRule.toLowerCase()
                                .includes(`${data.gameRule}-${i}`))
                            .map(x => x.amount).reduce((a, b) => a + b, 0)
                    }
                    // .map(x => x.amount).reduce((a, b) => a + b, 0)
                    return result
                }
                return getAmount(state.multiGameBet) + getAmount(state.onGoingBet)
            },
            //get betting data
            getOnBetting(state) {
                return state.onGoingBet
            },
            // get data betting that not confirn=m yet "available on fullscreen mode and multi game"
            getMultiGameBet(state) {
                return state.multiGameBet
            },
            checkFooterBet(state) {
                if (state.footerBetAmount == 0) {
                    return false
                } else {
                    return true
                }
            },
            getFooterBetAmount(state) {
                return state.footerBetAmount
            },
            // get chip amount 
            getCoins_modern(state) {
                return state.coins_modern
            },

            // check stock name is exists or not 
            getCheckStock: (state) => (id) => {
                return state.stocks[id]
            },

            // get current language 
            getlocale(state) {
                return state.locale
            },
            // sometimes you  need to get only liveprice -----> believe me ^_^ <------
            getLivePrice: (state) => (id) => {
                // console.log("getLivePrice")
                if (id == "") {
                    return
                }
                const livePrice = state.liveprice[id].currentPrice
                return livePrice
            },
            // get previouse price to compare with current price to know to ti's down or up
            getPreviousPrice: (state) => (id) => {
                // console.log("getPreviousPrice")
                if (id == "") {
                    return
                }
                const previousPrice = state.liveprice[id].previousPrice
                return previousPrice
            },
            // get loop by stock id becuase in url be like these "btc1,btc5..."
            getLoop: (state) => (id) => {
                // console.log("getLoop")
                if (id == "") {
                    return
                }
                const loop = state.stocks[id].loop
                return loop
            },
            // get stock type
            getStockType: (state) => (id) => {
                // console.log("getStockType")
                if (id == "") {
                    return
                }
                const type = state.stocks[id].type
                return type
            },
            // get live time
            getLiveTime: (state) => (id) => {
                // alert(Object.keys(state.time).length)
                // console.log("getLiveTime")
                if ((id == "") || (Object.keys(state.time).length == 0)) {
                    return
                }
                const liveTime = state.time[id].now
                return liveTime
            },
            // get countdown timer
            getLotteryDraw: (state) => (id) => {
                // alert(Object.keys(state.time).length)
                // console.log("getLotteryDraw")
                if ((id == "") || (Object.keys(state.time).length == 0)) {
                    return
                }
                const lotteryDraw = state.time[id].timer
                return lotteryDraw
            },
            getStockLoop: (state) => (id) => {
                // console.log("getStockLoop")
                if (id == "") return
                return state.stocks[id].loop
            },
            // get last draw
            getStockLastDraw: (state) => (id) => {
                // console.log("getStockLastDraw")
                if (id == "") return
                return state.stocks[id].lastDraw
            },

            // to show in betting
            getStockById: (state) => (id) => {
                // console.log("getStockById")
                if (id == "") return
                const stockname = state.stocks[id].stockname
                const loop = state.stocks[id].loop
                const type = state.stocks[id].type
                const lastDraw = state.stocks[id].lastDraw
                const timeLastDraw = state.stocks[id].timeLastDraw
                let prices = state.stocks[id].crawlerData
                let stockPrice = []
                let stockTime = []
                for (let j = 0; j < prices.length; j++) {
                    let data = prices[j].PT
                    let resTime = prices[j].created_at
                    stockPrice.push(data)
                    stockTime.push(resTime)
                }
                const result = {
                    id,
                    stockname,
                    loop,
                    lastDraw,
                    timeLastDraw,
                    type,
                    stockPrice,
                    stockTime
                }
                return result
            },

            // start classic .................................................................
            getStockName: (state) => (id) => {
                // console.log("getStockName")
                if (id == "") return
                let names = id
                let stock = id.split('-')[1]
                let loop = state.stocks[stock].loop

                let result = {
                    names,
                    stock,
                    loop,
                }
                return result
            },
            getStockNewData: (state) => (id) => {
                // console.log("getStockNewData")
                if (id == "") return
                let stock = id.split('-')[1]
                let result = [null]
                if (state.stocks[stock].crawlerData.length < 0) {
                    return result
                }
                result = state.stocks[stock].crawlerData
                return result
            },
            getReference: (state) => (id) => {
                if (id == "") return
                let stock = id.split('-')[1]
                let result = [null]
                if (state.stocks[stock].crawlerData.length < 0) {
                    return result
                }
                result = state.stocks[stock].livePrice.refLink
                return result
            },
            // end classic .............................................................

            // get data for display in "/" route
            getStockChart(state, getters) {
                // console.log("getStockChart")

                let result = []
                for (let i = 0; i < getters.getStockLength; i++) {
                    const id = getters.getStockKeys[i]
                    const stockname = state.stocks[id].stockname
                    const loop = state.stocks[id].loop
                    const type = state.stocks[id].type
                    const lastDraw = state.stocks[id].lastDraw
                    let prices = state.stocks[id].crawlerData
                    let stockPrice = []

                    for (let j = 0; j < prices.length; j++) {
                        let resPrice = prices[j].PT
                        stockPrice.push(resPrice)
                    }
                    lastDraw = stockPrice[stockPrice.length - 1]
                    const data = {
                        id,
                        stockname,
                        loop,
                        lastDraw,
                        type,
                        stockPrice

                    }
                    result.push(data)
                }

                // console.log(result)
                return result
            },
            // get some stock poproty to show in stock list page
            getStockList(state, getters) {
                // console.log("getStockList")
                let result = []
                for (let i = 0; i < getters.getStockLength; i++) {
                    const id = getters.getStockKeys[i]
                    const urlLivePrice = state.stocks[id].url.livePrice
                        // do not get stock if url live is null
                    if (urlLivePrice == null) {
                        continue
                    }
                    const stockname = state.stocks[id].stockname
                    const currentPrice = state.stocks[id].livePrice.currentPrice
                    const previousPrice = state.stocks[id].livePrice.previousPrice
                    const urlRef = state.stocks[id].livePrice.refLink
                    const data = {
                        id,
                        stockname,
                        currentPrice,
                        previousPrice,
                        urlRef
                    }
                    result.push(data)
                }
                return result
            },
            getStockCrawlerData: (state) => (id) => {
                // console.log("getStockCrawlerData")
                let result = [null]
                if (state.stocks[id].crawlerData.length < 0) {
                    return result
                }
                result = state.stocks[id].crawlerData
                return result
            },
            // get stocks key like 'btc1','btc5','btc1',usindex
            getStockKeys(state) {
                return Object.keys(state.stocks)
            },
            // get how many stocks we have
            getStockLength(state) {
                return Object.keys(state.stocks).length
            }
        }

    })
}

export default createStore