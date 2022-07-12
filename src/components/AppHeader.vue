<template>
    <v-app-bar app color="black" dark>
        <div class="d-flex align-center">
            <v-img src="../assets/images/Republic-Wireless_byDISH_Logo.webp" height="40px" contain></v-img>
        </div>
        <router-link style="text-decoration: none; color: inherit" to="/">
            <v-btn target="_blank" text> Plans </v-btn>
        </router-link>
    </v-app-bar>
</template>

<script>
    export default {
        name: 'AppHeader',
    }
</script>

<style scoped></style>
