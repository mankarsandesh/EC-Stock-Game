import payouts from "../data/json/payout.json";

const state = () => ({
    activeGameChannel: true,
    isLoadingStockGame: false,
    gameStockId: null,
    stockMultigame: [],
    payout: payouts,
});

const mutations = {
    SET_GAME_ID(state, payload) {
        state.gameStockId = payload;
    },
    SET_GAME_CHANNEL_SHOW(state, value) {
        state.activeGameChannel = value;
    },
    SET_IS_LOADING_STOCK_GAME(state, value) {
        state.isLoadingStockGame = value;
    },
    // add more stock to multi game
    ADD_STOCK_MULTI_GAME(state, stockId) {
        if (state.stockMultigame.includes(stockId)) return;
        state.stockMultigame.push(stockId);
    },
}

const actions = {
    setGameId({ commit }, payload) {
        commit('SET_GAME_ID', payload);
    },
    setGameChannelShow({ commit }, payload) {
        commit('SET_GAME_CHANNEL_SHOW', payload);
    },
    setIsLoadingStockGame({ commit }, payload) {
        commit('SET_IS_LOADING_STOCK_GAME', payload);
    },
    addStockMultiGame({ commit }, payload) {
        commit('ADD_STOCK_MULTI_GAME', payload);
    }
}

const getters = {
    getGameChannel(state) {
        return state.activeGameChannel;
    },
    getIsLoadingStockGame(state) {
        return state.isLoadingStockGame;
    },
    // get stock id to show in multi game
    getStockMultiGame(state) {
        return state.stockMultigame;
    },
    getStockGameId(state) {
        return state.gameStockId;
    },
    // check stock in multi game if exits disable button
    checkMultiGameExistAndDisable: state => data => {
        if (!data.isMultigame) return "";
        const result = state.stockMultigame.includes(data.stockId);
        if (result) return "pointer-events: none";
        else return "";
    },
    // check stock in multi game if exits show icon "check"
    checkMultiGameExistAndShowIcon: state => data => {
        if (!data.isMultigame) return false;
        const result = state.stockMultigame.includes(data.stockId);
        if (result) return true;
        else return false;
    },
    getPayout: state => gameRule => {
        {
          // console.log(state.payout[gameRule])
          return state.payout[gameRule];
        }
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}