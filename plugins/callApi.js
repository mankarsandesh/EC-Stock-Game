import openSocket from "socket.io-client";
import config from "../config/config.global";
import axios from "axios";
export default ({ store }) => {
  //coin modern set and get from localStorage
  initLocalStorageCoin(store);
  // set language
  setLanguage(store);
  store.dispatch("setUserData");
  getActiveGamesByCategory(store);
};

async function getActiveGamesByCategory(store) {
  try {
    const res = await axios.post(
      config.getActiveGamesByCategory.url,
      {
        portalProviderUUID: store.getters.getPortalProviderUUID,
        version: config.version
      },
      {
        headers: config.header
      }
    );
    if (res.status) {
      store.dispatch("setStockCategory", res.data.data);
    } else {
      throw new Error(res.message);
    }
  } catch (ex) {
    getActiveGamesByCategory(store);
    console.error(ex.message);
  }
}

function setLanguage(store) {
  let lang = localStorage.getItem("lang");
  if (lang == null) {
    store.commit("setLanguage", "cn");
    localStorage.setItem("lang", store.getters.getLocale);
  }
}

function initLocalStorageCoin(store) {
  let coins = localStorage.getItem("coinModern");
  // alert(coins)
  if (coins == null) {
    let defaultCoin = '["100", "500", "1000", "5000", "10000"]';
    localStorage.setItem("coinModern", defaultCoin);
  }
  store.dispatch("setCoinsModern");
}
