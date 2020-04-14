import config from "../config/config.global";

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
      const res = await this.$axios.$post(
        config.getRoadMap.url,
        {
          portalProviderUUID: context.rootGetters.getPortalProviderUUID,
          limit: 50,
          stockUUID: [stockUUID],
          version: config.version
        },
        {
          headers: config.header
        }
      );
      if (res.code === 200) {
        let readyData = res.data[0].roadMap.reverse();
        context.commit("SET_ROAD_MAP", readyData);
      } else {
        console.log(res);
        throw new Error();
      }
    } catch (ex) {
      console.log(ex);
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
    return state.roadMap.length > 0
      ? state.roadMap[state.roadMap.length - 1].stockValue
      : "...";
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
