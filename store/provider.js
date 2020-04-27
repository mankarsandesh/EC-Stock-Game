import config from "~/config/config.global";
import log from "roarr";

const state = () => ({
  authUser: {}, // store auth user data
  userLoginData: {}, // Store user login data
  authToken: (localStorage.apikey =
    "JXb6nICLMNnyYkQEio75j7ijdcj8LT2c3PcqyJtYCPknbM0DcfYpZQ0OuIvPYJXSFexqVh4NjUxtQNMX"), // Store auth token
  portalProviderUUID: localStorage.getItem("PORTAL_PROVIDERUUID"), // Store portal provider UUID
  userUUID: localStorage.getItem("USER_UUID"), // Store user UUID
  userData: {}, // Store user data
  locales: ["cn", "us", "th", "la"], // Store language locales
  locale: localStorage.getItem("lang"), // Store locale
  coinsModern: [], // Store coins modern
  isShowTutorial: false,
  isWindowsHasScroll: false,
  tutorialStepNumber: 0, // Store tutorial step number
  UserAuth: {},
  messageError: []
});

const mutations = {
  SET_PORTAL_PROVIDER_UUID(state, payload) {
    state.portalProviderUUID = payload;
  },
  SET_USER_UUID(state, payload) {
    state.userUUID = payload;
  },
  SET_AUTH(state, payload) {
    state.authUser = payload;
  },
  // end new api
  SET_USER_DATA(state, payload) {
    state.userData = payload;
  },
  SET_USER_LOGIN_DATA(state, payload) {
    state.userLoginData = payload;
  },
  // store api_token in vuex auth Token
  SET_AUTH_TOKEN(state, token) {
    state.authToken = token;
  },
  // store coin in localStorage payload must be "String array" '["100", "500", "1000", "5000", "10000"]'
  SET_COINS_MODERN(state) {
    state.coinsModern = JSON.parse(localStorage.getItem("coinModern"));
  },
  // set language
  SET_LANGUAGE(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale;
    }
    localStorage.setItem("lang", locale);
  },
  SET_TOP_PLAYER(state, payload) {
    state.isLoadingTopPlayer = payload;
  },
  SET_IS_SHOW_TUTORIAL(state, payload) {
    state.isShowTutorial = payload;
  },
  SET_IS_WINDOWS_HAS_SCROLL(state, payload) {
    state.isWindowsHasScroll = payload;
  },
  SET_TUTORIAL_STEP_NUMBER(state, payload) {
    state.tutorialStepNumber = payload;
  },
  SET_USER_AUTH(state, payload) {
    state.UserAuth = payload;
  },
  SET_USER_AUTH_ERROR(state, payload) {
    state.messageError = payload;
  }
};

const actions = {
  // Set user data from api
  async setUserData(context) {
    try {
      var reqBody = {
        portalProviderUUID: context.state.portalProviderUUID,
        userUUID: context.state.userUUID,
        version: config.version
      };
      var res = await this.$axios.$post(config.getUserProfile.url, reqBody, {
        headers: config.header
      });
      if (res.status) {
        let userInfo = res.data;
        context.commit("SET_USER_DATA", userInfo);
      } else {
        throw new Error(config.error.general);
      }
    } catch (ex) {
      console.error(ex);
      log.error(
        {
          req: reqBody,
          res,
          page: "store/provider.js",
          apiUrl: config.getUserProfile.url,
          provider: localStorage.getItem("PORTAL_PROVIDERUUID"),
          user: localStorage.getItem("USER_UUID")
        },
        ex.message
      );
    }
  },
  // Set user auth data
  setAuth({ commit }, payload) {
    commit("SET_AUTH", payload);
  },
  // Set portal provider UUID
  setPortalProviderUUID({ commit }, payload) {
    commit("SET_PORTAL_PROVIDER_UUID", payload);
  },
  // Set user UUID
  setUserUUID({ commit }, payload) {
    commit("SET_USER_UUID", payload);
  },
  // Set user login data
  setUserLoginData({ commit }, payload) {
    commit("SET_USER_LOGIN_DATA", payload);
  },
  // Set auth token
  setAuthToken({ commit }, payload) {
    commit("SET_AUTH_TOKEN", payload);
  },
  // Set coins modern
  setCoinsModern({ commit }) {
    commit("SET_COINS_MODERN");
  },
  // Set language locale
  setLanguage({ commit }, payload) {
    commit("SET_LANGUAGE", payload);
  },
  // Set is loading top player
  setTopPlayer({ commit }, payload) {
    commit("SET_TOP_PLAYER", payload);
  },
  // Set is show tutorial
  setIsShowTutorial({ commit }, payload) {
    commit("SET_IS_SHOW_TUTORIAL", payload);
  },
  // Set is windows scroll
  setIsWindowsHasScroll({ commit }, payload) {
    commit("SET_IS_WINDOWS_HAS_SCROLL", payload);
  },
  // Set tutorial's step number
  setTutorialStepNumber({ commit }, payload) {
    commit("SET_TUTORIAL_STEP_NUMBER", payload);
  },
  setUserAuth({ commit }, payload) {
    commit("SET_USER_AUTH", payload);
  },
  setUserAuthError({ commit }, payload) {
    commit("SET_USER_AUTH_ERROR", payload);
  }
};

const getters = {
  // Get portal provider UUID
  getPortalProviderUUID(state) {
    return state.portalProviderUUID;
  },
  // Get user UUID
  getUserUUID(state) {
    return state.userUUID;
  },
  // Check authToken
  checkAuth(state) {
    if (
      state.authToken === "" ||
      state.authToken == null ||
      state.authToken == undefined
    ) {
      return false;
    } else {
      return true;
    }
  },
  // Get user info
  getUserInfo(state) {
    return state.userData;
  },
  // Get user name
  getUserName(state) {
    return state.userData.name;
  },
  // Get portal provider user data
  getPortalProviderUser(state) {
    if (sessionStorage.getItem("userData") !== null) {
      const formData = JSON.parse(sessionStorage.getItem("userData"));
    }
    return state.formData;
  },
  getAuthToken(state) {
    return state.authToken;
  },
  // get chip amount
  getCoinsModern(state) {
    return state.coinsModern;
  },
  // get current language
  getLocale(state) {
    return state.locale;
  },
  // Get is show tutorial status
  getIsShowTutorial(state) {
    return state.isShowTutorial;
  },
  // Get is window has scroll status
  getIsWindowsHasScroll(state) {
    return state.isWindowsHasScroll;
  },
  // Get Tutorial step number
  getTutorialStepNumber(state) {
    return state.tutorialStepNumber;
  },
  getUserAuth: state => state.UserAuth,
  getMessageError: state => state.messageError
};

export default {
  state,
  mutations,
  actions,
  getters
};
