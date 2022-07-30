import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import home from './home'
import checkout from './checkout'
import dashboard from './dashboard'

export default new Vuex.Store({
    modules: {
        home,
        checkout,
        dashboard,
    },
})
