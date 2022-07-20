<template>
    <div>
        <v-card v-if="loggedIn" class="mt-10 mx-auto align-center" max-width="800" elevation="0">
            <v-card-title class="justify-center">
                <p class="text-h4 font-weight-bold">Account information</p>
            </v-card-title>
            <!-- <v-card-text> -->
            <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title>User ID</v-list-item-title>
                    <v-list-item-subtitle>{{ userId }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <!-- FIXME: no name data -->
            <!-- <v-list-item-content>
                    <v-list-item-title>First name</v-list-item-title>
                    <v-list-item-subtitle>No data yet</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
                    <v-list-item-title>Last name</v-list-item-title>
                    <v-list-item-subtitle>No data yet</v-list-item-subtitle>
                </v-list-item-content> -->
            <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title>Email</v-list-item-title>
                    <v-list-item-subtitle>{{ userEmail }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <div v-for="(item, index) in getAccounts" :key="index">
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title>Account ID</v-list-item-title>
                        <v-list-item-subtitle>{{ item.account_info.account_id }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <div v-for="(address, addressIndex) in item.account_info.addresses" :key="addressIndex">
                    <v-list-item two-line>
                        <v-list-item-content>
                            <v-list-item-title>Address</v-list-item-title>
                            <!-- <v-list-item-subtitle>{{ address }}</v-list-item-subtitle> -->
                            <v-list-item-subtitle>{{ address.address }}</v-list-item-subtitle>
                            <v-list-item-subtitle>{{ address.city }} {{ address.zip }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </div>
            </div>
        </v-card>
        <div v-else>
            <h1>You are not logged in.</h1>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'MyAccount',
        data() {
            return {
                userId: '',
                firstName: '',
                lastName: '',
                userEmail: '',
                MSISDNs: [],

                loggedIn: false,
                accountIDs: [], // save the account ids under user's account
                getAccounts: [], // save each account ids' info using getAccounts API
                loading: false,
            }
        },
        methods: {
            getAccountInfo(element) {
                // console.log('@@@ getAccountInfo @@@:', element)
                return axios.post(
                    'https://api-project9.lotusflare.com/api/v3/user/get_account',
                    {
                        target_id: element,
                        target_type: 2,
                    },
                    {
                        headers: {
                            Authorization: localStorage.getItem('api_token'),
                        },
                    }
                )
            },
            // FIXME: no test data for get_orders API
            getOrderInfo(element) {
                return axios.post(
                    'https://api-project9.lotusflare.com/api/v3/order/get_orders',
                    {
                        target_id: element,
                        target_type: 1,
                    },
                    {
                        headers: {
                            Authorization: localStorage.getItem('api_token'),
                        },
                    }
                )
            },
            // FIXME: not test data for fetch_all_payment_methods API
            getPaymentMethod(element) {
                return axios.post(
                    'https://api-project9.lotusflare.com/api/v3/payment/fetch_all_payment_methods',
                    {
                        target_id: element,
                        target_type: 2,
                    },
                    {
                        headers: {
                            Authorization: localStorage.getItem('api_token'),
                        },
                    }
                )
            },
        },
        async mounted() {
            // post to get user info
            if (localStorage.getItem('api_token')) {
                this.loggedIn = true
                // await here to wait for the accountIDs
                await axios
                    .post(
                        'https://api-project9.lotusflare.com/api/v3/user/get_user',
                        {
                            target_id: localStorage.getItem('user_id'),
                            target_type: 3,
                        },
                        {
                            headers: {
                                Authorization: localStorage.getItem('api_token'),
                            },
                        }
                    )
                    .then((response) => {
                        console.log(response.data)
                        this.accountIDs = response.data.user_info.account_ids
                        this.userEmail = response.data.user_info.creds[0].id
                        this.userId = response.data.user_info.user_id
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                // debugger
                this.accountIDs.forEach((element) => {
                    // axios
                    //     .post(
                    //         'https://api-project9.lotusflare.com/api/v3/user/get_account',
                    //         {
                    //             target_id: element,
                    //             target_type: 2,
                    //         },
                    //         {
                    //             headers: {
                    //                 Authorization: localStorage.getItem('api_token'),
                    //             },
                    //         }
                    //     )

                    // FIXME: not call getOrderInfo and getPaymentMethod API yet
                    Promise.all([this.getAccountInfo(element)])
                        .then((responses) => {
                            // 0 is account info
                            // 1 is order info
                            // 2 is payment method info
                            console.log(responses[0].data)
                            this.getAccounts.push(responses[0].data)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                        .finally(() => {
                            this.loading = false
                        })
                })
            } else {
                this.loggedIn = false
            }
        },
    }
</script>

<style scoped></style>
