export const getters = () => ({
    getlocale(state) {
        return state.locale
    },
    // sometimes you  need to get only liveprice -----> believe me ^_^ <------
    getLivePrice: (state, getters) => (id) => {
        console.log("getLivePrice")
        if (id == "") {
            return
        }
        const livePrice = state.stocks[id].livePrice.currentPrice
        return livePrice
    },
    // get user balance 
    getBalance(state) {
        return state.balance
    },
    // to show in betting
    getStockById: (state) => (id) => {
        console.log("getStockById")
        if (id == "") {
            return
        }
        const stockname = state.stocks[id].stockname
        const loop = state.stocks[id].loop
        const type = state.stocks[id].type
        const lastDraw = state.stocks[id].lastDraw
        let prices = state.stocks[id].crawlerData
        let stockPrice = []
        for (let j = 0; j < prices.length; j++) {
            let data = prices[j].PT
            stockPrice.push(data)
        }
        const result = {
            id,
            stockname,
            loop,
            lastDraw,
            type,
            stockPrice
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
                let data = prices[j].PT
                stockPrice.push(data)
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
    // get stocks key like 'btc1','btc5','btc1',usindex
    getStockKeys(state) {
        return Object.keys(state.stocks)
    },
    // get how many stocks we have
    getStockLength(state) {
        return Object.keys(state.stocks).length
    },
    getStockName: (state) => (id) => {
        console.log("getStockName")
        if (id == "") {
            return
        }
    }
})