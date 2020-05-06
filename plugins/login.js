import config from "../config/config.global";
import log from "roarr";
import axios from "axios";
import secureStorage from "./secure-storage";

export default async context => {
  try {
    document.referrer.match(/:\/\/(.[^/]+)/)[1];
    // Set Initial storage coins
    initLocalStorageCoin(context.store);    
    if (performance.navigation.type == 1) {
      // If User reloads the page
      // Set user data in vuex store
      context.store.dispatch("setUserData");
      // Set default language in vuex store
      context.store.dispatch("setLanguage", secureStorage.getItem("lang"));
    } else if (
      performance.navigation.type == 0 &&
      document.referrer.match(/:\/\/(.[^/]+)/)[1] == window.location.host
    ){
      // If user opens a new tab by right click
      // Set default language in vuex store
      // context.store.dispatch("setLanguage", secureStorage.getItem("lang"));
      // Set user data in vuex store
      context.store.dispatch("setUserData");
    } else {
      // If the user gets redirected from portal provider page
      // Check whether the portalProviderUUID, portalProviderUserId and balance exists in the query
      const portalProviderUUID = context.query.portalProviderUUID
        ? context.query.portalProviderUUID
        : undefined;
      const portalProviderUserId = context.query.portalProviderUserID
        ? context.query.portalProviderUserID
        : undefined;
      const balance = context.query.balance ? context.query.balance : undefined;

      // Validate Login values in URL
      validateLoginValues(
        portalProviderUUID,
        portalProviderUserId,
        balance,
        context.store
      );
      // Check User Login
      await checkUserLogin(
        portalProviderUUID,
        portalProviderUserId,
        balance,
        context.store
      );

      // Set default language
      setLanguage(context.store);
      // Set user data in vuex store
      context.store.dispatch("setUserData");
    }
  } catch (ex) {
    console.log(ex);
    // window.location.replace(`http://${secureStorage.getItem("referrerUrl")}/`);
  }
};

/**
 * Validate Login values in URL
 *
 * @param {*} portalProviderUUID
 * @param {*} portalProviderUserId
 * @param {*} balance
 * @param {*} store
 * @returns
 */
const validateLoginValues = (
  portalProviderUUID,
  portalProviderUserId,
  balance,
  store
) => {
  try {
    const error = [];
    if (!portalProviderUUID) {
      error.push(config.loginError.portalProvider);
    }
    if (!portalProviderUserId) {
      error.push(config.loginError.portalProviderUserId);
    }
    if (!balance) {
      error.push(config.loginError.balance);
    }
    if (error.length > 0) {
      store.dispatch("setLoginError", error);
      return true;
    } else {
      return false;
    }
  } catch (ex) {
    console.log(ex);
  }
};

/**
 * Check User Login from Server
 *
 * @param {*} portalProviderUUID
 * @param {*} portalProviderUserId
 * @param {*} balance
 * @param {*} store
 */
const checkUserLogin = async (
  portalProviderUUID,
  portalProviderUserId,
  balance,
  store
) => {
  try {
    if (config.authUser && config.authPassword) {
      var reqBody = {
        portalProviderUUID: portalProviderUUID,
        portalProviderUserID: portalProviderUserId,
        version: config.version,
        ip: "225.457.454.123",
        domain: document.referrer.match(/:\/\/(.[^/]+)/)[1],
        balance: balance
      };
      var { data } = await axios.post(config.userLoginAuth.url, reqBody, {
        headers: config.header
      });
      if (data.status) {
        var userUUID = data.data.userUUID;
        store.dispatch("setPortalProviderUUID", portalProviderUUID);
        store.dispatch("setUserUUID", userUUID);
        secureStorage.setItem("USER_UUID", userUUID); // Set User UUID in local Storage
        secureStorage.setItem("PORTAL_PROVIDERUUID", portalProviderUUID); // Set portal provider UUID in local storage
      } else {
        store.dispatch("setLoginError", [config.error.general]);
        throw new Error(config.error.general);
      }
    } else {
      store.dispatch("setLoginError", [config.loginError.authError]);
      throw new Error(config.loginError.authError);
    }
  } catch (ex) {
    console.log(ex);
    log.error(
      {
        req: reqBody,
        res: data,
        page: "plugins/callApi.js",
        apiUrl: config.userLoginAuth.url,
        provider: portalProviderUUID,
        user: userUUID
      },
      ex.message
    );
  }
};

/**
 * Set Default Language on Login
 *
 * @param {*} store
 */
const setLanguage = store => {
  const lang = secureStorage.getItem("lang")
    ? secureStorage.getItem("lang")
    : config.defaultLanguageLocale;
  store.dispatch("setLanguage", lang);
  secureStorage.setItem("lang", lang);
};

/**
 * Set Initial storage coins
 *
 * @param {*} store
 */

const initLocalStorageCoin = store => {
  const chips = secureStorage.getItem("coinsModern")
    ? secureStorage.getItem("coinsModern")
    : config.defaultCoinsModern;
  store.dispatch("setCoinsModern", chips);
  secureStorage.setItem("coinsModern", chips);
};
