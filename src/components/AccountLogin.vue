<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="black">
                        <v-toolbar-title>Login</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field name="login" v-model="login" label="Email" type="text"></v-text-field>
                            <v-text-field
                                id="password"
                                v-model="password"
                                name="password"
                                label="Password"
                                type="password"
                            ></v-text-field>
                        </v-form>
                        <!-- alart -->
                        <v-alert type="error" v-if="loginError">
                            {{ alert }}
                        </v-alert>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="black" dark @click="accountLogin">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'AccountLogin',
        data() {
            return {
                login: '',
                password: '',
                loginError: false,
            }
        },
        methods: {
            accountLogin() {
                axios
                    .post('https://api-project9.lotusflare.com/api/v3/user/login', {
                        application_id: '05d8ab7fc9884950b6f90cad61dc88aa',
                        login_type: 1,
                        // login_id: 'email573312093431@domain.com',
                        login_id: this.login,
                        login_secret: this.password,
                        // login_secret: 'secret573312093431secret',
                        device_id: 'device_id_5209',
                    })
                    .then((response) => {
                        console.log(response.data.owned_resources)
                        if (response.data.owned_resources !== {}) {
                            localStorage.setItem('api_token', response.data.api_token)
                            localStorage.setItem('user_id', response.data.user_id)
                            localStorage.setItem('account_id', response.data.account_id)
                            this.$router.push('/dashboard')
                            this.$router.go()
                        } else {
                            this.loginError = true
                            this.alert = 'No account found with this email'
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        this.loginError = true
                        this.alert = 'Invalid login'
                    })
            },
        },
    }
</script>

<style scoped></style>
