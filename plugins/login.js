import VuexPersistence from "vuex-persist";
import config from "../config/config.global";
import secureStorage from "./secure-storage";
import Cookies from "./js-cookie";
import swal from "sweetalert";

export default async context => {
  try {
    // document.referrer.match(/:\/\/(.[^/]+)/)[1];
    // Set Initial storage coins
    initLocalStorageCoin(context.store);

    if (performance.navigation.type == 1) {
      // Check whether the portalProviderUUID, portalProviderUserId and balance exists in the query
      const token = context.query.token ? context.query.token : undefined;

      if (token) {
        // Validate Login values in URL
        validateLoginValues(token, context.store);
        // Check User Login
        await checkUserLogin(token, context.store, context.$axios);
      }

      // If User reloads the page
      if (
        Cookies.getJSON("login").userUUID &&
        Cookies.getJSON("login").portalProviderUUID
      ) {
        // Set user data in vuex store
        context.store.dispatch("setUserData");

        window.setInterval(() => {
          checkUserActivity(
            Cookies.getJSON("login").userUUID,
            Cookies.getJSON("login").portalProviderUUID,
            context.$axios
          );
        }, config.userActivityLog.timer);

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

        context.store.dispatch(
          "setPortalProviderUUID",
          Cookies.getJSON("login").portalProviderUUID
        );
        // Set default language in vuex store
        context.store.dispatch("setLanguage", secureStorage.getItem("lang"));
      } else {
        // Invalid user session
        console.log("Unauthorized access. Please login again");
        throw new Error("Unauthorized access. Please login again");
      }
    } else if (performance.navigation.type == 0) {
      // Check whether the portalProviderUUID, portalProviderUserId and balance exists in the query
      const token = context.query.token ? context.query.token : undefined;

      // If user opens a new tab by right click
      if (
        Cookies.getJSON("login") &&
        Cookies.getJSON("login").userUUID &&
        Cookies.getJSON("login").portalProviderUUID &&
        !token
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

        // Check whether the portalProviderUUID, portalProviderUserId and balance exists in the query
        const token = context.query.token ? context.query.token : undefined;

        if (token) {
          // Validate Login values in URL
          validateLoginValues(token, context.store);
          // Check User Login
          await checkUserLogin(token, context.store, context.$axios);
        }

        // Set default language in vuex store
        context.store.dispatch("setLanguage", secureStorage.getItem("lang"));
        // Set user data in vuex store
        context.store.dispatch("setUserData");
        context.store.dispatch(
          "setPortalProviderUUID",
          Cookies.getJSON("login").portalProviderUUID
        );
      } else {
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
        const token = context.query.token ? context.query.token : undefined;
        // Validate Login values in URL
        validateLoginValues(token, context.store);
        // Check User Login
        await checkUserLogin(token, context.store, context.$axios);

        // Set default language
        setLanguage(context.store);
        // Set user data in vuex store
        context.store.dispatch("setUserData");

        // Set portal provider url
        secureStorage.setItem("referrerUrl", config.Whitelabel.url);

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
const validateLoginValues = (token, store) => {
  try {
    const error = [];
    if (!token) {
      error.push(config.loginError.token);
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
 * Check User checkUserActivity
 *
 * @param {*} portalProviderUUID
 * @param {*} portalProviderUserId
 * @param {*} balance
 * @param {*} store
 */
const checkUserActivity = async (userUUID, portalProviderUserId, axios) => {
  try {
    var reqBody = {
      portalProviderUUID: portalProviderUserId,
      userUUID: userUUID,
      version: config.version
    };
    const { data } = await axios.post(config.userActivityLog.url, reqBody, {
      headers: config.header
    });   
    if(secureStorage.getItem("userSessionID") == null){
      secureStorage.setItem("userSessionID", data.data["userSessionID"]); // Store Session id in SessionStorage
    }
    if (
      data.data["userSessionID"] != secureStorage.getItem("userSessionID") 
    ) {
      swal({
        title: window.$nuxt.$root.$t("popupMsg.alreadyLogin"),
        button: window.$nuxt.$root.$t("popupMsg.okLogout"),
        icon: "warning",
        showDenyButton: true,
        closeOnClickOutside: false,
        closeOnEsc: false,
        focusConfirm: false
      }).then(willDelete => {
        if (willDelete) {
          const URL = secureStorage.getItem("referrerURL");
          location.href = URL;
          // Cookies.remove("login", { path: "" }); // Clear all Cookies
          // secureStorage.clear(); // Clear all Secure Storage
        }
      });
    } else if (data.code == 202) {
      swal({
        title: window.$nuxt.$root.$t("popupMsg.sessionExpired"),
        button: window.$nuxt.$root.$t("popupMsg.okLogout"),
        icon: "warning",       
        closeOnClickOutside: false,
        closeOnEsc: false
      }).then(willDelete => {
        if (willDelete) {
          const URL = secureStorage.getItem("referrerURL");
          location.href = URL;
          Cookies.remove("login", { path: "" }); // Clear all Cookies
          secureStorage.clear(); // Clear all Secure Storage
        }
      });
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
const checkUserLogin = async (token, store, axios) => {
  Cookies.remove("login", { path: "" }); // Clear all Cookies
  // secureStorage.clear(); // Clear all Secure Storage
  try {
    const defaultCoinsModern = ["100", "500", "1000", "5000", "10000"];
    const defaultCurrency = 1;
    if (config.authUser && config.authPassword) {
      var reqBody = {
        token: token
      };
      var { data } = await axios.post(config.userAuthorizedLogin.url, reqBody, {
        headers: config.header
      });
      if (data.status) {       
        var userUUID = data.data.userUUID;        
        var portalProviderUUID = data.data.portalProviderUUID;
        var documentRefLink = document.referrer
          .split("/")
          .slice(0, 3)
          .join("/")
          .split("?")
          .slice(0, 1)
          .join("?");
        checkUserActivity(userUUID, portalProviderUUID, axios);
        store.dispatch("setPortalProviderUUID", portalProviderUUID);
        store.dispatch("setUserUUID", userUUID);
        store.dispatch("setCoinsModern", defaultCoinsModern);
        store.dispatch("setCurrency", defaultCurrency);
        secureStorage.setItem("USER_UUID", userUUID); // Set User UUID in local Storage
        secureStorage.setItem("PORTAL_PROVIDERUUID", portalProviderUUID); // Set portal provider UUID in local storage
        secureStorage.setItem("referrerURL", documentRefLink);
        // secureStorage.setItem("userSessionID", data.data["userSessionID"]); // Store Session id in SessionStorage
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

        window.setInterval(() => {
          checkUserActivity(userUUID, portalProviderUUID, axios);
        }, config.userActivityLog.timer);
      } else {
        store.dispatch("setLoginError", [data.message[0]]);
        // throw new Error(data.message[0]);
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
  const chips = secureStorage.getItem("coinsModern")
    ? secureStorage.getItem("coinsModern")
    : config.defaultCoinsModern;
  store.dispatch("setCoinsModern", chips);
};
