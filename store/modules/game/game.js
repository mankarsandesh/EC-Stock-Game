const state = {

}

const mutations = {
    setGameID(state, payload) {
        state.gameStockId = payload;
    },
    setGameChannelShow(state, value) {
        state.activeGameChannel = value;
    },
    setIsLoadingStockGame(state, value) {
        state.isLoadingStockGame = value;
    },
}

const actions = {

}

const getters = {
    getGameChannel(state) {
        return state.activeGameChannel;
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}