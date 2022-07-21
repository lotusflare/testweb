<template>
    <div>
        <MainPage />
        <PlansCards />
    </div>
</template>

<script>
    import AppHeader from '@/components/AppHeader'
    import MainPage from '@/components/MainPage'
    import PlansCards from '@/components/PlansCards'

    export default {
        name: 'RwHome',
        components: {
            AppHeader,
            MainPage,
            PlansCards,
        },
    }
</script>

<style scoped></style>
