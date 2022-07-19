// create vue router

import VueRouter from 'vue-router'
import RwHome from '@/pages/RwHome'
import RwCheckout from '@/pages/RwCheckout'
import RwSuccess from '@/pages/RwSuccess'
import RwDashboard from '@/pages/RwDashboard'
import RwLogin from '@/pages/RwLogin'

export default new VueRouter({
    routes: [
        //home page
        {
            path: '/',
            name: 'RwHome',
            component: RwHome,
        },

        //checkout page
        {
            path: '/checkout',
            name: 'RwCheckout',
            component: RwCheckout,
        },

        //success page
        {
            path: '/success',
            name: 'RwSuccess',
            component: RwSuccess,
        },

        //dashboard page
        {
            path: '/dashboard',
            name: 'RwDashboard',
            component: RwDashboard,
        },

        //login page
        {
            path: '/login',
            name: 'RwLogin',
            component: RwLogin,
        },
    ],
})
