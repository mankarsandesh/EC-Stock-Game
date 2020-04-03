import config from "../../../config/config.global";

const state = {
    clearRoadMap: false,
    roadMap: [],
}

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
}

const actions = {
    async asyncRoadMap(context, stockUUID) {
        try {
          const res = await this.$axios.$post(
            config.getRoadMap.url,
            {
              portalProviderUUID: context.rootState.portalProviderUUID,
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
            context.commit('SET_ROAD_MAP', readyData);
          } else {
            throw new Error();
          }
        } catch (ex) {
          console.log(ex.message);
        }
    },
    setLiveRoadMap({ commit }, payload) {
        commit('SET_LIVE_ROAD_MAP', payload);
    }
}

const getters = {
    clearRoadMap: state => {
        return state.clearRoadMap
    },
    getRoadMap(state) {
        return state.roadMap;
    },
    getLastDraw(state) {
        return state.roadMap.length > 0
            ? state.roadMap[state.roadMap.length - 1].stockValue
            : "...";
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}