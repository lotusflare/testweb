<template>
    <div>
        <v-row justify="center" class="mt-10">
            <!-- <v-card class="d-flex justify-center mt-10" flat tile> -->
            <v-stepper v-model="e6" vertical elevation="0" color="red">
                <v-stepper-step :complete="e6 > 1" step="1"> Buy </v-stepper-step>
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
                            <div class="subheading">{{ this.$route.query.title }}</div>
                            <div class="subheading">
                                Get {{ this.$route.query.lines }} line for {{ this.$route.query.price }}
                            </div>
                        </v-col>
                    </v-row>

                    <br />
                    <v-btn color="primary" @click="e6 = 2"> Continue </v-btn>

                    <router-link style="text-decoration: none; color: inherit" to="/">
                        <v-btn text> Cancel </v-btn>
                    </router-link>
                </v-stepper-content>

                <v-stepper-step editable :complete="e6 > 2" step="2"> Create Account </v-stepper-step>

                <v-stepper-content step="2">
                    <AddAccount />
                    <!-- <v-btn color="primary" @click="e6 = 3"> Continue </v-btn> -->
                    <!-- <router-link style="text-decoration: none; color: inherit" to="/">
                        <v-btn text> Cancel </v-btn>
                    </router-link> -->
                </v-stepper-content>

                <v-stepper-step editable :complete="e6 > 3" step="3"> Billing Address </v-stepper-step>

                <v-stepper-content step="3">
                    <AddAddress />
                    <!-- <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card> -->
                    <!-- <v-btn color="primary" @click="e6 = 4"> Continue </v-btn> -->
                    <!-- <v-btn text> Cancel </v-btn> -->
                </v-stepper-content>

                <v-stepper-step editable :complete="e6 > 4" step="4"> Shipping Address </v-stepper-step>
                <v-stepper-content step="4">
                    <AddAddress />
                    <!-- <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card> -->
                    <!-- <v-btn color="primary" @click="e6 = 5"> Continue </v-btn> -->
                    <!-- <v-btn text> Cancel </v-btn> -->
                </v-stepper-content>

                <v-stepper-step editable :complete="e6 > 5" step="5"> Payment </v-stepper-step>
                <v-stepper-content step="5">
                    <AddPayment />
                    <!-- <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card> -->
                    <!-- <v-btn color="primary" @click="e6 = 6"> Continue </v-btn> -->
                    <!-- <v-btn text> Cancel </v-btn> -->
                </v-stepper-content>
                <v-stepper-step editable :complete="e6 > 6" step="6"> Review & Submit Order </v-stepper-step>
                <v-stepper-content step="6">
                    <OrderReview />
                    <!-- <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card> -->
                    <v-btn color="primary" @click="e6 = 1"> Submit </v-btn>
                    <v-btn text> Cancel </v-btn>
                </v-stepper-content>
            </v-stepper>
        </v-row>
        <!-- </v-card> -->
    </div>
</template>

<script>
    import AddAccount from './AddAccount'
    import AddAddress from './AddAddress'
    import AddPayment from './AddPayment'
    import OrderReview from './OrderReview'
    export default {
        name: 'CheckoutSteppers',
        components: {
            AddAccount,
            AddAddress,
            AddPayment,
            OrderReview,
        },
        data() {
            return {
                e6: 1,
            }
        },
        mounted() {
            // console.log(this.$route)
            this.e6 = 1
            // go next step when user clicks on the button in child component
            this.$bus.$on('stepper-next', () => {
                this.e6++
            })
            // get address data from AddAddress component
            this.$bus.$on('address-data', (data) => {
                console.log('address-data:', data)
            })
            // get account data from AddAccount component
            this.$bus.$on('account-data', (data) => {
                console.log('account-data:', data)
            })
        },
        beforeDestroy() {
            this.$bus.$off('stepper-next')
            this.$bus.$off('address-continue')
        },
    }
</script>

<style scoped></style>
