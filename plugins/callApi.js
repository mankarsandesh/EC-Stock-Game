import openSocket from "socket.io-client";
export default ({
    store
}) => {
    // call Api to show in chart and store it in Vuex
    store.dispatch('asynInitCallApi')

    //coin modern set and get from localStorage
    initLocalStorageCoin(store)
        // set language
    setLanguage(store)
        // websocket broadcast live time aand timer
    const socket = openSocket("https://websocket-timer.herokuapp.com");
    socket.on("liveprice", data => {
        store.commit('setLivePrice', data)
    });
    socket.on("time", data => {
        let time5 = data.SH000001.timer;
        let time1 = data.btc1.timer;
        // get new data
        if (time5 == 241 || time1 == 41) {
            store.dispatch('asynInitCallApi')
        }
        store.commit('SET_TIME', data)
    });
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