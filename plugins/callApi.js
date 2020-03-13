import openSocket from "socket.io-client";
export default ({ store }) => {

    //coin modern set and get from localStorage
    initLocalStorageCoin(store)
        // set language
    setLanguage(store)
        // websocket broadcast live time aand timer
    const socket = openSocket("https://apitimer.herokuapp.com");
    socket.on("liveprice", data => {
        store.commit('setLivePrice', data)
    });
    socket.on("time", data => {
        let time5 = data.sh000001.timer;
        let time1 = data.btc1.timer;
        // get new data crawler
        if (time5 == 241 || time1 == 41) {
            
        }
        // store.dispatch("asyncPayout")
        store.commit('SET_TIME', data)
    });

    // store.dispatch('asynGetAllStock')
    store.dispatch("balance")
    store.dispatch("asyncPayout")
        // store.dispatch("asyncStocks");
    store.dispatch("asynUserInfo")
}

function setLanguage(store) {
    let lang = localStorage.getItem("lang");
    if (lang == null) {
        store.commit('SET_LANG', "cn")
        localStorage.setItem("lang", store.getters.getlocale);
    }
}

function initLocalStorageCoin(store) {
    let coins = localStorage.getItem("coinModern");
    // alert(coins)
    if (coins == null) {
        let defaultCoin = '["100", "500", "1000", "5000", "10000"]'
        localStorage.setItem("coinModern", defaultCoin);
    }
    store.commit('setCoins_modern')
}