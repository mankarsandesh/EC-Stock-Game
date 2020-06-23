import VuexPersistence from "vuex-persist";
import config from "../config/config.global";
import secureStorage from "./secure-storage";
import Cookies from "./js-cookie";

export default async context => {
  try {
    // document.referrer.match(/:\/\/(.[^/]+)/)[1];
    // http://192.168.1.131:8000/?radio-73=Hulk&serverLink=http%3A%2F%2F159.138.129.40%2F&portalProviderUUID=ef60e64b-dc17-4ff1-9f22-a177c6f1c204&portalProviderUserID=sandesh12&balance=300
    // Set Initial storage coins
    initLocalStorageCoin(context.store);
    console.log(performance.navigation.type);
    if (performance.navigation.type == 1) {
      // If User reloads the page
      if (
        Cookies.getJSON("login").userUUID &&
        Cookies.getJSON("login").portalProviderUUID
      ) {
        // If user has a valid session
        // Get vuex state if it exists in the local storage
        await window.onNuxtReady(() => {
          new VuexPersistence({
            storage: secureStorage,
            filter: mutation =>
              mutation.type == "SET_USER_DATA" ||
              mutation.type == "SET_LANGUAGE" ||
              mutation.type == "SET_GAME_ID" ||
              mutation.type == "SET_LIVE_ROAD_MAP" ||
              mutation.type == "SET_TEMP_MULTI_GAME_BET_DATA" ||
              mutation.type == "CLEAR_TEMP_MULTI_GAME_BET_DATA" ||
              mutation.type == "SET_COINS_MODERN" ||
              mutation.type == "SET_CHIPS"
          }).plugin(context.store);
        });
        // Set user data in vuex store
        context.store.dispatch("setUserData");
        context.store.dispatch(
          "setPortalProviderUUID",
          Cookies.getJSON("login").portalProviderUUID
        );
        // Set default language in vuex store
        context.store.dispatch("setLanguage", secureStorage.getItem("lang"));
      } else {
        // Invalid user session
        throw new Error("Unauthorized access. Please login again");
      }
    } else if (
      performance.navigation.type == 0 
    ) {
      console.log("Yesssssss");
      // If user opens a new tab by right click  
      if (  Cookies.getJSON("login") && 
        Cookies.getJSON("login").userUUID &&
        Cookies.getJSON("login").portalProviderUUID
      ) {
      
        // If the user has a valid session
        // Get vuex state if it exists in the local storage
        await window.onNuxtReady(() => {
          new VuexPersistence({
            storage: secureStorage,
            filter: mutation =>
              mutation.type == "SET_USER_DATA" ||
              mutation.type == "SET_LANGUAGE" ||
              mutation.type == "SET_GAME_ID" ||
              mutation.type == "SET_LIVE_ROAD_MAP" ||
              mutation.type == "SET_TEMP_MULTI_GAME_BET_DATA" ||
              mutation.type == "CLEAR_TEMP_MULTI_GAME_BET_DATA" ||
              mutation.type == "SET_COINS_MODERN" ||
              mutation.type == "SET_CHIPS"
          }).plugin(context.store);
        });

        // Set default language in vuex store
        context.store.dispatch("setLanguage", secureStorage.getItem("lang"));
        // Set user data in vuex store
        context.store.dispatch("setUserData");
        context.store.dispatch(
          "setPortalProviderUUID",
          Cookies.getJSON("login").portalProviderUUID
        );
      } else {
        console.log("User Login");
        // Invalid user session
        // throw new Error("Unauthorized access. Please login again");
    //   }
    // } else {
      // If the user gets redirected from portal provider page

      // Clear localStorage
      secureStorage.clear();

      // Get vuex state if it exists in the local storage
      await window.onNuxtReady(() => {
        new VuexPersistence({
          storage: secureStorage,
          filter: mutation =>
            mutation.type == "SET_USER_DATA" ||
            mutation.type == "SET_LANGUAGE" ||
            mutation.type == "SET_GAME_ID" ||
            mutation.type == "SET_LIVE_ROAD_MAP" ||
            mutation.type == "SET_TEMP_MULTI_GAME_BET_DATA" ||
            mutation.type == "CLEAR_TEMP_MULTI_GAME_BET_DATA" ||
            mutation.type == "SET_COINS_MODERN" ||
            mutation.type == "SET_CHIPS"
        }).plugin(context.store);
      });

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
      console.log("Validation");
      // Check User Login
      await checkUserLogin(
        portalProviderUUID,
        portalProviderUserId,
        balance,
        context.store,
        context.$axios
      );

      // Set default language
      setLanguage(context.store);
      // Set user data in vuex store
      context.store.dispatch("setUserData");

      // Set portal provider url
      secureStorage.setItem(
        "referrerUrl",
        "159.138.130.64/login/"
      );

      // // When the cookie expires redirect user to portal provider's login page
      // setTimeout(() => {
      //   window.location.replace(
      //     `http://${secureStorage.getItem("referrerUrl")}/`
      //   );
      // }, 24 * 60 * 60 * 1000);
    }
  }
  } catch (ex) {
    console.log(ex);
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
  store,
  axios
) => {
  try {
   const defaultCoinsModern =  ["100", "500", "1000", "5000", "10000"];
   const defaultCurrency =  1;
    if (config.authUser && config.authPassword) {
      var reqBody = {
        portalProviderUUID: portalProviderUUID,
        portalProviderUserID: portalProviderUserId,
        version: config.version,
        ip: "225.457.454.123",
        domain: "localhost",
        balance: balance,
        currencyID : defaultCurrency
      };
      var { data } = await axios.post(config.userLoginAuth.url, reqBody, {
        headers: config.header
      });
     console.log(data);
     
      if (data.status) {
        var userUUID = data.data.userUUID;
        store.dispatch("setPortalProviderUUID", portalProviderUUID);
        store.dispatch("setUserUUID", userUUID);
        store.dispatch("setCoinsModern", defaultCoinsModern);
        store.dispatch("setCurrency", defaultCurrency);
        secureStorage.setItem("USER_UUID", userUUID); // Set User UUID in local Storage
        secureStorage.setItem("PORTAL_PROVIDERUUID", portalProviderUUID); // Set portal provider UUID in local storage
        
        // Set Cookie for user session
        Cookies.set(
          "login",
          {
            portalProviderUUID,
            userUUID
          },
          {
            expires: config.sessionExpiryTime
          }
        );
      } else {
        store.dispatch("setLoginError", [data.message[0]]);
        throw new Error(data.message[0]);
      }
    } else {
      store.dispatch("setLoginError", [config.loginError.authError]);
      throw new Error(config.loginError.authError);
    }
  } catch (ex) {
    console.log(ex);
  }
};

/**
 * Set Default Language on Login
 *
 * @param {*} store
 */
const setLanguage = store => {
  const lang = store.getters.getLocale
    ? store.getters.getLocale
    : config.defaultLanguageLocale;
  store.dispatch("setLanguage", lang);
};

/**
 * Set Initial storage coins
 *
 * @param {*} store
 */

const initLocalStorageCoin = store => {
  console.log("Login");
  const chips = secureStorage.getItem("coinsModern")
    ? secureStorage.getItem("coinsModern")
    : config.defaultCoinsModern;
  store.dispatch("setCoinsModern", chips);
};
