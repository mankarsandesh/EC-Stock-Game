stocks = [
  {
    crawlerUrl: `/api/getCrawlerData?stockId=1&limit=100`,
    stockId: 7,
    stockName: "btc",
    loop: 1,
    type: "cypto",
    crawlerData: "",
    reference: "https://www.hbg.com/zh-cn/exchange/?s=btc_usdt"
  }
];

// split data that always changes (real time)
stocks = [
  {
    stockId: 7,
    livePrice: 9263.25,
    liveTime: 4,
    timer: 555,
  }
];
