<template>
    <div>
        <router-view />
    </div>
</template>

<script>
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
