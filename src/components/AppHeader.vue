<template>
    <v-app-bar app color="black" dark>
        <div class="d-flex align-center">
            <v-img src="../assets/images/Republic-Wireless_byDISH_Logo.webp" height="40px" contain></v-img>
        </div>
        <router-link style="text-decoration: none; color: inherit" to="/">
            <v-btn target="_blank" text> Plans </v-btn>
        </router-link>
        <router-link v-if="isLoggedin()" style="text-decoration: none; color: inherit" to="/dashboard">
            <v-btn target="_blank" text> Dashboard </v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <router-link v-if="!isLoggedin()" style="text-decoration: none; color: inherit" to="/login">
            <v-btn target="_blank" text> Login </v-btn>
        </router-link>
        <!-- <router-link v-else style="text-decoration: none; color: inherit" to="/"> -->
        <v-btn v-else target="_blank" text @click="logout"> Logout </v-btn>
        <!-- </router-link> -->
    </v-app-bar>
</template>

<script>
    export default {
        name: 'AppHeader',
        methods: {
            isLoggedin() {
                return localStorage.getItem('api_token') !== null
            },
            logout() {
                localStorage.removeItem('api_token')
                localStorage.removeItem('user_id')
                // redirect to login page with reload
                this.$router.go('/')
            },
        },
    }
</script>

<style scoped></style>
