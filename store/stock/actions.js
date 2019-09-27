export const actions = () => ({
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
        }, 1000);

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
})