import config from "../config/config.global";
import secureStorage from "../plugins/secure-storage";
import log from "roarr";

const state = () => ({
    clearRoadMap: false, // Store clear road map status
    roadMap: [] // Store road map data
});

const mutations = {
    SET_CLEAR_ROAD_MAP(state, payload) {
        state.clearRoadMap = payload;
    },
    SET_LIVE_ROAD_MAP(state, payload) {
        state.roadMap.push(payload);
    },
    SET_ROAD_MAP(state, payload) {
        state.roadMap = [];
        state.roadMap = payload;
    }
};

const actions = {
    // Set road map data from api
    async setRoadMap(context, stockUUID) {
        try {
            var reqBody = {
                portalProviderUUID: context.rootGetters.getPortalProviderUUID,
                limit: 50,
                stockUUID: [stockUUID],
                version: config.version
            };
            var res = await this.$axios.$post(config.getRoadMap.url, reqBody, {
                headers: config.header
            });

            if (res.status) {
                let readyData = res.data[0].roadMap.reverse();
                context.commit("SET_ROAD_MAP", readyData);
            } else {
                throw new Error(config.error.general);
            }
        } catch (ex) {
            console.log(ex);
            log.error({
                    req: reqBody,
                    res,
                    page: "store/roadMap.js",
                    apiUrl: config.getRoadMap.url,
                    provider: secureStorage.getItem("PORTAL_PROVIDERUUID"),
                    user: secureStorage.getItem("USER_UUID")
                },
                ex.message
            );
        }
    },
    // Set live road map data
    setLiveRoadMap({ commit }, payload) {
        commit("SET_LIVE_ROAD_MAP", payload);
    },
    // Set clear road map status
    setClearRoadMap({ commit }, payload) {
        commit("SET_CLEAR_ROAD_MAP", payload);
    }
};

const getters = {  
    // Get clear road map status
    clearRoadMap: state => {
        return state.clearRoadMap;
    },
    // Get road map data
    getRoadMap(state) {
        return state.roadMap;
    },

    // Get last draw data
    getLastDraw(state) {

        if (state.roadMap.length > 0) {

            secureStorage.setItem('lastdraw', state.roadMap[state.roadMap.length - 1].stockValue)

            return state.roadMap[state.roadMap.length - 1].stockValue

        }
        return secureStorage.getItem("lastdraw")
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};