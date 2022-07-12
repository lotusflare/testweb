<template>
    <div>
        <v-app>
            <AppHeader />
            <v-main>
                <CheckoutSteppers />
            </v-main>
        </v-app>
    </div>
</template>

<script>
    import AppHeader from '@/components/AppHeader'
    import CheckoutSteppers from '@/components/CheckoutSteppers'
    export default {
        name: 'RwCheckout',
        components: {
            CheckoutSteppers,
            AppHeader,
        },
    }
</script>

<style scoped></style>
