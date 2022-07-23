<template>
    <div>
        <!-- <v-container fluid> -->
        <v-card elevation="0">
            <v-card-title> Payment </v-card-title>
            <v-simple-table>
                <tbody>
                    <tr>
                        <td>{{ planInfo.title }}</td>
                        <td>${{ planInfo.price }}</td>
                    </tr>
                    <tr>
                        <td>Tax</td>
                        <td>$0.00</td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Total</td>
                        <td class="font-weight-bold">${{ planInfo.price }}</td>
                    </tr>
                </tbody>
            </v-simple-table>
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
                    color="black"
                    label="I agree to the Terms & Conditions, including the AutoPay requirement, and the Privacy Policy."
                ></v-checkbox>
            </v-card-text>
            <v-card-actions>
                <v-btn color="black" @click="submit" :dark="checkbox" :disabled="!checkbox" :loading="loading"> Submit </v-btn>
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
                accountInfo: {},
                paymentInfo: {},
                numberInfo: {},
                checkbox: false,
                loading: false,
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
                    })
                    .then((response) => {
                        console.log('@accountLogin: ', response)
                        //save user_id and api_token to localStorage
                        localStorage.setItem('user_id', response.data.user_id)
                        localStorage.setItem('api_token', response.data.api_token)
                        this.accountCreate()
                    })
                    .catch((error) => {
                        console.log('@accountLogin: ', error)
                        this.$bus.$emit('account-error', error.response.status)
                        this.loading = false
                    })
            },
            // add an account under the user
            // accountCreate(api_token, user_id) {
            accountCreate() {
                axios
                    .post(
                        'https://api-project9.lotusflare.com/api/v3/user/add_account',
                        {
                            target_id: localStorage.getItem('user_id'),
                            target_type: 3,
                        },
                        // get api_token from localStorage
                        {
                            headers: {
                                // Authorization: 'Bearer ' + api_token,
                                Authorization: 'Bearer ' + localStorage.getItem('api_token'),
                            },
                        }
                    )
                    .then((response) => {
                        // save the api_token to local storage
                        console.log('@accountCreate: ', response)
                        // localStorage.setItem('api_token', api_token)
                        // save the user_id to local storage
                        localStorage.setItem('account_id', response.data.account_id)
                        this.addAddress()

                        // this.$router.push('/success')
                    })
                    .catch((error) => {
                        console.log('@accountCreate: ', error)
                        console.log(error)
                        // this.$router.push('/failure')
                        this.$bus.$emit('account-error', error.response.status)
                        this.loading = false
                    })
            },
            addAddress() {
                axios
                    .post(
                        'https://api-project9.lotusflare.com/api/v3/user/add_address',
                        {
                            parts: {
                                address: this.addressInfo.street,
                                city: this.addressInfo.city,
                                zip: this.addressInfo.zip,
                            },
                            type: 1,
                            target_id: localStorage.getItem('account_id'),
                            target_type: 2,
                        },
                        {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('api_token'),
                            },
                        }
                    )
                    .then((response) => {
                        console.log('@addAddress: ', response)
                        this.addPaymentMethod()
                        // this.$router.push('/success')
                    })
                    .catch((error) => {
                        console.log('@addAddress: ', error)
                        // this.$bus.$emit('address-error', error.response.status)
                        this.loading = false
                    })
            },
            addPaymentMethod() {
                // save the payment info to local storage for temp
                const localStoragePaymentInfo = {
                    accountId: localStorage.getItem('account_id'),
                    last4: this.paymentInfo.cardNumber.slice(-4),
                    cardName: this.paymentInfo.cardName,
                    cardExpiry: this.paymentInfo.cardExpiry,
                }
                localStorage.setItem('paymentInfo', JSON.stringify(localStoragePaymentInfo))

                this.createOrder()
            },
            createOrder() {
                // call create order api
                axios
                    .post(
                        'https://api-project9.lotusflare.com/api/v3/orderoe/create_order',
                        {
                            entity_id: this.planInfo.entityID,
                            entity_type: 'offer',
                            target_id: localStorage.getItem('account_id'),
                            target_type: 2,

                            service_area_code: '006433001415',
                            billing_market: 'GAC',
                            billing_sub_market: '724',

                            device_technology_type: 'GSM',
                            msisdn: this.numberInfo.number,
                            iccid: '89011804330026064543',
                            imei: '421023025000360',
                            imei_type: 'W7',
                        },
                        {
                            headers: {
                                Authorization: localStorage.getItem('api_token'),
                            },
                        }
                    )
                    .then((response) => {
                        console.log('@createOrder: ', response)
                        // this.activeOrder()
                        this.loading = false
                        this.$router.push('/success')
                    })
                    .catch((error) => {
                        console.log('@createOrder: ', error)
                        
                        this.loading = false
                    })
            },
            // activeOrder() {
            //     // active order
            //     this.$router.push('/success')
            // },
            submit() {
                this.loading = true
                if (localStorage.getItem('api_token') === null) {
                    this.accountLogin()
                } else {
                    this.addAddress()
                }
            },
        },
        mounted() {
            // get address data from AddAddress component
            this.$bus.$on('address-data', (data) => {
                this.addressInfo = JSON.parse(JSON.stringify(data))
                console.log('@address-data: ', this.addressInfo)
                // console.log(this.addressInfo.street)
            })
            // get account data from AddAccount component
            this.$bus.$on('account-data', (data) => {
                this.accountInfo = JSON.parse(JSON.stringify(data))
                console.log('@account-data: ', this.accountInfo)
            })
            // get payment data from AddPayment component
            this.$bus.$on('payment-data', (data) => {
                this.paymentInfo = JSON.parse(JSON.stringify(data))
                console.log('@payment-data: ', this.paymentInfo)
            })
            this.$bus.$on('plan-data', (data) => {
                this.planInfo = JSON.parse(JSON.stringify(data))
                console.log('@plan-data: ', this.planInfo)
            })
            this.$bus.$on('number-data', (data) => {
                this.numberInfo = JSON.parse(JSON.stringify(data))
                console.log('@number-data: ', this.numberInfo)
            })
        },
        beforeDestroy() {
            this.$bus.$off('address-data')
            this.$bus.$off('account-data')
            this.$bus.$off('payment-data')
            this.$bus.$off('number-data')
            this.$bus.$off('plan-data')
        },
    }
</script>

<style scoped></style>
