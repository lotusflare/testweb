<template>
    <!-- a submit success page-->
    <v-row>
        <v-col cols="12" class="mt-10 text-center">
            <h1>Thank you for your order!</h1>
            <router-link style="text-decoration: none; color: inherit" to="/dashboard">
                <v-btn color="black" dark class="mt-4">Go to Dashboard</v-btn>
            </router-link>
        </v-col>
    </v-row>
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
