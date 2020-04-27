import config from "../config/config.global";
import log from "roarr";
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
    var reqBody = {
      portalProviderUUID: store.getters.getPortalProviderUUID,
      version: config.version
    };
    var res = await axios.post(config.getActiveGamesByCategory.url, reqBody, {
      headers: config.header
    });
    if (res.data.status) {
      store.dispatch("setStockCategory", res.data.data);
    } else {
      throw new Error(config.error.general);
    }
  } catch (ex) {
    console.log(ex.message);
    log.error(
      {
        req: reqBody,
        res: res.data,
        page: "plugins/callApi.js",
        apiUrl: config.getActiveGamesByCategory.url,
        provider: localStorage.getItem("PORTAL_PROVIDERUUID"),
        user: localStorage.getItem("USER_UUID")
      },
      ex.message
    );
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
  if (coins == null) {
    let defaultCoin = '["100", "500", "1000", "5000", "10000"]';
    localStorage.setItem("coinModern", defaultCoin);
  }
  store.dispatch("setCoinsModern");
}
