import openSocket from "socket.io-client";
export default ({ store }) => {

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
        let time5 = data.sh000001.timer;
        let time1 = data.btc1.timer;
        // get new data crawler
        if (time5 == 241 || time1 == 41) {
            store.dispatch('asynInitCallApi')
        }
        // store.dispatch("asyncPayout")
        store.commit('SET_TIME', data)

        // set time login 
        var hours = 10; // Reset when storage is more than 20hours
        var now = new Date().getTime();
        var setupTime = localStorage.getItem('setupTime');
        if (setupTime == null) {
            localStorage.setItem('setupTime', now)
        } else {
            if (now - setupTime > hours * 60 * 60 * 1000) {
                localStorage.removeItem('apikey');
                localStorage.removeItem('setupTime');
                // localStorage.setItem('setupTime', now);
                location.href = "http://" + location.hostname + ":8001"
            }
        }

    });

    // store.dispatch('asynGetAllStock')
    store.dispatch('asynInitCallApi')
    store.dispatch("balance")
    store.dispatch("asyncPayout")

    setInterval(() => {
        store.dispatch('OnlineTime')
        store.dispatch("asynUserInfo")
    }, 3000);


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