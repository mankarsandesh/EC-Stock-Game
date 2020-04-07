import config from "../config/config.global";

const state = () => ({
    authUser: {},
    userLoginData: {},  
    auth_token: (localStorage.apikey = "JXb6nICLMNnyYkQEio75j7ijdcj8LT2c3PcqyJtYCPknbM0DcfYpZQ0OuIvPYJXSFexqVh4NjUxtQNMX"),
    // set portal provider and user UUID for authentication
    portalProviderUUID: localStorage.getItem("PORTAL_PROVIDERUUID"),
    userUUID: localStorage.getItem("USER_UUID"),
    // end set portal provider and user UUID for authentication
    userData: {},
    locales: ["cn", "us", "th", "la"],
    locale: localStorage.getItem("lang"),
    coins_modern: [],
    isShowTutorial: false,
    isWindowsHasScroll: false,
    tutorialStepNumber: 0,
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
    // store api_token in vuex auth_token
    SET_AUTH_TOKEN(state, token) {
        state.auth_token = token;
    },
    // store coin in localStorage payload must be "String array" '["100", "500", "1000", "5000", "10000"]'
    SET_COINS_MODERN(state) {
        state.coins_modern = JSON.parse(localStorage.getItem("coinModern"));
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
        state.tutorialStepNumber = payload
    }
}

const actions = {
    // get user info from api
    async setUserData(context) {
        try {
          const res = await this.$axios.$post(
            config.getUserProfile.url,
            {
              portalProviderUUID: context.state.portalProviderUUID,
              userUUID: context.state.userUUID,
              version: config.version
            },
            {
              headers: config.header
            }
          );
          if (res.code === 200) {
            let userInfo = res.data;          
            context.commit("SET_USER_DATA", userInfo);
          } else {
            console.log(res);
          }
        } catch (ex) {
          console.error(ex);
          // alert(ex)
        }
    },
    setAuth({ commit }, payload) {
        commit('SET_AUTH', payload);
    },
    setPortalProviderUUID({ commit }, payload) {
        commit('SET_PORTAL_PROVIDER_UUID', payload);
    },
    setUserUUID({ commit }, payload) {
        commit('SET_USER_UUID', payload);
    },
    setUserLoginData({ commit }, payload) {
        commit('SET_USER_LOGIN_DATA', payload);
    },
    setAuthToken({ commit }, payload) {
        commit('SET_AUTH_TOKEN', payload);
    },
    setCoinsModern({ commit }) {
        commit('SET_COINS_MODERN');
    },
    setLanguage({ commit }, payload) {
        commit('SET_LANGUAGE', payload);
    },
    setTopPlayer({ commit }, payload) {
        commit('SET_TOP_PLAYER', payload);
    },
    setIsShowTutorial({ commit }, payload) {
        commit('SET_IS_SHOW_TUTORIAL', payload);
    },
    setIsWindowsHasScroll({ commit }, payload) {
        commit('SET_IS_WINDOWS_HAS_SCROLL', payload);
    },
    setTutorialStepNumber({ commit }, payload) {
        commit('SET_TUTORIAL_STEP_NUMBER', payload);
    }
}

const getters = {
    getPortalProviderUUID(state) {
        console.log("check SocketID",state.portalProviderUUID);
        return state.portalProviderUUID;
    },
    getUserUUID(state) {
        return state.userUUID;
    },
    checkAuth(state) {
        if (
          state.auth_token === "" ||
          state.auth_token == null ||
          state.auth_token == undefined
        ) {
          return false;
        } else {
          return true;
        }
    },
    // get user info
    getUserInfo(state) {        
        return state.userData;
    },
    // get user name
    getUserName(state) {
        return state.userData;
    }, 
    getPortalProviderUser(state) {
        if (sessionStorage.getItem("userData") !== null) {
          const formData = JSON.parse(sessionStorage.getItem("userData"));
        }
        return state.formData;
    },
    getAuthToken(state) {
        return state.auth_token;
    },
    // get chip amount
    getCoinsModern(state) {
        return state.coins_modern;
    },
      // get current language
    getLocale(state) {
        return state.locale;
    },
    getIsShowTutorial(state) {
        return state.isShowTutorial;
    },
    getIsWindowsHasScroll(state) {
        return state.isWindowsHasScroll;
    },
    getTutorialStepNumber(state) {
        return state.tutorialStepNumber;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}