const state = () => ({
    first: null,


})
const getters = {
    first: state => state.first,

}
const mutations = {
    SET_FIRST(state, payload) {
        state.first = payload
    },

}
const actions = {

}

export default {
    state,
    mutations,
    actions,
    getters
};
