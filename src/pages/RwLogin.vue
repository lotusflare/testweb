<template>
    <!-- vuetify login page -->
    <v-app>
        <AppHeader />
        <v-main>
           <AccountLogin />
        </v-main>
    </v-app>
</template>

<script>
    import AppHeader from '@/components/AppHeader'
    import AccountLogin from '@/components/AccountLogin'
    export default {
        name: 'RwLogin',
        components: {
            AppHeader,
            AccountLogin,
        },
    }
</script>

<style scoped></style>
