import VuexPersistence from "vuex-persist";
import secureStorage from "./secure-storage";

export default ({ store }) => {
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
    }).plugin(store);
  });
};
