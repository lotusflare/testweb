<template>
    <div>
        <router-view />
    </div>
</template>

<script>
    // import AppHeader from './components/AppHeader'
    // import MainPage from './components/MainPage'
    // import PlansCards from './components/PlansCards'
    import RwHome from '@/pages/RwHome'
    import RwCheckout from '@/pages/RwCheckout'

    export default {
        name: 'App',

        components: {
            RwHome,
            RwCheckout,
        },
        data: () => ({
            //
        }),
    }
</script>
