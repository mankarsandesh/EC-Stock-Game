[{
        stockname: "btc/usdt",
        type: "cypto",
        loop: 1,
        apiUrl: [{
            crawlData: "http://159.138.54.214/api/datahistory/BTCUSDT1",
            timer: "url",
            livePrice: "http://159.138.54.214/api/getlivedata/btc"
        }]
    },
    {
        stockname: "btc/usdt",
        type: "cypto",
        loop: 5,
        apiUrl: [{
            crawlData: "http://159.138.54.214/api/datahistory/BTCUSDT",
            timer: "url",
            livePrice: "http://159.138.54.214/api/getlivedata/btc"
        }]
    },
    {
        stockname: "us dollar index",
        type: "usa",
        loop: 5,
        apiUrl: [{
            crawlData: "/api/datahistory/US dollar Index",
            timer: "url",
            livePrice: "http://159.138.54.214/api/getlivedata/btc"
        }]
    },
]