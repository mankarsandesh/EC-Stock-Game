<template>
  <div>
    <h1>test</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      obj: {},
      stocks:{
          "btc1": {
                "url": {
                    "crawlUrl": "api/getCrawlerData?stockId=7&limit=300&apikey=aZJk8bn4di35MAm3norKLBAzski1jH86tqYJ0cgOh8ODel3GNTsY4iFePPJOozj9nqR5VMsdiTaG0KCm",
                    "livePrice": "000.55"
                },
                "stockId": 7,
                "stockName": "btc1",
                "loop": 1,
                "type": "crypto",
                "name": "btc",
                "crawlerData": 0,
                "lastDraw": 0,
                "timeLastDraw": 0,
                "livePrice": {
                    "refLink": "https://www.hbg.com/zh-cn/exchange/?s=btc_usdt"
                }
            },
           "sh000001": {
                "url": {
                    "crawlUrl": "api/getCrawlerData?stockId=1&limit=300&apikey=",
                    "livePrice": "000.55"
                },
                "stockId": 1,
                "stockName": "sh000001",
                "loop": 5,
                "type": "china",
                "name": "sh000001",
                "crawlerData": 0,
                "lastDraw": 0,
                "timeLastDraw": 0,
                "livePrice": {
                    "refLink": "http://finance.sina.com.cn/realstock/company/sh000001/nc.shtml"
                }
            },
            "sh000300": {
                "url": {
                    "crawlUrl": "api/getCrawlerData?stockId=2&limit=300&apikey=",
                    "livePrice": "000.55"
                },
                "stockId": 2,
                "stockName": "sh000300",
                "loop": 5,
                "type": "china",
                "name": "sh000300",
                "crawlerData": 0,
                "lastDraw": 0,
                "timeLastDraw": 0,
                "livePrice": {
                    "refLink": "http://finance.sina.com.cn/realstock/company/sh000300/nc.shtml"
                }
            },
             "sz399415": {
                "url": {
                    "crawlUrl": "api/getCrawlerData?stockId=3&limit=300&apikey=",
                    "livePrice": "000.55"
                },
                "stockId": 3,
                "stockName": "sz399415",
                "loop": 5,
                "type": "china",
                "name": "sz399415",
                "crawlerData": 0,
                "lastDraw": 0,
                "timeLastDraw": 0,
                "livePrice": {
                    "refLink": "http://finance.sina.com.cn/realstock/company/sz399415/nc.shtml"
                }
            }
      },
      data: {
                btc1: {
                    url: {
                        crawler: `/api/getCrawlerData?stockId=7&limit=300&apikey=`,
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
                        crawler: `/api/getCrawlerData?stockId=5&limit=300&apikey=`,
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
                        crawler: `/api/getCrawlerData?stockId=6&limit=300&apikey=`,
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
                sh000001: {
                    url: {
                        crawler: `/api/getCrawlerData?stockId=4&limit=300&apikey=`,
                        livePrice: "/api/newlivedata/sh01"
                    },
                    stockname: "sh000001",
                    name: "sh000001",
                    loop: 5,
                    type: "china",
                    crawlerData: "",
                    lastDraw: "",
                    timeLastDraw: "",
                    livePrice: {
                        refLink: "http://finance.sina.com.cn/realstock/company/sh000001/nc.shtml"
                    }
                },
                sz399001: {
                    url: {
                        crawler: `/api/getCrawlerData?stockId=3&limit=300&apikey=`,
                        livePrice: "/api/newlivedata/sz01"
                    },
                    stockname: "sz399001",
                    name: "sz399001",
                    loop: 5,
                    type: "china",
                    crawlerData: "",
                    lastDraw: "",
                    timeLastDraw: "",
                    livePrice: {
                        refLink: "http://finance.sina.com.cn/realstock/company/sz399001/nc.shtml"
                    }
                },
                sz399415: {
                    url: {
                        crawler: `/api/getCrawlerData?stockId=2&limit=300&apikey=`,
                        livePrice: "/api/newlivedata/sz15"
                    },
                    stockname: "sz399415",
                    name: "sz399415",
                    loop: 5,
                    type: "china",
                    crawlerData: "",
                    lastDraw: "",
                    timeLastDraw: "",
                    livePrice: {
                        refLink: "http://finance.sina.com.cn/realstock/company/sz399415/nc.shtml"
                    }
                },
                sh000300: {
                    url: {
                        crawler: `/api/getCrawlerData?stockId=1&limit=300&apikey=`,
                        livePrice: "/api/newlivedata/sz300"
                    },
                    stockname: "sh000300",
                    name: "sh000300",
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
    }
  },
  mounted() {
    console.log(this.stocks)
    // this.obj =  Object.assign({}, this.stocks);
    console.log(JSON.parse( this.stocks));
    console.log(this.data);
  }
};
</script>

<style>
</style>