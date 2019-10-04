export const urlapi = {
    props: {
        stockname: String
    },
    data() {
        return {
            api: "",
            apis: "",
            linkreference: ""
        }
    },
    methods: {
        url(stockname) {
            if (stockname === "usindex") {
                this.api = "http://159.138.54.214/api/usindex";
                this.apis = "http://159.138.54.214/api/datahistory/US dollar Index";
                this.linkreference = "https://finance.sina.com.cn/money/forex/hq/DINIW.shtml";
            } else if (stockname === "btc5") {
                this.api = "http://159.138.54.214/api/btc";
                this.apis = "http://159.138.54.214/api/datahistory/BTCUSDT";
                this.linkreference = "https://www.hbg.com/zh-cn/exchange/?s=btc_usdt";
            } else if (stockname === "btc1") {
                this.api = "http://159.138.54.214/api/btc1";
                this.apis = "http://159.138.54.214/api/datahistory/BTCUSDT1";
                this.linkreference = "https://www.hbg.com/zh-cn/exchange/?s=btc_usdt";
            } else if (stockname === "SH00300") {
                this.api = "http://159.138.54.214/api/sh00300";
                this.apis = "http://159.138.54.214/api/datahistory/SH00300";
                this.linkreference = "http://finance.sina.com.cn/realstock/company/sh000300/nc.shtml";
            } else if (stockname === "SZ399001") {
                this.api = "http://159.138.54.214/api/sz399001";
                this.apis = "http://159.138.54.214/api/datahistory/SZ399001";
                this.linkreference = "http://finance.sina.com.cn/realstock/company/sz399001/nc.shtml";
            } else if (stockname === "SZ399415") {
                this.api = "http://159.138.54.214/api/sz399415";
                this.apis = "http://159.138.54.214/api/datahistory/SZ399415";
                this.linkreference = "http://finance.sina.com.cn/realstock/company/sz399415/nc.shtml";
            } else if (stockname === "SH000001") {
                this.api = "http://159.138.54.214/api/apicrawl/";
                this.apis = "http://159.138.54.214/api/datahistory/SH000001";
                this.linkreference = "http://finance.sina.com.cn/realstock/company/sh000001/nc.shtml";
            }
        }
    }
}