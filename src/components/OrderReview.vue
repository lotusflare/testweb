<template>
    <div>
        <!-- <v-container fluid> -->
        <v-card elevation="0">
            <v-card-title> Payment </v-card-title>
            <v-row no-gutters>
                <v-col cols="auto">
                    <v-row no-gutters> {{ planInfo.title }} </v-row>
                    <v-row no-gutters> Tax </v-row>
                    <!-- {{ planInfo.title }} -->
                </v-col>
                <v-spacer />
                <v-col col="2">
                    <v-row no-gutters> {{ planInfo.price }} </v-row>
                    <v-row no-gutters> $0.00 </v-row>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row no-gutters>
                <v-col cols="8">
                    <v-row no-gutters> Total </v-row>
                    <!-- {{ planInfo.title }} -->
                </v-col>
                <v-spacer />
                <v-col col="2" align-self="end">
                    <v-row no-gutters> {{ planInfo.price }} </v-row>
                </v-col>
            </v-row>
            <!-- <v-btn class="mt-4 mr-2" color="primary" @click="submit"> Submit </v-btn>
            <v-btn class="mt-4" text> Cancel </v-btn> -->
            <!-- </v-container> -->
        </v-card>
        <v-card v-if="Object.keys(addressInfo).length !== 0" elevation="0">
            <v-card-title> Address </v-card-title>
            <v-card-text>
                {{ addressInfo.street }}<br />
                {{ addressInfo.apt }}<br v-if="addressInfo.apt !== ''" />
                {{ addressInfo.city }}<span v-if="addressInfo.city !== ''">,</span> {{ addressInfo.state }}
                {{ addressInfo.zip }}<br />
                {{ addressInfo.country }}
            </v-card-text>
        </v-card>
        <v-card>
            <v-card-text>
                <v-checkbox
                    v-model="checkbox"
                    label="I agree to the Terms & Conditions, including the AutoPay requirement, and the Privacy Policy."
                ></v-checkbox>
            </v-card-text>
            <v-card-actions>
                <v-btn color="black" @click="submit" dark> Submit </v-btn>
                <v-btn text> Cancel </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'OrderReview',
        data() {
            return {
                planInfo: {},
                addressInfo: {},
                accountInfo: {
                    firstName: '',
                    lastName: '',
                    // email: 'email573312093431@domain.com',
                    email: '',
                    // password: 'secret573312093431secret',
                    password: '',
                },
                paymentInfo: {},
                checkbox: false,
            }
        },
        methods: {
            // only create user but no account yet
            accountLogin() {
                axios
                    .post('https://api-project9.lotusflare.com/api/v3/user/login', {
                        application_id: '05d8ab7fc9884950b6f90cad61dc88aa',
                        login_type: 1,
                        // login_id: 'email573312093431+1@domain.com',
                        login_id: this.accountInfo.email,
                        // login_secret: 'secret573312093431+1secret',
                        login_secret: this.accountInfo.password,
                        device_id: 'device_id_1148',
                        user_properties: {
                            // first_name: 'Jane',
                            first_name: this.accountInfo.firstName,
                            // last_name: 'Doe',
                            last_name: this.accountInfo.lastName,
                        },
                    })
                    .then((response) => {
                        this.accountCreate(response.data.api_token, response.data.user_id)
                    })
                    .catch((error) => {
                        console.log(error)
                        this.$bus.$emit('account-error', error.response.status)
                        // TODO this.$router.push('/failure')
                    })
            },
            // add an account under the user
            accountCreate(api_token, user_id) {
                axios
                    .post(
                        'https://api-project9.lotusflare.com/api/v3/user/add_account',
                        {
                            target_id: user_id,
                            target_type: 3,
                        },
                        {
                            headers: {
                                Authorization: 'Bearer ' + api_token,
                            },
                        }
                    )
                    .then((response) => {
                        // save the api_token to local storage
                        localStorage.setItem('api_token', response.data.api_token)
                        // sve the user_id to local storage
                        localStorage.setItem('user_id', response.data.user_id)
                        this.$router.push('/success')
                    })
                    .catch((error) => {
                        console.log(error)
                        // this.$router.push('/failure')
                        this.$bus.$emit('account-error', error.response.status)
                    })
            },
            addAddress() {
                // TODO
                // call add address api
            },
            submit() {
                if (localStorage.getItem('api_token') === null) {
                    this.accountLogin()
                }
            },
        },
        mounted() {
            // get address data from AddAddress component
            this.$bus.$on('address-data', (data) => {
                this.addressInfo = data
            })
            // get account data from AddAccount component
            this.$bus.$on('account-data', (data) => {
                this.accountInfo.firstName = data.firstName
                this.accountInfo.lastName = data.lastName
                this.accountInfo.email = data.email
                this.accountInfo.password = data.password
                console.log(this.accountInfo)
            })
            // get payment data from AddPayment component
            this.$bus.$on('payment-data', (data) => {
                this.paymentInfo = data
            })
            this.$bus.$on('giveDataToAddPayment', (data) => {
                this.planInfo = data
            })
        },
    }
</script>

<style scoped></style>
