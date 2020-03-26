export const state = () => ({
    locales: ['us', 'cn'],
    locale: localStorage.getItem('lang'),
    balance: 895000,

    // all stocks data 
    // if we have new stock available we can add it here with same object format 
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
            livePrice: {
                currentPrice: 0,
                previousPrice: 0,
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
            livePrice: {
                currentPrice: 0,
                previousPrice: 0,
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
            livePrice: {
                currentPrice: 0,
                previousPrice: 0,
                refLink: "https://www.hbg.com/zh-cn/exchange/?s=btc_usdt"
            }
        }

    }

});