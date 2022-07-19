<template>
    <v-app>
        <AppHeader />
        <!-- show user info -->
        <v-main>
            <MyAccount />
        </v-main>
    </v-app>
</template>

<script>
    import AppHeader from '../components/AppHeader'
    import MyAccount from '../components/MyAccount'
    export default {
        name: 'RwDashboard',
        components: {
            AppHeader,
            MyAccount,
        },
    }
</script>

<style scoped></style>
