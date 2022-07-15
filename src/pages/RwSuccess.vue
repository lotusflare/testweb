<template>
    <!-- a submit success page-->
    <v-app>
        <AppHeader />
        <v-main>
            <v-row>
                <v-col cols="12" class="text-center">
                    <h1>Thank you for your order!</h1>
                    <p>You will receive an email with your order confirmation shortly.</p>
                    <router-link style="text-decoration: none; color: inherit" to="/">
                        <v-btn color="primary">Go to Home</v-btn>
                    </router-link>
                </v-col>
            </v-row>
        </v-main>
    </v-app>
</template>

<script>
    import AppHeader from '@/components/AppHeader'
    export default {
        name: 'SubmitSuccess',
        components: {
            AppHeader,
        },
    }
</script>

<style scoped></style>
