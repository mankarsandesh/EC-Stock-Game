import config from "../config/config.global";
import log from "roarr";
import axios from "axios";

export default async context => {
  try {
    document.referrer.match(/:\/\/(.[^/]+)/)[1];

    // Set Initial storage coins
    initLocalStorageCoin(context.store);

    // Check whether the portalProviderUUID, portalProviderUserId and balance exists in the query
    const portalProviderUUID = context.query.portalProviderUUID
      ? context.query.portalProviderUUID
      : undefined;
    const portalProviderUserId = context.query.portalProviderUserID
      ? context.query.portalProviderUserID
      : undefined;
    const balance = context.query.balance ? context.query.balance : undefined;

    // Validate Login values in URL
    const isError = validateLoginValues(
      portalProviderUUID,
      portalProviderUserId,
      balance,
      context.store
    );

    if (isError) {
      // Set user data in vuex store
      context.store.dispatch("setUserData");
      // Set default language in vuex store
      context.store.dispatch("setLanguage", localStorage.getItem("lang"));
    } else {
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
    window.location.replace(config.whitelabelUrl);
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
        localStorage.setItem("USER_UUID", userUUID); // Set User UUID in local Storage
        localStorage.setItem("PORTAL_PROVIDERUUID", portalProviderUUID); // Set portal provider UUID in local storage
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
  store.dispatch("setLanguage", config.defaultLanguageLocale);
  localStorage.setItem("lang", config.defaultLanguageLocale);
};

/**
 * Set Initial storage coins
 *
 * @param {*} store
 */
const initLocalStorageCoin = store => {
  store.dispatch("setCoinsModern", config.defaultCoinsModern);
  localStorage.setItem("coinModern", config.defaultCoinsModern);
};
