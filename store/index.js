import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            locales: ['us', 'cn'],
            locale: localStorage.getItem('lang'),
            balance: 895000,
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
                    stockname: "btc/usdt",
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
                    stockname: "us dollar index",
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
                    stockname: "btc/usdt",
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
            SET_LANG(state, locale) {
                if (state.locales.includes(locale)) {
                    state.locale = locale
                }
                localStorage.setItem('lang', locale)
            },
            setBalance(state, payload) {
                state.balance = payload
            },
            SET_TIME(state, payload) {
                state.time = payload
                console.log(state.time)
            },
            setLivePrice(state, payload) {
                state.liveprice = payload
                console.log("liveprice......")
                console.log(state.liveprice)
                console.log("liveprice.....")
            }
        },
        getters: {
            getCheckStock: (state) => (id) => {
                return state.stocks[id]
            },

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
            getPreviousPrice: (state) => (id) => {
                console.log("getPreviousPrice")
                if (id == "") {
                    return
                }
                const previousPrice = state.liveprice[id].previousPrice
                return previousPrice
            },
            getLiveTime: (state) => (id) => {
                // alert(Object.keys(state.time).length)
                console.log("getLiveTime")
                if ((id == "") || (Object.keys(state.time).length == 0)) {
                    return
                }
                const liveTime = state.time[id].now
                return liveTime
            },
            getLotteryDraw: (state) => (id) => {
                // alert(Object.keys(state.time).length)
                console.log("getLotteryDraw")
                if ((id == "") || (Object.keys(state.time).length == 0)) {
                    return
                }
                const lotteryDraw = state.time[id].timer
                return lotteryDraw
            },
            getStockLoop: (state) => (id) => {
                console.log("getStockLoop")
                if (id == "") return
                return state.stocks[id].loop
            },
            getStockLastDraw: (state) => (id) => {
                console.log("getStockLastDraw")
                if (id == "") return
                return state.stocks[id].lastDraw
            },
            // get user balance 
            getBalance(state) {
                return state.balance
            },
            // to show in betting
            getStockById: (state) => (id) => {
                console.log("getStockById")
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

            // classic getStockName
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

            // get data for display in "/" route
            getStockChart(state, getters) {
                console.log("getStockChart")

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

                console.log(result)
                return result
            },
            // get some stock poproty to show in stock list page
            getStockList(state, getters) {
                console.log("getStockList")
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
                console.log("getStockCrawlerData")
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
        },
        actions: {
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

        }
    })
}

export default createStore