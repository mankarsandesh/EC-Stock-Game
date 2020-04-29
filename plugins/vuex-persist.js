import VuexPersistence from "vuex-persist";
import secureStorage from "./secure-storage";

export default ({ store }) => {
  new VuexPersistence({
    storage: secureStorage
  }).plugin(store);
};
