import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import router from './router'
// import VeeValidate from 'vee-validate'

Vue.config.productionTip = false
Vue.use(VueRouter)
// Vue.use(VeeValidate)

new Vue({
    vuetify,
    render: (h) => h(App),
    router,
}).$mount('#app')
