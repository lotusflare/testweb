<template>
    <!-- vuetify login page -->
    <AccountLogin />
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
