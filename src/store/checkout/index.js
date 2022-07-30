const state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
}
const mutations = {
    setAccount(state, data) {
        state.firstName = data.firstName
        state.lastName = data.lastName
        state.email = data.email
        state.password = data.password
    },
}
const actions = {}
const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}