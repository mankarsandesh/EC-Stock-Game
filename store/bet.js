const state = () => ({
    first: null,
    parentFirst: null

})
const getters = {
    first: state => state.first,
    parentFirst: state => state.parentFirst
}
const mutations = {
    SET_FIRST(state, payload) {
        state.first = payload
    },
    SET_FIRST_PARENT(state, payload) {
        state.parentFirst = payload
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
