import VuexPersistence from "vuex-persist";

import config from "../config/config.global";
import log from "roarr";
import axios from "axios";
import secureStorage from "./secure-storage";
import Cookies from "./js-cookie";

export default async context => {
  try {
    // document.referrer.match(/:\/\/(.[^/]+)/)[1];
    // Set Initial storage coins
    initLocalStorageCoin(context.store);

    if (performance.navigation.type == 1) {
      // If User reloads the page
      if (
        Cookies.getJSON("login").userUUID &&
        Cookies.getJSON("login").portalProviderUUID
      ) {
        // If user has a valid session
        // Get vuex state from local storage
        window.onNuxtReady(() => {
          new VuexPersistence({
            storage: secureStorage,
            filter: mutation =>
              mutation.type == "SET_USER_DATA" ||
              mutation.type == "SET_LANGUAGE" ||
              mutation.type == "SET_GAME_ID" ||
              mutation.type == "SET_LIVE_ROAD_MAP" ||
              mutation.type == "SET_TEMP_MULTI_GAME_BET_DATA" ||
              mutation.type == "CLEAR_TEMP_MULTI_GAME_BET_DATA"
          }).plugin(context.store);
        });
        // Set portal provider UUID in store
        context.store.dispatch("setPortalProviderUUID", Cookies.getJSON("login").portalProviderUUID);
        // Set user data in vuex store
        context.store.dispatch("setUserData");
        // Set default language in vuex store
        context.store.dispatch("setLanguage", secureStorage.getItem("lang"));
      } else {
        // Invalid user session
        throw new Error("Unauthorized access. Please login again");
      }
    } else {
      // If the user gets redirected from portal provider page
      // Check whether the portalProviderUUID, portalProviderUserId and balance exists
      const portalProviderUUID = config.portalProviderUUID
        ? config.portalProviderUUID
        : "ef60e64b-dc17-4ff1-9f22-a177c6f1c204";
      const portalProviderUserId = config.portalProviderUserId
        ? config.portalProviderUserId
        : "sandesh12";
      const balance = config.userBalance ? config.userBalance : 10000;
      // Check User Login
      await checkUserLogin(
        portalProviderUUID,
        portalProviderUserId,
        balance,
        context.store
      );
      // Set default language
      if (secureStorage.getItem("lang")) {
        context.store.dispatch("setLanguage", secureStorage.getItem("lang"));
      } else {
        setLanguage(context.store);
      }
      // Set portal provider url
      secureStorage.setItem("referrerUrl", "159.138.130.64");
      // When the cookie expires redirect user to portal provider's login page
      setTimeout(() => {
        window.location.replace("159.138.130.64");
      }, 30 * 60 * 1000);
    }

    // Set user data in vuex store
    context.store.dispatch("setUserData");
    // context.app.router.push('/index');
    // await fakedelay();
    // context.app.router.push('/')
    // if (performance.navigation.type == 1) {
    //   // If User reloads the page
    //   // Set user data in vuex store
    //   context.store.dispatch("setUserData");
    //   // Set default language in vuex store
    //   context.store.dispatch("setLanguage", secureStorage.getItem("lang"));
    // } else if (
    //   performance.navigation.type == 0 &&
    //   document.referrer.match(/:\/\/(.[^/]+)/)[1] == window.location.host
    // ){
    //   // If user opens a new tab by right click
    //   // Set default language in vuex store
    //   // context.store.dispatch("setLanguage", secureStorage.getItem("lang"));
    //   // Set user data in vuex store
    //   context.store.dispatch("setUserData");
    // } else {
    //   // If the user gets redirected from portal provider page
    //   // Check whether the portalProviderUUID, portalProviderUserId and balance exists in the query
    //   const portalProviderUUID = context.query.portalProviderUUID
    //     ? context.query.portalProviderUUID
    //     : undefined;
    //   const portalProviderUserId = context.query.portalProviderUserID
    //     ? context.query.portalProviderUserID
    //     : undefined;
    //   const balance = context.query.balance ? context.query.balance : undefined;

    //   // Validate Login values in URL
    //   validateLoginValues(
    //     portalProviderUUID,
    //     portalProviderUserId,
    //     balance,
    //     context.store
    //   );
    //   // Check User Login
    //   await checkUserLogin(
    //     portalProviderUUID,
    //     portalProviderUserId,
    //     balance,
    //     context.store
    //   );

    //   // Set default language
    //   setLanguage(context.store);
    //   // Set user data in vuex store
    //   context.store.dispatch("setUserData");
    // }
  } catch (ex) {
    console.log(ex);
    window.location.replace(`http://${secureStorage.getItem("referrerUrl")}/`);
  }
};

// /**
//  * Validate Login values in URL
//  *
//  * @param {*} portalProviderUUID
//  * @param {*} portalProviderUserId
//  * @param {*} balance
//  * @param {*} store
//  * @returns
//  */
// const validateLoginValues = (
//   portalProviderUUID,
//   portalProviderUserId,
//   balance,
//   store
// ) => {
//   try {
//     const error = [];
//     if (!portalProviderUUID) {
//       error.push(config.loginError.portalProvider);
//     }
//     if (!portalProviderUserId) {
//       error.push(config.loginError.portalProviderUserId);
//     }
//     if (!balance) {
//       error.push(config.loginError.balance);
//     }
//     if (error.length > 0) {
//       store.dispatch("setLoginError", error);
//       return true;
//     } else {
//       return false;
//     }
//   } catch (ex) {
//     console.log(ex);
//   }
// };

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
        domain: "159.138.130.64",
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
        // Set cookie for user session
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
  secureStorage.setItem("lang", config.defaultLanguageLocale);
};

/**
 * Set Initial storage coins
 *
 * @param {*} store
 */
const initLocalStorageCoin = store => {
  store.dispatch("setCoinsModern", config.defaultCoinsModern);
  secureStorage.setItem("coinsModern", config.defaultCoinsModern);
};

// const fakedelay = () => {
//   return new Promise((reolve) => {
//     setTimeout(() => {
//       return;
//     }, 100000)
//   })
// }
