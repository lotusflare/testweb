<template>
    <div>
        <v-container fluid>
            <v-row align="center" justify="center" class="mt-10">
                <v-stepper v-model="e6" vertical elevation="0">
                    <v-stepper-step editable :complete="e6 > 1" step="1" color="black"> Buy </v-stepper-step>
                    <v-stepper-content step="1">
                        <v-row no-gutters>
                            <v-col cols="4">
                                <v-img
                                    src="../assets/images/onlywhatyouneed-plan-385dfc6572.c4a50b8341.png"
                                    height="50px"
                                    contain
                                ></v-img>
                            </v-col>
                            <v-col cols="8">
                                <div class="subheading">{{ planInfo.title }}</div>
                                <div class="subheading">Get {{ planInfo.lines }} line for {{ planInfo.price }}</div>
                            </v-col>
                        </v-row>

                        <br />
                        <v-btn color="black" @click="e6 = 2" dark> Continue </v-btn>

                        <router-link style="text-decoration: none; color: inherit" to="/">
                            <v-btn text> Cancel </v-btn>
                        </router-link>
                    </v-stepper-content>

                    <v-stepper-step :rules="[() => accountRules]" editable :complete="e6 > 2" step="2" color="black">
                        Create Account
                        <small v-if="!accountRules">{{ accountErrorMessage }}</small>
                    </v-stepper-step>
                    <v-stepper-content step="2">
                        <AddAccount />
                    </v-stepper-content>

                    <v-stepper-step editable :complete="e6 > 3" step="3" color="black"> Address </v-stepper-step>
                    <v-stepper-content step="3">
                        <AddAddress />
                    </v-stepper-content>

                    <v-stepper-step editable :complete="e6 > 4" step="4" color="black">
                        Number Selection
                    </v-stepper-step>
                    <v-stepper-content step="4">
                        <NumberSelection />
                    </v-stepper-content>

                    <v-stepper-step editable :complete="e6 > 5" step="5" color="black"> Payment </v-stepper-step>
                    <v-stepper-content step="5">
                        <AddPayment />
                    </v-stepper-content>

                    <v-stepper-step editable :complete="e6 > 6" step="6" color="black">
                        Review & Submit Order
                    </v-stepper-step>
                    <v-stepper-content step="6">
                        <OrderReview />
                    </v-stepper-content>
                </v-stepper>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import AddAccount from './AddAccount'
    import AddAddress from './AddAddress'
    import NumberSelection from './NumberSelection'
    import AddPayment from './AddPayment'
    import OrderReview from './OrderReview'
    export default {
        name: 'CheckoutSteppers',
        components: {
            AddAccount,
            AddAddress,
            AddPayment,
            OrderReview,
            NumberSelection,
        },
        data() {
            return {
                e6: 1,
                planInfo: {},
                addressInfo: {},
                paymentInfo: {},
                accountError: 200,
            }
        },
        methods: {},
        computed: {
            accountRules() {
                return this.accountError === 200
            },
            accountErrorMessage() {
                switch (this.accountError) {
                    case 409:
                        return 'Account already exists'
                    case 400:
                        return 'Invalid account information'
                    default:
                        break
                }
                // return this.accountError !== 409 ? '' : 'Account already exists'
            },
        },
        mounted() {
            this.planInfo = this.$route.query

            this.e6 = 1
            // go next step when user clicks on the button in child component
            this.$bus.$on('stepper-next', () => {
                this.e6++
            })
            this.$bus.$emit('plan-data', this.planInfo)
            this.$bus.$on('account-error', (error) => {
                console.log('account-error', error)
                this.accountError = error
            })
        },
        beforeDestroy(){
            this.$bus.$off('stepper-next')
            this.$bus.$off('account-error')
        }
    }
</script>

<style scoped></style>
