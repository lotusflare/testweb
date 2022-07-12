// create vue router

import VueRouter from 'vue-router'
import RwHome from '@/pages/RwHome'
import RwCheckout from '@/pages/RwCheckout'

export default new VueRouter({
    routes: [
        {
            path: '/checkout',
            name: 'RwCheckout',
            component: RwCheckout,
        },
        {
            path: '/',
            name: 'RwHome',
            component: RwHome,
        },
    ],
})
