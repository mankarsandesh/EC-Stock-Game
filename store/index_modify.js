import Vuex from "vuex";

import betting from "./modules/betting/betting";
import stock from "./modules/stock/stock";
import provider from "./modules/provider/provider";
import roadMap from "./modules/provider/provider";
import game from "./modules/game/game";

const createStore = () => {
  return new Vuex.Store({
    modules: {
      betting,
      stock,
      provider,
      roadMap,
      game
    }
  });
};

export default createStore;
