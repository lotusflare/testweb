import { getOffers } from '@/api'

const state = {
    offers: [],
}
const mutations = {
    setOffers(state, offers) {
        Object.entries(offers.offer_by_id).forEach((element) => {
            // if it is a plan then add to plans
            if (element[1].data.DISH_Customer_Price) {
                state.offers.push(element[1].data)
            }
        })
        // sort the plans by price
        state.offers.sort((a, b) => a.amounts.primary - b.amounts.primary)
    },
}
const actions = {
    getOffers: async ({ commit }) => {
        const offers = await getOffers('dishb2b')
        console.log(offers)
        commit('setOffers', offers)
    },
}
const getters = {}

export default {
    // namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
