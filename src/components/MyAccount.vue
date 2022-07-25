<template>
    <div>
        <v-card v-if="loggedIn" class="my-10 mx-auto align-center" max-width="500" elevation="0">
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
            <!-- <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title>First name</v-list-item-title>
                    <v-list-item-subtitle>xxxx</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title>Last name</v-list-item-title>
                    <v-list-item-subtitle>xxxxxxxx</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item> -->
            <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title>Email</v-list-item-title>
                    <v-list-item-subtitle>{{ userEmail }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title>MSISDN</v-list-item-title>
                    <v-list-item-subtitle>{{ MSISDN }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <!-- <div>{{ getAccounts[0] }}</div> -->
            <div v-for="item in getAccounts" :key="item.request_id">
                <!-- <div>{{ item }}</div> -->
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title>Account ID</v-list-item-title>
                        <v-list-item-subtitle>{{ item.account_info.account_id }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </div>

            <v-card-title class="justify-center">
                <p class="text-h4 font-weight-bold">Order Details</p>
            </v-card-title>
            <v-divider></v-divider>
            <div v-for="item in getOrders" :key="item.request_id">
                <!-- {{ item }} -->
                <div v-for="(orderItem, orderIndex) in item.orders" :key="orderIndex">
                    <v-list-item two-line>
                        <v-list-item-content>
                            <v-list-item-title>Order ID</v-list-item-title>
                            <v-list-item-subtitle>{{ orderIndex }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item two-line>
                        <v-list-item-content>
                            <v-list-item-title>Create Time</v-list-item-title>
                            <v-list-item-subtitle>{{
                                convertTimestamp(orderItem.create_timestamp)
                            }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                        two-line
                        v-for="(subOrder, subOrderIndex) in orderItem.sub_orders"
                        :key="subOrderIndex"
                    >
                        <v-list-item-content>
                            <v-list-item-title>Purchased offer name</v-list-item-title>
                            <v-list-item-subtitle
                                >{{ subOrder.entity_name }}
                                <span v-if="subOrder.external_id.slice(-5) === '2line'"
                                    >2 lines</span
                                ></v-list-item-subtitle
                            >
                        </v-list-item-content>
                        <v-list-item-content
                            v-for="(recurrence, recurrenceIndex) in subOrder.recurrences"
                            :key="recurrenceIndex"
                        >
                            <v-list-item-title>Price</v-list-item-title>
                            <v-list-item-subtitle v-if="subOrder.external_id.slice(-5) === '2line'">{{
                                recurrence.charged_amount * 2
                            }}</v-list-item-subtitle>
                            <v-list-item-subtitle v-else>{{ recurrence.charged_amount }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                </div>
            </div>

            <v-card-title class="justify-center mt-4">
                <p class="text-h4 font-weight-bold">Payment Information</p>
            </v-card-title>
            <v-list-item v-if="paymentInfoRearranged.length > 0" two-line>
                <v-list-item-content>
                    <v-list-item-title>Card Number</v-list-item-title>
                    <v-list-item-subtitle>•••• •••• •••• {{ paymentInfoRearranged[0].last4 }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
                    <v-list-item-title>Expiration</v-list-item-title>
                    <v-list-item-subtitle>{{ paymentInfoRearranged[0].cardExpiry }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-card-title class="justify-center mt-4">
                <p class="text-h4 font-weight-bold">Address</p>
            </v-card-title>
            <div v-for="item in getAccounts" :key="item.request_id + 1">
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title>Shipping Address</v-list-item-title>
                        <div v-for="(address, addressIndex) in item.account_info.addresses" :key="addressIndex">
                            <v-list-item-subtitle class="mt-2">{{ address.address }}</v-list-item-subtitle>
                            <v-list-item-subtitle>{{ address.city }} {{ address.zip }}</v-list-item-subtitle>
                            <!-- <v-divider></v-divider> -->
                        </div>
                    </v-list-item-content>
                </v-list-item>
            </div>
        </v-card>
        <div v-else>
            <v-row>
                <v-col cols="12" class="mt-10 text-center">
                    <h1>You are not logged in.</h1>
                    <router-link style="text-decoration: none; color: inherit" to="/">
                        <v-btn color="black" dark class="mt-4 mr-4">Go to Homepage</v-btn>
                    </router-link>
                    <router-link style="text-decoration: none; color: inherit" to="/login">
                        <v-btn color="black" dark class="mt-4">Log in</v-btn>
                    </router-link>
                </v-col>
            </v-row>
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
                // MSISDNs: [],
                MSISDN: '',

                loggedIn: false,
                accountIDs: [], // save the account ids under user's account
                getAccounts: [], // save each account ids' info using getAccounts API
                getOrders: [], // save each order info using getOrders API
                getPaymentInfo: [], // save each payment info using localStorage
                paymentInfoRearranged: [], // save rearranged payment info
                loading: false,
            }
        },
        methods: {
            getAccountInfo(element) {
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

            getOrderInfo(element) {
                return axios.post(
                    'https://api-project9.lotusflare.com/api/v3/orderoe/get_order_entities',
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

            rearrangePaymentInfo(accountID) {
                let paymentInfo = this.getPaymentInfo
                for (let i = 0; i < paymentInfo.length; i++) {
                    if (paymentInfo[i].accountId === accountID) {
                        this.paymentInfoRearranged.push(paymentInfo[i])
                    }
                }
                // return paymentInfoRearranged
            },
            // not test data for fetch_all_payment_methods API
            // getPaymentMethod(element) {
            //     return axios.post(
            //         'https://api-project9.lotusflare.com/api/v3/payment/fetch_all_payment_methods',
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
            // },

            // convert timestamp to date
            convertTimestamp(timestamp) {
                var date = new Date(timestamp * 1000)
                var year = date.getFullYear()
                var month = date.getMonth() + 1
                var day = date.getDate()
                var hour = date.getHours()
                var minute = date.getMinutes()
                var second = date.getSeconds()
                var now = new Date()
                var nowYear = now.getFullYear()
                var nowMonth = now.getMonth() + 1
                var nowDay = now.getDate()
                var nowHour = now.getHours()
                var nowMinute = now.getMinutes()
                var nowSecond = now.getSeconds()
                var nowTime =
                    nowYear + '-' + nowMonth + '-' + nowDay + ' ' + nowHour + ':' + nowMinute + ':' + nowSecond
                var time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
                if (nowYear == year) {
                    if (nowMonth == month) {
                        if (nowDay == day) {
                            return 'Today ' + hour + ':' + minute
                        } else if (nowDay - day == 1) {
                            return 'Yesterday ' + hour + ':' + minute
                        } else {
                            return time
                        }
                    } else {
                        return time
                    }
                } else {
                    return time
                }
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
                        // console.log('@getUser: ', response.data)
                        this.accountIDs = response.data.user_info.account_ids
                        for (let index = 0; index < response.data.user_info.creds.length; index++) {
                            if (response.data.user_info.creds[index].id_type === 'EMAIL_SECRET') {
                                this.userEmail = response.data.user_info.creds[index].id
                            } else if (response.data.user_info.creds[index].id_type === 'MSISDN') {
                                this.MSISDN = response.data.user_info.creds[index].id
                            } else {
                                console.log('no email or msisdn')
                            }
                        }
                        this.userId = response.data.user_info.user_id
                    })
                    .catch((error) => {
                        console.log(error)
                    })

                this.accountIDs.forEach((element) => {
                    Promise.all([this.getAccountInfo(element), this.getOrderInfo(element)])
                        .then((responses) => {
                            // 0 is account info
                            // 1 is order info
                            this.getAccounts.push(responses[0].data)
                            this.getOrders.push(responses[1].data)
                            console.log('@getAccounts:', this.getAccounts)
                            console.log('@getOrders:', this.getOrders)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                        .finally(() => {
                            this.loading = false
                        })
                    this.getPaymentInfo.push(JSON.parse(localStorage.getItem('paymentInfo')))
                    this.rearrangePaymentInfo(localStorage.getItem('account_id'))
                })
            } else {
                this.loggedIn = false
            }
        },
    }
</script>

<style scoped></style>
